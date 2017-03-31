# Graphics
## Filters modules
### contrast

This function modifies contrast of a Image based of a value passed as parameter. As 3rd parameter, you may also pass an already created `imageData` object. This saves time and resources as it does not create another copy of `imageData`, but uses `destImageData.data` field to save modified image. Function returns modified image. If `destImageData` was passed, it will contain modified image.

```js
	var modifiedImgData = function (imageData, value, destImageData) { ... }
```

## Example

```js
	module.require([
		"contrast	:: contrast"
	], function (contrast) {
		var modifiedImgData = contrast(someImageData, 0.4, destinationImageData);
		// if destinationImageData was passed, destinationImageData = modifiedImgData
		var anotherModifiedImgData = contrast(anotherImageData, 0.4);
	});
```
