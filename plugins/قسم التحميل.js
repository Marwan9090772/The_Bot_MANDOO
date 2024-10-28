import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'

const time = moment.tz('Egypt').format('HH')
let wib = moment.tz('Egypt').format('HH:mm:ss')

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي`
    let videoUrl = 'https://qu.ax/QjnOg.jpg'
    let user = global.db.data.users[who]
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let sn = createHash('md5').update(who).digest('hex')
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let more = String.fromCharCode(8206)
    m.react('📥')
    let readMore = more.repeat(850)
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
    let str = `
┏━━⊜ *˹ ━━|قسم المطور│━━˼👨🏻‍💻˹◡̈⃝*
┇≡ * ⁩ تفضل القائمة يا*  : *${taguser}*
┇≡ *حط قبل كل امر (.)*
┇≡ *التشغيل ${uptime}
┇≡ *◡̈التوقيت ${date}
┇≡ *◡̈عدد المستخدمين ${rtotalreg}
┇≡ *◡̈⃝🧚🏻‍♀️📌 اسـم الـبوت : 𝐵𝛩𝑇_𝑀𝐴𝑁𝐷𝛩*
┇≡ *◡̈ الـمنـصه Heroku *
┗━━━━━━━━━━⬣
┗━━━━━━━━━━⬣
┏━━⊜
❐╎◡̈⃝🎥❯ .فيديو⌉
❐╎◡̈⃝💾❯ .فيديو2⌉   
❐╎◡̈⃝🎵❯ .اغنيه⌉
❐╎◡̈⃝🎼❯ .اغنيه1⌉
❐╎◡̈⃝🎶❯ .اغاني⌉  
❐╎◡̈⃝📻❯ .شغل⌉
❐╎◡̈⃝🎞❯ .شغل1⌉
❐╎◡̈⃝📸❯ .صورة ⌉
❐╎◡̈⃝📷❯ .صوره2⌉
❐╎◡̈⃝💻❯ .يوب⌉
❐╎◡̈⃝🔍❯ .البحث⌉
❐╎◡̈⃝📑❯ .ويكيبيديا⌉
❐╎◡̈⃝📥❯ .تيك⌉  
❐╎◡̈⃝🤳❯ .تيك_صور⌉   
❐╎◡̈⃝🎬❯ .يوتيوب⌉
❐╎◡̈⃝🎐❯ .بينترست⌉
❐╎◡̈⃝📱❯ .فيسبوك⌉  
❐╎◡̈⃝👾❯ .تطبيق⌉
❐╎◡̈⃝📲❯ .انستا⌉  
❐╎◡̈⃝💿❯ .ميديافاير⌉  
❐╎◡̈⃝📚❯ .مانجا⌉
❐╎◡̈⃝📼❯ .فريبيك⌉
❐╎◡̈⃝🪄❯ .جيف⌉
❐╎◡̈⃝🌐❯ .جوجل⌉
❐╎◡̈⃝🚘❯ .سياره⌉
❐╎◡̈⃝🌐❯ .جيثوب⌉
❐╎◡̈⃝✖️❯ .تويتر⌉  
❐╎◡̈⃝📽❯ .فيلم⌉
❐╎◡̈⃝📂❯ .ملف⌉
❐╎◡̈⃝🎫❯ .انستغرام⌉
❐╎◡̈⃝📖❯ .كتاب⌉
❐╎◡̈⃝⚽❯ .كرة-القدم⌉
❐╎◡̈⃝📚❯ .تحميل-كتاب⌉
❐╎◡̈⃝🎬❯ .فيلم⌉
❐╎◡̈⃝🛕❯ .معرض⌉
❐╎◡̈⃝🧿❯ .تخيل⌉
  ┗━━━━━━━━━━⬣
`.trim()
    conn.sendMessage(m.chat, {
        video: { url: videoUrl }, caption: str,
        mentions: [m.sender, global.conn.user.jid],
        gifPlayback: true, gifAttribution: 0
    }, { quoted: m });
};

handler.help = ['main']
handler.command = ['ماندو5']

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
    const time = moment.tz('Egypt').format('HH')
    let res = "بداية يوم سعيده ☀️"
    if (time >= 4) {
        res = "صباح الخير 🌄"
    }
    if (time >= 10) {
        res = "مساء الخير ☀️"
    }
    if (time >= 15) {
        res = "مساء الخير 🌇"
    }
    if (time >= 18) {
        res = "مساء الخير 🌙"
    }
    return res
}
