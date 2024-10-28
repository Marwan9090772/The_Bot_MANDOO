import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
import fs from 'fs';

let data;
let buff;
let mimeType;
let fileName;
let apiUrl;
let apiUrl2;
let apiUrlsz;
let device;
let dataMessage;
let enviando = false;

const handler = async (m, { command, usedPrefix, conn, text }) => {
  device = await getDevice(m.key.id);

  if (!text) throw `*[ ℹ️ ] ينقص عنوان فيديو YouTube.*\n\n*[ 💡 ] مثال:* _${usedPrefix + command} Good Feeling - Flo Rida_\n\n*[ 💡 ] مثال 2:* _${usedPrefix + command} https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p_`;

  if (command === 'playyt' && (device == 'desktop' || device == 'web')) throw `*[❗] رسائل الأزرار غير متوفرة في WhatsApp web، يرجى استخدام هاتفك المحمول لعرض الرسائل واستخدام الأزرار.*`;

  if (enviando) return;
  enviando = true;

  try {
    apiUrlsz = [
      `https://api.cafirexos.com/api/ytplay?text=${text}`,
      `https://api-brunosobrino.onrender.com/api/ytplay?text=${text}&apikey=BrunoSobrino`,
      `https://api-brunosobrino-dcaf9040.koyeb.app/api/ytplay?text=${text}`
    ];
    const linkyt = await isValidYouTubeLink(text);
    if (linkyt) {
      apiUrlsz = [
        `https://api.cafirexos.com/api/ytinfo?url=${text}`,
        `https://api-brunosobrino-koiy.onrender.com/api/ytinfo?url=${text}&apikey=BrunoSobrino`,
        `https://api-brunosobrino-dcaf9040.koyeb.app/api/ytinfo?url=${text}`
      ];
    }

    let success = false;
    for (const url of apiUrlsz) {
      try {
        const res = await fetch(url);
        data = await res.json();
        if (data.resultado && data.resultado.url) {
          success = true;
          break;
        }
      } catch {}
    }

    if (!success) {
      enviando = false;
      throw `_*< يوتيوب - تحميل />*_\n\n*[ ℹ️ ] ينقص عنوان فيديو YouTube.*\n\n*[ 💡 ] مثال:* _.شغل Good Feeling - Flo Rida_\n\n*[ 💡 ] مثال 2:* _.شغل https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p_`;
    }

    const dataMessage = `العنوان : ${data.resultado.title}\nتم النشر : ${data.resultado.publicDate}\nالقناه : ${data.resultado.channel}\nرابط القناه : ${data.resultado.url}`.trim();

    if (!text.includes('SN@') && command !== 'شغل') {
      await conn.sendMessage(m.chat, { text: dataMessage }, { quoted: m });
    }

    if (command === 'شغل') {
      const messa = await prepareWAMessageMedia({ image: { url: data.resultado.image } }, { upload: conn.waUploadToServer });
      let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: dataMessage },
              footer: { text: `𝐵𝛩𝑇_𝑀𝐴𝑁𝐷𝛩`.trim() },
              header: {
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'الصوت🎧',
                      id: `${usedPrefix}play.1 ${data.resultado.url} SN@`
                    })
                  },
                  {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'الفيديو📽️',
                      id: `${usedPrefix}play.2 ${data.resultado.url} SN@`
                    })
                  },
                ],
                messageParamsJson: "",
              },
            },
          },
        }
      }, { userJid: conn.user.jid, quoted: m });
      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
      enviando = false;
      return;
    }

    try {
      if (command === 'play.1') {
        let apiUrls2 = [
          `https://api.cafirexos.com/api/v1/ytmp3?url=${data.resultado.url}`,
          `https://api.cafirexos.com/api/v2/ytmp3?url=${data.resultado.url}`,
          `https://api-brunosobrino.onrender.com/api/v1/ytmp3?url=${data.resultado.url}&apikey=BrunoSobrino`,
          `https://api-brunosobrino.onrender.com/api/v2/ytmp3?url=${data.resultado.url}&apikey=BrunoSobrino`,
          `https://api-brunosobrino-dcaf9040.koyeb.app/api/v1/ytmp3?url=${data.resultado.url}`,
          `https://api-brunosobrino-dcaf9040.koyeb.app/api/v2/ytmp3?url=${data.resultado.url}`
        ];

        let success2 = false;
        for (const urll of apiUrls2) {
          try {
            apiUrl2 = urll;
            mimeType = 'audio/mpeg';
            fileName = 'audio.mp3';
            buff = await conn.getFile(apiUrl2);
            success2 = true;
            break;
          } catch {}
        }

        if (!success2) {
          enviando = false;
          throw `حدث خطأ أثناء جلب رابط الصوت.`;
        }
      } else if (command === 'play.2') {
        let apiUrls22 = [
          `https://api.cafirexos.com/api/v1/ytmp4?url=${data.resultado.url}`,
          `https://api.cafirexos.com/api/v2/ytmp4?url=${data.resultado.url}`,
          `https://api-brunosobrino.onrender.com/api/v1/ytmp4?url=${data.resultado.url}&apikey=BrunoSobrino`,
          `https://api-brunosobrino.onrender.com/api/v2/ytmp4?url=${data.resultado.url}&apikey=BrunoSobrino`,
          `https://api-brunosobrino-dcaf9040.koyeb.app/api/v1/ytmp4?url=${data.resultado.url}`,
          `https://api-brunosobrino-dcaf9040.koyeb.app/api/v2/ytmp4?url=${data.resultado.url}`
        ];

        let success2 = false;
        for (const urlll of apiUrls22) {
          try {
            apiUrl2 = urlll;
            mimeType = 'video/mp4';
            fileName = 'video.mp4';
            buff = await conn.getFile(apiUrl2);
            success2 = true;
            break;
          } catch (e) {
            console.log(e.message);
          }
        }

        if (!success2) {
          enviando = false;
          throw `حدث خطأ أثناء جلب رابط الفيديو.`;
        }
      }
    } catch (ee) {
      console.log(ee.message);
      enviando = false;
      throw `حدث خطأ غير متوقع.`;
    }

    if (buff) {
      await conn.sendMessage(m.chat, { [mimeType.startsWith('audio') ? 'audio' : 'video']: buff.data, mimetype: mimeType, fileName: fileName }, { quoted: m });
      enviando = false;
    } else {
      enviando = false;
      throw `حدث خطأ أثناء إرسال الملف.`;
    }
  } catch (error) {
    console.log(error);
    enviando = false;
    throw `حدث خطأ أثناء المعالجة.`;
  }
};

handler.command = /^(play.1|play.2|شغل)$/i;
export default handler;

async function isValidYouTubeLink(link) {
  const validPatterns = [
    /youtube\.com\/watch\?v=/i,
    /youtube\.com\/shorts\//i,
    /youtu\.be\//i,
    /youtube\.com\/embed\//i,
    /youtube\.com\/v\//i,
    /youtube\.com\/attribution_link\?a=/i,
    /yt\.be\//i,
    /googlevideo\.com\//i,
    /youtube\.com\.br\//i,
    /youtube-nocookie\.com\//i,
    /youtubeeducation\.com\//i,
    /m\.youtube\.com\//i,
    /youtubei\.googleapis\.com\//i
  ];
  return validPatterns.some(pattern => pattern.test(link));
      }
