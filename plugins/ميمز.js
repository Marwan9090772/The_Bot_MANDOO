import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const response = await axios.get('https://meme-api.herokuapp.com/gimme/EgyptianMemes', {
      responseType: 'json', 
    });

    const memeData = response.data;
    const imageUrl = memeData.url;
    const title = memeData.title;

    
    conn.sendFile(m.chat, imageUrl, 'ميمز.jpg', title, m);
    m.reply('😹');
  } catch (error) {
    console.error(error);
    m.reply(' *عيد من تاني  حصل خطاء🧸* .');
  }
};

handler.help = ['ميمز'];
handler.tags = ['تسلية'];
handler.command = ['ميمز', 'صور_مضحكه'];
handler.diamond = false;

export default handler;
