"use strict";
// https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
// import * as Mongoose from 'mongoose'
const Mongoose = require("mongoose");
require('dotenv').config();
let database;
/**
 * Returns error string if error
 */
exports.connect = () => {
    // add your own uri below
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        const error = 'Database uri is not valid';
        console.log(error);
        return error;
    }
    if (database) {
        return;
    }
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = Mongoose.connection;
    database.once('open', async () => {
        console.log('Connected to database');
    });
    database.on('error', (error) => {
        console.log(error.toString());
        return error.toString();
    });
    return;
};
exports.disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
//# sourceMappingURL=database.js.map