import { createHash } from 'crypto'
let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex')
await m.reply(`⬇️ *هذا هو الرقم التسلسلي الخاص بك * ⬇️`.trim())
await m.reply(`${sn}`.trim())
}
handler.help = ['✓ ◡̈⃝ ✓│رمزي🧸💜']
handler.tags = ['game']
handler.command = /^(myns|الرقم-التسسلسي|رمزي|رمزى)$/i
export default handler
