const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    like: { type: Boolean, default: 0 },
    fecha: { type: Date, default: Date.now },
    comentario: { type: String, required: true },
    universityName: { type: String, required: true },
    idUniversity: { type: Number},
    usuario: {type: String, required: true}
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;


