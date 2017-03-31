# Request
---

This module is a `XMLHttpRequest` wrapper

You can change default values by calling `configurator` function. To change more options simple call this function again with desired option.

```js
	app.url('/')
		.configurator(argument)
		.then(function (data) {
			//success callback
		}, function (err) {
			//error callback
		});
```

argument _(string)_ can take one of the following values:

```js
	[
		"ignore-status-code",
		"check-status-code",
		"prepare-post",
		"retrieve-binary-string",
		"retrieve-blob",
		"prepare-multipart",
		"POST",
		"binary",
		"blob",
		"multipart"
	]
```
# Methods


`app.config()` - returns current configuration

Return type : _(object)_

`app.request()` - returns current XMLHttpRequest instance object

`app.response(type, params)` - specifies in what format to get data

`type` can be one of the following:

```js
	[
		"blob",
		"json",
		"document",
		"text",
		"arraybuffer"
	]
```

`app.timeout(seconds)` - sets a timeout for httpRequest. (default 0)

`app.credentials()` - indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.

Return type : _(Boolean)_

`app.readyState()` - returns an _(Integer)_ indicating one of the request states. Can be one of the following:

```js
// Client has been created. open() not called yet.
app.READY_STATE_UNSENT = 0;
// open() has been called.
app.READY_STATE_OPENED = 1;
// send() has been called, and headers and status are available.
app.READY_STATE_HEADERS_RECEIVED = 2;
// Downloading; responseText holds partial data.
app.READY_STATE_LOADING = 3;
// Downloading is done
app.READY_STATE_DONE = 4;
```
On any `readyState` change, and event fill be fired and will contain changed `readyState` and `status`

To capture event:
```js
app.on("onReadyState", function (arr) {
	//arr is an array containing 2 values:
	//arr[0] = current readyState
	//arr[1] = current request state
});
```

`app.status()` or `app.statusText()` - returns httpRequest status code.

`app.async(bool)` - sets _(Boolean)_ to async field.

`app.method(string)` - sets appropriate request method. Default: `get`

`app.url(URI)` - sets url in config for request

`app.open(url)` ;
`app.open(method, url, async, timeout)` or `app.open()` - start XMLHttpRequest. This method can be called without any params becase it reads from configuration object. You may set appropriate configs with methods above and just call `app.open()` or `app.response(type)`

`app.send(data, type)` - this method sends data object or encoded string in request. For multipart data, `type` should be set to `asFormData`

`app.headers()` - wrapper for `getAllResponseHeaders` method.

`app.header(name, value)` - wrapper for `setRequestHeader` method. Adds header to request.

# Events

Here events are separated in 2 blocks: Download and Upload

## Download events
`progress` -  is fired to indicate that an operation is in progress. Aditional parameters: `[ event, percentComplete ]`. `event` is fired by XMLHttpRequest, `percentComplete` is an _(Integer)_ indicating current Download percentage. If `event` has not enough parameters to calculate percentage, it will return `event` object instead

`load` - is fired when a resource and its dependent resources have finished loading. It will pass `event` object.

`loadend` -  is fired when progress has stopped on the loading of a resource (e.g. after "error", "abort", or "load" have been dispatched). It will pass `event` object.

`error` - is fired when an error occurred. It will pass `event` object.

`abort` - is fired when the loading of a resource has been aborted. It will pass `event` object.

## Upload events
`upload-progress` - fired to indicate that an operation is in progress. It will pass `event` object. If possible, it will pass additional parameter that indicates completion percentage of upload.

`upload-load` - is fired when a resource and its dependent resources have finished loading. It will pass `event` object.

`upload-error` - is fired when an error occurred. It will pass `event` object.

`upload-abort` - is fired when the loading of a resource has been aborted. It will pass `event` object.

`upload-loadend` -  is fired when progress has stopped on the loading of a resource (e.g. after "error", "abort", or "load" have been dispatched). It will pass `event` object.

# Example
In this example we use default `get` request from url and return data as text. We haven't called `open()` method because `response` method starts request if it has not started yet.
```js
	app.url('some url')
	.response('text')
	.then(function (data) {
		//recieved data
	},
	function (err) {
		//error happend
	});
```

This example sends a `post` request with the encoded string in it's body. All variables from `send` method should be URLencoded.

```js
	app.url('some url')
	.method('POST')
	.configurator('prepare-post')
	.open()
	.send('hello%20world')
	.then(function (data) {
		//recieved data
	}), function (err) {
		//error happend
	};
```

This example describes how to use raw binary data from ArrayBuffer. First of all, you would use an array constructor to get 8 bit / 16 bit representation of your data (ex: Uint16Array, Uint8Array, Int8Array etc.). If you have a string, we need to convert every 8 / 16 bits to actual characters. We'll use this one liner here.
```js
	app.url('/somewhere/file.zip')
		.configurator('retrieve-binary-string') // or just "binary"
		.response('arraybuffer')
		.then(function (data) {
			//data = ArrayBuffer {}
			//suppose data is an ArrayBuffer containing this array [72, 69, 76, 76, 79] ("HELLO" string inside)
			var uint8array = new UInt8Array(data);
			// > Uint8Array(5) [72, 69, 76, 76, 79]
			var result = String.fromCharCode.apply(null, new Uint8Array(data));
			// > result = "HELLO"
		}, function (err) {
			//treat error
		});
```


or a simple example with blob for optimizing resource consumption for big files

```js
	app.url('/image.png')
		.configurator('retrieve-blob')
		.response('blob')
		.then(function (blob) {
			// internal image url for fast loading
			var imageUrl = URL.createObjectURL(blob)
		}, function (err) {
			//treat error
		});
```
