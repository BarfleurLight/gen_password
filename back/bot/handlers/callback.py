from bot_init import bot
from aiogram import Dispatcher
from logics.generate import Gen_Pass
from bot.kb.kb import (ListCallback,
                       DeleteTemplates,
                       create_markup_delete,
                       DeleteSelectTemplate,
                       create_markup_list)
from aiogram.types import CallbackQuery
from db.db import get_user, delete_select_password


async def list_handler(query: CallbackQuery, callback_data: ListCallback):
    for _ in range(3):
        await bot.send_message(
            query.from_user.id,
            text=f'`{Gen_Pass(**callback_data.dict()).main()}`',
            parse_mode="MARKDOWN")


async def delete_templates(query: CallbackQuery,
                           callback_data: DeleteTemplates):
    user_id = query.from_user.id
    user = get_user(user_id)
    passwords = [i.name_pass for i in user.passwords]
    await query.message.edit_text(text='Удалить шаблон')
    await query.message.edit_reply_markup(
        reply_markup=create_markup_delete(passwords).as_markup())


async def delete_template(query: CallbackQuery,
                          callback_data: DeleteTemplates):
    name_pass = callback_data.name
    user_id = query.from_user.id
    user = get_user(user_id)
    old_pass = delete_select_password(name_pass, user)

    passwords = [[i.name_pass, i.password.__dict__] for i in user.passwords]
    await query.answer(text=old_pass, cache_time=2)
    await query.message.edit_text(text='Выберите шаблон пароля')
    await query.message.edit_reply_markup(
        reply_markup=create_markup_list(passwords).as_markup())


def register_callback_handlers(dp: Dispatcher):
    dp.callback_query.register(list_handler, ListCallback.filter())
    dp.callback_query.register(delete_templates,
                               DeleteTemplates.filter())
    dp.callback_query.register(delete_template,
                               DeleteSelectTemplate.filter())
