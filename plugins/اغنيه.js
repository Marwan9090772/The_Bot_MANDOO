import ytdl from 'ytdl-core';
import yts from 'yt-search';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

const sendAudioWithButtons = async (conn, m, title, thumbnail, url, wm, author, tmpDir, filePath) => {
  let buttons = [
    {buttonId: 'prev', buttonText: {displayText: 'السابق'}, type: 1},
    {buttonId: 'next', buttonText: {displayText: 'التالي'}, type: 1},
  ];
  
  let buttonMessage = {
    audio: { url: filePath },
    mimetype: 'audio/mp4',
    fileName: title,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumbnail)).data,
      },
    },
    buttons: buttons,
    headerType: 4, // For audio messages
    footer: 'اضغط على زر لتغيير الصوت'
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  // Delete the audio file
  fs.promises.unlink(filePath).catch(err => {
    console.error(`Failed to delete audio file: ${err}`);
  });
};

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `مثال : \n ${usedPrefix}${command} جديده او اسم الاغنيه الي انت عيزها💜🧸`;

  let search = await yts(text);
  if (!search.videos.length) throw 'Video Not Found, Try Another Title';
  
  let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  let { title, thumbnail, url } = vid;
  let wm = 'بوت ماندو';

  let captvid = `⏳🦋جاري التحميل `;

  conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid, footer: 'author' }, { quoted: m });

  try {
    const audioStream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}.mp3`;

    const writableStream = fs.createWriteStream(filePath);

    await streamPipeline(audioStream, writableStream);

    await sendAudioWithButtons(conn, m, title, thumbnail, url, wm, 'author', tmpDir, filePath);
  } catch (error) {
    console.error(`Error downloading audio: ${error.message}`); // إضافة تسجيل مفصل للخطأ
    throw 'Failed to download the audio. Please try again later.';
  }
};

handler.help = ['play'].map(v => v + ' <query>');
handler.tags = ['downloader'];
handler.command = ['اغنيه'];

handler.exp = 0;
handler.diamond = false;

export default handler;
