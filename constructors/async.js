var async	= function () {
	var life = 0;
	var waited	= 0;
	var recieved	= 0;
	var responsesId	= [];
	var responses	= {};
	var context = {};
	var app	= new ApplicationPrototype();


	app.bind("index", ((function () {
		var index = 0;
		return function () {
			return life + '::' + ( ++index );
		};
	})()), '');

	app.bind("recieve", function (id, args) {
		if (id) {
			if (id.indexOf(life+'::') !== 0) {
				return false;
			}
			responses[id]	= args;
		}
		recieved += 1;
		if (recieved == waited) {
			app.emit("done");
		}
		return true;
	}, 'on af st');
	app.bind("wait", function () {
		waited += 1;
	}, 'on af st');
	app.bind("reserve", function () {
		waited += 1;
		return app.index();
	}, 'on af st');
	app.bind("run", function (funct, args, context) {
		var id = app.index();
		responsesId.push(id);
		waited+=1;
		funct.apply(context, args);
		return id;
	}, 'on af st');
	app.bind("flush", function (funct, args) {
		life		+= 1;
		responses	= {};
		responsesId	= [];
		recieved	= 0;
		waited		= 0;
	}, 'on af st');

	app.bind('processing', function () {
		return ( waited - recieved );
	}, '');

	app.bind('responses', function (id) {
		if (id === true) {
			return responsesId.map(function (v) {
				return (v in responses ? responses[v] : undefined);
			});
		}
		return responses;
	});

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

	app.bind('done', function (cb) {
		if (typeof(cb) === "function") {
			app.on('done', cb);
			if (recieved === waited && recieved) {
				cb.apply(app, []);
			}
		}
	});

	return app;
};

async.flow	= function (ops, cb, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		app.done(cb);
		var c = {};
		timeout		= timeout || 0;
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
						app.recieve(id, arguments);
					};
					var err;
					setTimeout(function () {
						try {
							op[0].apply(op[2] || c, ar);
						} catch (err) {
							app.recieve(id, err);
							app.emit('error', err);
						}
					}, timeout);
				}
			}
		};
		app.on('onRecieve', function () {
			// console.log("tick");
			tick();
		});
		tick();
		return app;
	}
	return;
};

async.waterfall	= function (ops, cb, parralel, timeout) {
	if (typeof(ops) !== "undefined" && Array.isArray(ops)) {
		var app = new async();
		app.done(cb);
		var c = {};
		timeout		= timeout || 0;
		if (typeof(parralel) !== "number") {
			parralel	= 27;
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
						app.recieve(id, arguments);
					};
					var err;
					setTimeout(function () {
						try {
							op[0].apply(op[2] || c, ar);
						} catch (err) {
							app.recieve(id, err);
							app.emit('error', err);
						}
					}, timeout);
				}
				return true;
			}
			return false;
		};
		app.on('onRecieve', function () {
			// console.log("tick");
			while (( parralel === 0 || parralel > app.processing()) && tick()) {
				// true;
			}
		});
		tick();
		return app;
	}
	return;
};


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
				var rr	= function (v) {
					ret[ri]	= v;
					app.recieve();
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.recieve(id, err);
						app.emit('error', err);
					}
				}, timeout);
			}
		};
		app.on('onRecieve', function () {
			tick();
		});
		tick();
		return app;
	}
	return;
};

async.waterfall.map	= function (ops, ev, cb, parralel, timeout) {
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
			ret[ops.length - 1]	= undefined;
		} else {
			app.emit('done');
		}
		var tick	= function () {
			if ( i < ops.length) {
				var op	= ops[i++];
				var id	= app.reserve();
				var ri	= i-1;
				var rr	= function (v) {
					ret[ri]	= v;
					app.recieve();
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.recieve(id, err);
						app.emit('error', err);
					}
				}, timeout);
			}
		};
		app.on('onRecieve', function () {
			while (( parralel === 0 || parralel > app.processing()) && tick()) {
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
				var rr	= function (v) {
					if (v) ret.push(op);
					app.recieve();
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.recieve(id, err);
						app.emit('error', err);
					}
				}, timeout);
			}
		};
		app.on('onRecieve', function () {
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
				var rr	= function (v) {
					if (v) ret.push(op);
					app.recieve();
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.recieve(id, err);
						app.emit('error', err);
					}
				}, timeout);
				return true;
			}
			return false;
		};
		app.on('onRecieve', function () {
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
				var rr	= function (v) {
					app.recieve();
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.recieve(id, err);
						app.emit('error', err);
					}
				}, timeout);
				return true;
			}
			return false;
		};
		app.on('onRecieve', function () {
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
				var rr	= function (v) {
					app.recieve();
				};
				var err;
				setTimeout(function () {
					try {
						ev.apply(ops, [rr, op, ri, ops]);
					} catch (err) {
						app.recieve(id, err);
						app.emit('error', err);
					}
				}, timeout);
				return true;
			}
			return false;
		};
		app.on('onRecieve', function () {
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
		a1.on('onRecieve', function () {
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
		a1.on('onRecieve', function () {
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
