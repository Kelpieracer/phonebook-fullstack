import { Person } from '../types/directory-types'

/** Checks if the name already exists in the directory */
const nameExists = (name: string, directory: Person[]): boolean =>
    directory.map(person => person.name).includes(name)

/** Checks if the telephone number already exists in the directory */
export const telExists = (tel: string, directory: Person[]): boolean =>
    directory.map(person => person.tel).includes(tel)

export default nameExists
