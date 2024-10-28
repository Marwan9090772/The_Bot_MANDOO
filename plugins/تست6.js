let handler = async (m, { conn, command, usedPrefix, text }) => {
    let which = command.replace(/ver/i, '')
    if (!text) throw `*[❗] استخدم الأمر *${usedPrefix}list${which}* علشان تشوف اللسته*`
    let msgs = global.db.data.msgs
    if (!(text in msgs)) throw `*[❗] '${text}' مش موجود في لسته الرسائل*`
    let _m = await conn.serializeM(msgs[text])
    await _m.copyNForward(m.chat, true)
}
handler.command = /^ver(vn|msg|video|audio|img|sticker)$/
handler.rowner = true
export default handler
