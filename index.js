require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error de conexión:', err));

app.use('/api/auditorios', require('./routes/auditorios'));

app.listen(5000, () => console.log('🚀 Servidor corriendo en puerto 5000'));

app.use('/api/chatgpt', require('./routes/chatgpt'));

