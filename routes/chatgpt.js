const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const Auditorio = require('../models/Auditorio');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  const { pregunta } = req.body;

  try {
    const auditorios = await Auditorio.find();

    // Captura solo lo necesario
    const resumen = auditorios.map(a => ({
      nombre: a.nombre,
      tipo_tablero: a.tipo_tablero
    }));

    // Detectar si la pregunta busca comparar o listar
    const preguntaMin = pregunta.toLowerCase();
    const esPreguntaSobreTipos = preguntaMin.includes('tablero') || preguntaMin.includes('tipos');

    const prompt = esPreguntaSobreTipos
      ? `Lista todos los tipos de tablero encontrados en estos auditorios y si puedes, explica sus diferencias. No recomiendes auditorios.

Auditorios:
${resumen.map(a => `- ${a.nombre}: ${a.tipo_tablero}`).join('\n')}

Pregunta: ${pregunta}`
      : `Estos son los datos de los auditorios:
${resumen.map(a => `- ${a.nombre}: ${a.tipo_tablero}`).join('\n')}

Responde a la siguiente pregunta con claridad:
${pregunta}`;

    const chatResponse = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Eres un asistente experto en características de auditorios. Responde con precisión usando solo los datos proporcionados.' },
        { role: 'user', content: prompt }
      ],
      model: 'gpt-3.5-turbo'
    });

    const respuesta = chatResponse.choices[0].message.content;
    res.json({ respuesta });

  } catch (error) {
    console.error("❌ Error con ChatGPT:", error.message);
    res.status(500).json({ error: 'Error al consultar ChatGPT' });
  }
});

module.exports = router;
