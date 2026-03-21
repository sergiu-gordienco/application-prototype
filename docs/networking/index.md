# Networking

Modules for HTTP requests, progress tracking, and URL pattern matching.

## Overview

The networking group provides a chainable HTTP client (`request`), a global progress bar (`http-track-progress`), and URL pattern matching (`params-parser`).

## Advantages

- **Chainable API** -- `url().method().configurator().response()` reads naturally
- **Promise-based** -- `.then()` / `.catch()` on every response
- **Upload + download progress** -- real-time percentage events for both directions
- **Multiple response types** -- json, text, blob, arraybuffer, document
- **Configurators** -- preset configurations for common patterns (POST, multipart, binary)
- **Global progress bar** -- automatic visual feedback for all HTTP activity
- **URL pattern matching** -- Express-style `:param` extraction for client-side routing

## Modules

| Module | Purpose |
|--------|---------|
| [request](request.md) | XMLHttpRequest wrapper with chainable API |
| [http-track-progress](http-track-progress.md) | Global HTTP progress bar for all network activity |
| [http-interceptor](http-interceptor.md) | Intercept, inspect, and modify HTTP requests |
| [params-parser](params-parser.md) | URL pattern parameter extraction |

## Quick Example

```js
App.require('request').then(function (Request) {
    // GET JSON
    var req = new Request();
    req.url('/api/users')
        .response('json')
        .then(function (users) {
            console.log(users);
        }, function (err) {
            console.error(err);
        });

    // POST with form data
    var post = new Request();
    post.url('/api/users')
        .method('POST')
        .configurator('prepare-json')
        .header('Content-Type', 'application/json')
        .open()
        .send(JSON.stringify({ name: 'Alice', email: 'alice@test.com' }))
        .then(function (response) {
            console.log('Created:', response);
        });
});
```
