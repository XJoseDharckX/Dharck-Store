const fs = require('fs');
const https = require('https');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

// Lista de números de vendedores
const vendedores = [
  '584126027407',
  '5214951219766',
  '5353148505'
];

client.on('ready', async () => {
  console.log('✅ Bot listo para actualizar fotos de perfil...');

  for (const num of vendedores) {
    try {
      const chatId = `${num}@c.us`;
      const url = await client.getProfilePicUrl(chatId);

      if (url) {
        const filePath = `public/images/vendedores/${num}.jpg`;
        const file = fs.createWriteStream(filePath);
        https.get(url, response => {
          response.pipe(file);
          console.log(`🖼️ Imagen actualizada: ${filePath}`);
        });
      } else {
        console.log(`❌ No se encontró imagen para ${num}`);
      }
    } catch (error) {
      console.error(`⚠️ Error con ${num}:`, error.message);
    }
  }
});

client.initialize();
