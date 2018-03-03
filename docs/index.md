# ApplicationPrototype

returns an object ApplicationPrototype

### Methods:

- **bind** - `function` - Attach an method
	- arguments:
		- **methodName** `string`
		- **method** `function`
		- **config** [`string` or `object`]
			- if `object`
			```js
			{
				listenedBefore	: true, // enable event beforeMethod
				listenedOn		: true, // enable event onMethod
				listenedAfter	: true, // enable event afterMethod
				allowInteruption: true // enable interruption by returning false in method
			}
			```
			- if is `string` options from object are `false` and if it contains some substrings it enables specific options from object
				- `"light"` - enables `listenedOn` and `allowInteruption`
				- `"on"` » `listenedOn = true`
				- `"af"` » `listenedAfter = true`
				- `"st"` » `allowInteruption = true`
				- `"bf"` » `listenedBefore = true`
				- `"before"` » `listenedBefore = true`



- **on** - `function` - Attach an event listener to an eventName, returns listener-id
```js
	app.on("onRender", function (a, b, c ) { /* ... */ });

	// add listeners to multiple events
	app.on("onRender", function (a, b, c ) { /* ... */ });
```
```js
	var listenerId = app.on(
		"onRender",
		function (a, b, c ) { /* ... */ },
		"predefined-listener-id"
	);
```

- **once** - `function` - Attach an event listener to an eventName only once, returns listener-id
```js
	// listen once
	app.once("onRender", function (a, b, c ) { /* ... */ });
```

- **off** - `function` - Remove an event listener
```js
app.off("onRender") // remove all listeners for a specific eventName
```
```js
app.off("onRender", "listenerId") // remove an specific listener-id

// remove an specific listener-id from multiple events
app.off("onInit, onRender", "listenerId")
```

- **emit** - `function` - emits an event
```js
app.emit("onRender", [arg1, arg2 /*, ...*/]); // emit a event with a specific eventName
```
```js
app.emit("onRender", [arg1, arg2 /*, ...*/], true);
// context of listeners will contain methods that will be tracked by events
```
```js
app.emit("onRender", [arg1, arg2 /*, ...*/], false, true);
// the event emiting will not be stoppable
```

- **crudEvents** - ( no yet documented @todo )
```js

var app = new ApplicationPrototype();

app.bind("render", function (p1, p2) {
	// this !== app ; this contains methods from app but they may not be listened
	// see app.emit

	// your logic
});

// or

app.bind(function renderSimplier(p1, p2) {
	// this !== app ; this contains methods from app but they may not be listened
	// see app.emit

	// your logic
});

app.on("beforeRender", function (p1, p2) {
	// this !== app ; this contains methods from app but they may not be listened
	// see app.emit

	// your code

	if (/* some condition */) {
		return false; // prevent executing of method app.render(), and stop next listeners
		// this functionality may not be accessible see app.emit
	}
});

app.on("onRender", function (p1, p2) { /* ... */ });

app.on("afterRender", function (p1, p2) { /* ... */ });

var param1 = "test";
var param2 = { test: 2 };
app.render(param1, param2);

// retrigger event afterRender
app.emit("afterRender", [param1, param2]);
```

# ApplicationBuilder

# Documentation not ready

Sorry, but you may help.

## Contribution
if you find code interesting you may participate by updating documentation using pull request or mail messages to [sergiu.gordienco@gmail.com](mailto:sergiu.gordienco@gmail.com)


## Application.Promise

It is a polyfill for Promise constructors

more documentation on [Promise - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)

## Application.cacheEnabled

## Application.debugEnabled

## Application.modulePath

## Application.moduleRegister

## Application.moduleResolve

## Application.require

- Use with callback

```js
Application.require("module-name", function (err, requiredModule) {
	// work with it
})
```

- Use as Promise

```js
Application.require("module-name").then(function (requiredModule) {
	// work with it
}).catch(function (err) {
	console.log(error);
})
```

- Use multiple require

```js
Application.require([
	"ePrototype :: extensions/prototype",
	"uriLoad :: uri-load"
]).then(function (lib) {
	lib.ePrototype; // ... use it
	lib.uriLoad; // ... use it
	// work with it
}).catch(function (err) {
	console.log(error);
})
```

- Module name formats

```js
/*
	https://example/module/path/{module-name}.js
	http://example/module/path/{module-name}.js#?module={module-name}
	http://example/module/path/file.js?module={module-name}
	{path/to/module-name}
	{path/to/module-name.js}
	path/to/file.js#?module={module-name}
*/
```

## Link modules to global module list

@TODO documentation not ready

### module.cache

### module.resourceUrl

### module.meta

- module.meta.store	- a Store used for keeping links to dependencies
- module.meta.$requestQuery - String Query used for module request
- module.meta.module_path - Path where is store module's JavaScript File
- module.meta.path	- same as module.meta.module_path
- module.meta.name	- module_name
- module.meta.url	- Ex: `path + '/' + module_name + '.js'`
- module.meta.\_\_dirname	- where module is stored full path

### module.$request

Promise used to retrieve module object

### module.atime

Module last access time

### module.Application

### module.require

Same as `Application.require` except that it will import modules from neighbor folder named with module-name;

- Example for a module named "module-a"

```javascript
	module.require('render', function (err, render) {
		// `render` required from file "./module-a/render.js"
	})
```

## Retrieving multiple sub-modules

```javascript
	module.require('render', function (err, render) {
		// `render` required from file "./module-a/render.js"
	})
```
