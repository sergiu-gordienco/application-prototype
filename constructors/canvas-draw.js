module.exports = function (canvas) {
	/**
 	* create an eviroriment for canvas drawing
 	*/
	if (!canvas) {
		canvas  = document.createElement('canvas');
	}
	var context2d   = canvas.getContext('2d');
	var context	 = context2d;
	var app = new ApplicationPrototype();
	var keyGenerator= ((function () {
		var i = 0;
		return function () {
			i++;
			return i.toString(36) + '_' + Math.floor(Math.random() * 1000000000).toString(36);
		};
	})());
	var config      = {
		debug : false
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

	app.bind("debug", function (status) {
		if (typeof(status) !== "undefined") {
			config.debug = !!status;
		}
		return config.debug;
	})

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
				return operation.id === key;
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
			return config.operations;
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
		path.bind("isReady", function (bool) {
			if (typeof(bool) !== "undefined") {
				config.isReady  = !!bool;
			}
			return config.isReady;
		}, "on");
		path.bind("render", function () {
			var context = app.context();
			context.save();
			var er;
			config.operations.forEach(function (operation) {
				try {
					var params = typeof(operation.params) === "function" ? (
						operation.params(path, operation, app)
					) : operation.params;
					if (typeof(operation.operation) === "function") {
						if (app.debug()) {
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
						if (app.debug()) {
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
						if (app.debug()) {
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
		});
		app.emit("path-created", [path]);
		return path;
	});
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
			return config.groups.indexOf(name) !== -1;
		});
	}, "");
	app.bind("imageSmoothingEnabled", function (bool) {
		if (typeof(bool) !== "undefined") {
			config.smoothing	= !!bool;
			var context = app.context();
			context.imageSmoothingEnabled	   = config.smoothing;
			context.mozImageSmoothingEnabled	= config.smoothing;
			context.webkitImageSmoothingEnabled = config.smoothing;
			context.msImageSmoothingEnabled	 = config.smoothing;
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
	app.bind("canvas", function () {
		return canvas;
	}, "");
	app.bind("render", function () {
		resource.paths.forEach(function (path) {
			if (path.isReady()) {
				path.render();
			}
		});
	});

	app.bind("animate", function (state) {
		if (typeof(state) === "undefined") {
			resource.animationStatus = true;
			app.animate(true);
		} else if (state === true) {
				app.render();
				resource.animationRequest	= requestAnimationFrame(function () {
					if (resource.animationStatus !== false) {
						app.animate(true);
					}
				});
		} else if (state === false) {
			var er;
			try {
				cancelAnimationFrame(resource.animationRequest);
			} catch (er) {
				console.error(er);
			}
			resource.animationStatus = false;
		}
	});

	return app;
};
