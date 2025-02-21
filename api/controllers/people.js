const peopleRouter = require('express').Router()
const Person = require('../models/person')

peopleRouter.get('/', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

peopleRouter.get('/:id', (req, res, next) => {
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

peopleRouter.post('/', (req, res, next) => {
  const { name, number } = req.body

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

peopleRouter.put('/:id', async (req, res, next) => {
  const { name, number } = req.body

	const person = {
		name: name,
		number: number
	}

  Person.findByIdAndUpdate(req.params.id, person, { new: true }
  )
    .then(updatedPerson => {
      res.status(201).json(updatedPerson)
    })
    .catch((error) => next(error))
})

peopleRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = peopleRouter