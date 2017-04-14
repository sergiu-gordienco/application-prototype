# Custom-Elements

#### This module is a wrapper for `MutationObserver` API. It allows you to create custom HTML elements and continuously observe it's changes in a simple way using callback functions for each type of change.

Works best with `MVC` pattern

#### Flow
Each new tag should have a module, that will export itself when `lazyLoadModules` will be called.
- Insert into HTML new tags
- For each tag load corresponding module.
- Each of these modules will load `custom-elements` module and will pass callback functions.

When required, this module will export an `Object` with 2 methods:
```js
	{
		registerMethods : function ( nodeName, prototypeMethods ) { ... }
		lazyLoadModules : function ( list ) { ... }
	}
```
`registerMethods` - will register callback functions for events.
`lazyLoadModules` - will load modules for each new HTML tag

Possible event handlers:
```js
	{
		'__onInit' : function () { ... },
		'__onContentChange' : function () { ... },
		'__onRemove' : function () { ... },
		'__onAttrChange' : function () { ... }
	}
```

Example:
A full example is located in examples folder. [Examples](docs/examples)

Add new custom element in HTML
```HTML
	...
	<body>
		<mycustomelement>

		</mycustomelement>
	</body>
	...
```

Below in a script load corresponding module for new tag:
```js
	window.App = new ApplicationBuilder(); // initialize bare bone application prototype
	App.modulePath('../../../constructors'); // register correct modules folder
	App.require([
		'customElements :: custom-elements',  // customElements is used as an alias (useful for long named modules)
	]).then(function (customElements) {
		customElements.lazyLoadModules({
			mycustomelement : 'elements/custom'  // registering a module located in elements folder (see example)
		});
	});
```

In module named `custom.js` is following code:

```js
App.require('custom-elements', function (customElements) {
	customElements.registerMethods('mycustomelement', { // first parameter should be the same as HTML tag name.
		__onInit : function () {
			// this function is called once at module initialization.
		},
		__onContentChange : function () {
			// is called when nodes or content inside are changed
		},
		__onAttrChange : function () {
			// is called when an attribute is changed
		},
		__onRemove : function () {
			// is called when element is removed from DOM
		}
	});
	module.exports = {}; // nothing to export. But export is needed to signal end of module loading.
});
```
