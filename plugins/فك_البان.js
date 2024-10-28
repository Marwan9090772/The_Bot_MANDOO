let handler = async (m, { conn, text}) => {
    if (!text) return conn.reply(m.chat,  ' *منشن ع الي عايز تفك من عليه البان🦦* ', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: ' *بوت ماندو* ', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return conn.reply(m.chat,  ' *منشن ع الي عايز تفك البان من عليه🧸* ', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: ' *بوت سفࢪوت🧚🏽‍♂️* ', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
    let users = global.db.data.users
    users[who].banned = false
    conn.reply(m.chat,  ' *تم فك البان🦦*\n*دلوقتي يقدر يستخدم البوت* ', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: 'سوبر بوت واتساب', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^فك_البان$/i
handler.rowner = true
export default handler
