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

router.post('/comments/:usuario/:like', async (req, res) => {
  try {
    const { usuario, like } = req.params;

    // Encuentra el comentario por su usuario
    const comment = await Comment.findOne({ usuario });

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    // Convierte el valor del parámetro like a un booleano
    const likeValue = like === 'true';

    // Actualiza el campo like con el valor proporcionado
    comment.like = likeValue;

    // Si deseas, también puedes reiniciar el campo dislikes
    comment.dislikes = !likeValue;

    // Guarda el comentario actualizado
    await comment.save();

    res.json({ like: comment.like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = router;