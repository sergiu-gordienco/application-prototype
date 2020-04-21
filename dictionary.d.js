/**
 * @callback ApplicationBuilderRequire
 * @param {string | Array<string>} events List of Events Names or Array of Events Mapping like [ "uriLoad :: uri-load", "ePrototype :: extensions/prototype" ]
 * @param {Function} [callback] Callback that will receive Module
 * @returns {PromiseLike<any>}
 */

/**
 * @typedef {object} BindListenerConfig - configuration for binded listeners
 * @property {Boolean} [listenedBefore=true] allow listners before method call
 * @property {Boolean} [listenedOn=true] allow listners on method call ( is after )
 * @property {Boolean} [listenedAfter=true] allow listners after method call ( is after small delay )
 * @property {Boolean} [allowInterruption=true]
 */

/** @callback ApplicationPrototypeListener returns listner Id
 * @param {String | Function} event event name of function with name
 * @param {Function} [callback] function that will listen data
 * @param {String} specifiedEventId event name of function with name
 * @returns {String}
 */

/** @callback ApplicationPrototypeBind returns listner Id
 * @param {String | Function} event event name of function with name
 * @param {Function | BindListenerConfig} [callback] function that will listen data
 * @param {BindListenerConfig|string} [listenersConfig] of lis event name of function with name
 * @returns {String}
 */

/** @callback ApplicationPrototypeListenerRemove returns listner Id
 * @param {String} event event or events names sepparated by comma
 * @param {String} specifiedEventId event name of function with name
 * @returns {String}
 */

/**
 * @callback ApplicationPrototypeCrudEvents returns listner Id
 * @param {Object<any>} context will be used as a base for ApplicationPrototype instance that will be returned
 * @param {Object<Function>} publicMethods list of public methods avaiable from returned instance
 * @param {Object<Function>} privateMethods list of private methods available only for instance's methods
 * @returns {ApplicationPrototypeInstance}
 */

/**
 * @typedef {object} ApplicationPrototypeInstance - configuration for binded listeners
 * @property {ApplicationPrototypeBind} bind - attach a new Method
 * @property {ApplicationPrototypeListener} on - listen an event
 * @property {ApplicationPrototypeListener} once - listen an event once
 * @property {ApplicationPrototypeListenerRemove} off - listen an event
 * @property {ApplicationPrototypeCrudEvents} crudEvents - listen an event once
 */

/**
 * @typedef {Object} ApplicationConsoleOptions
 * @property {Boolean} [file] enable/disable showing filename in console log. default value is `true`
 * @property {Boolean} [contextName] enable/disable showing context Execution info in console log. default value is `true`
 * @property {Boolean} [timestamp] enable/disable showing current timestamp in console log. default value is `true`
 * @property {Boolean} [logType] enable/disable showing log type in console log. default value is `true
 */

/**
 * @typedef {Object} ApplicationModuleStore
 * @description modules store where are indexed modules
 */

/**
 * @callback ApplicationModuleRegister
 * @param {String} path path that will be used as `Application.modulePath()`
 * @param {String[]} modules list of modules names that should be registered
 * @returns {ApplicationModuleStore}
 */

/**
 * @typedef {Object} ApplicationModuleMeta
 * @property {ApplicationModuleStore} store same as `module.cache()`
 * @property {PromiseLike<String>} $requestQuery XMLHttpRequest used for obtaining Module's Content
 * @property {String} module_path module's path
 * @property {String} path module's internal path used as identifier of module
 * @property {String} name module's name
 * @property {String} __dirname module's dirname
 */

/**
 * @callback ApplicationModuleResolve
 * @param {String} module module name
 * @param {String} [path] module path
 * @returns {ApplicationModuleMeta}
 */

/**
 * @typedef {Object} ApplicationNodeInterface
 * @property {function():NodeJS.Process} process
 * @property {function():NodeJS.Global} global
 * @property {function():NodeRequire} require
 * @property {function(string):any} globalReference returns NodeJS require reference by it's name
 */

/**
 * @typedef {Object} ApplicationBuilderInstance - load Application Framework
 * @property {ApplicationPrototypeBind} bind - attach a new Method
 * @property {ApplicationPrototypeListener} on - listen an event
 * @property {ApplicationPrototypeListener} once - listen an event once
 * @property {ApplicationPrototypeListenerRemove} off - listen an event
 * @property {ApplicationPrototypeCrudEvents} crudEvents - listen an event once
 * @property {ApplicationBuilderRequire} require - The class to register
 * @property {function(Function):Promise} Promise
 * @property {function(Array<Promise>):Promise} Promise.all
 * @property {function(Array<Promise>):Promise} Promise.race
 * @property {function(any):Promise} Promise.resolve
 * @property {function(any):Promise} Promise.reject
 * @property {function():boolean} isNode - returns true if application is running in a node env
 * @property {function():boolean} isBrowser - returns true if application is running in a browser env
 * @property {function(boolean):boolean} runModulesInFiles enable/disable to run modules in Blob files, returns current state
 * @property {function(boolean):boolean} debugEnabled enable/disable debug mode, returns current state
 * @property {function(ApplicationConsoleOptions):ApplicationConsoleOptions} consoleOptions update console options.
 * @property {function(String):String} modulePath update current modules path, default returns current module path
 * @property {ApplicationModuleRegister} moduleRegister register new modules
 * @property {ApplicationModuleResolve} moduleResolve resolves module's meta, and index that info in Application's store
 * @property {ApplicationNodeInterface} NodeInterface returns interface for accessing Node Env, is defined only in node env
 */

// /** @typedef {{ prop1: string, prop2: string, prop3?: number }} XXXSpecialType */
// /** @typedef {(data: string, index?: number) => boolean} XXXPredicate */

/**
 * @callback ApplicationPrototypeConstructor
 * @returns {ApplicationPrototypeInstance}
 */
/**
 * @callback ApplicationBuilderConstructor
 * @returns {ApplicationBuilderInstance}
 */



// property {*} _i 	= function(i,n){return ((n + (i % n))%n); };

/**
 * @var {module:extensions/prototype.slDOM} slDOM
 * @memberof module:extensions/prototype
 */
/**
 * @var {module:extensions/prototype.slDOM_env} slDOM_env
 * @memberof module:extensions/prototype
 */
/**
 * @var {module:extensions/prototype.slDOM} _
 * @memberof module:extensions/prototype
 */
/**
 * @var {module:extensions/prototype.slDOMSet} __
 * @memberof module:extensions/prototype
 */

/**
 * @class
 * @name slDOMSet
 * @memberof module:extensions/prototype
 * @param {string} [cssSelector]
 */
/**
 * @method config
 * @memberof module:extensions/prototype.slDOMSet
 * @param {string} key 
 * @param {any} value
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method config
 * @memberof module:extensions/prototype.slDOMSet
 * @param {string} key 
 * @returns {any}
 */
/**
 * @method unique
 * @memberof module:extensions/prototype.slDOMSet
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method set
 * @memberof module:extensions/prototype.slDOMSet
 * @param {string} v css selector applied over document
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method set
 * @memberof module:extensions/prototype.slDOMSet
 * @param {(NodeList|any[])} v array of Nodes or HTMLElements
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method add
 * @memberof module:extensions/prototype.slDOMSet
 * @param {(NodeList|any)} ...v array of Nodes or HTMLElements
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method env
 * @memberof module:extensions/prototype.slDOMSet
 * @returns {module:extensions/prototype.slDOM_env}
 */
/**
 * @method get
 * @memberof module:extensions/prototype.slDOMSet
 * @returns {(Node[])}
 */
/**
 * @method get
 * @memberof module:extensions/prototype.slDOMSet
 * @param {number} index
 * @returns {(Node)}
 */
/**
 * @method eq
 * @memberof module:extensions/prototype.slDOMSet
 * @param {number} index
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method find
 * @memberof module:extensions/prototype.slDOMSet
 * @param {string} cssSelector
 * @returns {module:extensions/prototype.slDOMSet}
 */


/**
 * @callback itemHandler
 * @memberof module:extensions/prototype.slDOMSet
 * @param {Node} node
 * @param {number} index
 * @param {module:extensions/prototype.slDOMSet} context
 * @param {module:extensions/prototype.slDOM} p
 */
/**
 * @callback itemHandlerFilter
 * @memberof module:extensions/prototype.slDOMSet
 * @param {Node} node
 * @param {number} index
 * @param {module:extensions/prototype.slDOMSet} context
 * @param {module:extensions/prototype.slDOM} p
 * @returns {boolean}
 */
/**
 * @callback itemHandlerMap
 * @memberof module:extensions/prototype.slDOMSet
 * @param {Node} node
 * @param {number} index
 * @param {module:extensions/prototype.slDOMSet} context
 * @param {module:extensions/prototype.slDOM} p
 * @returns {Node}
 */
/**
 * @method filter
 * @memberof module:extensions/prototype.slDOMSet
 * @param {module:extensions/prototype.slDOMSet.itemHandlerFilter} filterCallback
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method each
 * @memberof module:extensions/prototype.slDOMSet
 * @param {module:extensions/prototype.slDOMSet.itemHandler} filterCallback
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method map
 * @memberof module:extensions/prototype.slDOMSet
 * @param {module:extensions/prototype.slDOMSet.itemHandlerMap} filterCallback
 * @returns {module:extensions/prototype.slDOMSet}
 */

/**
 * @method attr
 * @memberof module:extensions/prototype.slDOMSet
 * @returns {external:NamedNodeMap}
 */
/**
 * @method attr
 * @memberof module:extensions/prototype.slDOMSet
 * @param {string} attribute
 * @returns {string}
 */
/**
 * @method attr
 * @memberof module:extensions/prototype.slDOMSet
 * @param {string} attribute
 * @param {any} value
 * @returns {module:extensions/prototype.slDOMSet}
 */
/**
 * @method attr
 * @memberof module:extensions/prototype.slDOMSet
 * @param {any} ...attr_value
 * @returns {module:extensions/prototype.slDOMSet}
 */

	// ["toFunction", "x" ].forEach(function (method) {
	// ["sClass", "c" ].forEach(function (method) {
	// [ "g_wh", "r", "pagePXY", "PXY", "eventsCache", "in_e", "i", "is_free", "is_focused", "is_inview", "is_visible" ].forEach(function (method) {
	// [ "on", "off", "opacity", "a2D", "triger", "setVar", "T", "setStyle", "setStyleSPEED", "F", "f", "o", "removeFromDOM", "free", "d", "D", "clearE", "delE", "setVar", "setObjVar", "setObjProto", "V", "v", "p", "adEto", "putBfto", "putAfto", "putBf", "putAf", "Et", "Bt", "At", "pB", "pA", "addE", "addB", "addT", "e", "b", "t", "getTagsByQuery", "getTags", "s", "q", "nextTo", "backTo", "nUP", "nChild", "getParentN", "copyE", "getParentTag", "getByTag", "getByQuery", "getById", "N", "B", "U", "C", "P", "X", "p", "S", "Q", "I" ].forEach(function (method) {



/**
 * @typedef slDOM_env
 * @memberof module:extensions/prototype
 * @property {Boolean} gecko
 * @property {Boolean} old_ie
 * @property {Boolean} ie_lt8
 * @property {Boolean} ie_lt9
 * @property {Boolean} ie_gt10
 * @property {Boolean} ie
 * @property {Boolean} webkit
 * @property {Boolean} qtwebkit
 * @property {Boolean} chrome
 * @property {Boolean} opera
 * @property {Boolean} firefox
 * @property {Boolean} safari
 * @property {Boolean} khtml
 * @property {Boolean} mac_geLion
 * @property {Boolean} mac_geMountainLion
 * @property {Boolean} phantom
 * @property {Boolean} ios
 * @property {Boolean} mobile
 * @property {Boolean} mac
 * @property {Boolean} windows
 * @property {Array|null} opera_version
 * @property {Boolean} flipCtrlCmd
 * @property {Boolean} captureMiddleClick
 * @property {Boolean} android
 * @property {String|false} android_version
 */

/** @typedef {Object<string, (string|number)>} slDOM.ObjectCSSProperties a list of proprieties mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" } */
/** @typedef {Object<string, (string|number)>} slDOM.ObjectAttributes a list of proprieties mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" } */


/**
 * @typedef {object} slDOM returns a pointer that walks over DOM and applying needed operations
 * @memberof module:extensions/prototype
 * @property {slDOM_env} env Environment Flags
 * @property {function (Boolean): HTMLElement} __ if params is `true` then return document otherwise current HTMLElement
 * @property {function(Object): slDOM} a2D apply Css Transforms on elements
 * @property {function(number): slDOM} opacity ( short form **o** ) change element opacity
 * @property {function((HTMLElement|string)): slDOM} setE ( short form **e** ) set a HTMLElement or Create Element for slDOM Pointer
 * @property {function((string|string[]), String?, number?): slDOM | Boolean} sClass =slDOMlib.sClass;
 * @property {function(...string): slDOM()} setArg ( short form **A** ) set Attributes to HTMLElement, arguments order: `[ attribute, value, attribute, value ... ]`
 * @property {function(HTMLElement): slDOM} adEto add current HTMLElement to other HTMLElement;
 * @property {function(HTMLElement): slDOM} putBfto insert current HTMLElement before other HTMLElement
 * @property {function(HTMLElement): slDOM} putAfto insert current HTMLElement after other HTMLElement
 * @property {function((HTMLElement | string), string?, function?): slDOM} putBf =slDOMlib.putBf;
 * @property {function(HTMLElement): slDOM} putAf =slDOMlib.putAf;
 * @property {function((HTMLElement | string), string?, function?): slDOM} addE =slDOMlib.addE;
 * @property {function((HTMLElement | string), string?, function?): slDOM} addB =slDOMlib.addB;
 * @property {function(string): slDOM} addT ( short form **t** ) add text node to HTMLElement;
 * @property {function(number): slDOM} [nextTo=1] ( short form **N** ) moving pointer forward to N neighbors
 * @property {function(number): slDOM} [backTo=1] ( short form **B** ) moving pointer backward to N neighbors
 * @property {function(number?): slDOM} nUP ( short form is U ) goes up on level in doom
 * @property {function(number?): slDOM} nChild ( short form is **C** ) select the *N th* child element
 * @property {function(number?): slDOM} getParentN ( short form is **P** ) select the *N th* parent element
 * @property {function(): slDOM} clearE ( short form is **d** ) remove all childObjects from node
 * @property {function(): slDOM} delE remove HTMLElement from its Parent
 * @property {function(Boolean): slDOM} copyE =slDOMlib.copyE;
 * @property {function(String): slDOM} getParentTag =slDOMlib.getParentTag;
 * @property {function(String, number, Boolean, Boolean): slDOM} getByTag =slDOMlib.getByTag;
 * @property {function(String, number, Boolean, Boolean): slDOM} getByQuery =slDOMlib.getByQuery;
 * @property {function(String): slDOM} getById =slDOMlib.getById;
 * @property {function(String, Boolean): Array<HTMLElement>} getTags =slDOMlib.getTags;
 * @property {function(String, Boolean): Array<HTMLElement>} getTagsByQuery =slDOMlib.getTagsByQuery;
 * @property {function(String): slDOM} triger ( short form **T** ) trigger / emit an event on HTMLElement
 * @property {function(String?): slDOM | HTMLElement | String} getE ( short form **_** ) return HTMLElement ;
 * * if argument[0] is ".tag" return HTMLElement's tagname ;
 * * if argument[0] is ".html" return HTML Content ;
 * * if argument[0] is ".text" return Text Content ;
 * * if argument[0] is "-attributeName" return HTMLElement's Attribute ;
 * * if argument[0] is "!attributeName" remove HTMLElement's Attribute
 * @property {function(slDOM.ObjectCSSProperties): slDOM} setStyle ( short form **f** ) setting css proprieties to HTMLElement
 * @property {function((slDOM.ObjectAttributes | String[])): slDOM} setVar ( short form **V** ) set dot property on HTMLElement
 * @property {function(...slDOM.ObjectAttributes): slDOM} setObjVar ( short form **v** ) setting attributes to HTMLElement
 * @property {function(slDOM.ObjectCSSProperties): slDOM} setStyleSPEED ( short form **F** ) setting css proprieties to HTMLElement with normalizing values by adding units
 * @property {function(): { x: number, y: number }} pagePXY ( short form **PXY** ) get element position on page
 * @property {function(): Boolean} in_e check if HTMLElement is still attached to DOM ( Document Object Manager )
 * @property {function(): { w: number, h: number }} g_wh returns width and height of HTMLElement
 * @property {function((Object | String), Boolean, Function, Object): slDOM} getLIST =slDOMlib.getLIST;
 * @property {function(function(HTMLElement, Object, slDOM), Object): slDOM} toFunction =slDOMlib.toFunction;
 * @property {function(): slDOM} removeFromDOM ( short form **free** ) remove elements from DOM
 * @property {function(number): slDOM} o ( short form **opacity** ) change element opacity
 * @property {function((HTMLElement | String)): slDOM} E ( long form **setE** ) set a HTMLElement or Create Element for slDOM Pointer
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
 * @property {*} p =slDOMlib.setObjProto;
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
 * @typedef {String} ModuleResourceUrl
 * @description resources url is composed from `module's plath` + `resource path`
 */

/**
 * @typedef {Object} ApplicationModule
 * @property {PromiseLike} $request resolves module exports
 * @property {function():any} exports module exports handler
 * @property {Number} atime unix time in milliseconds
 * @property {function():ApplicationBuilderInstance} Application returns current application
 * @property {function():ApplicationModuleStore} cache returns module's reserved cache object
 * @property {function(any):Promise} require require modules from module's folder
 * @property {function(ModuleResourceUrl):String} resourceUrl returns module's resource URL
 * @property {ApplicationModuleMeta} meta module's meta information
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