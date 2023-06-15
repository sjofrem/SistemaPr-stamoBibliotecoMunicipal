const mongoose = require("mongoose");
/* const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId */

const Document = mongoose.model("Document", {
    //id: ObjectId,
    tipo: String,
    titulo: String,
    autor: String,
    editorial: String,
    ano: Number,
    edicion: String,
    categoria: String,
    tipo_medio: String
});

module.exports = { Document };