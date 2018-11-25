const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


let persons = []

morgan.token('json', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :json :status :response-time ms'))

app.get('/api/persons', (request, response) => {
  Person
  .find({}, {__v: 0})
  .then(persons => {
    response.json(persons.map(Person.format)
    )
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )
    Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.format(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined || body.name === '' || body.number === '') {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  Person
  .find({name: person.name})
  .then(dbPerson => {
      if(dbPerson.name === person.name) {
        return response.status(400).json({ error: 'name must be unique' })
      } else {
        person
        .save()
        .then(savedData => {
          response.json(Person.format(savedData))
          })
      }
  })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (req, res) => {
  Person
  .find({}, {__v: 0})
  .then(persons => {
    var amount = persons.length
    var date = new Date()
    res.send('<p>puhelinluettelossa ' + amount + ' henkilön tiedot</p><p>'+date+'</p>')
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

