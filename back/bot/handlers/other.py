from aiogram import types, filters


async def get_start(message: types.Message):
    await message.answer(f'Hello {message.from_user.first_name}!')


async def echo_send(message: types.Message):
    await message.answer(message.text)


def register_handlers_other(dp):
    dp.message.register(get_start, filters.Command(commands=['start']))
    dp.message.register(echo_send)