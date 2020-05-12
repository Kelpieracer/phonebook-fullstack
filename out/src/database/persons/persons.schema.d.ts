import { Schema } from "mongoose";
import { IPersonDocument } from "./persons.types";
declare const PersonSchema: Schema<IPersonDocument>;
export default PersonSchema;
