# ApplicationBuilder

An extended application builder that adds module loading, dependency management, caching, debugging, and a Promise polyfill on top of `ApplicationPrototype`.

## Overview

`ApplicationBuilder` is the full-featured framework entry point for browser applications. It provides a `require()` system for loading modules on demand, development tools for debugging, and a custom `Promise` implementation for environments that lack native Promise support.

## Advantages

- **Built-in module loader** -- `require()` with path resolution and caching, no bundler needed
- **Module aliasing** -- `"tpl :: js-template"` for cleaner code
- **Cache control** -- toggle caching for development vs production with one call
- **Debug mode** -- enhanced console logging with file paths, timestamps, and module context
- **Promise polyfill** -- works in IE9+ without additional polyfills
- **Node.js compatible** -- same API works server-side with file system module loading
- **Zero configuration** -- works out of the box with sensible defaults

## Getting Started

```js
var App = new ApplicationBuilder({
    onconstruct: function () {
        // Called during construction (optional)
        // Use for setting up variables and configurations
    },
    onready: function () {
        var App = this;
        App.modulePath('./constructors');
        App.debugEnabled(false);
        App.cacheEnabled(true);

        App.require(['extensions/prototype', 'lib'], function (libs) {
            libs.lib(); // registers all built-in modules
            // App is fully ready
        });
    }
});
```

## API Reference

### Constructor

```js
// With callback function
var App = new ApplicationBuilder(function (variables, configurations) {
    // access internal vars and config
});

// With options object
var App = new ApplicationBuilder({
    onconstruct: function () { /* during construction */ },
    onready: function (vars, config) { /* after construction, App is `this`, receives internal vars and config */ }
});
```

---

### `require(moduleName, [callback])`

Load one or more modules. Returns a Promise.

```js
// Single module with callback
App.require('async', function (asyncModule, err) {
    if (err) return console.error(err);
    // use asyncModule
});

// Single module with Promise
App.require('async').then(function (asyncModule) {
    // use asyncModule
}).catch(function (err) {
    console.error(err);
});

// Multiple modules
App.require([
    'async',
    'js-template',
    'request'
]).then(function (libs) {
    // libs['async'], libs['js-template'], libs['request']
});

// With aliases
App.require([
    'tpl :: js-template',
    'http :: request',
    'session :: browser-session'
]).then(function (libs) {
    libs.tpl;      // js-template
    libs.http;     // request
    libs.session;  // browser-session
});
```

---

### `modulePath([path])`

Get or set the base path for module resolution.

```js
App.modulePath('./constructors');           // set path
console.log(App.modulePath());              // './constructors'

// Node.js shorthand
App.modulePath('@constructors://');         // resolves to __dirname/constructors
```

---

### `moduleRegister(path, modules)`

Pre-register modules so they can be resolved by name.

```js
App.moduleRegister('/my/modules', ['auth', 'cache', 'logger']);
// Now App.require('auth') resolves to /my/modules/auth.js
```

---

### `moduleResolve(moduleName, [path])`

Resolve a module name to its metadata without loading it.

```js
var meta = App.moduleResolve('browser-session');
// meta.name     = 'browser-session'
// meta.url      = './constructors/browser-session.js'
// meta.path     = './constructors/browser-session'
// meta.__dirname = './constructors'
```

---

### `cacheEnabled([state])`

Control browser caching of module files. Always returns the current boolean cache state.

```js
App.cacheEnabled(true);           // enable caching (production)
App.cacheEnabled(false);          // disable caching (development) -- adds ?t=timestamp
App.cacheEnabled('v1.2.3');       // set version string as cache-busting suffix (does NOT enable/disable)
console.log(App.cacheEnabled());  // returns boolean (true/false), not the version string
```

> **Note:** Passing a string sets the cache suffix used in URLs (e.g., `?v=v1.2.3`) but does not enable or disable caching itself. Use `cacheEnabled(true)` or `cacheEnabled(false)` for that.

---

### `debugEnabled([state])`

Toggle debug mode. When enabled, console output includes timestamps, file paths, and module context.

```js
App.debugEnabled(true);   // verbose logging
App.debugEnabled(false);  // quiet mode
```

---

### `runModulesInFiles([state])`

When enabled, modules run in separate `<script>` tags instead of `eval()`. This improves debugging in browser DevTools because each module appears as a separate file.

```js
App.runModulesInFiles(true);  // better debugging
```

---

### `consoleOptions([options])`

Configure console output formatting.

```js
App.consoleOptions({
    file: true,        // show file path
    contextName: true, // show calling context
    timestamp: true,   // show timestamp
    logType: true      // show LOG/WARN/ERROR prefix
});
```

---

### `Promise(callback)`

Custom Promise implementation. Compatible with native Promise API.

```js
var p = App.Promise(function (resolve, reject) {
    setTimeout(function () { resolve('done'); }, 1000);
});

p.then(function (value) {
    console.log(value); // 'done'
}).catch(function (err) {
    console.error(err);
});

// Static methods
App.Promise.all([promise1, promise2]).then(function (values) { });
App.Promise.race([promise1, promise2]).then(function (first) { });
App.Promise.resolve('value');
App.Promise.reject('error');
```

---

### `isNode()` / `isBrowser()`

Environment detection.

```js
if (App.isNode()) {
    // Node.js specific code
}
if (App.isBrowser()) {
    // Browser specific code
}
```

---

### `NodeInterface()` (Node.js only)

Access Node.js-specific APIs from within the framework.

```js
var node = App.NodeInterface();
node.process();           // global.process
node.global();            // global object
node.require('fs');       // Node.js require()
node.globalReference('Buffer'); // global.Buffer
```

### Module Execution Context

When a module runs (loaded via `require()`), it has access to these injected variables and methods:

**Module object (`module`):**

| Property/Method | Description |
|----------------|-------------|
| `module.exports` | Set this to export your module's API |
| `module.require(name)` | Load sub-dependencies (supports `'alias :: name'` syntax) |
| `module.resourceUrl(path)` | Resolve a path relative to this module's directory |
| `module.cache()` | Get a persistent cache object scoped to this module |
| `module.Application()` | Get the Application instance |
| `module.meta` | Module metadata: `{ name, url, path, __dirname }` |
| `module.$request` | Promise that resolves when the module file is loaded |
| `module.atime` | Timestamp (ms) when the module was loaded |

**Other injected variables:**

| Variable | Description |
|----------|-------------|
| `Application` | The ApplicationBuilder instance |
| `ApplicationPrototype` | The ApplicationPrototype constructor |
| `console` | Enhanced console with module context (file path, timestamps) |
| `__dirname` | The module's directory path |
| `Promise` | The Application.Promise constructor |

```js
// Inside a module file (e.g., constructors/my-module.js)
module.require('request').then(function (Request) {
    var cache = module.cache();
    var iconUrl = module.resourceUrl('icons/logo.png');

    console.log('Module loaded at:', new Date(module.atime));
    console.log('Module dir:', module.meta.__dirname);

    module.exports = {
        fetch: function (url) {
            if (cache[url]) return Promise.resolve(cache[url]);
            var req = new Request();
            return req.url(url).response('json').then(function (data) {
                cache[url] = data;
                return data;
            });
        }
    };
});
```

---

### Promise Error Handling

Errors thrown inside the Promise constructor callback are automatically caught and cause the promise to reject:

```js
var p = App.Promise(function (resolve, reject) {
    throw new Error('something went wrong');
    // automatically calls reject(err) -- no unhandled exception
});

p.catch(function (err) {
    console.log(err.message); // 'something went wrong'
});
```

> **Note:** In browsers without native `Promise`, `Application.Promise` is automatically assigned to `window.Promise` as a polyfill.

---

## Code Examples

### Example 1: Production vs Development Configuration

```js
var App = new ApplicationBuilder({
    onready: function () {
        var App = this;
        var isDev = location.hostname === 'localhost';

        App.modulePath('./constructors');
        App.cacheEnabled(!isDev);
        App.debugEnabled(isDev);
        App.runModulesInFiles(isDev);

        if (isDev) {
            App.consoleOptions({
                file: true,
                timestamp: true,
                contextName: true,
                logType: true
            });
        }

        App.require(['extensions/prototype', 'lib'], function (libs) {
            libs.lib();
            App.emit('appReady');
        });
    }
});
```

### Example 2: Lazy Module Loading

```js
// Load heavy modules only when needed
document.getElementById('openEditor').addEventListener('click', function () {
    App.require([
        'tpl :: js-template',
        'canvasDraw :: canvas-draw'
    ]).then(function (libs) {
        // Initialize editor only when user clicks
        libs.tpl.parseContent(document.getElementById('editor'), function () {
            console.log('Editor ready');
        }, { context: {}, args: { tools: libs.canvasDraw } });
    });
});
```

### Example 3: Module with Sub-dependencies

```js
// Inside your custom module file: my-dashboard.js
module.require('charts').then(function (charts) {
    module.require('data-source').then(function (dataSource) {
        module.exports = {
            render: function (container) {
                dataSource.fetch().then(function (data) {
                    charts.draw(container, data);
                });
            }
        };
    });
});

// Load it from your app
App.require('my-dashboard').then(function (dashboard) {
    dashboard.render(document.getElementById('main'));
});
```

### Example 4: Application Singleton Pattern

```js
var App;
var AppReady = new Promise(function (resolve) {
    App = new ApplicationBuilder({
        onready: function () {
            var App = this;
            App.modulePath('./constructors');
            App.require(['extensions/prototype', 'lib'], function (libs) {
                libs.lib();
                resolve(App);
            });
        }
    });
});

// Anywhere in your code:
AppReady.then(function (App) {
    App.require('request').then(function (Request) {
        var req = new Request();
        req.url('/api/data').response('json').then(function (data) {
            console.log(data);
        });
    });
});
```

## Related Modules

- [ApplicationPrototype](application-prototype.md) -- the base event system
- [Module System](../modules/lib.md) -- module registry
- [lib](../modules/lib.md) -- built-in module registry
