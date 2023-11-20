// routes/universityRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Comment = require('../models/comments');
router.use(bodyParser.json());

// Ruta para obtener todos los datos de University
router.post('/comments', async (req, res) => {
  try {
    const { like, dislike, fecha, comentario, universityName } = req.body;
    const newComment = new Comment({ like, dislike, fecha, comentario, universityName });
    await newComment.save();
    res.status(201).json({ message: 'Comentario creado exitosamente', comment: newComment });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el comentario', error: err.message });
  }
});

// Ruta para obtener todos los comentarios

router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: err.message });
  }
});

module.exports = router;