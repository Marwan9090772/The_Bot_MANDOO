const dir = [
'https://telegra.ph/file/f36ae02e21b619da17eb0.mp4',
'',
  'https://telegra.ph/file/56692b4048a053e1521f4.mp4',
  'https://telegra.ph/file/d9df33bfb77ae89df2e2e.mp4',
  'https://telegra.ph/file/f32a3bbd398a1b45a5172.mp4',
  'https://telegra.ph/file/46d7addbecd24cc71ea03.mp4',
  'https://telegra.ph/file/74a2750804e658472fd9a.mp4',
  'https://telegra.ph/file/5c3bf8a3d4d9742877a45.mp4',
  'https://telegra.ph/file/002668dc33c9b2a12ae03.mp4',
  'https://telegra.ph/file/7d122c46f77c68185ea20.mp4',

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['كوجي'] 

export default handler
