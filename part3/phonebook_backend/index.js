const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('post-data', (request) => {
  return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

app.get('/', (request, response) => {
  response.send('<h1>phonebook backend</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'info missing'
    })
  }

  const existing = persons.find(p => p.name.toUpperCase() === body.name.toUpperCase())
  console.log(existing)

  if (existing) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: getRandomInt(1000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(`Phonebook info has ${persons.length} people<br>${new Date()}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})