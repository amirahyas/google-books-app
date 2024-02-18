const { gql } = require('apollo-server-express');

const typeDefs = gql`
// graphql/schema.js

type Book {
  _id: ID
  title: String!
  author: String!
  description: String
  image: String
  link: String
}

type User {
  _id: ID
  username: String!
  email: String!
  savedBooks: [Book]
}

type AuthPayload {
  token: String
  user: User
}

type Query {
  books: [Book]
  me: User
}

input SaveBookInput {
  title: String!
  author: String!
  description: String
  image: String
  link: String
}

type Mutation {
  saveBook(input: SaveBookInput): Book
  removeBook(bookId: ID!): Book
  signup(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  logout: String
}

`;

module.exports = typeDefs;


