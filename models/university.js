const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    city: String,
    idUniversity: Number
});

const University = mongoose.model('University', universitySchema);

module.exports = University;


