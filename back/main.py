import os, asyncio, uvicorn
from aiogram.types import Update
from fastapi import FastAPI
from api.response import Data, response_lst

from bot_init import bot, dp


WEB_SERVER_HOST = os.getenv("WEB_SERVER_HOST")
WEB_SERVER_PORT = int(os.getenv("WEB_SERVER_PORT"))
WEBHOOK_PATH = os.getenv("WEBHOOK_PATH")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")
BASE_WEBHOOK_URL = os.getenv("BASE_WEBHOOK_URL")
DEBUG = os.getenv("DEBUG", None)

from db.db import get_default_pass
from bot.commands import client_commands
from bot.handlers import client, other, callback

callback.register_callback_handlers(dp)
client.register_handlers_client(dp)
other.register_handlers_other(dp)


async def on_startup() -> None:
    get_default_pass()
    print('Старт')
    if DEBUG:
        await bot.delete_webhook()
    else:
        await bot.set_webhook(f"{BASE_WEBHOOK_URL}{WEBHOOK_PATH}",
                              secret_token=WEBHOOK_SECRET)
    await client_commands.set_all_commands(bot)


async def on_shutdown() -> None:
    return await bot.session.close()


if __name__ == "__main__":
    if DEBUG:
        dp.startup.register(on_startup)
        dp.shutdown.register(on_shutdown)
        try:
            asyncio.run(dp.start_polling(bot, skip_updates=True))
        except KeyboardInterrupt:
            print('Остановочка')
    else:
        app = FastAPI(
            docs_url=None,
            on_startup=[on_startup],
            on_shutdown=[on_shutdown])

        @app.post('/webhook/template')
        async def template_response(data: Data):
            print('--------------------------', data)
            try:
                response_lst(dict(data), bot)
            except Exception:
                await bot.send_message(data['id'], 'Error')
            return {'status': 200}

        @app.post('/webhook')
        async def webhook_response(update: dict):
            return await dp.feed_update(
                    bot=bot, update=Update(**update))
        uvicorn.run(
            app,
            host=WEB_SERVER_HOST,
            port=WEB_SERVER_PORT
        )
