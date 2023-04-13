import telebot
bot = telebot.TeleBot("6235270138:AAErxRJ5pPkz-oJj4oYZXlhj-r_BfkKDGeM")

# Handles all text messages that contains the commands '/start' or '/help'.
@bot.message_handler(commands=['start', 'help'])
def handle_start_help(message):
	pass
