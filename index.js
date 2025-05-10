require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Añade el módulo path si vas a servir archivos

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => { 
  res.send('¡Bienvenido a mi API!');
  
});

app.use('/api/auditorios', require('./routes/auditorios'));
app.use('/api/chatgpt', require('./routes/chatgpt'));

// --- CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error de conexión:', err));

// --- INICIO DEL SERVIDOR ---
app.listen(5000, () => console.log('🚀 Servidor corriendo en puerto 5000'));