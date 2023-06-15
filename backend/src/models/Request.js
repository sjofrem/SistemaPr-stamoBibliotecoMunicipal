const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Request = mongoose.model("Request", {
    idUsuario: ObjectId,
    idEjemplar: ObjectId,
    fecha: String,
    hora: String
});

module.exports = { Request };