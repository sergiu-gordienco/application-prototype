# Architecture Overview

## Design Philosophy

**application-prototype** is built on three principles:

1. **Event-driven, not class-inheritance-driven** -- objects are composed by binding methods, not by extending classes. Every bound method automatically becomes observable.

2. **Lazy-loaded modules** -- nothing is loaded until you need it. The module system resolves and downloads code on demand, keeping your initial bundle tiny.

3. **Progressive enhancement** -- start with `ApplicationPrototype` for simple event-driven objects. Add `ApplicationBuilder` when you need module loading. Add individual modules as your needs grow.

## How It Fits Together

```
+---------------------------------------------------------------+
|                    Your Application Code                       |
+---------------------------------------------------------------+
         |                    |                    |
    +----v----+        +------v------+       +-----v-----+
    |  Async  |        |     UI      |       | Networking|
    | flow    |        | js-template |       | request   |
    | waterf. |        | components  |       | progress  |
    | map     |        | custom-elem |       | intercept |
    +---------+        +-------------+       +-----------+
         |                    |                    |
    +----v----+        +------v------+       +-----v-----+
    | Storage |        |  Graphics   |       |  Parsers  |
    | session |        | filters     |       | CSV       |
    | indexed |        | canvas-draw |       | Markdown  |
    +---------+        +-------------+       +-----------+
         |                    |                    |
+--------v--------------------v--------------------v-----------+
|              extensions/prototype (polyfills)                 |
+--------------------------------------------------------------+
|                    ApplicationBuilder                         |
|           (module loading, caching, debugging)                |
+--------------------------------------------------------------+
|                   ApplicationPrototype                        |
|          (bind, on, off, emit, once, property)                |
+--------------------------------------------------------------+
```

## Core Concepts

### Method Binding & Lifecycle Hooks

When you `bind()` a method, the framework wraps it with lifecycle events:

```js
app.bind('save', function (data) {
    database.insert(data);
});
```

This single line creates:
- `app.save(data)` -- the method itself
- `beforeSave` event -- fires before execution, can prevent it
- `onSave` event -- fires during execution (notification only)
- `afterSave` event -- fires after execution (async, in next tick)

```js
// Guard: validate before saving
app.on('beforeSave', function (data) {
    if (!data.id) return false; // blocks save()
});

// Side effect: log after saving
app.on('afterSave', function (data) {
    console.log('Saved:', data.id);
});
```

### Binding Configuration

Control which hooks are enabled:

```js
// Full hooks (default) -- before + on + after + interruptible
app.bind('save', fn);
app.bind('save', fn, 'all');

// Light -- on + interruptible (no before/after)
app.bind('save', fn, 'light');

// No hooks at all -- pure method, no events
app.bind('save', fn, '');

// Fine-grained control
app.bind('save', fn, {
    listenedBefore: true,
    listenedOn: true,
    listenedAfter: true,
    allowInterruption: true
});
```

### Reactive Properties

Define properties that emit events on get/set:

```js
app.property('count',
    function (newValue, lastValue, isSetter) {
        return (isSetter ? newValue : lastValue) || 0;
    }
);

app.on('__onSet::count', function (newValue, oldValue) {
    console.log('count changed:', oldValue, '->', newValue);
});

app.count = 5;  // logs: "count changed: 0 -> 5"
```

### The Event System

```js
// Listen to events
var id = app.on('myEvent', handler);

// Listen once
app.once('myEvent', handler);

// Multiple events at once
app.on('eventA, eventB, eventC', handler);

// Remove specific listener
app.off('myEvent', id);

// Remove all listeners for an event
app.off('myEvent');

// Emit events
app.emit('myEvent', [arg1, arg2]);

// Emit with tracked context (handlers get public methods as `this`)
app.emit('myEvent', [arg1, arg2], true);

// Emit unstoppable (handlers returning false won't stop emission)
app.emit('myEvent', [arg1, arg2], false, true);
```

### Module Lifecycle

```
Registration ──> Resolution ──> Loading ──> Export
     │                │             │          │
moduleRegister()  moduleResolve() require()  module.exports = ...
     │                │             │          │
  stores name      builds URL   downloads   makes available
  + path mapping   + metadata   + executes  to other modules
```

## Module Dependencies

```
js-template-component ──> js-template
                      ──> custom-elements
                      ──> uri-load
                      ──> request

browser-session ──> browser-session/strategy/indexed-db
                ──> browser-session/strategy/local-storage

graphic ──> graphic/convert
        ──> graphic/filters
        ──> graphic/recognition
        ──> graphic/utils
        ──> graphic/polyfill

devices/webcam ──> devices/getUserMedia
```

## Next Steps

- [ApplicationPrototype Reference](core/application-prototype.md)
- [ApplicationBuilder Reference](core/application-builder.md)
- [Module Registry](modules/lib.md)
