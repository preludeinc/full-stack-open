const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
let { books, authors } = require('./data') 

// const typeDefs = `
//   type Query {
//     bookCount: Int!
//     authorCount: Int!
//     allBooks(author: String, genre: String): [Book!]!
//     allAuthors: [Author!]!
//   }
    
//   type Author {
//     name: String!
//     bookCount: Int
//     id: ID!
//     born: Int
//   }

//   type Book {
//     title: String!
//     published: Int!
//     author: Author
//     id: String!
//     genres: [String!]!
//   }

//   type Mutation {
//     addBook(
//       title: String!
//       author: String!
//       published: Int!
//       genres: [String!]!
//     ): Book!
//     editAuthor(name: String!, setBornTo: Int!): Author
//   }
// `

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      args.author
        ? (books = books.filter((book) => book.author === args.author))
        : books;
      args.genre
        ? (books = books.filter((book) => book.genres.includes(args.genre)))
        : books;
      return books;
    },
    allAuthors: (root, args) => {
      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        id: author.id,
        bookCount: books.filter((book) => book.author === args.name)
          .length,
      }));
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres,
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
  },

  Mutation: {
    addBook: (root, args) => {
      author = authors.find((a) => a.name === args.author);
      if (!author) {
        const addAuthor = {
          name: args.author,
          born: null,
          bookCount: 1,
        }
        authors.push(addAuthor)
      } else {
        author.bookCount += 1
      }

      const updatedBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
      };
      existingBook = books.find((b) => b.title === args.title)

      if (existingBook) {
        books = books.map((b) => (b.title === args.title ? updatedBook : b));
      } else {
        books.push(updatedBook)
      }
      return updatedBook;
    },
    editAuthor: (root, args) => {
      let author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null
      }

      const updatedAuthor = {
        ...author,
        name: args.name,
        born: args.setBornTo
      }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
})
