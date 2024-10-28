let handler = async (m, { conn, participants, groupMetadata, args }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
  const groupAdmins = participants.filter(p => p.admin)
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n➥ ')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

  let text = `•══✪〘 *المشرفين* 〙✪══•

> *هنا قائمة المشرفين لدينا* 

*• المجموعة * _${groupMetadata.subject}_

*• المشرفين *
${listAdmin}

> [🦦] *استخدم هذا الأمر فقط في حالات الطوارئ*
`.trim()

  conn.sendFile(m.chat, pp, 'staff.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['staff']
handler.tags = ['group']
handler.command = ['المشرفين', 'الادمن', 'listadmin'] 
handler.group = true
handler.register = true

export default handler
