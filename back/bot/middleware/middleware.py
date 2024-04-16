from typing import Callable, Dict, Any, Awaitable
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject
from db.db import add_message


class SomeMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any]
    ) -> Any:
        message = dict(event).get('message')
        if message:
            message_id = message.message_id
            date = message.date
            chat_id = message.chat.id
            add_message(message_id, chat_id, date)
        return await handler(event, data)
