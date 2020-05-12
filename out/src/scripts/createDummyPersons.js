"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const persons_model_1 = require("../database/persons/persons.model");
const database_1 = require("../database/database");
const axios_1 = __importDefault(require("axios"));
axios_1.default.get('http://names.drycodes.com/10?nameOptions=funnyWords')
    .then(response => {
    console.log(response.data);
    let randomNames = response.data;
    writeToDb(randomNames);
})
    .catch(error => {
    console.log(error);
    process.exit();
});
async function writeToDb(randomNames) {
    database_1.connect();
    const persons = [];
    randomNames.forEach(name => {
        persons.push({ name: name.replace("_", " "), tel: (Math.random() * 1e9).toFixed(), _id: null });
    });
    try {
        for (const person of persons) {
            await persons_model_1.PersonModel.create(person);
            console.log(`Created person ${person.name} ${person.tel}`);
        }
        database_1.disconnect();
    }
    catch (e) {
        console.error(e);
    }
}
//# sourceMappingURL=createDummyPersons.js.map