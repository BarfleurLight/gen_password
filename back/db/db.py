from db.db_init import Users, sessions, Passwords, User_Password
from sqlalchemy import select
from sqlalchemy.orm import selectinload

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


def main_test():
    def_pass = Passwords(**default_pass)
    custom_pass = Passwords(**castom_pass)
    sessions.add(def_pass)
    sessions.add(custom_pass)
    sessions.commit()

    mark = Users(telegram_id=1, admin=False, fast=1)
    vasya = Users(telegram_id=2, admin=False, fast=def_pass.id)
    sessions.add(mark)
    sessions.add(vasya)
    sessions.commit()

    sl = User_Password(name_pass="Default")
    sl.user = mark
    sl.password = def_pass
    sessions.add(sl)
    sessions.commit()

    sl2 = User_Password(name_pass="Custom")
    sl2.user = mark
    sl2.password = custom_pass
    sessions.add(sl2)
    sessions.commit()
    print(mark.passwords)
    print(mark.passwords[0].password.length)

    # mark.passwords.append(def_pass)
    # mark.name_pass = 'Default'
    # mark.passwords.append(custom_pass)
    # mark.name_pass ='Default'
    # vasya.passwords.append(def_pass, name_pass='Default')




    



    # defdult_pass = sessions.get(Passwords, 1)
    # print(defdult_pass)

    # if defdult_pass:
    #     return None
    # def_pass = Passwords(**example) 
    #    
    # def_user_pass = User_Password(name_pass='Default')
    
    # mark.user_passwords.append(def_user_pass)
    # def_pass.passs.append(def_user_pass)


    # sessions.add(def_user_pass)
    



    # us = sessions.get(Users, 1)
    # print(us.user_passwords)