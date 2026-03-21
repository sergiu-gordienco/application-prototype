# request -- HTTP Client

A chainable XMLHttpRequest wrapper with Promise-based responses, upload/download progress events, and preset configurators.

## Overview

The `request` module wraps `XMLHttpRequest` with a fluent API. Chain methods to configure your request, then call `.response()` or `.send()` to execute it. Every response is a Promise. Both upload and download progress events give you real-time percentage updates.

## Advantages

- **Chainable API** -- build requests fluently: `url().method().header().response()`
- **Promise responses** -- `.then()` / `.catch()` for every request
- **Upload progress** -- real-time percentage for file uploads
- **Download progress** -- real-time percentage for large downloads
- **Multiple response types** -- json, text, blob, arraybuffer, document
- **Configurators** -- one-word presets for common patterns (POST, multipart, binary, blob)
- **Ready state events** -- observe every state of the request lifecycle
- **Cross-origin support** -- credentials option for CORS requests
- **No dependencies** -- works with the built-in XMLHttpRequest API

## Getting Started

```js
App.require('request').then(function (Request) {
    var req = new Request();
    req.url('/api/data')
        .response('json')
        .then(function (data) {
            console.log('Received:', data);
        }, function (err) {
            console.error('Failed:', err);
        });
});
```

## API Reference

### Request Configuration

| Method | Description | Example |
|--------|-------------|---------|
| `url(uri)` | Set request URL | `req.url('/api/users')` |
| `method(verb)` | Set HTTP method (default: GET) | `req.method('POST')` |
| `header(name, value)` | Add request header | `req.header('Authorization', 'Bearer xxx')` |
| `async(bool)` | Set async mode (default: true) | `req.async(true)` |
| `timeout(seconds)` | Set request timeout | `req.timeout(30)` |
| `withCredentials(bool)` | Enable CORS credentials | `req.withCredentials(true)` |
| `basicAuth(user, pass)` | Set Basic Auth credentials | `req.basicAuth('user', 'pass')` |

### Configurators

Apply preset configurations with a single call:

```js
req.configurator('prepare-json');  // sets JSON content-type headers
```

| Configurator | Effect |
|---|---|
| `'prepare-post'` or `'POST'` | Sets content-type to `application/x-www-form-urlencoded` |
| `'prepare-json'` | Sets content-type to `application/json` |
| `'prepare-multipart'` or `'multipart'` | Sets content-type to `multipart/form-data` |
| `'retrieve-binary-string'` or `'binary'` | Overrides MIME for binary response |
| `'retrieve-blob'` or `'blob'` | Sets response type to blob |
| `'check-status-code'` | Reject on non-2xx status (default) |
| `'ignore-status-code'` | Resolve regardless of HTTP status |

### Execution

| Method | Description |
|--------|-------------|
| `open([method], [url], [async], [timeout], [username], [password])` | Open the request (reads from config if no args). `username`/`password` override `basicAuth()` |
| `send([data], [type], [headers])` | Send request body. `type`: `'asFormData'` (multipart), `'json'` (auto-stringify + JSON headers), `'urlencoded'` (form-encoded). `headers`: additional headers object |
| `response([type], [options])` | Get response as Promise. Auto-opens and sends if needed. `options`: `{ type: 'application/octet-stream' }` for Blob construction |

**Response types:** `'text'`, `'json'`, `'blob'`, `'arraybuffer'`, `'document'`, `'request'` (returns the app), `'response'` (returns raw XHR response)

### State & Info

| Method | Returns | Description |
|--------|---------|-------------|
| `config()` | Object | Current request configuration |
| `request()` | XMLHttpRequest | Raw XHR object |
| `readyState()` | Number | Current ready state (0-4) |
| `status()` | Number | HTTP status code |
| `statusText()` | String | HTTP status text |
| `headers()` | String | All response headers |

### Ready State Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `READY_STATE_UNSENT` | 0 | Client created, `open()` not called |
| `READY_STATE_OPENED` | 1 | `open()` has been called |
| `READY_STATE_HEADERS_RECEIVED` | 2 | `send()` called, headers available |
| `READY_STATE_LOADING` | 3 | Downloading, partial data available |
| `READY_STATE_DONE` | 4 | Download complete |

### Events

**Download events:**

| Event | Arguments | Description |
|-------|-----------|-------------|
| `progress` | `event, percentComplete` | Download progress (0 to 1) |
| `load` | `event` | Download complete |
| `loadend` | `event` | Download finished (success or failure) |
| `error` | `event` | Download error |
| `abort` | `event` | Download aborted |

**Upload events:**

| Event | Arguments | Description |
|-------|-----------|-------------|
| `upload-progress` | `event, percentComplete` | Upload progress |
| `upload-load` | `event` | Upload complete |
| `upload-loadend` | `event` | Upload finished |
| `upload-error` | `event` | Upload error |
| `upload-abort` | `event` | Upload aborted |

**State events:**

| Event | Arguments | Description |
|-------|-----------|-------------|
| `onReadyState` | `[readyState, status]` | Ready state changed |

## Code Examples

### Example 1: GET JSON from API

```js
App.require('request').then(function (Request) {
    var req = new Request();
    req.url('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .response('json')
        .then(function (posts) {
            posts.forEach(function (post) {
                console.log(post.id + ':', post.title);
            });
        }, function (err) {
            console.error('Request failed:', err);
        });
});
```

### Example 2: POST JSON Data

```js
// Option A: use send() type shortcut -- auto-stringifies and sets JSON headers
var req = new Request();
req.url('/api/users')
    .method('POST')
    .open()
    .send({ name: 'Alice', email: 'alice@example.com' }, 'json');

// Option B: use response() which returns a Promise
var req2 = new Request();
req2.url('/api/users')
    .method('POST')
    .configurator('prepare-json')
    .header('Content-Type', 'application/json')
    .open()
    .send(JSON.stringify({ name: 'Alice', email: 'alice@example.com' }));

req2.response('json')
    .then(function (data) {
        console.log('User created:', data);
    }, function (err) {
        console.error('Failed:', err);
    });
```

> **Note:** `send()` returns the request object (not a Promise). Use `response()` to get a Promise.

### Example 3: Download File with Progress Bar

```js
var req = new Request();

req.on('progress', function (event, percent) {
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('progressText').textContent = Math.round(percent) + '%';
});

req.url('/files/large-archive.zip')
    .configurator('retrieve-blob')
    .response('blob')
    .then(function (blob) {
        // Create download link
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'archive.zip';
        a.click();
        URL.revokeObjectURL(url);
    }, function (err) {
        console.error('Download failed:', err);
    });
```

### Example 4: Upload File with Progress

```js
var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    if (!file) return;

    var formData = new FormData();
    formData.append('file', file);

    var req = new Request();

    req.on('upload-progress', function (event, percent) {
        console.log('Upload:', Math.round(percent) + '%');
    });

    req.url('/api/upload')
        .method('POST')
        .configurator('multipart')
        .open()
        .send(formData, 'asFormData');

    req.response('json')
        .then(function (data) {
            console.log('Upload complete!', data);
        }, function (err) {
            console.error('Upload failed:', err);
        });
});
```

### Example 5: Binary Data (ArrayBuffer)

```js
var req = new Request();
req.url('/api/image.png')
    .configurator('binary')
    .response('arraybuffer')
    .then(function (buffer) {
        var uint8 = new Uint8Array(buffer);
        console.log('Received', uint8.length, 'bytes');

        // Create blob URL for display
        var blob = new Blob([uint8], { type: 'image/png' });
        document.getElementById('preview').src = URL.createObjectURL(blob);
    });
```

### Example 6: Request with Authentication

```js
var req = new Request();
req.url('/api/private/data')
    .header('Authorization', 'Bearer ' + authToken)
    .header('Accept', 'application/json')
    .withCredentials(true)
    .response('json')
    .then(function (data) {
        console.log('Private data:', data);
    }, function (err) {
        if (err.status === 401) {
            console.log('Session expired, please log in');
        }
    });
```

## Common Patterns

| Pattern | How |
|---------|-----|
| **JSON API call** | `req.url(url).response('json')` |
| **POST form** | `req.url(url).method('POST').configurator('POST').open().send('key=value')` |
| **POST JSON** | `req.method('POST').configurator('prepare-json').open().send(JSON.stringify(data))` |
| **File download** | `req.url(url).configurator('blob').response('blob')` |
| **File upload** | `req.method('POST').configurator('multipart').open().send(formData, 'asFormData')` |
| **Binary data** | `req.configurator('binary').response('arraybuffer')` |

## Related Modules

- [http-track-progress](http-track-progress.md) -- automatic visual progress bar
- [params-parser](params-parser.md) -- URL pattern matching
- [Async](../async/index.md) -- batch multiple requests
