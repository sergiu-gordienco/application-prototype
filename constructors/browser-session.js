/* jshint -W014 */
/* jshint -W002 */
var sessionDbConnection = false;
var dbConnectionBuilder 	= false;

/**
 * browserSessionBuilder description
 * @interface BrowserSessionModule
 * @param  {string|object} objectStoreArg name or object of strategyStore
 * @param {object} [objectStoreConf]
 */
var browserSessionBuilder	= function (objectStoreArg, objectStoreConf) {
	var app	= new ApplicationPrototype();
	var loader = Application.Promise();
	if (typeof(objectStoreArg) === "string") {
		var strategyName = objectStoreArg;
		objectStoreArg	= module.require('strategy/'+strategyName).then(function (strategyStore) {
			loader.resolve(new strategyStore(objectStoreConf));
		}, function (err) {
			loader.reject(err);
		});
	} else {
		if (typeof(objectStoreArg) === "object") {
			objectStoreArg.initialization.then(function () {
				loader.resolve(objectStoreArg);
			}, function (err) {
				loader.reject(err);
			});
		} else {
			loader.resolve(sessionDbConnection);
		}
	}
	loader.then(function (objectStore) {
		var newId	= ((function () {
			var k = 0;
			return function (p) {
				return (p || '')
					+ (new Date().valueOf().toString(36))
					+ '_'
					+ (++k).toString(36)
					+ '_'
					+ Math.floor(Math.random() * 100000000).toString(36);
			};
		})());
		;((function () {
			var sid = newId('sid_');
			app.bind("id", function () {
				return sid;
			}, "");
		})());
		app.bind("getItem",
			/**
			 * @method getItem
			 * @memberof BrowserSessionModule
			 * @param {string} key 
			 * @param {boolean} returnResult 
			 * @returns {Promise<any>}
			 */
			function (key, returnResult) {
			return new Application.Promise(function (resolve, reject) {
				objectStore.getItem(key).then(function (event) {
					resolve(
						(typeof(event.target.result) === "object" && event.target.result && !returnResult)
						? event.target.result.v : event.target.result
					);
				}, function (event) {
					reject(event);
				});
			});
		}, "");
		app.bind("setItem",
			/**
			 * @method setItem
			 * @memberof BrowserSessionModule
			 * @param {string} key 
			 * @param {any} val
			 * @param {boolean} returnResult 
			 * @returns {Promise<any>}
			 */
			function (key, val, returnResult) {
			return new Application.Promise(function (resolve, reject) {
				app.getItem(key, true).then(function (result) {
					var setValue = function () {
						objectStore.setItem(key, val).then(function (event) {
							resolve(
								(typeof(event.target.result) === "object" && event.target.result && !returnResult)
								? event.target.result.v : event.target.result
							);
							app.emit("setItem::"+key, [key, val]);
						}, function (event) {
							reject(event);
						});
					};
					if (typeof(result) !== undefined) {
						app.removeItem(key).then(function () {
							setValue();
						}, function (event) {
							reject(event);
						});
					} else {
						setValue();
					}
				}, function (event) {
					reject(event);
				});
			});
		});
		app.bind("removeItem",
			/**
			 * @method removeItem
			 * @memberof BrowserSessionModule
			 * @param {string} key 
			 * @param {boolean} returnResult 
			 * @returns {Promise<any>}
			 */
			function (key, returnResult) {
			return new Application.Promise(function (resolve, reject) {
				objectStore.removeItem(key).then(function (event) {
					resolve(
						(typeof(event.target.result) === "object" && event.target.result && !returnResult)
						? event.target.result.v : event.target.result
					);
					app.emit("removeItem::"+key, [key]);
				}, function (event) {
					reject(event);
				});
			});
		});
		app.bind("getItems",
			/**
			 * @method getItems
			 * @memberof BrowserSessionModule
			 * @param {string[]} keys
			 * @returns {Promise<Object<string,any>>}
			 */
			function (keys) {
			return new Application.Promise(function (resolve, reject) {
				Application.Promise.all(keys.map(function (key) {
					return app.getItem(key);
				})).then(function (values) {
					var result = {};
					keys.forEach(function (key, index) {
						result[key]	= values[index];
					});
					resolve(result);
				}, function (event) {
					reject(event);
				});
			});
		});

		app.bind("setItems",
			/**
			 * @method setItems
			 * @memberof BrowserSessionModule
			 * @param {Object<string,any>} obj
			 * @returns {Promise<any[]>}
			 */
			function (obj) {
			var i, arr = [];
			for (i in obj) {
				arr.push((function (key, value) {
					return app.setItem(key, value);
				})(i, obj[i]));
			}
			return Application.Promise.all(arr);
		});

		app.bind("removeItems",
			/**
			 * @method removeItems
			 * @memberof BrowserSessionModule
			 * @param {string[]} keys
			 * @returns {Promise<any[]>}
			 */
			function (keys) {
			return Application.Promise.all(keys.map(function (key) {
				return app.removeItem(key);
			}));
		});

		app.bind("findItems",
			/**
			 * @method findItems
			 * @memberof BrowserSessionModule
			 * @param {function(any):boolean} filter
			 * @returns {Promise<Object<string,any>>}
			 */
			function (filter) {
			return new Application.Promise(function (resolve, reject) {
				objectStore.filter(filter).then(function (event) {
					var result = {};
					event.target.result.forEach(function (row) {
						result[row.k] = row.v;
					});
					resolve(result);
				}, function (event) {
					reject(event);
				});
			});
		});


		app.bind("clear",
			/**
			 * @method clear
			 * @memberof BrowserSessionModule
			 * @returns {Promise<any>}
			 */
			function () {
			return new Application.Promise(function (resolve, reject) {
				objectStore.filter(function (k ,v) {
					var er;
					try {
						app.removeItem(k);
						return true;
					} catch (er) {}
				}).then(function (event) {
					var result = {};
					event.target.result.forEach(function (row) {
						result[row.k] = row.v;
					});
					resolve(result);
				}, function (event) {
					reject(event);
				});
			});
		});
	}, function (err) {
		console.error(err);
		app.emit('error', [err]);
	});
	return Application.Promise(function (resolve, reject) {
		loader.then(function (store) {
			resolve(app);
		}, function (err) {
			reject(err);
		})
	});
};

module.require('strategy/indexed-db').then(function (dbConnectionBuilder) {
	var loader = new Application.Promise();
	var _sessionConnection;
	var er;
	try {
		_sessionConnection	= dbConnectionBuilder({ name: "browserDefaultSession", table: "references" });
	} catch (er) {}

	_sessionConnection.initialization.then(function () {
		loader.resolve(_sessionConnection);
	}, function (err) {
		console.error(err);
		var er;
		try {
			console.warn("IndexDB not supported, fallback to localStorage or polyfill emulation");
			module.require('strategy/local-storage').then(function (strategyStore) {
				_sessionConnection	= strategyStore();
				_sessionConnection.initialization.then(function () {
					loader.resolve(_sessionConnection);
				}, function (event) {
					loader.reject(event);
				});
			}, function (err) {
				loader.reject(err);
			});
		} catch (er) {
			loader.reject(er);
		}
	});

	loader.then(function (_sessionConnection) {
		sessionDbConnection	= _sessionConnection;
		if (typeof(module) === "object" && module) {
			module.exports	= browserSessionBuilder;
		} else if (typeof(window) === "object" && window) {
			window.browserSession	= new browserSessionBuilder();
		}
	}, function (err) {
		console.error("browserSession Error", err);
	});


	// browserSessionBuilder.dbConnectionBuilder	= dbConnectionBuilder;
}).catch(function (reason) {
 console.error(reason);
});
