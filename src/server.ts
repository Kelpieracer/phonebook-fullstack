const appName = '(phonebookback) '
console.log(`${appName}Server script started.`)

import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { connect, disconnect } from "./database/database";
import { IPerson } from './database/persons/persons.types'
import { PersonModel } from './database/persons/persons.model'
import os from 'os'

const app = express()

console.log(`${appName}Hostname: ${os.hostname()}`)

// Static files https://expressjs.com/en/starter/static-files.html
app.use(express.static('client/build'))
console.log(`${appName}Static service applied`)

const apiPersonsUri = '/api/persons/'

app.use(bodyParser.json())
console.log(`${appName}Body_parser applied.`)

/**
 * Test html page
 */
app.get('/test', (_req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1><p>Just testing.</p>')
})

/**
 * Read all data
 */
app.get(apiPersonsUri, (_req: Request, res: Response) => {
  (async () => {
    connect()
    await PersonModel.findAll()
      .then(persons => {
        console.log(`GET api/persons/, returned ${persons.length} items`)
        res.json(persons)
      })
      .catch(error => {
        disconnect()
        console.log(error)
        res.status(500).json(error)
      })
  })()
})

/**
 * Search text
 */
app.get(apiPersonsUri + 'search/:text', (req: Request, res: Response) => {
  let text: string = <string>req.params.text
  if (text === '_') {
    text = ''    // Search all
  }
  ; (async () => {
    connect()
    const searchString = `${text.toUpperCase()}.*`
    const regExp = new RegExp(searchString, 'i')
    const searchParameters = text === '' ? {} : { $or: [{ name: regExp }, { tel: regExp },] }
    await PersonModel.find(searchParameters)
      .then(person => {
        console.log(`GET api/persons/search/${text}, returned ${person.length} items`)
        res.json(person).end()
      })
      .catch(error => {
        disconnect()
        console.log(error)
        res.status(500).json(error)
      })
  })()
})

/**
 * Find one piece of data by id
 */
app.get(apiPersonsUri + ':id', (req: Request, res: Response) => {
  const id: string = <string>req.params.id
  if (!id || id.length !== 24) {
    return res.status(400).json('Illegal id format').end()
  }
  ; (async () => {
    connect()
    await PersonModel.find({ _id: mongoose.Types.ObjectId(id) })
      .then(person => {
        console.log(`GET api/persons/${id}, returned ${person.length} items`)
        res.json(person).end()
      })
      .catch(error => {
        disconnect()
        console.log(error)
        res.status(500).json(error)
      })
  })()
})


/**
 * Create new
 */
app.post(apiPersonsUri, (req: Request, res: Response) => {
  const person: IPerson = {
    name: req.body.name.trim(),
    tel: req.body.tel.trim(),
    _id: null
  }
  if (!person.name || !person.tel) {
    res.status(400).json({ error: 'content format does not match' }).end()   // Client error
  }
  (async () => {
    connect()
    await PersonModel.findOneOrCreate(person)
      .then(person => {
        res.json(person).end()
        console.log(`POST api, created ${person}, id ${person._id}`)
      })
      .catch(error => {
        disconnect()
        console.log(error)
        res.status(500).json(error)
      })
  })()
})


/**
 * Delete by id
 */
app.delete(apiPersonsUri + ':id', (req: Request, res: Response) => {
  (async () => {
    const id = req.params.id
    connect()
    await PersonModel.deleteOne({ _id: id })
      .then(deleted => {
        console.log(`DELETE api/id, deleted ${deleted.deletedCount} item(s)`)
        res.status(204).end()
      })
      .catch(error => {
        disconnect()
        console.log(error)
        res.status(500).json(error)
      })
  })()
})

const error = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(error)
console.log(`${appName}Routes loaded.`)

const PORT = process.env.PORT || 3001
console.log(`${appName}Environment variable PORT=${PORT}.`)

app.listen(PORT, () => {
  console.log(`${appName}Server running on port ${PORT}`)
})
console.log(`${appName}Server init script exits.`)