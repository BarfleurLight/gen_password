from aiogram import types, filters, Dispatcher, Bot


introduction = ('Описание: \nПривет, {}!\nЭто бот для генерации паролей\n'
                'Это НЕ менеджер паролей, он НЕ предназначен '
                'для их хранения, проверки, автоматической '
                'вставки и т.д., но Вы можете сохранить шаблоны с '
                'удобными параметрами, по которым пароль можно '
                'быстро сгенерировать\n\n')

description = ('Команды:\n'
               '/default - генерирует пароль по основному шаблону\n'
               '/list -список заготовленых шаблонов \n'
               '    "name" - сгенерировать пароль\n'
               '    "+" - открыть форму для добавления нового шаблона\n'
               '    "-" - удалить шаблон\n'
               '/settings - Настройки\n'
               '    - сменить базовый шаблон\n'
               '    - удалить сгенерированные пароли'
               '(бот автоматически удаляет пароли'
               ' созданые более 15 минут назад)\n\n')

footer = ('Контакты и ссылки: \n'
          'tg: @ObrishtiMV\n'
          'GitHub: https://github.com/BarfleurLight/gen_password')


async def get_start(message: types.Message, bot: Bot):
    await bot.send_message(
        message.chat.id,
        introduction.format(message.from_user.first_name))


async def help(message: types.Message, bot: Bot):
    await bot.send_message(
        message.chat.id,
        (introduction + description + footer).format(
               message.from_user.first_name))


async def echo_send(message: types.Message, bot: Bot):
    await bot.send_message(message.chat.id, message.text)


def register_handlers_other(dp: Dispatcher):
    dp.message.register(get_start, filters.Command(commands=['start']))
    dp.message.register(help, filters.Command(commands=['help']))
    dp.message.register(echo_send)
