# uri-load library

Links: [Index](../../README.md)

## Contribution
if you find code interesting you may participate by updating documentation using pull request or mail messages to [sergiu.gordienco@gmail.com](mailto:sergiu.gordienco@gmail.com)


Asynchronously load a script or stylesheet from a file or URI

Loading this module will expose 2 methods: `link` and `script`

```js
	link (url, callback [,options,documentElement]) { ... }
	script (url, callback [,options,documentElement]) { ... }
```
`options` is an _(Object)_ that contains a list of attributes to append to link/script node. Default values:
```js
	// for scripts
	options = {
		attr	: {
			"type"	: "text/javascript",
			"charset"	: "utf-8"
		}
	};
	// for links
	options = {
		attr	: {
			"rel"	: "stylesheet",
			"type"	: "text/css"
		}
	};
```

`documentElement` is HTML `document` element where the script/link will be appended to.
Default value : `window.document`

Basic usage example and module initialization:

```js
	AppPromise.then(function () {
		App.require([
			"uriLoad :: uri-load"
		], function (libs) {
			libs.uriLoad.link(module.resourceUrl("some-style-name.css"), function () {
				// if this function gets called then the link was loaded successfully
			});
			libs.uriLoad.script(module.resourceUrl("some-script-name.js"), function () {
				// if this function gets called then the link was loaded successfully
			});
			libs.uriLoad.link("http://example.com/style.css", function () {
				// if this function gets called then the link was loaded successfully
			});
		});
	});
```

## Notes
- `module.resourceUrl()` - represents module folder of current executing script
