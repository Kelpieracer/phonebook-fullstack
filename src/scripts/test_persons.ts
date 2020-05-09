import { connect, disconnect } from "../database/database";
import {PersonModel} from '../database/persons/persons.model'

(async () => {
  const error = connect();
  if(error) {
    console.log(error)
    return
  }

  // test static methods
  const all = await PersonModel.findAll();
  const newPerson = await PersonModel.findOneOrCreate({
    name: "Mike Smith",
    tel: "4711",
    _id: null,
  });
  const existingPerson = await PersonModel.findOneOrCreate({
    name: "Emma Bradley",
    tel: "007",
    _id: null,
  });
  const numOfPersons = (await PersonModel.find()).length;
  console.log({ all, newPerson, existingPerson, numOfPersons });

  // test instance methods
  await existingPerson.setLastUpdated();
  const siblings = await existingPerson.sameName();
  console.log({ siblings });
  disconnect();
})();