/* HADY ZEN'IN */

const fs = require('fs');
const path = require('path');
const config = require('./config');
var { warna, logo } = require('./hady-zen/log');
const { Telegraf } = require('./alya-chat-api');
const { kuldown } = require('./hady-zen/kuldown');
const folderPath = path.join(__dirname, 'perintah');
var bot = new Telegraf(config.token);

console.log(warna.biru + `░█████╗░██╗░░░██╗░░░██╗░█████╗  ░░█████╗░██╗
██╔══██╗██║░░░╚██╗░██╔╝██╔══██╗  ██╔══██╗██║
███████║██║░░░░╚████╔╝░███████║  ███████║██║
██╔══██║██║░░░░░╚██╔╝░░██╔══██║  ██╔══██║██║
██║░░██║███████╗░██║░░░██║░░██║  ██║░░██║██║
╚═╝░░╚═╝╚══════╝░╚═╝░░░╚═╝░░╚═╝  ╚═╝░░╚═╝╚═╝
                             by Hādy Rikātekí\n` + warna.reset);

if (!config || config.token.length < 0) {
  console.log(logo.akun + "kamu belum masukkan token botmu di config");
} 
    bot.launch().then(() => {
        console.log("Bot berhasil diluncurkan.");
    }).catch((error) => {
        console.log(" Token tidak valid");
    });

bot.on('text', async (ctx) => {
  var pesan = ctx.message.text.trim();
  if (pesan.toLowerCase() == "prefix") {
      ctx.reply(`✨️ Awalan ${config.nama} adalah: [ ${config.prefix} ]`);
  console.log(logo.cmds + "menjalankan perintah prefix.");
    } else if (!pesan.startsWith(config.prefix)) {
    if (ctx.message.chat.type === 'supergroup') { 
    console.log(logo.pesan + `GC > ${ctx.message.chat.id} | ${ctx.message.from.username}: ${ctx.message.text}`);
    } else {
   console.log(logo.pesan + `PM > ${ctx.message.chat.id} | ${ctx.message.from.username}: ${ctx.message.text}`);
    }
  } else { 

  const fileName = pesan.slice(1).split(" ")[0] + ".js";  // Get the file name from the text
  const filePath = path.join(folderPath, fileName);  // Build the file path
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, async (err) => {
    if (err) {
      ctx.reply(`Perintah ${fileName.split(".")[0]} tidak ada.`);
      console.log(logo.cmds + `perintah ${fileName.split(".")[0]} tidak ditemukan`);   
    } else {
      console.log(logo.cmds + "menjalankan perintah " + fileName);     
const { Alya, info } = require(filePath); 
if (kuldown(ctx.message.from.id, fileName, info.kuldown) == 'ok') {
  Alya(ctx);
} else {
  ctx.reply(`Masih kuldown.`);
}
    }
  });
}
});

