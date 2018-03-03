module.exports = function (imageData, value, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

    if (value == null) {
        value = 1;
    }

	var data = destImageData.data;

	for (var i = 0; i < data.length; i += 4) {
        // red
        data[i] = Math.min(255, (dA[i] * (1 - (0.61 * value))) + (dA[i+1] * (0.77 * value)) + (dA[i+2] * (0.19 * value)));
        // green
        data[i+1] = Math.min(255, (dA[i] * (0.35 * value)) + (dA[i+1] * (1 - (0.31 * value))) + (dA[i+2] * (0.17 * value)));
        // blue
        data[i+2] = Math.min(255, (dA[i] * (0.27 * value)) + (dA[i+1] * (0.53 * value)) + (dA[i+2] * (1 - (0.87 * value))));
        data[i + 3] = dA[i + 3];
    }
    
	return destImageData;
};
