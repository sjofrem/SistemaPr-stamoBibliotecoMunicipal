const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Ejemplar = mongoose.model("Ejemplar", {
    idDocumento: ObjectId,
    estado: String,
    ubicacion: String
});

module.exports = { Ejemplar };