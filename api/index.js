const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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

let people = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    // const maxId = people.length > 0
    // ? Math.max(...people.map(p => Number(p.id)))
    // : 0
    const maxId = people.length > 0
    const id = maxId ? people.length + 1 : 0
    return String(id)
}

app.get('/info', (req, res) => {
    const numEntries = people.length;
    res.send(`<p>Phonebook has info for ${numEntries} people</p>
        <p>${Date(Date.now())}</p>`)
})

app.get('/api/people', (req, res) => {
    res.json(people)
})

app.get('/api/people/:id', (req, res) => {
    const id = req.params.id
    const person = people.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end()
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
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const hasValue = people.filter(person => person.name === body.name);
    if (hasValue.length > 0) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    people = people.concat(person)
    res.json(person)
})

app.delete('/api/people/:id', (req, res) => {
    const id = req.params.id
    people = people.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
