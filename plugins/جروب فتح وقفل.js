/* الشكر لـ https://github.com/ALBERTO9883/NyanCatBot-MD */

const handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const isClose = {
    'open': 'not_announcement',
    'buka': 'not_announcement',
    'on': 'not_announcement',
    '1': 'not_announcement',
    'close': 'announcement',
    'tutup': 'announcement',
    'off': 'announcement',
    '0': 'announcement',
  }[(args[0] || '')];

  if (isClose === undefined) {
    const caption = `*• مثال:*
*${usedPrefix + command} open 1*
*${usedPrefix + command} close 1*
📌 *مثال على الاستخدام* *${usedPrefix + command} close 1* 
*_🌿 عشان تقفل الجروب لمدة ساعة._*
`;
    m.reply(caption);
    throw false;
  }

  const timeoutset = 86400000 * args[1] / 24;
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_) => {
    m.reply(`🧚🏽‍♂️ *الجروب* ${isClose == 'announcement' ? 'مقفول' : 'مفتوح'} ${args[1] ? `لمدة *${clockString(timeoutset)}_*` : ''}`);
  });

  if (args[1]) {
    setTimeout(async () => {
      await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async (_) => {
        conn.reply(m.chat, `${isClose == 'not_announcement' ? ' *الجروب اتقفل، دلوقتي بس المشرفين يقدروا يتكلمو!* ' : ' *الجروب اتفتح، دلوقتي كل الأعضاء يقدروا يتكلمو🧚🏽‍♂️!* '}!`);
      });
    }, timeoutset);
  }
};

handler.help = ['grouptime *<open/close>* *<عدد>*'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;
handler.botAdmin = true;
handler.group = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
	  }
