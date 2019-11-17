# Js-Template

Links: [Index](../../README.md)

This module lets you use a variable for any HTML code. It can observe variable changes and can update information in page on the fly.

It implements 2 methods: rendering for node attributes and rendering for content
```js
	{
		parseContent : function ( HTMLnode, [callback], [config] ) { ... },
		parseAttributes : function ( HTMLnode, [callback], [config] ) { ... }
	}
```
`parseContent` - function that renders content in HTML node. `config` is an object that represents data to be shown in node based on HTML node template.

`parseAttributes` - function that renders node arguments based on HTML template provided.

Also, all HTML elements will get 3 methods (they use internally functions above):
```js
	{
		renderJsTemplate : function ([context], [args], [cb]) { ... }
		renderJsArgs : function ([context], [args], [cb]) { ... }
		renderJs : function ([context], [args], [cb]) { ... }
	}
```
`renderJsTemplate` - renders `args` in `context` (HTML element) inner HTML based on template from HTML code.

`renderJsArgs` - renders attributes from `args` in `context` (HTML element) based on template from HTML.

`renderJs` - calls both `renderJsArgs` and `renderJsTemplate`.

Example:
More usage examples may be found in examples folder: [Examples](docs/examples)
```html
	<div id="mydiv">
		Hello {{ data.name }}
	</div>
```
Code inside `{{` and `}}` is a template. It will be parsed and changed when `renerJs` is called.
The code bellow renders object data into html template.
NOTE: Oject names from html template and function call must coincide, otherwise it wont work.
```js
	...
	document.selectElementById('mydiv').renderJs(null, {
		data : {
			name : 'test'
		}
	}, function (err) {
		if (!err) console.log('rendered!');
	});
```
NOTE: first parameter is `null` because, from inside function `renderJs`, context of HTML element is `this` operator. Otherwise, another node may be passed in.
The resulted string would be `Hello test`. And because no errors were detected, `rendered!` will be printed in console.
In combination with `custom-elements` from this library, you can track node changes and render content instantly.

