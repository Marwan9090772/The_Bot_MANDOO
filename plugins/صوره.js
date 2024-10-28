import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗خطاء❗] مثال علي الامر ${usedPrefix + command} كانيكي*`
if (m.text.includes('gore') || m.text.includes('cp')|| m.text.includes('porno')|| m.text.includes('Gore')|| m.text.includes('rule')|| m.text.includes('CP')|| m.text.includes('Rule34')) return m.reply('[❗خطاء❗] لا يمكنني إرسال هذا المحتوى ، المجموعة محظورة \n إذا كنت مشرفًا وتريد تنشيطها ، اخبر المطور')  
const res = await googleImage(text)
let image = await res.getRandom()
let link = image
//conn.sendFile(m.chat, link, 'error.jpg', `🔎 *النتيجه ل:* ${text}\n🔗 *من* ${link}\n🌎 *محرك البحث:* جوجل`, m)}
let captionn = `🔎 *الـبـحـث عـن:* ${text}\n🔗 *الـلـنـك* ${link}\n🌎 *مـحـرـك الـبـحـث:* Google`
conn.sendButton(m.chat, captionn, author, link, [['صوره غيراها', `.صوره ${text}`]], m)}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image|صوره|imagen)$/i
export default handler
