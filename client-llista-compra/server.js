require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Servir arxius estàtics
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Client escoltant al port ${PORT}`);
  console.log(`Accedeix a http://localhost:${PORT} per veure la llista en temps real`);
});

