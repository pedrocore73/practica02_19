let mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);