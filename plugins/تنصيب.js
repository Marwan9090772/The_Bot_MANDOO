import { generateWAMessageFromContent } from '@adiwajshing/baileys';

let handler = async (m, { conn }) => {
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

  let texto = `*◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*

\`𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉\`
https://youtu.be/gh5NajZOTA8

> ✨ *قناة التحديثات والأخبار عن البوت*
> *${global.nna}*

> 💛 *لو عندك أي استفسار أو محتاج مساعدة في عملية التثبيت، تواصل معايا على الرقم ده (مش بوت)*
 
> 📲 ${asistencia}

> ❗ *_فقط لمواضيع التثبيت_* 

> ───────•••───────

\`✨ 𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙇𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 ✨\`

> ✅ _1 جيجا بايت مساحة تخزين_
> ✅ _تطبيق Termux (محدث)_
> ✅ _واتساب عادي (يفضل الواتساب العادي)_
> ✅ _رقم افتراضي (لو أفضل يكون أوفسي)_
> ✅ _جهازين أو كمبيوتر لعملية المسح_

> ───────•••───────

\`✨ 𝙂𝙄𝙏𝙃𝙐𝘽 > 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙄𝙊\`
> *_زوروا مستودعي 😸 لمزيد من المعلومات، لو عجبتك البوت ادعمني بنجمة ⭐️ شكرًا!_*
${md}

> ───────•••───────

\`📌 𝙋𝘼𝙎𝙊 𝙋𝘼𝙍𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 𝙀𝙇 𝘽𝙊𝙏 𝙀𝙇 𝙏𝙀𝙍𝙈𝙐𝙓 (𝙊𝙋𝘾𝙄𝙊𝙉 𝟏 𝙂𝙄𝙏𝙃𝙐𝘽)\`

* termux-setup-storage

* apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/master/install.sh | bash

\`📌 𝙊𝙋𝘾𝙄𝙊𝙉: 2 𝘼𝙍𝘾𝙃𝙄𝙑𝙊\`
> *https://youtu.be/i1xjB4bmYCc*

* termux-setup-storage

* pkg update -y && pkg upgrade -y && pkg install -y bash && pkg install -y wget && pkg install yarn

* cd storage/downloads/Lolibot

* ls

* npm start

> ───────•••───────

\`📌 تثبيت على Infinity Host\`
https://youtu.be/o6ZSpMOsvHs?si=xhlDEnihi1HKyh8D

> *لوحة التحكم:*
https://dashboard.infinitywa.xyz

> *البانل:*
https://store.panel-infinitywa.store

> ───────•••───────

\`📌 تثبيت على CAFIREXOS\`

> *الصفحة الرسمية:* 
https://www.cafirexos.com

> *لوحة التحكم:*
https://dash.cafirexos.com

> *البانل:* 
https://panel.cafirexos.com

> *◄┢┅͜͡✇⟬↯ື ►ஜ۩♯ЅᗩFᏒOT꙯۩ஜ◄ ↯ື⟭✇͜͡┅┧►*`;

  let aa = { quoted: m, userJid: conn.user.jid };
  let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: texto, contextInfo: { externalAdReply: { title: 'ʟᴏʟɪʙᴏᴛ-ᴍᴅ', body: null, thumbnail: imagen1, sourceUrl: 'https://youtu.be/gh5NajZOTA8' }, mentionedJid: [m.sender] }}}, aa);
  conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] });
};

handler.help = ['instalarbot'];
handler.tags = ['main'];
handler.command = /^(تنصيب)/i;
handler.register = true;

export default handler;
