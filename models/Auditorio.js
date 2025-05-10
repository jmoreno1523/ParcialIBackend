const mongoose = require('mongoose');

const AuditorioSchema = new mongoose.Schema({
  nombre: String,
  edificio: String,
  piso: Number,
  capacidad: Number,
  puestos_contados: Number,
  tipo_aula: String,
  tipo_mesa: String,
  tipo_silla: String,
  tipo_tablero: String,
  equipamiento_tecnologico: String,
  tomacorriente: String,
  movilidad: String,
  contacto_reserva: String,
  estado: String,
  reservas_ra: String,
  imagenUrl: String
});

module.exports = mongoose.model('Auditorio', AuditorioSchema);
