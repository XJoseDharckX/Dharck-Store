// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir contenido estático desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz para servir el HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${port}`);
});
