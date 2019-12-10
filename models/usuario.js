let mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    direccion: String,
    cp: String,
    localidad: String,
    imagen: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);