const fs = require('fs/promises');
const path = require('path');

async function Alya(ctx, pesanID, balas) {
  const folderPath = path.join('./perintah');

  try {
    // Read directory asynchronously
    const files = await fs.readdir(folderPath);

    // Filter for .js files
    const jsFiles = files.filter(file => path.extname(file) === '.js');

    // Sort files alphabetically
    jsFiles.sort();

    // Join file names into a single string, removing the .js extension
    const commandList = jsFiles.map(file => path.basename(file, '.js')).join('\n');
    ctx.reply(`Daftar perintah: ${pesanID}\n${commandList}`);
  } catch (error) {
    ctx.reply('An error occurred while fetching command list.');
  }
}

const info = { kuldown: 30 }
module.exports = { Alya, info };