import { Document, Model } from "mongoose";
export interface IPerson {
    name: string;
    tel: string;
    dateOfEntry?: Date;
    lastUpdated?: Date;
    _id: any;
}
export interface IPersonDocument extends IPerson, Document {
    setLastUpdated: (this: IPersonDocument) => Promise<void>;
    sameName: (this: IPersonDocument) => Promise<Document[]>;
}
export interface IPersonModel extends Model<IPersonDocument> {
    findOneOrCreate: (this: IPersonModel, { name, tel, }: IPerson) => Promise<IPersonDocument>;
    findAll: (this: IPersonModel) => Promise<IPersonDocument[]>;
}
