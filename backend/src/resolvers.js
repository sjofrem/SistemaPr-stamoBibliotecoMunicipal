const { User } = require("./models/User.js");

// GraphQL Resolvers
const resolvers = {
    Query: {
        hello: () => "Hello from Reflectoring Blog",
        welcome: (parent, args) => `Hello ${args.name}`,
        users: async () => await User.find({}), // return array of users
        user: async (parent, args) => await User.findById(args.id), // return user by id
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
    },
};

module.exports = { resolvers };