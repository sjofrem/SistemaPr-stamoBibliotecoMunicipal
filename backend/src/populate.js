const { Document } = require("./models/Document.js");
const { User } = require("./models/User.js");

function populateDatabase() {
    // Populate documents
    User.deleteMany({}).exec().then(() => {
        let newAdmin = new User({
            nombres: "Admin",
			rut: "0",
			apellidos: "Admin",
			direccion: "usm",
			telefono: 1234567,
			mail: "admin@usm.cl",
			huella: "huella",
			foto: "foto",
			administrador: true,
			contrasena: "admin"
        });
        newAdmin.save();
    });
    // Populate documents
    Document.deleteMany({}).exec().then(() => {
        let newDocument = new Document({
            titulo: "Cálculo Tomo 1", 
            autor: "Ron Larson y Bruce Edwars", 
            editorial: "Roland", 
            ano: "1999", 
            edicion: 2, 
            categoria: "Matemática",
            imagen: "https://image.isu.pub/150625191505-5af8235b1fff212aadb78af6cbaf8ebe/jpg/page_1.jpg",
            estado: "INSTOCK",
            tipo_medio: "libro"
        });
        newDocument.save();

        newDocument = new Document({
            titulo: "Aplicaciones de calculo diferencial", 
            autor: "Hernán Alberto Escobar J.", 
            editorial: "Roland", 
            ano: "1996", 
            edicion: 2, 
            categoria: "Matemática",
            imagen: "https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f3526f3bf-medium.jpg",
            estado: "INSTOCK",
            tipo_medio: "libro"
        });
        newDocument.save();

        newDocument = new Document({
            titulo: "Cálculo Diferencial", 
            autor: "Luis Alberto Puga", 
            editorial: "Roland", 
            ano: "2004", 
            edicion: 1, 
            categoria: "Matemática",
            imagen: "https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f351df745-large.jpg",
            estado: "INSTOCK",
            tipo_medio: "libro"
        });
        newDocument.save();
    });
}

module.exports = { populateDatabase };