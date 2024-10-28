let mediaa = await ytMp4(youtubeLink)
await conn.sendMessage(m.chat, { document: { url: mediaa.result }, fileName: `error.mp4`, caption: `_${wm}_`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: m })     
} catch (E2) {  
//console.log('Error 2 ' + E2)   
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`)    
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
let n2 = lolh.result.link
let n3 = lolh.result.size
let n4 = lolh.result.thumbnail
await conn.sendMessage(m.chat, { document: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `🧚🏼‍♂️ *ده الفيديو بتاعك* \n🔥 *العنوان*: ${n}`, thumbnail: await fetch(n4) }, { quoted: m })
} catch (E3) {
//console.log('Error 3 ' + E3)   
}}}}}
handler.help = ['ytmp4doc', 'ytmp3doc'];
handler.tags = ['downloader'];
handler.command = /^ytmp3doc|ytmp4doc?$/i
export default handler

function bytesToSize(bytes) {
return new Promise((resolve, reject) => {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
if (bytes === 0) return 'n/a';
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
if (i === 0) resolve(`${bytes} ${sizes[i]}`);
resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`)})};

async function ytMp3(url) {
return new Promise((resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
let { contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { audio: item.url, size: bytes }}};
let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, result2: resultFix, thumb })}).catch(reject)})}

async function ytMp4(url) {
return new Promise(async(resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
let { qualityLabel, contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { video: item.url, quality: qualityLabel, size: bytes }}};
let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, rersult2: resultFix[0].video, thumb })}).catch(reject)})};

async function ytPlay(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getAudio = await ytMp3(random);
resolve(getAudio)}).catch(reject)})};

async function ytPlayVid(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getVideo = await ytMp4(random);
resolve(getVideo)}).catch(reject)})};
