import { Document } from "mongoose";
import { IPersonDocument } from "./persons.types";
export declare function setLastUpdated(this: IPersonDocument): Promise<void>;
export declare function sameName(this: IPersonDocument): Promise<Document[]>;
