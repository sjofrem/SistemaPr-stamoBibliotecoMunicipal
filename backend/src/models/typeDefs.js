const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        hello: String
        welcome(name: String): String
        users: [User] #return array of users
        user(id: ID): User #return user by id
        documents: [Document] #return array of documents
        document(id: ID): Document #return document by id
    }
    type Document {
        id: ID,
        tipo: String,
        titulo: String,
        autor: String,
        editorial: String,
        ano: Int,
        edicion: String,
        categoria: String,
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
        foto: String
        administrador: Boolean
        contrasena: String
    }
    type Mutation {
        #User
        createUser(rut: String, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, foto: String, administrador: Boolean, contrasena: String): User
        updateUser(id: ID, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, foto: String, administrador: Boolean, contrasena: String): User
        deleteUser(id: ID): User
        #Document
        createDocument(id: ID, tipo: String, titulo: String, autor: String, editorial: String, ano: Int, edicion: String, categoria: String, tipo_medio: String): Document
        updateDocument(id: ID, tipo: String, titulo: String, autor: String, editorial: String, ano: Int, edicion: String, categoria: String, tipo_medio: String): Document
        deleteDocument(id: ID): Document
    }
`;

module.exports = { typeDefs };