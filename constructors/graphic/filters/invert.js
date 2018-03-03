module.exports = function (imageData, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

	var data = destImageData.data;

	for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - dA[i];     // red
        data[i + 1] = 255 - dA[i + 1]; // green
        data[i + 2] = 255 - dA[i + 2]; // blue
        data[i + 3] = dA[i + 3];
    }

	return destImageData;
};
