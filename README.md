# Internal Slot API

## Abstract
The module for implementing internal slots of the objects using encapsulation.

## Install
`npm i --save @dwlib/internal-slot`

## Usage
```javascript
// CJS
const InternalSlot = require('@dwlib/internal-slot');
const DeleteInternalSlot = require('@dwlib/internal-slot/DeleteInternalSlot');
const GetInternalSlot = require('@dwlib/internal-slot/GetInternalSlot');
const HasInternalSlot = require('@dwlib/internal-slot/HasInternalSlot');
const RequireInternalSlot = require('@dwlib/internal-slot/RequireInternalSlot');
const SetInternalSlot = require('@dwlib/internal-slot/SetInternalSlot');
// ESM
import InternalSlot, {
  DeleteInternalSlot,
  GetInternalSlot,
  HasInternalSlot,
  RequireInternalSlot,
  SetInternalSlot
} from '@dwlib/internal-slot';
import DeleteInternalSlot from '@dwlib/internal-slot/DeleteInternalSlot';
import GetInternalSlot from '@dwlib/internal-slot/GetInternalSlot';
import HasInternalSlot from '@dwlib/internal-slot/HasInternalSlot';
import RequireInternalSlot from '@dwlib/internal-slot/RequireInternalSlot';
import SetInternalSlot from '@dwlib/internal-slot/SetInternalSlot';
```

## API
- *static class* InternalSlot
  - *static* delete(target, internalSlot)
  - *static* get(target, internalSlot)
  - *static* has(target, internalSlot)
  - *static* require(target, internalSlot)
  - *static* set(target, internalSlot)

### Builtins
- DeleteInternalSlot(target, internalSlot)
- GetInternalSlot(target, internalSlot)
- HasInternalSlot(target, internalSlot)
- RequireInternalSlot(target, internalSlot)
- SetInternalSlot(target, internalSlot)
