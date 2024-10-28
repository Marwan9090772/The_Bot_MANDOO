let handler = async (m, { conn, isAdmin }) => {
    if (m.fromMe) throw '*مش ممكن*'
    if (isAdmin) throw '*أنت أصلاً أدمن في الجروب يا صانع المحتوى 🫡*'
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
}

handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = /^رول|atad|autoadmin$/i
handler.rowner = true
handler.botAdmin = true

export default handler
