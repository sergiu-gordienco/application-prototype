/**
 * Module used processing data asynchronous
 * @example
 * Application.require('async').then(function (asyncOperations) {
 *	// @TODO
 * }, console.error);
 * @module async
 * @returns {module:async.AsyncConstructor}
 * @see module:async~async
 */
declare module "async" {
    /**
     * @callback AsyncConstructor
     * @memberof module:async
     * @returns {module:async.Async}
     */
    type AsyncConstructor = () => module;
    /**
     * @memberof module:async
     * @class
     * @name Async
     */
    class Async {
        /**
         * return unique index identifier for an operation
         * @method index
         * @memberof module:async.Async#
         * @returns {string}
         */
        index(): string;
        /**
         * method used for return result for an operation,
         * returns `true` if value was accepted.
         * if operation already obtained a value
         * then value is not accepted and it returns `false`
         * @method receive
         * @memberof module:async.Async#
         * @param {string} id obtained from {@link module:async.Async#index}
         * @param {any} args
         * @returns {boolean}
         */
        receive(id: string, args: any): boolean;
        /**
         * require to wait an additional operation
         * @method wait
         * @memberof module:async.Async#
         */
        wait(): void;
        /**
         * require to reserve index {@link module:async.Async#index} for an additional operation
         * @method reserve
         * @memberof module:async.Async#
         * @returns {string}
         */
        reserve(): string;
        /**
         * require to run an operation
         * @method run
         * @memberof module:async.Async#
         * @param {function():void} func function that should be executed
         * @param {any[]} args
         * @param {object} context
         * @returns {string}
         */
        run(func: (...params: any[]) => any, args: any[], context: any): string;
        /**
         * reset operation processing
         * @method flush
         * @memberof module:async.Async#
         */
        flush(): void;
        /**
         * return how many operations are processing right now
         * @method processing
         * @memberof module:async.Async#
         * @returns {number}
         */
        processing(): number;
        /**
         * return operations' responses
         * @method responses
         * @memberof module:async.Async#
         * @param {boolean} [returnUnknownResponses=false]
         * @returns {any[][]}
         */
        responses(returnUnknownResponses?: boolean): any[][];
        /**
         * return all errors found in responses
         * @method errors
         * @memberof module:async.Async#
         * @returns {Error[]}
         */
        errors(): Error[];
        /**
         * register a callback to be called when processing is done
         * @method done
         * @memberof module:async.Async#
         * @param {function():void} cb
         */
        done(cb: (...params: any[]) => any): void;
    }
    /**
     * @callback module:async.processCallback
     * @param {function(Error?): void} next
     * @param {any} item
     * @param {number} index
     * @param {any[]} items
     */
    type processCallback = (next: (...params: any[]) => any, item: any, index: number, items: any[]) => void;
    /**
     * @callback module:async.doneCallback
     * @this module:async.Async
     */
    type doneCallback = () => void;
    /**
     * @method flow
     * @memberof module:async.
     * @param {module:async.Async~Operations} operations
     * @param {module:async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {module:async.Async}
     */
    function flow(operations: module, cb: module, timeout?: number): module;
    /**
     * @method waterfall
     * @memberof module:async.
     * @param {module:async.Async~Operations} operations
     * @param {module:async.doneCallback} cb
     * @param {number} [parallel=27] number of operations that can be done in parallel
     * @param {number} [timeout=0] timeout between operations
     * @returns {module:async.Async}
     */
    function waterfall(operations: module, cb: module, parallel?: number, timeout?: number): module;
    /**
     * @method map
     * @memberof module:async.
     * @param {any[]} operations
     * @param {module:async.processCallback}
     * @param {module:async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {module:async.Async}
     */
    function map(operations: any[], cb: module, timeout?: number): module;
    /**
     * @method flow·map
     * @memberof module:async.
     * @param {any[]} operations
     * @param {module:async.processCallback}
     * @param {module:async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {module:async.Async}
     */
    function flow·map(operations: any[], cb: module, timeout?: number): module;
    /**
     * @method waterfall·map
     * @memberof module:async.
     * @param {any[]} operations
     * @param {module:async.processCallback}
     * @param {module:async.doneCallback} cb
     * @param {number} [parallel=27] number of operations that can be done in parallel
     * @param {number} [timeout=0] timeout between operations
     * @returns {module:async.Async}
     */
    function waterfall·map(operations: any[], cb: module, parallel?: number, timeout?: number): module;
}

declare namespace async {
    namespace Async {
        /**
         * @typedef {Array} module:async.Async~Operation
         * @property {module:async.Async~OperationCallback} 0
         * @property {module:async.Async~OperationArgs} 1
         * @property {module:async.Async~OperationContext} 2
         * @property {module:async.Async~OperationCallbackIndex} 3
         */
        type Operation = any[];
        /**
         * @typedef {Array} module:async.Async~Operation
         * @property {module:async.Async~OperationCallback} 0
         * @property {module:async.Async~OperationArgs} 1
         * @property {module:async.Async~OperationContext} 2
         * @property {module:async.Async~OperationCallbackIndex} 3
         */
        type Operation = any[];
        /**
         * a function that represents the operation itself, it have as argument `next` callback, by default it is first.
         * @typedef {Function} module:async.Async~OperationCallback
         */
        type OperationCallback = () => void;
        /**
         * list if arguments passed to `OperationCallback`.
         * @typedef {any[]} module:async.Async~OperationArgs
         */
        type OperationArgs = any[];
        /**
         * context that should be used in `OperationCallback`. Default value is `{}`.
         * @typedef {object} module:async.Async~OperationContext
         */
        type OperationContext = any;
        /**
         * index of `next()` callback in list of `OperationCallback`'s arguments. Default value is `0`.
         * @typedef {number} module:async.Async~OperationCallbackIndex
         */
        type OperationCallbackIndex = number;
        /**
         * @typedef {module:async.Async~Operation[]} module:async.Async~Operations
         */
        type Operations = module[];
    }
}

/**
 * browserSessionBuilder description
 * @callback BrowserSessionModule
 * @param  {string|object} objectStoreArg name or object of strategyStore
 * @param {object} [objectStoreConf]
 * @return {Promise<ApplicationPrototypeInstance>}                session application
 */
declare type BrowserSessionModule = (objectStoreArg: string | any, objectStoreConf?: any) => Promise<ApplicationPrototypeInstance>;

/** @type {BrowserSessionModule}
 */
declare function browserSessionBuilder(): void;

/**
 * @module extensions/prototype
 */
declare module "extensions/prototype" {
    /**
     * @var {object} fn
     * @memberof module:extensions/prototype
     * @property {module:extensions/prototype~WindowFunctions} window
     * @property {module:extensions/prototype~MouseFunctions} mouse
     * @property {(module:extensions/prototype~getRandId_1|module:extensions/prototype~getRandId_2)} getRandId
     */
    var fn: {
        window: module;
        mouse: module;
        getRandId: module | module;
    };
    /**
     * @typedef {object} WindowFunctions
     * @property {object} sizeLimit
     * @property {module:extensions/prototype~windowSizeCache} sizeLimit.min
     * @property {module:extensions/prototype~windowSizeCache} sizeLimit.max
     * @property {number} [refreshRate=200] how often to recalculate window size
     * @property {module:extensions/prototype~windowSizeActive} sizeActive
     * @property {module:extensions/prototype~windowSize} size
     */
    type WindowFunctions = {
        sizeLimit: {
            min: module;
            max: module;
        };
        refreshRate?: number;
        sizeActive: module;
        size: module;
    };
    /**
     * @typedef {object} MouseFunctions
     * @property {external:MouseEvent} event
     * @property {module:extensions/prototype~MousePosition} position
     * @property {object} config
     * @property {boolean} config.tracking
     */
    type MouseFunctions = {
        event: external;
        position: module;
        config: {
            tracking: boolean;
        };
    };
    /**
     * @var {object} object
     * @property {(module:extensions/prototype~ObjectExtend_1|module:extensions/prototype~ObjectExtend_2)} extend
     * @memberof module:extensions/prototype
     */
    var object: {
        extend: module | module;
    };
    /**
     * @var {object} string
     * @memberof module:extensions/prototype
     */
    var string: any;
    /**
     * @var {any} WindowExtend
     * @memberof module:extensions/prototype
     * @example
     * window.addEvent(elem, type, handler);
     * window.removeEvent(elem, type, handlerId);
     *
     * window.addEventListener(eventName, function (event) {});
     */
    var WindowExtend: any;
    /**
     * @callback getRandId_1
     * @memberof module:extensions/prototype~
     * @param {string} prefix
     * @param {boolean} minimize
     */
    type getRandId_1 = (prefix: string, minimize: boolean) => void;
    /**
     * @callback getRandId_2
     * @memberof module:extensions/prototype~
     * @param {boolean} minimize
     */
    type getRandId_2 = (minimize: boolean) => void;
    /**
     * @typedef {object} windowSizeCache
     * @property {number} w
     * @property {number} h
     */
    type windowSizeCache = {
        w: number;
        h: number;
    };
    /**
     * @callback windowSizeActive
     * @property {boolean} refreshed
     * @returns {module:extensions/prototype~windowSizeCache}
     */
    type windowSizeActive = () => module;
    /**
     * @callback windowSize
     * @property {boolean} refreshed
     * @returns {module:extensions/prototype~windowSizeCache}
     */
    type windowSize = () => module;
    /**
     * @typedef {object} MousePositionCache
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
     * @param {MouseEvent} [eventMouseMove]
     * @param {object} [context]
     * @param {object} [context.window]
     * @param {object} [context.document]
     * @returns {module:extensions/prototype~MousePositionCache}
     */
    type MousePosition = (eventMouseMove?: MouseEvent, context?: {
        window?: any;
        document?: any;
    }) => module;
    /**
     * @callback ObjectExtend_1
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
     * @var {module:extensions/prototype.slDOM} slDOM
     * @memberof module:extensions/prototype
     */
    var slDOM: module;
    /**
     * @var {module:extensions/prototype.slDOM_env} slDOM_env
     * @memberof module:extensions/prototype
     */
    var slDOM_env: module;
    /**
     * @var {module:extensions/prototype.slDOM} _
     * @memberof module:extensions/prototype
     */
    var _: module;
    /**
     * @var {module:extensions/prototype.slDOMSet} __
     * @memberof module:extensions/prototype
     */
    var __: module;
    /**
     * @class
     * @name slDOMSet
     * @memberof module:extensions/prototype
     * @param {string} [cssSelector]
     */
    class slDOMSet {
        constructor(cssSelector?: string);
        /**
         * @method config
         * @memberof module:extensions/prototype.slDOMSet
         * @param {string} key
         * @param {any} value
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static config(key: string, value: any): module;
        /**
         * @method config
         * @memberof module:extensions/prototype.slDOMSet
         * @param {string} key
         * @param {any} value
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static config(key: string, value: any): module;
        /**
         * @method unique
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static unique(): module;
        /**
         * @method set
         * @memberof module:extensions/prototype.slDOMSet
         * @param {string} v css selector applied over document
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static set(v: string): module;
        /**
         * @method set
         * @memberof module:extensions/prototype.slDOMSet
         * @param {string} v css selector applied over document
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static set(v: string): module;
        /**
         * @method add
         * @memberof module:extensions/prototype.slDOMSet
         * @param {(NodeList|any)} ...v array of Nodes or HTMLElements
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static add(): module;
        /**
         * @method env
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {module:extensions/prototype.slDOM_env}
         */
        static env(): module;
        /**
         * @method get
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {(Node[])}
         */
        static get(): Node[];
        /**
         * @method get
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {(Node[])}
         */
        static get(): Node[];
        /**
         * @method eq
         * @memberof module:extensions/prototype.slDOMSet
         * @param {number} index
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static eq(index: number): module;
        /**
         * @method find
         * @memberof module:extensions/prototype.slDOMSet
         * @param {string} cssSelector
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static find(cssSelector: string): module;
        /**
         * @method filter
         * @memberof module:extensions/prototype.slDOMSet
         * @param {module:extensions/prototype.slDOMSet.itemHandlerFilter} filterCallback
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static filter(filterCallback: module): module;
        /**
         * @method each
         * @memberof module:extensions/prototype.slDOMSet
         * @param {module:extensions/prototype.slDOMSet.itemHandler} filterCallback
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static each(filterCallback: module): module;
        /**
         * @method map
         * @memberof module:extensions/prototype.slDOMSet
         * @param {module:extensions/prototype.slDOMSet.itemHandlerMap} filterCallback
         * @returns {module:extensions/prototype.slDOMSet}
         */
        static map(filterCallback: module): module;
        /**
         * @method attr
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
        /**
         * @method attr
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
        /**
         * @method attr
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
        /**
         * @method attr
         * @memberof module:extensions/prototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
    }
    /**
     * @var {module:extensions/prototype.slDOM_env} slDOM_env
     * @memberof module:extensions/prototype
     */
    var slDOM_env: module;
    /**
     * @var {module:extensions/prototype.slDOM} slDOM
     * @memberof module:extensions/prototype
     */
    var slDOM: module;
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
 * @module js-template
 * @returns {module:js-template.JSTemplateModule}
 */
declare module "js-template" {
    /**
     * @memberof module:js-template
     * @typedef {Object} JSTemplateModule
     * @property {module:js-template~nodeParser} parseContent
     * @property {object} config
     * @property {number} [config.RENDER_FPS=15]
     * @property {number} [config.REMOVE_EMPTY_NODES=true]
     */
    type JSTemplateModule = {
        parseContent: module;
        config: {
            RENDER_FPS?: number;
            REMOVE_EMPTY_NODES?: number;
        };
    };
    /**
     * @typedef {Object} jsTemplate_textResult
     * @property {string} [type='text']
     * @property {module:js-template~jsTemplate_textResultData} data
     */
    type jsTemplate_textResult = {
        type?: string;
        data: module;
    };
    /**
     * @typedef {Object} jsTemplate_textResultData
     * @property {Array<Text>} nodes
     * @property {Array<Text>} initialNodes
     * @property {String} code
     */
    type jsTemplate_textResultData = {
        nodes: Text[];
        initialNodes: Text[];
        code: string;
    };
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
    type parseTextNodesConfig = {
        args?: any;
        context?: any;
        start?: string;
        end?: string;
        textNodes?: module[];
        buffer?: Text[];
        opened?: boolean;
        __argsNames?: string[];
        __argsValues?: any[];
    };
    /**
     * Expression Builder
     * @param {string} code
     * @param {module:js-template~parseTextNodesConfig} config
     */
    function expressionBuilder(code: string, config: module): void;
    /**
     * @callback parseTextNodesCallback
     * @param {Error} err
     * @param {module:js-template~parseTextNodesConfig} config
     */
    type parseTextNodesCallback = (err: Error, config: module) => void;
    /**
     * @param {HTMLElement|Node|Text} textNode
     * @param {module:js-template.parseTextNodesCallback} cb
     * @param {module:js-template~parseTextNodesConfig} config
     */
    function parseTextNodes(textNode: HTMLElement | Node | Text, cb: module, config: module): void;
    /** @type {string}
     */
    var text: string;
    /**
     * @typedef {Object} jsTemplate_Attribute
     * @property {String} name
     * @property {String} value
     */
    type jsTemplate_Attribute = {
        name: string;
        value: string;
    };
    /**
     * @typedef {Object} jsTemplate_attrResultAttributeData
     * @property {String} name attribute name
     * @property {String} code executable code
     * @property {HTMLElement} node node element
     * @property {any} [buffer] ( technical property )
     * @property {Boolean} [inline=false] should be value be parsed
     * @property {Boolean} [postProcess=false] should be value be parsed
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
     * @property {('event'|'attribute'|'binding'|'macro')} type
     * @property {module:js-template~jsTemplate_Attribute} attr
     * @property {module:js-template~jsTemplate_attrResultAttributeData} data
     */
    type jsTemplate_attrResult = {
        type: 'event' | 'attribute' | 'binding' | 'macro';
        attr: module;
        data: module;
    };
    /**
     * @typedef {Object} jsTemplateAttrData
     * @property {Array<module:js-template~jsTemplate_attrResult>} nodes
     * @property {Array<module:js-template~jsTemplate_textResult>} texts
     * @property {Array<module:js-template~jsTemplateAttrData>} children
     * @property {Object<string,module:js-template~jsTemplate_attrResult>} _macro
     * @property {boolean} [HAS_POST_PROCESS=false]
     */
    type jsTemplateAttrData = {
        nodes: module[];
        texts: module[];
        children: module[];
        _macro: {
            [key: string]: module;
        };
        HAS_POST_PROCESS?: boolean;
    };
    /**
     * Parsing NodeElement Attribute
     * @param {module:js-template~jsTemplate_Attribute} attr
     * @returns {module:js-template~jsTemplate_attrResult}
     */
    function attrParser(attr: module): module;
    /** @var {HTMLInputElement} node
     */
    var node: HTMLInputElement;
    /** @var {HTMLInputElement} node
     */
    var node: HTMLInputElement;
    /** @var {HTMLInputElement} node
     */
    var node: HTMLInputElement;
    /**
     * @protected
     * @memberof module:js-template
     * @callback nodeParserCallback
     * @param {Error} err
     * @param {module:js-template~parseTextNodesConfig} config
     * @returns {module:js-template~parseTextNodesConfig}
     */
    type nodeParserCallback = (err: Error, config: module) => module;
    /**
     * @param {HTMLElement} nodeElement
     * @param {module:js-template.nodeParserCallback} cb
     * @param {module:js-template~parseTextNodesConfig} config
     * @returns {module:js-template~parseTextNodesConfig}
     */
    function nodeParser(nodeElement: HTMLElement, cb: module, config: module): module;
}

/**
 * Module used for retrieving date using XMLHttpRequest
 * @example
 * Application.require('request').then(function (request) {
 *	 request()
 *		 .url('/data.json')
 *		 .response('json')
 *		 .then(function (data) {
 *			 console.log(data);
 *		 }, console.error);
 * }, console.error);
 * @module request
 * @returns {RequestModuleConstructor}
 * @see module:request.RequestModule
 */
declare module "request" {
    /**
     * @memberof module:request
     * @class
     * @name RequestModule
     */
    class RequestModule {
        /**
         * @method config
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig}
         */
        config(): RequestModule.RequestConfig;
        /**
         * @method configurator
         * @memberof module:request.RequestModule#
         * @param {('multipart'|'blob'|'binary'|'POST'|'prepare-multipart'|'retrieve-blob'|'retrieve-binary-string'|'prepare-post'|'check-status-code'|'ignore-status-code')} template configuration name
         * @returns {RequestModule}
         */
        configurator(template: 'multipart' | 'blob' | 'binary' | 'POST' | 'prepare-multipart' | 'retrieve-blob' | 'retrieve-binary-string' | 'prepare-post' | 'check-status-code' | 'ignore-status-code'): RequestModule;
        /**
         * @method request
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest}
         */
        request(): XMLHttpRequest;
        /**
         * @method response
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.response}
         */
        response(): XMLHttpRequest.response;
        /**
         * @method response
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.response}
         */
        response(): XMLHttpRequest.response;
        /**
         * @method response
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.response}
         */
        response(): XMLHttpRequest.response;
        /**
         * @method response
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.response}
         */
        response(): XMLHttpRequest.response;
        /**
         * @method response
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.response}
         */
        response(): XMLHttpRequest.response;
        /**
         * @method response
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.response}
         */
        response(): XMLHttpRequest.response;
        /**
         * current XMLHttpRequest timeout in seconds
         * @method timeout
         * @memberof module:request.RequestModule#
         * @returns {number}
         */
        timeout(): number;
        /**
         * current XMLHttpRequest timeout in seconds
         * @method timeout
         * @memberof module:request.RequestModule#
         * @returns {number}
         */
        timeout(): number;
        /**
         * current XMLHttpRequest withCredentials status
         * @method withCredentials
         * @memberof module:request.RequestModule#
         * @returns {boolean}
         */
        withCredentials(): boolean;
        /**
         * current XMLHttpRequest withCredentials status
         * @method withCredentials
         * @memberof module:request.RequestModule#
         * @returns {boolean}
         */
        withCredentials(): boolean;
        /**
         * Client has been created. open() not called yet.
         * @alias module:request.RequestModule.READY_STATE_UNSENT
         * @type {number}
         * @default 0
         */
        static READY_STATE_UNSENT: number;
        /**
         * open() has been called.
         * @alias module:request.RequestModule.READY_STATE_OPENED
         * @type {number}
         * @default 1
         */
        static READY_STATE_OPENED: number;
        /**
         * send() has been called, and headers and status are available.
         * @alias module:request.RequestModule.READY_STATE_HEADERS_RECEIVED
         * @type {number}
         * @default 2
         */
        static READY_STATE_HEADERS_RECEIVED: number;
        /**
         * Downloading; responseText holds partial data.
         * @alias module:request.RequestModule.READY_STATE_LOADING
         * @type {number}
         * @default 3
         */
        static READY_STATE_LOADING: number;
        /**
         * Downloading is done
         * @alias module:request.RequestModule.READY_STATE_DONE
         * @type {number}
         * @default 4
         */
        static READY_STATE_DONE: number;
        /**
         * @method readyState
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.readyStateType}
         */
        readyState(): RequestModule.readyStateType;
        /**
         * @method status
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.status}
         */
        status(): XMLHttpRequest.status;
        /**
         * @method statusText
         * @memberof module:request.RequestModule#
         * @returns {XMLHttpRequest.statusText}
         */
        statusText(): XMLHttpRequest.statusText;
        /**
         * @method async
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig.async}
         * @see module:request.RequestModule.RequestConfig
         */
        async(): RequestModule.RequestConfig.async;
        /**
         * @method async
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig.async}
         * @see module:request.RequestModule.RequestConfig
         */
        async(): RequestModule.RequestConfig.async;
        /**
         * @method method
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig.method}
         * @see module:request.RequestModule.RequestConfig
         */
        method(): RequestModule.RequestConfig.method;
        /**
         * @method method
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig.method}
         * @see module:request.RequestModule.RequestConfig
         */
        method(): RequestModule.RequestConfig.method;
        /**
         * @method url
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig.url}
         * @see module:request.RequestModule.RequestConfig
         */
        url(): RequestModule.RequestConfig.url;
        /**
         * @method url
         * @memberof module:request.RequestModule#
         * @returns {RequestModule.RequestConfig.url}
         * @see module:request.RequestModule.RequestConfig
         */
        url(): RequestModule.RequestConfig.url;
        /**
         * @method open
         * @memberof module:request.RequestModule#
         * @param {string} [method="GET"]
         * @param {string} [url]
         * @param {boolean} [async]
         * @param {number} [timeout] request timeout in seconds
         * @returns {RequestModule}
         */
        open(method?: string, url?: string, async?: boolean, timeout?: number): RequestModule;
        /**
         * @method send
         * @memberof module:request.RequestModule#
         * @param {string|FormData|MediaStream} [data='']
         * @param {("asFormData"|"json")} [type=null]
         * @returns {RequestModule}
         */
        send(data?: string | FormData | MediaStream, type?: "asFormData" | "json"): RequestModule;
        /**
         * @method headers
         * @memberof module:request.RequestModule#
         * @returns {string}
         */
        headers(): string;
        /**
         * @method headers
         * @memberof module:request.RequestModule#
         * @returns {string}
         */
        headers(): string;
    }
    /**
     * @memberof module:request
     * @callback RequestModuleConstructor
     * @returns {RequestModule}
     */
    type RequestModuleConstructor = () => RequestModule;
}

declare namespace request {
    namespace RequestModule {
        /**
         * @typedef {Object} module:request.RequestModule.RequestConfig
         * @inner
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
         * @typedef {object} module:request.RequestModule.readyStateType
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
}

/** @module uri-load
 */
declare module "uri-load" {
    /**
     * loadScript - is a function for adding scripts into the header
     * @alias module:uri-load.script
     * @param  {string|string[]}   url      url/urls of scripts
     * @param  {Function} callback [description]
     * @param  {object}   opts     settings with info related to the script tags
     */
    function script(url: string | string[], callback: (...params: any[]) => any, opts: any): void;
    /**
     * loadLink - is a function for adding link tags into the header
     * @alias module:uri-load.link
     * @param  {string|string[]}   url      url/urls of link tags
     * @param  {Function} callback [description]
     * @param  {object}   opts     settings with info related to the link tags
     */
    function link(url: string | string[], callback: (...params: any[]) => any, opts: any): void;
}

/**
 * @module ApplicationPrototype
 */
declare module "ApplicationPrototype" {
    /**
     * @class
     * @name Instance
     * @memberof module:ApplicationPrototype
     */
    class Instance {
        /**
         * returns listener Id
         * @method on
         * @memberof module:ApplicationPrototype.Instance
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} specifiedEventId event name of function with name
         * @returns {string}
         */
        static on(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId: string): string;
        /**
         * returns listener Id
         * @method once
         * @memberof module:ApplicationPrototype.Instance
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} specifiedEventId event name of function with name
         * @returns {string}
         */
        static once(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId: string): string;
        /**
         * returns listener Id
         * @method bind
         * @memberof module:ApplicationPrototype.Instance
         * @param {string|function} event event name of function with name
         * @param {function|module:ApplicationPrototype.Instance.BindListenerConfig} [callback] function that will listen data
         * @param {module:ApplicationPrototype.Instance.BindListenerConfig|string} [listenersConfig] of lis event name of function with name
         * @returns {string}
         */
        static bind(event: string | ((...params: any[]) => any), callback?: ((...params: any[]) => any) | module, listenersConfig?: module | string): string;
        /**
         * remove all event listeners
         * @method off
         * @memberof module:ApplicationPrototype.Instance
         * @param {string} event event or events names separated by comma
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {boolean}
         */
        static off(event: string, specifiedEventId?: string): boolean;
        /**
         * returns listener Id
         * @method crudEvents
         * @memberof module:ApplicationPrototype.Instance
         * @param {Object<any>} context will be used as a base for ApplicationPrototype instance that will be returned
         * @param {Object<Function>} publicMethods list of public methods available from returned instance
         * @param {Object<Function>} privateMethods list of private methods available only for instance's methods
         * @returns {module:ApplicationPrototype.Instance}
         */
        static crudEvents(context: {
            [key: string]: any;
        }, publicMethods: {
            [key: string]: any;
        }, privateMethods: {
            [key: string]: any;
        }): module;
        /**
         * @method property
         * @memberof module:ApplicationPrototype.Instance
         * @param {string} propertyName
         * @param {module:ApplicationPrototype.Instance.PropertyHandler} getter
         * @param {module:ApplicationPrototype.Instance.PropertyHandler} [setter]
         * @param {object} [config]
         * @param {boolean} [config.configurable=true]
         * @param {boolean} [config.enumerable=true]
         * @fires module:ApplicationPrototype.Instance.__onSet
         * @fires module:ApplicationPrototype.Instance.__onGet
         * @fires module:ApplicationPrototype.Instance.__afterGet
         * @fires module:ApplicationPrototype.Instance.__afterGet
         * @fires module:ApplicationPrototype.Instance.__onSet::propName
         * @fires module:ApplicationPrototype.Instance.__onGet::propName
         * @fires module:ApplicationPrototype.Instance.__afterGet::propName
         * @fires module:ApplicationPrototype.Instance.__afterGet::propName
         */
        static property(propertyName: string, getter: module, setter?: module, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
        /**
         * @method property
         * @memberof module:ApplicationPrototype.Instance
         * @param {string} propertyName
         * @param {module:ApplicationPrototype.Instance.PropertyHandler} getter
         * @param {module:ApplicationPrototype.Instance.PropertyHandler} [setter]
         * @param {object} [config]
         * @param {boolean} [config.configurable=true]
         * @param {boolean} [config.enumerable=true]
         * @fires module:ApplicationPrototype.Instance.__onSet
         * @fires module:ApplicationPrototype.Instance.__onGet
         * @fires module:ApplicationPrototype.Instance.__afterGet
         * @fires module:ApplicationPrototype.Instance.__afterGet
         * @fires module:ApplicationPrototype.Instance.__onSet::propName
         * @fires module:ApplicationPrototype.Instance.__onGet::propName
         * @fires module:ApplicationPrototype.Instance.__afterGet::propName
         * @fires module:ApplicationPrototype.Instance.__afterGet::propName
         */
        static property(propertyName: string, getter: module, setter?: module, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
    }
    /**
     * @class
     * @name Builder
     * @memberof module:ApplicationPrototype
     * @augments module:ApplicationPrototype.Instance
     */
    class Builder extends module:ApplicationPrototype.Instance {
        /**
         * @method require
         * @memberof module:ApplicationPrototype.Builder
         * @param {string|string[]} events List of Events Names or Array of Events Mapping like [ "uriLoad :: uri-load", "ePrototype :: extensions/prototype" ]
         * @param {function} [callback] Callback that will receive Module
         * @returns {PromiseLike<any>}
         */
        static require(events: string | string[], callback?: (...params: any[]) => any): PromiseLike<any>;
        /**
         * @method isNode
         * @memberof module:ApplicationPrototype.Builder
         * @returns {boolean}
         */
        static isNode(): boolean;
        /**
         * @method isBrowser
         * @memberof module:ApplicationPrototype.Builder
         * @returns {boolean}
         */
        static isBrowser(): boolean;
        /**
         * @method debugEnabled
         * @memberof module:ApplicationPrototype.Builder
         * @param {boolean} [status]
         * @returns {boolean}
         */
        static debugEnabled(status?: boolean): boolean;
        /**
         * @method runModulesInFiles
         * @memberof module:ApplicationPrototype.Builder
         * @param {boolean} [status]
         * @returns {boolean}
         */
        static runModulesInFiles(status?: boolean): boolean;
        /**
         * @method consoleOptions
         * @memberof module:ApplicationPrototype.Builder
         * @param {module:ApplicationPrototype.Builder.ConsoleOptions} [options]
         * @returns {module:ApplicationPrototype.Builder.ConsoleOptions}
         */
        static consoleOptions(options?: module): module;
        /**
         * @method moduleRegister
         * @memberof module:ApplicationPrototype.Builder
         * @param {string} path path that will be used as `Application.modulePath()`
         * @param {string[]} modules list of modules names that should be registered
         * @returns {module:ApplicationPrototype.Builder.ModuleStore}
         */
        static moduleRegister(path: string, modules: string[]): module;
    }
    /**
     * @method modulePath
     * @param {string} [path]
     * @returns {string}
     */
    function modulePath(path?: string): string;
    /**
     * returns interface for accessing Node Env, is defined only in node env
     * @var NodeInterface
     * @type {object}
     * @property {function():NodeJS.Process} process
     * @property {function():NodeJS.Global} global
     * @property {function():NodeRequire} require
     * @property {function(string):any} globalReference returns NodeJS require reference by it's name
     */
    var NodeInterface: {
        process: (...params: any[]) => any;
        global: (...params: any[]) => any;
        require: (...params: any[]) => any;
        globalReference: (...params: any[]) => any;
    };
    /**
     * @callback ApplicationPrototypeConstructor
     * @returns {module:ApplicationPrototype.Instance}
     */
    type ApplicationPrototypeConstructor = () => module;
    /**
     * @callback ApplicationBuilderConstructor
     * @returns {module:ApplicationPrototype.Builder}
     */
    type ApplicationBuilderConstructor = () => module;
    /**
     * @typedef {String} ModuleResourceUrl
     * @description resources url is composed from `module's plath` + `resource path`
     */
    type ModuleResourceUrl = string;
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
    type ApplicationModule = {
        $request: PromiseLike;
        exports: (...params: any[]) => any;
        atime: number;
        Application: (...params: any[]) => any;
        cache: (...params: any[]) => any;
        require: (...params: any[]) => any;
        resourceUrl: (...params: any[]) => any;
        meta: ApplicationModuleMeta;
    };
    /**
     * @typedef ApplicationBuilderExports
     * @property {ApplicationPrototypeConstructor} application
     * @property {ApplicationBuilderConstructor} builder
     */
    type ApplicationBuilderExports = {
        application: ApplicationPrototypeConstructor;
        builder: ApplicationBuilderConstructor;
    };
}

declare namespace ApplicationPrototype {
    namespace Instance {
        /**
         * @typedef {object} BindListenerConfig - configuration for bind listeners
         * @memberof module:ApplicationPrototype.Instance
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
         * @memberof module:ApplicationPrototype.Instance
         * @param {any} value is undefined when `isSetter = true`
         * @param {any} lastValue
         * @param {boolean} isSetter
         */
        type PropertyHandler = (value: any, lastValue: any, isSetter: boolean) => void;
    }
    namespace Builder {
        /**
         * @class
         * @name Promise
         * @memberof module:ApplicationPrototype.Builder
         * @param {function} handler
         * @returns {PromiseLike}
         */
        class Promise {
            constructor(handler: (...params: any[]) => any);
            /**
             * @method all
             * @memberof module:ApplicationPrototype.Builder.Promise
             * @param {Promise[]} items
             * @returns {PromiseLike}
             */
            static all(items: Promise[]): PromiseLike;
            /**
             * @method race
             * @memberof module:ApplicationPrototype.Builder.Promise
             * @param {Promise[]} items
             * @returns {PromiseLike}
             */
            static race(items: Promise[]): PromiseLike;
            /**
             * @method resolve
             * @memberof module:ApplicationPrototype.Builder.Promise
             * @param {any} value
             * @returns {PromiseLike}
             */
            static resolve(value: any): PromiseLike;
            /**
             * @method reject
             * @memberof module:ApplicationPrototype.Builder.Promise
             * @param {any} value
             * @returns {PromiseLike}
             */
            static reject(value: any): PromiseLike;
        }
        /**
         * @typedef {object} ConsoleOptions
         * @memberof module:ApplicationPrototype.Builder
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
         * @memberof module:ApplicationPrototype.Builder
         * @description modules store where are indexed modules
         */
        type ModuleStore = any;
        /**
         * @typedef {object} ModuleMeta
         * @memberof module:ApplicationPrototype.Builder
         * @property {module:ApplicationPrototype.Builder.ModuleStore} store same as `module.cache()`
         * @property {PromiseLike<string>} $requestQuery XMLHttpRequest used for obtaining Module's Content
         * @property {string} module_path module's path
         * @property {string} path module's internal path used as identifier of module
         * @property {string} name module's name
         * @property {string} __dirname module's dirname
         */
        type ModuleMeta = {
            store: module;
            $requestQuery: PromiseLike<string>;
            module_path: string;
            path: string;
            name: string;
            __dirname: string;
        };
        /**
         * @callback moduleResolve
         * @memberof module:ApplicationPrototype.Builder
         * @param {string} module module name
         * @param {string} [path] module path
         * @returns {module:ApplicationPrototype.Builder.ModuleMeta}
         */
        type moduleResolve = (module: string, path?: string) => module;
    }
}

declare namespace extensions/prototype {
    namespace slDOMSet {
        /**
         * @callback itemHandler
         * @memberof module:extensions/prototype.slDOMSet
         * @param {Node} node
         * @param {number} index
         * @param {module:extensions/prototype.slDOMSet} context
         * @param {module:extensions/prototype.slDOM} p
         */
        type itemHandler = (node: Node, index: number, context: module, p: module) => void;
        /**
         * @callback itemHandlerFilter
         * @memberof module:extensions/prototype.slDOMSet
         * @param {Node} node
         * @param {number} index
         * @param {module:extensions/prototype.slDOMSet} context
         * @param {module:extensions/prototype.slDOM} p
         * @returns {boolean}
         */
        type itemHandlerFilter = (node: Node, index: number, context: module, p: module) => boolean;
        /**
         * @callback itemHandlerMap
         * @memberof module:extensions/prototype.slDOMSet
         * @param {Node} node
         * @param {number} index
         * @param {module:extensions/prototype.slDOMSet} context
         * @param {module:extensions/prototype.slDOM} p
         * @returns {Node}
         */
        type itemHandlerMap = (node: Node, index: number, context: module, p: module) => Node;
    }
}

