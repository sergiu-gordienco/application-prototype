// jshint -W083
// jshint -W002
// jshint -W088
// jshint -W014


((function () {
	if (!('_elements' in module.cache())) {
	  module.cache()._elements = {};
	}
	if (!('_elementsKeys' in module.cache())) {
	  module.cache()._elementsKeys = [];
	}
	if (!('_pendingList' in module.cache())) {
	  module.cache()._pendingList = {};
	}
	var target = document.body;
	var _elements = module.cache()._elements;
	var _elementsKeys   = module.cache()._elementsKeys;
	var _pendingList = module.cache()._pendingList;
	var trackNodes  = function (nodeList, cbName, attrs) {
		if (nodeList.length) {
			var i, tagName, er;
			for (i=0;i<nodeList.length;i++) {
				if (nodeList[i].nodeType === Node.ELEMENT_NODE) {
					tagName = nodeList[i].tagName.toLowerCase();
					if (_elementsKeys.indexOf(tagName) !== -1) {
						if (typeof(_elements[tagName][cbName]) === "function") {
							try {
								// console.log({tagName, cbName});
								_elements[tagName][cbName].apply(nodeList[i], []);
							} catch (er) {
								console.error(er);
							}
						}
					} else if (tagName in _pendingList) {
						if (typeof(_pendingList[tagName]) === "function") {
							try {
								((_pendingList[tagName])());
							} catch (er) {
								console.error(er);
							}
						}
						delete _pendingList[tagName];
					}

					var _found = false;
					if (cbName === "__onAttrChange" || cbName === "__onContentChange") {
						var _current = nodeList[i], _currentTagName = nodeList[i].tagName.toLowerCase();
						while (_current && !_found) {
							if (_elementsKeys.indexOf(_currentTagName) !== -1) {
								_found = true;
							}
							_current = _current.parentElement;
							if (_current) {
								_currentTagName = _current.tagName.toLowerCase()
							}
						}

						if (!_found) return;
					} else {
						_found = true;
					}

					if (_found) {
						// console.log({ cbName, nodes: nodeList[i].childNodes });
						trackNodes(nodeList[i].childNodes, cbName, attrs);
					}
				} else if (nodeList[i].nodeType === Node.DOCUMENT_NODE) {
					trackNodes(nodeList[i].childNodes, cbName, attrs);
				} else if (nodeList[i].nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
					trackNodes(nodeList[i].childNodes, cbName, attrs);
				}
			}
		}
	};
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			var attrs = [];
			if (mutation.type === "childList") {
				trackNodes(mutation.addedNodes, "__onInit", attrs);
				trackNodes([mutation.target], "__onContentChange", attrs);
				trackNodes(mutation.removedNodes, "__onRemove", attrs);
			} else if (mutation.type === "attributes") {
				trackNodes([mutation.target], "__onContentChange", attrs);
				trackNodes([mutation.target], "__onAttrChange", [mutation.attributeName, mutation.oldValue]);
			}
			// console.log(mutation.type, mutation);
		});
	});
	// configuration of the observer:
	var config = { attributes: true, childList: true, subtree: true, attributeOldValue: true };

	// pass in the target node, as well as the observer options
	observer.observe(target, config);

	// later, you can stop observing
	// observer.disconnect();




  if (typeof(document.createElement('span').methods) !== "object") {
	/**
	 * @memberof HTMLElement#
	 * @var {Object<string,function>} methods
	 */;
	Object.defineProperty(HTMLElement.prototype, 'methods', {
		get	: function () {
			var tagName = this.tagName.toLowerCase();
			var node = this;
			var method = function (name) {
				return function () {
					return _elements[tagName][name].apply(node, arguments);
				};
			};
			var methods = {};
			if (tagName in _elements) {
				for (i in _elements[tagName]) {
					if (typeof(_elements[tagName][i]) === "function") {
						methods[i] = method(i);
					} else {
						;((function (name) {
						  Object.defineProperty(methods, name, {
							enumerable : true,
							configurable : true,
							get : function () {
							  return _elements[tagName][name];
							},
							set : function (v) {
							  _elements[tagName][name] = v;
							}
						  });
						})(i + ''));
					}
				}
			}
			return methods;
		},
		set	: function (methods) {
			var tagName = this.tagName.toLowerCase();
			if (methods && typeof(methods) === "object") {
				var i;
				if (!(tagName in _elements)) {
					_elements[tagName]  = {};
					_elementsKeys.push(tagName);
				}
				for (i in methods) {
					_elements[tagName][i]	= methods[i];
				}
			}
		},
		enumerable: true,
		configurable: false
	});
  }



	var _private = {
		registerMethods : function (nodeName, prototypeMethods) {
			if (
				nodeName && typeof(nodeName) === "string"
				&& prototypeMethods && typeof(prototypeMethods) === "object"
			) {
				var tagName = nodeName.toLowerCase();
				_elements[tagName] = prototypeMethods;
				_elementsKeys.push(tagName);
				_private._initCreatedNodes(tagName);
			}
		},
		_initCreatedNodes   : function (nodeName) {
			var tagName = nodeName.toLowerCase();
			if (typeof(_elements[tagName].__onInit) === "function") {
				var list = document.getElementsByTagName(nodeName);
				var er;
				for (var i = 0; i < list.length; i++ ) {
					try {
						_elements[tagName].__onInit.apply(list[i],  []);
					} catch(er) {
						console.error(er);
					}
				}
			}
		}
	};

	var _methods = {
		registerMethods : _private.registerMethods,
		lazyLoadModules : function (list) {
			var moduleName, tagName, cb;
			if (typeof(list) === "object" && list) {
				for (moduleName in list) {
					tagName = moduleName.toLowerCase();
					cb = undefined;
					if (typeof(list[tagName]) === "string") {
						cb  = ((function (moduleName) {
							return function () {
								Application.require(moduleName, function () {});
							};
						})(list[tagName] + ""));
					} else if (typeof(list[tagName]) === "function") {
						cb  = list[tagName];
					}
					if (typeof(cb) === "function") {
						if (document.getElementsByTagName(tagName).length) {
							try {
								cb();
							} catch (er) {
								console.error(er);
							}
						} else {
							_pendingList[tagName]   = cb;
						}
					}
				}
			}
		}
	};

	module.exports  = _methods;
})());
