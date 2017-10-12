var jsTemplateGenerateEventDirective = function (attrName, eventName) {
    return {
        "onRedrawFuncCall": function (attr, nodeElement, funct, context, argsNames, argsValues, args, _methods) {
            var cachePropertyName = "__on-" + eventName + "-callback";
            if (!_methods[cachePropertyName]) {
                nodeElement.addEventListener(eventName, function (ev) {
                    _methods[cachePropertyName].context.__lastFiredNativeEvent = ev;
                    return _methods[cachePropertyName].funct.apply(
                        _methods[cachePropertyName].context,
                        _methods[cachePropertyName].args
                    );
                });
            }
            _methods[cachePropertyName] = {
                funct: funct,
                context: context,
                args: argsValues
            };

            return false;
        }
    };
};

var jsTemplatesDirectives = {
    "ev-click": jsTemplateGenerateEventDirective("js-click", "click")
};

var textNodesUnder = function (el, cb, config) {
    if (typeof (cb) !== "function") cb = function () { };
    var er;
    if (!config) {
        config = {
            opened: false,
            buffer: [],
            args: {},
            context: {},
            start: "{{",
            end: "}}",
            closureNodes: []
        };
    } else {
        config.opened = false;
        config.buffer = [];
        config.args = (config.args || {});
        config.context = (config.context || {});
        config.start = (config.start || '{{');
        config.end = (config.end || '}}');
        config.closureNodes = [];
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

    var _methods = {
        redraw: function () {
            config.closureNodes.forEach(function (nodeObj) {
                nodeObj.redraw();
            });
        }
    };
    try {
        var insertAfter = function (newNode, elNode) {
            if (elNode.nextSibling) {
                elNode.nextSibling.parentNode.insertBefore(newNode, elNode.nextSibling);
            } else {
                elNode.parentNode.appendChild(newNode);
            }
        };
        var closureNode = function (bf) {
            var er, funct;
            var code = [];
            bf.forEach(function (node) {
                if (node.parentNode) {
                    code.push(node.data);
                }
            });
            code = code.join("");
            /* jshint -W054 */
            try {
                funct = (Function.apply({}, argsNames.concat(["return (" + code + " );"])));
            } catch (er) {
                funct = function () {
                    return ["{{ ", er, ":\n", code, " }}"];
                };
            }
            /* jshint +W054 */
            var _methods = {
                nodes: bf,
                initialNodes: bf,
                funct: funct,
                redraw: function () {
                    var nNodes = [], er;
                    try {
                        var val = _methods.funct.apply(config.context, argsValues);
                        if (typeof (val) !== "undefined") {
                            if (!Array.isArray(val)) {
                                val = [val];
                            }
                            val.forEach(function (v) {
                                if (v instanceof Node) {
                                    nNodes.push(v);
                                } else {
                                    if (v && typeof (v.toString) === "function") {
                                        nNodes.push(document.createTextNode(v.toString()));
                                    } else {
                                        nNodes.push(document.createTextNode("" + v));
                                    }
                                }
                            });
                        }
                    } catch (er) { }
                    if (!nNodes.length) {
                        nNodes.push(document.createTextNode(""));
                    }
                    // removing old nodes
                    // TODO divList[0].isEqualNode(divList[2])
                    var equalNodesArr = true;
                    if (_methods.nodes.length !== nNodes.length) {
                        equalNodesArr = false;
                    } else {
                        _methods.nodes.forEach(function (n, i) {
                            if (!n.isEqualNode(nNodes[i])) {
                                equalNodesArr = false;
                            }
                        });
                    }
                    if (equalNodesArr)
                        return;
                    var nodes = _methods.nodes;
                    _methods.nodes = nNodes;
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
                }
            };
            config.closureNodes.push(_methods);
            return _methods;
        };
        var trashNodes = [];
        var ate = function (textNode) {
            var text = textNode.data;
            var firstNode, nextNode, index, cNode;
            if (config.opened) {
                index = (textNode === false ? "" : text).indexOf(config.end);
                if (index === -1 || textNode === false) {
                    if (
                        !textNode.previousSibling
                        || textNode.previousSibling.nodeType !== Node.TEXT_NODE
                    ) {
                        config.buffer = [];
                        config.opened = false;
                    } else {
                        if (textNode !== false) {
                            config.buffer.push(textNode);
                        }
                    }
                } else {
                    config.opened = false;

                    if (index) {
                        firstNode = document.createTextNode(text.subs(index));
                        config.buffer.push(firstNode);
                    }
                    if (index + config.end.length < text.length) {
                        nextNode = document.createTextNode(text.subs(index + config.end.length, 0));
                    }
                    if (firstNode) {
                        textNode.parentNode.insertBefore(firstNode, textNode);
                    }
                    cNode = closureNode(config.buffer);
                    // if (cNode) {
                    //     textNode.parentNode.insertBefore(cNode.node, textNode);
                    // }
                    cNode.redraw();
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
                        firstNode = document.createTextNode(text.subs(index));
                    }
                    if (index + config.end.length < text.length) {
                        nextNode = document.createTextNode(text.subs(index + config.end.length, 0));
                        // config.buffer.push(nextNode);
                    }
                    if (firstNode) {
                        textNode.parentElement.insertBefore(firstNode, textNode);
                    }
                    if (nextNode) {
                        textNode.parentElement.insertBefore(nextNode, textNode);
                    }
                    // textNode.parentElement.removeChild(textNode);
                    textNode.nodeValue = "";
                    trashNodes.push(textNode);
                    if (nextNode) {
                        ate(nextNode);
                    }
                }
            }
        };
        var n, walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        /* jshint -W084 */
        var er;
        while (n = walk.nextNode()) {
            try {
                // console.log(n);
                ate(n);
            } catch (er) {
                console.warn(er);
            }
        }
        trashNodes.forEach(function (node) {
            if (node.parentElement) {
                node.parentElement.removeChild(node);
            }
        });
        trashNodes = null;
        ate(false);
        /* jshint +W084 */
    } catch (er) {
        console.log(er);
    }
    cb(er, _methods);
    return _methods;
};


var attrsNodesUnder = function (el, cb, config) {
    if (typeof (cb) !== "function") cb = function () { };
    if (!config) {
        config = {
            args: {},
            context: {},
            closureNodes: [],
            directives: jsTemplatesDirectives
        };
    } else {
        config.args = (config.args || {});
        config.context = (config.context || {});
        config.closureNodes = [];
        if (config.directives) {
            config.directives = config.directives || {};
            var directiveName;
            for (directiveName in jsTemplatesDirectives) {
                if (!(directiveName in config.directives)) {
                    config.directives[directiveName] = jsTemplatesDirectives[directiveName];
                }
            }
        } else {
            config.directives = jsTemplatesDirectives;
        }
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
    var _methods = {
        redraw: function () {
            config.closureNodes.forEach(function (nodeObj) {
                nodeObj.redraw();
            });
        }
    };
    var closureNode = function (attr, nodeElement) {
        var olderValue;
        if (
            attr.name.length > 3
            && attr.name.substr(0, 3) === "js-"
        ) {
            var attrName = attr.name.substring(3);
            olderValue = attr.value;
            nodeElement.setAttribute(
                attrName,
                ""
            );
            nodeElement.removeAttribute(attr.name);
            attr = ((function (name) {
                var i = 0;
                var attr;
                while (i < nodeElement.attributes.length) {
                    if (nodeElement.attributes[i].name === name) {
                        attr = nodeElement.attributes[i];
                    }
                    i++;
                }
                return attr;
            })(attrName));
            if (!attr) {
                return {
                    redraw: function () { }
                };
            }
        }

        var directiveConfig = config.directives[attr.name] || {};

        var code = (olderValue || attr.value) + "";
        var _methods = {
            value: false,
            initialValue: olderValue || attr.value,
            redraw: function () {
                var newVal = code.replace(/\{\{([\s\S]*)\}\}/g, function (m, code, offset, s) {
                    var funct;
                    /* jshint -W054 */
                    try {
                        funct = (Function.apply({}, argsNames.concat(["return (" + code + " );"])));
                    } catch (er) {
                        funct = function () {
                            return ["{{ ", er, ":\n", code, " }}"];
                        };
                    }
                    /* jshint +W054 */
                    var val;
                    if (directiveConfig.onRedrawFuncCall) {
                        if (directiveConfig.onRedrawFuncCall(attr, nodeElement, funct, config.context, argsNames, argsValues, config.args, _methods) !== false) {
                            val = funct.apply(config.context, argsValues);
                        } else {
                            return;
                        }
                    } else {
                        val = funct.apply(config.context, argsValues);
                    }
                    if (typeof (val) !== "undefined") {
                        if (!Array.isArray(val)) {
                            if (val && typeof (val.toString) === "function") {
                                return val.toString();
                            } else {
                                return "" + val;
                            }
                        } else {
                            return val.map(function (v) {
                                if (v && typeof (v.toString) === "function") {
                                    return v.toString();
                                } else {
                                    return "" + v;
                                }
                            }).join("");
                        }
                    } else {
                        return "";
                    }
                });
                if (newVal === _methods.value) {

                } else {
                    _methods.value = newVal;
                    attr.value = newVal;
                    // console.log(attr);
                }
            }
        };
        config.closureNodes.push(_methods);
        return _methods;
    };
    var ate = function (nodeElement) {
        var i;
        for (i = 0; i < nodeElement.attributes.length; i++) {
            if ((nodeElement.attributes[i].value + "").match(/\{\{([\s\S]*)\}\}/)) {
                closureNode(nodeElement.attributes[i], nodeElement).redraw();
            }
        }
    };
    var n, walk = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, null, false);
    /* jshint -W084 */
    ate(el);
    while (n = walk.nextNode()) {
        ate(n);
    }
    /* jshint +W084 */
    cb(undefined, _methods);
    return _methods;
};



Element.prototype.renderJs = function (context, args, cb) {
    this.renderJsArgs(context, args, cb);
    this.renderJsTemplate(context, args, cb);
};

Element.prototype.renderJsTemplate = function (context, args, cb) {
    if (!this.__renderContent) {
        this.__renderContent = module.exports.parseContent(this, cb, {
            context: (context || this),
            args: (args || [])
        });
    } else {
        this.__renderContent.redraw();
    }
};

Element.prototype.renderJsArgs = function (context, args, cb) {
    if (!this.__renderArgs) {
        this.__renderArgs = module.exports.parseAttributes(this, cb, {
            context: (context || this),
            args: (args || [])
        });
    } else {
        this.__renderArgs.redraw();
    }
};

Application.require(["extensions/prototype"]).then(function (lib) {
    module.exports = {
        parseContent: textNodesUnder,
        parseAttributes: attrsNodesUnder,

    };
});

