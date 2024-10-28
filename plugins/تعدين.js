let handler = async (m, { conn }) => {

  let hasil = Math.floor(Math.random() * 6000)
  let time = global.db.data.users[m.sender].lastmiming + 400000
  if (new Date - global.db.data.users[m.sender].lastmiming < 400000) throw `⏳ *استنا الوقت ي حب* *${msToTime(time - new Date())}* *عشان تقدر تعدن تاني* `

  let minar = `${pickRandom([' *شاطر 😎 عدنت* ',
  '🌟✨ *تمام جبت* ',
  ' *واو انت معدن جامد ⛏️ جبت* ',
  ' *عدنت* ',
  '😲 *عدنت كمية* ',
  ' *دخلك هيزيد عشان عدنت* ',
  '⛏️⛏️⛏️⛏️⛏️ *بتعدن* ',
  '🤩 *أيوة دلوقتي معاك* ',
  ' *التعدين في صفك، عشان كده جبت* ',
  '😻 *حظك حلو في التعدين* ',
  '♻️ *مهمتك اكتملت، عدنت* ',
  '⛏️ *التعدين أفادك بـ* ',
  '🛣️ *لقيت مكان وعدنت فيه، جبت* ',
  '👾 *بسبب التعدين دخلك بقى* ',
  ' *مبروك دلوقتي معاك','⛏️⛏️⛏️ جبت* '])}`

  global.db.data.users[m.sender].exp += hasil
  m.reply(`${minar} *${hasil} XP*`)
  global.db.data.users[m.sender].lastmiming = new Date * 1
}

handler.help = ['minar']
handler.tags = ['econ']
handler.command = ['minar', 'التعدين', 'تعدين'] 
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
   // hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

//  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return minutes + " دقيقة و " + seconds + " ثانية" 
    }
