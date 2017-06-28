# Graphics
## Edge detection

This function finds all edges within a photo. (Currently working fine only for black and white photos). Function takes 2 parameters: `imageData`, threshold (or search radius). Function will return an array of point arrays in this format:
```js
	[
		[
			x : ... ,
			y : ...
		],
		[
			x : ... ,
			y : ...
		],
		...
	]
```

## Example

```js
	module.require([
		`edgeDetection :: edge-detection`
	], function (lib) {
		var points = lib.edgeDetection(someImageData, threshold)
		//points is an array of edges from photo
	});
```
