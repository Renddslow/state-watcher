const test = require('tape');

const createState = require('./dist/index.cjs');

test('Can create a valid instance', (t) => {
  const [state, watcher] = createState({ title: '' });
  t.equals(typeof state, 'object', 'state is an object');
  t.true(watcher.hasOwnProperty('on'), 'watcher has an `on` property');
  t.end();
});

test('Given a callback on the watcher and a state change, the callback will fire', (t) => {
  t.plan(1);
  const [state, watcher] = createState({ title: '' });
  watcher.on('change', () => {
    t.pass('The change callback was fired.');
  });
  state.title = 'Little Mermaid';
  t.end();
});

test('Given a callback on a field in the watcher and a state change on the same field, the callback will fire', (t) => {
  t.plan(1);
  const [state, watcher] = createState({ title: '' });
  watcher.on('change', ['title'], () => {
    t.pass('The change callback was fired.');
  });
  state.title = 'Cinderella';
  t.end();
});

test('Given multiple callbacks on a field in the watcher and a state change on the same field, the callback will fire', (t) => {
  t.plan(2);
  const [state, watcher] = createState({ title: '' });
  watcher.on('change', ['title'], () => {
    t.pass('The change callback was fired.');
  });
  watcher.on('change', ['title'], () => {
    t.pass('The second change callback was fired.');
  });
  state.title = 'Thumbelina';
  t.end();
});

test('Given a callback on a field in the watcher and a state change on a different field, the callback will not fire', (t) => {
  t.plan(0);
  const [state, watcher] = createState({ title: '' });
  watcher.on('change', ['category'], () => {
    t.fail('The change callback was fired.');
  });
  state.title = 'Tom Thumb';
  t.end();
});
