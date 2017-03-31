# Graphics
## Filters modules
preload modules and return them in a array


returns an object with following methods
```js
	var lib = {
		"saturation"	: function () {
			// function from require("graphic/filters/saturation")
			// see documentation from /graphic/filters/saturation.md
		},
		"contrast"	: function () {
			// function from require("graphic/filters/contrast")
			// see documentation from /graphic/filters/contrast.md
		},
		"blur"	: function () {
			// function from require("graphic/filters/blur")
			// see documentation from /graphic/filters/blur.md
		},
		"grayscale"	: function (imageData, destImageData) {
			return lib.saturation(imageData, 0, destImageData);
		}
	}
```

Links:

[graphic/filters/saturation](filters/saturation.md)

[graphic/filters/contrast](filters/contrast.md)

[graphic/filters/blur](filters/blur.md)
