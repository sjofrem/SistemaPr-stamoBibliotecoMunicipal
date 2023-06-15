const { User } = require("./models/User.js");
const { Request } = require("./models/Request.js");

// GraphQL Resolvers
const resolvers = {
    Query: {
        hello: () => "Hello from Reflectoring Blog",
        welcome: (parent, args) => `Hello ${args.name}`,
        users: async () => await User.find({}), // return array of users
        user: async (parent, args) => await User.findById(args.id), // return user by id
        requests: async () => await Request.find({}), // return array of Requests
        request: async (parent, args) => await Request.findById(args.id), // return Request by id
    },
    Mutation: {
        createUser: async (parent, args) => {
            const { firstName, lastName, age } = args;
            const newUser = new User({
                firstName,
                lastName,
                age,
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