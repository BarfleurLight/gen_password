from aiogram import Bot
from db.db import get_old_message, delete_message
from apscheduler.schedulers.asyncio import AsyncIOScheduler


async def clean_history_by_time(bot: Bot):
    messages = get_old_message()
    if not messages:
        return
    chat_id = messages[0].chat_id
    messages_ids = [i.message_id for i in messages]
    await bot.delete_messages(chat_id, messages_ids)
    delete_message(messages)


scheduler = AsyncIOScheduler()
