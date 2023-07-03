const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        hello: String
        welcome(name: String): String
        users: [User] #return array of users
        user(id: ID): User #return user by id
        documents: [Document] #return array of documents
        document(id: ID): Document #return document by id
        requests: [Request] #return array of requests
        request(id: ID): Request #return request by id
        ejemplares: [Ejemplar] #return array of Ejemplares
        ejemplar(id: ID): Ejemplar #return Ejemplar by id
        prestamos: [Prestamo] #return array of Prestamos
        prestamo(id: ID): Prestamo #return Prestamo by id
    }
    type Document {
        id: ID,
        titulo: String,
        autor: String,
        editorial: String,
        ano: Int,
        edicion: String,
        categoria: String,
        imagen: String,
        estado: String,
        tipo_medio: String
    }
    type User {
        id: ID
        rut: String
        nombres: String
        apellidos: String
        direccion: String
        telefono: Int
        mail: String
        huella: String
        foto: String
        administrador: Boolean
        contrasena: String
    }
    type Request {
        id: ID
        idUsuario: ID
        idEjemplar: ID
        fecha: String
        hora: String
    }
    type Ejemplar {
        id: ID
        idDocumento: ID
        estado: String
        ubicacion: String
    }
    type Prestamo {
        id:ID
        tipoPrestamo: String
        idEjemplar: ID
        fechaPrestamo: String
        horaPrestamo: String
        fechaDev: String
        horaDev: String
        fechaDevReal: String
        horaDevReal: String
    }
    type Mutation {
        #User
        createUser(rut: String, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, huella: String, foto: String, administrador: Boolean, contrasena: String): User
        updateUser(id: ID, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, huella: String, foto: String, administrador: Boolean, contrasena: String): User
        deleteUser(id: ID): User
        #Document
        createDocument(id: ID, titulo: String, autor: String, editorial: String, ano: Int, edicion: String, categoria: String, imagen: String, estado: String, tipo_medio: String): Document
        updateDocument(id: ID, titulo: String, autor: String, editorial: String, ano: Int, edicion: String, categoria: String, imagen: String, estado: String, tipo_medio: String): Document
        deleteDocument(id: ID): Document
        #Request
        createRequest(idUsuario: ID, idEjemplar: ID, fecha: String, hora: String): Request
        updateRequest(id: ID, idEjemplar: ID, fecha: String, hora: String): Request
        deleteRequest(id: ID): Request
        #Ejemplar
        createEjemplar(idDocumento: ID, estado: String, ubicacion: String): Ejemplar
        updateEjemplar(id: ID, idDocumento: ID, estado: String, ubicacion: String): Ejemplar
        deleteEjemplar(id: ID): Ejemplar
        #Prestamo
        createPrestamo(tipoPrestamo: String, idEjemplar: ID, fechaPrestamo: String, horaPrestamo: String, fechaDev: String, horaDev: String, fechaDevReal: String, horaDevReal: String): Prestamo
        updatePrestamo(id: ID, fechaDevReal: String, horaDevReal: String): Prestamo
        deletePrestamo(id: ID): Prestamo
    }
`;

module.exports = { typeDefs };