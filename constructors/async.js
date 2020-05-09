/**
 * @callback AsyncConstructor
 * @memberof module:async
 * @returns {module:async.Async}
 */

/**
 * Module used processing data asynchronous
 * @example
 * Application.require('async').then(function (asyncOperations) {
 *	// @TODO
 * }, console.error);
 * @module async
 * @returns {module:async.AsyncConstructor}
 * @see module:async~async
 */

/**
 * @memberof module:async
 * @class
 * @name Async
 */
var async	= function () {
	var life = 0;
	var waited	= 0;
	var received	= 0;
	var responsesId	= [];
	var responses	= {};
	var context = {};
	var app	= new ApplicationPrototype();


	/**
	 * return unique index identifier for an operation
	 * @method index
	 * @memberof module:async.Async#
	 * @returns {string}
	 */
	app.bind("index", ((function () {
		var index = 0;
		return function () {
			return life + '::' + ( ++index );
		};
	})()), '');


	/**
	 * method used for return result for an operation,
	 * returns `true` if value was accepted.
	 * if operation already obtained a value
	 * then value is not accepted and it returns `false`
	 * @method receive
	 * @memberof module:async.Async#
	 * @param {string} id obtained from {@link module:async.Async#index}
	 * @param {any} args
	 * @returns {boolean}
	 */
	app.bind("receive", function (id, args) {
		if (id) {
			if (id.indexOf(life+'::') !== 0) {
				return false;
			}
			responses[id]	= args;
		}
		received += 1;
		if (received == waited) {
			app.emit("done");
		}
		return true;
	}, 'on af st');

	/**
	 * require to wait an additional operation
	 * @method wait
	 * @memberof module:async.Async#
	 */
	app.bind("wait", function () {
		waited += 1;
	}, 'on af st');

	/**
	 * require to reserve index {@link module:async.Async#index} for an additional operation
	 * @method reserve
	 * @memberof module:async.Async#
	 * @returns {string}
	 */
	app.bind("reserve", function () {
		waited += 1;
		return app.index();
	}, 'on af st');

	/**
	 * require to run an operation
	 * @method run
	 * @memberof module:async.Async#
	 * @param {function():void} func function that should be executed
	 * @param {any[]} args 
	 * @param {object} context
	 * @returns {string}
	 */
	app.bind("run", function (func, args, context) {
		var id = app.index();
		responsesId.push(id);
		waited+=1;
		func.apply(context, args);
		return id;
	}, 'on af st');

	/**
	 * reset operation processing
	 * @method flush
	 * @memberof module:async.Async#
	 */
	app.bind("flush", function () {
		life		+= 1;
		responses	= {};
		responsesId	= [];
		received	= 0;
		waited		= 0;
	}, 'on af st');

	/**
	 * return how many operations are processing right now
	 * @method processing
	 * @memberof module:async.Async#
	 * @returns {number}
	 */
	app.bind('processing', function () {
		return ( waited - received );
	}, '');

	/**
	 * return operations' responses
	 * @method responses
	 * @memberof module:async.Async#
	 * @param {boolean} [returnUnknownResponses=false]
	 * @returns {any[][]}
	 */
	app.bind('responses', function (id) {
		if (id === true) {
			return responsesId.map(function (v) {
				return (v in responses ? responses[v] : undefined);
			});
		}
		return responses;
	});

	/**
	 * return all errors found in responses
	 * @method errors
	 * @memberof module:async.Async#
	 * @returns {Error[]}
	 */
	app.bind('errors', function () {
		var errs	= [];
		responsesId.forEach(function (id) {
			var r = responses[id];
			if (r instanceof Error) {
				errs.push(r);
			} else {
				var i;
				for (i=0;i<r.length;i++) {
					if (r[i] instanceof Error) {
						errs.push(r[i]);
					}
				}
			}
		});
		return errs;
	});

	/**
	 * register a callback to be called when processing is done 
	 * @method done
	 * @memberof module:async.Async#
	 * @param {function():void} cb
	 */
	app.bind('done', function (cb) {
		if (typeof(cb) === "function") {
			app.on('done', cb);
			if (received === waited && received) {
				cb.apply(app, []);
			}
		}
	});

	return app;
};

/**
 * @typedef {Array} module:async.Async~Operation
 * @property {module:async.Async~OperationCallback} 0
 * @property {module:async.Async~OperationArgs} 1
 * @property {module:async.Async~OperationContext} 2
 * @property {module:async.Async~OperationCallbackIndex} 3 
 */

/**
 * @typedef {Array<Array<Function, any[], object, number>>} module:async.Async~Operation
 */

/**
 * a function that represents the operation itself, it have as argument `next` callback, by default it is first.
 * @typedef {Function} module:async.Async~OperationCallback
 */

/**
 * list if arguments passed to `OperationCallback`.
 * @typedef {any[]} module:async.Async~OperationArgs
 */

/**
 * context that should be used in `OperationCallback`. Default value is `{}`.
 * @typedef {object} module:async.Async~OperationContext
 */

/**
 * index of `next()` callback in list of `OperationCallback`'s arguments. Default value is `0`.
 * @typedef {number} module:async.Async~OperationCallbackIndex
 */

/**
 * @typedef {module:async.Async~Operation[]} module:async.Async~Operations
 */

/**
 * @callback module:async.processCallback
 * @param {function(Error?): void} next
 * @param {any} item
 * @param {number} index
 * @param {any[]} items
 */

/**
 * @callback module:async.doneCallback
 * @this module:async.Async
 */

/**
 * @method flow
 * @memberof module:async.
 * @param {module:async.Async~Operations} operations
 * @param {module:async.doneCallback} cb
 * @param {number} [timeout=0] timeout between operations
 * @returns {module:async.Async}
 */
async.flow	= function (operations, cb, timeout) {
	if (typeof(operations) !== "undefined" && Array.isArray(operations)) {
		var app = new async();
		app.done(cb);
		var c = {};
		timeout		= timeout || 0;
		var i = 0;
		if (operations.length === 0) {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < operations.length) {
				var op	= operations[i++];
				if (op) {
					var ar	= op[1] || [];
					var ai	= op[3] || 0;
					var id	= app.reserve();
					ar[ai]	= function () {
						app.receive(id, arguments);
					};
					var err;
					setTimeout(function () {
						try {
							op[0].apply(op[2] || c, ar);
						} catch (err) {
							app.receive(id, err);
							app.emit('error', [err]);
						}
					}, timeout);
				}
			}
		};
		app.on('onReceive', function () {
			// console.log("tick");
			tick();
		});
		tick();
		return app;
	}
	return;
};


/**
 * @method waterfall
 * @memberof module:async.
 * @param {module:async.Async~Operations} operations
 * @param {module:async.doneCallback} cb
 * @param {number} [parallel=27] number of operations that can be done in parallel
 * @param {number} [timeout=0] timeout between operations
 * @returns {module:async.Async}
 */
async.waterfall	= function (ops, cb, parallel, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		app.done(cb);
		var c = {};
		timeout		= timeout || 0;
		if (typeof(parallel) !== "number") {
			parallel	= 27;
		}
		var i = 0;
		if (ops.length === 0) {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				if (op) {
					var ar	= op[1] || [];
					var ai	= op[3] || 0;
					var id	= app.reserve();
					ar[ai]	= function () {
						app.receive(id, arguments);
					};
					var err;
					setTimeout(function () {
						try {
							op[0].apply(op[2] || c, ar);
						} catch (err) {
							app.receive(id, err);
							app.emit('error', [err]);
						}
					}, timeout);
				}
				return true;
			}
			return false;
		};
		app.on('onReceive', function () {
			// console.log("tick");
			while (( parallel === 0 || parallel > app.processing()) && tick()) {
				// true;
			}
		});
		tick();
		return app;
	}
	return;
};




/**
 * @method map
 * @memberof module:async.
 * @param {any[]} operations
 * @param {module:async.processCallback}
 * @param {module:async.doneCallback} cb
 * @param {number} [timeout=0] timeout between operations
 * @returns {module:async.Async}
 */
/**
 * @method flow·map
 * @memberof module:async.
 * @param {any[]} operations
 * @param {module:async.processCallback}
 * @param {module:async.doneCallback} cb
 * @param {number} [timeout=0] timeout between operations
 * @returns {module:async.Async}
 */

async.map = async.flow.map	= function (ops, ev, cb, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		var c = {};
		timeout		= timeout || 0;
		var i = 0;
		var ret		= [];
		app.done(function () {
			cb.apply(app,[ret]);
		});
		if (ops.length) {
			ret[ops.length - 1]	= undefined;
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (v, err) {
					if (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					} else {
						ret[ri]	= v;
						app.receive();
					}
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					}
				}, timeout);
			}
		};
		app.on('onReceive', function () {
			tick();
		});
		tick();
		return app;
	}
	return;
};


/**
 * @method waterfall·map
 * @memberof module:async.
 * @param {any[]} operations
 * @param {module:async.processCallback}
 * @param {module:async.doneCallback} cb
 * @param {number} [parallel=27] number of operations that can be done in parallel
 * @param {number} [timeout=0] timeout between operations
 * @returns {module:async.Async}
 */

async.waterfall.map	= function (ops, ev, cb, parallel, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		var c = {};
		timeout		= timeout || 0;
		if (typeof(parallel) !== "number") {
			parallel	= 27;
		}
		var i = 0;
		var ret		= [];
		app.done(function () {
			cb.apply(app,[ret]);
		});
		if (ops.length) {
			ret[ops.length - 1]	= undefined;
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (v, err) {
					if (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					} else {
						ret[ri]	= v;
						app.receive();
					}
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					}
				}, timeout);
			}
		};
		app.on('onReceive', function () {
			while (( parallel === 0 || parallel > app.processing()) && tick()) {
				// true;
			}
		});
		tick();
		return app;
	}
	return;
};


async.filter = async.flow.filter	= function (ops, ev, cb, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		var c = {};
		timeout		= timeout || 0;
		var i = 0;
		var ret		= [];
		app.done(function () {
			cb.apply(app,[ret]);
		});
		if (ops.length) {
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (v, err) {
					if (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					} else {
						if (v) ret.push(op);
						app.receive();
					}
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					}
				}, timeout);
			}
		};
		app.on('onReceive', function () {
			tick();
		});
		tick();
		return app;
	}
	return;
};

async.waterfall.filter	= function (ops, ev, cb, parralel, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		var c = {};
		timeout		= timeout || 0;
		if (typeof(parralel) !== "number") {
			parralel	= 27;
		}
		var i = 0;
		var ret		= [];
		app.done(function () {
			cb.apply(app,[ret]);
		});
		if (ops.length) {
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (v, err) {
					if (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					} else {
						if (v) ret.push(op);
						app.receive();
					}
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					}
				}, timeout);
				return true;
			}
			return false;
		};
		app.on('onReceive', function () {
			// debugger;
			while (( parralel === 0 || parralel > app.processing()) && tick()) {
				// true;
			}
		});
		tick();
		return app;
	}
	return;
};



async.forEach = async.flow.forEach	= function (ops, ev, cb, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		var c = {};
		timeout		= timeout || 0;
		var i = 0;
		app.done(function () {
			cb.apply(app,[ops]);
		});
		if (ops.length) {
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (err) {
					if (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					} else {
						app.receive();
					}
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					}
				}, timeout);
				return true;
			}
			return false;
		};
		app.on('onReceive', function () {
			tick();
		});
		tick();
		return app;
	}
	return;
};

async.waterfall.forEach	= function (ops, ev, cb, parralel, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		var c = {};
		timeout		= timeout || 0;
		if (typeof(parralel) !== "number") {
			parralel	= 27;
		}
		var i = 0;
		app.done(function () {
			cb.apply(app,[ops]);
		});
		if (ops.length) {
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (err) {
					if (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					} else {
						app.receive();
					}
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.receive(id, err);
						app.emit('error', [err]);
					}
				}, timeout);
				return true;
			}
			return false;
		};
		app.on('onReceive', function () {
			while (( parralel === 0 || parralel > app.processing()) && tick()) {
				// true;
			}
		});
		tick();
		return app;
	}
	return;
};




async.test	= {};
async.test.flow	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var ops = [];
		var i = 0;
		while (i++ < n) {
			ops.push([(function (k) {
				return function (cb) {
					cb(k);
				};
			})(i + 0)]);
		}
		console.log(ops.length);
		var t0 = new Date().valueOf();
		var a1 = async.flow(ops, function () {
			console.log((new Date().valueOf() - t0)/(n * 1000));
		});
		var k=0;
		a1.on('onError', function (err) {
			console.error(err);
		});
		a1.on('onReceive', function () {
			console.log(k++);
		});
		window.a1 = a1;
	});
};

async.test.waterfall	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var ops = [];
		var i = 0;
		while (i++ < n) {
			ops.push([(function (k) {
				return function (cb) {
					cb(k);
				};
			})(i + 0)]);
		}
		console.log(ops.length);
		var t0 = new Date().valueOf();
		var a1 = async.waterfall(ops, function () {
			console.log((new Date().valueOf() - t0)/(n * 1000));
		}, 69);
		var k=0;
		a1.on('onError', function (err) {
			console.error(err);
		});
		a1.on('onReceive', function () {
			console.log(k++);
		});
		window.a1 = a1;
	});
};
async.test.map = async.test.flow.map	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.flow.map(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.floor(Math.random() * 1000));
		}, function (r) {
			console.log("DONE", r);
		});
	});
};

async.test.waterfall.map	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.waterfall.map(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.floor(Math.random() * 1000));
		}, function (r) {
			console.log("DONE", r);
		});
	});
};


async.test.filter = async.test.flow.filter	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.flow.filter(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.random() > 0.5);
		}, function (r) {
			console.log("DONE ", r.length);
		});
	});
};

async.test.waterfall.filter	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.waterfall.filter(b, function (cb, v, i, arr) {
			console.log(i);
			cb(Math.random() > 0.5);
		}, function (r) {
			console.log("DONE ", r.length);
		});
	});
};

async.test.forEach = async.test.flow.forEach	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.flow.forEach(b, function (cb, v, i, arr) {
			console.log(i);
			cb();
		}, function (r) {
			console.log("DONE ", r.length);
		});
	});
};

async.test.waterfall.forEach	= function (n) {
	console.clear();
	global.require('async', function (async) {
		if (typeof(n) !== "number") n = 1000;
		var b = [];
		if (n)
			b[n - 1] = undefined;
		async.waterfall.forEach(b, function (cb, v, i, arr) {
			console.log(i);
			cb();
		}, function (r) {
			console.log("DONE ", r.length);
		});
	});
};




module.exports	= async;
