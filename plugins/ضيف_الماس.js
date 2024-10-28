let handler = async (m, { conn, command, text }) => {

  if (command == 'اضافه_الماس' || command == 'اعطاء_الماس' || command == 'اضافه_حد') {
    const pajak = 0;
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;
    if (!who) return m.reply(`🦦 *اتشاور على شخص باستخدام* @tag`) 
    const txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) return m.reply(`🧸 *اكتب الكمية اللي عاوز تضيفها* `)   
    if (isNaN(txt)) return m.reply(`❗ *مفيش رقم* `)   
    const dmt = parseInt(txt);
    let limit = dmt;
    const pjk = Math.ceil(dmt * pajak);
    limit += pjk; 
    if (limit < 1) return m.reply(`🦦 *مفيش* `) 
    const users = global.db.data.users;
    users[who].limit += dmt;
    m.reply(` *≡ 💎 تم اضافة:*
┏╍╍╍╍╍╍╍╍╍╍╍╍╍
┃• *المجموع:* ${dmt}
┗╍╍╍╍╍╍╍╍╍╍╍╍╍`)
  }

  if (command == 'اضافه_خبره' || command == 'اضافهxp') {
    const pajak = 0;
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;
    if (!who) return m.reply(`❗ *اتشاور على شخص باستخدام* @tag`) 
    const txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) return m.reply(`🦦 *اكتب الكمية اللي عاوز تضيفها* `)   
    if (isNaN(txt)) return m.reply(`❗ *مفيش رقم* `)   
    const xp = parseInt(txt);
    let exp = xp;
    const pjk = Math.ceil(xp * pajak);
    exp += pjk;
    if (exp < 1) return m.reply(`🦦 *مفيش* `) 
    const users = global.db.data.users;
    users[who].exp += xp;
    m.reply(` *≡ تم اضافة*
┏╍╍╍╍╍╍╍╍╍╍╍╍╍
┃• *المجموع:* ${xp}
┗╍╍╍╍╍╍╍╍╍╍╍╍╍`)
  }
}
handler.help = ['اضافه_خبره', 'اضافه_حد']
handler.tags = ['owner']
handler.command = /^(اضافه_الماس|اعطاء_الماس|اضافه_حد|اضافه_خبره|اضافةxp)$/i
handler.rowner = true

export default handler
