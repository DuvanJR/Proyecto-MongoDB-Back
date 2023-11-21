// routes/universityRoutes.js
const express = require('express');
const router = express.Router();
const University = require('../models/university');

// Ruta para obtener todos los datos de University
router.get('/universities', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener el total de visitas de una universidad por su IdUniversity
router.get('/universities/:idUniversity/visits', async (req, res) => {
  try {
    const { idUniversity } = req.params;

    // Cambia find() por findOne()
    const university = await University.findOne({ idUniversity: idUniversity });

    if (!university) {
      return res.status(404).json({ message: 'Universidad no encontrada' });
    }

    // Incrementa el conteo de visitas
    university.visits += 1;
    await university.save();

    // Devuelve el total de visitas
    res.json({ visits: university.visits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
