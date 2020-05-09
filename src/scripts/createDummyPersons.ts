import { PersonModel } from "../database/persons/persons.model"
import { connect, disconnect } from "../database/database"
import { IPerson } from "../database/persons/persons.types"
import axios from 'axios';

axios.get('http://names.drycodes.com/10?nameOptions=funnyWords')
  .then(response => {
    console.log(response.data)
    let randomNames: string[] = response.data
    writeToDb(randomNames)
  })
  .catch(error => {
    console.log(error)
    process.exit()
  });

async function writeToDb(randomNames: string[]) {
  connect();

  const persons: IPerson[] = []
  randomNames.forEach(name => { persons.push({name: name.replace("_", " "), tel: (Math.random() * 1e9).toFixed(), _id: null})
    
  });
  try {
    for (const person of persons) {
      await PersonModel.create(person);
      console.log(`Created person ${person.name} ${person.tel}`);
    }
    disconnect();
  } catch (e) {
    console.error(e);
  }
}