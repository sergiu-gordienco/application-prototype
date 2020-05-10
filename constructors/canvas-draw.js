module.exports = function (canvas, _config) {
	/**
 	* create an environment for canvas drawing
 	*/
	if (!canvas) {
		canvas  = document.createElement('canvas');
	}
	var context2d   = canvas.getContext('2d');
	var context	 = context2d;

	var now;

	if (window.performance && typeof(window.performance.now) === "function") {
		now = function () {
			return window.performance.now();
		};
	} else if (typeof(Date.now) === "function") {
		return Date.now();
	} else {
		now = function () {
			return new Date().valueOf();
		};
	}

	var app = new ApplicationPrototype();
	var keyGenerator= ((function () {
		var i = 0;
		return function () {
			i++;
			return i.toString(36) + '_' + Math.floor(Math.random() * 1000000000).toString(36);
		};
	})());
	_config = _config || {};
	var config      = {
		fps   : _config.fps || 40,
		fpsInterval : 1000 / ( _config.fps || 40 ),
		debug : _config.debug || false,
		animationFlags : {
			startTime: null,
			now: null,
			then: null,
			elapsed: null,
			drawing: false
		}
	};

	var resource	= {
		/**
	 	* set of canvas paths
	 	* @type {Array}
	 	*/
		paths   : [],
		animationStatus : false,
		animationRequest: false
	};

	app.debug = function (status) {
		if (typeof(status) !== "undefined") {
			config.debug = !!status;
		}
		return config.debug;
	};

	app.bind("context", function () {
		return context;
	}, "");
	app.bind("paths", function () {
		return resource.paths;
	}, "");
	app.bind("createPath", function (conf) {
		/**
		* createPath - create a generic path object
		* @return {pathObject}
		*/
		var path = new ApplicationPrototype();
		var config  = {
			id	  : keyGenerator(),
			isReady : true,
			groups  : [],
			coords  : [],
			vars    : {},
			operations  : []
		};
		((function () {
			var i;
			for (i in conf) {
				config[i]   = conf[i];
			}
		})());

		if (!Array.isArray(config.operations)) config.operations = [];

		config.operations = config.operations.map(function (operation) {
			if (!operation) return null;

			if (typeof(operation) !== "object") return null;

			if (!operation.operation) return null;

			if (typeof(operation.group) !== "string") operation.group = "";

			operation.id = operation.id || keyGenerator();

			return operation;
		}).filter(function (operation) {
			return !!operation;
		});

		path.bind("app", function () {
			return app;
		}, "");
		path.bind("config", function () {
			return config;
		}, "");
		path.bind("vars", function () {
			return config.vars;
		}, "");
		path.bind("groups", function () {
			return config.groups;
		}, "");
		path.bind("operationsRemoveByGroup", function (group) {
			config.operations = config.operations.filter(function (operation) {
				return operation.group !== group;
			});
			return config.operations;
		}, "");
		path.bind("operationsRemoveById", function (key) {
			config.operations = config.operations.filter(function (operation) {
				return operation.id !== key;
			});
			return config.operations;
		}, "");
		path.bind("operationsRemoveByKey", function (key) {
			console.warn("path.operationsRemoveByKey is deprecated from 2016.10.05");
			return path.operationsRemoveById(key);
		});
		path.bind("operationById", function (id) {
			return config.operations.filter(function (operation) {
				return operation.id === id;
			})[0];
		}, "");
		path.bind("operationsByGroup", function (group) {
			return config.operations.filter(function (operation) {
				return operation.group === group;
			});
		}, "");
		path.bind("operations", function (operation, params, key, group) {
			var i;
			var index = false;
			for (i=0;i<config.operations.length;i++) {
				if (config.operations[i].id === key) {
					index   = i;
				}
			}
			if (index !== false) {
				config.operations[index].operation  = operation || config.operations[index].operation;
				config.operations[index].params	 = params || config.operations[index].params;
				config.operations[index].group	  = group || config.operations[index].group;
				return path;
			} else {
				config.operations.push({
					operation   : operation,
					params	  : (params || []),
					id	 : key || keyGenerator(),
					group	   : group || ""
				});
				return path;
			}
		}, "");
		path.bind("coords", function (x,y) {
			if (typeof(x) === "number" && typeof(y) === "number") {
				var status = false;
				config.coords.forEach(function (coords) {
					if (coords.length === 4) {
						if (
							x >= coords[0]
							&&
							x <= coords[2] + 0.00000001
							&&
							y >= coords[1]
							&&
							y <= coords[3] + 0.00000001
						) {
							status = true;
						}
					}
				});
				return status;
			}
			return config.coords;
		}, "");
		path.bind("group", function (name, val) {
			if (typeof(val) === "undefined") {
				return config.groups.indexOf(name) !== -1;
			} else {
				if (val) {
					if (config.groups.indexOf(name) === -1) {
						config.groups.push(name);
					}
				} else {
					if (config.groups.indexOf(name) !== -1) {
						config.groups   = config.groups.filter(function (group) {
							return group !== name;
						});
					}
				}
				return path;
			}
		}, "");
		path.isReady = function (bool) {
			path.emit("onIsReady", [bool]);

			if (typeof(bool) !== "undefined") {
				config.isReady  = !!bool;
			}
			return config.isReady;
		};
		path.render = function (cb) {
			path.emit("onRender", []);
			var context = app.context();
			context.save();
			var er;
			var debug = app.debug();
			config.operations.forEach(function (operation) {
				try {
					var params = typeof(operation.params) === "function" ? (
						operation.params(path, operation, app)
					) : operation.params;
					if (typeof(operation.operation) === "function") {
						if (debug) {
							console.log("Operation: operations[" + operation.id + "](", (
								typeof(operation.params) === "function" ? (
									"@Function"
								) : ""
							), params + ")");
						}
						operation.operation.apply(
							path,
							params || []
						);
					} else if (typeof(context[operation.operation]) === "function") {
						if (debug) {
							console.log("Operation: Context." + operation.operation + "(", (
								typeof(operation.params) === "function" ? (
									"@Function"
								) : ""
							), params, ")");
						}
						context[operation.operation].apply(
							context,
							params || []
						);
					} else {
						if (debug) {
							console.log("Operation: Context." + operation.operation + " = ", (
								typeof(operation.params) === "function" ? (
									"@Function"
								) : ""
							), params);
						}
						context[operation.operation]	= params;
					}
				} catch (er) {
					console.error(er);
				}
			});
			context.restore();
			if (cb) cb();
		};
		app.emit("path-created", [path]);
		return path;
	}, "on");
	app.bind("path", function (conf) {
		var path = app.createPath(conf);
		resource.paths.push(path);
		return path;
	}, "");
	app.bind("pathById", function (id) {
		return resource.paths.filter(function (path) {
			return path.config().id === id;
		})[0];
	}, "");
	app.bind("group", function (name) {
		return resource.paths.filter(function (path) {
			return path.groups().indexOf(name) !== -1;
		});
	}, "");
	app.bind("imageSmoothingEnabled", function (bool) {
		if (typeof(bool) !== "undefined") {
			config.smoothing	= !!bool;
			[
				app.context()
			].forEach(function (context) {
				context.imageSmoothingEnabled	   = config.smoothing;
				context.mozImageSmoothingEnabled	= config.smoothing;
				context.webkitImageSmoothingEnabled = config.smoothing;
				context.msImageSmoothingEnabled	 = config.smoothing;
			});
		}
		return config.smoothing;
	}, "on");

	// TODO
	// ctx.fillStyle = "rgb(200,0,0)";
	// // sets the color to fill in the rectangle with
	// ctx.fillRect(10, 10, 55, 50);
	// // draws the rectangle at position 10, 10 with a width of 55 and a height of 50
	// CanvasRenderingContext2D.clearRect()
	// CanvasRenderingContext2D.fillRect()
	// CanvasRenderingContext2D.strokeRect()
	// CanvasRenderingContext2D.fillText()
	// CanvasRenderingContext2D.strokeText()
	// CanvasRenderingContext2D.measureText()
	// createCircle

	if (canvas.attrdata) {
		canvas.attrdata.CanvasDraw = app;
	}

	app.bind("canvas", function () {
		return canvas;
	}, "");
	app.bind("height", function (value) {
		if (typeof(value) === "number") {
			if (parseInt(canvas.height) !== parseInt(value)) {
				canvas.height = value;
				app.render();
			}
		}
		return canvas.height;
	}, "");
	app.bind("width", function (value) {
		if (typeof(value) === "number") {
			if (parseInt(canvas.width) !== parseInt(value)) {
				canvas.width = value;
				app.render();
			}
		}
		return canvas.width;
	}, "");

	app.render = function (cb) {
		app.emit("onRender", []);
		var index = 0;
		var _tick = function () {
			var path = resource.paths[index++];

			if (!path) {
				if (cb) cb();
				return;
			}

			if (path.isReady()) {
				path.render(_tick);
			} else {
				_tick();
			}
		};

		_tick();
	};


	var animateRequest = function () {
		resource.animationRequest	= requestAnimationFrame(function () {
			animate(resource.animationStatus);
			resource.animationRequest	= null;
		});
	};
	var animateRender = function () {
		config.animationFlags.drawing = false;

		animateRequest();
	};
	var animate = function (state) {
		if (state === undefined) {
			return resource.animationStatus || false;
		}

		var time = now();

		if (typeof(state) === "boolean") {
			if (resource.animationRequest) {
				var er;
				try {
					cancelAnimationFrame(resource.animationRequest);
				} catch (er) {
					console.error(er);
				}
			}

			if (state && !resource.animationStatus) {
				config.animationFlags.then = time;

				resource.animationStatus = state;

				animateRequest();
				return;
			}

			resource.animationStatus = state;
		}

		

		if (state === true) {
			resource.animationStatus = state;
			
			config.animationFlags.now = time;
			config.animationFlags.elapsed = config.animationFlags.now - config.animationFlags.then;
			
			if (config.animationFlags.elapsed > config.fpsInterval) {
				config.animationFlags.then = config.animationFlags.now - (
					config.animationFlags.elapsed % config.fpsInterval
				);
				if (!config.animationFlags.drawing) {
					config.animationFlags.drawing = true;
					app.render(animateRender);
				} else {
					animate(resource.animationStatus);
				}
			} else {
				animateRequest();
			}
		}
	};

	app.bind("animate", animate);

	app.bind("fps", function (fps) {
		if (typeof(fps) === "number") {
			config.fps = Math.max(0.01, fps);
			config.fpsInterval = 1000 / config.fps;
		}
	});

	if (_config.animate || _config.animate === undefined) {
		animate(true);
	}

	return app;
};
