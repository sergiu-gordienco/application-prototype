# Getting Started

## Installation

### Browser

Download the files or use a package manager:

```sh
bower install app-prototype
```

Include two scripts in your HTML:

```html
<script src="ApplicationPrototype.js"></script>
<script src="ApplicationBuilder.js"></script>
```

### Node.js

```sh
npm install application-prototype
```

```js
var appPrototype = require('application-prototype');
var ApplicationPrototype = appPrototype.application;
var ApplicationBuilder = appPrototype.builder;
```

---

## Your First Application (Browser)

Copy this complete HTML file to get started:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First App</title>
    <script src="ApplicationPrototype.js"></script>
    <script src="ApplicationBuilder.js"></script>
</head>
<body>
    <div id="output"></div>

    <script>
    // Step 1: Create the application
    var App = new ApplicationBuilder({
        onready: function () {
            var App = this;

            // Step 2: Set path to built-in modules
            App.modulePath('./constructors');

            // Step 3: Load core modules
            App.require(['extensions/prototype', 'lib'], function (libs) {
                // Step 4: Register all built-in modules
                libs.lib();

                // Step 5: Your application code starts here
                App.bind('showMessage', function (text) {
                    document.getElementById('output').textContent = text;
                });

                App.showMessage('Application is ready!');
            });
        }
    });
    </script>
</body>
</html>
```

**What each step does:**
1. `new ApplicationBuilder()` creates your application with event-driven methods
2. `modulePath()` tells the framework where to find module files
3. `require()` loads modules -- here we load the prototype extensions and the module registry
4. `libs.lib()` registers all built-in modules so you can `require()` them by name
5. `bind()` creates a new method with automatic lifecycle hooks

---

## Your First Application (Node.js)

```js
var ApplicationPrototype = require('application-prototype').application;

// Create an app with observable methods
var taskManager = new ApplicationPrototype();

// Bind a method -- it automatically gets before/on/after hooks
taskManager.bind('addTask', function (task) {
    console.log('Task added:', task);
    return task;
});

// Listen to lifecycle events
taskManager.on('beforeAddTask', function (task) {
    if (!task || !task.title) {
        console.log('Rejected: task needs a title');
        return false; // returning false prevents the method from executing
    }
});

taskManager.on('afterAddTask', function (task) {
    console.log('Notification: new task "' + task.title + '" was created');
});

// Use it
taskManager.addTask({ title: 'Learn ApplicationPrototype' });
// Output:
//   Task added: { title: 'Learn ApplicationPrototype' }
//   Notification: new task "Learn ApplicationPrototype" was created

taskManager.addTask(null);
// Output:
//   Rejected: task needs a title
// (addTask is NOT called because beforeAddTask returned false)
```

---

## Understanding the Module System

The `ApplicationBuilder` includes a module loader that works like Node.js `require()` but for both browser and server.

### Loading a Single Module

```js
// With callback
App.require('async', function (asyncModule) {
    // use asyncModule
});

// With Promise
App.require('async').then(function (asyncModule) {
    // use asyncModule
});
```

### Loading Multiple Modules

```js
App.require([
    'async',
    'js-template',
    'request'
]).then(function (libs) {
    libs['async'];        // async module
    libs['js-template'];  // template module
    libs['request'];      // request module
});
```

### Module Aliases

Use `::` to create short names:

```js
App.require([
    'tpl :: js-template',
    'http :: request'
]).then(function (libs) {
    libs.tpl;   // js-template module (via alias)
    libs.http;  // request module (via alias)
});
```

### How Module Resolution Works

```js
// Simple name -- resolved as: modulePath + '/async.js'
App.require('async');

// Nested path -- resolved as: modulePath + '/browser-session/strategy/indexed-db.js'
App.require('browser-session/strategy/indexed-db');

// Absolute URL
App.require('https://cdn.example.com/my-module.js');

// Relative path inside a module
module.require('sub-module');  // loads from current module's directory
```

### Module Internals

Every loaded module receives these objects:

```js
// Inside a module file:
module.exports = { /* your public API */ };  // export your module
module.meta.name;       // module name
module.meta.url;        // full URL to the .js file
module.meta.__dirname;  // directory path
module.cache();         // shared cache object (common across modules from same path)
module.resourceUrl('style.css');  // resolves relative URLs
module.require('sub-module');     // load from module's own directory
```

---

## Next Steps

- [Architecture Overview](architecture.md) -- understand how the framework is designed
- [ApplicationPrototype](core/application-prototype.md) -- deep dive into the event system
- [UI / Templating](ui/index.md) -- build reactive interfaces
- [Async Operations](async/index.md) -- orchestrate asynchronous workflows
- [Networking](networking/index.md) -- make HTTP requests
