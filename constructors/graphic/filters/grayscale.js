module.exports = function (imageData, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

	var data = destImageData.data;
	var avg;
	for (i = 0; i < data.length; i += 4) {
		avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
        data[i + 3] = dA[i + 3];
    }

	return destImageData;
};
