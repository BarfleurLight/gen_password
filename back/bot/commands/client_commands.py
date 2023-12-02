from bot_init import bot
from aiogram.types import BotCommand, BotCommandScopeDefault


async def set_default_commands(bot: bot):
    return await bot.set_my_commands([BotCommand(command='default', description='Основной шаблон'),
                    BotCommand(command='list', description='Список шаблонов'),
                    BotCommand(command='custom', description='Настраеваемый'),
                    BotCommand(command='help', description='Описание'),
                    BotCommand(command='settings', description='Настройки')])


async def set_all_commands(bot: bot):
    await set_default_commands(bot)


