import { IPersonDocument, IPersonModel, IPerson } from "./persons.types";
export async function findOneOrCreate(
  this: IPersonModel,
  {
    name,
    tel
  }: IPerson
): Promise<IPersonDocument> {
  const record = await this.findOne({ name, tel });
  if (record) {
    return record;
  } else {
    return this.create({ name, tel });
  }
}

export async function findAll(this: any): Promise<IPersonDocument[]> {
  return this.find()
}