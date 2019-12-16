/// <reference path="index.d.js" />

var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
var isNode=new Function("var isBrowser = false; try { isBrowser = this===window;}catch(e){ isBrowser = false;}; try {return !isBrowser && ( this ===global );}catch(e){console.error(e); return false;}");

;((function (window, undefined) {
	window.ApplicationPrototype	= (function (builder) {
		var methods = {};
		var private_methods	= [];
		var public_methods	= {};
		var vars	= {};
		var config	= {};
		var crudEvents	= function (methods, public_methods, private_methods) {
			var events		= {};
			var nextTick    = setTimeout;
			if (typeof(setImmediate) === "function") {
				nextTick = setImmediate;
			}
			if (typeof(process) === "object" && process && typeof(process.nextTick) === "function") {
				nextTick = setImmediate;
			}
			var bind_method	= function (v, f, conf) {
				var method	= "" + v;
				var methodNameCamel = (method + "").replace(/^./, function (m) { return m.toUpperCase(); });
				var method_config;
				if (typeof(conf) === "string" && conf !== "all" && conf !== "default") {
					method_config	= {
						listenedBefore	: false,
						listenedOn		: false,
						listenedAfter	: false,
						allowInteruption: false
					}
					if (conf.indexOf("light") !== -1) { // on
						method_config.listenedOn	= {
							hookname : "on" + methodNameCamel
						};
						method_config.allowInteruption	= true;
					}
					if (conf.indexOf("af") !== -1) { // after
						method_config.listenedAfter	= {
							hookname : "after" + methodNameCamel
						};
					}
					if (conf.indexOf("on") !== -1) { // on
						method_config.listenedOn	= {
							hookname : "on" + methodNameCamel
						};
					}
					if (conf.indexOf("st") !== -1) { // interupt
						method_config.allowInteruption	= true;
					}
					if (conf.indexOf("before") !== -1 || conf.indexOf("bf") !== -1) { // before
						method_config.listenedBefore	= {
							hookname : "before" + methodNameCamel
						};
					}
				} else {
					method_config	= {
						listenedBefore	: { hookname : "before" + methodNameCamel },
						listenedOn		: { hookname : "on" + methodNameCamel },
						listenedAfter	: { hookname : "after" + methodNameCamel },
						allowInteruption: true
					}
				}
				if (conf && typeof(conf) === "object") {
					((function (config, conf) {
						var i;
						for (i in config) if (i in conf) {
							if (typeof(conf[i]) === typeof(config[i])) {
								config[i]	= conf[i];
							}
						}
					})(method_config, conf));
				}
				public_methods[method]	= function () {
					if (method_config.listenedBefore !== false) {
						if (methods.emit(method_config.listenedBefore.hookname, arguments, false, !method_config.allowInteruption) === false) {
							return false;
						}
					}
					if (method_config.listenedOn !== false) {
						if (!methods.emit(method_config.listenedOn.hookname, arguments, false, !method_config.allowInteruption) === false) {
							return false;
						}
					}
					var response	= ( f || methods[method] ).apply(public_methods, arguments);
					if (method_config.listenedAfter !== false) {
						var args = arguments;
						nextTick(function () {
							if (!methods.emit(method_config.listenedAfter.hookname, args, false, !method_config.allowInteruption) === false) {
								return false;
							}
						}, 0);
					}
					return response;
				};
				return public_methods;
			};
			var handlerIdIndex = 1;
			methods.on	= function (eventName, handler, handlerId) {
				if (eventName.match(/\s*\,\s*/)) {
					eventName.split(/\s*\,\s*/).forEach(function (eventName) {
						eventName = eventName.replace(/^\s+/, '').replace(/\s+$/, '');
						if (!eventName) return;
						methods.on(eventName, handler, handlerId);
					});
					return;
				} else {
					eventName = eventName.replace(/^\s+/, '').replace(/\s+$/, '');
					if (!eventName) return;
				}
				if (typeof(handler) !== "function")
					return false;
				if (!(eventName in events)) {
					events[eventName]	= {};
				}
				if (!handlerId) {
					handlerIdIndex++;
					handlerId	= "s-" + handlerIdIndex;
				}
				if (handlerId in events[eventName]) {
					delete events[eventName][handlerId];
				}
				events[eventName][handlerId]	= handler;
				return handlerId;
			};
			methods.once = function (eventName, handler, handlerId) {
				var id;
				id = methods.on(eventName, function () {
					methods.off(eventName, id);
					handler.apply(this, arguments);
				}, handler);
				return id;
			};
			methods.off	= function (eventName, handlerId) {
				if (eventName.match(/\s*\,\s*/)) {
					eventName.split(/\s*\,\s*/).forEach(function (eventName) {
						eventName = eventName.replace(/^\s+/, '').replace(/\s+$/, '');
						if (!eventName) return;
						methods.off(eventName, handler, handlerId);
					});
					return;
				} else {
					eventName = eventName.replace(/^\s+/, '').replace(/\s+$/, '');
					if (!eventName) return;
				}
				if (handlerId) {
					if (eventName in events) {
						if (handlerId in events[eventName]) {
							delete	events[eventName][handlerId];
							return true;
						}
					}
				} else if (eventName in events) {
					var b = false;
					for (handlerId in events[eventName]) {
						delete	events[eventName][handlerId];
						b = true;
					}
					return b;
				}
				return false;
			};
			methods.emit	= function (eventName, args, track, noSkipStopReturn) {
				if (eventName in events) {
					var handlerId;
					for(handlerId in events[eventName]) {
						try {
							if (events[eventName][handlerId].apply(( track ? public_methods : methods ), (args || [])) === false && !noSkipStopReturn) {
								return false;
							}
						} catch(err) {
							console.error("Error detected: ", err);
						}
					}
				}
			};
			methods.bind	= function (method, callback, conf) {
				if (typeof(method) === "function") {
					conf     = callback;
					callback = method;
					method   = callback.name;
				}
				return bind_method(method, callback, conf);
			};
			var method;
			for (method in methods) {
				if (private_methods.indexOf(method) === -1) {
					((bind_method)(method));
				}
			}
		};

		methods.crudEvents	= function () {
			return crudEvents.apply(methods, arguments);
		};
		if (typeof(builder) === "function") {
			if (builder(config, vars, methods, public_methods, private_methods) !== false) {
				crudEvents(methods, public_methods, private_methods);
			} else {
				return methods;
			}
		} else {
			crudEvents(methods, public_methods, private_methods);
		}
		return public_methods;
	});
})((function () {
	if (typeof(window) !== "undefined") { return window;
	} else if (typeof(global) !== "undefined") { return global;
	} else if (typeof(APP_BUILDER_GLOBAL) === "undefined") {
		throw new Error("Define APP_BUILDER_GLOBAL as global reference");
	} else {
		return APP_BUILDER_GLOBAL;
	}
})()));


if (isNode()) {
	module.exports	= ApplicationPrototype;
}
