const appName = '(phonebookfront) '
console.log(`${appName}Server script started.`)

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connect, disconnect } from "./src/database/database";
import { IPerson } from './src/database/persons/persons.types'
import { PersonModel } from './src/database/persons/persons.model'

const app = express()

// Static files https://expressjs.com/en/starter/static-files.html
app.use(express.static('build'))
console.log(`${appName}Static service applied.`)

app.use(cors())
console.log(`${appName}Cors applied.`)
const apiPersonsUri = '/api/persons/'

app.use(bodyParser.json())
console.log(`${appName}Body_parser applied.`)

/**
 * Test html page
 */
app.get('/test', (_req: any, res: any) => {
  res.send('<h1>Hello World!</h1><p>Just testing.</p>')
})

/**
 * Read all data
 */
app.get(apiPersonsUri, (_req: any, res: any) => {
  ; (async () => {
    const error = connect()
    if (error) {
      disconnect()
      return res.status(500).json(error).end()
    }
    const persons = await PersonModel.findAll()
    res.json(persons)
  })()
})

/**
 * Search data
 */
app.get(apiPersonsUri + 'search/:text', (req: any, res: any) => {
  let text: string = <string>req.params.text
  if(text === '_') {
    text = ''    // Search all
  }
    ; (async () => {
      const error = connect()
      if (error) {
        disconnect()
        return res.status(500).json('Cannot open database').end()
      }
      // const person = await PersonModel.find( {$or: [{ name: new RegExp(`/.*${text}.*/`) }, { tel: new RegExp(`/.*${text}.*/`) }]})
      const searchStringUC = `.*${text.toUpperCase()}.*`
      const searchStringLC = `.*${text.toLowerCase()}.*`
      const regExpUC = new RegExp(searchStringUC)
      const regExpLC = new RegExp(searchStringLC)
      const searchParameters = text === '' ? {} : { $or: [{ name: regExpUC }, { name: regExpLC }, { tel: regExpUC }, { tel: regExpLC }], }
      const person = await PersonModel.find(searchParameters)
      res.json(person).end()
    })()
})

/**
 * Find one piece of data by id
 */
app.get(apiPersonsUri + ':id', (req: any, res: any) => {
  const id: string = <string>req.params.id
  if (!id || id.length !== 24) {
    return res.status(400).json('Illegal id format').end()
  }
  ; (async () => {
    const error = connect()
    if (error) {
      disconnect()
      return res.status(500).json('Cannot open database').end()
    }
    const person = await PersonModel.find({ _id: mongoose.Types.ObjectId(id) })
    res.json(person).end()
  })()
})


/**
 * Create new
 */
app.post(apiPersonsUri, (req: any, res: any) => {
  const person: IPerson = {
    name: req.body.name.trim(),
    tel: req.body.tel.trim(),
    _id: null
  }
  if (!person.name || !person.tel) {
    res.status(400).json({ error: 'content format does not match' }).end()   // Client error
  }
  (async () => {
    const error = connect()
    if (error) {
      disconnect()
      return res.status(500).json('Cannot open database').end()
    }
    await PersonModel.findOneOrCreate(person);
    res.json(person).end()
  })()
})

/**
 * Delete by id
 */
app.delete(apiPersonsUri + ':id', (req: any, res: any) => {
  (async () => {
    const id = req.params.id
    const error = connect()
    if (error) {
      disconnect()
      return res.status(500).json('Cannot open database').end()
    }
    await PersonModel.deleteOne({ _id: id })
    res.status(204).end()
  })()
})

const error = (_req: any, res: any) => {
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