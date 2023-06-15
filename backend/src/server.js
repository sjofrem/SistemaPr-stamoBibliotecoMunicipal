const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");

const mongoURL = "mongodb://localhost:27017/sistema-biblioteca";

// Connect to database
mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Database connected!`);
    })
    .catch(err => {
        console.log(err.message);
    });

// Serve application
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});