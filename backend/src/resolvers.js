const { User } = require("./models/User.js");
const { Document } = require("./models/Document.js");
const { Request } = require("./models/Request.js");

// GraphQL Resolvers
const resolvers = {
    Query: {
        hello: () => "Hello from Reflectoring Blog",
        welcome: (parent, args) => `Hello ${args.name}`,
        users: async () => await User.find({}), // return array of users
        user: async (parent, args) => await User.findById(args.id), // return user by id
        documents: async () => await Document.find({}), // return array of documents
        document: async (parent, args) => await Document.findById(args.id), // return document by id
        requests: async () => await Request.find({}), // return array of Requests
        request: async (parent, args) => await Request.findById(args.id), // return Request by id
    },
    Mutation: {
        createUser: async (parent, args) => {
            const { rut, nombres, apellidos, direccion, telefono, mail, huella, foto, administrador, contrasena} = args;
            const newUser = new User({
                rut,
                nombres,
                apellidos,
                direccion,
                telefono,
                mail,
                huella,
                foto,
                administrador,
                contrasena
            });
            await newUser.save();
            return newUser;
        },
        updateUser: async (parent, args) => {
            const { id } = args;
            const updatedUser = await User.findByIdAndUpdate(id, args);
            if (!updatedUser) {
                throw new Error(`User with ID ${id} not found`);
            }
            return updatedUser;
        },
        deleteUser: async (parent, args) => {
            const { id } = args;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new Error(`User with ID ${id} not found`);
            }
            return deletedUser;
        },
        createDocument: async (parent, args) => {
            const { tipo, titulo, autor, editorial, ano, edicion, categoria, tipo_medio } = args;
            const newDocument = new Document({
                tipo, 
                titulo, 
                autor, 
                editorial, 
                ano, 
                edicion, 
                categoria, 
                tipo_medio
            });
            await newDocument.save();
            return newDocument;
        },
        updateDocument: async (parent, args) => {
            const { id } = args;
            const updatedDocument = await Document.findByIdAndUpdate(id, args);
            if (!updatedDocument) {
                throw new Error(`Document with ID ${id} not found`);
            }
            return updatedDocument;
        },
        deleteDocument: async (parent, args) => {
            const { id } = args;
            const deletedDocument = await Document.findByIdAndDelete(id);
            if (!deletedDocument) {
                throw new Error(`Document with ID ${id} not found`);
            }
            return deletedDocument;
        },
        // Request CUD
        createRequest: async (parent, args) => {
            const { idUsuario, idEjemplar, fecha, hora } = args;
            const newRequest = new Request({
                idUsuario,
                idEjemplar,
                fecha,
                hora
            });
            await newRequest.save();
            return newRequest;
        },
        updateRequest: async (parent, args) => {
            const { id } = args;
            const updatedRequest = await Request.findByIdAndUpdate(id, args);
            if (!updatedRequest) {
                throw new Error(`Request with ID ${id} not found`);
            }
            return updatedRequest;
        },
        deleteRequest: async (parent, args) => {
            const { id } = args;
            const deletedRequest = await Request.findByIdAndDelete(id);
            if (!deletedRequest) {
                throw new Error(`Request with ID ${id} not found`);
            }
            return deletedRequest;
        },
    },
};

module.exports = { resolvers };