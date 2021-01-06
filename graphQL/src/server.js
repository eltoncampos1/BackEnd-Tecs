const  { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');
const path = require('path')

const resolvers = require('./resolvers');

mongoose.connect('mongodb://localhost:27017/graphqlnode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname,'routes', 'schema.graphql'),
    resolvers: resolvers,
});

server.start();