import { pinterest } from '@bochilteam/scraper'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ ما هي الصورة التي تريدني أن أبحث عنها؟i?\n\n📌 مثال  : ${usedPrefix + command} فتاة جميلة`
  const json = await pinterest(text)
  conn.sendFile(m.chat, json.getRandom(), 'pinterest.jpg', `
*▢  Pinterest:*  ${text}
`.trim(), m)
}
handler.help = ['✓ ◡̈⃝ ✓│بين🧸💜']
handler.tags = ['search']
handler.command = ['بين'] 

export default handler
