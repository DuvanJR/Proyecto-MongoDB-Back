const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    city: String,
    idUniversity: Number,
    visits: { type: Number, default: 0 },
});

const University = mongoose.model('University', universitySchema);

module.exports = University;


