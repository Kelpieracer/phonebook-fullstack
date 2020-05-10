/** One database row in the phonebook directory */
export interface Person {
    /** Database id */
    _id?: string,
    /** Must be unique, and also optional for the POST */
    name: string,
    /** Any string at the moment, validity is not checked */
    tel: string
}
