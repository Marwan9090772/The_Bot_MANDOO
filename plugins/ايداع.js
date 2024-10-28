const handler = async (m, { conn, command, args }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    else who = m.sender;
    let users = global.db.data.users[m.sender];

    if (command == 'dep' || command == 'depositar') {
        if (!args[0]) return m.reply(`[ ⚠️ ] *إدخال المبلغ لإضافته إلى حسابك البنكي* `);
        if (args[0] == '--all') {
            let count = parseInt(users.limit);
            users.limit -= count * 1;
            users.banco += count * 1;
            await m.reply(` *[ 🏦 ] لقد أضفت المبلغ كامل.* `);
            return !0;
        }
        if (!Number(args[0])) return m.reply(` *[❗] المبلغ يجب أن يكون رقماً* `);
        let count = parseInt(args[0]);
        if (!users.limit) return m.reply(` *مع الأسف ليس لديك ما يكفي من المبلغ *`);
        if (users.limit < count) return m.reply(`*لا يمكنك أداء هذه العملية، لأن المبلغ غير كافٍ، يرجى استخدام الأمر:* #bal`);
        users.limit -= count * 1;
        users.banco += count * 1;
        await m.reply(` *[🏦] لقد قمت بإيداع ${count} من المبلغ إلى البنك.*`);
    }

    if (command == 'retirar' || command == 'toremove') {
        let user = global.db.data.users[m.sender];
        if (!args[0]) return m.reply(`[❗] *الرجاء إدخال المبلغ الذي تريد سحبه* `);
        if (args[0] == '--all') {
            let count = parseInt(user.banco);
            user.banco -= count * 1;
            user.limit += count * 1;
            await m.reply(` *[🏦] لقد قمت بسحب (${count}) من المبلغ من البنك.* `);
            return !0;
        }
        if (!Number(args[0])) return m.reply(` *[❗] المبلغ يجب أن يكون رقماً* `);
        let count = parseInt(args[0]);
        if (!user.banco) return m.reply(`*معكش المبلغ ده في البنك يا حب* `);
        if (user.banco < count) return m.reply(` *لا يمكنك أداء هذه العملية، لأن المبلغ غير كافٍ، يرجى استخدام الأمر:* #bal`);
        user.banco -= count * 1;
        user.limit += count * 1;
        await m.reply(` *[🏦] لقد قمت بسحب (${count}) من المبلغ من البنك.* `);
    }
};

handler.help = ['dep', 'retirar'];
handler.tags = ['econ'];
handler.command = /^(dep|ايداع|retirar|toremove)$/i;
handler.register = true;

export default handler;
