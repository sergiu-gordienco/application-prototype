module.require([
	"saturation	:: saturation",
	"contrast	:: contrast",
	"blur	:: blur"
], function (lib) {
	lib.grayscale	= function (imageData, destImageData) {
		return lib.saturation(imageData, 0, destImageData);
	};
	module.exports	= lib;
});
