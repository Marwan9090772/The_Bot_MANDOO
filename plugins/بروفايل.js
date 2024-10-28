import db from '../lib/database.js'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'
import axios from 'axios' // تأكد من استيراد axios

// تعريف المتغيرات الغير معرفة
const wm = 'اسم البوت'
const imagen4 = 'مسار الصورة الافتراضية' // ضع مسار الصورة الافتراضية هنا
const md = 'رابط ميديم'
const yt = 'رابط يوتيوب'
const tiktok = 'رابط تيك توك'

let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Info'
  let user = global.db.data.users[who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/9d38415096b6c46bf03f8.jpg')
  let { exp, limit, name, registered, regTime, age, level } = global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let api = await axios.get(`https://deliriusapi-official.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let userNationalityData = api.data.result
  let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
  
  // تحميل الصورة الافتراضية في حالة الفشل
  let img = await fetch(pp).then(res => res.buffer()).catch(_ => fs.readFileSync('مسار الصورة الافتراضية'))

  let str = ` *「 بروفايل 」*
  
👤 *الاسم :* ${name}
☎️ *الرقم :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
🌐 *الرابط :* wa.me/${who.split`@`[0]}
🌎 *الجنسية :* ${userNationality}
💎 *الحد :* ${limit} 
⚙️ *المستوى :* ${level}
◯ *مسجل :* ${registered ? 'نعم' : 'لا'}

*•━━━━⪻ البروفايل ⪼━━━━•*`

  let mentionedJid = [who]
  await conn.sendFile(m.chat, img, 'lp.jpg', str, m, false, { contextInfo: { forwardingScore: 9999999, isForwarded: true, mentionedJid, externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: wm, body: 'سوبر بوت واتساب', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom() } } })
}

handler.help = ['بروفايل', 'بروفايل *@user*']
handler.tags = ['rg']
handler.command = /^(بروفايل|profile)$/i
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatDate(n, locale = 'es-US') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatHour(n, locale = 'en-US') {
  let d = new Date(n)
  return d.toLocaleString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
}
