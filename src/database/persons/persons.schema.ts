import { Schema } from "mongoose";
import { findOneOrCreate, findAll } from "./persons.statics";
import { setLastUpdated, sameName } from "./persons.methods";
import { IPersonDocument } from "./persons.types"
const PersonSchema = new Schema<IPersonDocument>({
  name: String,
  tel: String,
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
} );
PersonSchema.statics.findOneOrCreate = findOneOrCreate;
PersonSchema.statics.findAll = findAll;
PersonSchema.methods.setLastUpdated = setLastUpdated;
PersonSchema.methods.sameName = sameName;
export default PersonSchema;