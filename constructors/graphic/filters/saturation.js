module.exports = function (imageData, sv, destImageData) {
	//sv: saturation value. 0 = grayscale, 1 = original
	var dA = imageData.data; // raw pixel data in array

	if (!destImageData)
		destImageData	= new ImageData(new Uint8ClampedArray(dA.length), imageData.width, imageData.height);

	var data	= destImageData.data;


	var luR = 0.3086; // constant to determine luminance of red. Similarly, for green and blue
	var luG = 0.6094;
	var luB = 0.0820;

	var az = (1 - sv)*luR + sv;
	var bz = (1 - sv)*luG;
	var cz = (1 - sv)*luB;
	var dz = (1 - sv)*luR;
	var ez = (1 - sv)*luG + sv;
	var fz = (1 - sv)*luB;
	var gz = (1 - sv)*luR;
	var hz = (1 - sv)*luG;
	var iz = (1 - sv)*luB + sv;

	for(var i = 0; i < dA.length; i += 4)
	{
		var red = dA[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
		var green = dA[i + 1];
		var blue = dA[i + 2];

		var saturatedRed = (az*red + bz*green + cz*blue);
		var saturatedGreen = (dz*red + ez*green + fz*blue);
		var saturateddBlue = (gz*red + hz*green + iz*blue);

		data[i] = saturatedRed;
		data[i + 1] = saturatedGreen;
		data[i + 2] = saturateddBlue;
		data[i + 3] = dA[i + 3];
	}

	return destImageData;
}
