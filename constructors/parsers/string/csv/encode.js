module.exports =
/**
 * encode a Array matrix into a CSV encoded string with separators " and
 * @function
 * @param  {Array}  data array matrix that represents csv cells
 * @return {string}      csv content
 */
function (data, encodeValue) {
	if (!encodeValue) encodeValue = function (v) {
		if (v instanceof Date) {
			var s = function (i) {
				if (i < 10) return "0" + i;
				return i;
			};
			v = s(v.getMonth() + 1)  + "/" + s(v.getDate()) + "/" + v.getFullYear();
		}
		return v;
	};
	return data.map(function (row) {
		return row.map(function (v) {
			if (encodeValue) v = encodeValue(v);
			v = (v + "").replace(/\"/g, '""');
			if (
				v.indexOf("\"") !== -1 ||
				v.indexOf("\n") !== -1 ||
				v.indexOf(",") !== -1
			) return "\"" + v + "\"";
			return v;
		});
	}).join("\n");
};
