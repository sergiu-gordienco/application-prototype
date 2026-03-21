# Extensions & Polyfills

50+ utility methods added to built-in prototypes, plus encryption, DOM helpers, and cross-browser polyfills.

## Overview

The `extensions/prototype` module enriches JavaScript built-in types (String, Array, Number, Blob, Function) with utility methods and provides browser polyfills for consistent cross-browser behavior.

## Advantages

- **One import** -- enriches all built-in types at once
- **Encryption built-in** -- SHA1, SHA256, MD5, AES, TEA, Base64 on any string
- **String utilities** -- URL parsing, hex encoding, HTML escaping, padding, truncation
- **Array utilities** -- shuffle, unique, min, max, binary operations
- **Blob utilities** -- download helpers, data URL conversion
- **Web Workers** -- create workers from inline functions
- **Cross-browser events** -- unified addEventListener/removeEventListener
- **Window utilities** -- size detection, mouse position tracking
- **Keyboard shortcuts** -- capture and bind key combinations
- **Online/offline detection** -- events for connectivity changes
- **Random ID generation** -- unique identifiers

## Getting Started

```js
App.require('extensions/prototype').then(function (ext) {
    // String encryption
    console.log('hello'.sha256());
    console.log('secret data'.encryptAES('password'));

    // Array utilities
    console.log([1, 2, 3, 2, 1].unique()); // [1, 2, 3]
    console.log([1, 2, 3, 4, 5].shuffle());

    // Random IDs
    console.log(ext.getRandId('user_')); // 'user_k3x9f...'

    // Window size
    console.log(ext.window.size()); // { w: 1920, h: 1080 }
});
```

## Key Features by Category

### String Methods

```js
// Encryption & Hashing
'hello'.sha1()                    // SHA-1 hash
'hello'.sha256()                  // SHA-256 hash
'hello'.md5()                     // MD5 hash
'secret'.encryptAES('key')        // AES encryption
'encrypted'.decryptAES('key')     // AES decryption
'data'.encryptTEA('key')          // TEA encryption
'text'.base64encode()             // Base64 encode
'dGV4dA=='.base64decode()         // Base64 decode

// String Utilities
'hello world'.subs(5)             // 'hello' (first 5 chars)
'hello world'.subs(6, 0)          // 'world' (from position 6 to end)
'hello world'.subs(6, 5)          // 'world' (5 chars from position 6)
'hello'.repeat(3)                 // 'hellohellohello'
'<div>'.escapeHtml()              // '&lt;div&gt;'
'hello world'.urlEncode()         // 'hello%20world'
'48656c6c6f'.hexDecode()          // 'Hello'
'Hello'.hexEncode()               // '48656c6c6f'
```

### Array Methods

```js
[1, 2, 3, 2, 1].unique()         // [1, 2, 3]
[5, 3, 1, 4, 2].shuffle()        // [3, 1, 5, 2, 4] (random)
[10, 5, 8, 3, 7].min()           // 3
[10, 5, 8, 3, 7].max()           // 10
```

### Window & Mouse

```js
ext.window.size()                 // { w: 1920, h: 1080 }
ext.window.sizeActive()           // constrained by min/max limits
ext.mouse.position()              // { x: 500, y: 300, xmax: 1920, ymax: 1080 }
```

### Random ID Generation

```js
ext.getRandId()                   // 'a8f3k2...'
ext.getRandId('session_')         // 'session_b9x1m...'
ext.getRandId('id_', true)        // 'id_k3f' (shorter, base-36)
```

### Cross-Browser Events

```js
ext.addEventListener(element, 'click', handler);
ext.removeEventListener(element, 'click', handler);
```

## Code Examples

### Example 1: Client-Side Data Encryption

```js
App.require('extensions/prototype').then(function () {
    var sensitiveData = JSON.stringify({
        creditCard: '4111-1111-1111-1111',
        cvv: '123'
    });

    // Encrypt before storing
    var encrypted = sensitiveData.encryptAES('user-password-123');
    localStorage.setItem('payment', encrypted);

    // Decrypt when needed
    var stored = localStorage.getItem('payment');
    var decrypted = stored.decryptAES('user-password-123');
    var data = JSON.parse(decrypted);
    console.log(data.creditCard); // '4111-1111-1111-1111'
});
```

### Example 2: Generate Unique IDs

```js
App.require('extensions/prototype').then(function (ext) {
    function createUser(name, email) {
        return {
            id: ext.getRandId('user_', true),
            name: name,
            email: email,
            token: (name + Date.now()).sha256()
        };
    }

    var user = createUser('Alice', 'alice@example.com');
    console.log(user.id);    // 'user_k3f9x'
    console.log(user.token); // '8a3b1f...' (SHA-256 hash)
});
```

### Example 3: Data Integrity with Hashing

```js
App.require('extensions/prototype').then(function () {
    function verifyIntegrity(data, expectedHash) {
        var actualHash = JSON.stringify(data).sha256();
        return actualHash === expectedHash;
    }

    var payload = { amount: 100, currency: 'USD' };
    var hash = JSON.stringify(payload).sha256();

    // Later, verify the data hasn't been tampered with
    console.log(verifyIntegrity(payload, hash)); // true
    payload.amount = 999;
    console.log(verifyIntegrity(payload, hash)); // false
});
```

## Related Modules

- [ApplicationBuilder](../core/application-builder.md) -- loads extensions/prototype as a first step
- [lib](../modules/lib.md) -- registers all modules including this one
