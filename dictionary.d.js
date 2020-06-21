/**
 * @interface ApplicationPrototype
 */

/**
 * @class
 * @name Instance
 * @memberof ApplicationPrototype
 */

/**
 * @typedef {object} BindListenerConfig - configuration for bind listeners
 * @memberof ApplicationPrototype.Instance
 * @property {boolean} [listenedBefore=true] allow listeners before method call
 * @property {boolean} [listenedOn=true] allow listeners on method call ( is after )
 * @property {boolean} [listenedAfter=true] allow listeners after method call ( is after small delay )
 * @property {boolean} [allowInterruption=true]
 */

/**
 * returns listener Id
 * @method on
 * @memberof ApplicationPrototype.Instance
 * @param {string|function} event event name of function with name
 * @param {function} [callback] function that will listen data
 * @param {string} [specifiedEventId] event name of function with name
 * @returns {string}
 */

/**
 * returns listener Id
 * @method once
 * @memberof ApplicationPrototype.Instance
 * @param {string|function} event event name of function with name
 * @param {function} [callback] function that will listen data
 * @param {string} [specifiedEventId] event name of function with name
 * @returns {string}
 */

/**
 * returns listener Id
 * @method bind
 * @memberof ApplicationPrototype.Instance
 * @param {string|function} event event name of function with name
 * @param {function|ApplicationPrototype.Instance.BindListenerConfig} [callback] function that will listen data
 * @param {ApplicationPrototype.Instance.BindListenerConfig|string} [listenersConfig] of lis event name of function with name
 * @returns {string}
 */

/**
 * remove all event listeners
 * @method off
 * @memberof ApplicationPrototype.Instance
 * @param {string} event event or events names separated by comma
 * @param {string} [specifiedEventId] event name of function with name
 * @returns {boolean}
 */

/**
 * returns listener Id
 * @method crudEvents
 * @memberof ApplicationPrototype.Instance
 * @param {Object<any>} context will be used as a base for ApplicationPrototype instance that will be returned
 * @param {Object<Function>} publicMethods list of public methods available from returned instance
 * @param {Object<Function>} privateMethods list of private methods available only for instance's methods
 * @returns {ApplicationPrototype.Instance}
 */

/**
 * returns listener Id
 * @callback PropertyHandler
 * @memberof ApplicationPrototype.Instance
 * @param {any} value is undefined when `isSetter = true`
 * @param {any} lastValue
 * @param {boolean} isSetter
 */

/**
 * @method property
 * @memberof ApplicationPrototype.Instance
 * @param {string} propertyName
 * @param {ApplicationPrototype.Instance.PropertyHandler} getter
 * @param {ApplicationPrototype.Instance.PropertyHandler} [setter]
 * @param {object} [config]
 * @param {boolean} [config.configurable=true]
 * @param {boolean} [config.enumerable=true]
 * @fires ApplicationPrototype.Instance.__onSet
 * @fires ApplicationPrototype.Instance.__onGet
 * @fires ApplicationPrototype.Instance.__afterGet
 * @fires ApplicationPrototype.Instance.__afterGet
 * @fires ApplicationPrototype.Instance.__onSet::propName
 * @fires ApplicationPrototype.Instance.__onGet::propName
 * @fires ApplicationPrototype.Instance.__afterGet::propName
 * @fires ApplicationPrototype.Instance.__afterGet::propName
 *//**
 * @method property
 * @memberof ApplicationPrototype.Instance
 * @param {ApplicationPrototype.PropertyHandler} getter function with name
 * @param {ApplicationPrototype.PropertyHandler} [setter]
 * @param {object} [config]
 * @param {boolean} [config.configurable=true]
 * @param {boolean} [config.enumerable=true]
 */

/**
 * @event __onGet
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {string} propName
 * @property {any} value
 * @property {any} lastValue
 */
/**
 * @event __onSet
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {string} propName
 * @property {any} value
 * @property {any} lastValue
 */
/**
 * @event __afterGet
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {string} propName
 * @property {any} value
 * @property {any} lastValue
 */
/**
 * @event __afterSet
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {string} propName
 * @property {any} value
 * @property {any} lastValue
 */

/**
 * @event __onGet::propName
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {any} value
 * @property {any} lastValue
 */
/**
 * @event __onSet::propName
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {any} value
 * @property {any} lastValue
 */
/**
 * @event __afterGet::propName
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {any} value
 * @property {any} lastValue
 */
/**
 * @event __afterSet::propName
 * @memberof ApplicationPrototype.Instance
 * @type {object}
 * @property {any} value
 * @property {any} lastValue
 */

/**
 * @class
 * @name Builder
 * @memberof ApplicationPrototype
 * @augments ApplicationPrototype.Instance
 */

/**
 * @method require
 * @memberof ApplicationPrototype.Builder
 * @param {string|string[]} events List of Events Names or Array of Events Mapping like [ "uriLoad :: uri-load", "ePrototype :: ExtensionsPrototype" ]
 * @param {function} [callback] Callback that will receive Module
 * @returns {PromiseLike<any>}
 */

/**
 * @class
 * @name Promise
 * @memberof ApplicationPrototype.Builder
 * @param {function} handler
 * @returns {PromiseLike<any>}
 */

/**
 * @method all
 * @memberof ApplicationPrototype.Builder.Promise
 * @param {Promise[]} items
 * @returns {PromiseLike<any[]>}
 */

/**
 * @method race
 * @memberof ApplicationPrototype.Builder.Promise
 * @param {Promise[]} items
 * @returns {PromiseLike<any[]>}
 */

/**
 * @method resolve
 * @memberof ApplicationPrototype.Builder.Promise
 * @param {any} value
 * @returns {PromiseLike<any>}
 */

/**
 * @method reject
 * @memberof ApplicationPrototype.Builder.Promise
 * @param {any} value
 * @returns {PromiseLike<Error>}
 */

/**
 * @method isNode
 * @memberof ApplicationPrototype.Builder
 * @returns {boolean}
 */

/**
 * @method isBrowser
 * @memberof ApplicationPrototype.Builder
 * @returns {boolean}
 */

/**
 * @method debugEnabled
 * @memberof ApplicationPrototype.Builder
 * @param {boolean} [status]
 * @returns {boolean}
 */

/**
 * @method runModulesInFiles
 * @memberof ApplicationPrototype.Builder
 * @param {boolean} [status]
 * @returns {boolean}
 */

/**
 * @method consoleOptions
 * @memberof ApplicationPrototype.Builder
 * @param {ApplicationPrototype.Builder.ConsoleOptions} [options]
 * @returns {ApplicationPrototype.Builder.ConsoleOptions}
 */

/**
 * @method modulePath
 * @memberof ApplicationPrototype.Builder
 * @param {string} [path]
 * @returns {string}
 */

/**
 * @typedef {object} ConsoleOptions
 * @memberof ApplicationPrototype.Builder
 * @property {boolean} [file] enable/disable showing filename in console log. default value is `true`
 * @property {boolean} [contextName] enable/disable showing context Execution info in console log. default value is `true`
 * @property {boolean} [timestamp] enable/disable showing current timestamp in console log. default value is `true`
 * @property {boolean} [logType] enable/disable showing log type in console log. default value is `true
 */


/**
 * @typedef {object} ModuleStore
 * @memberof ApplicationPrototype.Builder
 * @description modules store where are indexed modules
 */

/**
 * @method moduleRegister
 * @memberof ApplicationPrototype.Builder
 * @param {string} path path that will be used as `Application.modulePath()`
 * @param {string[]} modules list of modules names that should be registered
 * @returns {ApplicationPrototype.Builder.ModuleStore}
 */

/**
 * @typedef {object} ModuleMeta
 * @memberof ApplicationPrototype.Builder
 * @property {ApplicationPrototype.Builder.ModuleStore} store same as `module.cache()`
 * @property {PromiseLike<string>} $requestQuery XMLHttpRequest used for obtaining Module's Content
 * @property {string} module_path module's path
 * @property {string} path module's internal path used as identifier of module
 * @property {string} name module's name
 * @property {string} __dirname module's dirname
 */

/**
 * @callback moduleResolve
 * @memberof ApplicationPrototype.Builder
 * @param {string} module module name
 * @param {string} [path] module path
 * @returns {ApplicationPrototype.Builder.ModuleMeta}
 */

/**
 * returns interface for accessing Node Env, is defined only in node env
 * @var NodeInterface
 * @type {object}
 * @property {function():NodeJS.Process} process
 * @property {function():NodeJS.Global} global
 * @property {function():NodeRequire} require
 * @property {function(string):any} globalReference returns NodeJS require reference by it's name
 */

// /** @typedef {{ prop1: string, prop2: string, prop3?: number }} XXXSpecialType */
// /** @typedef {(data: string, index?: number) => boolean} XXXPredicate */

/**
 * @callback ApplicationPrototypeConstructor
 * @returns {ApplicationPrototype.Instance}
 */

/**
 * @callback ApplicationBuilderConstructor
 * @returns {ApplicationPrototype.Builder}
 */



// property {*} _i 	= function(i,n){return ((n + (i % n))%n); };

/**
 * @var {ExtensionsPrototype.slDOM} _
 * @memberof ExtensionsPrototype
 */
/**
 * @var {ExtensionsPrototype.slDOMSet} __
 * @memberof ExtensionsPrototype
 */

/**
 * @class
 * @name slDOMSet
 * @memberof ExtensionsPrototype
 * @param {string} [cssSelector]
 */
/**
 * @method config
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {string} key 
 * @param {any} value
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method config
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {string} key 
 * @returns {any}
 */
/**
 * @method unique
 * @memberof ExtensionsPrototype.slDOMSet
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method set
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {string} v css selector applied over document
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method set
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {(NodeList|any[])} v array of Nodes or HTMLElements
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method add
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {(NodeList|any)} ...v array of Nodes or HTMLElements
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method env
 * @memberof ExtensionsPrototype.slDOMSet
 * @returns {ExtensionsPrototype.slDOM_env}
 */
/**
 * @method get
 * @memberof ExtensionsPrototype.slDOMSet
 * @returns {(Node[])}
 */
/**
 * @method get
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {number} index
 * @returns {(Node)}
 */
/**
 * @method eq
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {number} index
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method find
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {string} cssSelector
 * @returns {ExtensionsPrototype.slDOMSet}
 */


/**
 * @callback itemHandler
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {Node} node
 * @param {number} index
 * @param {ExtensionsPrototype.slDOMSet} context
 * @param {ExtensionsPrototype.slDOM} p
 */
/**
 * @callback itemHandlerFilter
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {Node} node
 * @param {number} index
 * @param {ExtensionsPrototype.slDOMSet} context
 * @param {ExtensionsPrototype.slDOM} p
 * @returns {boolean}
 */
/**
 * @callback itemHandlerMap
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {Node} node
 * @param {number} index
 * @param {ExtensionsPrototype.slDOMSet} context
 * @param {ExtensionsPrototype.slDOM} p
 * @returns {Node}
 */
/**
 * @method filter
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {ExtensionsPrototype.slDOMSet.itemHandlerFilter} filterCallback
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method each
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {ExtensionsPrototype.slDOMSet.itemHandler} filterCallback
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method map
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {ExtensionsPrototype.slDOMSet.itemHandlerMap} filterCallback
 * @returns {ExtensionsPrototype.slDOMSet}
 */

/**
 * @method attr
 * @memberof ExtensionsPrototype.slDOMSet
 * @returns {NamedNodeMap}
 */
/**
 * @method attr
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {string} attribute
 * @returns {string}
 */
/**
 * @method attr
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {string} attribute
 * @param {any} value
 * @returns {ExtensionsPrototype.slDOMSet}
 */
/**
 * @method attr
 * @memberof ExtensionsPrototype.slDOMSet
 * @param {any} ...attr_value
 * @returns {ExtensionsPrototype.slDOMSet}
 */

	// ["toFunction", "x" ].forEach(function (method) {
	// ["sClass", "c" ].forEach(function (method) {
	// [ "g_wh", "r", "pagePXY", "PXY", "eventsCache", "in_e", "i", "is_free", "is_focused", "is_inview", "is_visible" ].forEach(function (method) {
	// [ "on", "off", "opacity", "a2D", "triger", "setVar", "T", "setStyle", "setStyleSPEED", "F", "f", "o", "removeFromDOM", "free", "d", "D", "clearE", "delE", "setVar", "setObjVar", "setObjProto", "V", "v", "p", "adEto", "putBfto", "putAfto", "putBf", "putAf", "Et", "Bt", "At", "pB", "pA", "addE", "addB", "addT", "e", "b", "t", "getTagsByQuery", "getTags", "s", "q", "nextTo", "backTo", "nUP", "nChild", "getParentN", "copyE", "getParentTag", "getByTag", "getByQuery", "getById", "N", "B", "U", "C", "P", "X", "p", "S", "Q", "I" ].forEach(function (method) {



/**
 * @typedef slDOM_env
 * @memberof ExtensionsPrototype
 * @property {boolean} gecko
 * @property {boolean} old_ie
 * @property {boolean} ie_lt8
 * @property {boolean} ie_lt9
 * @property {boolean} ie_gt10
 * @property {boolean} ie
 * @property {boolean} webkit
 * @property {boolean} qtwebkit
 * @property {boolean} chrome
 * @property {boolean} opera
 * @property {boolean} firefox
 * @property {boolean} safari
 * @property {boolean} khtml
 * @property {boolean} mac_geLion
 * @property {boolean} mac_geMountainLion
 * @property {boolean} phantom
 * @property {boolean} ios
 * @property {boolean} mobile
 * @property {boolean} mac
 * @property {boolean} windows
 * @property {Array|null} opera_version
 * @property {boolean} flipCtrlCmd
 * @property {boolean} captureMiddleClick
 * @property {boolean} android
 * @property {string|false} android_version
 */

/**
 * @typedef {Object<string,(string|number)>} slDOM_ObjectCSSProperties a list of proprieties mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" }
 * @memberof ExtensionsPrototype
 */
/**
 * @typedef {Object<string,(string|number)>} slDOM_ObjectAttributes a list of proprieties mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" }
 * @memberof ExtensionsPrototype
 */


/**
 * @typedef {object} slDOM returns a pointer that walks over DOM and applying needed operations
 * @memberof ExtensionsPrototype
 * @property {ExtensionsPrototype.slDOM_env} env Environment Flags
 * @property {function(boolean):HTMLElement} __ if params is `true` then return document otherwise current HTMLElement
 * @property {function(object):ExtensionsPrototype.slDOM} a2D apply Css Transforms on elements
 * @property {function(number):ExtensionsPrototype.slDOM} opacity ( short form **o** ) change element opacity
 * @property {function((HTMLElement|string)):ExtensionsPrototype.slDOM} setE ( short form **e** ) set a HTMLElement or Create Element for slDOM Pointer
 * @property {function((string|string[]),string?,number?):ExtensionsPrototype.slDOM|boolean} sClass =slDOMlib.sClass;
 * @property {function(...string):slDOM} setArg ( short form **A** ) set Attributes to HTMLElement, arguments order: `[ attribute, value, attribute, value ... ]`
 * @property {function(HTMLElement):slDOM} adEto add current HTMLElement to other HTMLElement;
 * @property {function(HTMLElement):slDOM} putBfto insert current HTMLElement before other HTMLElement
 * @property {function(HTMLElement):slDOM} putAfto insert current HTMLElement after other HTMLElement
 * @property {function((HTMLElement|string),string?,function?):slDOM} putBf =slDOMlib.putBf;
 * @property {function(HTMLElement):slDOM} putAf =slDOMlib.putAf;
 * @property {function((HTMLElement|string),string?,function?):slDOM} addE =slDOMlib.addE;
 * @property {function((HTMLElement|string),string?,function?):slDOM} addB =slDOMlib.addB;
 * @property {function(string):slDOM} addT ( short form **t** ) add text node to HTMLElement;
 * @property {function(number):slDOM} [nextTo=1] ( short form **N** ) moving pointer forward to N neighbors
 * @property {function(number):slDOM} [backTo=1] ( short form **B** ) moving pointer backward to N neighbors
 * @property {function(number?):slDOM} nUP ( short form is U ) goes up on level in doom
 * @property {function(number?):slDOM} nChild ( short form is **C** ) select the *N th* child element
 * @property {function(number?):slDOM} getParentN ( short form is **P** ) select the *N th* parent element
 * @property {function():slDOM} clearE ( short form is **d** ) remove all childObjects from node
 * @property {function():slDOM} delE remove HTMLElement from its Parent
 * @property {function(boolean):slDOM} copyE =slDOMlib.copyE;
 * @property {function(string):slDOM} getParentTag =slDOMlib.getParentTag;
 * @property {function(string,number,boolean,boolean):slDOM} getByTag =slDOMlib.getByTag;
 * @property {function(string,number,boolean,boolean):slDOM} getByQuery =slDOMlib.getByQuery;
 * @property {function(string):slDOM} getById =slDOMlib.getById;
 * @property {function(string,boolean):Array<HTMLElement>} getTags =slDOMlib.getTags;
 * @property {function(string,boolean):Array<HTMLElement>} getTagsByQuery =slDOMlib.getTagsByQuery;
 * @property {function(string):slDOM} triger ( short form **T** ) trigger / emit an event on HTMLElement
 * @property {function(string?):slDOM|HTMLElement|string} getE ( short form **_** ) return HTMLElement ;
 * * if argument[0] is ".tag" return HTMLElement's tagname ;
 * * if argument[0] is ".html" return HTML Content ;
 * * if argument[0] is ".text" return Text Content ;
 * * if argument[0] is "-attributeName" return HTMLElement's Attribute ;
 * * if argument[0] is "!attributeName" remove HTMLElement's Attribute
 * @property {function(ExtensionsPrototype.slDOM_ObjectCSSProperties): slDOM} setStyle ( short form **f** ) setting css proprieties to HTMLElement
 * @property {function((ExtensionsPrototype.slDOM_ObjectAttributes | string[])): slDOM} setVar ( short form **V** ) set dot property on HTMLElement
 * @property {function(...ExtensionsPrototype.slDOM_ObjectAttributes): slDOM} setObjVar ( short form **v** ) setting attributes to HTMLElement
 * @property {function(ExtensionsPrototype.slDOM_ObjectCSSProperties): slDOM} setStyleSPEED ( short form **F** ) setting css proprieties to HTMLElement with normalizing values by adding units
 * @property {function(): { x: number, y: number }} pagePXY ( short form **PXY** ) get element position on page
 * @property {function(): Boolean} in_e check if HTMLElement is still attached to DOM ( Document Object Manager )
 * @property {function(): { w: number, h: number }} g_wh returns width and height of HTMLElement
 * @property {function((object | string), boolean, function, object): slDOM} getLIST =slDOMlib.getLIST;
 * @property {function(function(HTMLElement, object, slDOM), object): slDOM} toFunction =slDOMlib.toFunction;
 * @property {function(): slDOM} removeFromDOM ( short form **free** ) remove elements from DOM
 * @property {function(number): slDOM} o ( short form **opacity** ) change element opacity
 * @property {function((HTMLElement | string)): slDOM} E ( long form **setE** ) set a HTMLElement or Create Element for slDOM Pointer
 * @property {*} c =slDOMlib.sClass;
 * @property {function(string): Object} attrs 	= slDOMlib.attrs;
 * @property {*} A =slDOMlib.setArg;
 * @property {*} Et =slDOMlib.adEto;
 * @property {*} Bt =slDOMlib.putBfto;
 * @property {*} At =slDOMlib.putAfto;
 * @property {*} pB =slDOMlib.putBf;
 * @property {*} pA =slDOMlib.putAf;
 * @property {*} e =slDOMlib.addE;
 * @property {*} b =slDOMlib.addB;
 * @property {*} t =slDOMlib.addT;
 * @property {*} N =slDOMlib.nextTo;
 * @property {*} B =slDOMlib.backTo;
 * @property {*} U =slDOMlib.nUP;
 * @property {*} C =slDOMlib.nChild;
 * @property {*} P =slDOMlib.getParentN;
 * @property {*} d =slDOMlib.clearE;
 * @property {*} D =slDOMlib.delE;
 * @property {*} X =slDOMlib.copyE;
 * @property {*} p =slDOMlib.getParentTag;
 * @property {*} S =slDOMlib.getByTag;
 * @property {*} Q =slDOMlib.getByQuery;
 * @property {*} I =slDOMlib.getById;
 * @property {*} s =slDOMlib.getTags;
 * @property {*} q =slDOMlib.getTagsByQuery;
 * @property {*} T =slDOMlib.triger;
 * @property {*} _ =slDOMlib.getE;
 * @property {*} $ =slDOMlib.getLIST;
 * @property {*} F =slDOMlib.setStyleSPEED;
 * @property {*} f =slDOMlib.setStyle;
 * @property {*} L =slDOMlib.getLIST;
 * @property {*} V =slDOMlib.setVar;
 * @property {*} v =slDOMlib.setObjVar;
 * @property {*} PXY =slDOMlib.pagePosXY;
 * @property {*} i =slDOMlib.in_e;
 * @property {*} r =slDOMlib.g_wh;
 * @property {*} x =slDOMlib.toFunction;
 * @property {function(): slDOM} free 	= slDOMlib.removeFromDOM;
 * @property {function(): Boolean} is_free 	= slDOMlib.is_free;
 * @property {function(): Boolean} is_focused 	= slDOMlib.is_focused;
 * @property {function(): Boolean} is_inview 	= slDOMlib.elementInViewport;
 * @property {function(): Boolean} is_visible 	= slDOMlib.elementIsVisible;
 * @property {*} _normalizeCssValues 	= slDOMlib._normalizeCssValues;
 * @property {*} on 	= slDOMlib.on;
 * @property {*} off 	= slDOMlib.off;
 * @property {function(): Object} eventsCache 	= slDOMlib.eventsCache;
 */

// /** @class */
// /** @type {ApplicationPrototypeInstance} */
// function ApplicationPrototype() {
// 	/** @type {ApplicationPrototypeBind} */
// 	this.bind = function (event, callback, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeListener} */
// 	this.on = function (event, callback, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeListener} */
// 	this.once = function (event, callback, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeListenerRemove} */
// 	this.off = function (event, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeCrudEvents} */
// 	this.crudEvents = function (context, publicMethods, privateMethods) {
// 		return new ApplicationPrototype();
// 	}
// }

// /** @class */
// /** @type {ApplicationBuilderInstance} */
// function ApplicationBuilder() {
// 	/** @type {ApplicationPrototypeBind} */
// 	this.bind = function (event, callback, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeListener} */
// 	this.on = function (event, callback, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeListener} */
// 	this.once = function (event, callback, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeListenerRemove} */
// 	this.off = function (event, specifiedEventId) { return String };
// 	/** @type {ApplicationPrototypeCrudEvents} */
// 	this.crudEvents = function (context, publicMethods, privateMethods) {
// 		return new ApplicationPrototype();
// 	}
// 	/** @type {ApplicationBuilderRequire} */
// 	this.require = function (events, callback) {
// 		return new Promise();
// 	}

// 	/** @type {Promise} */
// 	this.Promise;
// }

// /** @namespace */
// var Application = new ApplicationBuilder();


/**
 * @typedef {string} ModuleResourceUrl
 * @memberof ApplicationPrototype.Builder
 * @description resources url is composed from `module's plath` + `resource path`
 */

/**
 * @typedef {Object} ApplicationModule
 * @memberof ApplicationPrototype.Builder
 * @property {PromiseLike<XMLHttpRequest>} $request resolves module exports
 * @property {function():any} exports module exports handler
 * @property {number} atime unix time in milliseconds
 * @property {function():ApplicationPrototype.Builder} Application returns current application
 * @property {function():ApplicationPrototype.Builder.ModuleStore} cache returns module's reserved cache object
 * @property {function(any):Promise} require require modules from module's folder
 * @property {function(ModuleResourceUrl):string} resourceUrl returns module's resource URL
 * @property {ApplicationPrototype.Builder.ModuleMeta} meta module's meta information
 */

// /** @namespace */
// /** @type {ApplicationModule} */
// var module = {
// 	exports : {}
// };


/**
 * @typedef ApplicationBuilderExports
 * @property {ApplicationPrototypeConstructor} application
 * @property {ApplicationBuilderConstructor} builder
 */

/// <reference path="constructors/request.js" />