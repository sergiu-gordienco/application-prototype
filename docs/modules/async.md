# Async

Async is a set of methods that lets you execute an array of operations in asynchronous mode. It implements following methods:
```js
	async.flow( operations, callback[,timeout] )
	async.waterfall( operations, callback[,parallel, timeout] )
	async.map( operations, ev, callback[,timeout] )
	async.waterfall.map( operations, ev, callback[,parallel, timeout] )
	async.filter( operations, ev, callback[,timeout] )
	async.waterfall.filter( operations, ev, callback[,parallel, timeout] )
	async.forEach( operations, ev, callback[,timeout] )
	async.waterfall.forEach( operations, ev, callback[,parallel, timeout] )
```
Note:

`ev` - evaluation function, this function is called at every iteration.

Methods with `waterfall` are implemented to execute operations in parallel or many at a time, the rest will execute one at a time.

When any method finishes it's job, it returns an AsyncApp object:

```js
	{
		index : function () { ... }
		recieve : function (id, args) { ... }
		wait : function () { ... }
		reserve : function () { ... }
		run : function (fun, args, context) { ... }
		flush : function ([,fun, args]) { ... }
		processing : function () { ... }
		responses : function (id) { ... }
		errors : function () { ... }
		done : function (cb) { ... }
	}
```
They are used internally to control flow of execution. The object is returned in function context and is accessed with keyword `this`.

Example:
```js
	this.processing()
```


An important part of these functions is the first function argument - `operations`. It is an array of arrays (but not necessarily). To make it look like familiar Array prototype implementations, you may pass any type instead of nested arrays. Each contained array is as following:
```js
[
	[
		function (a, b, cb) {
			/* operation function */ cb();
		},
		[2, 3, null] /* ( optional ) operation arguments */
		context, /* ( optional ) */
		2 // callbackIndex
	],
	[
		function (a, b, cb) {
			/* operation function */ cb();
		},
		[2, 3, null] /* ( optional ) operation arguments */
		context, /* ( optional ) */
		2 // callbackIndex, ( optional )
	],
	[ ... ]
]
```
To pass an array of arrays is useful in limited scenarios, however it may apply arguments to functions for you, use custom contexts to have access to variables instead of passing them in function call, etc.
***

### To initialize module:
In your frontend include following scripts:
```html
	<script type="text/javascript" charset="utf-8" src="ApplicationPrototype.js"></script>
	<script type="text/javascript" charset="utf-8" src="ApplicationBuilder.js"></script>
```
and then call:
```js
	var App = new ApplicationBuilder(); // it will initialize bare-bone application prototype
	App.require('async').then(function (Async) { // require async script. It exports a module.
		App.bind('async', function () { // binds a function for async module using App object.
			return Async;
		});
	}, function (err) {
		console.error(err);
	})
	//you may access async module context via: App.async()
```

***

As said above, there are 2 flow implementations: `flow` and `waterfall`

- `flow` - executes one operation at a time. When it finishes, it will start next one.
- `waterfall` - executes operations in parallel. It will start a number (Default 27) of executions at the same time. If one finishes before the rest, it will start another one. This will ensure that at all the times there are a constant number of parallel executions active. You may pass parallel number as last parameter in any function with keyword `waterfall` (No effect for flow).

***

`async.flow` - executes all operations in synchronous way, one after another. You may set a timeout before next function call as last argument.

Example:
```js
	App.async().flow([
		[
			function (cb) {
				console.log('1');
				cb('1');
			}
		],
		[
			function (cb) {
				setTimeout(function () {
					console.log('2');
					cb('2');
				}, 5000);
			}
		],
		[
			function (cb) {
				console.log('3');
				cb('3');
			}
		]
	], function (data) {
		console.log('async.flow: ', data);
	}, 1000);
```

Output:
```js
	1
	2
	3
	 async.flow: undefined
```

Even if we have a timeout for 5 seconds, it wont break execution queue and will wait for it to finish before calling next operation. Final callback does not carry any data with it, it just signals end of the execution. This example will execute every operation with an interval of one second.

***

`async.waterfall` - executes all operations in an asynchronous way, many at a time. Same as flow, it wont return anything, it will callback to signal the end of execution.

Example:
```js
	//we will generate an array of arrays of functions that will print a number after a random period of time.
	var arr = [];
	for (var i = 0; i < 10; i++) {
		arr.push((function (k) {
			return [function (cb) {
				setTimeout(function () {
					console.log(k);
					cb();
				}, Math.random()*1000);
			}];
		})(i));
	}
	App.async().waterfall(arr, function () {
		console.log('async.waterfall finished');
	});
```

Output:
```js
	0
	6
	7
	3
	5
	1
	9
	4
	8
	2
	async.waterfall finished
```
Because we've got different timeouts for different operations, it produced an asynchronous effect.

***

`async.map` - iterates through operations in synchronous way one at a time. Final callback returns an array with results.

`async.waterfall.map` - works the same as `async.map`

The only difference between `waterfall.forEach` or `waterfall.filter` is the `next` callback parameter.

Example:

```js
App.async().map([
	[
		{
			a : 'first',
			b : 'second'
		}
	],
	[
		{
			a : 'third',
			b : 'fourth'
		}
	]
], function (next, op, i, arr) {
	//intermediate callback for every operation
	// op[0] is the object/function/whatever you passed in operations array.
	// i is it's index in array
	// arr is initial array passed in function
	op[0].a = 'i was first';
	op[0].b = 'i was second';
	next(op[0]);
}, function (data) {
	//final callback, signals end of execution
	console.log('async.map: ', data);
});
```

Output:
```js
	[
		{
			a : 'i was first',
			b : 'i was second'
		},
		{
			a : 'i was first',
			b : 'i was second'
		}
	]
```

This function iterates initial array and calls callback function provided. `next` function will return and save the value to the final result. (similar to `Array.prototype.map` logic).

***

`async.filter` - filters operations array one at a time based on value true/false sent in callback function. Same logic as Array prototype filter.

`async.waterfall.filter` - filters operations array asynchronously, Default 27 at a time

For both functions, `next` callback can take 2 parameters: `true` or `false`.
Example:
```js
	var unfiltered = [1, '1', 2, 'sun', {}, 3];
	// fills array with random numbers for testing
	for (var i = 0; i < 500; i++) {
		if (Math.random() > 0.5) {
			unfiltered.push(Math.random() * 100);
		} else {
			unfiltered.push(false);
		}
	}
	App.async().waterfall.filter(unfiltered, function (next, op, i, arr) {
		setTimeout(function () {
			next(typeof(op) === 'number' ? true : false); // callback to proceed to next iteration
			console.log(i,'/', arr.length, ' waterfall filter');
		}, 100);
	}, function (data) {
		//success and end callback
		console.log('async waterfall filter finished', data, new Date().valueOf());
	}, 10); // max parallel executions
	App.async().filter(unfiltered, function (next, op, i, arr) {
		setTimeout(function () {
			next(typeof(op) === 'number' ? true : false); // callback to proceed to next iteration
			console.log(i,'/', arr.length, ' flow filter');
		}, 100); //sets 100ms interval before calling next function aka interval between callbacks
	}, function (data) {
		//success and end callback
		console.log('async filter finished', data, new Date().valueOf());
	});
	for (var i = 0; i < 11000; i++) {
		//simulates here some logic
	}
```

Output:
```js
0 "/" 506 " waterfall filter"
0 "/" 506 " flow filter"
1 "/" 506 " waterfall filter"
2 "/" 506 " waterfall filter"
3 "/" 506 " waterfall filter"
4 "/" 506 " waterfall filter"
5 "/" 506 " waterfall filter"
6 "/" 506 " waterfall filter"
7 "/" 506 " waterfall filter"
8 "/" 506 " waterfall filter"
9 "/" 506 " waterfall filter"
1 "/" 506 " flow filter"
10 "/" 506 " waterfall filter"
11 "/" 506 " waterfall filter"
12 "/" 506 " waterfall filter"
13 "/" 506 " waterfall filter"
14 "/" 506 " waterfall filter"
15 "/" 506 " waterfall filter"
16 "/" 506 " waterfall filter"
17 "/" 506 " waterfall filter"
18 "/" 506 " waterfall filter"
2 "/" 506 " flow filter"
...
```
In output we can see 10 executions at the same time in waterfall and only one in flow

***

`async.forEach` - iterates synchronously through each of operations but does not return anything. Same logic as in Array prototype forEach.

`async.waterfall.forEach` - iterates asynchronously through operations. Iterates in parallel, default 27.

Callback `next` does not take any parameters as this implementations does not return anything. Use `async.map` instead.

Example:
```js
	var unfiltered = [1, '1', 2, 'sun', {}, 3];
	// fills array with randpm numbers for testing
	for (var i = 0; i < 500; i++) {
		if (Math.random() > 0.5) {
			unfiltered.push(Math.random() * 100);
		} else {
			unfiltered.push(false);
		}
	}
	App.async().waterfall.forEach(unfiltered, function (next, op, i, arr) {
		setTimeout(function () {
			next(); // calback to proceed to next iteration
			console.log(i,'/', arr.length, ' waterfall forEach');
		}, 100);
	}, function (data) {
		//success and end callback
		console.log('async waterfall filter finished', data, new Date().valueOf());
	}, 10); // max parallel executions
	App.async().forEach(unfiltered, function (next, op, i, arr) {
		setTimeout(function () {
			next(); // calback to proceed to next iteration
			console.log(i,'/', arr.length, ' flow forEach');
		}, 100); //sets 100ms interval before calling next function aka interval between callbacks
	}, function (data) {
		//success and end callback
		console.log('async filter finished', data, new Date().valueOf());
	});
	for (var i = 0; i < 11000; i++) {
		//simulates here some heavy logic
	}
```

Output:
```js
0 "/" 506 " waterfall forEach"
0 "/" 506 " flow forEach"
1 "/" 506 " waterfall forEach"
2 "/" 506 " waterfall forEach"
3 "/" 506 " waterfall forEach"
4 "/" 506 " waterfall forEach"
5 "/" 506 " waterfall forEach"
6 "/" 506 " waterfall forEach"
7 "/" 506 " waterfall forEach"
8 "/" 506 " waterfall forEach"
9 "/" 506 " waterfall forEach"
1 "/" 506 " flow forEach"
10 "/" 506 " waterfall forEach"
11 "/" 506 " waterfall forEach"
...
```
As we can see, there are 10 executions in parallel for waterfall and just one for flow
