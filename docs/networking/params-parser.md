# params-parser -- URL Pattern Matching

Extract named parameters from URLs using Express-style `:param` patterns.

## Overview

`params-parser` matches a URL string against a pattern containing `:paramName` placeholders and returns an object of extracted values. Useful for client-side routing, API endpoint matching, and URL parsing.

## Advantages

- **Express-style patterns** -- familiar `:param` syntax
- **Regex caching** -- compiled patterns are cached for repeated use
- **Custom mappers** -- control how values are decoded (default: `decodeURIComponent`)
- **Custom match groups** -- define your own regex for parameter segments
- **Fixed/open endings** -- match exact paths or allow trailing content
- **Lightweight** -- single function, no dependencies

## Getting Started

```js
App.require('request/params-parser').then(function (paramsParser) {
    var result = paramsParser('/users/42/posts', '/users/:id/posts');
    console.log(result);
    // { id: '42' }
});
```

## API Reference

### `paramsParser(value, pattern, [options])`

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | string | The URL/string to match against |
| `pattern` | string | Pattern with `:paramName` placeholders |
| `options` | object | Optional configuration (see below) |

**Returns:** `Object<string, string>` with extracted parameters, or `null` if no match.

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cache` | object | null | Object to store compiled regex patterns for reuse |
| `mapper` | function | `decodeURIComponent` | Function to decode each extracted value |
| `ret` | object | `{}` | Object to populate with results (mutated in place) |
| `tableIndex` | string[] | `[]` | Pre-defined list of parameter names |
| `pRegExp` | string | `"\\:([a-z][a-z0-9]+)"` | Regex to match parameter placeholders |
| `matchGroup` | string | `"([^\\/]+)"` | Regex for the value each parameter captures |
| `fixedEnd` | boolean | `true` | If true, pattern must match to end of string |

## Code Examples

### Example 1: Basic Route Matching

```js
App.require('request/params-parser').then(function (paramsParser) {
    // Simple parameter extraction
    var result = paramsParser('/api/users/alice', '/api/users/:username');
    console.log(result);
    // { username: 'alice' }

    // Multiple parameters
    result = paramsParser(
        '/blog/2024/03/hello-world',
        '/blog/:year/:month/:slug'
    );
    console.log(result);
    // { year: '2024', month: '03', slug: 'hello-world' }

    // No match returns null
    result = paramsParser('/about', '/users/:id');
    console.log(result);
    // null
});
```

### Example 2: Client-Side Router

```js
App.require('request/params-parser').then(function (paramsParser) {
    var routes = [
        { pattern: '/',                    handler: showHome },
        { pattern: '/users/:id',           handler: showUser },
        { pattern: '/users/:id/posts',     handler: showUserPosts },
        { pattern: '/posts/:id',           handler: showPost },
        { pattern: '/login/:service/:action', handler: handleAuth }
    ];

    var cache = {}; // reuse compiled patterns

    function navigate(path) {
        for (var i = 0; i < routes.length; i++) {
            var params = paramsParser(path, routes[i].pattern, { cache: cache });
            if (params) {
                routes[i].handler(params);
                return;
            }
        }
        show404();
    }

    // URL change handler
    window.addEventListener('popstate', function () {
        navigate(location.pathname);
    });

    navigate(location.pathname);
});
```

### Example 3: API Endpoint Dispatcher

```js
var cache = {};

function dispatch(url) {
    var params;

    params = paramsParser(url, '/api/:version/users/:userId', { cache: cache });
    if (params) {
        return fetchUser(params.version, params.userId);
    }

    params = paramsParser(url, '/api/:version/search/:query', { cache: cache });
    if (params) {
        return search(params.version, params.query);
    }

    return null;
}
```

### Example 4: URL Encoded Values

```js
// Encoded values are automatically decoded
var result = paramsParser(
    '/search/hello%20world',
    '/search/:query'
);
console.log(result);
// { query: 'hello world' }

// Custom mapper to skip decoding
var raw = paramsParser(
    '/search/hello%20world',
    '/search/:query',
    { mapper: function (v) { return v; } }
);
console.log(raw);
// { query: 'hello%20world' }
```

## Related Modules

- [request](request.md) -- HTTP client for making API calls
- [custom-elements](../modules/custom-elements.md) -- use with routing for SPA navigation
