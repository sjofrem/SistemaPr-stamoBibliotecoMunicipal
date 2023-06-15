const { User } = require("./models/User.js");
const { Document } = require("./models/Document.js");
const { Request } = require("./models/Request.js");
const { Ejemplar } = require("./models/Ejemplar.js");
const { Prestamo } = require("./models/Prestamo.js");

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
        ejemplares: async () => await Ejemplar.find({}), //return array of ejemplares
        ejemplar: async (parent,args) => await Ejemplar.findById(args.id), //return ejemplar by id
        prestamos: async () => await Prestamo.find({}), //return array of prestamos
        prestamo: async (parent,args) => await Prestamo.findById(args.id), //return prestamo by id
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
        createEjemplar: async (parent, args) => {
            const { idDocumento, estado, ubicacion } = args;
            const newEjemplar = new Ejemplar({
                idDocumento,
                estado,
                ubicacion
            });
            await newEjemplar.save();
            return newEjemplar;
        },
        updateEjemplar: async (parent, args) => {
            const { id } = args;
            const updatedEjemplar = await Ejemplar.findByIdAndUpdate(id, args);
            if (!updatedEjemplar) {
                throw new Error(`Ejemplar with ID ${id} not found`);
            }
            return updatedEjemplar;
        },
        deleteEjemplar: async (parent, args) => {
            const { id } = args;
            const deletedEjemplar = await Ejemplar.findByIdAndDelete(id);
            if (!deletedEjemplar) {
                throw new Error(`Ejemplar with ID ${id} not found`);
            }
            return deletedEjemplar;
        },
        createPrestamo: async (parent, args) => {
            const { tipoPrestamo, idEjemplar, fechaPrestamo, horaPrestamo, fechaDev, horaDev, fechaDevReal, horaDevReal} = args;
            const newPrestamo = new Prestamo({
                tipoPrestamo,
                idEjemplar, 
                fechaPrestamo, 
                horaPrestamo, 
                fechaDev, 
                horaDev, 
                fechaDevReal, 
                horaDevReal
            });
            await newPrestamo.save();
            return newPrestamo;
        },
        updatePrestamo: async (parent, args) => {
            const { id } = args;
            const updatedPrestamo = await Prestamo.findByIdAndUpdate(id, args);
            if (!updatedPrestamo) {
                throw new Error(`Prestamo with ID ${id} not found`);
            }
            return updatedPrestamo;
        },
        deletePrestamo: async (parent, args) => {
            const { id } = args;
            const deletedPrestamo = await Prestamo.findByIdAndDelete(id);
            if (!deletedPrestamo) {
                throw new Error(`Prestamo with ID ${id} not found`);
            }
            return deletedPrestamo;
        },
    },
};

module.exports = { resolvers };