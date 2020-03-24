const klona = require('klona');

export default (obj = {}) => {
  const callbacks = new Map();

  const state = new Proxy(obj, {
    get: (o, k) => o[k],
    set: (o, k, v) => {
      o[k] = v;

      if (callbacks.has(k)) {
        callbacks.get(k).forEach((cb) => cb(klona(o), klona(v), k));
      } else if (callbacks.has(Infinity)) {
        callbacks.get(Infinity).forEach((cb) => cb(klona(o), klona(v), k));
      }

      return true;
    },
  });

  const watcher = {
    on: (type, fields, cb) => {
      if (type !== 'change') {
        throw new Error(`Event of type "${type}" is not currently supported.`);
      }

      if (typeof fields === 'function') {
        cb = fields;
        fields = null;
      }

      if (!fields) {
        const cbs = callbacks.has(Infinity) ? [...callbacks.get(Infinity), cb] : [cb];
        callbacks.set(Infinity, cbs);
      } else {
        fields.forEach((field) => {
          const cbs = callbacks.has(field) ? [...callbacks.get(field), cb] : [cb];
          callbacks.set(field, cbs);
        });
      }
    },
    has: (search) => callbacks.has(search),
    keys: () => callbacks.keys(),
  };

  return [state, watcher];
};
