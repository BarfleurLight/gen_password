from aiogram import types, filters, Bot, Dispatcher

from logics.generate import Gen_Pass
from db.db import get_user
from bot.kb.kb import create_markup


async def default(message: types.Message, bot: Bot):
    id = message.from_user.id
    user = get_user(id)
    param = user.passwords[0].password.__dict__
    await message.answer(text=f'`{Gen_Pass(**param).main()}`', parse_mode="MARKDOWN")
    await message.answer(Gen_Pass(**param).main())
    await message.answer(Gen_Pass(**param).main())


async def lst(message: types.Message, bot: Bot):
    id = message.from_user.id
    user = get_user(id)
    passwords = [[i.name_pass, i.password.__dict__] for i in user.passwords]

    await bot.send_message(
        message.from_user.id,
        "Выберите шаблон пароля",
        reply_markup=create_markup(passwords).as_markup())


async def custom(message: types.Message, bot: Bot):
    await message.answer(text='Соберите пароль', reply_markup=create_markup().as_markup())


def register_handlers_client(dp: Dispatcher):
    dp.message.register(default, filters.Command(commands=['default']))
    dp.message.register(lst, filters.Command(commands=['list']))
    dp.message.register(custom, filters.Command(commands=['custom']))
