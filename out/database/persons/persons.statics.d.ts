import { IPersonDocument, IPersonModel, IPerson } from "./persons.types";
export declare function findOneOrCreate(this: IPersonModel, { name, tel }: IPerson): Promise<IPersonDocument>;
export declare function findAll(this: any): Promise<IPersonDocument[]>;
