const handler = async (m, { text }) => {
  const user = global.db.data.users[m.sender];
  user.afk = + new Date;
  user.afkReason = text;
  m.reply(`╭━─━─━≪ 𝙰𝙺𝙵 ≫─━─━─━•
┃  
┃ 𝚄𝚂𝙴𝚁: ${conn.getName(m.sender)} 
┃ بقى مش متاح.
┃ ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
┃ 💤 𝙼𝙸𝚂𝙼𝚈𝚂: ${text ? ': ' + text : 'مفيش سبب معروف'}*
╰━─━─━─≪ 𝙰𝙺𝙵 ≫─━─━─━•`);
};
handler.help = ['afk [سبب]'];
handler.tags = ['econ'];
handler.command = /^afk$/i;
handler.money = 75;
handler.register = true;

export default handler;
