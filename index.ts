import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import { IPerson } from './client/src/interfaces/IPerson'

const apiPersonsUri = '/api/persons/'
app.use(bodyParser.json())

let persons: IPerson[] = [
  {
    id: "1",
    name: "Arto Hellas",
    tel: "040-123456"
  },
  {
    id: "2",
    name: "Martti Tienari",
    tel: "040-123457"
  },
  {
    id: "3",
    name: "Arto Järvinen",
    tel: "040-123458"
  },
  {
    id: "4",
    name: "Lea Maria Kutvonen",
    tel: "040-123459"
  }
]

app.get('/', (_req: any, res: any) => {
  res.send('<h1>Hello World!</h1>')
})

app.get(apiPersonsUri, (_req: any, res: any) => {
  res.json(persons)
})

app.get(apiPersonsUri + ':id', (req: any, res: any) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(400).json({ error: 'id not found' }).end()   // Client error
  }
})

const generateId = (): string => {
  const maxId = persons.map(a => a.id ? +a.id : -1).filter(a => a).reduce((a, b) => a > b ? a : b)
  return (maxId + 1).toString()
}

app.post(apiPersonsUri, (req: any, res: any) => {
  const person: IPerson = {
    name: req.body.name,
    tel: req.body.tel
  }
  if (!person.name || !person.tel) {
    res.status(400).json({ error: 'content format does not match' }).end()   // Client error
  }
  person.id = generateId()
  persons.push(person)
  res.json(person)
})

app.delete(apiPersonsUri + ':id', (req: any, res: any) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})