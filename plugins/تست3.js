import {pinterest} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*⚠️ مثال:* ${usedPrefix + command} صورة`;
  const json = await pinterest(text);
  conn.sendButton(m.chat, `🔎 نتائج البحث عن: ${text}`, botname, json.getRandom(), [['🔄 التالي 🔄', `/${command} ${text}`]], null, null, m);
};
handler.help = ['pinterest <كلمة البحث>'];
handler.tags = ['البحث'];
handler.command = /^(pinterest)$/i;
handler.register = true;
handler.limit = 1;
export default handler;
