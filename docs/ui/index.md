# UI: Templating & Components

Three modules that together form a complete UI framework: **js-template** for reactive rendering, **js-template-component** for reusable components, and **custom-elements** for DOM lifecycle observation.

## Why Use This Over React/Vue/Angular?

- **No build step** -- works with plain HTML files, no webpack/vite/CLI needed
- **No virtual DOM** -- direct DOM manipulation, simpler mental model
- **No compilation** -- templates live in your HTML, not in `.jsx` or `.vue` files
- **Tiny footprint** -- three small modules vs megabytes of framework code
- **FPS-controlled rendering** -- built-in frame rate limiting prevents unnecessary repaints
- **Progressive** -- add templating to existing pages without rewriting everything

## Quick Start: Build a Counter in 30 Lines

```html
<div id="app">
    <h1>Count: {{ count }}</h1>
    <button (click)="count++">+1</button>
    <button (click)="count--">-1</button>
    <p *if="count > 10">That's a big number!</p>
</div>

<script src="ApplicationPrototype.js"></script>
<script src="ApplicationBuilder.js"></script>
<script>
var App = new ApplicationBuilder({
    onready: function () {
        var App = this;
        App.modulePath('./constructors');
        App.require(['extensions/prototype', 'lib'], function (libs) {
            libs.lib();
            App.require('js-template').then(function (jsTemplate) {
                var state = { count: 0 };
                jsTemplate.parseContent(
                    document.getElementById('app'),
                    function (err) { if (err) console.error(err); },
                    { context: state, args: state }
                );
            });
        });
    }
});
</script>
```

## Module Overview

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| [js-template](js-template.md) | Template rendering engine | `{{ }}` expressions, directives, bindings |
| [js-template-component](js-template-component.md) | Reusable component system | Lifecycle hooks, state management, CSS scoping |
| [custom-elements](../modules/custom-elements.md) | DOM observation | MutationObserver-based custom HTML elements |

## How They Work Together

```
custom-elements (observes DOM)
    |
    v
js-template-component (defines components)
    |
    v
js-template (renders templates)
    |
    v
DOM (your HTML)
```

1. **custom-elements** watches the DOM for new elements matching registered tag names
2. **js-template-component** defines the component's template, context, lifecycle, and styles
3. **js-template** parses `{{ }}` expressions and binds data to the DOM

You can use each module independently or combine them for a full component architecture.
