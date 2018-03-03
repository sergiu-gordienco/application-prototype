module.exports = function (imageData, value, destImageData) {
	var dA = imageData.data, dALength = dA.length, i;

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

    var data = destImageData.data;
    
    value = Math.abs(value) * 255;

	for (var i = 0; i < data.length; i += 4) {
        data[i]     = ( dA[i] > 255 - value ) ? 255 : 0;     // red
        data[i + 1] = ( dA[i+1] > 255 - value ) ? 255 : 0 // green
        data[i + 2] = ( dA[i+2] > 255 - value ) ? 255 : 0; // blue
        data[i + 3] = dA[i + 3];
    }

	return destImageData;
};
