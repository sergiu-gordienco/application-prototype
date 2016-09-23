var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange || function () { console.error('IDBKeyRange is not supported'); };


module.exports  = function (conf) {
	var err_compile, methods;
	try {
		var promise = Application.Promise();
		var db = false;
		var config	= conf || {
			dbName	: "",
			table	: "references"
		};
		var transaction		= function (operation, params, s) {
			var CONST_readwrite = "readwrite";
			var dbName = config.dbName || "browserSession";
			if (typeof(IDBTransaction.READ_WRITE) !== "undefined") {
				CONST_readwrite	= IDBTransaction.READ_WRITE;
			}

			var objectStore, trans;
			if (s === false) {
				trans = db.transaction([config.table]);
			} else {
				trans = db.transaction([config.table], (typeof(s) === "undefined" ? CONST_readwrite : s));
			}
			objectStore	= trans.objectStore(config.table);
			var req;
			switch (operation) {
				case "add":
					req = objectStore.add(params);
					break;
				case "delete":
					req = objectStore.delete(params);
					break;
				case "get":
					req = objectStore.get(params);
					break;
				case "find":
					req = {
						onsuccess	: function () {},
						onerror		: function () {}
					};
					var result = [];
					trans.oncomplete	= function () {
						req.onsuccess({
							target : {
								result : result
							}
						});
					};
					var cursorRequest	= objectStore.openCursor();
					cursorRequest.onerror = function(error) {
						console.log(error);
					};
					cursorRequest.onsuccess = (
						typeof(params) === "function" ? function (evt) {
							var cursor = evt.target.result;
							if (cursor) {
								if (params(cursor.value.k, cursor.value.v)) {
									result.push(cursor.value);
								}
								cursor.continue();
							}
						} : function (evt) {
							var cursor = evt.target.result;
							if (cursor) {
								result.push(cursor.value);
								cursor.continue();
							}
						}
					);
					break;
			}
			return req;
		};
		var transactionPromise	= function (operation, params, s) {
			return new Application.Promise(function (resolve, reject) {
				var er;
				try {
					var req = transaction(operation, params, s);
					req.onsuccess = function (event) {
						resolve(event);
					};
					req.onerror	= function (event) {
						reject(event);
					};
				} catch (er) {
					reject(er);
				}
			});
		};
		methods	= {
			setItem	: function (key, value) {
				return transactionPromise("add", {
					k : key,
					v : value
				});
			},
			removeItem	: function (key) {
				return transactionPromise("delete", key);
			},
			getItem	: function (key) {
				return transactionPromise("get", key);
			},
			filter	: function (filter) {
				return transactionPromise("find", filter);
			}
		};
		var request = indexedDB.open(config.dbName, 2);
		console.info(request);
		request.onerror = function(event) {
			promise.reject(event);
			console.log("error", event);
		};
		request.onupgradeneeded = function(event) {
			db = event.target.result;
			var objectStore = db.createObjectStore(config.table, { keyPath: "k" });
			objectStore.createIndex("v", "v", { unique: false });
			objectStore.transaction.oncomplete = function(event) {
				// Store values in the newly created objectStore.
				// TODO emit init
				promise.resolve(event);
			};
		};
		request.onsuccess = function(event) {
			db = event.target.result;
			promise.resolve(event);
		};
		methods.initialization	= promise;
	} catch (err_compile) {
		methods.initialization	= Application.Promise.reject(err_compile);
	}
	return methods;
};
