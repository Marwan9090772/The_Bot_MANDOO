let handler = async (m, { conn, text, usedPrefix, command }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    let user = global.db.data.users[who];
    if (!who) throw `*محتاج تذكر أو ترد على رسالة الشخص اللي هيتضاف له بريميوم*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*\n*${usedPrefix + command} 1*`;
    let txt = text.replace('@' + who.split`@`[0], '').trim();
    let name = await '@' + who.split`@`[0];

    var hora1 = 3600000 * txt; //1 ساعة
    var dia1 = 86400000 * txt; //1 يوم
    var semana1 = 604800000 * txt; //1 أسبوع
    var mes1 = 2629800000 * txt; //1 شهر
    var now = new Date() * 1;

    if (!txt && !m.quoted) throw `*محتاج تدخل وقت البريميوم*`;
    if (txt == 0 || txt == null) throw `*لازم تدخل وقت البريميوم*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*\n*${usedPrefix + command} 1*`;
    if (isNaN(txt)) return m.reply(`*لازم تدخل رقم فقط*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*`);

    if (command == 'addprem' || command == 'userpremium') {
        if (now < user.premiumTime) user.premiumTime += hora1;
        else user.premiumTime = now + hora1;
        user.premium = true;
        conn.reply(m.chat, `*🎟️ دلوقتي أنت بريميوم!!!*\n\n*✨ الاسم » ${name}*\n*🕐 الوقت: » ${msToTime(hora1 - new Date())}*\n*📉 المؤقت: » ${user.premiumTime - now} ثانية*`, m, { contextInfo: { mentionedJid: conn.parseMention(name) } });
    }

    if (command == 'addprem2' || command == 'userpremium2') {
        if (now < user.premiumTime) user.premiumTime += dia1;
        else user.premiumTime = now + dia1;
        user.premium = true;
        conn.reply(m.chat, `*🎟️ دلوقتي أنت بريميوم!!!*\n\n*✨ الاسم » ${name}*\n*🕐 الوقت: » ${msToTime(dia1 - new Date())}*\n*📉 المؤقت: » ${user.premiumTime - now} ثانية*`, m, { contextInfo: { mentionedJid: conn.parseMention(name) } });
    }

    if (command == 'addprem3' || command == 'userpremium3') {
        if (now < user.premiumTime) user.premiumTime += semana1;
        else user.premiumTime = now + semana1;
        user.premium = true;
        conn.reply(m.chat, `*🎟️ دلوقتي أنت بريميوم!!!*\n\n*✨ الاسم » ${name}*\n*🕐 الوقت: » ${msToTime(semana1 - new Date())}*\n*📉 المؤقت: » ${user.premiumTime - now} ثانية*`, m, { contextInfo: { mentionedJid: conn.parseMention(name) } });
    }

    if (command == 'addprem4' || command == 'userpremium4') {
        if (now < user.premiumTime) user.premiumTime += mes1;
        else user.premiumTime = now + mes1;
        user.premium = true;
        conn.reply(m.chat, `*🎟️ دلوقتي أنت بريميوم!!!*\n\n*✨ الاسم » ${name}*\n*🕐 الوقت: » ${msToTime(mes1 - new Date())}*\n*📉 المؤقت: » ${user.premiumTime - now} ثانية*`, m, { contextInfo: { mentionedJid: conn.parseMention(name) } });
    }
}

handler.help = ['addprem [@user] <days>'];
handler.tags = ['owner'];
handler.command = ['كمميز', 'مستخدم_بريم', 'addprem2', 'userpremium2', 'addprem3', 'userpremium3', 'addprem4', 'userpremium4'];
handler.group = true;
handler.owner = true;

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " ساعة " + minutes + " دقيقة " + seconds  + " ثانية ";
  }
