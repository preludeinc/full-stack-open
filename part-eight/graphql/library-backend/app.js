const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const cors = require('cors')

const Author = require('./models/author')
const Book = require('./models/book')
const typeDefs = require('./schema')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // update for bookCount
    allBooks: async (root, args) => {
      const filters = {}
      if (args.author) filters.author = args.author
      if (args.genre) filters.genres = args.genre
      return Book.find({ filters })
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    Mutation: {
      addBook: async (root, args) => {
        const book = new Book ({ ...args })
        return book.save()
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      },
    },
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