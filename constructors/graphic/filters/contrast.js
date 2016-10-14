module.exports = function (imageData, value, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

	var data = destImageData.data;

	value = (parseFloat(value) || 0) + 1;

	for (i = 0; i < dALength; i += 4) {
		data[i] = ((((dA[i] / 255) - 0.5) * value) + 0.5) * 255;
		data[i + 1] = ((((dA[i + 1] / 255) - 0.5) * value) + 0.5) * 255;
		data[i + 2] = ((((dA[i + 2] / 255) - 0.5) * value) + 0.5) * 255;
		data[i + 3]	= dA[i + 3];
	}

	return destImageData;
};
