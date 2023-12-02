from aiogram.filters.callback_data import CallbackData
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import types



def create_markup(passwords=[]):
    builder = InlineKeyboardBuilder()
    for pasword in passwords:
        builder.button(
            text=pasword[0],
            callback_data=ListCallback(**pasword[1])
        )
    kb = types.InlineKeyboardButton(text="+", web_app=types.WebAppInfo(url='https://obrishti.ddns.net/'))
    builder.add(kb)
    return builder

class ListCallback(CallbackData, prefix="list"):
    length: int
    numbers: bool
    uppercase: bool
    lowercase: bool
    symbols: bool
    delimiter: bool
    delimiter_value: int
