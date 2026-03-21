# application-prototype

[![pipeline status](https://labs.sgapps.io/open-source/application-prototype/badges/master/pipeline.svg)](https://labs.sgapps.io/open-source/application-prototype/-/commits/master)
[![License » Creative Commons Attribution-NonCommercial 4.0 / or Granted by SGApps Labs](https://img.shields.io/badge/License-CC--BY--NC--4.0-crimson)](https://labs.sgapps.io/open-source/application-prototype/-/blob/master/LICENSE)
[![Repository - GitLab](https://img.shields.io/badge/Repository-GitLab-blue?logo=gitlab)](https://labs.sgapps.io/open-source/application-prototype/)
[![Documentation](https://img.shields.io/badge/Documentation-Api-blue?logo=html5)](http://open-source.gordienco.net/application-prototype/)
[![Sergiu Gordienco](https://img.shields.io/badge/author-Sergiu_Gordienco-blue?logo=linkedin)](https://www.linkedin.com/in/sergiu-gordienco/)
[![email sergiu.gordienco@gmail.com](https://img.shields.io/badge/email-sergiu.gordienco@gmail.com-blue?logo=email)](mailto:sergiu.gordienco@gmail.com)


[![npm](https://img.shields.io/npm/v/application-prototype)](https://www.npmjs.com/package/application-prototype)
[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/sergiu-gordienco/application-prototype/master)](https://github.com/sergiu-gordienco/application-prototype)
[![GitHub issues](https://img.shields.io/github/issues/sergiu-gordienco/application-prototype)](https://github.com/sergiu-gordienco/application-prototype/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/sergiu-gordienco/application-prototype)](https://github.com/sergiu-gordienco/application-prototype/pulls)

A modular JavaScript Application Builder framework for building event-driven applications with support for two-way data binding, custom HTML elements, async operations, and more.

Available for front-end (browsers, Electron, and similar environments) and as a Node.js package.

## Installation

### Browser (Bower)

```sh
bower install app-prototype
```

### Node.js

```sh
npm install application-prototype
```

## Quick Start

### Browser Setup

```html
<script src="ApplicationPrototype.js"></script>
<script src="ApplicationBuilder.js"></script>
<script>
  var App = new ApplicationBuilder({
    onready: function () {
      var App = this;
      App.modulePath('/path/to/constructors');
      App.require(['extensions/prototype', 'lib'], function (libs) {
        libs.lib();
        // App is ready, load your modules
      });
    }
  });
</script>
```

### Node.js Setup

```js
var ApplicationPrototype = require('application-prototype');
var app = new ApplicationPrototype();

app.bind('myMethod', function (arg1, arg2) {
  // your logic here
});

app.on('onMyMethod', function (arg1, arg2) {
  console.log('myMethod was called');
});

app.myMethod('hello', 'world');
```

## Documentation

**[Full Documentation](docs/index.md)** | [Getting Started](docs/getting-started.md) | [Architecture](docs/architecture.md)

### Core

- [ApplicationPrototype](docs/core/application-prototype.md) - event-driven object builder with before/on/after lifecycle hooks
- [ApplicationBuilder](docs/core/application-builder.md) - module loading, caching, debugging, and dependency management

### Modules

| Group | Modules | Key Feature |
|-------|---------|-------------|
| [**Async**](docs/async/index.md) | flow, waterfall, map, filter, forEach | Sequential & parallel orchestration |
| [**UI / Templating**](docs/ui/index.md) | js-template, components, custom-elements | `{{ }}` two-way binding, `*if`, `*for` directives |
| [**Networking**](docs/networking/index.md) | request, progress tracking, params-parser | Chainable HTTP client with upload/download events |
| [**Storage**](docs/storage/index.md) | browser-session (IndexedDB / localStorage) | ~200MB Promise-based key-value store |
| [**Resource Loading**](docs/resource-loading/uri-load.md) | uri-load | Dynamic script/stylesheet injection |
| [**Graphics**](docs/graphics/index.md) | 10+ image filters, canvas-draw, conversions | Pure JS image processing pipeline |
| [**Media**](docs/media/index.md) | webcam, getUserMedia | Camera capture with polyfill |
| [**Parsers**](docs/parsers/index.md) | CSV parse/encode, Markdown to HTML | Lightweight format conversion |
| [**Extensions**](docs/extensions/index.md) | 50+ utility methods, SHA/AES/MD5 encryption | One import enriches all built-in types |

### Guides

- [Building a Single-Page Application](docs/guides/building-a-spa.md) - task manager with templating, storage, and API calls
- [Building an Image Editor](docs/guides/building-an-image-editor.md) - photo filters with webcam capture
- [Building a Data Dashboard](docs/guides/building-a-data-dashboard.md) - sortable table with API data and caching

## Contribution

If you find the code interesting, you may participate by updating documentation using pull requests or by sending messages to [sergiu.gordienco@gmail.com](mailto:sergiu.gordienco@gmail.com).

### Typedarray polyfill

Used typedarray polyfill from
[inexorabletash/polyfill](https://github.com/inexorabletash/polyfill)

## License

Creative Commons License [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/)
![Creative Commons License - Creative Commons Attribution-NonCommercial 4.0 International License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

*JS Application Builder* by [JavaScript Application Builder](http://sgapps.io) is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/).
Based on a work at [http://sgapps.io](http://sgapps.io).
Permissions beyond the scope of this license may be available at [https://sgapps.io](https://sgapps.io).

