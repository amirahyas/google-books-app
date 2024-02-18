// server/apolloServer.js
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphql/schema'); // Import your GraphQL schema
const resolvers = require('./graphql/resolvers'); // Import your GraphQL resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

module.exports = app;
