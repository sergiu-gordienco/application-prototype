module.exports = function ( imageData, offset, alpha, repeats ) {
	// TODO refactor
	if (offset === 0) return imageData;
	if (!repeats) repeats = 1;
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var i, repeat;
	canvas.width	= imageData.width;
	canvas.height	= imageData.height;
	ctx.globalAlpha = alpha || 0.3;
	ctx.putImageData(imageData, 0, 0);
	offset = offset || 3;
	
	for (repeat=0; repeat<repeats;repeat++) {
		for (i=1; i<=8;i++) {
			ctx.drawImage(canvas, offset, 0, canvas.width-offset, canvas.height, 0, 0,canvas.width-offset, canvas.height);
			ctx.drawImage(canvas, 0, offset, canvas.width, canvas.height-offset, 0, 0,canvas.width, canvas.height-offset);
		}
	}
	ctx.globalAlpha = 1;
	return ctx.getImageData(0, 0, imageData.width, imageData.height);
}
