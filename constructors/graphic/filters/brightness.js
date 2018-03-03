module.exports = function (imageData, value, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

    var data = destImageData.data;
    
    value = Math.floor(255 * value);

	for (var i = 0; i < data.length; i += 4) {
        data[i]     = value + dA[i];     // red
        data[i + 1] = value + dA[i + 1]; // green
        data[i + 2] = value + dA[i + 2]; // blue
    }

	return destImageData;
};
