const personsRouter = require('express').Router()
const Person = require('../models/Person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then(Persons => {
    response.json(Persons.map(Person => Person.toJSON()))
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(Person => {
      if (Person) {
        response.json(Person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  const Person = new Person({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  Person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const Person = {
    content: body.content,
    important: body.important,
  }

  Person.findByIdAndUpdate(request.params.id, Person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

module.exports = personsRouter