// routes/universityRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Comment = require('../models/comments');
router.use(bodyParser.json());


// Ruta para crear comentarios
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
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: err.message });
  }
});


// Ruta para obtener comentarios por idUniversity - ascendente
router.get('/comments/:idUniversity', async (req, res) => {
  try {
    const idUniversity = req.params.idUniversity;
    const comments = await Comment.find({ idUniversity: idUniversity }).sort({ fecha: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: err.message });
  }
});


// Ruta para el estado del like /true - false
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

    // Cambia el valor del campo like al valor proporcionado
    comment.like = likeValue;

    // cambia el estado a dislike - false
    comment.dislikes = !likeValue;

    await comment.save();
    res.json({ like: comment.like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = router;