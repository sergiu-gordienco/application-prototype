# Extensions prototype

This part describes a DOM manipulator library (a much faster kind of JQuery) that operates with slDOM.

When you initialize `extensions/prototype`, new functions will be available in window object.

`_( [a],[function (slDOM, a, newE) { // your code }] )` - main entry point. `a` parameter is a node to select, b is callback function (in case you need to do it sync). Any further operations will be depending of `a` node.

Example:
All other examples bellow will use `slDOM` variable as entry point
```js
	var slDOM = _(document.querySelector('myDiv'));
	// returns slDOM object
```

#### Select another node
`slDOM.E = slDOM.setE( node )` - creates new HTML element and selects it.
`slDOM._ = slDOM.getE( [opt] )` - returns currently selected node
```js
	opt = [
		undefined // return currently selected node
 		'.tag' // return nodes tag name
		'.html' // return innerHTML
		'.text' // return innerText or textContent
	]
```
`slDOM.c = slDOM.sClass( className, op, [timeout] )` - adds a class to currently selected node. `op` can take following:
```js
	op = [
		'+' // adds class to node
		'-' // deletes class form node
		`~` // toogle class
		`@` // put class for a period of time (if using this, you should pass timeout parameter)
		`?` // returns true/false if class exist in this node
	]
```
Example:
```js
	var a = _(document.createElement('div'));
	a.sClass('myClass', '+');  // added class to node
	a.sClass('myClass', '?');  // returns true (class exists)
	a.sClass('myClass', '-');  // deleted class from node
	a.sClass('myClass', '~');  // toogle class
	a.sClass('myClass', '@', 10000); // added class for 10 seconds (it will remove itself after)
```
`slDOM.A = slDOM.attr( [prefix] )` - returns an object with key-value pairs from node attributes. will match all attributes beginning with `prefix` value, return all if `prefix` is undefined.
Example:
```js
	var a = <div tt-name="name" tt-surname="surname" tt-year="2017" other="other"></div>
	var b = _(a);
	b.attr(); // returns {'tt-name' : 'name', 'tt-surname' : 'surname', 'tt-year' : '2017', 'other' : 'other'}
	b.attr('tt'); // returns ('tt-name' : 'name', 'tt-surname' : 'surname', 'tt-year' : '2017')
```

`slDOM.Et = slDOM.adEto( parent )` - appends currently selected node to `parent` node.
Example:
```js
	var parent = document.createElement('div');
	var a = document.createElement('p');
	var b = _(a);
	b.adEto(parent);
	// resulted html will be:
	// <div>  <-- parent
	// 		<p></p>  <-- a
	// </div>
```
