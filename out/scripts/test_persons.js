"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database/database");
const persons_model_1 = require("../database/persons/persons.model");
(async () => {
    const error = database_1.connect();
    if (error) {
        console.log(error);
        return;
    }
    // test static methods
    const all = await persons_model_1.PersonModel.findAll();
    const newPerson = await persons_model_1.PersonModel.findOneOrCreate({
        name: "Mike Smith",
        tel: "4711",
        _id: null,
    });
    const existingPerson = await persons_model_1.PersonModel.findOneOrCreate({
        name: "Emma Bradley",
        tel: "007",
        _id: null,
    });
    const numOfPersons = (await persons_model_1.PersonModel.find()).length;
    console.log({ all, newPerson, existingPerson, numOfPersons });
    // test instance methods
    await existingPerson.setLastUpdated();
    const siblings = await existingPerson.sameName();
    console.log({ siblings });
    database_1.disconnect();
})();
//# sourceMappingURL=test_persons.js.map