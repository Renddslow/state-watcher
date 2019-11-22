# State Watcher

> A light-weight local browser state build on the subscriber pattern.

## Install

```
$ yarn add state-watcher
```

## Usage

```js
import createState from 'state-watcher';

const [state, watcher] = createState({
    playerName: '',
    score: 0,
});

watcher.on('change', ['score'], (state, score) => {
  document.getElementById('score-container').innerText = score;
});

watcher.on('change', ['playerName'], (state, name) => {
  document.getElementById('player-name-container').innerText = name;
});

function updatePlayerScore(score) {
  state.score = score;
}

function updatePlayerName({ target }) {
  state.playerName = target.value || '';
}
```

## API

### createState(obj)

Returns a tuple with the state object and a [watcher](#watcher).

#### obj

Type: `object`

Default: `{}`

A plain-old JavaScript object that will serve as the default state.

### watcher

Type: `object`

An object containing an `on`, `has`, and `keys` method.

#### on(type, ?fields, cb)

##### type

Type: `string`

A string that indicates which event should be subscribed to on the watcher. Currently only `"change"` is supported.

##### fields

Type: `Array<string>`

Optional: ✅

An array of strings indicating which field(s) the callback should subscribe to on the specified event. When no fields are passed in, all fields for the given event will fire the callback.

##### cb(state, value, key)

Type: `function`

A callback that is fired when an event of `type` occurs to the specified (or all) fields.
