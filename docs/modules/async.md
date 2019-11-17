# Async

Links: [Index](../../README.md)

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

`ev` - evaluation function, this function is called at every iteration through operations.

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
		processing : function () {
			// returns number of actions that are not yet processed
		}
		responses : function (returnAsArrayOfValues) {
			// if returnAsArrayOfValues === true than function returns an array of values
			//
			// in other case it returns an object with following structure
			// {
			// 	operation_id1: arguments,
			// 	operation_id2: arguments,
			// 	operation_id3: arguments,
			// 	operation_id4: arguments
			// 	...
			// }
		}
		errors : function () {
			// returns list of errors
		}
		done : function (cb) {
			// similar with a Promise, it will execute "cb" function after flow was finished
		}
	}
```
They are used internally to control flow of execution. The object is returned in function context and is accessed with keyword `this`.

Example:
```js
	this.processing()
```


An important part of these functions is the first function argument - `operations`. It is an array of arrays (but not necessarily). Each nested array has following structure:
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
	App.require('async').then(function (Async) { // require async module.
		App.bind('async', function () { // binds a function to App object.
			return Async;
		});
	}, function (err) {
		console.error(err);
	})
	//you may access async module via: App.async()
```

also we will include following functions for testing purposes:
```js
	// testing array for filter methods
	var unfiltered = [1, '1', 2, [], 'sun', {}, 3];

	// simulates some time consuming work
	var timedFunction = function (next) {
		console.log("started: " + new Date().valueOf());
		setTimeout(function () {
			var t = new Date().valueOf();
			console.log("ended: " + t);
			next(t + "");
		}, 2000);
	};
```

***

There are 2 execution implementations: `flow` and `waterfall`

- `flow` - executes one operation at a time. When it finishes, it will start next one.
- `waterfall` - executes operations in parallel. It will start a number (Default 27) of executions at the same time. If one finishes before the rest, it will start another one. This will ensure that at all the times there are a constant number of parallel executions active.

Note: Current implementation of waterfall waits for first operation to execute, and then fires next operations asynchronously.

***

`async.flow` - executes all operations in synchronous way, one after another. You may set a timeout before next function call as last argument.

Example:
```js
	// function used for testing, its returns solve after 2 secconds
	// simulates some time consuming work
	var timedFunction = function (next) {
		console.log("started: " + new Date().valueOf());
		setTimeout(function () {
			var t = new Date().valueOf();
			console.log("ended: " + t);
			next(t + "");
		}, 2000);
	};
	App.async().flow(
		[[timedFunction], [timedFunction], [timedFunction], [timedFunction]],
		function (data) {
			console.log('final callback, data : ', data);
		}
	);
```

Output:
```js
	started: 1498058741615
	ended: 1498058743620
	started: 1498058743623
	ended: 1498058745624
	started: 1498058745630
	ended: 1498058747631
	started: 1498058747636
	ended: 1498058749638
	final callback, data :  undefined
```
Final callback does not carry any data with it, it just signals end of the execution. This example will execute every operation with an interval of 2 seconds.

***

`async.waterfall` - executes all operations in an asynchronous way, many at a time. Same as flow, it wont return anything, it will callback to signal the end of execution.

Example:
```js
	// function used for testing, its returns solve after 2 secconds
	// simulates some time consuming work
	var timedFunction = function (next) {
		console.log("started: " + new Date().valueOf());
		setTimeout(function () {
			var t = new Date().valueOf();
			console.log("ended: " + t);
			next(t + "");
		}, 2000);
	};
	//we will generate an array of arrays of functions that will print a number after a random period of time.
	App.async().waterfall(
		[[timedFunction], [timedFunction], [timedFunction], [timedFunction]],
		function (data) {
			console.log('final callback, data : ', data);
		}
	);
```

Output:
```js
	started: 1498058854354
	ended: 1498058856355
	started: 1498058856358
	started: 1498058856359
	started: 1498058856360
	ended: 1498058858360
	ended: 1498058858361
	ended: 1498058858362
	final callback, data :  undefined
	async.waterfall finished
```

***

`async.map` - iterates through operations in synchronous way one at a time. Final callback returns an array with results.

`async.waterfall.map` - works the same as `async.map`

Example:

```js
// function used for testing, its returns solve after 2 secconds
// simulates some time consuming work
var timedFunction = function (next) {
	console.log("started: " + new Date().valueOf());
	setTimeout(function () {
		var t = new Date().valueOf();
		console.log("ended: " + t);
		next(t + "");
	}, 2000);
};
App.async().map(
	[[timedFunction], [timedFunction], [timedFunction], [timedFunction]],
	function (next, op, i, arr) {
		op[0](next);
	}, function (data) {
		console.log('final callback, data : ', data);
	}
);
```

Output:
```js
	started: 1498059138534
	ended: 1498059140534
	started: 1498059140538
	ended: 1498059142539
	started: 1498059142544
	ended: 1498059144545
	started: 1498059144551
	ended: 1498059146552
	final callback, data :  ["1498059140534", "1498059142539", "1498059144545", "1498059146552"]
```

This function iterates initial array and calls callback function provided. `next` function will return and save the value to the final result. (similar to `Array.prototype.map` logic, but it is passed in callback instead of return).

***

`async.filter` - filters operations array one at a time based on value true/false sent in callback function. Same logic as Array prototype filter. Function `next` takes `true` or `false` as first parameter.

Example:
```js
	App.async().filter(
		unfiltered,
		function (next, op, i, arr) {
			console.log("started: " + new Date().valueOf());
			setTimeout(function () {
				console.log("ended: " + new Date().valueOf());
				next(typeof(op) === 'number' ? true : false);
			}, 2000);
		}, function (data) {
			console.log('final callback, data : ', data);
		}
	);
```
Output:
```js
	started: 1498059382895
	ended: 1498059384896
	started: 1498059384899
	ended: 1498059386900
	started: 1498059386905
	ended: 1498059388907
	started: 1498059388913
	ended: 1498059390914
	started: 1498059390919
	ended: 1498059392921
	started: 1498059392927
	ended: 1498059394928
	started: 1498059394934
	ended: 1498059396935
	final callback, data :  [1, 2, 3]
```

`async.waterfall.filter` - filters operations array asynchronously, Default 27 at a time. Function `next` takes `true` or `false` as first parameter.
Example:
```js
	App.async().waterfall.filter(
		unfiltered,
		function (next, op, i, arr) {
			console.log("started: " + new Date().valueOf());
					setTimeout(function () {
						console.log("ended: " + new Date().valueOf());
						next(typeof(op) === 'number' ? true : false);
					}, 2000);
		}, function (data) {
			console.log('final callback, data : ', data);
		}
	);
```

Output:
```js
	started: 1498059635682
	ended: 1498059638584
	started: 1498059638590
	started: 1498059638591
	started: 1498059638593
	started: 1498059638594
	started: 1498059638597
	started: 1498059638599
	ended: 1498059640592
	ended: 1498059640593
	ended: 1498059640594
	ended: 1498059640597
	ended: 1498059640599
	ended: 1498059640600
	final callback, data :  [1, 2, 3]
```
***

`async.forEach` - iterates synchronously through each of operations. Returns initial array of operations in final callback.

Example:
```js
	// function used for testing, its returns solve after 2 secconds
	// simulates some time consuming work
	var timedFunction = function (next) {
		console.log("started: " + new Date().valueOf());
		setTimeout(function () {
			var t = new Date().valueOf();
			console.log("ended: " + t);
			next(t + "");
		}, 2000);
	};
	App.async().forEach(
		[[timedFunction], [timedFunction], [timedFunction], [timedFunction]],
		function (next, op, i, arr) {
			op[0](next);
		}, function (data) {
			console.log('final callback, data : ', data);
		}
	);
```
Output:
```js
	started: 1498059819830
	ended: 1498059821831
	started: 1498059821834
	ended: 1498059823835
	started: 1498059823840
	ended: 1498059825840
	started: 1498059825846
	ended: 1498059827847
	final callback, data :  [Array(1), Array(1), Array(1), Array(1)]
```

`async.waterfall.forEach` - iterates asynchronously through operations.

Example:
```js
	// function used for testing, its returns solve after 2 secconds
	// simulates some time consuming work
	var timedFunction = function (next) {
		console.log("started: " + new Date().valueOf());
		setTimeout(function () {
			var t = new Date().valueOf();
			console.log("ended: " + t);
			next(t + "");
		}, 2000);
	};
	App.async().waterfall.forEach(
		[[timedFunction], [timedFunction], [timedFunction], [timedFunction]],
		function (next, op, i, arr) {
			op[0](next);
		}, function (data) {
			console.log('final callback, data : ', data);
		}
	);
```

Output:
```js
	started: 1498059973043
	ended: 1498059975043
	started: 1498059975047
	started: 1498059975048
	started: 1498059975049
	ended: 1498059977048
	ended: 1498059977049
	ended: 1498059977050
	final callback, data :  [Array(1), Array(1), Array(1), Array(1)]
```
