const handler = async (m, {conn, text, usedPrefix, command}) => {
global.db.data.sticker = global.db.data.sticker || {};
  
if (command == 'addcmd' || command == 'setcmd') {  
if (!m.quoted) throw '⚠️ *رد على ستيكر أو صورة عشان تضيف الأمر أو النص*';
if (!m.quoted.fileSha256) throw '⚠️ *تقدر تضيف أوامر أو نصوص لستيكرات وصور بس*';
if (!text) throw `⚠️ *رد على ستيكر أو صورة عشان تضيف الأمر أو النص**\n*مثال:* ${usedPrefix + command} <النص> <رد على ستيكر أو صورة>`;
const sticker = global.db.data.sticker;
const hash = m.quoted.fileSha256.toString('base64');
if (sticker[hash] && sticker[hash].locked) throw '⚠️ *انت مين يا عم؟ 🧐، بس المدير بتاعي يقدر يستخدم الأمر ده*';
sticker[hash] = {text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false};
m.reply(`✅ *النص/الأمر اللي ضفته للستيكر/الصورة اتسجل بنجاح*`);
m.react("✅") 
};

if (command == 'delcmd') {  
let hash = text;
if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');
if (!hash) throw `*[❗معلومة❗] تقدر تضيف أوامر أو نصوص للستيكرات أو الصور بس، عشان تجيب الكود المستخدم استخدم الأمر ${usedPrefix}listcmd*`;
const sticker = global.db.data.sticker;
if (sticker[hash] && sticker[hash].locked) throw '⚠️ *انت مين يا عم؟ 🧐، بس المطور بتاعي يقدر يستخدم الأمر ده*';
delete sticker[hash];
m.reply(`✅ *النص/الأمر اللي كان مربوط بالستيكر/الصورة اتشال من قاعدة البيانات بنجاح*`);
}

if (command == 'listcmd' || command == 'cmdlist') {  
conn.reply(m.chat, `*< قائمة الأوامر/النصوص المربوطة />**

${Object.entries(global.db.data.sticker).map(([key, value], index) => `*${index + 1}.-**\n**كود:** ${value.locked ? `_*(مقفل)*_ ${key}` : key}\n*الأمر/النص:* ${value.text}`).join('\n\n')}
`.trim(), null, {mentions: Object.values(global.db.data.sticker).map((x) => x.mentionedJid).reduce((a, b) => [...a, ...b], [])});
}}
handler.help = ['addcmd', 'delcmd', 'listcmd']
handler.tags = ['owner']
handler.command = ['ضك', 'addcmd', 'cmdadd', 'cmdset', 'delcmd', 'listcmd', 'cmdlist'];
handler.rowner = true;
export default handler;
