
 // https://whatsapp.com/channel/0029VaI4a3JDZ4LbOAHbdu47
let handler = async (m, { conn, text }) => {
  let tagme = `https://wa.me/+${m.sender.replace(`+`)}/?text=حقوق+بوتك`
  let mylink = [m.sender]
  conn.reply(m.chat, tagme, m, { contextInfo: { mylink }})
}
handler.help = ['✓ ◡̈⃝ ✓│رابطي🧸💜']
handler.tags = ['group']
handler.command = /^رابطي$/i
}
handler.group = false
}
export default handler
