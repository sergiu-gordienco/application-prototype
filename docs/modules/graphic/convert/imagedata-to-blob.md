# Graphics
## Convert module
### imagedata-to-blob

This function converts ImageData to blob and returns it in callback function

```js
	function (imageData, cb) { ... }

	cb = function (blob) { ... }
```

## Example

This function converts imageData to Blob object. It will always pass Blob object, even if imageData is malformed.
```js
	module.require([
		"convert :: convert",
	], function (convert) {
		convert.imageDataToBlob(imgData, function (blob) {
			//blob is a Blob object
		});
	});
```
