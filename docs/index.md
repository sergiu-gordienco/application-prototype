# ApplicationPrototype

**An event-driven modular JavaScript framework for browser and Node.js** that gives you reactive templating, async orchestration, HTTP handling, 200MB client-side storage, image processing, and more -- with zero external dependencies.

## Why Choose application-prototype?

- **Zero dependencies** -- no node_modules bloat, no supply chain risk
- **No build step required** -- works with plain `<script>` tags, no webpack/rollup/vite needed
- **Browser + Node.js** -- same API works in both environments
- **Event-driven lifecycle** -- every method automatically gets `before`/`on`/`after` hooks
- **Built-in module loader** -- lazy-load modules on demand with dependency management
- **Two-way data binding** -- Angular/Vue-like `{{ }}` templating without the framework weight
- **200MB client storage** -- IndexedDB-backed session storage with Promise API
- **Image processing** -- 10+ filters (blur, contrast, sepia, etc.) in pure JavaScript
- **Async orchestration** -- sequential and parallel execution with concurrency control
- **Encryption built-in** -- SHA1, SHA256, MD5, AES, Base64 on any string

## Quick Example

```js
// Create an event-driven object in 10 lines
var app = new ApplicationPrototype();

app.bind('greet', function (name) {
    return 'Hello, ' + name + '!';
});

app.on('beforeGreet', function (name) {
    console.log('About to greet:', name);
});

app.on('afterGreet', function (name) {
    console.log('Greeted:', name);
});

app.greet('World'); // logs: "About to greet: World" then "Greeted: World"
```

## Module Overview

| Module Group | What It Does | Key Advantage |
|---|---|---|
| [**Core**](core/application-prototype.md) | Event-driven objects with lifecycle hooks | Every method is automatically observable |
| [**Async**](async/index.md) | Sequential & parallel async orchestration | Control concurrency without Promise chains |
| [**UI / Templating**](ui/index.md) | Two-way data binding, components, custom elements | Angular-like power without a build step |
| [**Networking**](networking/index.md) | HTTP client with progress, interception, routing | Chainable API with upload/download events |
| [**Storage**](storage/index.md) | IndexedDB/localStorage key-value store | ~200MB Promise-based storage |
| [**Resource Loading**](resource-loading/uri-load.md) | Dynamic script/stylesheet loading | Lazy-load resources on demand |
| [**Graphics**](graphics/index.md) | Image filters, canvas animation, conversions | Pure JS image processing pipeline |
| [**Media**](media/index.md) | Webcam capture, getUserMedia | Simple callback API for camera access |
| [**Parsers**](parsers/index.md) | CSV parse/encode, Markdown to HTML | Lightweight data format conversion |
| [**Extensions**](extensions/index.md) | 50+ utility methods, encryption, polyfills | One import enriches all built-in prototypes |

## Getting Started

```html
<!-- Browser: just two script tags -->
<script src="ApplicationPrototype.js"></script>
<script src="ApplicationBuilder.js"></script>
<script>
    var App = new ApplicationBuilder({
        onready: function () {
            var App = this;
            App.modulePath('./constructors');
            App.require(['extensions/prototype', 'lib'], function (libs) {
                libs.lib();
                console.log('Application ready!');
            });
        }
    });
</script>
```

```bash
# Node.js: install and require
npm install application-prototype
```

```js
var ApplicationPrototype = require('application-prototype').application;
var app = new ApplicationPrototype();
app.bind('hello', function () { return 'world'; });
```

[Full Getting Started Guide](getting-started.md) | [Architecture Overview](architecture.md)

## License

[Creative Commons Attribution-NonCommercial 4.0](http://creativecommons.org/licenses/by-nc/4.0/) / or Granted by SGApps Labs

By [Sergiu Gordienco](https://www.linkedin.com/in/sergiu-gordienco/) | [sgapps.io](https://sgapps.io)
