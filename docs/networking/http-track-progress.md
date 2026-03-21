# http-track-progress -- Global HTTP Progress Bar

Automatic visual progress bar that tracks all HTTP activity on the page -- XMLHttpRequest, fetch, and dynamically loaded resources.

## Overview

`http-track-progress` intercepts `XMLHttpRequest`, `fetch`, and DOM resource loading (scripts, images, stylesheets) to display a single global progress bar. Drop it in and every network request is automatically tracked -- no per-request wiring needed.

## Advantages

- **Zero configuration** -- works immediately after loading
- **Tracks everything** -- XMLHttpRequest, fetch API, scripts, images, stylesheets
- **Single progress bar** -- aggregates all concurrent requests into one percentage
- **Real-time updates** -- uses `progress` events and `ReadableStream` for accurate tracking
- **Show/hide control** -- programmatic control over progress bar visibility
- **Custom container** -- attach the progress bar to any DOM element
- **MutationObserver** -- automatically detects dynamically added resources
- **Graceful cleanup** -- completed requests are removed from tracking after 300ms

## Getting Started

```js
App.require('request/http-track-progress').then(function (progressBar) {
    // Show progress bar in a specific container
    progressBar.show(document.getElementById('toolbar'));

    // Or show it at the bottom of the page (default)
    progressBar.show();

    // All HTTP requests now automatically update the bar
});
```

## API Reference

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `progress` | Number (read-only) | Current aggregate progress (0 to 1) |

### Methods

| Method | Description |
|--------|-------------|
| `show([container])` | Create and display the progress bar. If `container` is provided, appends to it; otherwise appends to `document.body` |
| `hide()` | Remove the progress bar from the DOM |

### Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `update` | `progress` | Fired when aggregate progress changes (0 to 1) |

## How It Works

The module intercepts three types of network activity:

1. **XMLHttpRequest** -- patches `open()` and `send()` to track each request via `progress` and `loadend` events
2. **fetch API** -- wraps `window.fetch` to stream response bodies and track download progress via `content-length`
3. **DOM resources** -- uses `MutationObserver` and `Element.setAttribute` interception to track `<script>`, `<img>`, and `<link rel="stylesheet">` elements

All active requests are aggregated into a single 0-1 progress value displayed as an HTML `<progress>` element.

## Code Examples

### Example 1: Basic Page-wide Progress Bar

```js
App.require('request/http-track-progress').then(function (progressBar) {
    // Show at bottom of page
    progressBar.show();

    // All requests now tracked automatically
    fetch('/api/data');
    fetch('/api/users');
    // Progress bar updates as requests complete
});
```

### Example 2: Progress Bar in a Toolbar

```js
App.require('request/http-track-progress').then(function (progressBar) {
    var toolbar = document.getElementById('app-toolbar');
    progressBar.show(toolbar);

    // Hide when no activity
    progressBar.on('update', function (progress) {
        if (progress === 0) {
            progressBar.hide();
        }
    });
});
```

### Example 3: Custom Progress Display

```js
App.require('request/http-track-progress').then(function (progressBar) {
    var display = document.getElementById('custom-progress');

    progressBar.on('update', function (progress) {
        var percent = Math.floor(progress * 100);
        display.style.width = (100 - percent) + '%';
        display.textContent = percent < 100 ? 'Loading... ' + percent + '%' : 'Done';
    });
});
```

### Example 4: Combine with Request Module

```js
App.require([
    'request',
    'request/http-track-progress'
]).then(function (libs) {
    var Request = libs['request'];
    var progressBar = libs['request/http-track-progress'];

    progressBar.show(document.getElementById('header'));

    // Every Request instance is automatically tracked
    var req = new Request();
    req.url('/api/large-dataset')
        .response('json')
        .then(function (data) {
            console.log('Loaded', data.length, 'items');
        });
});
```

## What Gets Tracked

| Resource Type | Detection Method | Progress Source |
|---------------|-----------------|----------------|
| XMLHttpRequest | `send()` intercept | `progress` event |
| fetch | `window.fetch` wrapper | `ReadableStream` + `content-length` |
| `<script src>` | MutationObserver + setAttribute | `load`/`error` events |
| `<img src>` | MutationObserver + setAttribute | `load`/`error` events |
| `<link rel="stylesheet">` | MutationObserver + setAttribute | `load`/`error` events |

## Related Modules

- [request](request.md) -- chainable HTTP client
- [http-interceptor](http-interceptor.md) -- intercept and modify HTTP requests
- [uri-load](../resource-loading/uri-load.md) -- dynamic script/stylesheet loading
