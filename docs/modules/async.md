# Async

### Operations

Is an array where stored procedures have following structure:

```js
var operations  = [
  [
    function (cb) { /* operation function */ cb(); },
    context, /* ( optional ) */
    args /* (optional) operation arguments */
  ],
  [
    function () { /* operation function */ },
    context, /* ( optional ) */
    args /* (optional) operation arguments */
  ],
  // ...
];

```

## async.flow

**description:**

`async.flow` = `function ([Operations], callback, timeout);`
Executes functions from Operations one by one with given timeout between each. Returns an instance of _async_ object.

**arguments:**

* **Operations** _array_  - list of operations ( [Operations Example](#operations) )
* **callback** _function_ - callback after all operation were executed ( [Callback Example](#callback) )
* **timeout** _number_ _(optional)_ _(default: 0)_ - the timeout between operation execution

```js
async.test.flow	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var ops = [];
		var i = 0;
		while (i++ < n) {
			ops.push([(function (k) {
				return function (cb) {
					cb(k);
				};
			})(i + 0)]);
		}
		console.log(ops.length);
		var t0 = new Date().valueOf();
		var a1 = async.flow(ops, function () {
			console.log((new Date().valueOf() - t0)/(n * 1000));
		});
		var k=0;
		a1.on('onError', function (err) {
			console.error(err);
		});
		a1.on('onRecieve', function () {
			console.log(k++);
		});
		window.a1 = a1;
	});
};
```

## async.waterfall

**description:**

`async.waterfall` = `function ([Operations], callback, parralel, timeout)`

**arguments:**
* **Operations** _array_  - list of operations ( [Operations Example](#operations) )
* **callback** _function_ - callback after all operation were executed ( [Callback Example](#callback) )
* **parralel** _number_ _(optional)_ _(default: 27)_ - the maximum parralel function executions
* **timeout** _number_ _(optional)_ _(default: 0)_ - the timeout between operation execution

```js
async.test.waterfall	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var ops = [];
		var i = 0;
		while (i++ < n) {
			ops.push([(function (k) {
				return function (cb) {
					cb(k);
				};
			})(i + 0)]);
		}
		console.log(ops.length);
		var t0 = new Date().valueOf();
		var a1 = async.waterfall(ops, function () {
			console.log((new Date().valueOf() - t0)/(n * 1000));
		}, 69);
		var k=0;
		a1.on('onError', function (err) {
			console.error(err);
		});
		a1.on('onRecieve', function () {
			console.log(k++);
		});
		window.a1 = a1;
	});
};
```

async.test.map = async.test.flow.map	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.flow.map(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.floor(Math.random() * 1000));
		}, function (r) {
			console.log("DONE", r);
		})
	});
}

async.test.waterfall.map	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.waterfall.map(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.floor(Math.random() * 1000));
		}, function (r) {
			console.log("DONE", r);
		})
	});
}


async.test.filter = async.test.flow.filter	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.flow.filter(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.random() > 0.5);
		}, function (r) {
			console.log("DONE ", r.length);
		})
	});
}

async.test.waterfall.filter	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.waterfall.filter(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.random() > 0.5);
		}, function (r) {
			console.log("DONE ", r.length);
		})
	});
}

async.test.forEach = async.test.flow.forEach	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.flow.forEach(b, function (cb, v, i, arr) {
			console.log(i);
			cb();
		}, function (r) {
			console.log("DONE ", r.length);
		})
	});
}

async.test.waterfall.forEach	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.waterfall.forEach(b, function (cb, v, i, arr) {
			console.log(i);
			cb();
		}, function (r) {
			console.log("DONE ", r.length);
		})
	});
}




```
