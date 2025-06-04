const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Crea el archivo ZIP
const output = fs.createWriteStream(path.join(__dirname, 'images.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ ZIP creado: ${archive.pointer()} bytes`);
});

archive.on('error', err => { throw err; });

archive.pipe(output);

// Agrega la carpeta de imágenes al ZIP
const imagePath = path.join(__dirname, 'public', 'images');
archive.directory(imagePath, false);

archive.finalize();
