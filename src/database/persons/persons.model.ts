import * as Mongoose from "mongoose";
import PersonSchema from "./persons.schema";
import { IPersonDocument, IPersonModel } from "./persons.types";

export const PersonModel = Mongoose.model<IPersonDocument>(
  "person",
  PersonSchema
) as IPersonModel;
