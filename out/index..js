"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appName = '(phonebookback) ';
console.log(`${appName}Server script started.`);
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./src/database/database");
const persons_model_1 = require("./src/database/persons/persons.model");
const os_1 = __importDefault(require("os"));
const app = express_1.default();
console.log(`${appName}Hostname: ${os_1.default.hostname()}`);
// Static files https://expressjs.com/en/starter/static-files.html
app.use(express_1.default.static('client/build'));
console.log(`${appName}Static service applied`);
const apiPersonsUri = '/api/persons/';
app.use(body_parser_1.default.json());
console.log(`${appName}Body_parser applied.`);
/**
 * Test html page
 */
app.get('/test', (_req, res) => {
    res.send('<h1>Hello World!</h1><p>Just testing.</p>');
});
/**
 * Read all data
 */
app.get(apiPersonsUri, (_req, res) => {
    (async () => {
        database_1.connect();
        await persons_model_1.PersonModel.findAll()
            .then(persons => {
            console.log(`GET api/persons/, returned ${persons.length} items`);
            res.json(persons);
        })
            .catch(error => {
            database_1.disconnect();
            console.log(error);
            res.status(500).json(error);
        });
    })();
});
/**
 * Search text
 */
app.get(apiPersonsUri + 'search/:text', (req, res) => {
    let text = req.params.text;
    if (text === '_') {
        text = ''; // Search all
    }
    ;
    (async () => {
        database_1.connect();
        const searchString = `${text.toUpperCase()}.*`;
        const regExp = new RegExp(searchString, 'i');
        const searchParameters = text === '' ? {} : { $or: [{ name: regExp }, { tel: regExp },] };
        await persons_model_1.PersonModel.find(searchParameters)
            .then(person => {
            console.log(`GET api/persons/search/${text}, returned ${person.length} items`);
            res.json(person).end();
        })
            .catch(error => {
            database_1.disconnect();
            console.log(error);
            res.status(500).json(error);
        });
    })();
});
/**
 * Find one piece of data by id
 */
app.get(apiPersonsUri + ':id', (req, res) => {
    const id = req.params.id;
    if (!id || id.length !== 24) {
        return res.status(400).json('Illegal id format').end();
    }
    ;
    (async () => {
        database_1.connect();
        await persons_model_1.PersonModel.find({ _id: mongoose_1.default.Types.ObjectId(id) })
            .then(person => {
            console.log(`GET api/persons/${id}, returned ${person.length} items`);
            res.json(person).end();
        })
            .catch(error => {
            database_1.disconnect();
            console.log(error);
            res.status(500).json(error);
        });
    })();
});
/**
 * Create new
 */
app.post(apiPersonsUri, (req, res) => {
    const person = {
        name: req.body.name.trim(),
        tel: req.body.tel.trim(),
        _id: null
    };
    if (!person.name || !person.tel) {
        res.status(400).json({ error: 'content format does not match' }).end(); // Client error
    }
    (async () => {
        database_1.connect();
        await persons_model_1.PersonModel.findOneOrCreate(person)
            .then(person => {
            res.json(person).end();
            console.log(`POST api, created ${person}, id ${person._id}`);
        })
            .catch(error => {
            database_1.disconnect();
            console.log(error);
            res.status(500).json(error);
        });
    })();
});
/**
 * Delete by id
 */
app.delete(apiPersonsUri + ':id', (req, res) => {
    (async () => {
        const id = req.params.id;
        database_1.connect();
        await persons_model_1.PersonModel.deleteOne({ _id: id })
            .then(deleted => {
            console.log(`DELETE api/id, deleted ${deleted.deletedCount} item(s)`);
            res.status(204).end();
        })
            .catch(error => {
            database_1.disconnect();
            console.log(error);
            res.status(500).json(error);
        });
    })();
});
const error = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(error);
console.log(`${appName}Routes loaded.`);
const PORT = process.env.PORT || 3001;
console.log(`${appName}Environment variable PORT=${PORT}.`);
app.listen(PORT, () => {
    console.log(`${appName}Server running on port ${PORT}`);
});
console.log(`${appName}Server init script exits.`);
//# sourceMappingURL=index..js.map