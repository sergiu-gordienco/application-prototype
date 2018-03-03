module.exports = function ( imageData, offset, alpha ) {
	// TODO refactor
	if (offset === 0) return imageData;
	var canvas = document.createElement('canvas');
	canvas.width	= imageData.width;
	canvas.height	= imageData.height;
	var ctx = canvas.getContext('2d');
	ctx.globalAlpha = alpha || 0.3;
	ctx.putImageData(imageData, 0, 0);
	offset = offset || 3;
	for (var i=1; i<=8;i++) {
		ctx.drawImage(canvas, offset, 0, canvas.width-offset, canvas.height, 0, 0,canvas.width-offset, canvas.height);
		ctx.drawImage(canvas, 0, offset, canvas.width, canvas.height-offset, 0, 0,canvas.width, canvas.height-offset);
	}
	ctx.globalAlpha = 1;
	return ctx.getImageData(0, 0, imageData.width, imageData.height);
}
