const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
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

const generateId = () => {
    const maxId = people.length > 0
    const id = maxId ? people.length + 1 : 0
    return String(id)
}

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

app.get('/api/people/:id', (req, res) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
})

app.put('/api/people/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    if (id in people) {
        const updatePerson = {
            id: id,
            name: body.name,
            number: body.number
        }
        res.json(updatePerson)
        people[id] = updatePerson

    } else {
        return res.status(404).json({
            error: 'person not found'
        })
    }
})

app.post('/api/people', (req, res) => {
    const body = req.body

    if (body.content === undefined) {
        return res.status(400).json({ error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedperson)
    })
})

app.delete('/api/people/:id', (req, res) => {
    const id = req.params.id
    people = people.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
