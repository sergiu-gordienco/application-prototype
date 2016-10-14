module.exports = function (imageData, cb) {
	var w = imageData.width;
	var h = imageData.height;
	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext("2d");
	ctx.putImageData(imageData, 0, 0);	// synchronous
	return canvas.toBlob(function (blob) {
		cb(blob);
	}, "image/png");	// implied image/png format
};
