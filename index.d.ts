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
     * @memberof module:async
     * @callback AsyncConstructor
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
 * @callback ApplicationBuilderRequire
 * @param {string | Array<string>} events List of Events Names or Array of Events Mapping like [ "uriLoad :: uri-load", "ePrototype :: extensions/prototype" ]
 * @param {Function} [callback] Callback that will receive Module
 * @returns {PromiseLike<any>}
 */
declare type ApplicationBuilderRequire = (events: string | string[], callback?: (...params: any[]) => any) => PromiseLike<any>;

/**
 * @typedef {object} BindListenerConfig - configuration for binded listeners
 * @property {Boolean} [listenedBefore=true] allow listners before method call
 * @property {Boolean} [listenedOn=true] allow listners on method call ( is after )
 * @property {Boolean} [listenedAfter=true] allow listners after method call ( is after small delay )
 * @property {Boolean} [allowInterruption=true]
 */
declare type BindListenerConfig = {
    listenedBefore?: boolean;
    listenedOn?: boolean;
    listenedAfter?: boolean;
    allowInterruption?: boolean;
};

/** @callback ApplicationPrototypeListener returns listner Id
 * @param {String | Function} event event name of function with name
 * @param {Function} [callback] function that will listen data
 * @param {String} specifiedEventId event name of function with name
 * @returns {String}
 */
declare type ApplicationPrototypeListener = (event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId: string) => string;

/** @callback ApplicationPrototypeBind returns listner Id
 * @param {String | Function} event event name of function with name
 * @param {Function | BindListenerConfig} [callback] function that will listen data
 * @param {BindListenerConfig} [listenersConfig] of lis event name of function with name
 * @returns {String}
 */
declare type ApplicationPrototypeBind = (event: string | ((...params: any[]) => any), callback?: ((...params: any[]) => any) | BindListenerConfig, listenersConfig?: BindListenerConfig) => string;

/** @callback ApplicationPrototypeListenerRemove returns listner Id
 * @param {String} event event or events names sepparated by comma
 * @param {String} specifiedEventId event name of function with name
 * @returns {String}
 */
declare type ApplicationPrototypeListenerRemove = (event: string, specifiedEventId: string) => string;

/**
 * @callback ApplicationPrototypeCrudEvents returns listner Id
 * @param {Object<any>} context will be used as a base for ApplicationPrototype instance that will be returned
 * @param {Object<Function>} publicMethods list of public methods avaiable from returned instance
 * @param {Object<Function>} privateMethods list of private methods available only for instance's methods
 * @returns {ApplicationPrototypeInstance}
 */
declare type ApplicationPrototypeCrudEvents = (context: {
    [key: string]: any;
}, publicMethods: {
    [key: string]: any;
}, privateMethods: {
    [key: string]: any;
}) => ApplicationPrototypeInstance;

/**
 * @typedef {object} ApplicationPrototypeInstance - configuration for binded listeners
 * @property {ApplicationPrototypeBind} bind - attach a new Method
 * @property {ApplicationPrototypeListener} on - listen an event
 * @property {ApplicationPrototypeListener} once - listen an event once
 * @property {ApplicationPrototypeListenerRemove} off - listen an event
 * @property {ApplicationPrototypeCrudEvents} crudEvents - listen an event once
 */
declare type ApplicationPrototypeInstance = {
    bind: ApplicationPrototypeBind;
    on: ApplicationPrototypeListener;
    once: ApplicationPrototypeListener;
    off: ApplicationPrototypeListenerRemove;
    crudEvents: ApplicationPrototypeCrudEvents;
};

/**
 * @typedef {Object} ApplicationConsoleOptions
 * @property {Boolean} [file] enable/disable showing filename in console log. default value is `true`
 * @property {Boolean} [contextName] enable/disable showing context Execution info in console log. default value is `true`
 * @property {Boolean} [timestamp] enable/disable showing current timestamp in console log. default value is `true`
 * @property {Boolean} [logType] enable/disable showing log type in console log. default value is `true
 */
declare type ApplicationConsoleOptions = {
    file?: boolean;
    contextName?: boolean;
    timestamp?: boolean;
    logType?: boolean;
};

/**
 * @typedef {Object} ApplicationModuleStore
 * @description modules store where are indexed modules
 */
declare type ApplicationModuleStore = any;

/**
 * @callback ApplicationModuleRegister
 * @param {String} path path that will be used as `Application.modulePath()`
 * @param {String[]} modules list of modules names that should be registered
 * @returns {ApplicationModuleStore}
 */
declare type ApplicationModuleRegister = (path: string, modules: String[]) => ApplicationModuleStore;

/**
 * @typedef {Object} ApplicationModuleMeta
 * @property {ApplicationModuleStore} store same as `module.cache()`
 * @property {PromiseLike<String>} $requestQuery XMLHttpRequest used for obtaining Module's Content
 * @property {String} module_path module's path
 * @property {String} path module's internal path used as identifier of module
 * @property {String} name module's name
 * @property {String} __dirname module's dirname
 */
declare type ApplicationModuleMeta = {
    store: ApplicationModuleStore;
    $requestQuery: PromiseLike<String>;
    module_path: string;
    path: string;
    name: string;
    __dirname: string;
};

/**
 * @callback ApplicationModuleResolve
 * @param {String} module module name
 * @param {String} [path] module path
 * @returns {ApplicationModuleMeta}
 */
declare type ApplicationModuleResolve = (module: string, path?: string) => ApplicationModuleMeta;

/**
 * @typedef {Object} ApplicationNodeInterface
 * @property {function():NodeJS.Process} process
 * @property {function():NodeJS.Global} global
 * @property {function():NodeRequire} require
 * @property {function(string):any} globalReference returns NodeJS require reference by it's name
 */
declare type ApplicationNodeInterface = {
    process: (...params: any[]) => any;
    global: (...params: any[]) => any;
    require: (...params: any[]) => any;
    globalReference: (...params: any[]) => any;
};

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
declare type ApplicationBuilderInstance = {
    bind: ApplicationPrototypeBind;
    on: ApplicationPrototypeListener;
    once: ApplicationPrototypeListener;
    off: ApplicationPrototypeListenerRemove;
    crudEvents: ApplicationPrototypeCrudEvents;
    require: ApplicationBuilderRequire;
    Promise: {
        all: (...params: any[]) => any;
        race: (...params: any[]) => any;
        resolve: (...params: any[]) => any;
        reject: (...params: any[]) => any;
    };
    isNode: (...params: any[]) => any;
    isBrowser: (...params: any[]) => any;
    runModulesInFiles: (...params: any[]) => any;
    debugEnabled: (...params: any[]) => any;
    consoleOptions: (...params: any[]) => any;
    modulePath: (...params: any[]) => any;
    moduleRegister: ApplicationModuleRegister;
    moduleResolve: ApplicationModuleResolve;
    NodeInterface: ApplicationNodeInterface;
};

/**
 * @callback ApplicationPrototypeConstructor
 * @returns {ApplicationPrototypeInstance}
 */
declare type ApplicationPrototypeConstructor = () => ApplicationPrototypeInstance;

/**
 * @callback ApplicationBuilderConstructor
 * @returns {ApplicationBuilderInstance}
 */
declare type ApplicationBuilderConstructor = () => ApplicationBuilderInstance;

/** @typedef {ApplicationPrototype_slDOM} slDOM
 */
declare type slDOM = ApplicationPrototype_slDOM;

/** @typedef {ApplicationPrototype_slDOM_env} slDOM_env
 */
declare type slDOM_env = ApplicationPrototype_slDOM_env;

/**
 * @typedef ApplicationPrototype_slDOM_env
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
declare type ApplicationPrototype_slDOM_env = {
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
 * @typedef {object} ApplicationPrototype_slDOM returns a pointer that walks over DOM and applying needed operations
 * @property {ApplicationPrototype_slDOM_env} env Environment Flags
 * @property {function (Boolean): HTMLElement} __ if params is `true` then return document otherwise current HTMLElement
 * @property {function(Object): ApplicationPrototype_slDOM} a2D apply Css Transforms on elements
 * @property {function(number): ApplicationPrototype_slDOM} opacity ( short form **o** ) change element opacity
 * @property {function((HTMLElement|string)): ApplicationPrototype_slDOM} setE ( short form **e** ) set a HTMLElement or Create Element for slDOM Pointer
 * @property {function((string|string[]), String?, number?): ApplicationPrototype_slDOM | Boolean} sClass =slDOMlib.sClass;
 * @property {function(...string): ApplicationPrototype_slDOM()} setArg ( short form **A** ) set Attributes to HTMLElement, arguments order: `[ attribute, value, attribute, value ... ]`
 * @property {function(HTMLElement): ApplicationPrototype_slDOM} adEto add current HTMLElement to other HTMLElement;
 * @property {function(HTMLElement): ApplicationPrototype_slDOM} putBfto insert current HTMLElement before other HTMLElement
 * @property {function(HTMLElement): ApplicationPrototype_slDOM} putAfto insert current HTMLElement after other HTMLElement
 * @property {function((HTMLElement | string), string?, function?): ApplicationPrototype_slDOM} putBf =slDOMlib.putBf;
 * @property {function(HTMLElement): ApplicationPrototype_slDOM} putAf =slDOMlib.putAf;
 * @property {function((HTMLElement | string), string?, function?): ApplicationPrototype_slDOM} addE =slDOMlib.addE;
 * @property {function((HTMLElement | string), string?, function?): ApplicationPrototype_slDOM} addB =slDOMlib.addB;
 * @property {function(string): ApplicationPrototype_slDOM} addT ( short form **t** ) add text node to HTMLElement;
 * @property {function(number): ApplicationPrototype_slDOM} [nextTo=1] ( short form **N** ) moving pointer forward to N neighbors
 * @property {function(number): ApplicationPrototype_slDOM} [backTo=1] ( short form **B** ) moving pointer backward to N neighbors
 * @property {function(number?): ApplicationPrototype_slDOM} nUP ( short form is U ) goes up on level in doom
 * @property {function(number?): ApplicationPrototype_slDOM} nChild ( short form is **C** ) select the *N th* child element
 * @property {function(number?): ApplicationPrototype_slDOM} getParentN ( short form is **P** ) select the *N th* parent element
 * @property {function(): ApplicationPrototype_slDOM} clearE ( short form is **d** ) remove all childObjects from node
 * @property {function(): ApplicationPrototype_slDOM} delE remove HTMLElement from its Parent
 * @property {function(Boolean): ApplicationPrototype_slDOM} copyE =slDOMlib.copyE;
 * @property {function(String): ApplicationPrototype_slDOM} getParentTag =slDOMlib.getParentTag;
 * @property {function(String, number, Boolean, Boolean): ApplicationPrototype_slDOM} getByTag =slDOMlib.getByTag;
 * @property {function(String, number, Boolean, Boolean): ApplicationPrototype_slDOM} getByQuery =slDOMlib.getByQuery;
 * @property {function(String): ApplicationPrototype_slDOM} getById =slDOMlib.getById;
 * @property {function(String, Boolean): Array<HTMLElement>} getTags =slDOMlib.getTags;
 * @property {function(String, Boolean): Array<HTMLElement>} getTagsByQuery =slDOMlib.getTagsByQuery;
 * @property {function(String): ApplicationPrototype_slDOM} triger ( short form **T** ) trigger / emit an event on HTMLElement
 * @property {function(String?): ApplicationPrototype_slDOM | HTMLElement | String} getE ( short form **_** ) return HTMLElement ;
 * * if argument[0] is ".tag" return HTMLElement's tagname ;
 * * if argument[0] is ".html" return HTML Content ;
 * * if argument[0] is ".text" return Text Content ;
 * * if argument[0] is "-attributeName" return HTMLElement's Attribute ;
 * * if argument[0] is "!attributeName" remove HTMLElement's Attribute
 * @property {function(slDOM.ObjectCSSProperties): ApplicationPrototype_slDOM} setStyle ( short form **f** ) setting css proprieties to HTMLElement
 * @property {function((slDOM.ObjectAttributes | String[])): ApplicationPrototype_slDOM} setVar ( short form **V** ) set dot property on HTMLElement
 * @property {function(...slDOM.ObjectAttributes): ApplicationPrototype_slDOM} setObjVar ( short form **v** ) setting attributes to HTMLElement
 * @property {function(slDOM.ObjectCSSProperties): ApplicationPrototype_slDOM} setStyleSPEED ( short form **F** ) setting css proprieties to HTMLElement with normalizing values by adding units
 * @property {function(): { x: number, y: number }} pagePXY ( short form **PXY** ) get element position on page
 * @property {function(): Boolean} in_e check if HTMLElement is still attached to DOM ( Document Object Manager )
 * @property {function(): { w: number, h: number }} g_wh returns width and height of HTMLElement
 * @property {function((Object | String), Boolean, Function, Object): ApplicationPrototype_slDOM} getLIST =slDOMlib.getLIST;
 * @property {function(function(HTMLElement, Object, ApplicationPrototype_slDOM), Object): ApplicationPrototype_slDOM} toFunction =slDOMlib.toFunction;
 * @property {function(): ApplicationPrototype_slDOM} removeFromDOM ( short form **free** ) remove elements from DOM
 * @property {function(number): ApplicationPrototype_slDOM} o ( short form **opacity** ) change element opacity
 * @property {function((HTMLElement | String)): ApplicationPrototype_slDOM} E ( long form **setE** ) set a HTMLElement or Create Element for slDOM Pointer
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
 * @property {function(): ApplicationPrototype_slDOM} free 	= slDOMlib.removeFromDOM;
 * @property {function(): Boolean} is_free 	= slDOMlib.is_free;
 * @property {function(): Boolean} is_focused 	= slDOMlib.is_focused;
 * @property {function(): Boolean} is_inview 	= slDOMlib.elementInViewport;
 * @property {function(): Boolean} is_visible 	= slDOMlib.elementIsVisible;
 * @property {*} _normalizeCssValues 	= slDOMlib._normalizeCssValues;
 * @property {*} on 	= slDOMlib.on;
 * @property {*} off 	= slDOMlib.off;
 * @property {function(): Object} eventsCache 	= slDOMlib.eventsCache;
 */
declare type ApplicationPrototype_slDOM = {
    env: ApplicationPrototype_slDOM_env;
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
    p: any;
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

/**
 * @typedef {String} ModuleResourceUrl
 * @description resources url is composed from `module's plath` + `resource path`
 */
declare type ModuleResourceUrl = string;

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
declare type ApplicationModule = {
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
declare type ApplicationBuilderExports = {
    application: ApplicationPrototypeConstructor;
    builder: ApplicationBuilderConstructor;
};

