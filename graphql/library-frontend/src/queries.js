import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
    }
  }
`

const UPDATE_BIRTH_YEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`


export {
    ALL_AUTHORS,
    ALL_BOOKS,
    ADD_BOOK,
    UPDATE_BIRTH_YEAR
}