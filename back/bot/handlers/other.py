from aiogram import types, filters


introduction = ('Описание: \nПривет {}!\nЭто бот для генерации паролей!\n'
                'Это НЕ менеджер паролей, он НЕ предназначен'
                'для их хранения, проверки, автоматической '
                'вставки и т.д, но Вы можете сохранить шаблоны с '
                'удобными параметрами, по которым пароль можно '
                'быстро сгенерировать.\n\n')

print(introduction)

description = ('Команды:\n'
               '/default - генерирует пароль по основному шаблону\n'
               '/list -список заготовленых шаблонов \n'
               '    "name" - сгенерировать пароль\n'
               '    "+" - открыть форму для добавления нового шаблона\n'
               '    "-" - удалить шаблон\n'
               '/settings - позволяет выбрать '
               'основной шаблон\n\n')

footer = ('Контакты и ссылки: \n'
          'tg: @BarfleurLight\n'
          'GitHub: https://github.com/BarfleurLight/gen_password')


async def get_start(message: types.Message):
    await message.answer(introduction.format(message.from_user.first_name))


async def help(message: types.Message):
    await message.answer(
        (introduction + description + footer).format(
            message.from_user.first_name)
            )


async def echo_send(message: types.Message):
    await message.answer(message.text)


def register_handlers_other(dp):
    dp.message.register(get_start, filters.Command(commands=['start']))
    dp.message.register(help, filters.Command(commands=['help']))
    dp.message.register(echo_send)
