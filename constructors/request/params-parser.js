var paramsParse	= function (v, s, opts) {
	opts	= (opts || {});
	var r	= (opts.ret || {});
	var boud	= (opts.boud || '\x02\x00\x00\x03');
	var tableIndex	= (opts.tableIndex || []);
	var pRegExp	= ( opts.pRegExp || /\:([a-z][a-z0-9]+)/g );
	var pCleaner	= function (idx, parts) {
		idx.push(parts[1]);
		return true;
	};
	var matchGroup	= opts.matchGroup || '(.*?)';
	if (typeof(pCleaner) === "function") {
		pCleaner	= opts.pCleaner;
	};
	s = s.replace(new RegExp(matchGroup.toHex().replace(/(.{2})/g,'\\x$1'), "g"), boud);
	s = s.replace(pRegExp, function () {
		var p	= pCleaner(tableIndex, arguments);
		if (p === true) {
			return matchGroup;
		} else if (typeof(p) === "string") {
			return p;
		} else {
			return arguments[0];
		}
	});
	var rboud	= new RegExp(boud.toHex().replace(/(.{2})/g,'\\x$1'), "g")
	var matches = v.match(new RegExp(s.split(matchGroup).map(function (v) {
		return v.replace(rboud, matchGroup).toHex().replace(/(.{2})/g,'\\x$1');
	}).join(matchGroup), ""));
	if (!matches) return null;
	if (!r) var r = {};
	tableIndex.forEach(function (v, k) {
		r[v]	= matches[k+1];
	});
	return r;
};

module.exports  = paramsParse;

paramsParse.test    = function () {
	var testString	= "/login/:service/:action/test";

	console.log(params("/login/google/login/test",testString));
}
