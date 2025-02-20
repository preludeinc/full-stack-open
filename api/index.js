const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  }),
)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    const numEntries = people.length
    res.send(`<p>Phonebook has info for ${numEntries} people</p>
      <p>${new Date()}</p>`)
  })
})

app.get('/api/people', (req, res) => {
  Person.find({})
    .then((people) => res.status(200).json(people))
    .catch((error) => next(error))
})

app.get('/api/people/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/people/:id', async (req, res, next) => {
  const { name, number } = req.body
  if (name === undefined || number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { runValidators: true, context: 'query', new: true }
  )
    .then(updatedPerson => {
      res.status(201).json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.post('/api/people', (req, res, next) => {
  const { name, number } = req.body
  if (name === undefined || number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: name,
    number: number,
  })

  person.save()
    .then((savedPerson) => {
      res.status(200).json(savedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/people/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
