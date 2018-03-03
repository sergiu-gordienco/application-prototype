module.exports = function (imageData, value, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

    var data = destImageData.data;
    
    value = value * 100;

	for (var i = 0; i < data.length; i += 4) {
        data[i]     = Math.pow(dA[i] / 255, value) * 255;     // red
        data[i + 1] = Math.pow(dA[i + 1] / 255, value) * 255; // green
        data[i + 2] = Math.pow(dA[i + 2] / 255, value) * 255; // blue
    }

	return destImageData;
};
