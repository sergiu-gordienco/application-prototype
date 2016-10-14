module.exports	= function (imageData) {
	return new ImageData(imageData.data, imageData.width, imageData.height);
};
