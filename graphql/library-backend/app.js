const moongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MOMGODB_URI = process.env.MOMGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
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
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // update for bookCount
    allBooks: async (root, args) => {
      return Book.find({ author: args.author, genres: args.genre })
    },
    allAuthors: async (root, args) => {
      return Author.find({})
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
      addBook: async (root, args) => {
        const book = new Book ({ ... args })
        return book.save()
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return person.save()
      },
    },
  },
};