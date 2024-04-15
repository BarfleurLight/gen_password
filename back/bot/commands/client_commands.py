from aiogram import Bot
from aiogram.types import BotCommand


async def set_default_commands(bot: Bot):
    return await bot.set_my_commands([
        BotCommand(command='default', description='Основной шаблон'),
        BotCommand(command='list', description='Список шаблонов'),
        BotCommand(command='help', description='Описание'),
        BotCommand(command='settings', description='Настройки')
        ])


async def set_all_commands(bot: Bot):
    await set_default_commands(bot)
