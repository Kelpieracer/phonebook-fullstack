import { PersonModel } from "./database/persons/persons.model"
import { IPerson, IPersonModel } from "./database/persons/persons.types"
import { connect, disconnect } from "./database/database"

const dbUri = process.env.MONGODB_URI
if (!dbUri) {
    console.log(`Environment variable for database connection was not found (${dbUri})`)
}

// print process.argv
process.argv.forEach((val, index) => {
    console.log(`Arg ${index}: ${val}`);
});

const expectedNoOfArgs = [2, 4]
if (!expectedNoOfArgs.includes(process.argv.length)) {
    console.log(`Number of arguments should be any of ${expectedNoOfArgs.join(', ')}`)
    process.exit()
}

console.log(`Database manipulation begins now`);

(async () => {
    console.log(`Connecting to db`)
    const db = connect(PersonModel)
    const personModel = <IPersonModel>(db.model)
    console.log(`Db connection open`)

    if (process.argv.length === 2) {
        const all = await personModel.find({});
        console.log('')
        console.log(`Telephone directory, ${all.length} entries:`)
        all.forEach(person => {
            console.log(`name:${person.name} Tel:${person.tel} Created:${person.dateOfEntry.toLocaleDateString()} 
            Updated:${person.lastUpdated.toLocaleDateString()} Id:${person._id}`)
        })
        console.log('')
    }

    else {
        const person: IPerson = {
            name: process.argv[2],
            tel: process.argv[3]
        }
        await personModel.find(
            { tel: "0405a0047" },
            (err, personFound) => console.log(`Testing .find() -> error: (${err}) find: ${personFound}`)
        )

        console.log(`Adding ${JSON.stringify(person)} if one does not exist yet.`)
        await personModel.findOneOrCreate(person)
        disconnect()
    }
})()
// process.exit()
