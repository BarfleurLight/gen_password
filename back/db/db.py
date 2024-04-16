from db.db_init import (sessions,
                        Users, Passwords, Messages,
                        User_Password)
from datetime import datetime, timezone


default_pass = {
    'length': 14,
    'numbers': True,
    'uppercase': True,
    'lowercase': True,
    'symbols': True,
    'delimiter': True,
    'delimiter_value': 4,
    }
castom_pass = {
    'length': 9,
    'numbers': False,
    'uppercase': False,
    'lowercase': True,
    'symbols': False,
    'delimiter': True,
    'delimiter_value': 4,
    }


def get_user(id):
    user = sessions.get(Users, id)
    if user:
        return user
    user = Users(telegram_id=id, admin=False, fast=1)
    sl = User_Password(name_pass="Default")
    sl.user = user
    sl.password = get_default_pass()
    sessions.add(sl)
    sessions.commit()
    return user


def get_user_password(user):
    ls_pass = user.passwords
    return [i.name_pass for i in ls_pass]


def get_default_pass():
    def_pass = sessions.get(Passwords, 1)
    if def_pass:
        return def_pass
    def_pass = Passwords(**default_pass)
    sessions.add(def_pass)
    sessions.commit()


def get_password_by_id(password_id):
    password = sessions.get(Passwords, password_id)
    return password


def get_password_by_params(password):
    password = sessions.query(Passwords).filter_by(**password).first()
    return password


def get_name_pass(name, user, password):
    user_password = sessions.query(User_Password).filter_by(
        users_fk=user.telegram_id,
        name_pass=name).first()
    if user_password:
        return f'Пароль с названием {name} уже существует'

    user_password = sessions.query(User_Password).filter_by(
        users_fk=user.telegram_id,
        password_fk=password.id).first()
    if user_password:
        name_pass = user_password.name_pass
        return f'Пароль с такими параметрами уже существует:{name_pass}'


def add_custom_pass(data, user):
    new_pass = get_password_by_params(data['password'])
    if not new_pass:
        new_pass = Passwords(**data['password'])
        sessions.add(new_pass)

    check = get_name_pass(data['name_pass'], user, new_pass)
    if check:
        sessions.rollback()
        return check

    name_pass = User_Password(name_pass=data['name_pass'])
    name_pass.user = user

    name_pass.password = new_pass
    sessions.add(name_pass)
    sessions.commit()


def delete_select_password(name, user):
    user_password = sessions.query(User_Password).filter_by(
        users_fk=user.telegram_id,
        name_pass=name).first()
    if user_password:
        if user_password.password_fk == user.fast:
            return f'Невозможно удалить шаблон\
                  {user_password.name_pass} установленый по умолчанию'
        user_password = sessions.delete(user_password)
        sessions.commit()
        return f'Шаблон {name} удалён'
    return f'Шаблон с названием {name} не найден'


def change_main_template(name, user):
    user_password = sessions.query(User_Password).filter_by(
        users_fk=user.telegram_id,
        name_pass=name).first()
    if user_password:
        if user_password.password_fk != user.fast:
            user.fast = user_password.password_fk
            sessions.commit()
            return f'Шаблон "{name}" установлен как основной'
        return f'Шаблон "{name}" уже установлен'
    return f'Шаблон "{name}" не найден'


def add_message(message_id, chat_id, date):
    message = Messages(message_id=message_id,
                       chat_id=chat_id,
                       date=date)
    sessions.add(message)
    sessions.commit()


def delete_message(messages):
    for message in messages:
        sessions.delete(message)
    sessions.commit()


def get_messages_user(chat_id):
    time_now = datetime.now(timezone.utc).replace(tzinfo=None)
    messages = sessions.query(Messages).where(
            Messages.date < time_now
        ).filter_by(chat_id=chat_id)
    return messages.all()


def add_send_message(message):
    chat_id = message.chat.id
    message_id = message.message_id
    date = message.date
    add_message(message_id, chat_id, date)
