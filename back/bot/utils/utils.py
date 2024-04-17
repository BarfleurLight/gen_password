import aioschedule
import asyncio
from aiogram import Bot
from db.db import get_old_message, delete_message


async def clean_history_by_time(bot: Bot):
    messages = get_old_message()
    if not messages:
        return
    chat_id = messages[0].chat_id
    messages_ids = [i.message_id for i in messages]
    await bot.delete_messages(chat_id, messages_ids)
    delete_message(messages)


async def scheduler(bot: Bot):
    aioschedule.every(1).minutes.do(clean_history_by_time, bot=bot)
    while True:
        await aioschedule.run_pending()
        await asyncio.sleep(1)
