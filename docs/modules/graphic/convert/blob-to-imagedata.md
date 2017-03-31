# Graphics
## Convert module
### blob-to-imagedata

This function converts a blob to ImageData and returns it in callback function. You can set image maxWidth and maxHeight.
```js
	`blob-to-imagedata` = function (blob, callback, maxWidth, maxHeight) { ... }

	callback = function (err, imgData, imgWidth, imgHeight) { ... }
```
If function succeeds, `err` is `undefined`, `imgData` is a `base64 string` with image data and imgWidth, imgHeight indicate resulted image Width and Height.

## Example

This example converts a blob to a Image of 200 x 200 px size.
```js
	module.require([
		"convert :: convert",
	], function (convert) {
		convert.blobToImagedata(blob, function (err, imgData, imgWidth, imgHeight) {
			if (err) {
				//cannot convert blob to image
			} else {
				//imgData is a base64 string that is image itself
			}
		}, 200, 200);
	});

```
