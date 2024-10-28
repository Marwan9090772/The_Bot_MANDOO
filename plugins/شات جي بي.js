const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*𝙎𝙖𝙛𝙧𝙤𝙩-𝙈𝘿*\n\n*—◉ مثال على الطلبات:*\n*◉ ${usedPrefix + command} بوت اعطني كود بايثون*\n*◉ ${usedPrefix + command} بوت اعطني انمي*`;

  try {
    await conn.sendPresenceUpdate('composing', m.chat); // إظهار حالة الكتابة
    let tiores = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=user-unique-id`);
    let hasil = await tiores.json();
    m.reply(`${hasil.result}`.trim()); // إرسال نتيجة الرد
  } catch {
    throw `*[❗] خطأ، حاول مرة تانية*`; // رسالة الخطأ في حال الفشل
  }
};

handler.command = ['openai', 'شوف', 'ia', 'robot'];
module.exports = handler;
