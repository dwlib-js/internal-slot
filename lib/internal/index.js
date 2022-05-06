'use strict';

const RequireIntrinsic = require('#intrinsic/RequireIntrinsic');
const UncurryThisIntrinsic = require('#intrinsic/UncurryThisIntrinsic');
const IsObject = require('#type/IsObject');
const ToPropertyKey = require('#type/ToPropertyKey');

const Map = RequireIntrinsic('Map');
const MapDelete = UncurryThisIntrinsic('Map.prototype.delete');
const MapGet = UncurryThisIntrinsic('Map.prototype.get');
const MapHas = UncurryThisIntrinsic('Map.prototype.has');
const MapSet = UncurryThisIntrinsic('Map.prototype.set');
const ObjectCreate = RequireIntrinsic('Object.create');
const ObjectPrototype = RequireIntrinsic('Object.prototype');
const ReflectDefineProperty = RequireIntrinsic('Reflect.defineProperty');
const String = RequireIntrinsic('String');
const SymbolToStringTag = RequireIntrinsic('@@toStringTag');
const TypeError = RequireIntrinsic('TypeError');
const WeakMap = RequireIntrinsic('WeakMap');
const WeakMapGet = UncurryThisIntrinsic('WeakMap.prototype.get');
const WeakMapSet = UncurryThisIntrinsic('WeakMap.prototype.set');

const SLOTS = new WeakMap();

const RequireTargetObject = argument => {
  if (!IsObject(argument)) {
    throw new TypeError('target is not an object');
  }
}

const DeleteInternalSlot = (target, internalSlot) => {
  RequireTargetObject(target);
  internalSlot = ToPropertyKey(internalSlot);
  const slots = WeakMapGet(SLOTS, target);
  return slots ? MapDelete(slots, internalSlot) : false;
}

const GetInternalSlot = (target, internalSlot) => {
  RequireTargetObject(target);
  internalSlot = ToPropertyKey(internalSlot);
  const slots = WeakMapGet(SLOTS, target);
  return slots ? MapGet(slots, internalSlot) : undefined;
}

const HasInternalSlot = (target, internalSlot) => {
  RequireTargetObject(target);
  internalSlot = ToPropertyKey(internalSlot);
  const slots = WeakMapGet(SLOTS, target);
  return slots ? MapHas(slots, internalSlot) : false;
}

const RequireInternalSlot = (target, internalSlot) => {
  RequireTargetObject(target);
  internalSlot = ToPropertyKey(internalSlot);
  const slots = WeakMapGet(SLOTS, target);
  if (slots) {
    const value = MapGet(slots, internalSlot);
    if (value !== undefined || MapHas(slots, internalSlot)) {
      return value;
    }
  }
  throw new TypeError(`Internal slot '${String(internalSlot)}' is not defined`);
}

const SetInternalSlot = (target, internalSlot, value) => {
  RequireTargetObject(target);
  internalSlot = ToPropertyKey(internalSlot);
  let slots = WeakMapGet(SLOTS, target);
  if (!slots) {
    slots = new Map();
    WeakMapSet(SLOTS, target, slots);
  }
  MapSet(slots, internalSlot, value);
}

const InternalSlot = ObjectCreate(ObjectPrototype, {
  delete: {
    value: DeleteInternalSlot
  },
  get: {
    value: GetInternalSlot
  },
  has: {
    value: HasInternalSlot
  },
  require: {
    value: RequireInternalSlot
  },
  set: {
    value: SetInternalSlot
  }
});
ReflectDefineProperty(InternalSlot, SymbolToStringTag, {
  value: 'InternalSlot'
});

module.exports = {
  DeleteInternalSlot,
  GetInternalSlot,
  HasInternalSlot,
  InternalSlot,
  RequireInternalSlot,
  SetInternalSlot
};
