// jshint -W080
// jshint -W002
// jshint -W083
// jshint -W069
// jshint -W061
// jshint -W054
var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
var isNode=new Function("var isBrowser = false; try { isBrowser = this===window;}catch(e){ isBrowser = false;}; try {return !isBrowser && ( this ===global );}catch(e){console.error(e); return false;}");
// jshint +W054

function ApplicationBuilder(callback) {
	var __requireNode, __globalNode, __dirnameNode;
	if (isNode()) {
		__requireNode = function (moduleName) {
			return require(moduleName);
		};

		__globalNode = global;

		__dirnameNode = __dirname;
	}

	if (isBrowser()) {
		if (this === window) {
			return new ApplicationBuilder(callback);
		}
	} else {
		if (this === global) {
			return new ApplicationBuilder(callback);
		}
	}

	var consoleOptions = {
		file: true,
		contextName: true,
		timestamp: true,
		logType: true
	};
	var consoleArguments = function (_type, _args, module) {
		if (isNode()) {
			return consoleArgumentsNode(_type, _args, module);
		} else {
			return consoleArgumentsBrowser(_type, _args, module);
		}
	};
	var getExecInfo = function () {
		var err;
		try { throw Error("debugg error"); } catch (err) {
			return err.stack.replace(/^[^\n]+\n[^\n]+\n/, '').replace(/^\n+/, '');
		}
		return null;
	};
	var consoleArgumentsNode    = function (_type, _args, module) {
		var args = Array.prototype.slice.call(_args);
		var typeColors = {
			log : 36,
			warn: 33,
			info: 34,
			error: 31
		};
		var typeColor = 31;

		if (_type in typeColors) typeColor = typeColors[_type];

		var path, info = ( getExecInfo() + '' );
		path = info;


		info = ([
			/\n\s*.*?(\S{0,23}\.\([^\)]+\)\s+\[as\s+[^\]]+\])/,
			/\n\s*.*\[as\s+([^\]]+)\]/,
			/\n\s*at\s+(\S*?)\s+.*_moduleRunner.*\<anonymous\>/,
			/\n\s*at\s+(process\._\S+)\s+\([^\)\n]+/,
			/\n\s*at\s+(process\.\S+)\s+\([^\)\n]+/
		].map(function (item) {
			return info.match(item);
		}).filter(function (item) {
			return !!item;
		})[0] || [])[1] || 'unknown';

		path = ([
			[ /\n\s*at\s+(\.{0,1}\/.*)/ ],
			[ /\n\s*at\s+(\S*?)\s+.*_moduleRunner.*\<anonymous\>\:\d+\:\d+/, function (item) {
				var url = ((module || {}).meta || {}).url;
				return item.replace('<anonymous>', url);
			} ],
			[ /\n\s*at\s+process\._\S+\s+\(([^\)\n]+)/ ],
			[ /\n\s*at\s+process\.\S+\s+\(([^\)\n]+)/ ]
		].map(function (item) {
			var value = path.match(item[0]);
			if (!value) return;

			if (item[1]) return item[1](value[1]);

			return value[1];
		}).filter(function (item) {
			return !!item;
		}))[0] || ((module || {}).meta || {}).url || 'unknown';

		var cwd = process.cwd();

		if (path.indexOf(cwd) === 0 && path.substr(0, cwd.length)) {
			path = './' + path.substr(cwd.length + 1);
		}

		var sint  = function (i, n) { return ('000000' + i).substr(0 - (n || 2)); };
		var date = new Date();

		args.unshift(
			(
				consoleOptions.timestamp ?
				( '\x1b[2m'
					+ sint(date.getHours())
					+ ':' + sint(date.getMinutes())
					+ ':' + sint(date.getSeconds())
					+ '.' + sint(date.getSeconds(), 3) + ' ' )
				: ''
			)
			+ '\x1b[2;1;' + typeColor + 'm'
			+ ( consoleOptions.logType ? ( _type.toUpperCase() + '\t' ) : '' )
			+ '\x1b[22m'
			+ ( consoleOptions.contextName ? ( ' ' + info ) : '' )
			+ '\x1b[37m'
			+ ( consoleOptions.file ? ( '\t(' + path + ') ' ) : '' )
		);
		args.push('\x1b[0m');

		return args;
	};
	var consoleArgumentsBrowser = function (_type, _args, module) {
		var args = Array.prototype.slice.call(_args).map(function (arg, index) {
			return arg;
		});
		var info = (getExecInfo() || '');
		info = ([
			/\n.*module.exports.*blob\:.*\#file=(.*)/,
			/\n\s*at\s+(\S+.*blob\:(http|https|\/\/)[^\)\n]+)\s*\)/,
			/\n\s*at\s+(\S+).*blob\:(http|https|\/\/)/,
			/\n.*\n.*\n\s*(\S+\@(blob\:|)((http|https)\:\/\/|).*Function\:\d+)/i			
		].map(function (item) {
			return info.match(item);
		}).filter(function (item) {
			return !!item;
		})[0] || [])[1] || 'unknown';
		var sint  = function (i, n) { return ('000000' + i).substr(0 - (n || 2)); };
		var date = new Date();
		var prefix = ( consoleOptions.timestamp ? ( "%c["
				+ sint(date.getHours())
				+ ':' + sint(date.getMinutes())
				+ ':' + sint(date.getSeconds())
				+ '.' + sint(date.getSeconds(), 3)
				+ "] " ) : ''
			)
			+ ( consoleOptions.logType ? ( "%c" + _type.toUpperCase() + " " ) : '' )
			+ (
				( consoleOptions.contextName || consoleArguments.file )
				? (
					"%c " + ((((module || {}).meta || {}).name + ' ' + (info.replace(/^.*(\:\d+\:\d+)\s*$/, ' line$1').replace(/(\/\<\s*|)\@.*(\:\d+\:\d+|\:\d+).*/, '()$2'))) || info || '?...')
			+ "%c\n"
				) : ''
			)
			// + '\n---------\n' + getExecInfo() + '\n---------\n'
			;
		if (typeof(args[0]) === "string") {
			args[0] = prefix + args[0];
		} else {
			args.unshift(prefix);
		}
		var typeSettings = (
			{
				error : {
					"background-color": "firebrick",
					"color": "white"
				},
				warn : {
					"background-color": "golderod",
					"color": "black"
				},
				info : {
					"background-color": "SkyBlue",
					"color": "black"
				},
				debug : {
					"background-color": "#232323",
					"color": "white"
				}
			}
		)[_type] || {
			"background-color": "#28a296",
			"color": "#000000"
		};
		args.splice(
			1, 0,
			"font-weight: normal;"
				+ "background-color:" + typeSettings["background-color"] + ';'
				+ "color:" + typeSettings["color"] + ';'
		);
		args.splice(
			2, 0,
			"font-weight: bold;"
				+ "background-color:" + typeSettings["background-color"] + ';'
				+ "color:" + typeSettings["color"] + ';'
		);
		args.splice(3, 0, "font-weight: bold;background-color: initial;color: initial;");
		args.splice(4, 0, "font-weight: normal;");
		// if (_type === "error") {
		// 	args.push(getExecInfo().replace(/^\n.*\n.*/, ''));
		// }
		return args;
	};

	var m_urlload = function (url, callback) {
		var request = new XMLHttpRequest();
		request.responseType = "text";
		request.addEventListener("load", function () {
			callback(url, request.responseText || request.response);
		});
		request.withCredentials = true;
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
	var ApplicationPrototypeJSDocs = null;
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
		config.debug_enabled	= true;
		config.runModulesInFiles = false;
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

	Application.bind("Promise", function (cb, module) {
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
				console.error.apply(console, consoleArguments("error", [er], module));
			}
			return er;
		};
		var p = {
			then : function (onFullfiled, onRejected) {
				p.catch(onRejected || function PromiseError(err) {
					console.error.apply(console, consoleArguments("error", [er], module));
				});
				return Application.Promise(function (resolve, reject) {
					var callback = function (data) {
						var res, err;
						try {
							res = onFullfiled(data);
							resolve(res);
						} catch (err) {
							console.error.apply(console, consoleArguments("error", [err], module));
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
			console.warn.apply(console, consoleArguments("warn", ["Promise Exception on constructor exeution: ", cb], module));

			console.error.apply(console, consoleArguments("error", [err], module));
			reject(err);
		}
		return p;
	});

	if (Application.isBrowser()) {
		if (!window.Promise) {
			window.Promise = Application.Promise;
		}
	}

	Application.Promise.reject	= function (value, module) {
		return new Application.Promise(function (resolve, reject) {
			reject(value);
		}, module);
	};
	Application.Promise.resolve	= function (value, module) {
		return new Application.Promise(function (resolve, reject) {
			resolve(value);
		}, module);
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


	Application.bind('runModulesInFiles', function (state) {
		if (typeof(state) === "boolean") {
			config.runModulesInFiles	= state;
		}
		return config.runModulesInFiles;
	});

	var _self = this;
	Application.bind('debugEnabled', function (state) {
		if (typeof(state) === "boolean") {
			config.debug_enabled	= state;

			if (config.debug_enabled) {
				if (!ApplicationPrototypeJSDocs) {
					ApplicationPrototypeJSDocs = _self.docs();
					ApplicationPrototypeJSDocs.subscribe(Application);
				}
			}
		}
		return config.debug_enabled;
	});

	Application.bind('consoleOptions', function (options) {
		if (options && typeof(options) === "object") {
			Object.keys(options)
				.forEach(function (prop) {
					if (prop in consoleOptions)
					if (typeof(consoleOptions[prop]) === typeof(options[prop]))
						consoleOptions[prop] = options[prop];
				});
		}

		return JSON.parse(JSON.stringify(consoleOptions));
	});

	Application.bind('modulePath', function (path) {
		if (path && typeof(path) === "string") {
			if (isNode()) {
				if (path.match(/^@(constructors|core)\:\/\//)) {
					path = path.replace(/^@(constructors|core)\:\/\//, __dirnameNode + '/constructors');
				} else if (!path.match(/^([a-zA-Z][a-z0-9A-Z]*\:\/\/|\.|\/)/)) {
					path = './' + path;
				}
			}
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

			if (isNode() && module_name.match(/^.\//)) {
				if (module_name.indexOf(module_path) === 0) {
					module_name = module_name.substr(module_path.length + 1);
				}
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

			var nodeInterface = new ApplicationPrototype();
			nodeInterface.bind('process', function __Node_Process() {
				return global.process;
			});
			nodeInterface.bind('global', function __Node_GlobalObject() {
				return global;
			});
			nodeInterface.bind('require', function __Node_Require(moduleName) {
				if (moduleName[0] === ".") {
					moduleName = process.cwd() + '/' + moduleName;
				}
				return __requireNode(moduleName);
			});
			nodeInterface.bind('globalReference', function __Node_GlobalReference(referenceName) {
				return global[referenceName];
			});
			Application.bind('NodeInterface', function _NodeInterface() {
				return nodeInterface;
			});
		}
		var module_cache = {};
		var module_requests = {};
		var require_cache	= {};
		var _console        = console;
		var chunkIndex      = 0;

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
										name += ".js";
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

					if (Application.debugEnabled()) {
						if (typeof(ApplicationPrototypeJSDocs) === "object") {
							ApplicationPrototypeJSDocs.subscribeModule(module);
						}
					}

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

					var module_url = moduleMeta.url + ((!Application.cacheEnabled() && !isNode()) ? ((moduleMeta.url.indexOf('?') === -1 ? '?' : '&') + 't='+( cacheSuffix ? cacheSuffix : module.atime ) ) : '');

					var module_header = Application.debugEnabled() ? ("/**" +
						"\n * Platform: ApplicationBuilder/ApplicationPrototype by Sergiu Gordienco Vasile" +
						"\n * Module Name: " + module.meta.name +
						"\n * Module Url: " + module.meta.url +
						"\n */\n\n") : "";

					module_header += 'var exports = (' + (function (module) {
						var initialValue = module.exports;var value = {};
						var timer = setInterval(function () {
							if (initialValue !== module.exports) { clearInterval(timer); }
							else if (value !== exports) {
								if (Application.debugEnabled()) {
									console.warn("⚠ DEPRECATED:\n\nPlease use `module.exports` instead of `exports` in Application Prototype Framework");
								}
								clearInterval(timer);
								module.exports = exports;
							}
						}, 100);

						return value;
					}).toString() + ')(module);';
					var console = {
						log : function () {
							if (Application.debugEnabled())
								_console.log.apply(_console, consoleArguments("log", arguments, module));
						},
						info : function () {
							if (Application.debugEnabled())
								_console.info.apply(_console, consoleArguments("info", arguments, module));
						},
						warn : function () {
							if (Application.debugEnabled())
								_console.warn.apply(_console, consoleArguments("warn", arguments, module));
						},
						error : function () {
							if (Application.debugEnabled()) {
								_console.log.apply(_console, consoleArguments("error", [], module));
								var args = Array.prototype.slice.call(arguments);
								if (
									args[0]
									&& ( args[0] instanceof Error )
									&& typeof(args[0].stack) === "string"
									&& args[0].name !== "ModuleError"
									&& args[0].stack.indexOf(Application.modulePath()) !== -1
								) {
									args[0] = moduleError(args[0]);
								}
								_console.error.apply(_console, args);
							}
						},
						debug : function () {
							if (Application.debugEnabled())
								_console.debug.apply(_console, consoleArguments("debug", arguments, module));
						},
						clear : function () {
							_console.clear.apply(_console, arguments);
						},
						count : function () {
							_console.count.apply(_console, arguments);
						},
						countReset : function () {
							_console.countReset.apply(_console, arguments);
						},
						dir : function () {
							_console.dir.apply(_console, arguments);
						},
						dirxml : function () {
							_console.dirxml.apply(_console, arguments);
						},
						group : function () {
							_console.group.apply(_console, arguments);
						},
						groupEnd : function () {
							_console.groupEnd.apply(_console, arguments);
						},
						groupCollapsed : function () {
							_console.groupCollapsed.apply(_console, arguments);
						},
						time : function () {
							_console.time.apply(_console, arguments);
						},
						trace : function () {
							_console.trace.apply(_console, arguments);
						},
						timeLog : function () {
							_console.timeLog.apply(_console, arguments);
						},
						timeEnd : function () {
							_console.timeEnd.apply(_console, arguments);
						}
					};
					Object.defineProperty(console, 'memory', {
						get : function () {
							return _console.memory;
						},
						set : function (v) {
							console.warn('console.memory is readonly');
						},
						configurable: false
					});
					if (Application.isBrowser()) {
						if (!window.console.__parent) {
							console.__parent = window.console;
							window.console = console;
						} else {
							console.__parent = window.console.__parent;
						}
					} else {
						if (__globalNode && !__globalNode.console.__parent) {
							console.__parent = __globalNode.console;
							__globalNode.console = console;
						} else {
							if (__globalNode && __globalNode.console.__parent)
								console.__parent = __globalNode.console.__parent;
						}
					}
					var moduleError    = function (err, name) {
						var prettyError = new SyntaxError(err.message, module.meta.url, err.lineNumber);
						name = name || "ModuleError";
						prettyError.name = name;
						prettyError.original = err;
						prettyError.fileName = module.meta.url;
						var addrMatch = err.stack.match(/\:(\d+)\:(\d+)/) || [];
						prettyError.lineNumber = err.lineNumber || addrMatch[1] || 0;
						prettyError.columnNumber = err.columnNumber || addrMatch[2] || 0;
						var url = module.meta.url;
						if (url[0] === '/' && isBrowser()) url = location.origin + url;
						prettyError.stack = name + ': ' + err.message
							+ ' ; line ' + prettyError.lineNumber + ':' + prettyError.columnNumber + '\n' + (
								err.stack.indexOf(Application.modulePath()) !== -1
								? err.stack
								: '\n    export@' + url + ':' + prettyError.lineNumber + ':' + prettyError.columnNumber
							);

						return prettyError;
					};
					var moduleRunner   = function _moduleRunner(body) {
						var er, err;
						var __NodeModuleRequire = function (moduleName) {
							if (!isNode()) throw Error('require is not available in BrowserMode');

							if (moduleName[0] === ".") {
								moduleName = __dirname + '/' + moduleName;
							}
							return Application.NodeInterface().require(moduleName);
						};

						var Promise = function (resolve, reject) {
							return new Application.Promise(resolve, function (err) {
								err = moduleError(err);
								console.error(err);
								reject(err);
							}, module);
						};
						Promise.race    = Application.Promise.race;
						Promise.all     = Application.Promise.all;
						Promise.resolve = function (handler, module) {
							return Application.Promise.resolve(handler, module);
						};
						Promise.reject  = function (handler, module) {
							return Application.Promise.reject(handler, module);
						};
						var moduleBlock;
						try {
							moduleBlock = new Function(
								'module',
								'console',
								'__dirname',
								'Application',
								'global',
								'moduleError',
								'ApplicationPrototype',
								'require',
								'Promise',
								module_header + body
							);
						} catch (er) {
							err = er;
						}

						if (err) {
							throw moduleError(err, 'ModuleLoadSyntaxError');
						}

						moduleBlock.displayName = module.meta.name;

						if (Application.runModulesInFiles() && Application.isBrowser()) {
							var chunkID = 'chunk'
								+ new Date().valueOf().toString(36)
								+ '-' + Math.floor(100000000 + 100000000 * Math.random()).toString(36)
								+ '-' + (chunkIndex++) + ':' + module.meta.name;
							var script, url;
							window[chunkID] = function (moduleInit) {
								delete window[chunkID];
								var err;
								try {
									moduleInit.apply(
										module,
										[
											module,
											console,
											__dirname,
											Application,
											global,
											moduleError,
											ApplicationPrototype,
											__NodeModuleRequire,
											Promise
										]
									);

									script.parentNode.removeChild(script);
									URL.revokeObjectURL(url);
								} catch (err) {
									throw moduleError(err);
								}
							};
							url = URL.createObjectURL(new Blob(
								[
									module_header,
									'\n;(window["' + chunkID + '"](',
									moduleBlock.toString(),
									'));'
								],
								{
									type: 'application/javascript'
								}
							));

							if (Application.debugEnabled()) {
								if (module.meta.url[0] === '/') url = url + '#file=' + location.origin + module.meta.url;
							}

							script = document.createElement('script');
							script.setAttribute("type", "text/javascript");
							script.setAttribute("async", "");
							(
								document.getElementsByTagName('head')[0]
								|| document.getElementsByTagName('body')[0]
								|| document.getElementsByTagName('html')[0]
							).appendChild(
								script
							);
							script.setAttribute("src", url);

							return;
						} else {
							moduleBlock.toSource = function () { /* Application Prototype Module */ };
							moduleBlock.toString = function () { /* Application Prototype Module */ };

							err = null;
							try {
								moduleBlock.apply(
									module,
									[
										module,
										console,
										__dirname,
										Application,
										global,
										moduleError,
										ApplicationPrototype,
										__NodeModuleRequire,
										Promise
									]
								);
							} catch (er) {
								err = er;
							}

							if (err) {
								throw moduleError(err);
							}
						}
					};

					if (requireDownload) {
						if (isNode()) {
							fs.readFile(
								require("path").normalize((function (url) {
									if (url.match(/^[a-z][a-z\d]*\:/)) {
										return url;
									}
									return url.replace(/\?.*/, '');
								})(module_url)), 'utf8', function (err, module_text) {
									if (err) {
										console.error(err);
										module.$request.reject(moduleError(err));
										return;
									}

									err = undefined;
									try {
										if (Application.debugEnabled()) {
											var runCode = function () {
												return moduleRunner(module_text);
											};
											ApplicationPrototypeJSDocs.evalModule(module_text, module, module_header, runCode);
										} else {
											moduleRunner(module_text);
										}
									} catch(err) {
										console.warn("Application Loading Module", module_url);
										module.$request.reject(moduleError(err));
										console.error(moduleError(err));
									}
								}
							);
						} else {
							m_urlload(module_url, function (module_url, module_text) {
								var err;
								try {
									if (Application.debugEnabled()) {
										var runCode = function () {
											return moduleRunner(module_text);
										};
										ApplicationPrototypeJSDocs.evalModule(module_text, module, module_header, runCode);
									} else {
										moduleRunner(module_text);
									}
								} catch(err) {
									console.warn("Application Loading Module", module_url);
									module.$request.reject(moduleError(err));
									console.error(moduleError(err));
								}
							});
						}
					} else {
						module.$request.then(function (obj) {
							if (callback) {
								callback(obj || null, undefined);
							}
						}).catch(function (err) {
							console.warn("Application Loading Module", module_url);
							console.error(moduleError(err));
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

ApplicationBuilder.prototype.docs = ((function (ApplicationPrototypeJSDocs) {
	var _ApplicationPrototypeJSDocs = function () {
		return ApplicationPrototypeJSDocs;
	};
	return _ApplicationPrototypeJSDocs;
})((function () {
	var ApplicationPrototypeJSDocs = {
		subscribe : function (App) {

		},
		subscribeModule : function (module) {

		},
		evalModule: function (moduleCode, module, moduleHeaderText, runCode) {
			var err, e;
			try {
				runCode();
			} catch (e) {
				err = e;
			}

			// module.$request.then(function () {
			// 	console.log(module.exports.toString());
			// }, console.error);

			if (err) throw err;
		}
	};

	return ApplicationPrototypeJSDocs;
})()));

if (isNode()) {
	module.exports	= ApplicationBuilder;
}
