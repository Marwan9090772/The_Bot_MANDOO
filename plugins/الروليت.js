let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let amount = parseInt(args[0])
    let color = args[1]?.toLowerCase()
    
    if (args.length < 2) {
        throw `🎪 *استخدم الأمر: ${usedPrefix + command} <المبلغ> <اللون>\n\n مثال: ${usedPrefix + command} 500 احمر*`
    }

    let colores = ['احمر', 'اسود']
    let colour = colores[Math.floor(Math.random() * colores.length)]
    let user = global.db.data.users[m.sender]

    if (isNaN(amount) || amount < 500) {
        throw `🎰 *الحد الأدنى للرهان هو 500 ذهب*`
    }

    if (!colores.includes(color)) {
        throw '🧚🏼‍♂️ *لازم تحدد لون صحيح احمر او اسود*'
    }

    if (user.credit < amount) {
        throw '😶 *ما عندكش رصيد كفاية!*'
    }

    if (amount > 100000) {
        throw `🟥 *مش ممكن تراهن بأكتر من 100000 ذهب*`
    }

    let result = ''
    if (colour === color) {
        result = `${colour === 'احمر' ? 'الكرة نزلت على 🔴' : 'الكرة نزلت على ⚫'} \n\n أنت كسبت ${amount * 2} ذهب.`
        user.credit += amount * 2
    } else {
        result = `${colour === 'احمر' ? 'الكرة نزلت على 🔴' : 'الكرة نزلت على ⚫'} \n\n خسرت ${amount} ذهب`
        user.credit -= amount
    }

    m.reply(result)
}

handler.help = ['roulette <amount> <color(احمر/اسود)>']
handler.tags = ['economy']
handler.command = ['الروليت']
handler.group = true

export default handler
