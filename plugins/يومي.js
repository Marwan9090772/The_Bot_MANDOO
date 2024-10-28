const free = 5000
const prem = 20000

let handler = async (m, {conn, isPrems }) => {
  let time = global.db.data.users[m.sender].lastclaim + 86400000
  if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) 
    throw `🧚🏼‍♂️ *إنت أخدت المكافأة قبل كده* 🎁\nإرجع بعد *${msToTime(time - new Date())}* عشان تقدر تطلب المكافأة تاني`
  
  const limit = Math.floor(Math.random() * 30)
  const money = Math.floor(Math.random() * 800)
  global.db.data.users[m.sender].limit += limit;
  global.db.data.users[m.sender].money += money
  global.db.data.users[m.sender].exp += isPrems ? prem : free
  
  m.reply(`🎁 *إنت حصلت على مكافأة*

🔸 *إنت تلقيت:*
*💎 الماس:* ${limit}
*🪙 سفروت كوينز:* ${money}
*🆙 الخبرة:* ${isPrems ? prem : free}`)
  
  global.db.data.users[m.sender].lastclaim = new Date * 1
}

handler.help = ['daily']
handler.tags = ['econ']
handler.command = ['يومي', 'claim'] 
handler.register = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " ساعات " + minutes + " دقائق"
  }
