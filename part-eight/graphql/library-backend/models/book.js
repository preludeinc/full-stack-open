const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String }
  ]
})

book.plugin(uniqueValidator)

module.exports = mongoose.model('Book', book)