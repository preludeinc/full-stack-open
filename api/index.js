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

app.put('/api/people/:id', async (req, res) => {
    try {
        const body = req.body
        if (body.name === undefined || body.number === undefined) {
            return res.status(400).json({ error: 'content missing'})
        }
    
        const updatePerson = await Person.findByIdAndUpdate(
            req.params.id, {
            name: body.name,
            number: body.number
        })

        if (!updatePerson ) {
            return res.status(404).json({
                error: 'person not found'
            })
        }
        res.status(201).json(updatePerson)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            error: 'server error'
        })
    }
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

app.delete('/api/people/:id', async (req, res) => {
    try {
        const deleted = await Person.findByIdAndDelete(req.params.id)

        if (!deleted) {
            return res.status(404).json({
                error: 'person not found'
            })
        } else {
            res.status(204).end()
        }
        res.status(204).end()
    } catch (err) {
        res.status(500).json({
            error: 'server error'
        })
    }
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
