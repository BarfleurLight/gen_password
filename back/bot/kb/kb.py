import os
from aiogram.filters.callback_data import CallbackData
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import types

BASE_WEBHOOK_URL = os.getenv("BASE_WEBHOOK_URL")


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


class ChangeMainTemplate(CallbackData, prefix='settings'):
    param: str


class SelectMainTemplate(CallbackData, prefix='change'):
    name: str


class CleanHistory(CallbackData, prefix='clean'):
    param: str


def create_markup_list(passwords=[]):
    builder = InlineKeyboardBuilder()
    for pasword in passwords:
        builder.button(
            text=pasword[0],
            callback_data=ListCallback(**pasword[1])
        )
    new = types.InlineKeyboardButton(
        text="+",
        web_app=types.WebAppInfo(url=BASE_WEBHOOK_URL)
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


def create_markup_select_main(passwords=[]):
    builder = InlineKeyboardBuilder()
    for pasword in passwords:
        builder.button(
            text=pasword,
            callback_data=SelectMainTemplate(name=pasword)
        )
    builder.adjust(2)
    return builder


def create_markup_settings():
    builder = InlineKeyboardBuilder()
    change_default_pass = types.InlineKeyboardButton(
        text="Изменить шаблон по умолчанию",
        callback_data=ChangeMainTemplate(param='main_template').pack()
        )
    clean_chat = types.InlineKeyboardButton(
        text="Очистить историю",
        callback_data=CleanHistory(param='clean').pack()
        )
    builder.row(change_default_pass)
    builder.row(clean_chat)
    return builder
