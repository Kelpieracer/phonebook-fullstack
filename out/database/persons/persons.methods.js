"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sameName = exports.setLastUpdated = void 0;
async function setLastUpdated() {
    const now = new Date();
    if (!this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;
        await this.save();
    }
}
exports.setLastUpdated = setLastUpdated;
async function sameName() {
    return this.model("person").find({ name: this.name });
}
exports.sameName = sameName;
//# sourceMappingURL=persons.methods.js.map