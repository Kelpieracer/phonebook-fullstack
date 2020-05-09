import * as express from "express";
import { connect } from "./database/database"
import { PersonModel } from "./database/persons/persons.model"
const app = express();
const port = 5002;
connect(PersonModel);


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});