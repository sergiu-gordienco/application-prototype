var XMLHttpRequestInterceptor = null;
var databaseStragedy = null;
var HTTPCache = function (interceptor, tableName) {
	var app = new ApplicationPrototype();
	var cacheFiles = {};
	var _processedFiles = {};
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
		".png"     : "image/png",
		".svg"     : "image/svg+xml"
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

	app.bind("database", function () {
		return new Application.Promise(function (resolve, reject) {
			database.initialization.then(function () {
				resolve(database);
			}).catch(reject);
		});
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
				content.toArrayBuffer(function (err, content) {
					if (err) {
						callback(err);
					} else {
						callback(undefined, content.base64encode());
					}
				});
			} else if ( content instanceof ArrayBuffer ) {
				callback(undefined, content.base64encode());
				// callback(undefined, content.toStringUtf8().base64encode());
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
			if (data === null) {
				return callback(Error('empty data'));
			}
			var xhrRequest = new XMLHttpRequest();
			xhrRequest.addEventListener("load", function () {
				callback(undefined, xhrRequest.response);
			});
			xhrRequest.addEventListener("error", function (err) {
				callback(err);
			});
			xhrRequest.responseType = 'blob';
			xhrRequest.open('get', 'data:application/octet-stream;base64,' + data, true);
			xhrRequest.send();
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
			if (err) app.emit("error:url-find", [err]);

			xhrProxy.addEventListener("load", function () {
				database.initialization.then(function () {
					app.contentEncode(xhrProxy.response, function (err, content) {
						if (err) return app.emit("error:cache-content", [err]);
						if (url in _processedFiles) {
							app.emit("database:cache:url", [url, content, 'DUPLICATED']);
							return;
						}
						_processedFiles[url] = true;
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
			if (cache[xhr._method].length) {
				xhr.interrupt = true;
				app.emit("intercept:http", [xhr, xhr._method, xhr.requestURL]);
				return false;
			}
		}
	});

	if (!app.interceptor().isActive()) {
		app.interceptor().start();
	}

	return app;
};

HTTPCache.HTTPCacheElements = function () {
	if (typeof(window) !== "object") return;
	var _urlCache = {};
	[
		{
			constructorName: 'HTMLImageElement', attributeName: 'src'
		},
		{
			constructorName: 'HTMLScriptElement', attributeName: 'src'
		},
		{
			constructorName: 'HTMLLinkElement', attributeName: 'href'
		}
	].forEach(function (item) {
		if (item.constructorName in window) {
			window[item.constructorName].prototype.__cacheSetAttribute = window[item.constructorName].prototype.setAttribute;
			window[item.constructorName].prototype.setAttribute = function (name, value) {
				if (item.attributeName === name) {
					this.setAttribute('cached-' + item.attributeName, value);
					if (value in _urlCache) {
						this.__cacheSetAttribute(name, _urlCache[value]);
						return;
					}
					var _this = this;
					var xhrRequest = new window.XMLHttpRequest();

					if (item.constructorName === 'HTMLLinkElement') {
						xhrRequest.addEventListener('load', function () {
							var data = xhrRequest.response.replace(
								/(url\s*\()([\"\']{0,1})(.*?)(\2)(\))/g,
								function (s0, s1, s2, s3, s4, s5) {
									var url = s3[0] === "/" ? (
										location.origin + s3
									) : (
										s3.match(/[a-z\d]+\:/) ? s3 : (
											value.replace(/[^\/]+$/, '') + s3
										)
									);
									return s1 + s2 + (
										url
									) + s4 + s5;
								}
							);
							var cachedUrl = URL.createObjectURL(new Blob([data]));
							_urlCache[value] = cachedUrl;
							_this.__cacheSetAttribute(name, cachedUrl);
						});
						xhrRequest.open('get', value, true);
						xhrRequest.responseType = 'text';
					} else {
						xhrRequest.addEventListener('load', function () {
							var cachedUrl = URL.createObjectURL(xhrRequest.response);
							_urlCache[value] = cachedUrl;
							_this.__cacheSetAttribute(name, cachedUrl);
						});
						xhrRequest.open('get', value, true);
						xhrRequest.responseType = 'blob';
					}
					xhrRequest.send();
					return;
				} else {
					return this.__cacheSetAttribute(name, value);
				}
			};

			Object.defineProperty(
				window[item.constructorName].prototype, item.attributeName, {
				get: function() { return this.getAttribute(item.attributeName); },
				set: function(value) { this.setAttribute(item.attributeName, value); },
				enumerable: true,
				configurable: true
			});
		}
	});
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