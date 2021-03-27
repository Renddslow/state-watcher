import klona from 'klona';

type State = Record<string, any>;
type Callback = (state: State, value: any, key: string) => void;
type Watcher = {
  on: (type: string, fields: string[], cb: Callback) => void;
  has: (search: string) => boolean;
  keys: () => string[];
}

export default (obj: State = {}): [State, Watcher] => {
  const callbacks = new Map();

  const state = new Proxy(obj, {
    get: (o: State, k: string) => o[k],
    set: (o: State, k: string, v: any) => {
      o[k] = v;

      if (callbacks.has(k)) {
        callbacks.get(k).forEach((cb) => cb(klona(o), klona(v), k));
      }

      if (callbacks.has(Infinity)) {
        callbacks.get(Infinity).forEach((cb) => cb(klona(o), klona(v), k));
      }

      return true;
    },
  });

  const watcher = {
    on: (type: 'change', fields: string[], cb: Callback) => {
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
    has: (search: string): boolean => callbacks.has(search),
    keys: (): string[] => Array.prototype.slice.call(callbacks.keys()),
  };

  return [state, watcher];
};
