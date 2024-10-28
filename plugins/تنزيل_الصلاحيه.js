const handler = async (m, {conn, usedPrefix, text}) => {
  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) return conn.reply(m.chat, `*🧚🏼‍♂️ اعمل ريب او منشن للي عايز تقلق من عندو الصلاحيه* :)`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `*أنت مش متأكد أو الرقم اللي دخلته غلط 🧚🏼‍♂️، إدخل الرقم صح أو حط تاج لليوزر.*`, m);

  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    conn.reply(m.chat, `*[ ✅ ] الأوامر اتنفذت*`, m);
  }
};
handler.help = ['*593xxx*', '*@مستخدم*', '*رد على الشات*'].map((v) => 'demote ' + v);
handler.tags = ['group'];
handler.command = /^(تنزيل_الصلاحيه)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;
export default handler;
