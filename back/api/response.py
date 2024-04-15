from pydantic import BaseModel
from aiogram import Bot
from db.db import get_user, add_custom_pass
from bot.kb.kb import create_markup_list

# test_data = {'id': 441314955,
#              'name_pass': 'test',
#              'password': {
#                 'length': 8,
#                 'numbers': True,
#                 'uppercase': True,
#                 'lowercase': True,
#                 'symbols': True,
#                 'delimiter': False,
#                 'delimiter_value': 4
#                 }
#             }


class Data(BaseModel):
    id: int
    name_pass: str
    password: dict


async def response_lst(data: dict, bot: Bot):
    id = data['id']
    user = get_user(id)
    app_pass = add_custom_pass(data, user)
    if app_pass:
        await bot.send_message(id, app_pass)
    passwords = [[i.name_pass, i.password.__dict__] for i in user.passwords]

    return await bot.send_message(
        id,
        "Выберите шаблон пароля",
        reply_markup=create_markup_list(passwords).as_markup())
