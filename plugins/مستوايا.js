import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    // لو المستخدم مش قادر يترقى
    if (!canLevelUp(user.level, user.role, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `『 *إحصائياتك 🆙* 』

إحصائياتك في الوقت الحقيقي 🕐

├─ ❏ *الاسم:*  ${name}
├─ ❏ *XP 🆙:* ${user.exp - min}/${xp}
├─ ❏ *المستوى:* ${user.level}
└─ ❏ *الرتبة:* ${user.role}

> ناقصك *${max - user.exp}* XP عشان تترقى
`.trim()
    }
    
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    
    if (before !== user.level) {
        let teks = `🎊 مبروك ${conn.getName(m.sender)} وصلت لمستوى جديد:`
        let str = `*[ 𝐋𝐄𝐕𝐄𝐋 𝐔𝐏 ]*
        
*• المستوى السابق:* ${before}
*• المستوى الحالي:* ${user.level}
*• الرتبة:* ${user.role}

> _*كل ما تتفاعل مع البوتات أكتر، هتزيد مستوياتك*_`
        .trim()
        try {
            const img = await levelup(teks, user.level)
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['econ']

handler.command = ['مستوي', 'مستوى_أعلى', 'مستوايا'] 
handler.register = true

export default handler
