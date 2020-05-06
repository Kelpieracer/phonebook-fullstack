import personExists from "../helpers/directory-helpers"
import { Person } from "../types/directory-types"
import { telExists } from "../helpers/directory-helpers";

describe("checkNames", () => {
    test("should display a blank login form, with remember me checked by default", async () => {
        const persons: Person[] = [{ name: "Tapio", tel: "0" }, { name: "Tapsa", tel: "2" }]
        expect(personExists("Tapani", persons)).toBeFalsy()
        expect(personExists("Tapsa", persons)).toBeTruthy()
        expect(personExists("Tapio", persons)).toBeTruthy()
    });
});

describe("checkTels", () => {
    test("should display a blank login form, with remember me checked by default", async () => {
        const persons: Person[] = [{ name: "Tapio", tel: "0" }, { name: "Tapsa", tel: "2" }]
        expect(telExists("3", persons)).toBeFalsy()
        expect(telExists("0", persons)).toBeTruthy()
        expect(telExists("2", persons)).toBeTruthy()
    });
});