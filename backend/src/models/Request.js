const mongoose = require("mongoose");

const Request = mongoose.model("Request", {
    idUsuario: String,
    idEjemplar: String,
    fecha: String,
    hora: String
});

module.exports = { Request };