module.exports  = function(pixelData, threshold) {
	var points  = [];
	var x = 0;
	var y = 0;

	var left = undefined;
	var top = undefined;
	var right = undefined;
	var bottom = undefined;

	for(y=0;y<pixelData.height;y++){
		for(x=0;x<pixelData.width;x++){
			// get this pixel's data
			// currently, we're looking at the blue channel only.
			// Since this is a B/W photo, all color channels are the same.
			// ideally, we would make this work for all channels for color photos.
			index = (x + y * pixelData.width) * 4;
			pixel = pixelData.data[index+2];

			// Get the values of the surrounding pixels
			// Color data is stored [r,g,b,a][r,g,b,a]
			// in sequence.
			left = pixelData.data[index-4];
			right = pixelData.data[index+2];
			top = pixelData.data[index-(pixelData.width*4)];
			bottom = pixelData.data[index+(pixelData.width*4)];

			//Compare it all.
			// (Currently, just the left pixel)
			if(pixel>left+threshold){
				points.push([x,y]);
			}
			else if(pixel<left-threshold){
				points.push([x,y]);
			}
			else if(pixel>right+threshold){
				points.push([x,y]);
			}
			else if(pixel<right-threshold){
				points.push([x,y]);
			}
			else if(pixel>top+threshold){
				points.push([x,y]);
			}
			else if(pixel<top-threshold){
				points.push([x,y]);
			}
			else if(pixel>bottom+threshold){
				points.push([x,y]);
			}
			else if(pixel<bottom-threshold){
				points.push([x,y]);
			}
		}
	};
	return points;
};
