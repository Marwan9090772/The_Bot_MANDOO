let crime = 500
let diamante = 10
const handler = async (m, {conn, usedPrefix, command, groupMetadata, participants, isPrems}) => {
    const date = global.db.data.users[m.sender].crime + 3600000; // 3600000 = 1 ساعة
    if (new Date - global.db.data.users[m.sender].crime < 3600000) return m.reply(`『🚓︎』*الشرطة لسه متابعة ومراقبة دلوقتي، هترجع تقدر تسرق بعد: ${msToTime(date - new Date())}*`)
    
    let randow
    if (m.isGroup) randow = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else randow = m.chat

    try {
        let ps = groupMetadata.participants.map(v => v.id)
        let randow = ps.getRandom()
        let users = global.db.data.users[randow]
        const exp = Math.floor(Math.random() * 9000)
        const diamond = Math.floor(Math.random() * 150)
        const money = Math.floor(Math.random() * 9000)

        if (global.db.data.users[m.sender].exp < 0) return m.reply(`《💰》${pickRandom(global.robar)} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp)
        if (global.db.data.users[m.sender].limit < 0) return m.reply(`《💰》${pickRandom(global.robar)} ${diamond} 💎 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄`).catch(global.db.data.users[m.sender].limit += diamond)
        if (global.db.data.users[m.sender].money < 0) return m.reply(`《💰》${pickRandom(global.robar)} ${money} 🪙 𝐋𝐎𝐋𝐈𝐂𝐎𝐈𝐍𝐒`).catch(global.db.data.users[m.sender].money += money) 
        
        let or = ['text', 'text2', 'text3', 'text4', 'text5']; 
        let media = or[Math.floor(Math.random() * 5)]
        global.db.data.users[m.sender].crime = new Date * 1;

        if (media === 'text') return m.reply(`《💰》${pickRandom(global.robar)} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp) 
        if (media === 'text2') return m.reply(`《🚓》${pickRandom(global.robmal)} ${exp} XP`).catch(global.db.data.users[m.sender].exp -= exp) 
        if (media === 'text3') return m.reply(`《💰》${pickRandom(global.robar)}\n\n${diamond} 💎 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄\n${money} 🪙 𝐋𝐎𝐋𝐈𝐂𝐎𝐈𝐍𝐒`).catch(global.db.data.users[m.sender].limit += diamond).catch(global.db.data.users[m.sender].money += money)
        if (media === 'text4') return m.reply(`《🚓》${pickRandom(global.robmal)}\n\n${diamond} 💎 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄\n${money} 🪙 𝐋𝐎𝐋𝐈𝐂𝐎𝐈𝐍𝐒`).catch(global.db.data.users[m.sender].limit -= diamond).catch(global.db.data.users[m.sender].money -= money)
        if (media === 'text5') return conn.sendMessage(m.chat, {text: `《💰》سرقت من @${randow.split`@`[0]} مبلغ قدره ${exp} XP`, contextInfo:{ mentionedJid: [randow]}}, { quoted: m}).catch(global.db.data.users[m.sender].exp += exp).catch(global.db.data.users[randow].exp -= crime) 
    } catch (e) {
        console.log(e)
    }
}
handler.help = ['سرقة'];
handler.tags = ['اقتصاد'];
handler.command = /^(سرقه|اقتصاد)$/i
handler.register = true
handler.group = true
export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return hours + " ساعة(s) " + minutes + " دقيقة(s)"
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

global.robar = ['سرقت بنك 🏦 وحصلت على', 'اتفقت مع زعيم المافيا وحصلت على:', 'الشرطة كادت أن تراك لكنك سرقت مبلغ ثمين من 💰. خليك حذر المرة الجاية! حصلت على:', 'المجرمين دفعوا لك:', 'سرقت من مشرف المجموعة', 'سرقت من الرئيس مبلغ قدره:', 'سرقت من شخص مشهور مبلغ قدره:', 'دخلت خلسة للمتحف وسرقت عمل فني ثمين:', 'تسللت لمحل المجوهرات وحصلت على غنيمة رائعة:', 'أصبحت أشهر لص في البلد، حصلت على:', 'سرقت شاحنة مليانة بضاعة ثمينة وحصلت على', 'هاجمت قطار وحصلت على', 'سرقت طيارة مليانة بضاعة وحصلت على', 'تظاهرت أنك مليونير لسرقة جوهرة نادرة، حصلت على', 'دخلت بيت جامع فني وسرقت قطعة لا تقدر بثمن، حصلت على', 'اختطفت رجل أعمال وحصلت على فدية مهمة:', 'هددت سياسي وحصلت على مبلغ كبير من المال:', 'رشوت ضابط شرطة للحصول على معلومات قيمة، حصلت على:'];
global.robmal = ['الشرطة شافتك 🙀👮‍♂️ وخسرت', 'حاولت تسرق بنك 🏦 لكن حد ساعدك وبلغ الشرطة، خسرت', 'ما قدرتش تهرب من الشرطة 🚔🤡، خسرت:', 'حاولت تسرق كازينو لكنك انكشفت، خسرت', 'أمسكتك الشرطة أثناء محاولة سرقة متجر، خسرت:', 'جرس الإنذار رن وانت بتحاول تسرق مستودع، خسرت', 'صاحب المكان أمسكك، خسرت', 'حاولت اختراق حساب مصرفي لكن تم تعقبك، خسرت', 'اكتشفوك وانت بتحاول ترشي ضابط، خسرت', 'خطتك لابتزاز رجل أعمال فشلت، خسرت']
