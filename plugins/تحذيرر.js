let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw ` *مين اللي عايز تديه تحذير؟* ممنشن علبه بـ @ * `
    if (!(who in global.db.data.users)) throw ` *😿 مين دهه* *مش موجود في قاعدة البيانات* `
    let name = conn.getName(m.sender)
    let warn = global.db.data.users[who].warn
    if (warn < war) {
        global.db.data.users[who].warn += 1
        m.reply(` * تحذير🧚🏽‍♂️*

@${who.split`@`[0]} *تم تحذيرك من قبل الأدمن🧚🏽‍♂️* ${name}
*• عدد التحذيرات:* ${warn + 1}/${war}
*• السبب:* ${text}`, null, { mentions: [who] }) 
    } else if (warn == war) {
        global.db.data.users[who].warn = 0
        m.reply(`⚠️ *المستخدم تعدى *${war}* *تحذيرات وبالتالي هيتم طرده من الجروب...🧚🏽‍♂️* `)
        await time(3000)
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    }
}

handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['تحذير'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true

export default handler

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
            }
