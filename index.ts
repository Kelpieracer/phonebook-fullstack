const appName = '(phonebookfront) '
console.log(appName + 'Server script started.')
import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import { IPerson } from './client/src/interfaces/IPerson'
import cors from 'cors'

app.use(cors())
console.log(appName + 'Cors applied.')
const apiPersonsUri = '/api/persons/'

app.use(bodyParser.json())
console.log(appName + 'Body_parser applied.')

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
console.log(appName + 'Demo data loaded.')

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
  const id = Math.random()
  return id.toString()
}

app.post(apiPersonsUri, (req: any, res: any) => {
  const person: IPerson = {
    name: req.body.name.trim(),
    tel: req.body.tel.trim(),
  }
  if (!person.name || !person.tel) {
    res.status(400).json({ error: 'content format does not match' }).end()   // Client error
  }
  if (persons.find(a => a.name === person.name)) {
    res.status(400).json({ error: 'name must be unique' }).end()   // Client error
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

const error = (_req: any, res: any) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(error)
console.log(appName + 'Routes loaded.')

const PORT = process.env.PORT || 3001
console.log(appName + `Environment variable PORT=${PORT}.`)

app.listen(PORT, () => {
  console.log(appName + `Server running on port ${PORT}`)
})
console.log(appName + 'Server init script exits.')
