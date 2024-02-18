// apolloServer.js
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema'); // Define your GraphQL schema
const resolvers = require('./graphql/resolvers'); // Implement your resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;
