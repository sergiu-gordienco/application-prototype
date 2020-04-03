//@ts-check

/**
 * @memberof module:js-template
 * @typedef {Object} JSTemplateModule
 * @property {module:js-template~nodeParser} parseContent
 * @property {object} config
 * @property {number} [config.RENDER_FPS=15]
 * @property {number} [config.REMOVE_EMPTY_NODES=true]
 */

/**
 * Module used for template rendering
 * @example
 * Application.require('js-template').then(function (jsTemplate) {
 * 	jsTemplate.parseContent(
 * 		document.body,
 * 		function (err, config) { console.log(config) },
 * 		{ context: {}, args: { item: 'sample reference' }}
 * 	);
 * }, console.error);
 * @module js-template
 * @returns {module:js-template.JSTemplateModule}
 */

var libs;

/**
 * @typedef {Object} jsTemplate_textResult
 * @property {string} [type='text']
 * @property {module:js-template~jsTemplate_textResultData} data
 */

/**
 * @typedef {Object} jsTemplate_textResultData
 * @property {Array<Text>} nodes
 * @property {Array<Text>} initialNodes
 * @property {String} code
 */

/**
 * @typedef {Object} parseTextNodesConfig
 * @property {object} [args={}] arguments
 * @property {object} [context={}] execution context
 * @property {String} [start='{{'] start token
 * @property {String} [end='}}'] end token
 * @property {Array<module:js-template~jsTemplate_textResult>} [textNodes] array of TextNodes
 * @property {Array<Text>} [buffer] (technical property) buffer
 * @property {boolean} [opened=false] (technical property)
 * @property {Array<string>} [__argsNames] (technical property)
 * @property {Array<any>} [__argsValues] (technical property)
 */


/**
 * Expression Builder
 * @param {string} code 
 * @param {module:js-template~parseTextNodesConfig} config 
 */
var expressionBuilder = function (code, config) {
	var expressionCall;
	/* jshint -W054 */
	try {
		expressionCall = (
			Function.apply(
				config.context || {},
				config.__argsNames.concat(
					[
						"return (" +
							code +
						" );"
					]
				)
			)
		);
	} catch (er) {
		expressionCall = function () {
			return [
				"{{ ", er, ":\n", code,
				" }}"
			];
		};
	}
	/* jshint +W054 */
	return expressionCall;
};


/**
 * @callback module:js-template#
 * @param {Array<Text>} bf 
 * @param {parseTextNodesConfig} config 
 * @returns {module:js-template~jsTemplate_textResult}
 */

var textParser = function (bf, config) {
	var er;
	var code = [];
	bf.forEach(function (node) {
		if (node.parentNode) {
			code.push(node.data);
		}
	});
	/* jshint +W054 */
	/* jshint -W014 */
	var _methods = {
		type: 'text',
		data: {
			nodes: bf,
			initialNodes: bf,
			code: code.join("")
		}
	};
	return _methods;
};

/**
 * @param {module:js-template~jsTemplate_textResult} item
 * @param {module:js-template~parseTextNodesConfig} config
 * @param {function(Error, any): void} cb
 */
textParser.value  = function (item, config, cb) {
	var expressionCall = expressionBuilder(item.data.code, config);

	var value = expressionCall.apply(config.context, config.__argsValues);

	if (
		value &&
		typeof(value) === "object" &&
		typeof(value.then) === "function" &&
		typeof(value.catch) === "function"
	) {
		value.then(function (result) {
			cb(null, result);
		}, function (err) {
			cb(err, null);
		});
	} else {
		cb(null, value);
	}
};

/**
 * @param {module:js-template~jsTemplate_textResult} item
 * @param {Array<Node|Text>|Text|Node} val
 * @param {function(Error): void} cb
 */
textParser.update = function (item, val, cb) {
	var nNodes = [], er;
	try {
		if (typeof (val) !== "undefined") {
			if (!Array.isArray(val)) {
				val = [val];
			}
			val.forEach(function (v) {
				if (v instanceof Node) {
					nNodes.push(v);
				} else {
					//@ts-ignore
					if (v && typeof (v.toString) === "function") {
						//@ts-ignore
						nNodes.push(document.createTextNode(v.toString()));
					} else {
						nNodes.push(document.createTextNode("" + v));
					}
				}
			});
		}
	} catch (er) {
		console.error(er);
	}
	if (!nNodes.length) {
		nNodes.push(document.createTextNode(""));
	}
	// removing old nodes
	// TODO divList[0].isEqualNode(divList[2])
	var equalNodesArr = true;
	if (item.data.nodes.length !== nNodes.length) {
		equalNodesArr = false;
	} else {
		item.data.nodes.forEach(function (n, i) {
			if (!n.isEqualNode(nNodes[i])) {
				equalNodesArr = false;
			}
		});
	}
	if (equalNodesArr) {
		cb(null);
		return;
	}
	var nodes = item.data.nodes;
	item.data.nodes = nNodes;
	var markNode = document.createTextNode("");

	nodes[0].parentNode.insertBefore(markNode, nodes[0]);

	nNodes.forEach(function (node) {
		markNode.parentNode.insertBefore(node, markNode);
	});

	markNode.parentNode.removeChild(markNode);

	nodes.filter(function (node) {
		var found = false;
		var i;
		for (i = 0; i < nNodes.length; i++) {
			if (node === nNodes[i]) {
				found = true;
				break;
			}
		}
		return !found;
	}).forEach(function (node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	});

	if (cb) {
		cb(null);
	}
};


/**
 * @callback parseTextNodesCallback
 * @param {Error} err
 * @param {module:js-template~parseTextNodesConfig} config 
 */

/**
 * @param {HTMLElement|Node|Text} textNode 
 * @param {module:js-template.parseTextNodesCallback} cb
 * @param {module:js-template~parseTextNodesConfig} config 
 */
var parseTextNodes = function (textNode, cb, config) {
	if (!config && typeof(cb) !== "function") {
		config = cb;
		cb = function () {};
	}

	if (!config) {
		config = {
			opened: false,
			buffer: [],
			args: {},
			context: {},
			start: "{{",
			end: "}}",
			textNodes: []
		};
	} else {
		config.opened = false;
		config.buffer = [];
		config.args = (config.args || {});
		config.context = (config.context || {});
		config.start = (config.start || '{{');
		config.end = (config.end || '}}');
		config.textNodes = [];
	}

	/**
	 * nodes parser
	 * @param {(ChildNode|Node|Text)} textNode 
	 */
	var ate = function (textNode) {
		//@ts-ignore
		var text = ( textNode ? ( textNode.data || '' ) : '' ) + '';
		var firstNode, nextNode, index, cNode;
		
		if (textNode && textNode.nodeType === Node.TEXT_NODE) {
			/** @type {string} */
			//@ts-ignore
			text = textNode.data;
		}

		if (config.opened) {
			//@ts-ignore
			index = (textNode === null ? "" : text).indexOf(config.end);
			//@ts-ignore
			if (index === -1 || textNode === null) {
				if (
					!textNode ||
					!textNode.previousSibling ||
					textNode.previousSibling.nodeType !== Node.TEXT_NODE
					) {
						config.buffer = [];
						config.opened = false;
				} else {
					//@ts-ignore
					if (textNode !== null) {
						//@ts-ignore
						config.buffer.push(textNode);
					}
				}
			} else {
				config.opened = false;

				if (index) {
					//@ts-ignore
					firstNode = document.createTextNode(text.subs(index));
					config.buffer.push(firstNode);
				}
				if (index + config.end.length < text.length) {
					//@ts-ignore
					nextNode = document.createTextNode(text.subs(index + config.end.length, 0));
				}
				if (firstNode) {
					textNode.parentNode.insertBefore(firstNode, textNode);
				}
				cNode = textParser(config.buffer.map(function (v) { return v; }), {
					start: config.start,
					end: config.end
				});
				config.textNodes.push(cNode);
				if (nextNode) {
					textNode.parentNode.insertBefore(nextNode, textNode);
				}
				config.buffer = [];
				textNode.parentNode.removeChild(textNode);
				if (nextNode) {
					ate(nextNode);
				}
			}
		} else if (textNode) {
			index = text.indexOf(config.start);
			if (index !== -1) {
				config.opened = true;
				config.buffer = [];

				if (index) {
					//@ts-ignore
					firstNode = document.createTextNode(text.subs(index));
				}
				if (index + config.end.length < text.length) {
					//@ts-ignore
					nextNode = document.createTextNode(text.subs(index + config.end.length, 0));
					// config.buffer.push(nextNode);
				}
				if (firstNode) {
					textNode.parentElement.insertBefore(firstNode, textNode);
				}
				if (nextNode) {
					textNode.parentElement.insertBefore(nextNode, textNode);
				}
				textNode.parentNode.removeChild(textNode);
				if (nextNode) {
					ate(nextNode);
				} else {
					ate(textNode.nextSibling || null);
				}
			} else {
				ate(textNode.nextSibling || null);
			}
		}
	};
	
	if (textNode.nodeType === Node.ELEMENT_NODE) {
		if (textNode.childNodes[0]) {
			ate(textNode.childNodes[0]);
		}
	}

	if (textNode.nodeType === Node.TEXT_NODE) {
		ate(textNode);
	}

	if (typeof(cb) === "function") {
		cb(null, config);
	}

	return config;
};





/**
 * @typedef {Object} jsTemplate_Attribute
 * @property {String} name
 * @property {String} value
 */

/**
 * @typedef {Object} jsTemplate_attrResultAttributeData
 * @property {String} name attribute name
 * @property {String} code executable code
 * @property {HTMLElement} node node element
 * @property {any} [buffer] ( technical property )
 * @property {Boolean} [inline=false] should be value be parsed
 * @property {Boolean} [postProcess=false] should be value be parsed
 */

/**
 * @typedef {Object} jsTemplate_attrResult
 * @property {('event'|'attribute'|'binding'|'macro')} type
 * @property {module:js-template~jsTemplate_Attribute} attr
 * @property {module:js-template~jsTemplate_attrResultAttributeData} data
 */

/**
 * @typedef {Object} jsTemplateAttrData
 * @property {Array<module:js-template~jsTemplate_attrResult>} nodes
 * @property {Array<module:js-template~jsTemplate_textResult>} texts
 * @property {Array<module:js-template~jsTemplateAttrData>} children
 * @property {Object<string,module:js-template~jsTemplate_attrResult>} _macro
 * @property {boolean} [HAS_POST_PROCESS=false]
 */




/**
 * Parsing NodeElement Attribute
 * @param {module:js-template~jsTemplate_Attribute} attr
 * @returns {module:js-template~jsTemplate_attrResult}
 */
var attrParser = function (attr, node) {
	/** @type {module:js-template~jsTemplate_attrResult} */
	var attrResult = {
		type: null,
		attr: attr,
		data: null
	};
	if (attr.name.match(/^ev-.+/)) {
		attrResult.type = 'event';
		attrResult.data = {
			name: attr.name.substring(3),
			code: 'function (event) { ' + attr.value + ' }',
			node: node
		};
	} else if (attr.name.match(/^\((.+)\)$/)) {
		attrResult.type = 'event';
		attrResult.data = {
			name: attr.name.match(/^\((.+)\)$/)[1],
			code: 'function (event) { ' + attr.value + ' }',
			node: node
		};
	} else if (attr.name.match(/^\[(.+)\]$/)) {
		attrResult.type = 'attribute';
		attrResult.data = {
			name: attr.name.match(/^\[(.+)\]$/)[1],
			code: attr.value,
			node: node
		};
	} else if (attr.name.match(/^\[\((.+)\)\]$/)) {
		attrResult.type = 'binding';
		attrResult.data = {
			name: attr.name.match(/^\[\((.+)\)\]$/)[1],
			code: attr.value,
			node: node
		};
	} else if (attr.name.match(/^\*(.*)$/)) {
		attrResult.type = 'macro';
		attrResult.data = {
			name: attr.name.match(/^\*(.*)$/)[1].toLowerCase(),
			code: attr.value,
			node: node
		};

		if (['for', 'template'].indexOf(attrResult.data.name) !== -1) {
			attrResult.data.postProcess = true;
		}
	} else if (attr.name.match(/^js-.+$/)) {
		attrResult.type = 'attribute';
		attrResult.data = {
			name: attr.name.substring(3),
			code: attr.value,
			inline: true,
			node: node
		};
	} else if (attr.value.match(/\{\{.+\}\}/)) {
		attrResult.type = 'attribute';
		attrResult.data = {
			name: attr.name,
			inline: true,
			code: attr.value,
			node: node
		};
	} else {
		attrResult = null;
	}

	if (attrResult) {
		attrResult.data.buffer = null;
	}
	return attrResult;
};

/**
 * @param {module:js-template~jsTemplate_attrResult} item
 * @param {(Node|Text|Array<Node|Text>|function)} value
 * @param {function (Error, boolean): void} cb
 * @param {module:js-template~parseTextNodesConfig} config
 */
attrParser.update = function (item, value, config, cb) {
	var status = true;
	switch (item.type) {
		case "attribute":
			if (value === null) {
				if (item.data.node.hasAttribute(item.data.name)) {
					item.data.node.removeAttribute(item.data.name);
				}
			} else {
				if (
					value !== item.data.buffer
				) {
					item.data.buffer = value;
					item.data.node.setAttribute(
						item.data.name,
						//@ts-ignore
						value
					);
				}
			}
		break;
		case "macro":
			switch (item.data.name) {
				case "if":
					if (item.data.buffer === null) {
						item.data.buffer = {
							current: item.data.node,
							empty  : document.createTextNode(''),
							valid  : item.data.node
						};
					}
					if (value) {
						if (item.data.buffer.current !== item.data.buffer.valid) {
							item.data.buffer.current.parentElement.insertBefore(
								item.data.buffer.valid,
								item.data.buffer.current
							);
							item.data.buffer.current.parentElement.removeChild(
								item.data.buffer.current
							);
							item.data.buffer.current = item.data.buffer.valid;
						}
					} else {
						status = false;
						if (item.data.buffer.current !== item.data.buffer.empty) {
							item.data.buffer.current.parentElement.insertBefore(
								item.data.buffer.empty,
								item.data.buffer.current
							);
							item.data.buffer.current.parentElement.removeChild(
								item.data.buffer.current
							);
							item.data.buffer.current = item.data.buffer.empty;
						}
					}
				break;
				case "class":
					if (value === null) {
						if (item.data.buffer !== value) {
							item.data.buffer = value;
							if (
								item.data.node.hasAttribute(item.data.name)
							) {
								item.data.node.removeAttribute(item.data.name);
							}
						}
					} else if (typeof(value) === "string") {
						if (item.data.buffer !== value) {
							item.data.buffer = value;
							item.data.node.setAttribute(item.data.name, value);
						}
					} else if (typeof(value) === "object") {
						var name, result = [];
						for (name in value) {
							if (value[name]) {
								result.push(name);
							}
						}
						var resultValue = result.sort().join(' ');

						if (item.data.buffer !== resultValue) {
							item.data.buffer = resultValue;
							if (resultValue) {
								item.data.node.setAttribute(item.data.name, resultValue);
							} else if (
								item.data.node.hasAttribute(item.data.name)
							) {
								item.data.node.removeAttribute(item.data.name);
							}
						}
					} else {
						console.warn("🐛 Incorrect value for JSTemplate:class:item ", item,"; value: ", value);
					}
				break;
				case "for":
					if (item.data.buffer === null) {
						item.data.buffer = {
							template : item.data.node,
							current : [],
							nodes: [],
							update: function (value) {
								if (value === undefined) {
									return;
								}
								if (!Array.isArray(value)) {
									if (
										window.NodeList &&
										value instanceof NodeList
									) {
										value = Array.prototype.slice.call(value);

										if (!value.length) {
											value = [];
										}
									} else if (value === null) {
										value = [];
									} else {
										value = [value];
									}
								}
								
								if (value.length === 0) {
									value = [
										null
									];
								}
								value = value.map(function (value, index) {
									if (value === null) return document.createTextNode('');

									var args = {};
									args[
										(
											//@ts-ignore
											item.data.node.attrdata.__JS_TEMPLATE._macro['key'] ||
											{
												data: { code: 'key '}
											}
										).data.code || 'key'
									] = index;

									args[
										(
											//@ts-ignore
											item.data.node.attrdata.__JS_TEMPLATE._macro['ref'] ||
											{
												data: { code: 'item'}
											}
										).data.code || 'item'
									] = value;

									var node = item.data.node.cloneNode(true);
									//@ts-ignore
									node.renderJs(
										config.context,
										Object.assign({}, config.args, args)
									);
									return node;
								});
								var i;
								console.log("🚀 ", value);
								var ref = item.data.buffer.current[0];
								var parent = ref.parentNode;
								for (i = 0; i < value.length; i++) {
									parent.insertBefore(value[i], ref);
								}
								item.data.buffer.current.forEach(function (node) {
									node.parentNode.removeChild(node);
								});
								item.data.buffer.current = value;
							}
						};
						item.data.buffer.current = [
							document.createTextNode('')
						];
						item.data.node.parentElement.insertBefore(
							item.data.buffer.current[0],
							item.data.node
						);
						item.data.node.parentElement.removeChild(
							item.data.node
						);
					}

					item.data.buffer.update(value);
				break;
			}
		break;
		case "event":
			if (!item.data.buffer) {
				item.data.buffer = value;
				if (typeof(value) === "function") {
					//@ts-ignore
					item.data.node.addEventListener(
						item.data.name,
						function (event) {
							attrParser.value(item, config, function (err, value) {
								if (err) {
									console.error(err);
									return;
								}
								value.apply(
									config.context,
									[event]
								);
							});
						}
					);
				} else if (
					//@ts-ignore
					value && typeof(value) === "object" && typeof(value.emit) === "function"
				) {
					item.data.node.addEventListener(
						item.data.name,
						function (event, node) {
							//@ts-ignore
							value.emit(item.data.name, [event, node]);
						}
					);
				} else {
					console.warn(
						"🐛 Unknown JSTemplate:event:item destination: ", item,
						"; for value: ", value, ";\n\nℹ Please use a function or ApplicationPrototype Instance"
					);
				}
			}
		break;
		case "binding":
			if (!item.data.buffer) {
				item.data.buffer = true;
				console.warn(
					"🚧 In Construction JSTemplate:binding:item  ", item,
					"; for value: ", value
				);
			}
		break;
	}

	cb(null, status);
	return status;
};


/**
 * @param {module:js-template~jsTemplate_attrResult} item
 * @param {module:js-template~parseTextNodesConfig} config
 * @param {function (Error, any): void} cb
 */
attrParser.value = function (item, config, cb) {
	/** @type {jsTemplate_attrResultAttributeData} */
	//@ts-ignore
	var data = item.data;
	var value;

	if (data.inline) {
		var parts = [];

		data.code.split(config.start)
			.forEach(function (part) {
				parts.push.apply(parts, part.split(config.end));
			});
		
		value = parts.map(function (part, index) {
			if (index % 2) {
				return expressionBuilder(part, config)
					.apply(config.context, config.__argsValues);
			}
			return part;
		}).join('');

		cb(null, value);
	} else {
		var expressionCall = expressionBuilder(data.code, config);
		/* jshint -W054 */
		try {
			expressionCall = (
				Function.apply(
					{},
					config.__argsNames.concat(
						[
							"return (" +
								//@ts-ignore
								item.data.code +
							" );"
						]
					)
				)
			);
		} catch (er) {
			console.error("JSTemplate::expressionBuilder", er, item);
			expressionCall = function () {
				return [
					//@ts-ignore
					"{{ ", er, ":\n", item.data.code,
					" }}"
				];
			};
		}
		/* jshint +W054 */
		value = expressionCall.apply(config.context, config.__argsValues);

		if (
			value &&
			typeof(value) === "object" &&
			typeof(value.then) === "function" &&
			typeof(value.catch) === "function"
		) {
			value.then(function (result) {
				cb(null, result);
			}, function (err) {
				cb(err, null);
			});
		} else {
			cb(null, value);
		}
	}
};


/**
 * @protected
 * @memberof module:js-template
 * @callback nodeParserCallback
 * @param {Error} err
 * @param {module:js-template~parseTextNodesConfig} config 
 * @returns {module:js-template~parseTextNodesConfig}
 */
/**
 * @param {HTMLElement} nodeElement 
 * @param {module:js-template.nodeParserCallback} cb 
 * @param {module:js-template~parseTextNodesConfig} config 
 * @returns {module:js-template~parseTextNodesConfig}
 */
var nodeParser = function (nodeElement, cb, config) {
	if (typeof (cb) !== "function") cb = function () { };
	if (!config) {
		config = {
			args: {},
			context: {},
			RENDER_FPS: module.exports.config.RENDER_FPS || 15,
			REMOVE_EMPTY_NODES: module.exports.config.REMOVE_EMPTY_NODES || false
		};
	} else {
		config.args = (config.args || {});
		config.context = (config.context || {});
		config.RENDER_FPS = config.RENDER_FPS || module.exports.config.RENDER_FPS || 15;
		config.REMOVE_EMPTY_NODES = (
			typeof(config.REMOVE_EMPTY_NODES) === "boolean" ?
				config.REMOVE_EMPTY_NODES : module.exports.config.REMOVE_EMPTY_NODES
		);
	}

	var argsNames = [];
	var argsValues = [];
	; ((function (o) {
		if (o && typeof (o) === "object") {
			var i;
			for (i in o) {
				argsNames.push(i);
				argsValues.push(o[i]);
			}
		}
	})(config.args));

	/**
	 * @param {(HTMLElement)} nodeElement 
	 * @returns {module:js-template~jsTemplateAttrData}
	 */
	var ate = function (nodeElement) {
		//@ts-ignore
		nodeElement.attrdata.__JS_TEMPLATE = nodeElement.attrdata.__JS_TEMPLATE || {
			nodes: [],
			texts: [],
			children: [],
			_macro: {},
			HAS_POST_PROCESS: false
		};
		
		//@ts-ignore
		nodeElement.attrdata.__JS_TEMPLATE.nodes = nodeElement.attrdata.__JS_TEMPLATE.nodes || [];
		//@ts-ignore
		nodeElement.attrdata.__JS_TEMPLATE.texts = nodeElement.attrdata.__JS_TEMPLATE.texts || [];
		
		/** @type {module:js-template~jsTemplateAttrData} */
		//@ts-ignore
		var __JS_TEMPLATE = nodeElement.attrdata.__JS_TEMPLATE;

		var i;
		/** @type {module:js-template~jsTemplate_attrResult} */
		var attrResult;
		//@ts-ignore
		for (i = 0; i < nodeElement.attributes.length; i++) {
			//@ts-ignore
			attrResult = attrParser(nodeElement.attributes[i], nodeElement);
			if (
				attrResult
			) {
				__JS_TEMPLATE.nodes.push(attrResult);

				if (attrResult.type === 'macro') {
					__JS_TEMPLATE._macro[attrResult.data.name] = attrResult;
				}

				if (attrResult.data.postProcess) {
					__JS_TEMPLATE.HAS_POST_PROCESS = true;
				}
			}
		}
		__JS_TEMPLATE.nodes.forEach(function (item) {
			nodeElement.removeAttribute(item.attr.name);
		});

		if (__JS_TEMPLATE.HAS_POST_PROCESS) {
			cb(null, __JS_TEMPLATE);
			return __JS_TEMPLATE;
		}

		/**
		 * Allowed Types
		 * 
		 *    Node.ELEMENT_NODE,
		 *    Node.TEXT_NODE,
		 *    Node.CDATA_SECTION_NODE,
		 *    // PROCESSING_INSTRUCTION_NODE
		 *    Node.COMMENT_NODE,
		 *    // Node.DOCUMENT_NODE,
		 *    // Node.DOCUMENT_TYPE_NODE,
		 *    // Node.DOCUMENT_FRAGMENT_NODE
		 */
		/** @type {NodeList} */
		var children = Array.prototype.slice.call(nodeElement.childNodes)
			.filter(function (/** @type {Node} */ node) {
				if (
					node.nodeType === Node.TEXT_NODE ||
					node.nodeType === Node.CDATA_SECTION_NODE ||
					node.nodeType === Node.COMMENT_NODE
				) {
					// Text Content Parsing
				}
				if (node.nodeType === Node.ELEMENT_NODE) {
					return true;
				}
				return false;
			});
		
		children.forEach(function (node) {
			//@ts-ignore
			__JS_TEMPLATE.children.push(ate(node));
		});

		parseTextNodes(nodeElement, function (err, data) {
			if (err) {
				console.error("JSTemplate::parseTextNodes ", err);
			}

			data.textNodes.forEach(function (itemText) {
				__JS_TEMPLATE.texts.push(itemText);
			});

			if (config.REMOVE_EMPTY_NODES) {
				__JS_TEMPLATE.children = __JS_TEMPLATE.children.filter(
					function (item) {
						return ( item.children.length || item.nodes.length || item.texts.length );
					}
				);
			}

			if (cb) {
				cb(null, __JS_TEMPLATE);
			}
		}, config);
		
		// console.log("🚀", __JS_TEMPLATE);

		return __JS_TEMPLATE;
	};



	var _time    = new Date().valueOf();
	var _timer   = null;
	var _methods = {
		items  : ate(nodeElement),
		redraw :function (cb, context, args) {
			var DEBUG_MODE = 1;

			if (typeof(context) !== "undefined") {
				config.context = context;
			}
			if (typeof(args) === "object" && args) {
				config.args = args;
				console.info(config.args);
			}

			if (!cb) cb = function () {
				console.log("JSTemplate Redraw", nodeElement);
			};
			if (_timer !== null) {
				return;
			}
			var time = new Date().valueOf();

			var _delay = Math.max(1000 / config.RENDER_FPS - (time - _time), 0);

			_timer = setTimeout(function () {
				clearTimeout(_timer);
				_timer = null;

				config.__argsNames   = [];
				config.__argsValues  = [];

				;((function (o) {
					if (o && typeof(o) === "object") {
						var i;
						for (i in o) {
							config.__argsNames.push(i);
							config.__argsValues.push(o[i]);
						}
					}
				})(config.args));

				/**
				 * 
				 * @param {module:js-template~jsTemplateAttrData} item 
				 * @param {function():void} cb 
				 */
				var renderItem = function (item, cb) {
					var renderStop = false;
					var renderChildren = true;
					var handleError = function (instance) {
						if (instance && Array.isArray(instance.errors) && instance.errors.length) {
							instance.errors.forEach(function (err) {
								console.error('JSTemplate::itemChild error: ', err);
							});
						}
					};
					if (DEBUG_MODE >= 2) {
						console.log("    ⬇ Render Items");
					}

					if (item.HAS_POST_PROCESS) {
						renderChildren = false;
					};

					libs.async.forEach(
						item.nodes,
						function (next, itemNode) {
							if (DEBUG_MODE >= 3) {
								console.log("      ➡ Item", itemNode);
							}
							if (renderStop || (item.HAS_POST_PROCESS && !itemNode.data.postProcess)) {
								next();
								return;
							}
							attrParser.value(
								itemNode,
								config,
								function (err, value) {
									if (err) {
										//@ts-ignore
										err.item = itemNode;
										next(err);
										renderStop = true;
									} else {
										attrParser.update(
											itemNode,
											value,
											config,
											function (err, state) {
												if (err) {
													//@ts-ignore
													err.item = itemNode;
													next(err);
													renderStop = true;
													if (DEBUG_MODE >= 3) {
														console.log("❌ renderStop = ", true);
													}
												} else {
													if (!state) {
														if (DEBUG_MODE >= 3) {
															console.log("❌ renderChildren = ", false);
														}
														renderChildren = false;
													}
													next();
												}
											}
										);
									}
								}
							);
						},
						function () {
							handleError(this);
							if (!renderChildren || renderStop) {
								cb();
							} else {
								if (DEBUG_MODE >= 2) {
									console.log("    ⬇ Render Texts");
								}
								libs.async.forEach(
									item.texts,
									function (next, itemText) {
										if (DEBUG_MODE >= 3) {
											console.log("      ➡ Text", itemText);
										}
										textParser.value(
											itemText,
											config,
											function (err, value) {
												if (err) {
													//@ts-ignore
													err.item = itemText;
													next(err);
												} else {
													textParser.update(
														itemText,
														value,
														function (err) {
															if (err) {
																//@ts-ignore
																err.item = itemText;
																next(err);
															} else {
																next();
															}
														}
													);
												}
											}
										);
									},
									function () {
										handleError(this);
										if (!renderChildren || renderStop) {
											cb();
										} else {
											if (DEBUG_MODE >= 2) {
												console.log("    ⬇ Render Children");
											}
											libs.async.forEach(
												item.children,
												function (next, itemChild) {
													if (DEBUG_MODE >= 3) {
														console.log("      ➡ Child", itemChild);
													}
													renderItem(itemChild, next);
												},
												function () {
													handleError(this);
													cb();
												}
											).on('error', function (err) {
												console.error('JSTemplate::itemChild error: ', err);
											});
										}
									}
								).on('error', function (err) {
									console.error('JSTemplate::itemText error: ', err);
								});
							}
						}
					).on('error', function (err) {
						console.error('JSTemplate::itemNode error: ', err);
					});
				};


				if (DEBUG_MODE) {
					console.info("🎨 JSTemplate::Start delay: ", _delay, { node: nodeElement });
				}
				var sTime = new Date().valueOf();
				renderItem(
					_methods.items,
					function () {
						if (DEBUG_MODE) {
							console.info("🎨 JSTemplate::Finish delay: ", (Math.floor(_delay * 100) / 100), "; time: ", (new Date().valueOf() - sTime),"ms;", { node: nodeElement });
						}
					}
				);

			}, _delay);
		}
	};

	_methods.redraw();

	return _methods;
};

//@ts-ignore
Element.prototype.renderJs = function (context, args, cb) {
	//@ts-ignore
	this.renderJsTemplate(context, args, cb);
};

//@ts-ignore
Element.prototype.renderJsTemplate = function (context, args, cb) {
	//@ts-ignore
	if (!this.__renderContent) {
		//@ts-ignore
		this.__renderContent = module.exports.parseContent(this, cb, {
			context: (context || this),
			args: (args || {})
		});
	} else {
		//@ts-ignore
		this.__renderContent.redraw(cb, context, args);
	}
};

//@ts-ignore
Element.prototype.renderJsArgs = function (context, args, cb) {
	//@ts-ignore
	if (!this.__renderContent) {
		console.log("⚠ Deprecated: Element.prototype.renderJsArgs");
		//@ts-ignore
		this.__renderContent = module.exports.parseContent(this, cb, {
			context: (context || this),
			args: (args || {})
		});
	} else {
		//@ts-ignore
		this.__renderContent.redraw(cb, context, args);
	}
};

// @ts-ignore
Application.require(
	[
		"extensions/prototype",
		"async"
	]
).then(function () {
	libs = arguments[0];
	module.exports = {
		parseContent: nodeParser,
		parseAttributes: nodeParser,
		config: {
			RENDER_FPS: 15,
			REMOVE_EMPTY_NODES: true
		}
	};
});
