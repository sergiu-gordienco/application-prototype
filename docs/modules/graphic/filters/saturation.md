# Graphics
## Filters modules
### saturation

This function modifies saturation of an `Image`. Function takes 3 parameters: original `imageData`, saturation value,  `destinationImageData` _(Optional)_. Satration value can take any values between 0 and 1. Using `destinationImageData` can help you speed up a litle bit image processing time. If function succedes, it will return modified `imageData`.

```js
	var modifiedImgData = saturation(imageData, 0.45, destImageData) { ... };
```

## Example

```js
	module.require([
		'saturation :: saturation'
	], function (lib) {
		var modifiedImgData = lib.saturation(someImageData, 0.8, destinationImageData);
		// if destinationImageData was passed, destinationImageData === modifiedImgData
		var anotherModifiedImgData = lib.saturation(anotherImageData, 0.3);
	});
```
