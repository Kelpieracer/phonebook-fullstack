[phonebook-front](README.md) › [Globals](globals.md)

# phonebook-front

## Index

### Modules

* ["__tests__/directory-helpers.test"]()
* ["components/app"]()
* ["components/directory-table"]()
* ["components/popup"]()
* ["helpers/directory-helpers"]()
* ["index"]()
* ["serviceWorker"]()
* ["setupTests"]()
* ["types/directory-types"]()

## Modules

###  "__tests__/directory-helpers.test"

• **"__tests__/directory-helpers.test"**:

Defined in __tests__/directory-helpers.test.tsx:1

___

###  "components/app"

• **"components/app"**:

Defined in components/app.tsx:1

### `Const` serverUri

• **serverUri**: *"http://localhost:3001/persons/"* = "http://localhost:3001/persons/"

Defined in components/app.tsx:20

### `Const` App

▸ **App**(): *Element<>*

Defined in components/app.tsx:44

CRUD phonebook directory application "phonebook-front"
This is the main application.

If name or telephone number already exists in the directory, informs the user and does not add the entry.

If name or telephone number is missing, does not add an entry.

Enter key or Add button adds the entry to the directory.

Cursor is moved to the first field (name) after Enter, for easy adding of next entry.

In case of a problem, cursor is moved to the input box with the problem.

Telephone number and name are not validated, just trimmed.

Each entry has a unique id.

Entries can be deleted with the trash can icon.

**`author`** Tapio Mäntysalo

**`license`** MIT

**Returns:** *Element<>*

___

###  "components/directory-table"

• **"components/directory-table"**:

Defined in components/directory-table.tsx:1

### `Const` DirectoryTable

▸ **DirectoryTable**(`__namedParameters`: object): *Element<>*

Defined in components/directory-table.tsx:10

Directory table element

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`deleteCallBack` | function |
`persons` | Person[] |

**Returns:** *Element<>*

___

###  "components/popup"

• **"components/popup"**:

Defined in components/popup.tsx:1

### `Const` PopUp

▸ **PopUp**(`__namedParameters`: object): *Element<>*

Defined in components/popup.tsx:10

"General purpose" error popup

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`button` | string |
`main` | Element<> |
`okButton` | undefined &#124; string |
`okCallBack` | undefined &#124; function |
`show` | boolean |
`title` | string |

**Returns:** *Element<>*

___

###  "helpers/directory-helpers"

• **"helpers/directory-helpers"**:

Defined in helpers/directory-helpers.tsx:1

### `Const` nameExists

▸ **nameExists**(`name`: string, `directory`: Person[]): *boolean*

Defined in helpers/directory-helpers.tsx:4

Checks if the name already exists in the directory

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`directory` | Person[] |

**Returns:** *boolean*

### `Const` telExists

▸ **telExists**(`tel`: string, `directory`: Person[]): *boolean*

Defined in helpers/directory-helpers.tsx:8

Checks if the telephone number already exists in the directory

**Parameters:**

Name | Type |
------ | ------ |
`tel` | string |
`directory` | Person[] |

**Returns:** *boolean*

___

###  "index"

• **"index"**:

Defined in index.tsx:1

___

###  "serviceWorker"

• **"serviceWorker"**:

Defined in serviceWorker.ts:1

###  Config

Ƭ **Config**: *object*

Defined in serviceWorker.ts:23

#### Type declaration:

* **onSuccess**? : *undefined | function*

* **onUpdate**? : *undefined | function*

### `Const` isLocalhost

• **isLocalhost**: *boolean* = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

Defined in serviceWorker.ts:13

###  checkValidServiceWorker

▸ **checkValidServiceWorker**(`swUrl`: string, `config?`: Config): *void*

Defined in serviceWorker.ts:109

**Parameters:**

Name | Type |
------ | ------ |
`swUrl` | string |
`config?` | Config |

**Returns:** *void*

###  register

▸ **register**(`config?`: Config): *void*

Defined in serviceWorker.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`config?` | Config |

**Returns:** *void*

###  registerValidSW

▸ **registerValidSW**(`swUrl`: string, `config?`: Config): *void*

Defined in serviceWorker.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`swUrl` | string |
`config?` | Config |

**Returns:** *void*

###  unregister

▸ **unregister**(): *void*

Defined in serviceWorker.ts:139

**Returns:** *void*

___

###  "setupTests"

• **"setupTests"**:

Defined in setupTests.ts:1

___

###  "types/directory-types"

• **"types/directory-types"**:

Defined in types/directory-types.ts:1

###  Person

• **Person**:

Defined in types/directory-types.ts:2

One database row in the phonebook directory

### `Optional` id

• **id**? : *undefined | string*

Defined in types/directory-types.ts:4

Must be unique, and also optional for the POST

###  name

• **name**: *string*

Defined in types/directory-types.ts:5

###  tel

• **tel**: *string*

Defined in types/directory-types.ts:7

Any string at the moment, validity is not checked
