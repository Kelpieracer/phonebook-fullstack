"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findOneOrCreate({ name, tel }) {
    const record = await this.findOne({ name, tel });
    if (record) {
        return record;
    }
    else {
        return this.create({ name, tel });
    }
}
exports.findOneOrCreate = findOneOrCreate;
async function findAll() {
    return this.find();
}
exports.findAll = findAll;
//# sourceMappingURL=persons.statics.js.map