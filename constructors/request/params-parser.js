/**
 * @function ParamsParser
 * @memberof RequestModule
 * @param {string} value
 * @param {string} pattern
 * @param {object} [opts]
 * @param {object} [opts.cache] object where reg expressions will be cached
 * @param {function} [opts.mapper] function that will decode value, default is decodeURIComponent
 * @param {string} [opts.boud="\x02\x00\x00\x03"] function that will decode value, default is decodeURIComponent
 * @param {object} [opts.ret] object to be updated with found params
 * @param {string[]} [opts.tableIndex] list of parameters' names ( @experimental )
 * @param {string} [opts.pRegExp="\\:([a-z][a-z0-9]+)"] RegExp params' chars
 * @param {string} [opts.matchGroup="([^\\/]+)"] RegExp value
 * @param {string} [opts.fixedEnd=true] RegExp value
 * @returns {Object<string,string>}
 */

var paramsParse	= function (v, s, opts) {
	opts	= (opts || {});
	var cache = (opts.cache || null);
	var r	= (opts.ret || {});
	var mapper	= opts.mapper || function decodeURLReference(v) {
		var err, val = v;
		try {
			val = decodeURIComponent((v || '') + '');
		} catch (err) {
			val = unescape((v || '') + '');
		}
		return val;
	};
	var tableIndex, matchRule, cacheKey = s;
	if (cache && (cacheKey in cache)) {
		tableIndex = cache[cacheKey].tableIndex;
		matchRule = cache[cacheKey].matchRule;
	} else {
		var boud	= (opts.boud || '\x02\x00\x00\x03');
		tableIndex	= (opts.tableIndex || []);
		var pRegExp	= new RegExp(opts.pRegExp || "\\:([a-z][a-z0-9]+)", "gi");
		var fixedEnd = ( opts.fixedEnd === false ? false : true );
		var pCleaner	= function (idx, parts) {
			idx.push(parts[1]);
			return true;
		};
		var matchGroup	= opts.matchGroup || '([^\/]+)';
		if (typeof(opts.pCleaner) === "function") {
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
		matchRule = new RegExp(
			s.split(matchGroup).map(function (v) {
				return v.replace(rboud, matchGroup).toHex().replace(/(.{2})/g,'\\x$1');
			}).join(matchGroup) + ( fixedEnd ? "$" : ""),
			""
		);

		if (cache) {
			cache[cacheKey] = {
				matchRule: matchRule,
				tableIndex: tableIndex
			};
		}
	}
	var matches = v.match(matchRule);
	if (!matches) return null;
	tableIndex.forEach(function (v, k) {
		r[v]	= mapper(matches[k+1]);
	});
	return r;
};


module.exports  = paramsParse;

paramsParse.test    = function () {
	var testString	= "/login/:service/:action/test%20";

	console.log(paramsParse("/api/test%20value/", "/api/:name/"));
	console.log(paramsParse("/login/google/login/test",testString));
};
