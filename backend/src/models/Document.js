const mongoose = require("mongoose");
/* const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId */

const Document = mongoose.model("Document", {
    titulo: String,
    autor: String,
    editorial: String,
    ano: Number,
    edicion: String,
    categoria: String,
    imagen: String,
    estado: String,
    tipo_medio: String
});

module.exports = { Document };