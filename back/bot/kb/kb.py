from aiogram.filters.callback_data import CallbackData
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import types


class ListCallback(CallbackData, prefix="list"):
    length: int
    numbers: bool
    uppercase: bool
    lowercase: bool
    symbols: bool
    delimiter: bool
    delimiter_value: int


class DeleteTemplates(CallbackData, prefix='del'):
    dell: str


class DeleteSelectTemplate(CallbackData, prefix='del_temp'):
    name: str


def create_markup_list(passwords=[]):
    builder = InlineKeyboardBuilder()
    for pasword in passwords:
        builder.button(
            text=pasword[0],
            callback_data=ListCallback(**pasword[1])
        )
    new = types.InlineKeyboardButton(
        text="+",
        web_app=types.WebAppInfo(url='https://obrishti.ddns.net/')
        )
    dell = types.InlineKeyboardButton(
        text="-",
        callback_data=DeleteTemplates(dell='delete').pack()
        )
    builder.adjust(2)
    builder.row(new, dell)
    return builder


def create_markup_delete(passwords=[]):
    builder = InlineKeyboardBuilder()
    for pasword in passwords:
        builder.button(
            text=pasword,
            callback_data=DeleteSelectTemplate(name=pasword)
        )
    builder.adjust(2)
    return builder
