# ApplicationPrototype

A lightweight event-driven object builder that adds observable lifecycle hooks to every method you create.

## Overview

`ApplicationPrototype` is the foundation of the framework. It takes a plain JavaScript object and transforms it into an event-driven system where every method automatically gets `before`, `on`, and `after` lifecycle hooks. You can intercept method calls, validate inputs, log activity, trigger side effects -- all without modifying the original method.

## Advantages

- **Automatic lifecycle hooks** -- every bound method gets `before`/`on`/`after` events for free
- **Method interruption** -- guard patterns via `beforeX` returning `false`
- **No class syntax** -- works in ES3+, no transpilation needed
- **Tiny footprint** -- single file, zero dependencies
- **Browser + Node.js** -- identical API in both environments
- **Reactive properties** -- define getters/setters with change events
- **Multi-event listeners** -- subscribe to multiple events in one call
- **Listener IDs** -- precise control over event subscription/unsubscription

## Getting Started

```js
var app = new ApplicationPrototype();

// Bind a method
app.bind('multiply', function (a, b) {
    return a * b;
});

// Use it
var result = app.multiply(3, 7); // 21

// Listen to its lifecycle
app.on('beforeMultiply', function (a, b) {
    console.log('Calculating:', a, '*', b);
});
```

## Constructor

```js
var app = new ApplicationPrototype([builder]);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `builder` | function | Optional. Receives `(config, vars, methods, public_methods, private_methods)`. If it returns `false`, the event system is not initialized and the raw `methods` object is returned |

The `builder` function gives low-level access to the internals:

| Argument | Type | Description |
|----------|------|-------------|
| `config` | object | Shared configuration object (empty by default) |
| `vars` | object | Shared variables object (empty by default) |
| `methods` | object | Internal methods object (listeners' `this` when `track` is false) |
| `public_methods` | object | Public-facing object returned by the constructor |
| `private_methods` | array | Method names to exclude from automatic hook binding |

```js
var app = new ApplicationPrototype(function (config, vars, methods, pub, priv) {
    config.version = '1.0';
    priv.push('_internal'); // _internal won't get lifecycle hooks
    methods._internal = function () { return config; };
    methods.version = function () { return config.version; };
});

app.version();    // '1.0' -- has before/on/after hooks
app._internal();  // returns config -- no hooks (private)
```

## API Reference

### `bind(methodName, callback, [config])`

Attach a method to the application with optional lifecycle hooks. Returns the public methods object (chainable).

| Parameter | Type | Description |
|-----------|------|-------------|
| `methodName` | string or function | Method name. If a named function is passed, its `.name` is used |
| `callback` | function | The method implementation |
| `config` | string or object | Hook configuration (see below) |

**Config as string** (uses substring matching -- values can be combined):

| Value | Effect |
|-------|--------|
| `''` (empty) | No hooks -- pure method |
| `'all'` or `'default'` | All hooks + interruption enabled (default) |
| `'light'` | `onMethod` + interruption |
| `'on'` | `onMethod` only |
| `'af'` | `afterMethod` only |
| `'bf'` or `'before'` | `beforeMethod` only |
| `'st'` | Allow interruption |

Combinations work: `'on af st'` enables `onMethod` + `afterMethod` + interruption.

**Config as object:**

```js
{
    listenedBefore: true,     // enable beforeMethod event
    listenedOn: true,         // enable onMethod event
    listenedAfter: true,      // enable afterMethod event
    allowInterruption: true   // allow beforeMethod to block execution
}
```

**Hook naming:** For a method named `foo`, hooks are named `beforeFoo`, `onFoo`, `afterFoo` (first letter capitalized).

**Example:**

```js
// Named function syntax
app.bind(function render(data) {
    document.body.innerHTML = data;
});
app.render('<h1>Hello</h1>');

// No hooks -- lightweight utility
app.bind('utils', function () { return utilsObject; }, '');

// Only before hook (for validation)
app.bind('save', saveFunction, 'before');
```

> **Important:** `afterX` hooks run **asynchronously** (via `nextTick`/`setImmediate`/`setTimeout`). They execute after the method returns, so they cannot affect the method's return value.

---

### `on(eventName, handler, [handlerId])`

Register an event listener.

**Returns:** the listener ID (string) for single events, or `undefined` for comma-separated events.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | string | Event name, or comma-separated list of event names |
| `handler` | function | The listener function |
| `handlerId` | string | Optional. Custom ID for this listener. If an ID already exists, it is replaced. If omitted, auto-generated as `"s-N"` |

```js
// Basic usage
app.on('onSave', function (data) {
    console.log('Saved:', data);
});

// With custom ID (replaces previous listener with same ID)
app.on('onSave', handler, 'my-save-logger');

// Multiple events at once (returns undefined, not the ID)
app.on('onSave, onDelete, onUpdate', function () {
    console.log('Data changed');
});
```

---

### `once(eventName, handler, [handlerId])`

Register a listener that fires only once, then auto-removes itself. Returns the listener ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | string | Event name, or comma-separated list |
| `handler` | function | The listener function |
| `handlerId` | string | Optional custom listener ID |

```js
app.once('onInit', function () {
    console.log('This runs exactly once');
});
```

---

### `off(eventName, [handlerId])`

Remove event listeners.

**Returns:** `true` if any were removed, `false` if nothing matched, or `undefined` for comma-separated events.

```js
// Remove specific listener
app.off('onSave', 'my-save-logger');

// Remove ALL listeners for an event
app.off('onSave');

// Remove from multiple events
app.off('onSave, onDelete', 'my-listener-id');
```

---

### `emit(eventName, [args], [track], [noSkipStopReturn])`

Emit an event to all registered listeners.

**Returns:** `false` if any listener returned `false` and `noSkipStopReturn` is falsy (emission stops early). Otherwise `undefined`.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `eventName` | string | | Event name |
| `args` | array | `[]` | Arguments passed to listeners |
| `track` | boolean | `false` | If true, listeners' `this` is the public methods object; if false, `this` is the internal methods object |
| `noSkipStopReturn` | boolean | `false` | If true, listeners returning `false` won't stop emission |

> **Note:** Errors thrown inside listeners are caught and logged to `console.error`. Execution continues with the next listener.

```js
// Basic emit
app.emit('dataLoaded', [data, timestamp]);

// Tracked -- listeners can call other app methods via `this`
app.emit('dataLoaded', [data], true);

// Unstoppable -- all listeners run regardless of return values
app.emit('notify', [message], false, true);
```

---

### `property(propName, getter, [setter], [config])`

Define a reactive property with get/set events.

**Signature 1: `property(propName, getter, [setter], [config])`**

| Parameter | Type | Description |
|-----------|------|-------------|
| `propName` | string | Property name |
| `getter` | function | Called on read: `getter(undefined, lastValue, false)`. Return value is the property value |
| `setter` | function | Called on write: `setter(newValue, lastValue, true)`. Return value is stored. If omitted, `getter` is used for both |
| `config` | object | Property descriptor options (see below) |

If neither `getter` nor `setter` is provided, defaults are used: getter returns the stored value, setter stores and returns the new value.

**Signature 2: `property(fn, [config])`** -- when the first argument is a named function, its `.name` is used as the property name and the function serves as both getter and setter:

| Parameter | Type | Description |
|-----------|------|-------------|
| `fn` | function | Named function used as both getter and setter. `fn.name` becomes the property name |
| `config` | object | Property descriptor options (see below) |

**Config options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `configurable` | boolean | `true` | Whether the property can be redefined or deleted |
| `enumerable` | boolean | `true` | Whether the property shows up in `for...in` and `Object.keys()` |

```js
// Simple reactive property
app.property('theme',
    function (newValue, lastValue, isSetter) {
        if (isSetter) return newValue;
        return lastValue;
    }
);

// Named function shorthand -- fn.name becomes the property name
app.property(function count(newValue, lastValue, isSetter) {
    if (isSetter) return newValue;
    return lastValue || 0;
});
app.count = 5;          // setter
console.log(app.count); // 5 (getter)

// Non-enumerable, non-configurable property
app.property('_internal', getter, setter, {
    configurable: false,
    enumerable: false
});

// Listen to changes
app.on('__onSet::theme', function (newValue, oldValue) {
    document.body.className = newValue;
});

app.theme = 'dark';   // triggers __onSet::theme
console.log(app.theme); // 'dark', triggers __onGet::theme
```

**Property events:**

Property events can **modify values** -- if a handler returns a non-`undefined` value, that value replaces the property's value for subsequent handlers and the final result.

| Event | Arguments | Description |
|-------|-----------|-------------|
| `__onGet` | `[propName, value, lastValue]` | Any property read. Return value overrides the read result |
| `__onGet::propName` | `[value, lastValue]` | Specific property read. Return value overrides the read result |
| `__onSet` | `[propName, value, lastValue]` | Any property write. Return value overrides the stored value |
| `__onSet::propName` | `[value, lastValue]` | Specific property write. Return value overrides the stored value |
| `__afterGet` | `[propName, value, lastValue]` | After any property read |
| `__afterGet::propName` | `[value, lastValue]` | After specific property read |
| `__afterSet` | `[propName, value, lastValue]` | After any property write |
| `__afterSet::propName` | `[value, lastValue]` | After specific property write |

---

### `crudEvents(methods, public_methods, private_methods)`

Initialize the event system on an object. This is called automatically during construction unless the `builder` returns `false`. You can call it manually to add event capabilities to objects created outside the constructor.

```js
// Rarely needed -- mainly for advanced use cases
var obj = {};
app.crudEvents(obj, obj, []);
// obj now has: bind, on, once, off, emit, property
```

---

## Code Examples

### Example 1: Form Validation with Guard Pattern

```js
var form = new ApplicationPrototype();

form.bind('submit', function (data) {
    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    console.log('Form submitted!');
});

// Guard: validate before submit
form.on('beforeSubmit', function (data) {
    if (!data.email || !data.email.match(/@/)) {
        alert('Please enter a valid email');
        return false; // prevents submit() from running
    }
    if (!data.name || data.name.length < 2) {
        alert('Name must be at least 2 characters');
        return false;
    }
});

// Log after submit
form.on('afterSubmit', function (data) {
    console.log('Submitted at:', new Date().toISOString());
});

// Usage
form.submit({ name: 'Alice', email: 'alice@example.com' }); // submits
form.submit({ name: 'A', email: '' });                       // blocked by validation
```

### Example 2: Logging Middleware

```js
var api = new ApplicationPrototype();

api.bind('getUsers', function () { return fetch('/api/users'); });
api.bind('getUser', function (id) { return fetch('/api/users/' + id); });
api.bind('deleteUser', function (id) { return fetch('/api/users/' + id, { method: 'DELETE' }); });

// One listener logs ALL method calls
['getUsers', 'getUser', 'deleteUser'].forEach(function (method) {
    var eventName = 'before' + method.charAt(0).toUpperCase() + method.slice(1);
    api.on(eventName, function () {
        console.log('[API]', method, Array.prototype.slice.call(arguments));
    });
});

api.getUser(42);     // logs: [API] getUser [42]
api.deleteUser(7);   // logs: [API] deleteUser [7]
```

### Example 3: Undo/Redo Pattern

```js
var editor = new ApplicationPrototype();
var history = [];
var historyIndex = -1;

editor.bind('setText', function (text) {
    document.getElementById('editor').value = text;
});

editor.on('afterSetText', function (text) {
    // Record state after each change
    history = history.slice(0, historyIndex + 1);
    history.push(text);
    historyIndex = history.length - 1;
});

editor.bind('undo', function () {
    if (historyIndex > 0) {
        historyIndex--;
        document.getElementById('editor').value = history[historyIndex];
    }
}, ''); // no hooks needed for undo itself

editor.bind('redo', function () {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        document.getElementById('editor').value = history[historyIndex];
    }
}, '');
```

### Example 4: Plugin System

```js
var app = new ApplicationPrototype();

app.bind('render', function (template, data) {
    return template.replace(/\{(\w+)\}/g, function (m, key) {
        return data[key] || '';
    });
});

// Plugin: add caching
app.on('beforeRender', function (template, data) {
    var key = template + JSON.stringify(data);
    if (app._cache && app._cache[key]) {
        console.log('Cache hit');
        return app._cache[key]; // return cached result
    }
});
app.on('afterRender', function (template, data) {
    app._cache = app._cache || {};
    var key = template + JSON.stringify(data);
    app._cache[key] = app.render(template, data);
});

// Plugin: add analytics
app.on('afterRender', function () {
    console.log('Render count:', (app._renderCount = (app._renderCount || 0) + 1));
});
```

### Example 5: Node.js Event-Driven Controller

```js
var ApplicationPrototype = require('application-prototype').application;
var controller = new ApplicationPrototype();

controller.bind('handleRequest', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', path: req.url }));
});

// Middleware: authentication
controller.on('beforeHandleRequest', function (req, res) {
    if (!req.headers.authorization) {
        res.writeHead(401);
        res.end('Unauthorized');
        return false; // block the handler
    }
});

// Middleware: logging
controller.on('afterHandleRequest', function (req) {
    console.log(new Date().toISOString(), req.method, req.url);
});

// Use with Node.js HTTP server
var http = require('http');
http.createServer(function (req, res) {
    controller.handleRequest(req, res);
}).listen(3000);
```

## Common Patterns

| Pattern | How | When |
|---------|-----|------|
| **Guard** | `beforeX` returns `false` | Input validation, authorization |
| **Observer** | `onX` for side effects | Logging, analytics, notifications |
| **Cleanup** | `afterX` for async tasks | Caching, state recording, notifications |
| **Plugin** | Add listeners to extend behavior | Third-party extensions without modifying source |
| **Middleware** | Chain multiple `beforeX` listeners | Request pipelines, data transformation |

## Related Modules

- [ApplicationBuilder](application-builder.md) -- extends this with module loading
- [Architecture Overview](../architecture.md) -- how it all fits together
