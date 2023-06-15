const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        hello: String
        welcome(name: String): String
        users: [User] #return array of users
        user(id: ID): User #return user by id
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
    type Mutation {
        createUser(rut: String, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, huella: String, foto: String, administrador: Boolean, contrasena: String): User
        updateUser(id: ID, nombres: String, apellidos: String, direccion: String, telefono: Int, mail: String, huella: String, foto: String, administrador: Boolean, contrasena: String): User
        deleteUser(id: ID): User
    }
`;

module.exports = { typeDefs };