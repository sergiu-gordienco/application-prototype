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
 * @property {Boolean} [allowInteruption=true]
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
 * @param {BindListenerConfig} [listenersConfig] of lis event name of function with name
 * @returns {String}
 */

/** @callback ApplicationPrototypeListenerRemove returns listner Id
 * @param {String} event event or events names sepparated by comma
 * @param {String} specifiedEventId event name of function with name
 * @returns {String}
 */

/** @callback ApplicationPrototypeCrudEvents returns listner Id
 * @param {Object<any>} context will be used as a base for ApplicationPrototype instance that will be returned
 * @param {Object<Function>} publicMethods list of public methods avaiable from returned instance
 * @param {Object<Function>} privateMethods list of private methods available only for instance's methods
 * @returns {ApplicationPrototype}
 */

/**
 * @typedef {object} ApplicationPrototype - configuration for binded listeners
 * @property {ApplicationPrototypeBind} bind - attach a new Method
 * @property {ApplicationPrototypeListener} on - listen an event
 * @property {ApplicationPrototypeListener} once - listen an event once
 * @property {ApplicationPrototypeListenerRemove} off - listen an event
 * @property {ApplicationPrototypeCrudEvents} crudEvents - listen an event once
 */

/**
 * @typedef {object} ApplicationBuilder - load Application Framework
 * @property {ApplicationPrototypeBind} bind - attach a new Method
 * @property {ApplicationPrototypeListener} on - listen an event
 * @property {ApplicationPrototypeListener} once - listen an event once
 * @property {ApplicationPrototypeListenerRemove} off - listen an event
 * @property {ApplicationPrototypeCrudEvents} crudEvents - listen an event once
 * @property {ApplicationBuilderRequire} require - The class to register
 */

/** @typedef {{ prop1: string, prop2: string, prop3?: number }} XXXSpecialType */
/** @typedef {(data: string, index?: number) => boolean} XXXPredicate */



// property {*} _i 	= function(i,n){return ((n + (i % n))%n); };

/** @typedef {ApplicationPrototype.slDOM} slDOM */
/** @typedef {ApplicationPrototype.slDOM.env} slDOM.env */



/**
 * @typedef ApplicationPrototype.slDOM.env
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

/** @typedef {{cssprop?: cssvalue, cssprop2?: value ... }} slDOM.ObjectCSSProperties a list of proprietes mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" } */
/** @typedef {{attribute?: cssvalue, attribute2?: value ... }} slDOM.ObjectAttributes a list of proprietes mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" } */


/**
 * @typedef ApplicationPrototype.slDOM returns a pointer that walks over DOM and applying needed operations
 * @property {ApplicationPrototype.slDOM.env} env Environment Flags
 * @property {function (Boolean): HTMLElement} __ if params is `true` then return document otherwise current HTMLElement
 * @property {function(Object): ApplicationPrototype.slDOM} a2D apply Css Transforms on elements
 * @property {function(number): ApplicationPrototype.slDOM} opacity ( short form **o** ) change element opacity
 * @property {function((HTMLElement | String)): ApplicationPrototype.slDOM} setE ( short form **e** ) set a HTMLElement or Create Element for slDOM Pointer
 * @property {function((Array<String> | String), String?, number?): ApplicationPrototype.slDOM | Boolean} sClass =slDOMlib.sClass;
 * @property {function(String,String,...): ApplicationPrototype.slDOM()} setArg ( short form **A** ) set Attributes to HTMLElement, arguments order: `[ attribute, value, attribute, value ... ]`
 * @property {function(HTMLElement): ApplicationPrototype.slDOM} adEto add current HTMLElement to other HTMLElement;
 * @property {function(HTMLElement): ApplicationPrototype.slDOM} putBfto insert current HTMLElement before other HTMLElement
 * @property {function(HTMLElement): ApplicationPrototype.slDOM} putAfto insert current HTMLElement after other HTMLElement
 * @property {function((HTMLElement | String), string?, function?): ApplicationPrototype.slDOM} putBf =slDOMlib.putBf;
 * @property {function(HTMLElement): ApplicationPrototype.slDOM} putAf =slDOMlib.putAf;
 * @property {function((HTMLElement | String), string?, function?): ApplicationPrototype.slDOM} addE =slDOMlib.addE;
 * @property {function((HTMLElement | String), string?, function?): ApplicationPrototype.slDOM} addB =slDOMlib.addB;
 * @property {function(String): ApplicationPrototype.slDOM} addT ( short form **t** ) add text node to HTMLElement;
 * @property {function(number=1): ApplicationPrototype.slDOM} nextTo ( short form **N** ) moving pointer forward to N neighbors
 * @property {function(number=1): ApplicationPrototype.slDOM} backTo ( short form **B** ) moving pointer backward to N neighbors
 * @property {function(number?): ApplicationPrototype.slDOM} nUP ( short form is U ) goes up on level in doom
 * @property {function(number?): ApplicationPrototype.slDOM} nChild ( short form is **C** ) select the *N th* child element
 * @property {function(number?): ApplicationPrototype.slDOM} getParentN ( short form is **P** ) select the *N th* parent element 
 * @property {function(): ApplicationPrototype.slDOM} clearE ( short form is **d** ) remove all childObjects from node
 * @property {function(): ApplicationPrototype.slDOM} delE remove HTMLElement from its Parent
 * @property {function(Boolean): ApplicationPrototype.slDOM} copyE =slDOMlib.copyE;
 * @property {function(String): ApplicationPrototype.slDOM} getParentTag =slDOMlib.getParentTag;
 * @property {function(String, number, Boolean, Boolean): ApplicationPrototype.slDOM} getByTag =slDOMlib.getByTag;
 * @property {function(String, number, Boolean, Boolean): ApplicationPrototype.slDOM} getByQuery =slDOMlib.getByQuery;
 * @property {function(String): ApplicationPrototype.slDOM} getById =slDOMlib.getById;
 * @property {function(String, Boolean): Array<HTMLElement>} getTags =slDOMlib.getTags;
 * @property {function(String, Boolean): Array<HTMLElement>} getTagsByQuery =slDOMlib.getTagsByQuery;
 * @property {function(String): ApplicationPrototype.slDOM} triger ( short form **T** ) trigger / emit an event on HTMLElement
 * @property {function(String?): ApplicationPrototype.slDOM | HTMLElement | String} getE ( short form **_** ) return HTMLElement ;
 * * if argument[0] is ".tag" return HTMLElement's tagname ;
 * * if argument[0] is ".html" return HTML Content ;
 * * if argument[0] is ".text" return Text Content ;
 * * if argument[0] is "-attributeName" return HTMLElement's Attribute ;
 * * if argument[0] is "!attributeName" remove HTMLElement's Attribute
 * @property {function(slDOM.ObjectCSSProperties): ApplicationPrototype.slDOM} setStyle ( short form **f** ) setting css proprieties to HTMLElement
 * @property {function((slDOM.ObjectAttributes | String[])): ApplicationPrototype.slDOM} setVar ( short form **V** ) set dot property on HTMLElement
 * @property {function(... slDOM.ObjectAttributes): ApplicationPrototype.slDOM} setObjVar ( short form **v** ) setting attributes to HTMLElement
 * @property {function(slDOM.ObjectCSSProperties): ApplicationPrototype.slDOM} setStyleSPEED ( short form **F** ) setting css proprieties to HTMLElement with normalizing values by adding units
 * @property {function(): { x: number, y: number }} pagePXY ( short form **PXY** ) get element position on page
 * @property {function(): Boolean} in_e check if HTMLElement is still attached to DOM ( Document Object Manager )
 * @property {function(): { w: number, h: number }} g_wh returns width and height of HTMLElement
 * @property {function((Object | String), Boolean, Function, Object): ApplicationPrototype.slDOM} getLIST =slDOMlib.getLIST;
 * @property {function(function(HTMLElement, Object, ApplicationPrototype.slDOM), Object): ApplicationPrototype.slDOM} toFunction =slDOMlib.toFunction;
 * @property {function(): ApplicationPrototype.slDOM} removeFromDOM ( short form **free** ) remove elements from DOM
 * @property {function(number): ApplicationPrototype.slDOM} o ( short form **opacity** ) change element opacity
 * @property {function((HTMLElement | String)): ApplicationPrototype.slDOM} E ( long form **setE** ) set a HTMLElement or Create Element for slDOM Pointer
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
 * @property {*} $= slDOMlib.getLIST;
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
 * @property {function(): ApplicationPrototype.slDOM} free 	= slDOMlib.removeFromDOM;
 * @property {function(): Boolean} is_free 	= slDOMlib.is_free;
 * @property {function(): Boolean} is_focused 	= slDOMlib.is_focused;
 * @property {function(): Boolean} is_inview 	= slDOMlib.elementInViewport;
 * @property {function(): Boolean} is_visible 	= slDOMlib.elementIsVisible;
 * @property {*} _normalizeCssValues 	= slDOMlib._normalizeCssValues;
 * @property {*} on 	= slDOMlib.on;
 * @property {*} off 	= slDOMlib.off;
 * @property {function(): Object} eventsCache 	= slDOMlib.eventsCache;
 */
