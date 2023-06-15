const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        hello: String
        welcome(name: String): String
        users: [User] #return array of users
        user(id: ID): User #return user by id
        requests: [Request] #return array of requests
        request(id: ID): Request #return request by id
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
    type Request {
        id: ID
        idUsuario: String
        idEjemplar: String
        fecha: String
        hora: String
    }
    type Mutation {
        createUser(rut: String, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, foto: String, administrador: Boolean, contrasena: String): User
        updateUser(id: ID, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, foto: String, administrador: Boolean, contrasena: String): User
        deleteUser(id: ID): User
        createRequest(idUsuario: String, idEjemplar: String, fecha: String, hora: String): Request
        updateRequest(id: ID, idEjemplar: String, fecha: String, hora: String): Request
        deleteRequest(id: ID): Request
    }
`;

module.exports = { typeDefs };