declare namespace async {
    /**
     * @callback AsyncConstructor
     * @memberof async
     * @returns {async.Async}
     */
    type AsyncConstructor = () => async.Async;
}

declare namespace async {
    /**
     * @class
     * @name Async
     * @memberof async
     */
    class Async {
        /**
         * return unique index identifier for an operation
         * @method index
         * @memberof async.Async#
         * @returns {string}
         */
        index(): string;
        /**
         * method used for return result for an operation,
         * returns `true` if value was accepted.
         * if operation already obtained a value
         * then value is not accepted and it returns `false`
         * @method receive
         * @memberof async.Async#
         * @param {string} id obtained from {@link async.Async#index}
         * @param {any} args
         * @returns {boolean}
         */
        receive(id: string, args: any): boolean;
        /**
         * require to wait an additional operation
         * @method wait
         * @memberof async.Async#
         */
        wait(): void;
        /**
         * require to reserve index {@link async.Async#index} for an additional operation
         * @method reserve
         * @memberof async.Async#
         * @returns {string}
         */
        reserve(): string;
        /**
         * require to run an operation
         * @method run
         * @memberof async.Async#
         * @param {function():void} func function that should be executed
         * @param {any[]} args
         * @param {object} context
         * @returns {string}
         */
        run(func: (...params: any[]) => any, args: any[], context: any): string;
        /**
         * reset operation processing
         * @method flush
         * @memberof async.Async#
         */
        flush(): void;
        /**
         * return how many operations are processing right now
         * @method processing
         * @memberof async.Async#
         * @returns {number}
         */
        processing(): number;
        /**
         * return operations' responses
         * @method responses
         * @memberof async.Async#
         * @param {boolean} [returnUnknownResponses=false]
         * @returns {any[][]}
         */
        responses(returnUnknownResponses?: boolean): any[][];
        /**
         * return all errors found in responses
         * @method errors
         * @memberof async.Async#
         * @returns {Error[]}
         */
        errors(): Error[];
        /**
         * register a callback to be called when processing is done
         * @method done
         * @memberof async.Async#
         * @param {function():void} cb
         */
        done(cb: (...params: any[]) => any): void;
    }
    namespace Async {
        /**
         * @typedef {object} Operation
         * @memberof async.Async
         * @property {async.Async.OperationCallback} [0]
         * @property {async.Async.OperationArgs} [1]
         * @property {async.Async.OperationContext} [2]
         * @property {async.Async.OperationCallbackIndex} [3]
         */
        type Operation = {
            0?: async.Async.OperationCallback;
            1?: async.Async.OperationArgs;
            2?: async.Async.OperationContext;
            3?: async.Async.OperationCallbackIndex;
        };
        /**
         * a function that represents the operation itself, it have as argument `next` callback, by default it is first.
         * @typedef {Function} OperationCallback
         * @memberof async.Async
         */
        type OperationCallback = () => void;
        /**
         * list if arguments passed to `OperationCallback`.
         * @typedef {any[]} OperationArgs
         * @memberof async.Async
         */
        type OperationArgs = any[];
        /**
         * context that should be used in `OperationCallback`. Default value is `{}`.
         * @typedef {object} OperationContext
         * @memberof async.Async
         */
        type OperationContext = any;
        /**
         * index of `next()` callback in list of `OperationCallback`'s arguments. Default value is `0`.
         * @typedef {number} OperationCallbackIndex
         * @memberof async.Async
         */
        type OperationCallbackIndex = number;
        /**
         * @typedef {async.Async.Operation[]} Operations
         * @memberof async.Async
         */
        type Operations = async.Async.Operation[];
    }
    /**
     * @callback async.processCallback
     * @param {function(Error?): void} next
     * @param {any} item
     * @param {number} index
     * @param {any[]} items
     */
    type processCallback = (next: (...params: any[]) => any, item: any, index: number, items: any[]) => void;
    /**
     * @callback async.doneCallback
     * @this async.Async
     */
    type doneCallback = () => void;
    /**
     * @method flow
     * @memberof async.
     * @param {async.Async.Operations} operations
     * @param {async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function flow(operations: async.Async.Operations, cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @method waterfall
     * @memberof async.
     * @param {async.Async.Operations} operations
     * @param {async.doneCallback} cb
     * @param {number} [parallel=27] number of operations that can be done in parallel
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function waterfall(operations: async.Async.Operations, cb: async.doneCallback, parallel?: number, timeout?: number): async.Async;
    /**
     * @method map
     * @memberof async.
     * @param {any[]} operations
     * @param {async.processCallback}
     * @param {async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function map(operations: any[], cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @method flow_map
     * @memberof async.
     * @param {any[]} operations
     * @param {async.processCallback}
     * @param {async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function flow_map(operations: any[], cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @method waterfall_map
     * @memberof async.
     * @param {any[]} operations
     * @param {async.processCallback}
     * @param {async.doneCallback} cb
     * @param {number} [parallel=27] number of operations that can be done in parallel
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function waterfall_map(operations: any[], cb: async.doneCallback, parallel?: number, timeout?: number): async.Async;
}

/**
 * Module used processing data asynchronous
 * @example
 * Application.require('async').then(function (asyncOperations) {
 *	// @TODO
 * }, console.error);
 * @interface async
 * @returns {async.AsyncConstructor}
 * @see async.Async
 */
declare interface async {
}

declare namespace BrowserSessionModule {
    /**
     * @method getItem
     * @memberof BrowserSessionModule
     * @param {string} key
     * @param {boolean} returnResult
     * @returns {Promise<any>}
     */
    function getItem(key: string, returnResult: boolean): Promise<any>;
    /**
     * @method setItem
     * @memberof BrowserSessionModule
     * @param {string} key
     * @param {any} val
     * @param {boolean} returnResult
     * @returns {Promise<any>}
     */
    function setItem(key: string, val: any, returnResult: boolean): Promise<any>;
    /**
     * @method removeItem
     * @memberof BrowserSessionModule
     * @param {string} key
     * @param {boolean} returnResult
     * @returns {Promise<any>}
     */
    function removeItem(key: string, returnResult: boolean): Promise<any>;
    /**
     * @method getItems
     * @memberof BrowserSessionModule
     * @param {string[]} keys
     * @returns {Promise<Object<string,any>>}
     */
    function getItems(keys: string[]): Promise<{
        [key: string]: any;
    }>;
    /**
     * @method setItems
     * @memberof BrowserSessionModule
     * @param {Object<string,any>} obj
     * @returns {Promise<any[]>}
     */
    function setItems(obj: {
        [key: string]: any;
    }): Promise<any[]>;
    /**
     * @method removeItems
     * @memberof BrowserSessionModule
     * @param {string[]} keys
     * @returns {Promise<any[]>}
     */
    function removeItems(keys: string[]): Promise<any[]>;
    /**
     * @method findItems
     * @memberof BrowserSessionModule
     * @param {function(any):boolean} filter
     * @returns {Promise<Object<string,any>>}
     */
    function findItems(filter: (...params: any[]) => any): Promise<{
        [key: string]: any;
    }>;
    /**
     * @method clear
     * @memberof BrowserSessionModule
     * @returns {Promise<any>}
     */
    function clear(): Promise<any>;
}

/**
 * browserSessionBuilder description
 * @interface BrowserSessionModule
 * @param  {string|object} objectStoreArg name or object of strategyStore
 * @param {object} [objectStoreConf]
 */
declare interface BrowserSessionModule {
}

declare namespace ExtensionsPrototype {
    /**
     * @var {object} fn
     * @memberof ExtensionsPrototype
     * @property {ExtensionsPrototype.WindowFunctions} window
     * @property {ExtensionsPrototype.MouseFunctions} mouse
     * @property {(ExtensionsPrototype.getRandId_1|ExtensionsPrototype.getRandId_2)} getRandId
     */
    var fn: {
        window: ExtensionsPrototype.WindowFunctions;
        mouse: ExtensionsPrototype.MouseFunctions;
        getRandId: ExtensionsPrototype.getRandId_1 | ExtensionsPrototype.getRandId_2;
    };
    /**
     * @typedef {object} WindowFunctions
     * @memberof ExtensionsPrototype
     * @property {object} sizeLimit
     * @property {ExtensionsPrototype.windowSizeCache} sizeLimit.min
     * @property {ExtensionsPrototype.windowSizeCache} sizeLimit.max
     * @property {number} [refreshRate=200] how often to recalculate window size
     * @property {ExtensionsPrototype.windowSizeActive} sizeActive
     * @property {ExtensionsPrototype.windowSize} size
     */
    type WindowFunctions = {
        sizeLimit: {
            min: ExtensionsPrototype.windowSizeCache;
            max: ExtensionsPrototype.windowSizeCache;
        };
        refreshRate?: number;
        sizeActive: ExtensionsPrototype.windowSizeActive;
        size: ExtensionsPrototype.windowSize;
    };
    /**
     * @typedef {object} MouseFunctions
     * @memberof ExtensionsPrototype
     * @property {MouseEvent} event
     * @property {ExtensionsPrototype.MousePosition} position
     * @property {object} config
     * @property {boolean} config.tracking
     */
    type MouseFunctions = {
        event: MouseEvent;
        position: ExtensionsPrototype.MousePosition;
        config: {
            tracking: boolean;
        };
    };
    /**
     * @var {object} object
     * @property {(ExtensionsPrototype.ObjectExtend_1|ExtensionsPrototype.ObjectExtend_2)} extend
     * @memberof ExtensionsPrototype
     */
    var object: {
        extend: ExtensionsPrototype.ObjectExtend_1 | ExtensionsPrototype.ObjectExtend_2;
    };
    /**
     * @var {object} string
     * @memberof ExtensionsPrototype
     */
    var string: any;
    /**
     * @var {any} WindowExtend
     * @memberof ExtensionsPrototype
     * @example
     * window.addEvent(elem, type, handler);
     * window.removeEvent(elem, type, handlerId);
     *
     * window.addEventListener(eventName, function (event) {});
     */
    var WindowExtend: any;
    /**
     * @callback getRandId_1
     * @memberof ExtensionsPrototype
     * @param {string} prefix
     * @param {boolean} minimize
     */
    type getRandId_1 = (prefix: string, minimize: boolean) => void;
    /**
     * @callback getRandId_2
     * @memberof ExtensionsPrototype
     * @param {boolean} minimize
     */
    type getRandId_2 = (minimize: boolean) => void;
    /**
     * @typedef {object} windowSizeCache
     * @memberof ExtensionsPrototype
     * @property {number} w
     * @property {number} h
     */
    type windowSizeCache = {
        w: number;
        h: number;
    };
    /**
     * @callback windowSizeActive
     * @memberof ExtensionsPrototype
     * @property {boolean} refreshed
     * @returns {ExtensionsPrototype.windowSizeCache}
     */
    type windowSizeActive = () => ExtensionsPrototype.windowSizeCache;
    /**
     * @callback windowSize
     * @memberof ExtensionsPrototype
     * @property {boolean} refreshed
     * @returns {ExtensionsPrototype.windowSizeCache}
     */
    type windowSize = () => ExtensionsPrototype.windowSizeCache;
    /**
     * @typedef {object} MousePositionCache
     * @memberof ExtensionsPrototype
     * @property {number} x
     * @property {number} y
     * @property {number} xmax
     * @property {number} ymax
     */
    type MousePositionCache = {
        x: number;
        y: number;
        xmax: number;
        ymax: number;
    };
    /**
     * @callback MousePosition
     * @memberof ExtensionsPrototype
     * @param {MouseEvent} [eventMouseMove]
     * @param {object} [context]
     * @param {object} [context.window]
     * @param {object} [context.document]
     * @returns {ExtensionsPrototype.MousePositionCache}
     */
    type MousePosition = (eventMouseMove?: MouseEvent, context?: {
        window?: any;
        document?: any;
    }) => ExtensionsPrototype.MousePositionCache;
    /**
     * @callback ObjectExtend_1
     * @memberof ExtensionsPrototype
     * @param {object} object
     * @param {object} options
     * @param {any} options.value
     * @param {boolean} [options.readonly=false]
     * @param {boolean} [options.visible=false]
     * @param {boolean} [options.config=false]
     */
    type ObjectExtend_1 = (object: any, options: {
        value: any;
        readonly?: boolean;
        visible?: boolean;
        config?: boolean;
    }) => void;
    /**
     * @callback ObjectExtend_2
     * @memberof ExtensionsPrototype
     * @param {object} object
     * @param {object} options
     * @param {function():void} [options.get]
     * @param {function(any):void} [options.set]
     * @param {boolean} [options.visible=false]
     * @param {boolean} [options.config=false]
     */
    type ObjectExtend_2 = (object: any, options: {
        get?: (...params: any[]) => any;
        set?: (...params: any[]) => any;
        visible?: boolean;
        config?: boolean;
    }) => void;
    /**
     * @memberof ExtensionsPrototype
     * @callback Function_runInWorker
     * @param {any} result
     * @param {Event} ev
     * @returns {Worker}
     */
    type Function_runInWorker = (result: any, ev: Event) => Worker;
    /**
     * @var {ExtensionsPrototype.slDOM} _
     * @memberof ExtensionsPrototype
     */
    var _: ExtensionsPrototype.slDOM;
    /**
     * @var {ExtensionsPrototype.slDOMSet} __
     * @memberof ExtensionsPrototype
     */
    var __: ExtensionsPrototype.slDOMSet;
    /**
     * @class
     * @name slDOMSet
     * @memberof ExtensionsPrototype
     * @param {string} [cssSelector]
     */
    class slDOMSet {
        constructor(cssSelector?: string);
        /**
         * @method config
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {string} key
         * @param {any} value
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        config(key: string, value: any): ExtensionsPrototype.slDOMSet;
        /**
         * @method config
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {string} key
         * @param {any} value
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        config(key: string, value: any): ExtensionsPrototype.slDOMSet;
        /**
         * @method unique
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        unique(): ExtensionsPrototype.slDOMSet;
        /**
         * @method set
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {string} v css selector applied over document
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        set(v: string): ExtensionsPrototype.slDOMSet;
        /**
         * @method set
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {string} v css selector applied over document
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        set(v: string): ExtensionsPrototype.slDOMSet;
        /**
         * @method add
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {(NodeList|any)} ...v array of Nodes or HTMLElements
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        add(): ExtensionsPrototype.slDOMSet;
        /**
         * @method env
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {ExtensionsPrototype.slDOM_env}
         */
        env(): ExtensionsPrototype.slDOM_env;
        /**
         * @method get
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {(Node[])}
         */
        get(): Node[];
        /**
         * @method get
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {(Node[])}
         */
        get(): Node[];
        /**
         * @method eq
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {number} index
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        eq(index: number): ExtensionsPrototype.slDOMSet;
        /**
         * @method find
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {string} cssSelector
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        find(cssSelector: string): ExtensionsPrototype.slDOMSet;
        /**
         * @method filter
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {ExtensionsPrototype.slDOMSet.itemHandlerFilter} filterCallback
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        filter(filterCallback: ExtensionsPrototype.slDOMSet.itemHandlerFilter): ExtensionsPrototype.slDOMSet;
        /**
         * @method each
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {ExtensionsPrototype.slDOMSet.itemHandler} filterCallback
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        each(filterCallback: ExtensionsPrototype.slDOMSet.itemHandler): ExtensionsPrototype.slDOMSet;
        /**
         * @method map
         * @memberof ExtensionsPrototype.slDOMSet#
         * @param {ExtensionsPrototype.slDOMSet.itemHandlerMap} filterCallback
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        map(filterCallback: ExtensionsPrototype.slDOMSet.itemHandlerMap): ExtensionsPrototype.slDOMSet;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {NamedNodeMap}
         */
        attr(): NamedNodeMap;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {NamedNodeMap}
         */
        attr(): NamedNodeMap;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {NamedNodeMap}
         */
        attr(): NamedNodeMap;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet#
         * @returns {NamedNodeMap}
         */
        attr(): NamedNodeMap;
    }
    namespace slDOMSet {
        /**
         * @callback itemHandler
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {Node} node
         * @param {number} index
         * @param {ExtensionsPrototype.slDOMSet} context
         * @param {ExtensionsPrototype.slDOM} p
         */
        type itemHandler = (node: Node, index: number, context: ExtensionsPrototype.slDOMSet, p: ExtensionsPrototype.slDOM) => void;
        /**
         * @callback itemHandlerFilter
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {Node} node
         * @param {number} index
         * @param {ExtensionsPrototype.slDOMSet} context
         * @param {ExtensionsPrototype.slDOM} p
         * @returns {boolean}
         */
        type itemHandlerFilter = (node: Node, index: number, context: ExtensionsPrototype.slDOMSet, p: ExtensionsPrototype.slDOM) => boolean;
        /**
         * @callback itemHandlerMap
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {Node} node
         * @param {number} index
         * @param {ExtensionsPrototype.slDOMSet} context
         * @param {ExtensionsPrototype.slDOM} p
         * @returns {Node}
         */
        type itemHandlerMap = (node: Node, index: number, context: ExtensionsPrototype.slDOMSet, p: ExtensionsPrototype.slDOM) => Node;
    }
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
    type slDOM_env = {
        gecko: boolean;
        old_ie: boolean;
        ie_lt8: boolean;
        ie_lt9: boolean;
        ie_gt10: boolean;
        ie: boolean;
        webkit: boolean;
        qtwebkit: boolean;
        chrome: boolean;
        opera: boolean;
        firefox: boolean;
        safari: boolean;
        khtml: boolean;
        mac_geLion: boolean;
        mac_geMountainLion: boolean;
        phantom: boolean;
        ios: boolean;
        mobile: boolean;
        mac: boolean;
        windows: boolean;
        opera_version: any[] | null;
        flipCtrlCmd: boolean;
        captureMiddleClick: boolean;
        android: boolean;
        android_version: string | false;
    };
    /**
     * @typedef {Object<string,(string|number)>} slDOM_ObjectCSSProperties a list of proprieties mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" }
     * @memberof ExtensionsPrototype
     */
    type slDOM_ObjectCSSProperties = {
        [key: string]: string | number;
    };
    /**
     * @typedef {Object<string,(string|number)>} slDOM_ObjectAttributes a list of proprieties mapped in a object, example: { fontSize: "10px", "white-space": "nowrap" }
     * @memberof ExtensionsPrototype
     */
    type slDOM_ObjectAttributes = {
        [key: string]: string | number;
    };
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
    type slDOM = {
        env: ExtensionsPrototype.slDOM_env;
        __: (...params: any[]) => any;
        a2D: (...params: any[]) => any;
        opacity: (...params: any[]) => any;
        setE: (...params: any[]) => any;
        sClass: (...params: any[]) => any;
        setArg: (...params: any[]) => any;
        adEto: (...params: any[]) => any;
        putBfto: (...params: any[]) => any;
        putAfto: (...params: any[]) => any;
        putBf: (...params: any[]) => any;
        putAf: (...params: any[]) => any;
        addE: (...params: any[]) => any;
        addB: (...params: any[]) => any;
        addT: (...params: any[]) => any;
        nextTo?: (...params: any[]) => any;
        backTo?: (...params: any[]) => any;
        nUP: (...params: any[]) => any;
        nChild: (...params: any[]) => any;
        getParentN: (...params: any[]) => any;
        clearE: (...params: any[]) => any;
        delE: (...params: any[]) => any;
        copyE: (...params: any[]) => any;
        getParentTag: (...params: any[]) => any;
        getByTag: (...params: any[]) => any;
        getByQuery: (...params: any[]) => any;
        getById: (...params: any[]) => any;
        getTags: (...params: any[]) => any;
        getTagsByQuery: (...params: any[]) => any;
        triger: (...params: any[]) => any;
        getE: (...params: any[]) => any;
        setStyle: (...params: any[]) => any;
        setVar: (...params: any[]) => any;
        setObjVar: (...params: any[]) => any;
        setStyleSPEED: (...params: any[]) => any;
        pagePXY: (...params: any[]) => any;
        in_e: (...params: any[]) => any;
        g_wh: (...params: any[]) => any;
        getLIST: (...params: any[]) => any;
        toFunction: (...params: any[]) => any;
        removeFromDOM: (...params: any[]) => any;
        o: (...params: any[]) => any;
        E: (...params: any[]) => any;
        c: any;
        attrs: (...params: any[]) => any;
        A: any;
        Et: any;
        Bt: any;
        At: any;
        pB: any;
        pA: any;
        e: any;
        b: any;
        t: any;
        N: any;
        B: any;
        U: any;
        C: any;
        P: any;
        d: any;
        D: any;
        X: any;
        p: any;
        S: any;
        Q: any;
        I: any;
        s: any;
        q: any;
        T: any;
        _: any;
        $: any;
        F: any;
        f: any;
        L: any;
        V: any;
        v: any;
        PXY: any;
        i: any;
        r: any;
        x: any;
        free: (...params: any[]) => any;
        is_free: (...params: any[]) => any;
        is_focused: (...params: any[]) => any;
        is_inview: (...params: any[]) => any;
        is_visible: (...params: any[]) => any;
        _normalizeCssValues: any;
        on: any;
        off: any;
        eventsCache: (...params: any[]) => any;
    };
}

/**
 * @interface ExtensionsPrototype
 */
declare interface ExtensionsPrototype {
}

/**
 * @interface HTMLElement
 */
declare interface HTMLElement {
    /**
     * @memberof HTMLElement#
     * @var {Object<string,function>} methods
     */
    methods: {
        [key: string]: (...params: any[]) => void;
    };
    /**
     * @memberof HTMLElement#
     * @var {object} attrdata object for storing custom variables
     */
    attrdata: any;
    /**
     * @memberof HTMLElement#
     * @var {object} attrdatastore
     */
    attrdatastore: any;
}

declare namespace String {
    /**
     * @memberof String
     * @typedef {object} String_parseUrl_return
     * @property {string} original https://www.test.example.com/path/data?request=5#search
     * @property {string} origin www.test.example.com
     * @property {string} domain www.test.example.com
     * @property {string} domain_short test.example.com
     * @property {string} pathname /path/data
     * @property {string} reqQuery request=5
     * @property {string} protocol https
     * @property {string} protocoll https://
     * @property {Object<string,any>} [get_vars]
     * @property {string} url deprecated
     * @property {string} url_p deprecated
     * @property {string} isIp deprecated
     */
    type String_parseUrl_return = {
        original: string;
        origin: string;
        domain: string;
        domain_short: string;
        pathname: string;
        reqQuery: string;
        protocol: string;
        protocoll: string;
        get_vars?: {
            [key: string]: any;
        };
        url: string;
        url_p: string;
        isIp: string;
    };
}

/**
 * @interface String
 */
declare interface String {
    /**
     * similar as PHP subs
     * @memberof String#
     * @method subs
     * @param {number} p
     * @param {number} [i]
     * @returns {string}
     */
    subs(p: number, i?: number): string;
    /**
     * @memberof String#
     * @method toHex
     * @param {boolean} utf8
     * @returns {string}
     */
    toHex(utf8: boolean): string;
    /**
     * @memberof String#
     * @method fromHex
     * @returns {string}
     */
    fromHex(): string;
    /**
     * @memberof String#
     * @method toHtmlSimple
     * @returns {string}
     */
    toHtmlSimple(): string;
    /**
     * @memberof String#
     * @method toHtml
     * @returns {string}
     */
    toHtml(): string;
    /**
     * @memberof String#
     * @method fromHtml
     * @returns {string}
     */
    fromHtml(): string;
    /**
     * remove dangerous HTML Tags
     * @memberof String#
     * @method cleanTags
     * @returns {string}
     */
    cleanTags(): string;
    /**
     * @memberof String#
     * @method add_Class
     * @param {string} className
     * @returns {string}
     */
    add_Class(className: string): string;
    /**
     * @memberof String#
     * @method del_Class
     * @param {string} className
     * @returns {string}
     */
    del_Class(className: string): string;
    /**
     * find a class
     * @memberof String#
     * @method fnd_Class
     * @param {string} className
     * @returns {boolean}
     */
    fnd_Class(className: string): boolean;
    /**
     * swap letters' case
     * @memberof String#
     * @method swp_case
     * @returns {string}
     */
    swp_case(): string;
    /**
     * uppercase first [k] letters from word
     * @memberof String#
     * @method ucfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    ucfirst(k?: number): string;
    /**
     * lowercase first [k] letters from word
     * @memberof String#
     * @method lcfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    lcfirst(k?: number): string;
    /**
     * @memberof String#
     * @method utf8need
     * @returns {string}
     */
    utf8need(): string;
    /**
     * @memberof String#
     * @method utf8encode
     * @returns {string}
     */
    utf8encode(): string;
    /**
     * @memberof String#
     * @method utf8decode
     * @returns {string}
     */
    utf8decode(): string;
    /**
     * @memberof String#
     * @method toRegexp
     * @param {string} [flags]
     * @returns {string}
     */
    toRegexp(flags?: string): string;
    /**
     * @memberof String#
     * @method escapeHex
     * @returns {string}
     */
    escapeHex(): string;
    /**
     * @memberof String#
     * @method escape
     * @returns {string}
     */
    escape(): string;
    /**
     * @memberof String#
     * @method encodeURI
     * @returns {string}
     */
    encodeURI(): string;
    /**
     * @memberof String#
     * @method unescape
     * @returns {string}
     */
    unescape(): string;
    /**
     * @memberof String#
     * @method decodeURI
     * @returns {string}
     */
    decodeURI(): string;
    /**
     * @memberof String#
     * @method parseUrlVars
     * @param {boolean} [json=false]
     * @param {object} [params]
     * @param {boolean} [params.keepOBJ=false]
     * @param {boolean} [params.isURL=false]
     * @returns {Object<string,any>}
     */
    parseUrlVars(json?: boolean, params?: {
        keepOBJ?: boolean;
        isURL?: boolean;
    }): {
        [key: string]: any;
    };
    /**
     * @memberof String#
     * @method parseUrl
     * @param {boolean} [k=false] decode get vars
     * @returns {String.String_parseUrl_return}
     */
    parseUrl(k?: boolean): String.String_parseUrl_return;
    /**
     * @memberof String#
     * @method match_str
     * @param {string} reg_exp
     * @param {string} [flags]
     * @returns {string[]|null}
     */
    match_str(reg_exp: string, flags?: string): string[] | null;
    /**
     * @memberof String#
     * @method sha1
     * @returns {string}
     */
    sha1(): string;
    /**
     * @memberof String#
     * @method sha256
     * @returns {string}
     */
    sha256(): string;
    /**
     * @memberof String#
     * @method md5
     * @returns {string}
     */
    md5(): string;
    /**
     * @memberof String#
     * @method base64encode
     * @returns {string}
     */
    base64encode(): string;
    /**
     * @memberof String#
     * @method base64decode
     * @returns {string}
     */
    base64decode(): string;
    /**
     * @memberof String#
     * @method base64encodeBytes
     * @returns {Uint8Array}
     */
    base64encodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64encodeBytesArray
     * @returns {number[]}
     */
    base64encodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64decodeBytes
     * @returns {Uint8Array}
     */
    base64decodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64decodeBytesArray
     * @returns {number[]}
     */
    base64decodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64encodeClean
     * @returns {string}
     */
    base64encodeClean(): string;
    /**
     * @memberof String#
     * @method base64decodeClean
     * @returns {string}
     */
    base64decodeClean(): string;
    /**
     * @memberof String#
     * @method encryptTea
     * @param {string} password
     * @returns {string}
     */
    encryptTea(password: string): string;
    /**
     * @memberof String#
     * @method decryptTea
     * @param {string} password
     * @returns {string}
     */
    decryptTea(password: string): string;
    /**
     * @memberof String#
     * @method encryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    encryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * @memberof String#
     * @method decryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    decryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * "asd asdsdf param:sdd test:data 2 info".buildQuery()
     * {_keys: ["_", "param", "test"], _: 'asd asdsdf', param: 'sdd', test: 'data 2 info'}
     * @memberof String#
     * @method buildQuery
     * @returns {Object<string,string>}
     */
    buildQuery(): {
        [key: string]: string;
    };
    /**
     * "23 test \"composed param\" 234".buildSearchArray()
     * ['23', 'test', 'composed param', '234']
     * @memberof String#
     * @method buildSearchArray
     * @returns {string[]}
     */
    buildSearchArray(): string[];
    /**
     * similar as utf8encode
     * @memberof String#
     * @method utf8
     * @returns {string}
     */
    utf8(): string;
    /**
     * similar as utf8decode
     * @memberof String#
     * @method unicode
     * @returns {string}
     */
    unicode(): string;
    /**
     * @memberof String#
     * @method toArrayBufferFromUtf8
     * @returns {ArrayBuffer}
     */
    toArrayBufferFromUtf8(): ArrayBuffer;
    /**
     * similar as PHP subs
     * @memberof String#
     * @method subs
     * @param {number} p
     * @param {number} [i]
     * @returns {string}
     */
    subs(p: number, i?: number): string;
    /**
     * @memberof String#
     * @method toHex
     * @param {boolean} utf8
     * @returns {string}
     */
    toHex(utf8: boolean): string;
    /**
     * @memberof String#
     * @method fromHex
     * @returns {string}
     */
    fromHex(): string;
    /**
     * @memberof String#
     * @method toHtmlSimple
     * @returns {string}
     */
    toHtmlSimple(): string;
    /**
     * @memberof String#
     * @method toHtml
     * @returns {string}
     */
    toHtml(): string;
    /**
     * @memberof String#
     * @method fromHtml
     * @returns {string}
     */
    fromHtml(): string;
    /**
     * remove dangerous HTML Tags
     * @memberof String#
     * @method cleanTags
     * @returns {string}
     */
    cleanTags(): string;
    /**
     * @memberof String#
     * @method add_Class
     * @param {string} className
     * @returns {string}
     */
    add_Class(className: string): string;
    /**
     * @memberof String#
     * @method del_Class
     * @param {string} className
     * @returns {string}
     */
    del_Class(className: string): string;
    /**
     * find a class
     * @memberof String#
     * @method fnd_Class
     * @param {string} className
     * @returns {boolean}
     */
    fnd_Class(className: string): boolean;
    /**
     * swap letters' case
     * @memberof String#
     * @method swp_case
     * @returns {string}
     */
    swp_case(): string;
    /**
     * uppercase first [k] letters from word
     * @memberof String#
     * @method ucfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    ucfirst(k?: number): string;
    /**
     * lowercase first [k] letters from word
     * @memberof String#
     * @method lcfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    lcfirst(k?: number): string;
    /**
     * @memberof String#
     * @method utf8need
     * @returns {string}
     */
    utf8need(): string;
    /**
     * @memberof String#
     * @method utf8encode
     * @returns {string}
     */
    utf8encode(): string;
    /**
     * @memberof String#
     * @method utf8decode
     * @returns {string}
     */
    utf8decode(): string;
    /**
     * similar as utf8encode
     * @memberof String#
     * @method utf8
     * @returns {string}
     */
    utf8(): string;
    /**
     * similar as utf8decode
     * @memberof String#
     * @method unicode
     * @returns {string}
     */
    unicode(): string;
    /**
     * @memberof String#
     * @method encryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    encryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * @memberof String#
     * @method decryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    decryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * @memberof String#
     * @method encryptTea
     * @param {string} password
     * @returns {string}
     */
    encryptTea(password: string): string;
    /**
     * @memberof String#
     * @method decryptTea
     * @param {string} password
     * @returns {string}
     */
    decryptTea(password: string): string;
    /**
     * @memberof String#
     * @method base64decode
     * @returns {string}
     */
    base64decode(): string;
    /**
     * @memberof String#
     * @method base64encode
     * @returns {string}
     */
    base64encode(): string;
    /**
     * @memberof String#
     * @method base64decodeBytes
     * @returns {Uint8Array}
     */
    base64decodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64encodeBytes
     * @returns {Uint8Array}
     */
    base64encodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64decodeBytesArray
     * @returns {number[]}
     */
    base64decodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64encodeBytesArray
     * @returns {number[]}
     */
    base64encodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64encodeClean
     * @returns {string}
     */
    base64encodeClean(): string;
    /**
     * @memberof String#
     * @method base64decodeClean
     * @returns {string}
     */
    base64decodeClean(): string;
    /**
     * @memberof String#
     * @method encodeURI
     * @returns {string}
     */
    encodeURI(): string;
    /**
     * @memberof String#
     * @method decodeURI
     * @returns {string}
     */
    decodeURI(): string;
    /**
     * @memberof String#
     * @method escapeHex
     * @returns {string}
     */
    escapeHex(): string;
    /**
     * @memberof String#
     * @method escape
     * @returns {string}
     */
    escape(): string;
    /**
     * @memberof String#
     * @method unescape
     * @returns {string}
     */
    unescape(): string;
    /**
     * @memberof String#
     * @method sha1
     * @returns {string}
     */
    sha1(): string;
    /**
     * @memberof String#
     * @method sha256
     * @returns {string}
     */
    sha256(): string;
    /**
     * similar as PHP subs
     * @memberof String#
     * @method subs
     * @param {number} p
     * @param {number} [i]
     * @returns {string}
     */
    subs(p: number, i?: number): string;
    /**
     * @memberof String#
     * @method md5
     * @returns {string}
     */
    md5(): string;
    /**
     * @memberof String#
     * @method markdown
     * @returns {string}
     */
    markdown(): string;
    /**
     * @memberof String#
     * @method toRegexp
     * @param {string} [flags]
     * @returns {string}
     */
    toRegexp(flags?: string): string;
    /**
     * @memberof String#
     * @method parseUrl
     * @param {boolean} [k=false] decode get vars
     * @returns {String.String_parseUrl_return}
     */
    parseUrl(k?: boolean): String.String_parseUrl_return;
    /**
     * @memberof String#
     * @method match_str
     * @param {string} reg_exp
     * @param {string} [flags]
     * @returns {string[]|null}
     */
    match_str(reg_exp: string, flags?: string): string[] | null;
    /**
     * "asd asdsdf param:sdd test:data 2 info".buildQuery()
     * {_keys: ["_", "param", "test"], _: 'asd asdsdf', param: 'sdd', test: 'data 2 info'}
     * @memberof String#
     * @method buildQuery
     * @returns {Object<string,string>}
     */
    buildQuery(): {
        [key: string]: string;
    };
    /**
     * "23 test \"composed param\" 234".buildSearchArray()
     * ['23', 'test', 'composed param', '234']
     * @memberof String#
     * @method buildSearchArray
     * @returns {string[]}
     */
    buildSearchArray(): string[];
    /**
     * @memberof String#
     * @method toArrayBufferFromUtf8
     * @returns {ArrayBuffer}
     */
    toArrayBufferFromUtf8(): ArrayBuffer;
}

/**
 * @interface Array
 */
declare interface Array {
    /**
     * @memberof Array#
     * @method min
     * @returns {any}
     */
    min(): any;
    /**
     * @memberof Array#
     * @method shuffle
     * @returns {any[]}
     */
    shuffle(): any[];
    /**
     * @memberof Array#
     * @method max
     * @returns {any}
     */
    max(): any;
    /**
     * @memberof Array#
     * @method move
     * @param {number} from
     * @param {number} to
     * @returns {any[]}
     */
    move(from: number, to: number): any[];
    /**
     * @memberof Array#
     * @method inArray
     * @param {any} a
     * @param {Function} comparator
     * @returns {boolean}
     */
    inArray(a: any, comparator: (...params: any[]) => any): boolean;
    /**
     * @memberof Array#
     * @method split
     * @param {any} elem
     * @param {number} num number of items
     * @param {'indexOf'|'lastIndexOf'|'indexOfSect'} cmp
     * @returns {any[]}
     */
    split(elem: any, num: number, cmp: 'indexOf' | 'lastIndexOf' | 'indexOfSect'): any[];
    /**
     * @memberof Array#
     * @method splitSect
     * @param {any[]} elem
     * @param {number} num number of items
     * @returns {any[]}
     */
    splitSect(elem: any[], num: number): any[];
    /**
     * @memberof Array#
     * @method toBlob
     * @param {string} mimetype
     * @param {number} [sliceSize=1024] number of items
     * @returns {Blob}
     */
    toBlob(mimetype: string, sliceSize?: number): Blob;
    /**
     * @memberof Array#
     * @method base64encode
     * @returns {ArrayBuffer}
     */
    base64encode(): ArrayBuffer;
    /**
     * @memberof Array#
     * @method toBinaryString
     * @returns {string}
     */
    toBinaryString(): string;
    /**
     * @memberof Array#
     * @method toBytesBinary
     * @returns {string}
     */
    toBytesBinary(): string;
    /**
     * @memberof Array#
     * @method toBytesEscaped
     * @returns {string}
     */
    toBytesEscaped(): string;
    /**
     * @memberof Array#
     * @method bytesToHex
     * @returns {string}
     */
    bytesToHex(): string;
    /**
     * @memberof Array#
     * @method toParamObj
     * @returns {Object<any,any>}
     */
    toParamObj(): {
        [key: string]: any;
    };
    /**
     * @memberof Array#
     * @method resetArray
     * @returns {any[]}
     */
    resetArray(): any[];
    /**
     * @memberof Array#
     * @method unique
     * @returns {any[]}
     */
    unique(): any[];
    /**
     * @memberof Array#
     * @method __pointerFilter
     * @param {Function} cb receives 3 parameters ( item, index, array )
     * @returns {any[]}
     */
    __pointerFilter(cb: (...params: any[]) => any): any[];
    /**
     * @memberof Array#
     * @method indexOfSect
     * @param {any[]} items
     * @param {number} [fromIndex=0]
     * @returns {any[]}
     */
    indexOfSect(items: any[], fromIndex?: number): any[];
    /**
     * @memberof Array#
     * @method toStringUtf8
     * @returns {string}
     */
    toStringUtf8(): string;
}

/**
 * @interface ArrayBuffer
 */
declare interface ArrayBuffer {
    /**
     * @memberof ArrayBuffer#
     * @method toStringUtf8
     * @returns {string}
     */
    toStringUtf8(): string;
    /**
     * @memberof ArrayBuffer#
     * @method toBytes
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @memberof ArrayBuffer#
     * @method base64encode
     * @returns {string}
     */
    base64encode(): string;
    /**
     * @memberof ArrayBuffer#
     * @method toArray
     * @returns {number[]}
     */
    toArray(): number[];
}

/**
 * @interface Buffer
 */
declare interface Buffer {
    /**
     * @memberof Buffer#
     * @method toStringUtf8
     * @returns {string}
     */
    toStringUtf8(): string;
    /**
     * @memberof Buffer#
     * @method toBytes
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @memberof Buffer#
     * @method base64encode
     * @returns {string}
     */
    base64encode(): string;
    /**
     * @memberof Buffer#
     * @method toArray
     * @returns {number[]}
     */
    toArray(): number[];
}

declare namespace Blob {
    /**
     * @callback Blob_toArrayBuffer
     * @memberof Blob
     * @param {Error} err
     * @param {ArrayBuffer} data
     */
    type Blob_toArrayBuffer = (err: Error, data: ArrayBuffer) => void;
}

/**
 * @interface Blob
 */
declare interface Blob {
    /**
     * @memberof Blob#
     * @method toArrayBuffer
     * @param {Blob.Blob_toArrayBuffer} cb
     */
    toArrayBuffer(cb: Blob.Blob_toArrayBuffer): void;
    /**
     * @memberof Blob#
     * @method toURL
     * @param {object} [options]
     * @param {string} [options.type]
     * @returns {string}
     */
    toURL(options?: {
        type?: string;
    }): string;
}

/**
 * @interface Function
 */
declare interface Function {
    /**
     * @memberof Function#
     * @method toWorkerURL
     * @returns {string}
     */
    toWorkerURL(): string;
    /**
     * @memberof Function#
     * @method toWorker
     * @returns {Worker}
     */
    toWorker(): Worker;
    /**
     * @memberof Function#
     * @param {any} data
     * @param {ExtensionsPrototype.Function_runInWorker} cb
     * @param {boolean} keep keep worker after first execution instead of destroy it
     * @method runInWorker
     * @returns {Worker}
     */
    runInWorker(data: any, cb: ExtensionsPrototype.Function_runInWorker, keep: boolean): Worker;
}

/**
 * @example
 *  Application.require('js-template-component')
 *      .then(function (
 *          // @type {JSTemplateComponent}
 *          JSTemplateComponentConstructor
 *      ) {
 *          new JSTemplateComponentConstructor(
 *              'my-custom-tagname',
 *              {
 *                  context: {
 *                      numberOfClicks: 0
 *                  },
 *                  templateCode: `
 *                      <div>
 *                          {{ this.numberOfClicks }}
 *                          <button (click)="this.increaseClicksNumber()">
 *                          </button>
 *                      </div>
 *                  `,
 *                  sharedPrototypeMethods: {
 *                      increaseClicksNumber: function () {
 *                          this.numberOfClicks += 1;
 *                      }
 *                  },
 *                  sharedReferences: {},
 *                  cssStyles: [
 *                      '/some/styles/style.css'
 *                  ]
 *              },
 *              function (err) {
 *                  if (err) console.error(err);
 *              }
 *          );
 *      }).catch(console.error);
 * @class
 * @name JSTemplateComponent
 * @param {string} tagName
 * @param {JSTemplateComponent.options} options
 * @param {JSTemplateComponent.constructorCallback} callback
 */
declare class JSTemplateComponent {
    constructor(tagName: string, options: JSTemplateComponent.options, callback: JSTemplateComponent.constructorCallback);
}

declare namespace JSTemplateComponent {
    /**
     * @memberof JSTemplateComponent
     * @callback Builder
     * @param {string} tagName
     * @param {JSTemplateComponent.options} options
     * @param {JSTemplateComponent.constructorCallback} callback
     * @returns {JSTemplateComponent}
     */
    type Builder = (tagName: string, options: JSTemplateComponent.options, callback: JSTemplateComponent.constructorCallback) => JSTemplateComponent;
    namespace contextInstance {
        /**
         * @memberof JSTemplateComponent.contextInstance
         * @method redraw
         */
        function redraw(): void;
        /**
         * @memberof JSTemplateComponent.contextInstance
         * @method redrawForce
         */
        function redrawForce(): void;
        /**
         * @memberof JSTemplateComponent.contextInstance
         * @name references
         * @type {Object<string,any>}
         */
        var references: {
            [key: string]: any;
        };
        /**
         * @memberof JSTemplateComponent.contextInstance
         * @name node
         * @type {HTMLElement}
         */
        var node: HTMLElement;
    }
    /**
     * @memberof JSTemplateComponent
     * @interface contextInstance
     */
    interface contextInstance {
    }
    /**
     * @memberof JSTemplateComponent
     * @typedef {object} contextLifeCycle
     * @property {JSTemplateComponent.lifeCycleCallback} [init] callbacks on init
     * @property {JSTemplateComponent.lifeCycleCallbackGetReferences} [getReferences] returns
     * @property {JSTemplateComponent.lifeCycleCallback} [contentChange] callback on content change
     * @property {JSTemplateComponent.lifeCycleCallback} [attrChange] context object default is Node
     * @property {JSTemplateComponent.lifeCycleCallback} [remove] context object default is Node
     */
    type contextLifeCycle = {
        init?: JSTemplateComponent.lifeCycleCallback;
        getReferences?: JSTemplateComponent.lifeCycleCallbackGetReferences;
        contentChange?: JSTemplateComponent.lifeCycleCallback;
        attrChange?: JSTemplateComponent.lifeCycleCallback;
        remove?: JSTemplateComponent.lifeCycleCallback;
    };
    namespace contextWithInstance {
        /**
         * @memberof JSTemplateComponent.contextWithInstance
         * @name __instance
         * @type {JSTemplateComponent.contextInstance}
         */
        var __instance: JSTemplateComponent.contextInstance;
        /**
         * @memberof JSTemplateComponent.contextWithInstance
         * @description context object default is Node
         * @name __lifeCycle
         * @type {JSTemplateComponent.contextLifeCycle}
         */
        var __lifeCycle: JSTemplateComponent.contextLifeCycle;
        /**
         * @memberof JSTemplateComponent.contextWithInstance
         * @description context object default is Node
         * @name state
         * @type {Object<string,(string|number|Object<string,any>|null|any[])>}
         */
        var state: {
            [key: string]: string | number | {
                [key: string]: any;
            } | null | any[];
        };
    }
    /**
     * @memberof JSTemplateComponent
     * @interface contextWithInstance
     * @implements JSTemplateComponent.contextInstance
     */
    interface contextWithInstance extends JSTemplateComponent.contextInstance {
    }
    namespace contextWithoutInstance {
        /**
         * @memberof JSTemplateComponent.contextWithoutInstance
         * @description context object default is Node
         * @name __lifeCycle
         * @type {JSTemplateComponent.contextLifeCycle}
         */
        var __lifeCycle: JSTemplateComponent.contextLifeCycle;
        /**
         * @memberof JSTemplateComponent.contextWithoutInstance
         * @description context object default is Node
         * @name state
         * @type {Object<string,(string|number|Object<string,any>|null|any[])>}
         */
        var state: {
            [key: string]: string | number | {
                [key: string]: any;
            } | null | any[];
        };
    }
    /**
     * @memberof JSTemplateComponent
     * @interface contextWithoutInstance
     */
    interface contextWithoutInstance {
    }
    /**
     * @memberof JSTemplateComponent
     * @typedef {object} options
     * @property {function ():JSTemplateComponent.contextWithoutInstance} [context] context object default is Node
     * @property {JSTemplateComponent.contextLifeCycle} [__lifeCycle] context object default is Node
     * @property {string} [templateCode] template Code
     * @property {string} [templateUrl] template URL
     * @property {Array<string>} [cssStyles] list of URLs that point to styles
     * @property {object} [sharedReferences] references that will be same for all created components
     * @property {object} [sharedPrototypeMethods] methods that will be on all components under method "methods"
     * @property {boolean} [__flag_RejectOnStylesError=false]
     */
    type options = {
        context?: (...params: any[]) => any;
        __lifeCycle?: JSTemplateComponent.contextLifeCycle;
        templateCode?: string;
        templateUrl?: string;
        cssStyles?: string[];
        sharedReferences?: any;
        sharedPrototypeMethods?: any;
        __flag_RejectOnStylesError?: boolean;
    };
    /**
     * @memberof JSTemplateComponent
     * @callback lifeCycleCallbackGetReferences
     * @param {JSTemplateComponent.contextWithInstance} context
     * @param {object} sharedReferences
     * @param {object} sharedPrototypeMethods
     * @returns {object}
     */
    type lifeCycleCallbackGetReferences = (context: JSTemplateComponent.contextWithInstance, sharedReferences: any, sharedPrototypeMethods: any) => any;
    /**
     * @memberof JSTemplateComponent
     * @callback lifeCycleCallback
     * @param {JSTemplateComponent.contextWithInstance} context
     * @param {Object<string,any>} references
     * @param {Object<string,any>} methods
     */
    type lifeCycleCallback = (context: JSTemplateComponent.contextWithInstance, references: {
        [key: string]: any;
    }, methods: {
        [key: string]: any;
    }) => void;
    /**
     * @memberof JSTemplateComponent
     * @callback constructorCallback
     * @param {Error} err
     */
    type constructorCallback = (err: Error) => void;
}

declare namespace JSTemplate {
    /**
     * @memberof JSTemplate
     * @typedef {Object} JSTemplateModule
     * @property {JSTemplate.JSTemplateParseContent} parseContent
     * @property {object} config
     * @property {number} [config.RENDER_FPS=15]
     * @property {number} [config.REMOVE_EMPTY_NODES=true]
     */
    type JSTemplateModule = {
        parseContent: JSTemplate.JSTemplateParseContent;
        config: {
            RENDER_FPS?: number;
            REMOVE_EMPTY_NODES?: number;
        };
    };
}

declare namespace JSTemplate {
    /**
     * @typedef {Object} jsTemplate_textResult
     * @memberof JSTemplate
     * @property {string} [type='text']
     * @property {JSTemplate.jsTemplate_textResultData} data
     */
    type jsTemplate_textResult = {
        type?: string;
        data: JSTemplate.jsTemplate_textResultData;
    };
    /**
     * @typedef {Object} jsTemplate_textResultData
     * @memberof JSTemplate
     * @property {Array<Text>} nodes
     * @property {Array<Text>} initialNodes
     * @property {string} code
     */
    type jsTemplate_textResultData = {
        nodes: Text[];
        initialNodes: Text[];
        code: string;
    };
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
    type parseTextNodesConfig = {
        args?: any;
        context?: any;
        start?: string;
        end?: string;
        textNodes?: JSTemplate.jsTemplate_textResult[];
        buffer?: Text[];
        opened?: boolean;
        __argsNames?: string[];
        __argsValues?: any[];
    };
    /**
     * Expression Builder
     * @protected
     * @function
     * @memberof JSTemplate
     * @param {string} code
     * @param {JSTemplate.parseTextNodesConfig} config
     */
    function expressionBuilder(code: string, config: JSTemplate.parseTextNodesConfig): void;
    /**
     * @protected
     * @function
     * @memberof JSTemplate
     * @param {Array<Text>} bf
     * @param {parseTextNodesConfig} config
     * @returns {JSTemplate.jsTemplate_textResult}
     */
    function textParser(bf: Text[], config: parseTextNodesConfig): JSTemplate.jsTemplate_textResult;
    /**
     * @callback parseTextNodesCallback
     * @memberof JSTemplate
     * @param {Error} err
     * @param {JSTemplate.parseTextNodesConfig} config
     */
    type parseTextNodesCallback = (err: Error, config: JSTemplate.parseTextNodesConfig) => void;
    /**
     * @protected
     * @function
     * @memberof JSTemplate
     * @param {HTMLElement|Node|Text} textNode
     * @param {JSTemplate.parseTextNodesCallback} cb
     * @param {JSTemplate.parseTextNodesConfig} config
     */
    function parseTextNodes(textNode: HTMLElement | Node | Text, cb: JSTemplate.parseTextNodesCallback, config: JSTemplate.parseTextNodesConfig): void;
    /**
     * @typedef {Object} jsTemplate_Attribute
     * @memberof JSTemplate
     * @property {string} name
     * @property {string} value
     */
    type jsTemplate_Attribute = {
        name: string;
        value: string;
    };
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
    type jsTemplate_attrResultAttributeData = {
        name: string;
        code: string;
        node: HTMLElement;
        buffer?: any;
        inline?: boolean;
        postProcess?: boolean;
    };
    /**
     * @typedef {Object} jsTemplate_attrResult
     * @memberof JSTemplate
     * @property {('event'|'attribute'|'binding'|'macro')} type
     * @property {JSTemplate.jsTemplate_Attribute} attr
     * @property {JSTemplate.jsTemplate_attrResultAttributeData} data
     */
    type jsTemplate_attrResult = {
        type: 'event' | 'attribute' | 'binding' | 'macro';
        attr: JSTemplate.jsTemplate_Attribute;
        data: JSTemplate.jsTemplate_attrResultAttributeData;
    };
    /**
     * @typedef {Object} jsTemplateAttrData
     * @memberof JSTemplate
     * @property {Array<JSTemplate.jsTemplate_attrResult>} nodes
     * @property {Array<JSTemplate.jsTemplate_textResult>} texts
     * @property {Array<JSTemplate.jsTemplateAttrData>} children
     * @property {Object<string,JSTemplate.jsTemplate_attrResult>} _macro
     * @property {boolean} [HAS_POST_PROCESS=false]
     */
    type jsTemplateAttrData = {
        nodes: JSTemplate.jsTemplate_attrResult[];
        texts: JSTemplate.jsTemplate_textResult[];
        children: JSTemplate.jsTemplateAttrData[];
        _macro: {
            [key: string]: JSTemplate.jsTemplate_attrResult;
        };
        HAS_POST_PROCESS?: boolean;
    };
    /**
     * Parsing NodeElement Attribute
     * @protected
     * @memberof JSTemplate
     * @param {JSTemplate.jsTemplate_Attribute} attr
     * @returns {JSTemplate.jsTemplate_attrResult}
     */
    function attrParser(attr: JSTemplate.jsTemplate_Attribute): JSTemplate.jsTemplate_attrResult;
    /**
     * @protected
     * @callback nodeParserCallback
     * @memberof JSTemplate
     * @param {Error} err
     * @param {JSTemplate.parseTextNodesConfig} config
     * @returns {JSTemplate.parseTextNodesConfig}
     */
    type nodeParserCallback = (err: Error, config: JSTemplate.parseTextNodesConfig) => JSTemplate.parseTextNodesConfig;
    /**
     * @protected
     * @callback JSTemplateParseContent
     * @memberof JSTemplate
     * @param {HTMLElement} nodeElement
     * @param {JSTemplate.nodeParserCallback} cb
     * @param {JSTemplate.parseTextNodesConfig} config
     * @returns {JSTemplate.parseTextNodesConfig}
     */
    type JSTemplateParseContent = (nodeElement: HTMLElement, cb: JSTemplate.nodeParserCallback, config: JSTemplate.parseTextNodesConfig) => JSTemplate.parseTextNodesConfig;
    /**
     * @protected
     * @function
     * @memberof JSTemplate
     * @param {HTMLElement} nodeElement
     * @param {JSTemplate.nodeParserCallback} cb
     * @param {JSTemplate.parseTextNodesConfig} config
     * @returns {JSTemplate.parseTextNodesConfig}
     */
    function nodeParser(nodeElement: HTMLElement, cb: JSTemplate.nodeParserCallback, config: JSTemplate.parseTextNodesConfig): JSTemplate.parseTextNodesConfig;
}

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
declare interface JSTemplate {
}

/**
 * @class
 * @name RequestModule
 */
declare class RequestModule {
    /**
     * @function ParamsParser
     * @memberof RequestModule
     * @param {string} value
     * @param {string} pattern
     * @param {object} [opts]
     * @param {object} [opts.cache] object where reg expressions will be cached
     * @param {function} [opts.mapper] function that will decode value, default is decodeURIComponent
     * @param {string} [opts.boud="\x02\x00\x00\x03"] function that will decode value, default is decodeURIComponent
     * @param {object} [opts.ret] object to be updated with found params
     * @param {string[]} [opts.tableIndex] list of parameters' names ( @experimental )
     * @param {string} [opts.pRegExp="\\:([a-z][a-z0-9]+)"] RegExp params' chars
     * @param {string} [opts.matchGroup="([^\\/]+)"] RegExp value
     * @param {string} [opts.fixedEnd=true] RegExp value
     * @returns {Object<string,string>}
     */
    static ParamsParser(value: string, pattern: string, opts?: {
        cache?: any;
        mapper?: (...params: any[]) => any;
        boud?: string;
        ret?: any;
        tableIndex?: string[];
        pRegExp?: string;
        matchGroup?: string;
        fixedEnd?: string;
    }): {
        [key: string]: string;
    };
    /**
     * @method config
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig}
     */
    config(): RequestModule.RequestConfig;
    /**
     * @method configurator
     * @memberof RequestModule#
     * @param {('multipart'|'blob'|'binary'|'POST'|'prepare-multipart'|'retrieve-blob'|'retrieve-binary-string'|'prepare-post'|'check-status-code'|'ignore-status-code')} template configuration name
     * @returns {RequestModule}
     */
    configurator(template: 'multipart' | 'blob' | 'binary' | 'POST' | 'prepare-multipart' | 'retrieve-blob' | 'retrieve-binary-string' | 'prepare-post' | 'check-status-code' | 'ignore-status-code'): RequestModule;
    /**
     * @method request
     * @memberof RequestModule#
     * @returns {XMLHttpRequest}
     */
    request(): XMLHttpRequest;
    /**
     * @method response
     * @memberof RequestModule#
     * @param {(''|'request'|'blob'|'arraybuffer'|'text'|'json'|'document')} [type]
     * @param {object} [options]
     * @param {string} [options.type="application/octet-stream"] Blob constructor's params
     * @returns {(RequestModule|Promise<ArrayBuffer>|Promise<Blob>|Promise<HTMLElement>|Promise<DocumentFragment>|Promise<string>|ArrayBuffer|Blob|HTMLElement|string)}
     */
    response(type?: '' | 'request' | 'blob' | 'arraybuffer' | 'text' | 'json' | 'document', options?: {
        type?: string;
    }): RequestModule | Promise<ArrayBuffer> | Promise<Blob> | Promise<HTMLElement> | Promise<DocumentFragment> | Promise<string> | ArrayBuffer | Blob | HTMLElement | string;
    /**
     * current XMLHttpRequest timeout in seconds
     * @method timeout
     * @memberof RequestModule#
     * @returns {number}
     */
    timeout(): number;
    /**
     * current XMLHttpRequest timeout in seconds
     * @method timeout
     * @memberof RequestModule#
     * @returns {number}
     */
    timeout(): number;
    /**
     * current XMLHttpRequest withCredentials status
     * @method withCredentials
     * @memberof RequestModule#
     * @returns {boolean}
     */
    withCredentials(): boolean;
    /**
     * current XMLHttpRequest withCredentials status
     * @method withCredentials
     * @memberof RequestModule#
     * @returns {boolean}
     */
    withCredentials(): boolean;
    /**
     * Client has been created. open() not called yet.
     * @alias RequestModule.READY_STATE_UNSENT
     * @type {number}
     * @default 0
     */
    static READY_STATE_UNSENT: number;
    /**
     * open() has been called.
     * @alias RequestModule.READY_STATE_OPENED
     * @type {number}
     * @default 1
     */
    static READY_STATE_OPENED: number;
    /**
     * send() has been called, and headers and status are available.
     * @alias RequestModule.READY_STATE_HEADERS_RECEIVED
     * @type {number}
     * @default 2
     */
    static READY_STATE_HEADERS_RECEIVED: number;
    /**
     * Downloading; responseText holds partial data.
     * @alias RequestModule.READY_STATE_LOADING
     * @type {number}
     * @default 3
     */
    static READY_STATE_LOADING: number;
    /**
     * Downloading is done
     * @alias RequestModule.READY_STATE_DONE
     * @type {number}
     * @default 4
     */
    static READY_STATE_DONE: number;
    /**
     * @method readyState
     * @memberof RequestModule#
     * @returns {RequestModule.readyStateType}
     */
    readyState(): RequestModule.readyStateType;
    /**
     * @method status
     * @memberof RequestModule#
     * @returns {number}
     */
    status(): number;
    /**
     * @method statusText
     * @memberof RequestModule#
     * @returns {string}
     */
    statusText(): string;
    /**
     * returns `RequestModule.RequestConfig["async"]`
     * @method async
     * @memberof RequestModule#
     * @returns {boolean}
     * @see RequestModule.RequestConfig
     */
    async(): boolean;
    /**
     * returns `RequestModule.RequestConfig["async"]`
     * @method async
     * @memberof RequestModule#
     * @returns {boolean}
     * @see RequestModule.RequestConfig
     */
    async(): boolean;
    /**
     * returns `RequestModule.RequestConfig["method"]`
     * @method method
     * @memberof RequestModule#
     * @returns {string}
     * @see RequestModule.RequestConfig
     */
    method(): string;
    /**
     * returns `RequestModule.RequestConfig["method"]`
     * @method method
     * @memberof RequestModule#
     * @returns {string}
     * @see RequestModule.RequestConfig
     */
    method(): string;
    /**
     * returns `RequestModule.RequestConfig["url"]`
     * @method url
     * @memberof RequestModule#
     * @returns {string}
     * @see RequestModule.RequestConfig
     */
    url(): string;
    /**
     * returns `RequestModule.RequestConfig["url"]`
     * @method url
     * @memberof RequestModule#
     * @returns {string}
     * @see RequestModule.RequestConfig
     */
    url(): string;
    /**
     * @method open
     * @memberof RequestModule#
     * @param {string} [method="GET"]
     * @param {string} [url]
     * @param {boolean} [async]
     * @param {number} [timeout] request timeout in seconds
     * @returns {RequestModule}
     */
    open(method?: string, url?: string, async?: boolean, timeout?: number): RequestModule;
    /**
     * @method send
     * @memberof RequestModule#
     * @param {string|FormData|MediaStream} [data='']
     * @param {("asFormData"|"json"|"urlencoded")} [type=null]
     * @param {Object<string,string>} [headers]
     * @returns {RequestModule}
     */
    send(data?: string | FormData | MediaStream, type?: "asFormData" | "json" | "urlencoded", headers?: {
        [key: string]: string;
    }): RequestModule;
    /**
     * @method headers
     * @memberof RequestModule#
     * @returns {string}
     */
    headers(): string;
    /**
     * @method headers
     * @memberof RequestModule#
     * @returns {string}
     */
    headers(): string;
}

/**
 * @callback RequestModuleConstructor
 * @returns {RequestModule}
 */
declare type RequestModuleConstructor = () => RequestModule;

declare namespace RequestModule {
    /**
     * @inner
     * @typedef {Object} RequestConfig
     * @memberof RequestModule
     * @property {boolean} [method="GET"]
     * @property {boolean} [url="#"]
     * @property {boolean} [async=true]
     * @property {boolean} [opened=false]
     * @property {boolean} [isSent=false]
     * @property {boolean} [isLoaded=false]
     * @property {boolean} [isUploaded=false]
     * @property {boolean} [ignoreStatusCode=false]
     */
    type RequestConfig = {
        method?: boolean;
        url?: boolean;
        async?: boolean;
        opened?: boolean;
        isSent?: boolean;
        isLoaded?: boolean;
        isUploaded?: boolean;
        ignoreStatusCode?: boolean;
    };
    /**
     * @typedef {object} RequestModule.readyStateType
     * @property {number} [READY_STATE_UNSENT=0]
     * @property {number} [READY_STATE_OPENED=1]
     * @property {number} [READY_STATE_HEADERS_RECEIVED=2]
     * @property {number} [READY_STATE_LOADING=3]
     * @property {number} [READY_STATE_DONE=4]
     */
    type readyStateType = {
        READY_STATE_UNSENT?: number;
        READY_STATE_OPENED?: number;
        READY_STATE_HEADERS_RECEIVED?: number;
        READY_STATE_LOADING?: number;
        READY_STATE_DONE?: number;
    };
}

/** @module uriLoad
 */
declare module "uriLoad" {
    /**
     * loadScript - is a function for adding scripts into the header
     * @alias module:uriLoad.script
     * @param  {string|string[]}   url      url/urls of scripts
     * @param  {Function} callback [description]
     * @param  {object}   opts     settings with info related to the script tags
     */
    function script(url: string | string[], callback: (...params: any[]) => any, opts: any): void;
    /**
     * loadLink - is a function for adding link tags into the header
     * @alias module:uriLoad.link
     * @param  {string|string[]}   url      url/urls of link tags
     * @param  {Function} callback [description]
     * @param  {object}   opts     settings with info related to the link tags
     */
    function link(url: string | string[], callback: (...params: any[]) => any, opts: any): void;
}

declare namespace ApplicationPrototype {
    /**
     * @class
     * @name Instance
     * @memberof ApplicationPrototype
     */
    class Instance {
        /**
         * returns listener Id
         * @method on
         * @memberof ApplicationPrototype.Instance#
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {string}
         */
        on(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId?: string): string;
        /**
         * returns listener Id
         * @method once
         * @memberof ApplicationPrototype.Instance#
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {string}
         */
        once(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId?: string): string;
        /**
         * returns listener Id
         * @method bind
         * @memberof ApplicationPrototype.Instance#
         * @param {string|function} event event name of function with name
         * @param {function|ApplicationPrototype.Instance.BindListenerConfig} [callback] function that will listen data
         * @param {ApplicationPrototype.Instance.BindListenerConfig|string} [listenersConfig] of lis event name of function with name
         * @returns {string}
         */
        bind(event: string | ((...params: any[]) => any), callback?: ((...params: any[]) => any) | ApplicationPrototype.Instance.BindListenerConfig, listenersConfig?: ApplicationPrototype.Instance.BindListenerConfig | string): string;
        /**
         * emits an application event
         * @method emit
         * @memberof ApplicationPrototype.Instance#
         * @param {string} event event name
         * @param {any[]} [args] arguments passed with event
         * @param {boolean} [track=false] indicate if to use tracked handler or internal
         * @param {boolean} [noSkipStopReturn=false] indicate if event flow can be stopped by a `false` return
         */
        emit(event: string, args?: any[], track?: boolean, noSkipStopReturn?: boolean): void;
        /**
         * remove all event listeners
         * @method off
         * @memberof ApplicationPrototype.Instance#
         * @param {string} event event or events names separated by comma
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {boolean}
         */
        off(event: string, specifiedEventId?: string): boolean;
        /**
         * returns listener Id
         * @method crudEvents
         * @memberof ApplicationPrototype.Instance#
         * @param {Object<string,any>} context will be used as a base for ApplicationPrototype instance that will be returned
         * @param {Object<string,Function>} publicMethods list of public methods available from returned instance
         * @param {Object<string,Function>} privateMethods list of private methods available only for instance's methods
         * @returns {ApplicationPrototype.Instance}
         */
        crudEvents(context: {
            [key: string]: any;
        }, publicMethods: {
            [key: string]: (...params: any[]) => void;
        }, privateMethods: {
            [key: string]: (...params: any[]) => void;
        }): ApplicationPrototype.Instance;
        /**
         * @method property
         * @memberof ApplicationPrototype.Instance#
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
         */
        property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
        /**
         * @method property
         * @memberof ApplicationPrototype.Instance#
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
         */
        property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
    }
    namespace Instance {
        /**
         * @typedef {object} BindListenerConfig - configuration for bind listeners
         * @memberof ApplicationPrototype.Instance
         * @property {boolean} [listenedBefore=true] allow listeners before method call
         * @property {boolean} [listenedOn=true] allow listeners on method call ( is after )
         * @property {boolean} [listenedAfter=true] allow listeners after method call ( is after small delay )
         * @property {boolean} [allowInterruption=true]
         */
        type BindListenerConfig = {
            listenedBefore?: boolean;
            listenedOn?: boolean;
            listenedAfter?: boolean;
            allowInterruption?: boolean;
        };
        /**
         * returns listener Id
         * @callback PropertyHandler
         * @memberof ApplicationPrototype.Instance
         * @param {any} value is undefined when `isSetter = true`
         * @param {any} lastValue
         * @param {boolean} isSetter
         */
        type PropertyHandler = (value: any, lastValue: any, isSetter: boolean) => void;
    }
    /**
     * @class
     * @name Builder
     * @memberof ApplicationPrototype
     * @augments ApplicationPrototype.Instance
     */
    class Builder extends ApplicationPrototype.Instance {
        /**
         * @method require
         * @memberof ApplicationPrototype.Builder#
         * @param {string|string[]} events List of Events Names or Array of Events Mapping like [ "uriLoad :: uri-load", "ePrototype :: ExtensionsPrototype" ]
         * @param {function} [callback] Callback that will receive Module
         * @returns {PromiseLike<any>}
         */
        require(events: string | string[], callback?: (...params: any[]) => any): PromiseLike<any>;
        /**
         * @method isNode
         * @memberof ApplicationPrototype.Builder#
         * @returns {boolean}
         */
        isNode(): boolean;
        /**
         * @method isBrowser
         * @memberof ApplicationPrototype.Builder#
         * @returns {boolean}
         */
        isBrowser(): boolean;
        /**
         * @method debugEnabled
         * @memberof ApplicationPrototype.Builder#
         * @param {boolean} [status]
         * @returns {boolean}
         */
        debugEnabled(status?: boolean): boolean;
        /**
         * @method runModulesInFiles
         * @memberof ApplicationPrototype.Builder#
         * @param {boolean} [status]
         * @returns {boolean}
         */
        runModulesInFiles(status?: boolean): boolean;
        /**
         * @method consoleOptions
         * @memberof ApplicationPrototype.Builder#
         * @param {ApplicationPrototype.Builder.ConsoleOptions} [options]
         * @returns {ApplicationPrototype.Builder.ConsoleOptions}
         */
        consoleOptions(options?: ApplicationPrototype.Builder.ConsoleOptions): ApplicationPrototype.Builder.ConsoleOptions;
        /**
         * @method modulePath
         * @memberof ApplicationPrototype.Builder#
         * @param {string} [path]
         * @returns {string}
         */
        modulePath(path?: string): string;
        /**
         * @method moduleRegister
         * @memberof ApplicationPrototype.Builder#
         * @param {string} path path that will be used as `Application.modulePath()`
         * @param {string[]} modules list of modules names that should be registered
         * @returns {ApplicationPrototype.Builder.ModuleStore}
         */
        moduleRegister(path: string, modules: string[]): ApplicationPrototype.Builder.ModuleStore;
        /**
         * returns listener Id
         * @method on
         * @memberof ApplicationPrototype.Instance#
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {string}
         */
        on(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId?: string): string;
        /**
         * returns listener Id
         * @method once
         * @memberof ApplicationPrototype.Instance#
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {string}
         */
        once(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId?: string): string;
        /**
         * returns listener Id
         * @method bind
         * @memberof ApplicationPrototype.Instance#
         * @param {string|function} event event name of function with name
         * @param {function|ApplicationPrototype.Instance.BindListenerConfig} [callback] function that will listen data
         * @param {ApplicationPrototype.Instance.BindListenerConfig|string} [listenersConfig] of lis event name of function with name
         * @returns {string}
         */
        bind(event: string | ((...params: any[]) => any), callback?: ((...params: any[]) => any) | ApplicationPrototype.Instance.BindListenerConfig, listenersConfig?: ApplicationPrototype.Instance.BindListenerConfig | string): string;
        /**
         * emits an application event
         * @method emit
         * @memberof ApplicationPrototype.Instance#
         * @param {string} event event name
         * @param {any[]} [args] arguments passed with event
         * @param {boolean} [track=false] indicate if to use tracked handler or internal
         * @param {boolean} [noSkipStopReturn=false] indicate if event flow can be stopped by a `false` return
         */
        emit(event: string, args?: any[], track?: boolean, noSkipStopReturn?: boolean): void;
        /**
         * remove all event listeners
         * @method off
         * @memberof ApplicationPrototype.Instance#
         * @param {string} event event or events names separated by comma
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {boolean}
         */
        off(event: string, specifiedEventId?: string): boolean;
        /**
         * returns listener Id
         * @method crudEvents
         * @memberof ApplicationPrototype.Instance#
         * @param {Object<string,any>} context will be used as a base for ApplicationPrototype instance that will be returned
         * @param {Object<string,Function>} publicMethods list of public methods available from returned instance
         * @param {Object<string,Function>} privateMethods list of private methods available only for instance's methods
         * @returns {ApplicationPrototype.Instance}
         */
        crudEvents(context: {
            [key: string]: any;
        }, publicMethods: {
            [key: string]: (...params: any[]) => void;
        }, privateMethods: {
            [key: string]: (...params: any[]) => void;
        }): ApplicationPrototype.Instance;
        /**
         * @method property
         * @memberof ApplicationPrototype.Instance#
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
         */
        property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
    }
    namespace Builder {
        /**
         * @class
         * @name Promise
         * @memberof ApplicationPrototype.Builder
         * @param {function} handler
         * @returns {PromiseLike<any>}
         */
        class Promise {
            constructor(handler: (...params: any[]) => any);
            /**
             * @method all
             * @memberof ApplicationPrototype.Builder.Promise
             * @param {Promise[]} items
             * @returns {PromiseLike<any[]>}
             */
            static all(items: Promise[]): PromiseLike<any[]>;
            /**
             * @method race
             * @memberof ApplicationPrototype.Builder.Promise
             * @param {Promise[]} items
             * @returns {PromiseLike<any[]>}
             */
            static race(items: Promise[]): PromiseLike<any[]>;
            /**
             * @method resolve
             * @memberof ApplicationPrototype.Builder.Promise
             * @param {any} value
             * @returns {PromiseLike<any>}
             */
            static resolve(value: any): PromiseLike<any>;
            /**
             * @method reject
             * @memberof ApplicationPrototype.Builder.Promise
             * @param {any} value
             * @returns {PromiseLike<Error>}
             */
            static reject(value: any): PromiseLike<Error>;
        }
        /**
         * @typedef {object} ConsoleOptions
         * @memberof ApplicationPrototype.Builder
         * @property {boolean} [file] enable/disable showing filename in console log. default value is `true`
         * @property {boolean} [contextName] enable/disable showing context Execution info in console log. default value is `true`
         * @property {boolean} [timestamp] enable/disable showing current timestamp in console log. default value is `true`
         * @property {boolean} [logType] enable/disable showing log type in console log. default value is `true
         */
        type ConsoleOptions = {
            file?: boolean;
            contextName?: boolean;
            timestamp?: boolean;
            logType?: boolean;
        };
        /**
         * @typedef {object} ModuleStore
         * @memberof ApplicationPrototype.Builder
         * @description modules store where are indexed modules
         */
        type ModuleStore = any;
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
        type ModuleMeta = {
            store: ApplicationPrototype.Builder.ModuleStore;
            $requestQuery: PromiseLike<string>;
            module_path: string;
            path: string;
            name: string;
            __dirname: string;
        };
        /**
         * @callback moduleResolve
         * @memberof ApplicationPrototype.Builder#
         * @param {string} module module name
         * @param {string} [path] module path
         * @returns {ApplicationPrototype.Builder.ModuleMeta}
         */
        type moduleResolve = (module: string, path?: string) => ApplicationPrototype.Builder.ModuleMeta;
        /**
         * @typedef {string} ModuleResourceUrl
         * @memberof ApplicationPrototype.Builder
         * @description resources url is composed from `module's plath` + `resource path`
         */
        type ModuleResourceUrl = string;
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
        type ApplicationModule = {
            $request: PromiseLike<XMLHttpRequest>;
            exports: (...params: any[]) => any;
            atime: number;
            Application: (...params: any[]) => any;
            cache: (...params: any[]) => any;
            require: (...params: any[]) => any;
            resourceUrl: (...params: any[]) => any;
            meta: ApplicationPrototype.Builder.ModuleMeta;
        };
    }
}

/**
 * @interface ApplicationPrototype
 */
declare interface ApplicationPrototype {
}

/**
 * returns interface for accessing Node Env, is defined only in node env
 * @var NodeInterface
 * @type {object}
 * @property {function():NodeJS.Process} process
 * @property {function():NodeJS.Global} global
 * @property {function():NodeRequire} require
 * @property {function(string):any} globalReference returns NodeJS require reference by it's name
 */
declare var NodeInterface: {
    process: (...params: any[]) => any;
    global: (...params: any[]) => any;
    require: (...params: any[]) => any;
    globalReference: (...params: any[]) => any;
};

/**
 * @callback ApplicationPrototypeConstructor
 * @returns {ApplicationPrototype.Instance}
 */
declare type ApplicationPrototypeConstructor = () => ApplicationPrototype.Instance;

/**
 * @callback ApplicationBuilderConstructor
 * @returns {ApplicationPrototype.Builder}
 */
declare type ApplicationBuilderConstructor = () => ApplicationPrototype.Builder;

/**
 * @typedef ApplicationBuilderExports
 * @property {ApplicationPrototypeConstructor} application
 * @property {ApplicationBuilderConstructor} builder
 */
declare type ApplicationBuilderExports = {
    application: ApplicationPrototypeConstructor;
    builder: ApplicationBuilderConstructor;
};

/**
 * @interface String
 */
declare interface String {
    /**
     * similar as PHP subs
     * @memberof String#
     * @method subs
     * @param {number} p
     * @param {number} [i]
     * @returns {string}
     */
    subs(p: number, i?: number): string;
    /**
     * @memberof String#
     * @method toHex
     * @param {boolean} utf8
     * @returns {string}
     */
    toHex(utf8: boolean): string;
    /**
     * @memberof String#
     * @method fromHex
     * @returns {string}
     */
    fromHex(): string;
    /**
     * @memberof String#
     * @method toHtmlSimple
     * @returns {string}
     */
    toHtmlSimple(): string;
    /**
     * @memberof String#
     * @method toHtml
     * @returns {string}
     */
    toHtml(): string;
    /**
     * @memberof String#
     * @method fromHtml
     * @returns {string}
     */
    fromHtml(): string;
    /**
     * remove dangerous HTML Tags
     * @memberof String#
     * @method cleanTags
     * @returns {string}
     */
    cleanTags(): string;
    /**
     * @memberof String#
     * @method add_Class
     * @param {string} className
     * @returns {string}
     */
    add_Class(className: string): string;
    /**
     * @memberof String#
     * @method del_Class
     * @param {string} className
     * @returns {string}
     */
    del_Class(className: string): string;
    /**
     * find a class
     * @memberof String#
     * @method fnd_Class
     * @param {string} className
     * @returns {boolean}
     */
    fnd_Class(className: string): boolean;
    /**
     * swap letters' case
     * @memberof String#
     * @method swp_case
     * @returns {string}
     */
    swp_case(): string;
    /**
     * uppercase first [k] letters from word
     * @memberof String#
     * @method ucfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    ucfirst(k?: number): string;
    /**
     * lowercase first [k] letters from word
     * @memberof String#
     * @method lcfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    lcfirst(k?: number): string;
    /**
     * @memberof String#
     * @method utf8need
     * @returns {string}
     */
    utf8need(): string;
    /**
     * @memberof String#
     * @method utf8encode
     * @returns {string}
     */
    utf8encode(): string;
    /**
     * @memberof String#
     * @method utf8decode
     * @returns {string}
     */
    utf8decode(): string;
    /**
     * @memberof String#
     * @method toRegexp
     * @param {string} [flags]
     * @returns {string}
     */
    toRegexp(flags?: string): string;
    /**
     * @memberof String#
     * @method escapeHex
     * @returns {string}
     */
    escapeHex(): string;
    /**
     * @memberof String#
     * @method escape
     * @returns {string}
     */
    escape(): string;
    /**
     * @memberof String#
     * @method encodeURI
     * @returns {string}
     */
    encodeURI(): string;
    /**
     * @memberof String#
     * @method unescape
     * @returns {string}
     */
    unescape(): string;
    /**
     * @memberof String#
     * @method decodeURI
     * @returns {string}
     */
    decodeURI(): string;
    /**
     * @memberof String#
     * @method parseUrlVars
     * @param {boolean} [json=false]
     * @param {object} [params]
     * @param {boolean} [params.keepOBJ=false]
     * @param {boolean} [params.isURL=false]
     * @returns {Object<string,any>}
     */
    parseUrlVars(json?: boolean, params?: {
        keepOBJ?: boolean;
        isURL?: boolean;
    }): {
        [key: string]: any;
    };
    /**
     * @memberof String#
     * @method parseUrl
     * @param {boolean} [k=false] decode get vars
     * @returns {String.String_parseUrl_return}
     */
    parseUrl(k?: boolean): String.String_parseUrl_return;
    /**
     * @memberof String#
     * @method match_str
     * @param {string} reg_exp
     * @param {string} [flags]
     * @returns {string[]|null}
     */
    match_str(reg_exp: string, flags?: string): string[] | null;
    /**
     * @memberof String#
     * @method sha1
     * @returns {string}
     */
    sha1(): string;
    /**
     * @memberof String#
     * @method sha256
     * @returns {string}
     */
    sha256(): string;
    /**
     * @memberof String#
     * @method md5
     * @returns {string}
     */
    md5(): string;
    /**
     * @memberof String#
     * @method base64encode
     * @returns {string}
     */
    base64encode(): string;
    /**
     * @memberof String#
     * @method base64decode
     * @returns {string}
     */
    base64decode(): string;
    /**
     * @memberof String#
     * @method base64encodeBytes
     * @returns {Uint8Array}
     */
    base64encodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64encodeBytesArray
     * @returns {number[]}
     */
    base64encodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64decodeBytes
     * @returns {Uint8Array}
     */
    base64decodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64decodeBytesArray
     * @returns {number[]}
     */
    base64decodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64encodeClean
     * @returns {string}
     */
    base64encodeClean(): string;
    /**
     * @memberof String#
     * @method base64decodeClean
     * @returns {string}
     */
    base64decodeClean(): string;
    /**
     * @memberof String#
     * @method encryptTea
     * @param {string} password
     * @returns {string}
     */
    encryptTea(password: string): string;
    /**
     * @memberof String#
     * @method decryptTea
     * @param {string} password
     * @returns {string}
     */
    decryptTea(password: string): string;
    /**
     * @memberof String#
     * @method encryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    encryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * @memberof String#
     * @method decryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    decryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * "asd asdsdf param:sdd test:data 2 info".buildQuery()
     * {_keys: ["_", "param", "test"], _: 'asd asdsdf', param: 'sdd', test: 'data 2 info'}
     * @memberof String#
     * @method buildQuery
     * @returns {Object<string,string>}
     */
    buildQuery(): {
        [key: string]: string;
    };
    /**
     * "23 test \"composed param\" 234".buildSearchArray()
     * ['23', 'test', 'composed param', '234']
     * @memberof String#
     * @method buildSearchArray
     * @returns {string[]}
     */
    buildSearchArray(): string[];
    /**
     * similar as utf8encode
     * @memberof String#
     * @method utf8
     * @returns {string}
     */
    utf8(): string;
    /**
     * similar as utf8decode
     * @memberof String#
     * @method unicode
     * @returns {string}
     */
    unicode(): string;
    /**
     * @memberof String#
     * @method toArrayBufferFromUtf8
     * @returns {ArrayBuffer}
     */
    toArrayBufferFromUtf8(): ArrayBuffer;
    /**
     * similar as PHP subs
     * @memberof String#
     * @method subs
     * @param {number} p
     * @param {number} [i]
     * @returns {string}
     */
    subs(p: number, i?: number): string;
    /**
     * @memberof String#
     * @method toHex
     * @param {boolean} utf8
     * @returns {string}
     */
    toHex(utf8: boolean): string;
    /**
     * @memberof String#
     * @method fromHex
     * @returns {string}
     */
    fromHex(): string;
    /**
     * @memberof String#
     * @method toHtmlSimple
     * @returns {string}
     */
    toHtmlSimple(): string;
    /**
     * @memberof String#
     * @method toHtml
     * @returns {string}
     */
    toHtml(): string;
    /**
     * @memberof String#
     * @method fromHtml
     * @returns {string}
     */
    fromHtml(): string;
    /**
     * remove dangerous HTML Tags
     * @memberof String#
     * @method cleanTags
     * @returns {string}
     */
    cleanTags(): string;
    /**
     * @memberof String#
     * @method add_Class
     * @param {string} className
     * @returns {string}
     */
    add_Class(className: string): string;
    /**
     * @memberof String#
     * @method del_Class
     * @param {string} className
     * @returns {string}
     */
    del_Class(className: string): string;
    /**
     * find a class
     * @memberof String#
     * @method fnd_Class
     * @param {string} className
     * @returns {boolean}
     */
    fnd_Class(className: string): boolean;
    /**
     * swap letters' case
     * @memberof String#
     * @method swp_case
     * @returns {string}
     */
    swp_case(): string;
    /**
     * uppercase first [k] letters from word
     * @memberof String#
     * @method ucfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    ucfirst(k?: number): string;
    /**
     * lowercase first [k] letters from word
     * @memberof String#
     * @method lcfirst
     * @param {number} [k=1]
     * @returns {string}
     */
    lcfirst(k?: number): string;
    /**
     * @memberof String#
     * @method utf8need
     * @returns {string}
     */
    utf8need(): string;
    /**
     * @memberof String#
     * @method utf8encode
     * @returns {string}
     */
    utf8encode(): string;
    /**
     * @memberof String#
     * @method utf8decode
     * @returns {string}
     */
    utf8decode(): string;
    /**
     * similar as utf8encode
     * @memberof String#
     * @method utf8
     * @returns {string}
     */
    utf8(): string;
    /**
     * similar as utf8decode
     * @memberof String#
     * @method unicode
     * @returns {string}
     */
    unicode(): string;
    /**
     * @memberof String#
     * @method encryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    encryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * @memberof String#
     * @method decryptAes
     * @param {string} password
     * @param {128|256|512} [bytes=128]
     * @returns {string}
     */
    decryptAes(password: string, bytes?: 128 | 256 | 512): string;
    /**
     * @memberof String#
     * @method encryptTea
     * @param {string} password
     * @returns {string}
     */
    encryptTea(password: string): string;
    /**
     * @memberof String#
     * @method decryptTea
     * @param {string} password
     * @returns {string}
     */
    decryptTea(password: string): string;
    /**
     * @memberof String#
     * @method base64decode
     * @returns {string}
     */
    base64decode(): string;
    /**
     * @memberof String#
     * @method base64encode
     * @returns {string}
     */
    base64encode(): string;
    /**
     * @memberof String#
     * @method base64decodeBytes
     * @returns {Uint8Array}
     */
    base64decodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64encodeBytes
     * @returns {Uint8Array}
     */
    base64encodeBytes(): Uint8Array;
    /**
     * @memberof String#
     * @method base64decodeBytesArray
     * @returns {number[]}
     */
    base64decodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64encodeBytesArray
     * @returns {number[]}
     */
    base64encodeBytesArray(): number[];
    /**
     * @memberof String#
     * @method base64encodeClean
     * @returns {string}
     */
    base64encodeClean(): string;
    /**
     * @memberof String#
     * @method base64decodeClean
     * @returns {string}
     */
    base64decodeClean(): string;
    /**
     * @memberof String#
     * @method encodeURI
     * @returns {string}
     */
    encodeURI(): string;
    /**
     * @memberof String#
     * @method decodeURI
     * @returns {string}
     */
    decodeURI(): string;
    /**
     * @memberof String#
     * @method escapeHex
     * @returns {string}
     */
    escapeHex(): string;
    /**
     * @memberof String#
     * @method escape
     * @returns {string}
     */
    escape(): string;
    /**
     * @memberof String#
     * @method unescape
     * @returns {string}
     */
    unescape(): string;
    /**
     * @memberof String#
     * @method sha1
     * @returns {string}
     */
    sha1(): string;
    /**
     * @memberof String#
     * @method sha256
     * @returns {string}
     */
    sha256(): string;
    /**
     * similar as PHP subs
     * @memberof String#
     * @method subs
     * @param {number} p
     * @param {number} [i]
     * @returns {string}
     */
    subs(p: number, i?: number): string;
    /**
     * @memberof String#
     * @method md5
     * @returns {string}
     */
    md5(): string;
    /**
     * @memberof String#
     * @method markdown
     * @returns {string}
     */
    markdown(): string;
    /**
     * @memberof String#
     * @method toRegexp
     * @param {string} [flags]
     * @returns {string}
     */
    toRegexp(flags?: string): string;
    /**
     * @memberof String#
     * @method parseUrl
     * @param {boolean} [k=false] decode get vars
     * @returns {String.String_parseUrl_return}
     */
    parseUrl(k?: boolean): String.String_parseUrl_return;
    /**
     * @memberof String#
     * @method match_str
     * @param {string} reg_exp
     * @param {string} [flags]
     * @returns {string[]|null}
     */
    match_str(reg_exp: string, flags?: string): string[] | null;
    /**
     * "asd asdsdf param:sdd test:data 2 info".buildQuery()
     * {_keys: ["_", "param", "test"], _: 'asd asdsdf', param: 'sdd', test: 'data 2 info'}
     * @memberof String#
     * @method buildQuery
     * @returns {Object<string,string>}
     */
    buildQuery(): {
        [key: string]: string;
    };
    /**
     * "23 test \"composed param\" 234".buildSearchArray()
     * ['23', 'test', 'composed param', '234']
     * @memberof String#
     * @method buildSearchArray
     * @returns {string[]}
     */
    buildSearchArray(): string[];
    /**
     * @memberof String#
     * @method toArrayBufferFromUtf8
     * @returns {ArrayBuffer}
     */
    toArrayBufferFromUtf8(): ArrayBuffer;
}

declare module "application-prototype" {


function application(): ApplicationPrototype.Instance; 

function builder(): ApplicationPrototype.Builder; 
}
