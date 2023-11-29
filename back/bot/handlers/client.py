from aiogram import types, filters, Bot, Dispatcher
from logics.generate import Gen_Pass
from db.db import get_user

async def fast(message: types.Message, bot: Bot):
    id = message.from_user.id
    user = get_user(id)
    param = user.passwords[0].password.__dict__
    await message.answer(Gen_Pass(**param).main())
    await message.answer(Gen_Pass(**param).main())
    await message.answer(Gen_Pass(**param).main())



def register_handlers_client(dp: Dispatcher):
    dp.message.register(fast, filters.Command(commands=['fast']))
