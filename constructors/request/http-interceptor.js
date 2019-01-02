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
		xhr.interupt = false;
		xhr.open = function (method, url) {
			if (
				app.emit("http:open", _args(arguments)) !== false
			) {
				if (xhr.interupt) return;
				_openArgs   = Array.prototype.slice.call(arguments);
				xhr._method = method.toLowerCase();
				xhr.requestURL = url;
				_open.apply(xhr, arguments);
			}
		};

		var _addEventListenerEvents = {};
		var _addEventListener = xhr.addEventListener;
		xhr.addEventListener = function (eventName, listener) {
			if (app.emit("http:" + eventName, _args(arguments)) === false) return;
			_addEventListenerEvents[eventName] = _addEventListenerEvents[eventName] || [];
			_addEventListenerEvents[eventName].push(arguments);
			return _addEventListener.apply(xhr, arguments);
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
			if (
				app.emit("http:send", _args(arguments)) !== false
			) {
				_sendData  = Array.prototype.slice.call(arguments);
				_sendState = true;
				if (xhr.interupt) return;
				_send.apply(xhr, arguments);
			}

		};

		xhr.transform = function (config) {
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

			_xhr.responseType       = xhr.responseType;
			_xhr.timeout            = xhr.timeout || 0;
			_xhr.withCredentials    = xhr.withCredentials;
			_xhr.onreadystatechange = xhr.onreadystatechange || function () {};

			var eventName;
			for (eventName in _addEventListenerEvents) {
				_addEventListenerEvents[eventName].forEach(function (args) {
					_xhr.addEventListener.apply(_xhr, args);
				});
			}

			var eventName;
			for (eventName in _addEventListenerUploadEvents) {
				_addEventListenerUploadEvents[eventName].forEach(function (args) {
					_xhr.upload.addEventListener.apply(_xhr, args);
				});
			}

			if (_openArgs) {
				if (raw === false) {
					_open.apply(_xhr, _openArgs);
				} else {
					_xhr.open.apply(_xhr, _openArgs);
				}
			}

			if (_sendState) {
				if (raw === false) {
					_send.apply(_xhr, _sendData);
				} else {
					_xhr.send.apply(_xhr, _sendData);
				}
			}

			return _xhr;
		}
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