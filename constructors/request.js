/* jshint -W002 */

/**
 * @class
 * @name RequestModule 
 */

/**
 * @callback RequestModuleConstructor
 * @returns {RequestModule}
 */

/**
 * Module used for retrieving date using XMLHttpRequest
 * @example
 * Application.require('request').then(function (request) {
 *	 request()
 *		 .url('/data.json')
 *		 .response('json')
 *		 .then(function (data) {
 *			 console.log(data);
 *		 }, console.error);
 * }, console.error);
 * @returns {RequestModuleConstructor}
 * @see RequestModule
 */

Application.require("extensions/prototype", function (epro) {

	function Request() {
		var app	 = new ApplicationPrototype();
		var httpRequest = new XMLHttpRequest();


		/**
		 * @inner
		 * @typedef {Object} RequestConfig
		 * @memberof RequestModule
		 * @property {boolean} [method="GET"]
		 * @property {boolean} [url="#"]
		 * @property {boolean} [async=true]
		 * @property {boolean} [opened=false]
		 * @property {boolean} [isSent=false]
		 * @property {boolean} [isLoaded=false]
		 * @property {boolean} [isUploaded=false]
		 * @property {boolean} [ignoreStatusCode=false]
		 */
		var config  = {
			method  : "GET",
			url	 : "#",
			async   : true,
			opened  : false,
			isSent  : false,
			isLoaded: false,
			isUploaded: false,
			ignoreStatusCode : false
		};


		/**
		 * @typedef {object} RequestModule.readyStateType
		 * @property {number} [READY_STATE_UNSENT=0]
		 * @property {number} [READY_STATE_OPENED=1]
		 * @property {number} [READY_STATE_HEADERS_RECEIVED=2]
		 * @property {number} [READY_STATE_LOADING=3]
		 * @property {number} [READY_STATE_DONE=4]
		 */

		var configurator	= {
			"ignore-status-code"  : function () {
			  config.ignoreStatusCode = true;
			},
			"check-status-code"  : function () {
			  config.ignoreStatusCode = false;
			},
			"prepare-post"  : function () {
				httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			},
			"retrieve-binary-string"	: function () {
				httpRequest.overrideMimeType("text/plain; charset=x-user-defined");
				httpRequest.responseType = "arraybuffer";
			},
			"retrieve-blob"	: function () {
				httpRequest.responseType = "blob";
			},
			"prepare-multipart" : function () {
				config.sBoundary	= config.sBoundary || epro.fn.getRandId().toHex();
				httpRequest.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + config.sBoundary);
			},
			"POST" : "prepare-post",
			"binary"	: "retrieve-binary-string",
			"blob" : "retrieve-blob",
			"multipart" : "prepare-multipart"
		};

		/**
		 * @method config
		 * @memberof RequestModule#
		 * @returns {RequestModule.RequestConfig}
		 */
		app.bind("config", function () {
			return config;
		});

		/**
		 * @method configurator
		 * @memberof RequestModule#
		 * @param {('multipart'|'blob'|'binary'|'POST'|'prepare-multipart'|'retrieve-blob'|'retrieve-binary-string'|'prepare-post'|'check-status-code'|'ignore-status-code')} template configuration name
		 * @returns {RequestModule}
		 */
		app.bind("configurator", function (template) {
			var f = function (template) {
				if (typeof(configurator[template]) === "string") {
					return f(configurator[template]);
				} else if (typeof(configurator[template]) === "function") {
					return configurator[template];
				}
			};
			var configTemplate = f(template);
			if (typeof(configTemplate) === "function") {
				configTemplate();
			}
			return app;
		});

		// events for download
		httpRequest.addEventListener("progress", function (evt) {
			if (evt.lengthComputable && evt.total) {
				var percentComplete = evt.loaded / evt.total;
				app.emit("progress", [evt, percentComplete]);
			} else {
				app.emit("progress", [evt]);
			}
		});
		httpRequest.addEventListener("load", function (evt) {
			app.emit("load", [evt]);
		});
		httpRequest.addEventListener("loadend", function (evt) {
			config.isLoaded = true;
			app.emit("loadend", [evt]);
		});
		httpRequest.addEventListener("error", function (evt) {
			app.emit("error", [evt]);
		});
		httpRequest.addEventListener("abort", function (evt) {
			app.emit("abort", [evt]);
		});

		// events for upload
		httpRequest.upload.addEventListener("progress", function (evt) {
			if (evt.lengthComputable && evt.total) {
				var percentComplete = evt.loaded / evt.total;
				app.emit("upload-progress", [evt, percentComplete]);
			} else {
				app.emit("upload-progress", [evt]);
			}
		});
		httpRequest.upload.addEventListener("load", function (evt) {
			app.emit("upload-load", [evt]);
		});
		httpRequest.upload.addEventListener("error", function (evt) {
			app.emit("upload-error", [evt]);
		});
		httpRequest.upload.addEventListener("abort", function (evt) {
			app.emit("upload-abort", [evt]);
		});


		httpRequest.upload.addEventListener("loadend", function (evt) {
			config.isUploaded = true;
			app.emit("upload-loadend", [evt]);
		});

		/**
		 * @method request
		 * @memberof RequestModule#
		 * @returns {XMLHttpRequest}
		 */
		app.bind("request", function () { return httpRequest; }, "");

		/**
		 * @method response
		 * @memberof RequestModule#
		 * @returns {XMLHttpRequest.response}
		 */


		/**
		 * @method response
		 * @memberof RequestModule#
		 * @param {'request'} type
		 * @returns {Promise<RequestModule>}
		 */

		/**
		 * @method response
		 * @memberof RequestModule#
		 * @param {'blob'} type
		 * @param {{ type: string }} [params={type: 'application/octet-stream'}] Blob constructor's params
		 * @returns {Promise<Blob>}
		 */

		/**
		 * @method response
		 * @memberof RequestModule#
		 * @param {'arraybuffer'} type
		 * @returns {Promise<ArrayBuffer>}
		 */

		/**
		 * @method response
		 * @memberof RequestModule#
		 * @param {('text'|'json')} type
		 * @returns {Promise<string>}
		 */

		/**
		 * @method response
		 * @memberof RequestModule#
		 * @param {'document'} type
		 * @returns {HTMLElement}
		 */
		app.bind("response", function (type, params) {
			var er, err, data, node;
			if (typeof(type) === "undefined") {
				return httpRequest.response;
			} else {
				if (!config.isSent) {
					app.send();
				}
				if (!config.isLoaded) {
					return new Application.Promise(function (resolve, reject) {
						app.on("loadend", function () {
							var result = app.response(type, params);
							result.then(function (data) {
								resolve(data);
							}, function (er) {
								er.httpRequest = app;
								reject(er);
							});
						});
						app.on("error", function (er) {
							er.httpRequest = app;
							reject(er);
						});
					});
				}
				var response = Application.Promise(), reader;
				if (type === "request") {
				  response.resolve(app);
				} else if (type === "response") {
				  response.resolve(httpRequest.response);
				} else if (httpRequest.responseType === "arraybuffer") {
					switch (type) {
						case "blob":
							response.resolve(new Blob(
								[httpRequest.response],
								params || {type: "application/octet-stream"}
							));
						break;
						case "json":
							data	= undefined;
							er = undefined;
							try {
								data = JSON.parse(httpRequest.response.toStringUtf8());
								response.resolve(data);
							} catch (err) { er = err; }
							if (typeof(er) !== "undefined") {
								response.reject(er);
							}
						break;
						case "document":
							node = document.createElement("div");
							node.innerHTML  = httpRequest.response.toStringUtf8();
							response.resolve(node);
						break;
						case "text":
							response.resolve(httpRequest.response.toStringUtf8());
						break;
						case "arraybuffer":
							response.resolve(httpRequest.response);
						break;
					}
				} else if (httpRequest.responseType === "blob") {
					switch (type) {
						case "blob":
							response.resolve(httpRequest.response);
						break;
						case "json":
							httpRequest.response.toArrayBuffer(function (er, data) {
								if (typeof(er) !== "undefined") {
									response.reject(er);
								} else {
									var str = data.toStringUtf8();
									data = undefined;
									er  = undefined;
									try {
										data = JSON.parse(str);
										response.resolve(data);
									} catch (err) { er = err; }
									if (typeof(er) !== "undefined") {
										response.reject(er);
									}
								}
							});
						break;
						case "document":
							httpRequest.response.toArrayBuffer(function (er, data) {
								if (typeof(er) !== "undefined") {
									response.reject(er);
								} else {
									var node = document.createElement("div");
									node.innerHTML  = data.toStringUtf8();
									response.resolve(node);
								}
							});
						break;
						case "text":
							httpRequest.response.toArrayBuffer(function (er, data) {
								if (typeof(er) !== "undefined") {
									response.reject(er);
								} else {
									response.resolve(data.toStringUtf8());
								}
							});
						break;
						case "arraybuffer":
							httpRequest.response.toArrayBuffer(function (er, data) {
								if (typeof(er) !== "undefined") {
									response.reject(er);
								} else {
									response.resolve(data);
								}
							});
						break;
					}
				} else {
					switch (type) {
						case "blob":
							response.resolve(new Blob([httpRequest.response], (params || { type: "application/octet-stream" })));
						break;
						case "json":
							var str = httpRequest.response;
							data = undefined;
							er  = undefined;
							try {
								data = JSON.parse(str);
								response.resolve(data);
							} catch (err) { er = err; }
							if (typeof(er) !== "undefined") {
								response.reject(er);
							}
						break;
						case "document":
							node = document.createElement("div");
							node.innerHTML  = httpRequest.response;
							response.resolve(node);
						break;
						case "text":
							response.resolve(httpRequest.response);
						break;
						case "arraybuffer":
							response.resolve(httpRequest.response.toArrayBufferFromUtf8());
						break;
					}
				}
				return new Application.Promise(function (resolve, reject) {
				  response.then(function (data) {
					if (httpRequest.status === 200 || config.ignoreStatusCode) {
					  resolve(data);
					} else {
					  var er = Error(
						httpRequest.statusText ?
						('Status '+ httpRequest.status + ': ' + httpRequest.statusText) :
						("Response Status is " + httpRequest.status)
					  );
					  er.httpRequest = app;
					  er.httpResponse = data;
					  reject(er);
					}
				  }, function (er) {
					er.httpRequest = app;
					reject(er);
				  });
				});
			}
		}, "");

		/**
		 * current XMLHttpRequest timeout in seconds
		 * @method timeout
		 * @memberof RequestModule#
		 * @returns {number}
		 */

		/**
		 * update XMLHttpRequest timeout in seconds
		 * @method timeout
		 * @memberof RequestModule#
		 * @param {number} seconds set 0 to unlimited
		 * @returns {RequestModule}
		 */
		app.bind("timeout", function (seconds) {
		  if (typeof(seconds) === "number") {
			httpRequest.timeout = seconds || 0;
			return app;
		  }
		  return httpRequest.timeout || 0;
		});

		/**
		 * current XMLHttpRequest withCredentials status
		 * @method withCredentials
		 * @memberof RequestModule#
		 * @returns {boolean}
		 */
		
		/**
		 * update XMLHttpRequest withCredentials flag
		 * @method withCredentials
		 * @memberof RequestModule#
		 * @param {boolean} status
		 * @returns {RequestModule}
		 */
		app.bind("withCredentials", function (status) {
		  if (typeof(status) === "boolean") {
			httpRequest.withCredentials = !!status;
			return app;
		  }
		  return !!httpRequest.withCredentials;
		});

		/**
		 * Client has been created. open() not called yet.
		 * @alias RequestModule.READY_STATE_UNSENT
		 * @type {number}
		 * @default 0
		 */
		app.READY_STATE_UNSENT = 0;
		/**
		 * open() has been called.
		 * @alias RequestModule.READY_STATE_OPENED
		 * @type {number}
		 * @default 1
		 */
		app.READY_STATE_OPENED = 1;
		/**
		 * send() has been called, and headers and status are available.
		 * @alias RequestModule.READY_STATE_HEADERS_RECEIVED
		 * @type {number}
		 * @default 2
		 */
		app.READY_STATE_HEADERS_RECEIVED = 2;
		/**
		 * Downloading; responseText holds partial data.
		 * @alias RequestModule.READY_STATE_LOADING
		 * @type {number}
		 * @default 3
		 */
		app.READY_STATE_LOADING = 3;
		/**
		 * Downloading is done
		 * @alias RequestModule.READY_STATE_DONE
		 * @type {number}
		 * @default 4
		 */
		app.READY_STATE_DONE = 4;


		/**
		 * @method readyState
		 * @memberof RequestModule#
		 * @returns {RequestModule.readyStateType}
		 */
		app.bind("readyState", function (int) {
		  return httpRequest.readyState;
		});

		httpRequest.onreadystatechange = function () {
		  app.emit('onReadyState', [httpRequest.readyState, httpRequest.status]);
		};

		/**
		 * @method status
		 * @memberof RequestModule#
		 * @returns {XMLHttpRequest.status}
		 */
		app.bind("status", function (int) {
		  return httpRequest.status;
		});

		/**
		 * @method statusText
		 * @memberof RequestModule#
		 * @returns {XMLHttpRequest.statusText}
		 */
		app.bind("statusText", function (int) {
		  return httpRequest.statusText;
		});


		/**
		 * @method async
		 * @memberof RequestModule#
		 * @returns {RequestModule.RequestConfig.async}
		 * @see RequestModule.RequestConfig
		 */
		/**
		 * @method async
		 * @memberof RequestModule#
		 * @param {boolean} status enable/disable XMLHttpRequest async mode
		 * @returns {RequestModule}
		 */
		app.bind("async", function (bool) {
			if (typeof(bool) !== "undefined") {
				config.async = !!bool;
				return app;
			}
			return config.async;
		});

		/**
		 * @method method
		 * @memberof RequestModule#
		 * @returns {RequestModule.RequestConfig.method}
		 * @see RequestModule.RequestConfig
		 */
		/**
		 * @method method
		 * @memberof RequestModule#
		 * @param {string} status XMLHttpRequest method name, default is `"GET"`
		 * @returns {RequestModule}
		 */
		app.bind("method", function (method) {
			if (typeof(method) === "string") {
				config.method = method;
				return app;
			}
			return config.method;
		});

		/**
		 * @method url
		 * @memberof RequestModule#
		 * @returns {RequestModule.RequestConfig.url}
		 * @see RequestModule.RequestConfig
		 *//**
		 * @memberof RequestModule#
		 * @method url
		 * @param {string} url setup the url that should be processed
		 * @returns {RequestModule}
		 */
		app.bind("url", function (url) {
			if (typeof(url) === "string") {
				config.url = url;
				return app;
			}
			return config.url;
		});

		/**
		 * @method open
		 * @memberof RequestModule#
		 * @param {string} [method="GET"]
		 * @param {string} [url]
		 * @param {boolean} [async]
		 * @param {number} [timeout] request timeout in seconds
		 * @returns {RequestModule}
		 */
		app.bind("open", function (method, url, async, timeout) {
			if (method && typeof(url) === "undefined" && typeof(async) === "undefined") {
				url = method;
				method = undefined;
			}
			app.timeout(timeout);
			config.opened   = true;
			httpRequest.open(method || config.method, url || config.url, async || config.async);
			return app;
		});

		/**
		 * @method send
		 * @memberof RequestModule#
		 * @param {string|FormData|MediaStream} [data='']
		 * @param {("asFormData"|"json")} [type=null]
		 * @returns {RequestModule}
		 */
		app.bind("send", function (data, type) {
			if (!config.opened) {
				app.open();
			}
			if (config.isSent) {
				console.warn("Error: the request is sended twice", app, app.request());
				return app;
			}
			config.isSent   = true;
			if (type === "asFormData") {
				// convert data to form data
				var fData = new FormData();
				var i;
				for (i in data) {
					fData.append(i, data[i]);
				}
				httpRequest.send(fData);
			} else if (type === "json") {
				httpRequest.send(JSON.stringify(data));
			} else {
				httpRequest.send(typeof(data) === "undefined" ? null : data);
			}
			return app;
		});

		/**
		 * @method headers
		 * @memberof RequestModule#
		 * @returns {string}
		 */
		app.bind("headers", function () {
		  return httpRequest.getAllResponseHeaders();
		});

		/**
		 * set a new header
		 * @method headers
		 * @memberof RequestModule#
		 * @param {string} name
		 * @param {string} value
		 * @returns {RequestModule}
		 */
		app.bind("header", function (name, value) {
			httpRequest.setRequestHeader(name, value);
			return app;
		});

		return app;
	};
	module.exports  = Request;
});