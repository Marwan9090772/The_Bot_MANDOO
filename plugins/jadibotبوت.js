import ws from 'ws';

async function handler(m, { conn: _envio, usedPrefix }) {
    const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

    function convertirMsADiasHorasMinutosSegundos(ms) {
        var segundos = Math.floor(ms / 1000);
        var minutos = Math.floor(segundos / 60);
        var horas = Math.floor(minutos / 60);
        var أيام = Math.floor(horas / 24);
        segundos %= 60;
        minutos %= 60;
        horas %= 24;
        var resultado = "";
        if (أيام !== 0) {
            resultado += أيام + " أيام, ";
        }
        if (horas !== 0) {
            resultado += horas + " ساعات, ";
        }
        if (minutos !== 0) {
            resultado += minutos + " دقايق, ";
        }
        if (segundos !== 0) {
            resultado += segundos + " ثواني";
        }
        return resultado;
    }

    const message = users.map((v, index) => `👉🏻 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado (${v.user.name || '-'})\n*🧚🏼‍♂️ الوقت اللي فات من أول ما اشتغل :* ${ v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : "مش معروف"}`).join('\n\n');

    const replyMessage = message.length === 0 ? '*مافيش بوتات متصلة دلوقتي، حاول تاني بعدين.*' : message;
    const totalUsers = users.length;
    const responseMessage = `*🤖 دي قائمة بعض البوتات المتصلة (jadibot/serbot) 🤖️*\n\n*👉🏻 ممكن تتواصل معاهم عشان يشوفوا إذا ممكن ينضموا لجروبك*\n\n*يرجى:*\n*1.- تكون لطيف ✅*\n*2.- متلحش ولا تتخانق ✅*\n\n*✳️ لو الرسالة دي طلعت فاضية يبقى مفيش بوتات متصلة دلوقتي، حاول تاني بعدين*\n\n*_⚠ ملاحظة: الناس دي إحنا منعرفهمش، ففريق 𝐵𝛩𝑇_𝑀𝐴𝑁𝐷𝛩 مش مسئول عن أي حاجة تحصل_* \n\n*🤖 عدد البوتات المتصلة :* ${totalUsers || '0'}\n\n${replyMessage.trim()}`.trim();

    await _envio.sendMessage(m.chat, { 
        text: responseMessage, 
        contextInfo: {
            mentionedJid: _envio.parseMention(responseMessage), 
            externalAdReply: { 
                mediaUrl: null, 
                mediaType: 1, 
                description: null, 
                title: wm, 
                body: 'بوت سوبر واتساب', 
                previewType: 0, 
                thumbnail: img.getRandom(), 
                sourceUrl: redes.getRandom()
            }
        }
    }, { quoted: m });
}

handler.command = handler.help = ['listjadibot', 'bots'];
handler.tags = ['jadibot'];
export default handler;
