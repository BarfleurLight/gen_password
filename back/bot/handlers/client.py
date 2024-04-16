from aiogram import types, filters, Bot, Dispatcher

from logics.generate import Gen_Pass
from db.db import get_user, get_password_by_id, add_send_message
from bot.kb.kb import create_markup_list, create_markup_settings


async def default(message: types.Message, bot: Bot):
    id = message.from_user.id
    user = get_user(id)
    id_defaul_password = user.fast
    default_password = get_password_by_id(id_defaul_password).__dict__
    for _ in range(3):
        add_send_message(
            await bot.send_message(
                message.chat.id,
                text=f'`{Gen_Pass(**default_password).main()}`',
                parse_mode="MARKDOWN"))


async def lst(message: types.Message, bot: Bot):
    id = message.from_user.id
    user = get_user(id)
    passwords = [[i.name_pass, i.password.__dict__] for i in user.passwords]
    add_send_message(
        await bot.send_message(
            message.from_user.id,
            "Выберите шаблон пароля",
            reply_markup=create_markup_list(passwords).as_markup()))


async def settings(message: types.Message, bot: Bot):
    add_send_message(
        await bot.send_message(
            message.chat.id,
            text='Настройки',
            reply_markup=create_markup_settings().as_markup()
        ))


def register_handlers_client(dp: Dispatcher):
    dp.message.register(default, filters.Command(commands=['default']))
    dp.message.register(lst, filters.Command(commands=['list']))
    dp.message.register(settings, filters.Command(commands=['settings']))
