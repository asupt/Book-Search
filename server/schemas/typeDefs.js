const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  savedBooks: [Book]
}

type Book {
  bookId: ID!
  title: String
  authors: [author]
  image: String
  link: String
  description: String
}

type Auth {
  token: String
  user: User
}

type Query {
  User(userId: ID!): User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(book: BookInput!): User
  deleteBook(bookId: ID!): User
}

input BookInput {
  bookId: ID!
  title: String
  authors: [author]
}

`;

module.exports = typeDefs;
