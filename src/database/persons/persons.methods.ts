import { Document } from "mongoose";
import { IPersonDocument } from "./persons.types";
export async function setLastUpdated(this: IPersonDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
export async function sameName(this: IPersonDocument): Promise<Document[]> {
  return this.model("person").find({ name: this.name });
}