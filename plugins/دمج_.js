import { sticker } from '../lib/sticker.js';
let MessageType = (await import(global.baileys)).default;
import fetch from 'node-fetch';
import fs from "fs";

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, ` *لازم تستخدم الميزه كده 😺+😆* `, m);

    try {
        let [emoji1, emoji2] = text.split('+');
        let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=YOUR_API_KEY&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);

        for (let res of anu.results) {
            let stiker = await sticker(false, res.url, global.packname, global.author);
            
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
                contextInfo: {
                    'forwardingScore': 200,
                    'isForwarded': false,
                    externalAdReply: {
                        showAdAttribution: false,
                        title: '',
                        body: '',
                        mediaType: 2,
                        sourceUrl: '',
                        thumbnail: ''
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

handler.help = ['emojimix <emot1|emot2>'];
handler.tags = ['sticker'];
handler.command = /^(emojimix|دمج|combinaremojis|crearemoji|emojismix|emogismix)$/i;
handler.register = true;

export default handler;

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
    .then(response => response.json())
    .then(json => {
        resolve(json);
    })
    .catch((err) => {
        reject(err);
    });
});
