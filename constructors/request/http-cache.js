var XMLHttpRequestInterceptor = null;
var databaseStragedy = null;
var HTTPCache = function (interceptor, tableName) {
	var app = new ApplicationPrototype();
	var cacheFiles = {};
	var methods = [
		"post",
		"get",
		"head",
		"put",
		"trace",
		"delete",
		"options",
		"connect",

		"checkout",
		"copy",
		"lock",
		"merge",
		"mkactivity",
		"mkcol",
		"move",
		"m-search",
		"notify",
		"patch",
		"propfind",
		"proppatch",
		"purge",
		"report",
		"search",
		"subscribe",
		"unlock",
		"unsubscribe"
	];

	var cache = {};
	methods.forEach(function (method) {
		cache[method] = [];
	});

	var database = new databaseStragedy({
		dbName : "httpCache",
		table  : "files"
	});

	app.bind("urlMatch", function (url, pattern, callback) {
		if (
			typeof(pattern) === "string"
		) {
			return callback(undefined, !!(url.replace(/\?.*$/, '').match((
				"^" + pattern.toHex()
					.replace(/(.{2})/g, '\\x$1')
					.replace(/\\x2a\\x2a/g, '.*')
					.replace(/\\x2a/g, '.')
			).toRegexp())));
		} else if (pattern instanceof RegExp) {
			callback(undefined, !!pattern.match(url));
		} else if (typeof(pattern) === "function") {
			pattern(url).then(function (status) {
				callback(undefined, status);
			}, function (err) {
				callback(err);
			});
		} else {
			callback(Error("incorrect url pattern"));
		}
	});

	app.bind("add", function (method, pattern) {
		var _method = method.toLowerCase() || "ALL";
		if (!pattern) {
			return cache[_method] || null;
		}
		if (_method === "ALL") {
			for (method in cache) {
				cache[method].push(pattern);
			}
		}

		cache[_method] = cache[_method] || [];

		cache[_method].push(pattern);

		return app;
	});

	app.bind("interceptor", function () {
		return interceptor || XMLHttpRequestInterceptor;
	});

	app.bind("findUrl", function (url) {
		if (url in cacheFiles) return Application.Promise.resolve(cacheFiles[url]);

		return Application.Promise(function (resolve, reject) {
			database.initialization.then(function () {
				database.getItem(url).then(function (ev) {
					var content = ((((ev || {}).target || {}).result || {}).v || null);
					if (typeof(content) !== "string") {
						reject(Error("Incorrect file content"));
					} else {
						cacheFiles[url] = URL.createObjectURL(
							new Blob([content], { type: "text/plain" })
						);
						resolve(cacheFiles[url]);
					}
				}, function (err) {
					reject(err);
				});
			}, reject);
		});
	});

	app.on("intercept:http:matched", function (xhrProxy, method, url, pattern) {
		app.findUrl(url).then(function (newUrl) {
			xhrProxy.transform({ url: newUrl });
			xhrProxy.replay(true);
		}, function (err) {
			app.emit("error:url-find", [err]);
			xhrProxy.addEventListener("load", function () {
				if (xhrProxy.responseText) {
					database.initialization.then(function () {
						database.setItem(url, xhrProxy.responseText).then(function (content) {
							app.emit("database:cache:url", [url, xhrProxy.responseText]);
						}, function (err) {
							app.emit("error:cache-content", [err]);
						})
					});
				}
			});
			xhrProxy.replay(false);
		});
	});

	app.on("intercept:http", function (xhrProxy, method, url) {
		var i = 0;
		var _next = function () {
			if (i < cache[method].length) {
				app.urlMatch(
					url,
					cache[method][i++],
					function (err, status) {
						if (err) {
							app.emit("error", [err]);
							_next();
						} else {
							if (status) {
								app.emit("intercept:http:matched", [
									xhrProxy, method, url, cache[method][i-1]
								]);
							} else {
								_next();
							}
						}
					}
				);
			} else {
				xhrProxy.replay(false);
			}
		};

		_next();
	});

	app.interceptor().on("http:send", function (xhr, data) {
		if (xhr._method in cache) {
			xhr.interupt = true;
			app.emit("intercept:http", [xhr, xhr._method, xhr.requestURL]);
			return false;
		}
	});

	if (!app.interceptor().isActive()) {
		app.interceptor().start();
	}

	return app;
};

Application.require("extensions/prototype", function () {
	Application.require("browser-session/strategy/indexed-db", function () {
		databaseStragedy = arguments[0];

		Application.require("request/http-interceptor").then(function (_XMLHttpRequestInterceptor) {
			XMLHttpRequestInterceptor = _XMLHttpRequestInterceptor.XMLHttpRequestInterceptor();
			module.exports = HTTPCache;
		}, console.error);
	});
});