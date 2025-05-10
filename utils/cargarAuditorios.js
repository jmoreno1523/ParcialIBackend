require('dotenv').config(); // Esta línea debe estar antes de mongoose.connect
const mongoose = require('mongoose');
const fs = require('fs');
const Auditorio = require('../models/Auditorio');


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

const data = JSON.parse(fs.readFileSync('./utils/auditorios_mongo_ready.json', 'utf-8'));

async function cargar() {
  try {
    await Auditorio.deleteMany(); // limpia antes
    await Auditorio.insertMany(data);
    console.log("✅ Datos cargados");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.disconnect();
  }
}

cargar();
