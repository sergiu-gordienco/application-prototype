# uri-load -- Dynamic Resource Loading

Load external scripts and stylesheets on demand.

## Overview

`uri-load` dynamically injects `<script>` and `<link>` elements into the document, with callbacks for completion. Load single files or arrays of URLs, with deduplication and custom attributes.

## Advantages

- **Lazy loading** -- load resources only when needed, reduce initial page weight
- **Deduplication** -- same URL is loaded only once, callbacks queued
- **Batch loading** -- pass an array of URLs, callback fires when all complete
- **Custom attributes** -- add any attributes to injected elements
- **Cross-document** -- load into iframes or other document contexts
- **IE support** -- handles `onreadystatechange` for legacy browsers
- **Android fallback** -- timeout-based detection for problematic mobile browsers

## Getting Started

```js
App.require('uri-load').then(function (uriLoad) {
    // Load a stylesheet
    uriLoad.link('https://cdn.example.com/styles.css', function () {
        console.log('Styles loaded!');
    });

    // Load a script
    uriLoad.script('https://cdn.example.com/library.js', function () {
        console.log('Script loaded and ready!');
    });
});
```

## API Reference

### `script(url, callback, [options], [document])`

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string or array | URL(s) to load |
| `callback` | function | Called when all scripts loaded |
| `options` | object | `{ attr: { type: 'text/javascript', charset: 'utf-8' } }` |
| `document` | Document | Target document (default: window.document) |

### `link(url, callback, [options], [document])`

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string or array | URL(s) to load |
| `callback` | function | Called when all stylesheets loaded |
| `options` | object | `{ attr: { rel: 'stylesheet', type: 'text/css' } }` |
| `document` | Document | Target document (default: window.document) |

## Code Examples

### Example 1: Lazy-load a Chart Library

```js
document.getElementById('showChart').addEventListener('click', function () {
    uriLoad.script('https://cdn.jsdelivr.net/npm/chart.js', function () {
        // Chart.js is now available
        var ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels: ['A', 'B', 'C'], datasets: [{ data: [10, 20, 30] }] }
        });
    });
});
```

### Example 2: Theme Switching

```js
var themes = {
    light: '/css/theme-light.css',
    dark: '/css/theme-dark.css'
};

function switchTheme(name) {
    // Remove existing theme links
    document.querySelectorAll('link[data-theme]').forEach(function (el) {
        el.parentNode.removeChild(el);
    });

    uriLoad.link(themes[name], function () {
        console.log('Theme "' + name + '" applied');
    }, { attr: { rel: 'stylesheet', 'data-theme': name } });
}

switchTheme('dark');
```

### Example 3: Load Multiple Resources

```js
uriLoad.script([
    '/vendor/jquery.min.js',
    '/vendor/bootstrap.min.js',
    '/vendor/moment.min.js'
], function () {
    console.log('All vendor scripts loaded');
    // Safe to use jQuery, Bootstrap, Moment.js
});

uriLoad.link([
    '/css/reset.css',
    '/css/layout.css',
    '/css/components.css'
], function () {
    console.log('All stylesheets loaded');
});
```

### Example 4: Load Into an Iframe

```js
var iframe = document.getElementById('preview');
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

uriLoad.link('/css/preview-styles.css', function () {
    console.log('Styles loaded into iframe');
}, {}, iframeDoc);

uriLoad.script('/js/preview-script.js', function () {
    console.log('Script loaded into iframe');
}, {}, iframeDoc);
```

## Related Modules

- [js-template-component](../ui/js-template-component.md) -- uses uri-load internally for CSS injection
- [ApplicationBuilder](../core/application-builder.md) -- the module loader that loads JS modules
