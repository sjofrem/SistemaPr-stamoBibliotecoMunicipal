const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Prestamo = mongoose.model("Prestamo", {
    tipoPrestamo: String, 
    idEjemplar: ObjectId, 
    fechaPrestamo: String, 
    horaPrestamo: String, 
    fechaDev: String, 
    horaDev: String, 
    fechaDevReal: String, 
    horaDevReal: String
});

module.exports = { Prestamo };