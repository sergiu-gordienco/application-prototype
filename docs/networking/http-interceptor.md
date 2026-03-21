# http-interceptor -- XMLHttpRequest Proxy

Intercept, inspect, and modify HTTP requests before they are sent.

## Overview

`http-interceptor` replaces the global `XMLHttpRequest` with a proxy that emits events at every lifecycle stage -- open, setHeader, send, and all standard XHR events. You can inspect requests, modify URLs/methods/data, block requests, or replay them.

## Advantages

- **Global interception** -- captures all XMLHttpRequest traffic on the page
- **Event-driven** -- listen to `http:open`, `http:send`, `http:setHeader` events
- **Request modification** -- change URL, method, or body via `transform()`
- **Request replay** -- replay requests with `replay()`, optionally on a fresh XHR
- **Request blocking** -- set `interrupt = true` to prevent a request from executing
- **Start/stop** -- enable or disable interception at any time
- **Upload events** -- intercept upload lifecycle events too

## Getting Started

```js
App.require('request/http-interceptor').then(function (interceptor) {
    // Start intercepting
    interceptor.start();

    // Listen for all outgoing requests
    interceptor.on('http:open', function (method, url) {
        console.log('Request:', method, url);
    });

    // Stop intercepting
    interceptor.stop();
});
```

## API Reference

### Control Methods

| Method | Description |
|--------|-------------|
| `start()` | Replace global `XMLHttpRequest` with the proxy |
| `stop()` | Restore the original `XMLHttpRequest` |
| `isActive()` | Returns `true` if interception is currently active |

### Interceptor Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `http:open` | `method, url` | Request is being opened |
| `http:send` | `data` | Request is being sent |
| `http:setHeader` | `header, value` | A request header is being set |
| `http:{eventName}` | varies | Standard XHR events (load, error, progress, etc.) |
| `http:upload:{eventName}` | varies | Upload events (progress, load, error, etc.) |

### XHR Proxy Extensions

Each proxied XMLHttpRequest instance has these extra methods:

| Method | Description |
|--------|-------------|
| `transform(config)` | Modify request: `{ url, method, sendData }` |
| `replay([raw])` | Replay the request. `true` = fresh native XHR, `false` = same instance |

| Property | Type | Description |
|----------|------|-------------|
| `interrupt` | boolean | Set to `true` to prevent the request from being sent |
| `requestURL` | string | The request URL |
| `_method` | string | The HTTP method (lowercase) |

## Code Examples

### Example 1: Request Logger

```js
App.require('request/http-interceptor').then(function (interceptor) {
    interceptor.start();

    interceptor.on('http:open', function (method, url) {
        console.log('[HTTP]', method.toUpperCase(), url);
    });

    interceptor.on('http:setHeader', function (header, value) {
        console.log('[Header]', header + ':', value);
    });

    interceptor.on('http:send', function (data) {
        if (data) console.log('[Body]', data);
    });
});
```

### Example 2: Add Auth Token to All Requests

```js
interceptor.start();

interceptor.on('http:open', function (method, url) {
    // this = the proxied XMLHttpRequest
    this.setRequestHeader('Authorization', 'Bearer ' + getToken());
});
```

### Example 3: Block Requests to External Domains

```js
interceptor.start();

interceptor.on('http:open', function (method, url) {
    if (url.indexOf(location.origin) !== 0 && url.indexOf('/') !== 0) {
        console.warn('Blocked external request:', url);
        this.interrupt = true;
    }
});
```

### Example 4: Retry Failed Requests

```js
interceptor.start();

interceptor.on('http:error', function () {
    var xhr = this;
    console.log('Request failed, retrying...');
    setTimeout(function () {
        xhr.replay(true); // replay on fresh XHR
    }, 2000);
});
```

## Related Modules

- [request](request.md) -- chainable HTTP client
- [http-track-progress](http-track-progress.md) -- global progress bar
