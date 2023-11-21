const express = require('express');
const bodyParser = require('body-parser');
const Detalle = require('../models/detalleModel');

const router = express.Router();
router.use(bodyParser.json());

// Ruta para aumentar las visitas
router.post('/:idUniversity/visitas', async (req, res) => {
  try {
    const detalle = await Detalle.findById(req.params.id);

    if (!detalle) {
      return res.status(404).json({ mensaje: 'Detalle no encontrado' });
    }

    // Incrementa el contador de visitas
    detalle.visitas += 1;

    // Guarda el detalle actualizado en la base de datos
    await detalle.save();

    res.json({ mensaje: 'Visita registrada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
