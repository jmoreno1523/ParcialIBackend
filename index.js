require('dotenv').config();  // Cargar variables de entorno desde el archivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // Si necesitas servir archivos estáticos

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Ruta de prueba para la API
app.get('/', (req, res) => { 
  res.send('¡Bienvenido a mi API!');
});

// Usar las rutas para auditorios y chatgpt
app.use('/api/auditorios', require('./routes/auditorios'));
app.use('/api/chatgpt', require('./routes/chatgpt'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Iniciar el servidor en el puerto dinámico de producción o en 5000 en desarrollo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
