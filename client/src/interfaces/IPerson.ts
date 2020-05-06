/** One database row in the phonebook directory */
export interface IPerson {
    /** Must be unique, and also optional for the POST */
    id?: string,
    name: string,
    /** Any string at the moment, validity is not checked */
    tel: string
}
