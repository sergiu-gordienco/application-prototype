# Js-Template

Links: [Index](../../README.md)

This is a JavaScript template rendering module that provides dynamic DOM manipulation capabilities. Let me break down its structure and functionality:

## Module Overview

This is a templating system that:
- Parses HTML elements for special attributes and template syntax
- Creates reactive bindings between JavaScript data and DOM elements
- Handles events, attributes, and structural directives
- Supports async operations and performance optimization

## Core Components

### 1. **Template Parsing**

**`parseTextNodes()`** - Handles text interpolation with `{{ }}` syntax:
**Example:**

```html
	<span>Hello {{ name }}</span>
```

```javascript
parseTextNodes(element, callback, config);
```

### 1.2. **Template Parsing Big structures**

**Example:**

```html
	<script type="text/js-template">
		3 + 9
	</script>
```

```html
	will render "12"
```

### 1.3. **Template Parsing Big structures**

**Example:**

```html
	<script type="text/js-template">
		[
			document.createElement('img')
		]
	</script>
```

```html
	<img />
```

### 1.4. **Template Parsing Big structures**

**Example:**

```html
	<script type="text/js-template">
		(() => {
			return document.createElement('button')
		})()
	</script>
```

```html
	<button></button>
```


**`attrParser()`** - Processes special attributes:
- `ev-*` or `(*)` - Event handlers
- `[*]` - Attribute bindings  
- `[(model)]` - Two-way data binding
- `*if`, `*for`, `*class` - Structural directives
- `js-*` - JavaScript attributes

### 2. **Directive Types**

**Events:**
```html
<button ev-click="handleClick()">Click</button>
<button (click)="handleClick()">Click</button>
```

**Attribute Bindings:**
```html
<div [class]="isActive ? 'active' : ''"></div>
<input js-value="dynamicValue">
```

**Structural Directives:**
```html
<div *if="shouldShow">Conditional content</div>
<div *for="item in items">{{ item.name }}</div>
<div *class="{ active: isActive, disabled: isDisabled }"></div>
```

**Two-way Binding:**
```html
<input [(model)]="username">
```

### 3. **Rendering Engine**

**`nodeParser()`** - Main rendering function:
- Walks DOM tree
- Collects all template directives
- Sets up reactive updates
- Manages render scheduling with FPS control

### 4. **Performance Features**

- **Debounced rendering** - Configurable FPS (default: 15)
- **Node recycling** - For `*for` directives
- **Change detection** - Only updates changed nodes
- **Async support** - Handles Promises in expressions

## Key Configuration

```javascript
{
  RENDER_FPS: 15,          // Maximum render frames per second
  REMOVE_EMPTY_NODES: true // Clean up empty template nodes
}
```

## Usage Example

```javascript
Application.require('js-template').then(function (jsTemplate) {
  jsTemplate.parseContent(
    document.body,
    function (err, config) { 
      console.log('Template parsed', config) 
    },
    { 
      context: myComponent, 
      args: { items: dataArray }
    }
  );
});
```

## Extension Methods

The module extends DOM elements with helper methods:
```javascript
element.renderJs(context, args, callback);
element.renderJsTemplate(context, args, callback); 
element.renderJsArgs(context, args, callback);
```

## Potential Issues & Debugging

1. **Expression Errors** - Malformed JavaScript in templates
2. **Memory Leaks** - Event listeners in `*for` loops
3. **Performance** - Too many reactive updates
4. **Async Timing** - Promise resolution timing issues

## Common Debugging Scenarios

```javascript
// Enable debug mode
const DEBUG_MODE = 1;

// Check for render loops
element.__renderContent.redraw(function() {
  console.log('Render completed');
});
```

This module essentially provides Angular-like templating capabilities in vanilla JavaScript, with reactive data binding, structural directives, and event handling.

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

