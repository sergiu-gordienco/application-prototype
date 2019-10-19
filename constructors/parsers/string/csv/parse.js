/**
 * parse array from csv string
 * @param  {String} data CSV Content
 * @return {Array}       matrix of csv cells
 */
module.exports = function (data) {
	var i;
	var cell  = [0, 0];
	var cells = [[]];
	var state = "cell:init";
	for (i=0;i<data.length;i++) {
		switch (state) {
			case "cell:init":
				cells[cell[0]] = cells[cell[0]] || [];
				cells[cell[0]][cell[1]] = "";
				if (data[i] === "\"") {
					state = "cell:data-escaped";
				} else if (data[i] === ",") {
					cell[1]++;
					state = "cell:init";
				} else if (data[i] === "\n") {
					cell[0]++;
					cell[1] = 0;
					state = "cell:init";
				} else {
					cells[cell[0]][cell[1]] += data[i];
					state = "cell:data";
				}
			break;
			case "cell:data":
				if (data[i] === ",") {
					cell[1]++;
					state = "cell:init";
				} else if (data[i] === "\n") {
					cell[0]++;
					cell[1] = 0;
					state = "cell:init";
				} else {
					cells[cell[0]][cell[1]] += data[i];
				}
			break;
			case "cell:data-escaped":
				if (data[i] === "\"") {
					state = "cell:data-escaped:quote"
				} else {
					cells[cell[0]][cell[1]] += data[i];
				}
			break;
			case "cell:data-escaped:quote":
				if (data[i] = ",") {
					cell[1]++;
					state = "cell:init";
				} else if (data[i] === "\n") {
					cell[0]++;
					cell[1] = 0;
					state = "cell:init";
				} else if (data[i] === "\"") {
					cells[cell[0]][cell[1]] += data[i];
					state = "cell:data-escaped";
				} else {
					cells[cell[0]][cell[1]] += data[i];
					state = "cell:data-escaped";
					console.warn("Incorrect CSV Escape of ", data[i], "by", data[i-1]);
				}
			break;
		}
		if (i === data.length - 1) {
			if (state === "cell:init") {
				cells[cell[0]] = cells[cell[0]] || [];
				cells[cell[0]][cell[1]] = "";
			}
		}
	}
	
	if (cells.length > 1) {
		if (cells[cells.length-1].filter(function (v) { return !!v; }).length === 0) {
			cells.pop();
		}
	}
	return cells;

};
