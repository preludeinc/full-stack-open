const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
    
  type Author {
    name: String!
    bookCount: Int
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: String!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!, 
      setBornTo: Int!
    ): Author
  }
`
module.exports = typeDefs;
