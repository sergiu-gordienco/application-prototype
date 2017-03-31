# Graphics
## Filters modules
### blur

This method blurs an image with given offset and alpha parameters.

```js
	var blurredImgData = function ( imageData, offset, destImageData, alpha ) { ... }
```
This functions takes 4 arguments (3rd one is unused, pass `undefined` (this function requires rework)). The logic of this function is that it draws on top of imageData another imageData with offset passed in function. `globalAlpha` is set by default to 0.3, but you may pas any other value in parameter `alpha`. Th
is function returns already `blurredImgData`.

## Example

```js
	module.require([
		"blur	:: blur"
	], function (blur) {
		var blurredImgData = blur(someImageData, 1, undefined, 0.4);
		//blurredImgData contains blurred image
	});

```
