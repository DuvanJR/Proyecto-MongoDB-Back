// routes/universityRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Comment = require('../models/comments');
router.use(bodyParser.json());

// Ruta para obtener todos los datos de University
router.post('/comments', async (req, res) => {
  try {
    const { like, fecha, comentario, universityName,idUniversity, usuario } = req.body;
    const newComment = new Comment({ like, fecha, comentario, universityName, idUniversity, usuario});
    await newComment.save();
    res.status(201).json({ message: 'Comentario creado exitosamente', comment: newComment });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el comentario', error: err.message });
  }
});

// Ruta para obtener todos los comentarios

router.get('/comments/:idUniversity', async (req, res) => {
  try {
    const idUniversity = req.params.idUniversity;
    const comments = await Comment.find({ idUniversity: idUniversity });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: err.message });
  }
});



module.exports = router;