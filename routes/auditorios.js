const express = require('express');
const router = express.Router();
const Auditorio = require('../models/Auditorio');

router.get('/', async (req, res) => {
  try {
    const auditorios = await Auditorio.find();
    res.json(auditorios);
  } catch (err) {
    console.error('❌ Error al obtener auditorios:', err.message);
    res.status(500).json({ error: 'Error al obtener auditorios' });
  }
});

module.exports = router;
