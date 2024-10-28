const xpperlimit = 750;
const handler = async (m, {conn, command, args}) => {
    let count = command.replace(/^buy/i, '');
    count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
    count = Math.max(1, count);
    if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
        global.db.data.users[m.sender].exp -= xpperlimit * count;
        global.db.data.users[m.sender].limit += count;
        conn.reply(m.chat, `╔═❖ *إيصال الدفع*
║‣ *اشتريت :* ${count} 💎 
║‣ *استخدمت :* ${xpperlimit * count} XP
╚═══════════════`, m);
    } else {
        conn.reply(m.chat,` *معندكش نقات XP كافية لشراء ${count} ألماس💎* `, m);
    }
};
handler.help = ['buy', 'buyall'];
handler.tags = ['econ'];
handler.command = ['اشتري', 'buyall'];
handler.register = true;
export default handler;
