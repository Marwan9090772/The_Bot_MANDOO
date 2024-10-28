import axios from "axios"
let handler = async (m, {command, conn, usedPrefix}) => {
let res = (await axios.get(``)).data  
let haha = await res[Math.floor(res.length * Math.random())]    
conn.sendFile(m.chat, haha, 'error.jpg', `
✧ ▬▭▬ ✦✧✦ ▬▭▬ ✧
 
 *『 ️الوتس 』⇦*
 
 https://wa.me/+201115618853?text=جاي_من_البوت_🫴🫀-
 https://wa.me/+201115618853?text=جاي_من_البوت_🫴🫀-
 

*『 ️جروب الوتس 』⇦*

https://chat.whatsapp.com/ClNQxTnKyFx6eZnJcvqsPY

*『 ️جوجل 』⇦*

https://www.atom.bio/safrotbob-376

*『 ️اليوتيوب 』⇦*

https://youtube.com/@SAFROT?si=N5KKoTotLOgpG6-z

*『 ️الانستا 』⇦*
 
https://www.instagram.com/1.safrot?igsh=NTc4MTIwNjQ2YQ==

*♡  ㅤ    ❍ㅤ         ⎙ㅤ     ⌲*
*Like  comment   seva   send*

✧ ▬▭▬ ✦✧✦ ▬▭▬ ✧ `, m)
}
handler.help = ['✓ ◡̈⃝ ✓│الدعم💫🫣']
handler.tags = ['owner']
handler.command =['معلومات','الدعم']
export default handler
