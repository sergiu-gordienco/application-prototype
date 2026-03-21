# Storage: Browser Session

Promise-based key-value storage using IndexedDB (~200MB) with automatic localStorage fallback.

## Overview

The `browser-session` module provides a simple key-value storage API backed by IndexedDB. All values are automatically serialized with `JSON.stringify` and deserialized with `JSON.parse`. If IndexedDB is unavailable, it falls back to localStorage transparently.

## Advantages

- **~200MB storage** -- IndexedDB provides far more space than localStorage's 5-10MB
- **Promise-based API** -- every operation returns a Promise
- **Automatic JSON serialization** -- store objects, arrays, numbers directly
- **Event system** -- listen to `setItem::key` and `removeItem::key` events
- **Batch operations** -- `getItems`, `setItems`, `removeItems` for multiple keys
- **Find/filter** -- search stored items with custom filter functions
- **Automatic fallback** -- falls back to localStorage if IndexedDB is unavailable
- **Unique session IDs** -- each session instance gets a unique identifier
- **Strategy pattern** -- choose IndexedDB or localStorage explicitly, or let it auto-detect

## Getting Started

```js
App.require('browser-session').then(function (browserSession) {
    browserSession().then(function (session) {
        // Store a value
        session.setItem('user', { name: 'Alice', role: 'admin' })
            .then(function () {
                console.log('Saved!');
            });

        // Retrieve a value
        session.getItem('user').then(function (user) {
            console.log(user.name); // 'Alice'
        });
    });
});
```

## API Reference

### Creating a Session

```js
// Default (IndexedDB with localStorage fallback)
browserSession().then(function (session) { /* ... */ });

// Explicit localStorage strategy
browserSession('local-storage').then(function (session) { /* ... */ });

// Explicit IndexedDB strategy with config
browserSession('indexed-db').then(function (session) { /* ... */ });
```

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `id()` | String | Unique session instance identifier |
| `getItem(key)` | Promise&lt;any&gt; | Retrieve a value |
| `setItem(key, value)` | Promise&lt;any&gt; | Store a value |
| `removeItem(key)` | Promise&lt;any&gt; | Delete a value |
| `getItems(keys)` | Promise&lt;Object&gt; | Retrieve multiple values |
| `setItems(object)` | Promise&lt;Array&gt; | Store multiple key-value pairs |
| `removeItems(keys)` | Promise&lt;Array&gt; | Delete multiple values |
| `findItems(filter)` | Promise&lt;Object&gt; | Search items with filter function |
| `clear()` | Promise&lt;Object&gt; | Remove all items |

### Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `setItem::key` | `key, value` | Fired after a specific key is set |
| `removeItem::key` | `key` | Fired after a specific key is removed |

```js
session.on('setItem::theme', function (key, value) {
    document.body.className = value;
});
```

## Code Examples

### Example 1: User Preferences

```js
App.require('browser-session').then(function (browserSession) {
    browserSession().then(function (session) {
        // Save preferences
        session.setItem('preferences', {
            theme: 'dark',
            fontSize: 16,
            language: 'en',
            notifications: true
        });

        // Load preferences on page load
        session.getItem('preferences').then(function (prefs) {
            if (prefs) {
                document.body.className = prefs.theme;
                document.body.style.fontSize = prefs.fontSize + 'px';
            }
        });
    });
});
```

### Example 2: Offline Data Cache

```js
browserSession().then(function (session) {
    function fetchWithCache(url) {
        return session.getItem('cache::' + url).then(function (cached) {
            if (cached && (Date.now() - cached.timestamp < 300000)) {
                console.log('Cache hit:', url);
                return cached.data;
            }

            return fetch(url)
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    session.setItem('cache::' + url, {
                        data: data,
                        timestamp: Date.now()
                    });
                    return data;
                });
        });
    }

    fetchWithCache('/api/products').then(function (products) {
        console.log('Products:', products);
    });
});
```

### Example 3: Shopping Cart Persistence

```js
browserSession().then(function (session) {
    var cart = { items: [] };

    // Load cart from storage
    session.getItem('cart').then(function (savedCart) {
        if (savedCart) cart = savedCart;
        renderCart();
    });

    function addToCart(product) {
        cart.items.push(product);
        session.setItem('cart', cart).then(renderCart);
    }

    function removeFromCart(index) {
        cart.items.splice(index, 1);
        session.setItem('cart', cart).then(renderCart);
    }

    function clearCart() {
        cart = { items: [] };
        session.removeItem('cart').then(renderCart);
    }

    // Listen for cart changes (e.g., from another tab via shared storage)
    session.on('setItem::cart', function (key, value) {
        console.log('Cart updated:', value);
    });
});
```

### Example 4: Batch Operations

```js
browserSession().then(function (session) {
    // Store multiple values at once
    session.setItems({
        'config::apiUrl': 'https://api.example.com',
        'config::timeout': 5000,
        'config::retries': 3,
        'config::debug': false
    }).then(function () {
        console.log('All configs saved');
    });

    // Retrieve multiple values at once
    session.getItems([
        'config::apiUrl',
        'config::timeout',
        'config::retries'
    ]).then(function (configs) {
        console.log(configs['config::apiUrl']);   // 'https://api.example.com'
        console.log(configs['config::timeout']);  // 5000
    });

    // Find all config items
    session.findItems(function (key, value) {
        return key.indexOf('config::') === 0;
    }).then(function (configs) {
        console.log('All configs:', configs);
    });
});
```

## Strategy Comparison

| Feature | IndexedDB | localStorage |
|---------|-----------|-------------|
| Storage limit | ~200MB+ | 5-10MB |
| Data types | Any (via JSON) | Strings only |
| Async | Native | Simulated with Promises |
| Browser support | IE10+, all modern | IE8+, all browsers |
| Performance | Faster for large data | Faster for small data |
| Web Workers | Accessible | Not accessible |

## Related Modules

- [ApplicationBuilder](../core/application-builder.md) -- the Promise implementation used internally
- [Request](../networking/request.md) -- combine with session for offline-first apps
