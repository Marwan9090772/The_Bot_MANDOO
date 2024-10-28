import fs from 'fs';
const handler = async (m, {conn, text} ) => {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
if (!text) throw '*⚠️  إدخل الرسالة اللي عايز تبعتها*'
const cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
const teks = text ? text : cc.text;
for (const i of chats) {
await delay(500);
conn.sendMessage(i, { text: `✅ *إعلان رسمي* ✅\n\n` + teks, mentions: [m.sender], mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak })}
m.reply(`*[❗] الرسالة اتبعتت لـ ${chats.length} شات خاص*\n\n*ملحوظة: ممكن يكون فيه مشاكل في الأمر ده وماتبعتش لكل الشاتس، آسفين لحد دلوقتي*`)};
handler.help = ['broadcastchats', 'bcchats'].map((v) => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(broadcastchats?|انشر_خاص(hats?)?)$/i;
handler.rowner = true;
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));
