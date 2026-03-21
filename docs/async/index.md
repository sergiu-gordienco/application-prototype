# Async Operations

A powerful async orchestration module with sequential (`flow`) and parallel (`waterfall`) execution modes, plus familiar array methods (`map`, `filter`, `forEach`).

## Overview

The `async` module lets you execute arrays of operations either one-at-a-time (flow) or many-at-a-time (waterfall). It provides `map`, `filter`, and `forEach` variants for both modes, giving you full control over async workflows without complex Promise chains or async/await syntax.

## Advantages

- **No Promise chains** -- simple callback-based API that works everywhere
- **Concurrency control** -- waterfall runs N operations at a time (default 27, configurable)
- **Familiar API** -- `map`, `filter`, `forEach` work like their Array counterparts
- **Error collection** -- `errors()` method gathers all failures across operations
- **Progress monitoring** -- `processing()` tells you how many operations are still running
- **Works in old browsers** -- no ES6 required, no transpilation needed
- **Timeout support** -- set delays between sequential operations
- **Operation IDs** -- track and retrieve individual operation results

## Getting Started

```js
App.require('async').then(function (asyncModule) {
    var async = asyncModule();

    async.flow([
        [function (next) {
            console.log('Step 1');
            next('result-1');
        }],
        [function (next) {
            console.log('Step 2');
            next('result-2');
        }]
    ], function () {
        console.log('All steps done!');
        console.log('Results:', this.responses(true)); // ['result-1', 'result-2']
    });
});
```

## API Reference

### `async.flow(operations, callback, [timeout])`

Execute operations one after another (sequential).

| Parameter | Type | Description |
|-----------|------|-------------|
| `operations` | Array | Array of operation definitions |
| `callback` | Function | Called when all operations complete |
| `timeout` | Number | Delay (ms) between operations |

**Operation format:** `[function, [args], context, callbackIndex]`

```js
async.flow([
    [function (next) { setTimeout(function () { next('a'); }, 100); }],
    [function (next) { setTimeout(function () { next('b'); }, 100); }],
    [function (next) { setTimeout(function () { next('c'); }, 100); }]
], function () {
    console.log(this.responses(true)); // ['a', 'b', 'c'] -- always in order
});
// Total time: ~300ms (sequential)
```

---

### `async.waterfall(operations, callback, [parallel], [timeout])`

Execute operations in parallel with concurrency control.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `operations` | Array | | Operation definitions |
| `callback` | Function | | Completion callback |
| `parallel` | Number | 27 | Max concurrent operations |
| `timeout` | Number | | Delay between batches |

```js
async.waterfall([
    [function (next) { setTimeout(function () { next('a'); }, 300); }],
    [function (next) { setTimeout(function () { next('b'); }, 100); }],
    [function (next) { setTimeout(function () { next('c'); }, 200); }]
], function () {
    console.log('All done');
}, 2); // max 2 at a time
// Total time: ~400ms (2 parallel then 1)
```

---

### `async.map(items, evaluator, callback, [timeout])`

Transform each item (sequential). Like `Array.prototype.map` but async.

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | Array | Items to transform |
| `evaluator` | Function | `function(next, item, index, items)` -- call `next(value)` on success or `next(value, error)` on failure |
| `callback` | Function | Receives transformed array |

```js
async.map(
    [1, 2, 3, 4, 5],
    function (next, number, index) {
        // Simulate async transformation
        setTimeout(function () {
            next(number * number);
        }, 50);
    },
    function (results) {
        console.log(results); // [1, 4, 9, 16, 25]
    }
);
```

---

### `async.waterfall.map(items, evaluator, callback, [parallel], [timeout])`

Same as `map` but processes items in parallel.

```js
async.waterfall.map(
    ['https://api.example.com/a', 'https://api.example.com/b', 'https://api.example.com/c'],
    function (next, url) {
        fetch(url).then(function (r) { return r.json(); }).then(next);
    },
    function (results) {
        console.log('All fetched:', results);
    },
    3 // fetch all 3 in parallel
);
```

---

### `async.filter(items, evaluator, callback, [timeout])`

Filter items (sequential). Like `Array.prototype.filter` but async. The `next` callback accepts `next(keepBoolean)` or `next(keepBoolean, error)`.

```js
async.filter(
    [1, 'hello', 2, null, 3, {}, 4],
    function (next, item) {
        next(typeof item === 'number'); // keep only numbers
    },
    function (results) {
        console.log(results); // [1, 2, 3, 4]
    }
);
```

---

### `async.waterfall.filter(items, evaluator, callback, [parallel], [timeout])`

Same as `filter` but processes in parallel.

```js
// Check which URLs are alive (parallel)
async.waterfall.filter(
    ['https://example.com', 'https://doesnt-exist.xyz', 'https://google.com'],
    function (next, url) {
        fetch(url, { mode: 'no-cors' })
            .then(function () { next(true); })
            .catch(function () { next(false); });
    },
    function (aliveUrls) {
        console.log('Alive:', aliveUrls);
    },
    10
);
```

---

### `async.forEach(items, evaluator, callback, [timeout])`

Iterate items (sequential). Like `Array.prototype.forEach` but async. The `next` callback accepts `next()` on success or `next(undefined, error)` on failure.

```js
async.forEach(
    ['file1.txt', 'file2.txt', 'file3.txt'],
    function (next, filename) {
        console.log('Processing:', filename);
        // ... do async work ...
        next();
    },
    function () {
        console.log('All files processed');
    }
);
```

---

### `async.waterfall.forEach(items, evaluator, callback, [parallel], [timeout])`

Same as `forEach` but processes in parallel.

---

### AsyncApp Instance Methods

The `this` context in callbacks gives you access to:

| Method | Returns | Description |
|--------|---------|-------------|
| `this.index()` | string | Get unique operation identifier |
| `this.processing()` | number | Number of operations still running |
| `this.responses(true)` | array | Get all results as ordered array |
| `this.responses()` | object | Get results keyed by operation ID |
| `this.errors()` | array | Get all errors from failed operations |
| `this.done(callback)` | | Register additional completion callback |

```js
var task = async.flow(operations, function () {
    console.log('Processing:', this.processing());  // 0
    console.log('Results:', this.responses(true));
    console.log('Errors:', this.errors());
});

// Also available on returned object
task.done(function () {
    console.log('Additional completion handler');
});

// Listen to events
task.on('error', function (err) {
    console.error('Operation failed:', err);
});
```

## Code Examples

### Example 1: Sequential API Data Pipeline

```js
App.require('async').then(function (asyncModule) {
    var async = asyncModule();

    async.flow([
        // Step 1: Fetch user list
        [function (next) {
            fetch('/api/users').then(function (r) { return r.json(); }).then(next);
        }],
        // Step 2: Fetch details for first user
        [function (next) {
            var users = this.responses(true)[0];
            fetch('/api/users/' + users[0].id)
                .then(function (r) { return r.json(); })
                .then(next);
        }],
        // Step 3: Update UI
        [function (next) {
            var userDetail = this.responses(true)[1];
            document.getElementById('profile').textContent = userDetail.name;
            next();
        }]
    ], function () {
        console.log('Pipeline complete');
    });
});
```

### Example 2: Batch Image Upload with Concurrency Limit

```js
var files = document.getElementById('fileInput').files;
var fileArray = Array.prototype.slice.call(files);

async.waterfall.forEach(
    fileArray,
    function (next, file, index) {
        var formData = new FormData();
        formData.append('image', file);

        fetch('/api/upload', { method: 'POST', body: formData })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                console.log('Uploaded', index + 1, '/', fileArray.length, ':', result.url);
                next(result);
            })
            .catch(function (err) {
                console.error('Failed:', file.name, err);
                next(err);
            });
    },
    function () {
        console.log('All uploads complete!');
        console.log('Errors:', this.errors());
    },
    3 // max 3 uploads at a time
);
```

### Example 3: Data Validation Pipeline

```js
var records = [
    { name: 'Alice', email: 'alice@example.com', age: 30 },
    { name: '', email: 'invalid', age: -1 },
    { name: 'Bob', email: 'bob@test.com', age: 25 },
    { name: 'Charlie', email: '', age: 150 }
];

async.filter(
    records,
    function (next, record) {
        // Simulate async validation (e.g., checking email against API)
        var isValid = (
            record.name.length > 0 &&
            record.email.match(/@/) &&
            record.age > 0 && record.age < 120
        );
        next(isValid);
    },
    function (validRecords) {
        console.log('Valid records:', validRecords);
        // [{ name: 'Alice', ... }, { name: 'Bob', ... }]
    }
);
```

### Example 4: Retry with Backoff

```js
function retryWithBackoff(asyncFn, maxRetries, baseDelay) {
    var attempts = [];
    for (var i = 0; i < maxRetries; i++) {
        attempts.push([asyncFn, [i]]);
    }

    async.flow(
        attempts,
        function () {
            var results = this.responses(true);
            var success = results.filter(function (r) { return r !== 'error'; });
            if (success.length) {
                console.log('Success:', success[0]);
            } else {
                console.error('All retries failed');
            }
        },
        baseDelay // delay between attempts
    );
}
```

## flow vs waterfall -- When to Use Which

| Use Case | Use `flow` | Use `waterfall` |
|----------|-----------|-----------------|
| Operations depend on previous results | Yes | No |
| Order matters | Yes | No |
| Maximize throughput | No | Yes |
| API rate limiting | Yes (with timeout) | Yes (with low parallel count) |
| File processing pipeline | Yes | No |
| Batch uploads/downloads | No | Yes |
| Database migrations | Yes | No |

## Related Modules

- [ApplicationPrototype](../core/application-prototype.md) -- async uses it internally for event handling
- [Request](../networking/request.md) -- combine with async for batch HTTP operations
