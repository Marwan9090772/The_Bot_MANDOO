let handler = async (m, { conn, args, groupMetadata }) => {
    let who;
    if (m.isGroup) 
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else 
        who = m.chat;

    if (!who) 
        throw `*مين اللي هينزلله التحذير؟* لازم تذكر شخص، أنا مش عارف :)`;
    
    if (!(who in global.db.data.users)) 
        throw `*⚠️ مين ده؟* مش موجود في قاعدة البيانات بتاعتي`;
    
    let warn = global.db.data.users[who].warn;
    
    if (warn > 0) {
        global.db.data.users[who].warn -= 1;
        m.reply(`*⚠️ تم خصم تحذير ⚠️*
         
*• التحذير:* -1
*• الإجمالي:* ${warn - 1}`);
    } else if (warn == 0) {
        m.reply('*⚠️ المستخدم ملوش أي تحذيرات*');
    }
};

handler.help = ['delwarn *@user*'];
handler.tags = ['group'];
handler.command = ['شيل_تحزير', 'شيل-تحزير'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
