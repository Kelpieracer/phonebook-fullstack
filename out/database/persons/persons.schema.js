"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const persons_statics_1 = require("./persons.statics");
const persons_methods_1 = require("./persons.methods");
const PersonSchema = new mongoose_1.Schema({
    name: String,
    tel: String,
    dateOfEntry: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});
PersonSchema.statics.findOneOrCreate = persons_statics_1.findOneOrCreate;
PersonSchema.statics.findAll = persons_statics_1.findAll;
PersonSchema.methods.setLastUpdated = persons_methods_1.setLastUpdated;
PersonSchema.methods.sameName = persons_methods_1.sameName;
exports.default = PersonSchema;
//# sourceMappingURL=persons.schema.js.map