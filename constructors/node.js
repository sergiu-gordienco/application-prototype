module.exports	= function (callback) {
	var _config		= {
		enabled	: true
	};
	var _params	= {
		nodeType	: null,
		childsAllowed	: [],
		nodeChilds	: []
	};
	var _methods	= {
		setConfig	: function (conf) {
			var i;
			if ( conf && typeof(conf) === "object" )
			for (i in conf)
				if (i in _config) {
					if (typeof(conf[i]) === typeof(_config[i])) {
						_config[i]	= conf[i];
					}
				}
		}
	};
	var events	= {
		"child-removed"	: []
	};
	var node	= {
		get config() {
			if (node.emit("ongetconfig",_config) === false) {
				return false;
			};
			// todo ...
			return _config;
		},
		set config(data) {
			if (node.emit("onsetconfig") === false) {
				return false;
			};
			_methods.setConfig(data);
			if (node.emit("onaftersetconfig", data) === false) {
				return false;
			};
		},
		get type() {
			if (node.emit("ongettype",_config) === false) {
				return false;
			};
			return _params.nodeType;
		},
		set type(v) {
			if (node.emit("onsettype", v) === false) {
				return false;
			};
			if (typeof(v) === "string" && v.match(/[a-z0-9\-\_\/]/i)) {
				_params.nodeType	= v;
			} else {
				console.warn("Unaccepted node type", v);
			}
			if (node.emit("onaftersettype",_config) === false) {
				return false;
			};
		},
		get childs() {
			if (node.emit("ongetchilds") === false) {
				return false;
			};
			return _params.nodeChilds.map(function (v) { return v;});
		},
		set childs(v) {
			// TODO check calback for delete / callback for add
			if (node.emit("onbeforesetchilds", v) === false) {
				return false;
			};
			if (Array.isArray(v)) {
				// deleted
				_params.nodeChilds.filter(function (n) {
					if (v.indexOf(n) === -1) {
						node.emit("child-removed", [node, n]);
						return false;
					} else {
						return true;
					}
				});
				v.forEach(function (n) {
					if (_params.nodeChilds.indexOf(n) === -1) {
						node.emit("child-added", [node, n]);
						_params.nodeChilds.push(n);
					}
				});
				_params.nodeChilds.sort(function (a, b) {
					return (v.indexOf(a) < v.indexOf(b) ? -1 : 1);
				});
			}
			if (node.emit("onaftersetchilds", v) === false) {
				return false;
			};
		},
		emit	: function (eventName, args) {
			var status	= true;
			if (Array.isArray(events[eventName])) {
				events[eventName].forEach(function (callback) {
					if (status) {
						if (callback.apply(node, args || []) === false) {
							status	= false;
						}
					}
				});
			}
			return status;
		},
		off	: function (eventName, callback) {
			if (typeof(eventName) === "string") {
				if (events[eventName]) {
					if (typeof(callback) === "undefined") {
						events[eventName]	= [];
					}
					if (typeof(callback) === "string") {
						
					}
					if (typeof(callback) === "string") {
						events[eventName]	= events[eventName].filter(function (c) {
							if (typeof(c.event_tag) === "undefined") {
								return true;
							} else {
								return (c.event_tag != callback);
							}
						});
					}
				}
			}
		},
		on	: function (eventName, callback, tag) {
			if (!callback) {
				return (events[eventName] || []);
			} else if (typeof(callback) === "function") {
				if (!Array.isArray(events[eventName])) {
					events[eventName]	= [];
				}
				if (typeof(tag) === "string" && tag) {
					var callback_wrap	= function () {
						return callback.apply(this, arguments);
					};
					events[eventName].push(callback_wrap);
					return callback_wrap;
				} else {
					events[eventName].push(callback);
					return callback;
				}
			}
			return false;
		}
	};
	if (callback) {
		callback(node, _config, _params, _methods);
	}
	return node;
};