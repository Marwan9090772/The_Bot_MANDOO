//GeminiImg:

import fetch from 'node-fetch'
import uploader from '../lib/uploadImage.js'

var handler = async (m, { conn, text, command, usedPrefix }) => {
let BK7 = m.quoted ? m.quoted : m
let BK8 = (BK7.msg || BK7).mimetype || BK7.mediaType || ''
if (/image/g.test(BK8) && !/webp/g.test(BK8)) {
let BK0 = await BK7.download()

let BK9img = await (uploader)(BK0)
let BK9api = await (await fetch(`https://api.bk9.site/ai/geminiimg?url=${BK9img}&q=${text}`)).json()
conn.sendMessage(m.chat, { text: BK9api.BK9 }, { quoted: m })
} else throw `قم بالرد على صورة واكتب سؤالك\n\nمثال : .جرجير من هذا ( لا تنسى ترد على صورة )`
}
handler.tags = ['ai']
handler.command = /^(اعمل)$/i;

handler.limit = true

export default handler
