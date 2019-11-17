# Documentation of **extensions/prototype**

Links: [Index](../../../README.md)

## Contribution to documentation
if you find code interesting you may participate by updating documentation using pull request or mail messages to [sergiu.gordienco@gmail.com](mailto:sergiu.gordienco@gmail.com)


# Extensions
## prototype

This module will extend default object prototypes as explained below. In addition this module returns a object consisting of following:

```js
	{
		fn 		: Object,
		object 	: Object,
		string 	: Object,
		_ 		: function (a, b) { ... },
		__		: function (v) { ... }
	}
```

Bellow will be explanation for each.

### fn

`fn._`- represent [slDOM library](./sl-dom.md)

`fn.__`- represent slDOMSet library ( **Documentation in Progress** )

`fn.IframeAddContent( iframe, content )` - writes into an iframe content. returns an object with iframe `document` object and iframe `window`.

`fn.base64toBlob( b64Data[,contentType, sliceSize])` - converts and returns a blob from base64 string.

`fn.dataURItoBlobUrl( dataURI[,mimeString] )` - converts and returns a blob from dataURI string.

`fn.downloadFile( filename[,content,encoding,mimetype] )` - creates and start download after 2 seconds of a file/content from page.

`fn.getRandId( [,str] )` - appends `str` to the beginning of a random generated number and returns it. If `str` is true, it will generate a string in base36.

`fn.insertAtCursor( myField, myValue )` - inserts `myValue` string into a text area at current cursor position.

`fn.keyCapture( [,event],[key_map],[vars] )` - allows to create function handlers for keyboard shortcuts. `key_map` is an object of object pairs, where the key is the shortcut, and value is a function to be executed when the key is pressed. `vars` is an additional parameter that does not have any importance, it may be used for `keypress` handler functions.
Key code is generated following way:
`'k_' + ('ctrl'|'shift'|'alt'|'none') + '_' ... + another control key + '_' + keycode`
Example:
```js
	'k_ctrl_alt_80'
	'k_alt_shift_120'
	'k_ctrl_20'
	// and so on
```

`fn.mouse = Object`

`fn.mouse.position( [,eventMouseMove, windowOrDocumentObject] )` - returns current mouse position from client area and max possible x/y coordinates.

`fn.window = Object`

`fn.window.size( )` - returns current client area width and height.

`fn.window.sizeLimit` - it's and object. It allows you to set max/min window size.

`fn.window.sizeActive( )` - returns modified client area width and height.

### object

`object.encodeURL( obj [,prefix] )` - URL encode any JavaScript data type.

`object.extend( target, protParams )` - extents target prototype with the prototypes included in `protParams` object.
`protParams` example:
```js
	{
		key : 'someTitle',
		someFuncName : function () {
			// some function
		},
		otherFunc : function () {
			// some function
		}
		visible	: true | false,
		readonly: true | false,
		configurable	: false | true
	}
```

`object.merge( [ obj ], [ obj ], [ obj ], ... )` - returns an object that has all other objects merged inside it. Can take any number of arguments.

### string

`string` implements 6 encryption algorithms : `aes`, `base64`, `md5`, `sha1`, `sha256`, `tea`.
Each of those may have another functions inside that are straight implementation of algorithms.

### String Prototype

#### Subs Method:

```javascript
	String.prototype.subs	= function(string, offset, length) {}
```
> `"abcdefghi".subs(2)` is equal to `"ab"`
> `"abcdefghi".subs(2,3)` is equal to `"cde"`
> `"abcdefghi".subs(-2)` is equal to `"hi"`
> `"abcdefghi".subs(1,-2)` is equal to `"bcdefg"`
> `"abcdefghi".subs(-4,3)` is equal to `"fgh"`

#### Subs Method:

```javascript
	String.prototype.toHex = function(utf8String) { /*...*/ return hex_str; }
	String.prototype.fromHex = function(){ /*...*/ retrun utf8_str; }
	String.prototype.fromHtml = function () { /*...*/	return utf8_str}
```
> `"TEST".toHex()` is equal to `"54455354"`
> `"54455354".fromHex()` is equal to `"TEST"`
> `"54455354".fromHex()` is equal to `"TEST"`

> **UTF-8** vs Unicode
> Function `.toHex()` and `.fromHex` is working with **UTF-8** Strings
but javascript is working with **Unicode**
> `"€".toHex()` _(Unicode)_ 1 char in HEX is 2 chars `"20ac"`
> `"20ac".fromHex()` is " ¬"

> So correctly to encode UnicodeText to Hex is
> "€".utf8encode().toHex() and the result is `"e282ac"`
> and `"e282ac".fromHex().utf8decode()` is `"€"`

#### Escape HTML
```javascript
	String.prototype.toHtmlSimple	= function() { /*...*/ return str; },
	String.prototype.toHtml = function(){ /*...*/ return str;},
	String.prototype.cleanTags	= function() { /*...*/ return str; }
```

#### Check if word exists in a list of words separated by `" "`
```javascript
	// add class
	String.prototype.add_Class = function(x){},
	// remove class
	String.prototype.del_Class = function(x){},
	// check is calss exists
	String.prototype.fnd_Class = function(x){},
```

#### String letterCase change
```javascript
	String.prototype.swp_case = function(){ return str; }
	String.prototype.ucfirst = function(k){ return str; }
	String.prototype.lcfirst = function(k){ return str; }
```

#### Encoding Conversions
```javascript
	String.prototype.utf8need = function() { return bool_utf8 }
	String.prototype.utf8encode = function() { return utf8_str; }
	String.prototype.utf8decode = function(strUtf) { return unicode_str; }
	String.prototype.utf8	= String.prototype.utf8encode;
	String.prototype.unicode = String.prototype.utf8decode;

	String.prototype.escapeHex	= function() { /* ... */ return str; },
	// on execution: "#$%#$%^".escapeHex()
	// return "\x23\x24\x25\x23\x24\x25\x5E"

	String.prototype.escape		= function() { return escape(this); },
	String.prototype.encodeURI	= function() { return encodeURIComponent(this); },
	String.prototype.unescape	= function() { return unescape(this); },
	String.prototype.decodeURI	= function() { return decodeURIComponent(this); },

	String.prototype.toRegexp = function(flags){ return reg_exp_object; }
	// on execution: ".*".toRegexp("g")
	// returns: /.*/g
```

#### Parse URL links
```javascript
	String.prototype.parseUrlVars	= function(json,params) { retrun data_object; },
	String.prototype.parseUrl	= function(url) { return object; }
```

**Examples**

##### Parse URL
```javascript
	"http://www.example.com/test?nr=1&module=mvc#link-1".parseUrl()
```
**Returns**
```javascript
	{
		original	: "http://www.example.com/test?nr=1&module=mvc#link-1",
		origin	: "http://www.example.com",
		domain	: "www.example.com",
		domain_short	: "example.com",
		pathname: "/test",
		reqQuery	: "nr=1&module=mvc",
		protocol: "http",
		protocoll: "http://"
	};
```

##### Parse URL with GET vars
```javascript
	"http://www.example.com/test?nr=1&module=mvc&val[x]=5#link-1".parseUrl(true)
```
**Returns**
```javascript
	{
		get_vars	: {
			nr	: 1,
			module	: mvc,
			val : {
				x	: 5
			}
		},
		original	: "http://www.example.com/test?nr=1&module=mvc#link-1",
		origin	: "http://www.example.com",
		domain	: "www.example.com",
		domain_short	: "example.com",
		pathname: "/test",
		reqQuery	: "nr=1&module=mvc",
		protocol: "http",
		protocoll: "http://"
	};
```

##### Parse URL retrieve only GET vars
```javascript
	"http://www.example.com/test?nr=1&module=mvc&val[x]=5#link-1".parseUrl("get_vars")
```
**Returns**
```javascript
	{
		nr	: 1,
		module	: mvc,
		val : {
			x	: 5
		}
	}
```

##### Parse URL and retrieve only a property from parsed Object
```javascript
	"http://www.example.com/test?nr=1&module=mvc&val[x]=5#link-1".parseUrl("origin")
```
**Returns**
```javascript
	"http://www.example.com"
```
----
```javascript
	"http://www.example.com/test?nr=1&module=mvc&val[x]=5#link-1".parseUrl("reqQuery")
```
**Returns**
```javascript
	"nr=1&module=mvc"
```

#### Match a string using a reg expression described in a string
```javascript
	String.prototype.match_str	= function(regexp_str,regexp_flags) { /* ... */ }
```

#### Make a SHA1 Hash
```javascript
	String.prototype.sha1 : function(utf8){return Sha1.hash(this,( utf8 || typeof(utf8) == "undefined" ) ? true : false)},

	// "utf8" indicates that code firstly should be encoded to UTF-8 from UNICODE
	// default "utf8" argument is true
```
**Example:**
```javascript
	"password".sha1();
	// returns
	"5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"
```

#### Make a SHA2 Hash
```javascript
	String.prototype.sha256 : function(utf8){return Sha256.hash(this,( utf8 || typeof(utf8) == "undefined" ) ? true : false)},

	// "utf8" indicates that code firstly should be encoded to UTF-8 from UNICODE
	// default "utf8" argument is true
```
**Example:**
```javascript
	"password".sha256();
	// returns
	"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
```

#### Make a MD5 Hash
```javascript
	String.prototype.md5	: function() { /* ... */},
```
**Example:**
```javascript
	"password".md5();
	// returns
	"5f4dcc3b5aa765d61d8327deb882cf99"
```

#### For encoding JavaScript UNICODE code into Base64
```javascript
	String.prototype.base64encode	: function() { return btoa(this.utf8need()); },
```

#### For decoding JavaScript UNICODE code into Base64
```javascript
	String.prototype.base64decode	: function() { return atob(this).unicode(); },
```

#### For encoding JavaScript UTF8 and ASCII code into Base64
```javascript
	String.prototype.base64encodeClean	: function() { return btoa(this); },
```

#### For decoding JavaScript UTF8 and ASCII code into Base64
```javascript
	String.prototype.base64decodeClean	: function() { return atob(this); },
```

#### Encrypt a String using a passKey and TEA algorithm
```javascript
	String.prototype.encryptTea	: function(p) { /* ... */ },
```

#### Decrypt a String using a passKey and TEA algorithm
```javascript
	String.prototype.decryptTea	: function(p) { /* ... */ },
```

#### Encrypt a String using a passKey and passlength ( 128, 192, 256 ) in AES algorithm
```javascript
	String.prototype.encryptAes	: function(passKey, passlength) { /* ... */ },
```

#### Decrypt a String using a passKey and passlength ( 128, 192, 256 ) in AES algorithm
```javascript
	String.prototype.decryptAes	: function(passKey, passlength) { /* ... */ },
```

#### String Method buildQuery
```javascript
	String.prototype.buildQuery	: function() {
		var r	= /^\s*([a-z]+)\:\s*(\S[^\:]*?|)\s*(\s[a-z]+\:.*|)$/i
		var s = this, o = { "_keys" : [] }, m, k, f = s.split(/([a-z]+)\:/i);
		if( m = f[0].match(/^\s*(\S[\s\S]*?)\s*$/) ) {
			o["_keys"].push("_");
			o['_']	= m[1];
		};
		f = s.substring(f[0].length,s.length);
		while( m = f.match(r) ) {
			o[k = m[1].toLowerCase()]	= m[2];
			o["_keys"].push(k);
			f = f.split(m[0]).join(m[3]);
		};
		return o;
	},
```
**Example:**
```javascript
	"test:234 val:foo bar".buildQuery()
	// returns
	{
		"_keys" : ["test", "val"],
		"test"	: "234",
		"val"	: "foo bar"
	}
```
#### String Method buildSearchArray
```javascript
	String.prototype.buildSearchArray	: function() { /*...*/ return arr; }
```
**Example:**
```javascript
	"test 'foo bar'".buildSearchArray()
	// returns
	["test", "foo bar"]
```

#### String Method toArrayBufferFromUtf8, toStringUtf8
```js
	String.prototype.toArrayBufferFromUtf8 : function () { /*...*/ return arr;}
	String.prototype.toStringUtf8 : function () { /*...*/ return arr;}
```
Example:
```js
	'123456'.toArrayBufferFromUtf8()
	//returns
	[/* 12 bytes*/].toStringUtf8()
	//returns
	'123456'
```

***

### Blob prototype

#### Blob method toArrayBuffer

```js
	Blob.prototype.toArrayBuffer : function () { /*...*/ return arr;}
```
Example:
```js
	var a = new Array(10);
	a.fill(Math.random());
	var b = new Blob(a);
	b.toArrayBuffer();
	// returns an array that is equal to a
```

#### Blob method toURL

```js
	Blob.prototype.URL : function (options) { /*...*/ return url_str;}
```
Example:
```js
	var a = new Blob(["test"], { type: "text/css" });

	var url = a.toURL();
	var url_text_plain = a.toURL({ type: "text/plain" })
```

***
### Array prototype

#### Array method (inArray) - search an element in a array with a defined comparator
```javascript
	/*
		comparator posible values:
		1. '==='	- check if is strict equal
		2. '=='		- check if is equal
		3. a _function_ :
		function(searched_item,array_item) {
			return searched_item === array_item
		}
	*/
	Array.prototype.inArray	= function(a,comparator) { /*...*/ },
```

#### Split an Array by an a value of one octet
```javascript
	Array.prototype.split	= function (elem, num, cmp) { /*...*/ },
```

#### Split an Array by an a section value of one or more bytes
```javascript
	Array.prototype.splitSect	= function(elem, num) {
		return this.split(elem, (num || 0), "indexOfSect");
	},
```

#### Array to Blob » array of bytes to Blob
```javascript
	Array.prototype.toBlob = function (mimetype, sliceSize) {
		return _public.fn.base64toBlob(
			this.base64encode(),
			mimetype || this.type || "application/octet-binary",
			sliceSize
		);
	};
```
#### Array to base64 » array of bytes to base64 String
```javascript
	Array.prototype.base64encode = function () {
		return this.toBinaryString().base64encode();
	}
```

#### Array to binary » array of bytes to Binary String
```javascript
	Array.prototype.toBinaryString = function () {
		return this.toBytesBinary().join('');
	}
```

#### Array to binary array » array of bytes to array of binary string
```javascript
	Array.prototype.toBytesBinary = function () {
		return this.map(function (v) { return unescape('%' + ( v < 16 ? '0' : '' ) + v.toString(16)); });
	}
```

#### Array to array escaped » array of bytes to array of binary string escaped
```javascript
	Array.prototype.toBytesEscaped = function () {
		return this.map(function (v) { return '%' + ( v < 16 ? '0' : '' ) + v.toString(16); });
	}
```

#### Array to array of hex » array of bytes to array of hex strings
```javascript
	Array.prototype.bytesToHex = function() {
	return this.map(function (v) { return ( v < 16 ? '0' : '' ) + v.toString(16); });
}
```

#### Convert a Array to an parameter object
```javascript
	Array.prototype.toParamObj	= function() { /*...*/ },
```

#### Remove from Array undefined values
```javascript
	Array.prototype.resetArray	= function() {return this.filter(function(v) { return ( typeof(v) != "undefined" ); })},
```

#### Find IndexOf position of a set of elements in a Array
```javascript
	Array.prototype.indexOfSect	= function (searchElement, fromIndex) { /*...*/ }
```

#### Find min/max in an Array
```js
	Array.prototype.min = function () { /*...*/ return min};
	Array.prototype.max = function () { /*...*/ return max};
```
Example:
```js
	var a = [2,5,7,0,1,2];
	a.min(); // returns 0
	a.max(); // returns 7
```

#### Mix values in an array aka shuffle
```js
	Array.prototype.shuffle = function () { /*...*/ return arr};
```
Example:
```js
	var a = [1,2,3,4,5,6,7,8,9,0];
	a.shuffle() // returns [4, 2, 6, 1, 5, 8, 9, 3, 7, 0]
	a.shuffle() // returns [6, 4, 1, 8, 2, 3, 7, 9, 0, 5]
```

#### Get last index of a value in Array
```js
	Array.prototype.lastIndexOf = function (value) { /*...*/ return lastIndex};
```
Example:
```js
	var a = [1,2,3,4,5,6,7,3,9,0];
	a.lastIndexOf(3); // returns 7
```

#### Find first occurrence and return index or value
```js
	Array.prototype.find = function (function (value, index, arr) {
		return true | false;
	}) { /*...*/ return value};
	Array.prototype.findIndex = function (function (value, index, arr) {
		return true | false;
	}) { /*...*/ return index};
```
Example:
```js
	var a = [1,2,3,4,5,6,7,3,9,0];
	a.find(function (value, i, arr) {
		return value === 3 ? true : false;
	});
	// returns 3
	a.findIndex(function (value, i, arr) {
		return value === 3 ? true : false
	});
	// returns 2
```

#### Find unique values in Array
```js
	var a = [1,2,3,4,1,7,8,2,3];
	a.unique();
	// returns [1,2,3,4,7,8]
```

### Number prototype

```js
	Number.prototype.round	= function(k) {	if(k) return parseFloat(this.toFixed(k)); return Math.round(this);	},
```
```js
	Number.prototype.ceil	= function() {	return Math.ceil(this);	},
```
```js
	Number.prototype.floor	= function() {	return Math.floor(this);	}
```
***

### Function prototype
#### Function method toWorkerURL
```js
	Function.prototype.toWorkerURL : function () { /*...*/ return blob_url};
```
#### Function method toWorker
```js
	Function.prototype.toWorker : function () { /*...*/ return worker};
```

#### Function method runInWorker
```js
	Function.prototype.runInWorker : function () { /*...*/ return worker};
```

***

### Online / offline mode

This library can detect if page is being currently used, if device is offline, inactive, online etc. For this there are several events fired in window:
- device offline: `jsevt-offline`
- device online: `jsevt-online`
- every 500ms is fired visible state event: `jsevt-docview-visible` (currently only visible event is fired)
- on unload : `jsevt-unload`
- on load : `jsevt-load`

To check if user is active or not, call `jsEvtUserActive()`, which will return `true` / `false` depending on user status.
