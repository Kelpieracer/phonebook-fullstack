// https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef

// import * as Mongoose from 'mongoose'
import Mongoose = require("mongoose")
require('dotenv').config()

let database: Mongoose.Connection

/**
 * Returns error string if error
 */
export const connect = (): string | undefined => {
  // add your own uri below
  const uri = process.env.MONGODB_URI
  if (!uri) {
    return 'Database uri is not valid'
  }

  if (database) {
    return
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  database = Mongoose.connection

  database.once('open', async () => {
    console.log('Connected to database')
  })

  database.on('error', (error: any) => {
    return error.toString()
  })

  return
}

export const disconnect = () => {
  if (!database) {
    return
  }
  Mongoose.disconnect()
}
