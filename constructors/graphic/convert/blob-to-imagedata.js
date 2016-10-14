module.exports	= function (blob, cb, maxWidth, maxHeight) {
	if (!maxWidth)	maxWidth	= false;
	if (!maxHeight)	maxHeight	= false;
	var image 	= new Image();
	var url		= window.URL.createObjectURL(blob);
	image.onload	= function () {
		var pInt	= function (i) {
			return ( parseInt(i, 10) || 0 );
		}
		var canvas	= document.createElement("canvas");
		var context	= canvas.getContext("2d");
		var cM		= maxWidth / maxHeight;
		var width	= image.width;
		var height	= image.height;
		if (maxHeight !== false && maxWidth !== false) {
			var cI		= width / height;
			if (width > maxWidth) {
				if (cI > cM) {
					width = maxWidth;
					height	= width / cI;
				} else {
					height	= maxHeight;
					width	= height * cI;
				}
			} else if (height > maxHeight) {
				if (cI < cM) {
					height = maxHeight;
					width	= height * cI;
				} else {
					width	= maxWidth;
					height	= width / cI;
				}
			}
		}
		image.width		= width;
		image.height	= height;
		canvas.width	= width;
		canvas.height	= height;
		setTimeout(function () {
			context.globalAlpha = 1;
			context.clearRect(0, 0, width, height);
			context.drawImage(image, 0, 0, width, height);
			var imgData = context.getImageData(0, 0, width, height);
			cb(undefined, imgData, pInt(image.width), pInt(image.height));
		}, 1);
	}
	image.onerror	= function (er) {
		cb(er);
	}
	image.src	= url;
};
