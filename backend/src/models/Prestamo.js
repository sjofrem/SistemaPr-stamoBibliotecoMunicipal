const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Prestamo = mongoose.model("Prestamo", {
    apellido: String,
    documentos: String,
    fechaDevolucion: String, 
    fechaDevolucionReal: String, 
    fechaPrestamo: String,  
    modalidad: String, 
    nombre: String
});

module.exports = { Prestamo };