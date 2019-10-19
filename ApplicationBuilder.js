// jshint -W080
// jshint -W002
// jshint -W083
// jshint -W069
// jshint -W061
// jshint -W054
var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
var isNode=new Function("var isBrowser = false; try { isBrowser = this===window;}catch(e){ isBrowser = false;}; try {return !isBrowser && ( this ===global );}catch(e){console.error(e); return false;}");
// jshint +W054

var ApplicationBuilder	= function (callback) {
	var m_urlload = function (url, callback) {
		var request = new XMLHttpRequest();
		request.responseType = "text";
		request.addEventListener("load", function () {
			callback(url, request.responseText || request.response);
		});
		request.open("GET", url, true);
		request.send();
	};

	var config;
	var module_path	= './constructors';
	var vars;
	var cacheSuffix = null;
	var params	= {
		callback_ready	: false
	};
	if (callback && typeof(callback) === "object") {
		if (typeof(callback.onready) === "function") {
			params.callback_ready	= callback.onready;
		}

		if (typeof(callback.onconstruct) === "function") {
			callback	= callback.onconstruct;
		} else {
			callback	= false;
		}
	}

	if (isNode()) ApplicationPrototype = require('./ApplicationPrototype.js');
	var Application	= new ApplicationPrototype(function (
			configurations,
			variables,
			methods,
			public_methods,
			private_methods
		) {
		config	= configurations;
		vars	= variables;
		config.cache_enabled	= false;
		config.debug_enabled	= false;
		// console.log(callback.toString());
		if (typeof(callback) === "function") {
			callback.apply(methods, [variables, configurations]);
		}
	});

	Application.bind("isNode", function () {
		return isNode();
	}, "");

	Application.bind("isBrowser", function () {
		return isBrowser();
	}, "");

	Application.bind("Promise", function (cb) {
		var err		= undefined;
		var value	= undefined;
		var cb_resolve	= [];
		var cb_reject	= [];
		var pending		= true;
		var resolve		= function (v) {
			if (pending) {
				pending	= false;
				value	= v;
				cb_resolve.forEach(function (f) {
					run(f, value);
				});
			}
		};
		var reject		= function (e) {
			if (pending) {
				pending	= false;
				err	= e;
				cb_reject.forEach(function (f) {
					run(f, err);
				});
			}
		};
		var run	= function (f, v) {
			var er;
			try {
				f(v);
			} catch (er) {
				console.error(er);
			}
			return er;
		};
		var p = {
			then : function (onFullfiled, onRejected) {
				p.catch(onRejected || function PromiseError(err) { console.error(err); });
				return Application.Promise(function (resolve, reject) {
					var callback = function (data) {
						var res, err;
						try {
							res = onFullfiled(data);
							resolve(res);
						} catch (err) {
							console.warn("Unchecked error in Promise");
							console.error(err);
							reject(err);
						}
					};
					p.catch(reject);
					if (typeof(onFullfiled) === "function") {
						if (pending) {
							cb_resolve.push(callback);
						} else if (typeof(err) === "undefined") {
							run(callback, value);
						}
					}
				});
			},
			catch: function (onRejected) {
				if (typeof(onRejected) === "function") {
					if (pending) {
						cb_reject.push(onRejected);
					} else if (typeof(err) !== "undefined") {
						run(onRejected, err);
					}
				}
				return p;
			},
			resolve	: resolve,
			reject	: reject
		};
		try {
			if (typeof(cb) === "function") {
				cb(resolve, reject);
			}
		} catch (err) {
			console.warn("Promise Exception on constructor exeution: ", cb);
			console.error(err);
			reject(err);
		}
		return p;
	});

	if (Application.isBrowser()) {
		if (!window.Promise) {
			window.Promise = Application.Promise;
		}
	}

	Application.Promise.reject	= function (value) {
		return new Application.Promise(function (resolve, reject) {
			reject(value);
		});
	};
	Application.Promise.resolve	= function (value) {
		return new Application.Promise(function (resolve, reject) {
			resolve(value);
		});
	};
	Application.Promise.race	= function (a) {
		var p	= new Application.Promise();
		var i, solved = false;
		for (i=0;i<a.length;i++) {
			a[i].then(function (val) {
				if (solved) return;
				solved	= true;
				p.resolve(val);
			}, function (err) {
				if (solved) return;
				p.reject(err);
			});
		}
		return p;
	};
	Application.Promise.all	= function (a) {
		var p = new Application.Promise();
		var values = [];
		for (i=0;i<a.length;i++) {
			a[i].then(function (val) {
				values.push(val);
				if (values.length === a.length) {
					p.resolve(values);
				}
			}, function (err) {
				p.reject(err);
			});
		}
		return p;
	};

	Application.bind('cacheEnabled', function (state) {
		if (typeof(state) === "boolean") {
			config.cache_enabled	= state;
		}
		if (typeof(state) === "string") {
			if (state) {
				cacheSuffix = state;
			} else {
				cacheSuffix = null;
			}
		}
		return config.cache_enabled;
	});
	Application.bind('debugEnabled', function (state) {
		if (typeof(state) === "boolean") {
			config.debug_enabled	= state;
		}
		return config.debug_enabled;
	});
	Application.bind('modulePath', function (path) {
		if (path && typeof(module_path) === "string") {
			module_path	= path;
		}
		return module_path;
	});


	;((function () {
		var store	= {};
		Application.bind('moduleRegister', function (path, modules) {
			if (typeof(path) === "string" && Array.isArray(modules)) {
				modules.forEach(function (module_name) {
					var moduleMeta	= Application.moduleResolve(module_name, path);
					// console.log("modulePath", App.modulePath(), module_name, moduleMeta);
					store[moduleMeta["name"]]	= moduleMeta;
					store['#' + module_name]	= moduleMeta;
				});
			}
			return store;
		});
		var cached_moduleNames	= {};
		Application.bind("moduleResolve", function (module_name, path) {
			if (typeof(path) === "undefined")
				path = module_path;

			/** module name formats

			https://example/module/path/{module-name}.js
			http://example/module/path/{module-name}.js#?module={module-name}
			http://example/module/path/file.js?module={module-name}
			{path/to/module-name}
			{path/to/module-name.js}
			path/to/file.js#?module={module-name}
			*/

			// return moduleMeta but requestQuery
			if (('#' + module_name) in store) {
				// console.warn('#' + module_name, ' founded in store ', store['#' + module_name]);
				return store['#' + module_name];
			}

			var moduleMeta	= {
				store	: {},
				$requestQuery : module_name,
				module_path	: path,
				name	: module_name,
				url		: path + '/' + module_name.replace(/[\#\?].*$/, '') + '.js',
				path	: '',
				__dirname	: ''
			};
			if (module_name.match(/^(http|https|ws)\:\/\//)) {
				moduleMeta.url = module_name;
			} else if (module_name.match(/^\//)) {
				moduleMeta.url = module_name;
				if (!moduleMeta.url.match(/((\.js)(\?.*|\#.*|))$/)) {
					var m = moduleMeta.url.match(/^(.*?)([\?|#].*|)$/);
					if (m) {
						moduleMeta.url = m[1] + '.js' + m[2];
					} else {
						moduleMeta.url += '.js';
					}
				}
			}
			;((function (m) {
				if (m && m[2]) {
					moduleMeta["name"] = m[2];
				}
			})(module_name.match(/(\#[\?]{0,1}module\=|\?module\=|\&module\=)([a-z0-9A-Z][a-z0-9\_\.\-A-Z]*)/)));


			if (moduleMeta["name"] in store) {
				// console.warn(moduleMeta["name"], ' founded in store ', store[moduleMeta["name"]]);
				return store[moduleMeta["name"]];
			}

			moduleMeta.path = moduleMeta.url.replace(/(\.js|)(\?.*|\#.*|)$/, '');
			moduleMeta.__dirname	= moduleMeta.path.replace(/\/[^\/]+$/, '');

			return moduleMeta;
		});
	})());


	;((function () {
		var fs = false;
		if (isNode()) {
			fs = require('fs');
		}
		var module_cache = {};
		var module_requests = {};
		var require_cache	= {};
		Application.bind("require", function (module_name, callback) {
			if (typeof(module_name) === "string") {
				var moduleMeta	= Application.moduleResolve(module_name, undefined);
				var __dirname	= moduleMeta.__dirname;
				// TODO validate path
				if (moduleMeta["name"] in require_cache) {
					if (callback)
						callback(require_cache[moduleMeta["name"]].exports || null, undefined);
					return require_cache[moduleMeta["name"]].$request;
				} else {
					var $request, requireDownload;
					if (moduleMeta.path in module_requests) {
						$request = module_requests[moduleMeta.path];
					} else {
						requireDownload = true;
						$request = new Application.Promise();
						module_requests[moduleMeta.path] = $request;
					}
					var module	= {
						cache		: function () {
							module_cache[moduleMeta.path] = module_cache[moduleMeta.path] || {};
							return module_cache[moduleMeta.path];
						},
						require	: function (moduleName, cb) {
							var updateModuleName = function (name, path) {
								if (path.match(/^(http|https|ws)\:\/\//)) {
									if (!name.match(/((\.js)(\?.*|\#.*|))$/)) {
										name += ".js"
									}
								}
								if (name.indexOf("::") !== -1) {
									name = name.split(/\s*\:\:\s*/);
									return name[0] + " :: " + path + "/" + name[1];
								} else {
									return path + "/" + name;
								}
							};
							if (typeof(moduleName) === "string") {
								return Application.require(updateModuleName(moduleName, moduleMeta.path), cb);
							} else if (Array.isArray(moduleName)) {
								return Application.require(moduleName.map(function (m) {
									return updateModuleName(m, moduleMeta.path);
								}), cb);
							}
						},
						resourceUrl	: function (path) {
							return moduleMeta.path + "/" + path;
						},
						meta : moduleMeta,
						$request	: $request
					};

					;((function () {
						var data	= undefined;
						Object.defineProperty(module, 'exports', {
							get: function() { return data || null; },
							set: function(val) {
								if ( typeof(data) === "undefined" ) {
									data	= val;
									require_cache[moduleMeta["name"]]	= module;
									module.$request.resolve(module.exports);
									if (callback)
										callback(module.exports || null, undefined);
								} else {
									data	= val;
								}
							},
							enumerable: true,
							configurable: true
						});
					})());

					var global	= Application;
					module.atime		= new Date().valueOf();
					module.Application	= function () {
						return (Application || global || null);
					};

					var module_url = moduleMeta.url + (!Application.cacheEnabled() ? ((moduleMeta.url.indexOf('?') === -1 ? '?' : '&') + 't='+( cacheSuffix ? cacheSuffix : module.atime ) ) : '');

					var module_header = Application.debugEnabled() ? ("/**" +
						"\n * Platform: ApplicationBuilder/ApplicationPrototype by Sergiu Gordienco Vasile" +
						"\n * Module Name: " + module.meta.name +
						"\n * Module Url: " + module.meta.url +
						"\n */\n\n") : "";
					if (requireDownload) {
						if (isNode()) {
							fs.readFile(
								require("path").normalize((function (url) {
									if (url.match(/^[a-z][a-z\d]*\:/)) {
										return url;
									}
									return url.replace(/\?.*/, '');
								})(module_url)), 'utf8', function (err, module_text) {
									err = undefined;
									try {
										eval(module_header + module_text);
									} catch(err) {
										console.warn("Application Loading Module", module_url);
										console.error(err);
										module.$request.reject(err);
									}
								}
							);
						} else {
							m_urlload(module_url, function (module_url, module_text) {
								var err;
								try {
									eval(module_header + module_text);
								} catch(err) {
									console.warn("Application Loading Module", module_url);
									console.error(err);
									module.$request.reject(err);
								}
							});
						}
					} else {
						module.$request.then(function (obj) {
							if (callback)
								callback(obj || null, undefined);
						}).catch(function (er) {
							console.warn("Application Loading Module", module_url);
							console.error(er);
						});
					}
					return module.$request;
				}
			} else if (Array.isArray(module_name)) {
				var modules		= {};
				var module_count	= 0;
				var module_length	= module_name.length;
				var module_errors	= [];
				// jshint -W004
				var $request	= Application.Promise();
				// jshint +W004
				module_name.forEach(function (module_name) {
					var module_link	= false;
					((function (m) {
						if (Array.isArray(m) && m[3].substr(0, 2) !== '//') {
							module_link	= m[1];
							module_name	= m[3];
						}
					})(module_name.match(/^([a-zA-Z0-9\_\-\."]+)(\s*\:\:\s*)(.*?)$/)));
					Application.require(module_name, function (module_exports, err) {
						module_count			+= 1;
						modules[module_name]	= module_exports;
						if (module_link && module_link !== module_name)
							modules[module_link]	= module_exports;
						if (err) {
							$request.reject(err);
							module_errors.push({ "module_name": module_name, "error" : err });
						}
						if (module_count === module_length) {
							if (!module_errors.length)
								$request.resolve(modules);
							if (callback)
								callback(modules, module_errors);
						}
					});
				});
				return $request;
			}
		});
	})());

	if (typeof(params.callback_ready) === "function") {
		var er;
		try {
			params.callback_ready.apply(Application, [vars, config]);
		} catch (er) {
			console.warn("Application callbackReady error", er);
		}
	}
	return Application;
};

if (isNode()) {
	module.exports	= ApplicationBuilder;
}
