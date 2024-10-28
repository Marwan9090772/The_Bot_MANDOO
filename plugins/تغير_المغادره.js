const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply('*[❗] رسالة الوداع اتضبطت صح للمجموعة دي*');
  } else throw `*[❗] ادخل رسالة الوداع اللي عايز تضيفها، استخدم:*\n*- @user (مذكرة)*`;
};
handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['تغير_المغادره'];
handler.admin = true;
export default handler;
