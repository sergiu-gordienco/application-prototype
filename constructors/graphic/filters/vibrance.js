module.exports = function (imageData, value, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

	var data = destImageData.data;
    
    var amt, avg, max;
    max = Math.max(rgba.r, rgba.g, rgba.b);
    avg = (rgba.r + rgba.g + rgba.b) / 3;
    amt = ((Math.abs(max - avg) * 2 / 255) * value * -1);

	for (var i = 0; i < data.length; i += 4) {
        data[i]     = dA[i] !== max ? ( (max - dA[i]) * amt ) : dA[i];     // red
        data[i + 1] = dA[i+1] !== max ? ( (max - dA[i+1]) * amt ) : dA[i+1]; // green
        data[i + 2] = dA[i+2] !== max ? ( (max - dA[i+2]) * amt ) : dA[i+2]; // blue
        data[i + 3] = dA[i + 3];
    }

	return destImageData;
};
