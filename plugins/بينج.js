import { cpus as _cpus, totalmem, freemem } from 'os';
import util from 'util';
import os from 'os';
import fetch from 'node-fetch';
import osu from 'node-os-utils';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
  try {
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

    let _muptime;
    if (process.send) {
      process.send('uptime');
      _muptime = await new Promise(resolve => {
        process.once('message', resolve);
        setTimeout(resolve, 1000);
      }) * 1000;
    }

    let muptime = clockString(_muptime);
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
    const used = process.memoryUsage();
    const cpus = _cpus().map(cpu => {
      cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
      return cpu;
    });

    const cpu = cpus.reduce((last, cpu, _, { length }) => {
      last.total += cpu.total;
      last.speed += cpu.speed / length;
      last.times.user += cpu.times.user;
      last.times.nice += cpu.times.nice;
      last.times.sys += cpu.times.sys;
      last.times.idle += cpu.times.idle;
      last.times.irq += cpu.times.irq;
      return last;
    }, {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0
      }
    });

    let old = performance.now();
    const { key } = await conn.sendMessage(m.chat, { text: `🕒 جاري اختبار السرعة... 🚀` }, { quoted: fkontak });
    let neww = performance.now();
    let speed = neww - old;
    let caption = `*🚀 سرعة الأداء 🚀*

🚄 *${Math.round(neww - old)}* ملي ثانية
🚄 *${speed}* ملي ثانية

*🕕 وقت التشغيل*
${muptime}
${readMore}
*🟢 الدردشات*
▢ *${groupsIn.length}* _مجموعات الدردشة_
▢ *${groupsIn.length}* _مجموعات مشترك فيها_
▢ *${groupsIn.length - groupsIn.length}* _مجموعات تم تركها_
▢ *${chats.length - groupsIn.length}* _دردشات خاصة_
▢ *${chats.length}* _إجمالي الدردشات_

*🔰 معلومات السيرفر*
*🟢 الذاكرة المستخدمة:* ${format(totalmem() - freemem())} / ${format(totalmem())}
*🔵 الذاكرة الحرة:* ${format(freemem())}

*💻 المنصة:* \`\`\`${os.platform()}\`\`\`
*📡 اسم السيرفر:* _${os.hostname()}_
${readMore}
*استخدام الذاكرة في NodeJS:*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `*إجمالي استخدام المعالج*
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

*استخدام نواة المعالج (${cpus.length} نواة)*
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`;
    await conn.sendMessage(m.chat, { text: caption, edit: key });
  } catch (e) {
    await conn.reply(m.chat, `*حدث خطأ.*\n\n\`\`\`أبلغ عن هذا الأمر ${usedPrefix + command} باستخدام الأمر ${usedPrefix}reporte\`\`\``, m);
    console.log(e);
  }
};

handler.help = ['ping', 'speed'];
handler.tags = ['main'];
handler.command = /^(ping|بينج|velocidad|rapidez|velocity)$/i;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [' ' + d, ' *يوم*', h, ' *ساعة*', m, ' *دقيقة*', s, ' *ثانية* '].map(v => v.toString().padStart(2, 0)).join('');
                                   }
