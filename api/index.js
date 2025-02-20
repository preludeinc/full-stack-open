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
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body) 
        ].join(' ')
    })
)

app.get('/info', (req, res) => {
    Person.find({}).then(people => {
        const numEntries = people.length;
        res.send(`<p>Phonebook has info for ${numEntries} people</p>
            <p>${Date(Date.now())}</p>`)
    })
})

app.get('/api/people', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

app.get('/api/people/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error)) 
})

app.put('/api/people/:id', (req, res, next) => {
    const body = req.body
        if (body.name === undefined || body.number === undefined) {
            return res.status(400).json({ error: 'content missing'})
        }
    
        Person.findByIdAndUpdate(req.params.id, {
            name: body.name,
            number: body.number
        })
        .then(updatedPerson => {
            res.status(201).json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/people', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/people/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
