import fs from 'fs'  // استيراد مكتبة fs عشان نقدر نتعامل مع الملفات

let handler = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins)  // جلب أسماء كل ملفات الـ plugins
    let ar1 = ar.map(v => v.replace('.js', ''))  // شيل الامتداد .js من الأسماء

    if (!text) throw `*دور على إيه؟*\nمثال:\n${usedPrefix + command} sticker`  // لو المستخدم مدخلش اسم الملف، نرمي رسالة خطأ

    if (!ar1.includes(text)) return m.reply(`'${text}' مش موجود!\n\n${ar1.map(v => ' ' + v).join`\n`}`)  // لو الاسم مش موجود، نبعت رسالة خطأ

    m.reply(fs.readFileSync('./plugins/' + text + '.js', 'utf-8'))  // لو الاسم موجود، نقرأ محتوى الملف ونبعت الرد
}

handler.help = ['جبلي-البلجن'].map(v => v + ' <النص>')  // تحديد شكل الأمر في المساعدة
handler.tags = ['owner']  // تحديد التاجات (الفئات) للأمر
handler.command = /^(باتش|gp)$/i  // تحديد الأوامر اللي بتشغل الدالة
handler.rowner = true  // تحديد إن الأمر ده مخصص لصاحب البوت فقط

export default handler  // تصدير الدالة عشان نقدر نستخدمها في مكان تاني
