import {search, download} from 'aptoide-scraper';

const handler = async (m, {conn, usedPrefix, command, text}) => {
  if (!text) return conn.reply(m.chat, `⚠️ *اكتب اسم التطبيق (APK)*`, m, {contextInfo: {externalAdReply: {mediaUrl: null, mediaType: 1, description: null, body: `ماذا تبحث؟`, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
  
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `≪*تم التنزيل🧚🏼‍♂️*≫

┏━━━━━━━━━━━━━━━━━━━━━━• 
┃💫 *لايف*: ${data5.name}
┃📦 *باكج*: ${data5.package}
┃🕒 *اخر تحديث*: ${data5.lastup}
┃💪 *حجم*: ${data5.size}
┗━━━━━━━━━━━━━━━━━━━━━━━•`;

    await conn.sendFile(m.chat, data5.icon, 'apk.jpg', response, m, false, {contextInfo: {externalAdReply: {mediaUrl: null, mediaType: 1, description: null, body: iig, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
    
    if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 999) {
      return await conn.sendMessage(m.chat, {text: '*التطبيق كبير جداً.*'}, {quoted: m});
    }
    
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m}); 
    handler.limit = 2;
  } catch (e) {
    m.react(`❌`); 
    console.log(e);
    handler.limit = false;
  }
};

handler.help = ['apk', 'apkmod'];
handler.tags = ['downloader'];
handler.command = /^(تطبيق|apk|modapk|dapk2|aptoide|aptoidedl)$/i;
handler.register = true;

export default handler;
