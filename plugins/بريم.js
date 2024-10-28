let handler = async (m, { conn, text }) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
if (!who) throw `*[❗] اسف يا بابا سفروت لكنك نسيت المنشن @منشن ارجو من اختيار احد الاعضاء لجعلهم مميزين*`
if (global.prems.includes(who.split`@`[0])) throw '*[❗] المستخدم الذي تم إدخاله هو بالفعل مستخدم متميز (بريميوم)*'
global.prems.push(`${who.split`@`[0]}`)
let textprem = `*[❗] @${who.split`@`[0]} أنت الآن مستخدم متميز ولن يكون لديك حدود عند استخدام البوت (تستطيع استخدام اي امر مثل المطور)*`
m.reply(textprem, null, { mentions: conn.parseMention(textprem) })
}
handler.help = ['✓ ◡̈⃝ ✓│بريم💫🫣']
handler.tags = ['owner']
handler.command = /^(add|\+)prem|بريم$/i
handler.group = true
handler.rowner = true
export default handler
