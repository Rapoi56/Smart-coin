from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
import webbrowser

# أمر /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        'مرحبًا! أنا بوت Smart Coin. 🪙\n'
        'يمكنك استخدام الأوامر التالية:\n'
        '/mine - للتعدين وجمع Smart Coins.\n'
        '/open_page - لفتح صفحة التعدين.'
    )

# أمر /mine
async def mine(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('لقد قمت بتعدين 1 Smart Coin.')

# أمر /open_page
async def open_page(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # افتح صفحة ويب (مثل صفحة تعدين)
    url = "https://example.com/mining_page"  # استبدل هذا الرابط برابط صفحة التعدين الفعلي
    webbrowser.open(url)
    await update.message.reply_text('تم فتح صفحة التعدين.')

# تشغيل البوت
def main() -> None:
    # استبدال التوكن هنا
    application = Application.builder().token("7782763042:AAHNKGl9Y65n4Q8JgVQbQvtlLvg_toT2MwA").build()

    # إضافة الأوامر
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("mine", mine))
    application.add_handler(CommandHandler("open_page", open_page))

    # بدء البوت
    application.run_polling()

if __name__ == '__main__':
    main()
