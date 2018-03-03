module.require([
	"saturation	:: saturation",
	"contrast	:: contrast",
	"brightness :: brightness",
	"gamma  :: gamma",
	"invert	:: invert",
	"clip   :: clip",
	"vibrance :: vibrance",
	"sepia  :: sepia",
	"blur	:: blur"
], function (lib) {
	lib.grayscale	= function (imageData, destImageData) {
		return lib.saturation(imageData, 0, destImageData);
	};
	module.exports	= lib;
});
