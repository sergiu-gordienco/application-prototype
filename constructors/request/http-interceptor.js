var XMLHttpRequestInterceptor = function () {
	var app = new ApplicationPrototype();

	var _XMLHttpRequest = window.XMLHttpRequest;
	var _XMLHttpRequestProxy = function (paramsDictionary) {
		var xhr = new _XMLHttpRequest(paramsDictionary);
		var _args = function (args) {
			var _args = Array.prototype.slice.call(args);
			_args.unshift(xhr);
			return _args;
		};
		var _open = xhr.open;
		var _openArgs = undefined;
		xhr.interrupt = false;
		xhr.open = function (method, url) {
			_openArgs   = Array.prototype.slice.call(arguments);
			xhr._method = method.toLowerCase();
			xhr.requestURL = url;
			if (
				app.emit("http:open", _args(arguments)) !== false
			) {
				if (xhr.interrupt) return;
				_open.apply(xhr, arguments);
			}
		};

		var _addEventListenerEvents = {};

		[
			"onload",
			"onloadend",
			"onloadstart",
			"onloadprogress",
			"ontimeout",
			"onprogress",
			"onerror",
			"onreadystatechange"
		].forEach(function (str) {
			var eventName = str.replace(/^on/, '');
			_addEventListenerEvents[eventName] = [
				[eventName, (xhr[str] || function () {})]
			];

			Object.defineProperty(xhr, str, {
				get() {
					return _addEventListenerEvents[eventName][0][1];
				},
				set(value) {
					// console.log(xhr, eventName, value);
					_addEventListenerEvents[eventName][0][1] = value;
				}
			});
		});

		var _addEventListener = xhr.addEventListener;
		xhr.addEventListener = function (eventName, listener) {
			if (app.emit("http:" + eventName, _args(arguments)) === false) return;
			_addEventListenerEvents[eventName] = _addEventListenerEvents[eventName] || [];
			_addEventListenerEvents[eventName].push(arguments);
			return _addEventListener.apply(xhr, arguments);
		};


		var _setRequestHeader = xhr.setRequestHeader;
		var _setRequestHeaderList = {};
		xhr.setRequestHeader = function (header, value) {
			if (app.emit("http:setHeader", _args(arguments)) === false) return;
			_setRequestHeaderList[header] = value;
			return _setRequestHeader.apply(xhr, arguments);
		};

		/*
		[
			"loadstart",
			"progress",
			"abort",
			"error",
			"load",
			"timeout",
			"loadend",
			"readystatechange"
		]
		*/

		var _send = xhr.send;
		var _addEventListenerUploadEvents = {};
		var _sendData  = undefined;
		var _sendState = false;


		[
			"onload",
			"onloadend",
			"onloadstart",
			"onloadprogress",
			"ontimeout",
			"onprogress",
			"onerror",
			"onreadystatechange"
		].forEach(function (str) {
			var eventName = str.replace(/^on/, '');
			_addEventListenerUploadEvents[eventName] = [
				[eventName, (xhr.upload[str] || function () {})]
			];

			Object.defineProperty(xhr.upload, str, {
				get() {
					return _addEventListenerUploadEvents[eventName][0][1];
				},
				set(value) {
					_addEventListenerUploadEvents[eventName][0][1] = value;
				}
			});
		});
		[
			"loadstart",
			"progress",
			"abort",
			"error",
			"load",
			"timeout",
			"loadend",
			"readystatechange"
		].forEach(function (eventName) {
			if (xhr.upload) {
				var _addEventListener = xhr.upload.addEventListener;
				xhr.upload.addEventListener = function (eventName, listener) {
					if (app.emit("http:upload:" + eventName, _args(arguments)) === false) return;
					_addEventListenerUploadEvents[eventName] = _addEventListenerUploadEvents[eventName] || [];
					_addEventListenerUploadEvents[eventName].push(arguments);
					return _addEventListener.apply(xhr.upload, arguments);
				};
			}
		});

		xhr.send = function (d) {
			_sendData  = Array.prototype.slice.call(arguments);
			_sendState = true;
			if (
				app.emit("http:send", _args(arguments)) !== false
			) {
				if (xhr.interrupt) return;
				_send.apply(xhr, arguments);
			}

		};

		xhr.transform = function (config) {
			_openArgs = _openArgs || ["get", ""];

			if (typeof(config.url) === "string") {
				_openArgs[1] = config.url;
			}

			if (typeof(config.method) === "string") {
				_openArgs[0] = config.method;
			}

			if (typeof(config.sendData) !== "undefined") {
				_sendData[0] = config.sendData;
			}
		};


		xhr.replay = function (raw) {
			/*
				responseType
				timeout
				withCredentials
				onreadystatechange
			*/

			var _xhr;
			if (raw === false) {
				_xhr = xhr;
			} else if (raw === true) {
				_xhr = new _XMLHttpRequest(paramsDictionary);
			} else {
				_xhr = new _XMLHttpRequestProxy(paramsDictionary);
			}

			_xhr.responseType       = xhr.responseType || "text";
			_xhr.timeout            = xhr.timeout || 0;
			_xhr.withCredentials    = xhr.withCredentials;
			// _xhr.onerror            = xhr.onerror || function () {};
			// _xhr.onload             = xhr.onload || function () {};
			// _xhr.onreadystatechange = xhr.onreadystatechange || function () {};

			if (raw !== false) {
				_xhr.onreadystatechange = function () {
					[
						"responseType",
						"response",
						"responseText",
						"status",
						"statusText",
						"timeout",
						"readyState"
					].forEach(function (prop) {
						Object.defineProperty(xhr, prop, { writable: true });
						xhr[prop] = _xhr[prop];
					});
				};
			}

			if (raw !== false) {
				var eventName;
				for (eventName in _addEventListenerEvents) {
					_addEventListenerEvents[eventName].forEach(function (args) {
						_xhr.addEventListener.apply(_xhr, args);
					});
				}

				var eventName;
				for (eventName in _setRequestHeaderList) {
					_xhr.setRequestHeader.apply(_xhr, [eventName, _setRequestHeaderList[eventName]]);
				}


				var eventName;
				for (eventName in _addEventListenerUploadEvents) {
					_addEventListenerUploadEvents[eventName].forEach(function (args) {
						_xhr.upload.addEventListener.apply(_xhr, args);
					});
				}
			}

			if ((_openArgs || raw !== false) && _xhr.readyState === 0) {
				if (raw === false) {
					_open.apply(_xhr, _openArgs);
				} else {
					_xhr.open.apply(_xhr, _openArgs);
				}
			}

			if (raw === false) {
				if ((_sendState && _xhr.readyState === 1) || _xhr.interrupt) {
					_send.apply(_xhr, _sendData || []);
				}
			} else {
				_xhr.send.apply(_xhr, _sendData || []);
			}

			return _xhr;
		}

		return xhr;
	};

	app.bind("start", function () {
		window.XMLHttpRequest = _XMLHttpRequestProxy;
		return app;
	});

	app.bind("stop", function () {
		window.XMLHttpRequest = _XMLHttpRequest;
		return app;
	});

	app.bind("isActive", function () {
		return window.XMLHttpRequest === _XMLHttpRequestProxy
	});


	return app;
};


module.exports = {
	XMLHttpRequestInterceptor : XMLHttpRequestInterceptor,
	XMLHttpRequest : ((XMLHttpRequestInterceptor)())
}