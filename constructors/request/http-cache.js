var XMLHttpRequestInterceptor = null;
var databaseStragedy = null;
var HTTPCache = function (interceptor, tableName) {
	var app = new ApplicationPrototype();
	var cacheFiles = {};
	var mimetypes  = {
		"_"        : "application/octet-stream", // default
		".txt"     : "text/plain",
		".html"    : "text/html",
		".tpl"    : "text/html",
		".xml"     : "text/xml",
		".js"      : "text/javascript",
		".css"     : "text/css",
		".json"    : "application/json",
		".jpeg"    : "image/jpeg",
		".jpg"     : "image/jpeg",
		".gif"     : "image/gif",
		".png"     : "image/png"
	};
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

	app.bind("contentEncode", function (content, cb) {
		var err;
		var send;
		var callback = function (err, data) {
			if (send) return;
			send = true;
			cb(err, data);
		};
		try {
			if (
				typeof(content) === "string"
			) {
				callback(undefined, content.base64encode());
			} else if ( content instanceof Blob ) {
				content.toArrayBuffer(function (content) {
					callback(undefined, content.toStringUtf8().base64encode());
				});
			} else if ( content instanceof ArrayBuffer ) {
				callback(undefined, content.toStringUtf8().base64encode());
			} else {
				callback(Error("Incorrect file content"));
			}
		} catch (err) {
			callback(err);
		}
	});

	app.bind("contentDecode", function (data, cb) {
		var err;
		var send;
		var callback = function (err, data) {
			if (send) return;
			send = true;
			cb(err, data);
		};

		try {
			callback(undefined, data.base64decode());
		} catch (err) {
			callback(err);
		}
	});

	app.bind("mimetype", function (url, callback) {
		if (url === undefined) return mimetypes;
		var extension = ((url.replace(/[\?\#].*$/, '').match(/(\.[^\.]+)$/) || [])[1] || '').toLowerCase();
		var mimetype  = mimetypes._;

		if (extension in mimetypes) {
			mimetype = mimetypes[extension];
		} else {
			app.emit("warn", [Error("Extension not found", url, " [",extension,"]; used fallback mimetype: ", mimetypes)]);
		}

		callback(undefined, mimetype);
	});

	app.bind("findUrl", function (url) {
		if (url in cacheFiles) return Application.Promise.resolve(cacheFiles[url]);

		return Application.Promise(function (resolve, reject) {
			database.initialization.then(function () {
				database.getItem(url).then(function (ev) {
					var content = ((((ev || {}).target || {}).result || {}).v || null);
					var finish  = function (content) {
						app.mimetype(url, function (err, mimetype) {
							if (err) {
								app.emit("error", [err]);
								mimetype = mimetypes._;
							}
							cacheFiles[url] = URL.createObjectURL(
								new Blob([content], { type: mimetype })
							);
							resolve(cacheFiles[url]);
						});
					};

					app.contentDecode(
						content,
						function (err, content) {
							if (err) return reject(err);

							finish(content);
						}
					);
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
						app.contentEncode(xhrProxy.response, function (err, content) {
							if (err) return app.emit("error:cache-content", [err]);
							database.setItem(url, content).then(function (content) {
								app.emit("database:cache:url", [url, content]);
							}, function (err) {
								app.emit("error:cache-content", [err]);

								database.getItem(url).then(function (content) {
									database.removeItem(url).then(function () {
										console.info("Incorrectly cached item removed", url);
									}, function (err) {
										app.emit("error:cache-content", [err]);
									});
								}, function (err) {
									app.emit("error:cache-content", [err]);
								});
							});
						});
						
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