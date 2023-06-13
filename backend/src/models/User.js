const mongoose = require("mongoose");

const User = mongoose.model("User", {
    rut: String,
    nombres: String,
    apellidos: String,
    direccion: String,
    telefono: Number,
    mail: String,
    huella: String,
    foto: String,
    administrador: Boolean,
    contrasena: String
});

module.exports = { User };