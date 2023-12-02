from bot_init import bot
from aiogram import Dispatcher
from logics.generate import Gen_Pass
from bot.kb.kb import ListCallback
from aiogram.types import CallbackQuery


async def list_handler(query: CallbackQuery, callback_data: ListCallback):
    await bot.send_message(query.from_user.id, Gen_Pass(**callback_data.dict()).main())
    await bot.send_message(query.from_user.id, Gen_Pass(**callback_data.dict()).main())
    await bot.send_message(query.from_user.id, Gen_Pass(**callback_data.dict()).main())


def register_callback_handlers(dp: Dispatcher):
    dp.callback_query.register(list_handler, ListCallback.filter())