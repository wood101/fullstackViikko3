const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }
  ]

morgan.token('json', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :json :status :response-time ms'))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id )
  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person =>person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined || body.name === '' || body.number === '') {
    return response.status(400).json({ error: 'name or number missing' })
  }
  
  for(var i = 0; i < persons.length; i++) {
    if(persons[i].name === body.name) {
      return response.status(400).json({ error: 'name must be unique' })
    }
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*100000)
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (req, res) => {
  var amounth = people.length
  var date = new Date()
  res.send('<p>puhelinluettelossa ' + amounth + ' henkilön tiedot</p><p>'+date+'</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

