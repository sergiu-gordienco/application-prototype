/**
 * @memberof JSTemplate
 * @typedef {Object} JSTemplateModule
 * @property {JSTemplate.JSTemplateParseContent} parseContent
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
 * @interface JSTemplate
 * @returns {JSTemplate.JSTemplateModule}
 */

var libs;

/**
 * @typedef {Object} jsTemplate_textResult
 * @memberof JSTemplate
 * @property {string} [type='text']
 * @property {JSTemplate.jsTemplate_textResultData} data
 */

/**
 * @typedef {Object} jsTemplate_textResultData
 * @memberof JSTemplate
 * @property {Array<Text>} nodes
 * @property {Array<Text>} initialNodes
 * @property {string} code
 */

/**
 * @typedef {Object} parseTextNodesConfig
 * @memberof JSTemplate
 * @property {object} [args={}] arguments
 * @property {object} [context={}] execution context
 * @property {string} [start='{{'] start token
 * @property {string} [end='}}'] end token
 * @property {Array<JSTemplate.jsTemplate_textResult>} [textNodes] array of TextNodes
 * @property {Array<Text>} [buffer] (technical property) buffer
 * @property {boolean} [opened=false] (technical property)
 * @property {Array<string>} [__argsNames] (technical property)
 * @property {Array<any>} [__argsValues] (technical property)
 */


/**
 * Expression Builder
 * @protected
 * @function
 * @memberof JSTemplate
 * @param {string} code 
 * @param {JSTemplate.parseTextNodesConfig} config 
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
 * @protected
 * @function
 * @memberof JSTemplate
 * @param {Array<Text>} bf 
 * @param {parseTextNodesConfig} config 
 * @returns {JSTemplate.jsTemplate_textResult}
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
 * @protected
 * @function
 * @param {JSTemplate.jsTemplate_textResult} item
 * @param {JSTemplate.parseTextNodesConfig} config
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
 * @protected
 * @function
 * @param {JSTemplate.jsTemplate_textResult} item
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
 * @memberof JSTemplate
 * @param {Error} err
 * @param {JSTemplate.parseTextNodesConfig} config 
 */

/**
 * @protected
 * @function
 * @memberof JSTemplate
 * @param {HTMLElement|Node|Text} textNode 
 * @param {JSTemplate.parseTextNodesCallback} cb
 * @param {JSTemplate.parseTextNodesConfig} config 
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
	 * @private
	 * @function
	 * @param {(ChildNode|Node|Text)} textNode 
	 */
	var ate = function (textNode) {
		//@ts-ignore
		var text = (textNode ? (textNode.data || '') : '') + '';
		var firstNode, nextNode, index, cNode;

		if (textNode && textNode.nodeType === Node.TEXT_NODE) {
			/**
			 * @private
			 * @type {string}
			 */
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
				cNode = textParser(config.buffer.map(function (v) {
					return v;
				}), {
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

	if (typeof (cb) === "function") {
		cb(null, config);
	}

	return config;
};





/**
 * @typedef {Object} jsTemplate_Attribute
 * @memberof JSTemplate
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef {Object} jsTemplate_attrResultAttributeData
 * @memberof JSTemplate
 * @property {string} name attribute name
 * @property {string} code executable code
 * @property {HTMLElement} node node element
 * @property {any} [buffer] ( technical property )
 * @property {boolean} [inline=false] should be value be parsed
 * @property {boolean} [postProcess=false] should be value be parsed
 */

/**
 * @typedef {Object} jsTemplate_attrResult
 * @memberof JSTemplate
 * @property {('event'|'attribute'|'binding'|'macro')} type
 * @property {JSTemplate.jsTemplate_Attribute} attr
 * @property {JSTemplate.jsTemplate_attrResultAttributeData} data
 */

/**
 * @typedef {Object} jsTemplateAttrData
 * @memberof JSTemplate
 * @property {Array<JSTemplate.jsTemplate_attrResult>} nodes
 * @property {Array<JSTemplate.jsTemplate_textResult>} texts
 * @property {Array<JSTemplate.jsTemplateAttrData>} children
 * @property {Object<string,JSTemplate.jsTemplate_attrResult>} _macro
 * @property {boolean} [HAS_POST_PROCESS=false]
 */




/**
 * Parsing NodeElement Attribute
 * @protected
 * @memberof JSTemplate
 * @param {JSTemplate.jsTemplate_Attribute} attr
 * @returns {JSTemplate.jsTemplate_attrResult}
 */
var attrParser = function (attr, node) {
	/**
	 * @private
	 * @type {JSTemplate.jsTemplate_attrResult}
	 */
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
	} else if (attr.name.match(/^\[\((.+)\)\]$/)) {
		attrResult.type = 'binding';
		attrResult.data = {
			name: attr.name.match(/^\[\((.+)\)\]$/)[1],
			code: 'function (event) { if (event.__args) with (event.__args) { ' + attr.value + ' = event.__value; }; return ( ' + attr.value + ' ); }',
			node: node
		};
	} else if (attr.name.match(/^\[(.+)\]$/)) {
		attrResult.type = 'attribute';
		attrResult.data = {
			name: attr.name.match(/^\[(.+)\]$/)[1],
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
 * @protected
 * @function
 * @param {JSTemplate.jsTemplate_attrResult} item
 * @param {(Node|Text|Array<Node|Text>|function)} value
 * @param {function (Error, boolean): void} cb
 * @param {JSTemplate.parseTextNodesConfig} config
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
							empty: document.createTextNode(''),
							valid: item.data.node
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
					} else if (typeof (value) === "string") {
						if (item.data.buffer !== value) {
							item.data.buffer = value;
							item.data.node.setAttribute(item.data.name, value);
						}
					} else if (typeof (value) === "object") {
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
						console.warn("🐛 Incorrect value for JSTemplate:class:item ", item, "; value: ", value);
					}
					break;
				case "for":
					if (item.data.buffer === null) {
						var _key = (
							//@ts-ignore
							item.data.node.attrdata.__JS_TEMPLATE._macro['key'] || {
								data: {
									code: 'key'
								}
							}
						).data.code || 'key';
						var _ref = (
							//@ts-ignore
							item.data.node.attrdata.__JS_TEMPLATE._macro['ref'] || {
								data: {
									code: 'item'
								}
							}
						).data.code || 'item';
						item.data.buffer = {
							template: item.data.node,
							current: [],
							reference: document.createTextNode(''),
							cache: [],
							createNode: function (args) {
								var _item = {
									node: item.data.node.cloneNode(true),
									args: Object.assign({}, config.args, args)
								};
								//@ts-ignore
								_item.node.renderJs(
									config.context,
									_item.args,
									function (err) {
										if (err) console.error(err);
									}
								);
								item.data.buffer.reference.parentNode.insertBefore(
									_item.node,
									item.data.buffer.reference
								);
								return _item;
							},
							allocNode: function (args) {
								var _item;
								if (item.data.buffer.cache.length) {
									_item = item.data.buffer.cache.shift();
									Object.assign(_item.args, args);
									// console.log(_item, {..._item.args}, args, config.context);
									_item.node.renderJs(
										config.context,
										_item.args,
										function (err) {
											if (err) console.error(err);
										}
									);
									item.data.buffer.reference.parentNode.insertBefore(
										_item.node,
										item.data.buffer.reference
									);
								} else {
									_item = item.data.buffer.createNode(args);
								}
								item.data.buffer.current.push(_item);
								return _item;
							},
							cacheCurrent: function (length) {
								var _item;
								while (item.data.buffer.current.length > length) {
									_item = item.data.buffer.current.pop();
									if (_item) {
										item.data.buffer.cache.push(
											_item
										);
										_item.node.parentElement.removeChild(_item.node);
									}
								}
							},
							update: function (value) {
								if (Array.isArray(value)) {
									value.forEach(function (_item, index) {
										var args = {};
										args[_key] = index;
										args[_ref] = _item;
										if (!item.data.buffer.current[index]) {
											item.data.buffer.allocNode(args);
										} else {
											Object.assign(
												item.data.buffer.current[index].args,
												args
											);
											item.data.buffer.current[index].node.renderJs(
												config.context,
												item.data.buffer.current[index].args,
												function (err) {
													if (err) console.error(err);
												}
											);
										}
									});
									item.data.buffer.cacheCurrent(value.length);
								} else if (value && typeof (value) === "object") {
									var _keys = Object.keys(value);
									_keys.sort().forEach(function (indexKey, index) {
										var args = {};
										args[_key] = indexKey;
										args[_ref] = value[indexKey];
										if (!item.data.buffer.current[index]) {
											item.data.buffer.allocNode(Object.assign({}, args));
										} else {
											Object.assign(
												item.data.buffer.current[index].args,
												args
											);
											// item.data.buffer.current[index].node.renderJs();
											item.data.buffer.current[index].node.renderJs(
												config.context,
												item.data.buffer.current[index].args,
												function (err) {
													if (err) console.error(err);
												}
											);
										}
									});
									item.data.buffer.cacheCurrent(_keys.length);
								}
							}
						};
						item.data.buffer.current = [];
						item.data.node.parentElement.insertBefore(
							item.data.buffer.reference,
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
				if (typeof (value) === "function") {
					//@ts-ignore
					item.data.node.addEventListener(
						item.data.name,
						function (event) {
							attrParser.value(item, config, function (err, value) {
								if (err) {
									console.error(err);
									return;
								}
								if (value.apply(
									config.context,
									[event]
								) !== false) {
									config.__redraw();
								}
							});
						}
					);
				// } else if (
				// 	//@ts-ignore
				// 	value && typeof (value) === "object" && typeof (value.emit) === "function"
				// ) {
				// 	item.data.node.addEventListener(
				// 		item.data.name,
				// 		function (event, node) {
				// 			//@ts-ignore
				// 			value.emit(item.data.name, [event, node]);
				// 		}
				// 	);
				} else {
					console.warn(
						"🐛 Unknown JSTemplate:event:item destination: ", item,
						"; for value: ", value, ";\n\nℹ Please use a function or ApplicationPrototype Instance"
					);
				}
			}
			break;
		case "binding":
			switch (item.data.name) {
				case "model":
					if (!item.data.buffer) {
						item.data.buffer = value;
						if (typeof (value) === "function") {
							/**
							 * @private
							 * @type {HTMLTextAreaElement}
							 */
							var node = item.data.node;
							switch (node.tagName.toLowerCase()) {
								case "input":
									/**
									 * @private
									 * @var {HTMLInputElement} node
									 */
									var inputType = node.getAttribute('type').toLowerCase();

									if (inputType === "radio") {
										console.warn(
											"🐛 Input[type=\"radio\"] JSTemplate:binding:item not supported: ", item
										);
										break;
									} else if (inputType === "checkbox") {
										//@ts-ignore
										node.checked = value.apply(config.context, [{}]);
										node.addEventListener('change', function (event) {
											//@ts-ignore
											event.__args = config.args;
											//@ts-ignore
											event.__value = !!event.target.checked;
											value.apply(config.context, [event]);

											config.__redraw();
										});
										break;
									} else if (inputType === "file") {
										//@ts-ignore
										node.files = value.apply(config.context, [{}]);
										node.addEventListener('change', function (event) {
											//@ts-ignore
											event.__args = config.args;
											//@ts-ignore
											event.__value = event.target.files;
											value.apply(config.context, [event]);

											config.__redraw();
										});
										break;
									} else {
										/**
										 * @private
										 * @var {HTMLInputElement} node
										 */
										node.value = value({});
										node.addEventListener('input', function (event) {
											//@ts-ignore
											event.__args = config.args;
											//@ts-ignore
											event.__value = event.target.value;
											value.apply(config.context, [event]);

											config.__redraw();
										});
									}
									break;
								case "textarea":
									/**
									 * @private
									 * @var {HTMLTextAreaElement} node
									 */
									node.value = value({});
									node.addEventListener('input', function (event) {
										//@ts-ignore
										event.__args = config.args;
										//@ts-ignore
										event.__value = event.target.value;
										value.apply(config.context, [event]);

										config.__redraw();
									});
								break;
								case "select":
									/**
									 * @private
									 * @var {HTMLSelectElement} node
									 */
									node.value = value({});
									node.addEventListener('change', function (event) {
										//@ts-ignore
										event.__args = config.args;
										//@ts-ignore
										event.__value = event.target.value;
										value.apply(config.context, [event]);

										config.__redraw();
									});
								break;
							}
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
						}
					} else {
						/**
						 * @private
						 * @type {HTMLInputElement}
						 */
						var node = item.data.node;
						var _newValue = null;
						switch (node.tagName.toLowerCase()) {
							case 'input':
								var inputType = node.getAttribute('type').toLowerCase();
								if (inputType === "radio") {
									// TODO
								} else if (inputType === "checkbox") {
									_newValue = !!value({});
									if (node.checked !== _newValue) {
										node.checked = _newValue;
									}
								} else if (inputType === "file") {
									_newValue = value({});
									if (node.files !== _newValue) {
										node.files = _newValue;
									}
								} else {
									_newValue = value({});
									if (node.value !== _newValue) {
										node.value = _newValue;
									}
								}
							break;
							case "textarea":
								_newValue = value({});
								if (node.value !== _newValue) {
									node.value = _newValue;
								}
							break;
							case "select":
								_newValue = value({});
								if (node.value !== _newValue) {
									node.value = _newValue;
								}
							break;
						}
					}
				break;
				default:
					if (!item.data.buffer) {
						item.data.buffer = true;
						console.warn(
							"🚧 In Construction JSTemplate:binding:item  ", item,
							"; for value: ", value
						);
					}
				break;
			}
			break;
	}

	cb(null, status);
	return status;
};


/**
 * @protected
 * @function
 * @param {JSTemplate.jsTemplate_attrResult} item
 * @param {JSTemplate.parseTextNodesConfig} config
 * @param {function (Error, any): void} cb
 */
attrParser.value = function (item, config, cb) {
	/**
	 * @private
	 * @type {jsTemplate_attrResultAttributeData}
	 */
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
				Function.apply({},
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
			typeof (value) === "object" &&
			typeof (value.then) === "function" &&
			typeof (value.catch) === "function"
		) {
			value.then(function (result) {
				cb(null, result);
			}, function (err) {
				cb(err, null);
			});
		} else if (typeof(value) === "function") {
			cb(null, function () {
				return value.apply(config.context, arguments);
			});
		} else {
			cb(null, value);
		}
	}
};


/**
 * @protected
 * @callback nodeParserCallback
 * @memberof JSTemplate
 * @param {Error} err
 * @param {JSTemplate.parseTextNodesConfig} config 
 * @returns {JSTemplate.parseTextNodesConfig}
 */

/**
 * @protected
 * @callback JSTemplateParseContent
 * @memberof JSTemplate
 * @param {HTMLElement} nodeElement 
 * @param {JSTemplate.nodeParserCallback} cb 
 * @param {JSTemplate.parseTextNodesConfig} config 
 * @returns {JSTemplate.parseTextNodesConfig}
 */

/**
 * @protected
 * @function
 * @memberof JSTemplate
 * @param {HTMLElement} nodeElement 
 * @param {JSTemplate.nodeParserCallback} cb 
 * @param {JSTemplate.parseTextNodesConfig} config 
 * @returns {JSTemplate.parseTextNodesConfig}
 */
var nodeParser = function (nodeElement, cb, config) {
	if (typeof (cb) !== "function") cb = function () {};
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
			typeof (config.REMOVE_EMPTY_NODES) === "boolean" ?
			config.REMOVE_EMPTY_NODES : module.exports.config.REMOVE_EMPTY_NODES
		);
	}

	var argsNames = [];
	var argsValues = [];;
	((function (o) {
		if (o && typeof (o) === "object") {
			var i;
			for (i in o) {
				argsNames.push(i);
				argsValues.push(o[i]);
			}
		}
	})(config.args));

	/**
	 * @private
	 * @function
	 * @param {(HTMLElement)} nodeElement 
	 * @returns {JSTemplate.jsTemplateAttrData}
	 */
	var ate = function (nodeElement) {
		//@ts-ignore
		nodeElement.attrdata.__JS_TEMPLATE = nodeElement.attrdata.__JS_TEMPLATE || {
			target: nodeElement,
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

		/**
		 * @private
		 * @type {JSTemplate.jsTemplateAttrData}
		 */
		//@ts-ignore
		var __JS_TEMPLATE = nodeElement.attrdata.__JS_TEMPLATE;

		var i;
		/**
		 * @private
		 * @type {JSTemplate.jsTemplate_attrResult}
		 */
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
		/**
		 * @private
		 * @type {NodeList}
		 */
		var children = Array.prototype.slice.call(nodeElement.childNodes)
			.filter(function ( /** @type {Node} */ node) {
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
			if (!__JS_TEMPLATE.children.find(function (item) {
				return item.target === node;
			})) {
				__JS_TEMPLATE.children.push(ate(node));
			}
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
						return (item.children.length || item.nodes.length || item.texts.length);
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



	var _time = new Date().valueOf();
	var _timer = null;
	var _timerTime = 0;
	var _methods = {
		__requireRedraw: null,
		__renderStarted: false,
		items: ate(nodeElement),
		_config: config,
		redraw: function (cb, context, args) {
			var DEBUG_MODE = 0;

			if (!cb) cb = function () {
				if (DEBUG_MODE) {
					console.log("JSTemplate Redraw", nodeElement);
				}
			};

			var _callbackProtection = function (callback) {
				if (!DEBUG_MODE) return callback;

				var _calls    = 0;
				return function (a0, a1, a2, a3) {
					if (_calls) {
						_calls++;
						console.warn('Multiple callback arguments ', arguments);
						throw Error('Multiple callback calls ' + _calls);
					}
					_calls++;
					callback(a0, a1, a2, a3);
				};
			};

			cb = _callbackProtection(cb);

			if (typeof (context) !== "undefined") {
				config.context = context;
			}
			if (typeof (args) === "object" && args) {
				config.args = args;
			}


			var time = new Date().valueOf();


			var timerWaitedTime = 0;
			if (_timer !== null) {
				timerWaitedTime = time - _timerTime;
				if (DEBUG_MODE) {
					console.warn("🎨 JSTemplate::Redraw Replaces; another render request waited ", timerWaitedTime, "ms", {
						node: nodeElement
					});
				}
			}

			var _delay = 
				Math.max(
					0,
					Math.max(1000 / config.RENDER_FPS - (time - _time), 0) - timerWaitedTime
				);


			if (_methods.__renderStarted) {
				if (DEBUG_MODE) {
					console.warn(
						"🎨 JSTemplate::Redraw Omitted: ", _delay,
						{
							node: nodeElement
						}
					);
				}
				
				if (_methods.__requireRedraw) {
					_methods.__requireRedraw.cb(Error('JSTemplate::Redraw Omitted'));
				}
				_methods.__requireRedraw = { cb: cb, context: context, args: args };
				// @TODO Check
				return;
			}

			if (_timer) {
				clearTimeout(_timer);
				_timer = null;
			}

			_timerTime = time;
			_timer = setTimeout(function () {
				if (_methods.__renderStarted) {
					return false;
				}

				_methods.__renderStarted = true;
				_timer = null;

				config.__argsNames = [];
				config.__argsValues = [];
				((function (o) {
					if (o && typeof (o) === "object") {
						var i;
						for (i in o) {
							config.__argsNames.push(i);
							config.__argsValues.push(o[i]);
						}
					}
				})(config.args));

				/**
				 * @function
				 * @private
				 * @param {JSTemplate.jsTemplateAttrData} item 
				 * @param {function():void} cb 
				 */
				var renderItem = function (item, cb) {
					cb = _callbackProtection(cb);
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
							next = _callbackProtection(next);

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
													renderStop = true;
													next(err);
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
										next = _callbackProtection(next);
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
											if (!item.children.length) {
												cb();
												return;
											}
											libs.async.forEach(
												item.children,
												function (next, itemChild) {
													next = _callbackProtection(next);
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
					console.info("🎨 JSTemplate::Start delay: ", _delay, {
						node: nodeElement
					});
				}
				var sTime = new Date().valueOf();
				try {
					renderItem(
						_methods.items,
						function () {
							_methods.__renderStarted = false;
							if (_methods.__requireRedraw) {
								_methods.redraw(_methods.__requireRedraw.cb, _methods.__requireRedraw.context, _methods.__requireRedraw.args);
								_methods.__requireRedraw = null;
							}
							if (DEBUG_MODE) {
								console.info("🎨 JSTemplate::Finish delay: ", (Math.floor(_delay * 100) / 100), "; time: ", (new Date().valueOf() - sTime), "ms;", {
									node: nodeElement
								});
							}
						}
					);
				} catch (err) {
					_methods.__renderStarted = false;
					if (_methods.__requireRedraw) {
						_methods.redraw(_methods.__requireRedraw.cb, _methods.__requireRedraw.context, _methods.__requireRedraw.args);
						_methods.__requireRedraw = null;
					}
					if (DEBUG_MODE) {
						console.warn("🎨 JSTemplate::Render finished with error: ", (Math.floor(_delay * 100) / 100), "; time: ", (new Date().valueOf() - sTime), "ms;", {
							node: nodeElement
						});
					}
				}

			}, _delay);
		}
	};

	config.__redraw = function () {
		_methods.redraw();
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