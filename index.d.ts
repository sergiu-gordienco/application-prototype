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
 * @typedef {Object} jsTemplate_textResult
 * @property {string} [type='text']
 * @property {jsTemplate_textResultData} data
 */
declare type jsTemplate_textResult = {
    type?: string;
    data: jsTemplate_textResultData;
};

/**
 * @typedef {Object} jsTemplate_textResultData
 * @property {Array<Text>} nodes
 * @property {Array<Text>} initialNodes
 * @property {String} code
 */
declare type jsTemplate_textResultData = {
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
 * @property {Array<jsTemplate_textResult>} [textNodes] array of TextNodes
 * @property {Array<Text>} [buffer] (technical property) buffer
 * @property {boolean} [opened=false] (technical property)
 * @property {Array<string>} [__argsNames] (technical property)
 * @property {Array<any>} [__argsValues] (technical property)
 */
declare type parseTextNodesConfig = {
    args?: any;
    context?: any;
    start?: string;
    end?: string;
    textNodes?: jsTemplate_textResult[];
    buffer?: Text[];
    opened?: boolean;
    __argsNames?: string[];
    __argsValues?: any[];
};

/**
 *
 * @param {Array<Text>} bf
 * @param {parseTextNodesConfig} config
 * @returns {jsTemplate_textResult}
 */
declare function textParser(bf: Text[], config: parseTextNodesConfig): jsTemplate_textResult;

/**
 * @param {HTMLElement|Node|Text} textNode
 * @param {function (Error, parseTextNodesConfig): void} cb
 * @param {parseTextNodesConfig} config
 */
declare function parseTextNodes(textNode: HTMLElement | Node | Text, cb: (...params: any[]) => any, config: parseTextNodesConfig): void;

/**
 * @typedef {Object} jsTemplate_Attribute
 * @property {String} name
 * @property {String} value
 */
declare type jsTemplate_Attribute = {
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
declare type jsTemplate_attrResultAttributeData = {
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
 * @property {jsTemplate_Attribute} attr
 * @property {jsTemplate_attrResultAttributeData} data
 */
declare type jsTemplate_attrResult = {
    type: 'event' | 'attribute' | 'binding' | 'macro';
    attr: jsTemplate_Attribute;
    data: jsTemplate_attrResultAttributeData;
};

/**
 * @typedef {Object} jsTemplateAttrData
 * @property {Array<jsTemplate_attrResult>} nodes
 * @property {Array<jsTemplate_textResult>} texts
 * @property {Array<jsTemplateAttrData>} children
 * @property {Object<string,jsTemplate_attrResult>} _macro
 * @property {boolean} [HAS_POST_PROCESS=false]
 */
declare type jsTemplateAttrData = {
    nodes: jsTemplate_attrResult[];
    texts: jsTemplate_textResult[];
    children: jsTemplateAttrData[];
    _macro: {
        [key: string]: jsTemplate_attrResult;
    };
    HAS_POST_PROCESS?: boolean;
};

/**
 * Parsing NodeElement Attribute
 * @param {jsTemplate_Attribute} attr
 *
 * @returns {jsTemplate_attrResult}
 */
declare function attrParser(attr: jsTemplate_Attribute): jsTemplate_attrResult;

/**
 * @class
 * @name RequestModule
 */
declare class RequestModule {
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
     * @returns {XMLHttpRequest.response}
     */
    response(): XMLHttpRequest.response;
    /**
     * @method response
     * @memberof RequestModule#
     * @returns {XMLHttpRequest.response}
     */
    response(): XMLHttpRequest.response;
    /**
     * @method response
     * @memberof RequestModule#
     * @returns {XMLHttpRequest.response}
     */
    response(): XMLHttpRequest.response;
    /**
     * @method response
     * @memberof RequestModule#
     * @returns {XMLHttpRequest.response}
     */
    response(): XMLHttpRequest.response;
    /**
     * @method response
     * @memberof RequestModule#
     * @returns {XMLHttpRequest.response}
     */
    response(): XMLHttpRequest.response;
    /**
     * @method response
     * @memberof RequestModule#
     * @returns {XMLHttpRequest.response}
     */
    response(): XMLHttpRequest.response;
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
     * @returns {XMLHttpRequest.status}
     */
    status(): XMLHttpRequest.status;
    /**
     * @method statusText
     * @memberof RequestModule#
     * @returns {XMLHttpRequest.statusText}
     */
    statusText(): XMLHttpRequest.statusText;
    /**
     * @method async
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig.async}
     * @see RequestModule.RequestConfig
     */
    async(): RequestModule.RequestConfig.async;
    /**
     * @method async
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig.async}
     * @see RequestModule.RequestConfig
     */
    async(): RequestModule.RequestConfig.async;
    /**
     * @method method
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig.method}
     * @see RequestModule.RequestConfig
     */
    method(): RequestModule.RequestConfig.method;
    /**
     * @method method
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig.method}
     * @see RequestModule.RequestConfig
     */
    method(): RequestModule.RequestConfig.method;
    /**
     * @method url
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig.url}
     * @see RequestModule.RequestConfig
     */
    url(): RequestModule.RequestConfig.url;
    /**
     * @method url
     * @memberof RequestModule#
     * @returns {RequestModule.RequestConfig.url}
     * @see RequestModule.RequestConfig
     */
    url(): RequestModule.RequestConfig.url;
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
     * @param {("asFormData"|"json")} [type=null]
     * @returns {RequestModule}
     */
    send(data?: string | FormData | MediaStream, type?: "asFormData" | "json"): RequestModule;
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
 * @augments RequestModule
 */
declare module "request" { }

declare namespace RequestModule {
    /**
     * @typedef {Object} RequestModule.RequestConfig
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

/**
 * loadScript - is a function for adding scripts into the header
 * @param  {string|string[]}   url      url/urls of scripts
 * @param  {Function} callback [description]
 * @param  {object}   opts     settings with info related to the script tags
 */
declare function loadScript(url: string | string[], callback: (...params: any[]) => any, opts: any): void;

/**
 * loadLink - is a function for adding link tags into the header
 * @param  {string|string[]}   url      url/urls of link tags
 * @param  {Function} callback [description]
 * @param  {object}   opts     settings with info related to the link tags
 */
declare function loadLink(url: string | string[], callback: (...params: any[]) => any, opts: any): void;

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
 * @property {Boolean} [allowInteruption=true]
 */
declare type BindListenerConfig = {
    listenedBefore?: boolean;
    listenedOn?: boolean;
    listenedAfter?: boolean;
    allowInteruption?: boolean;
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

/** @typedef {function (): ApplicationPrototypeInstance} ApplicationPrototypeConstructor
 */
declare type ApplicationPrototypeConstructor = () => void;

/** @typedef {function (): ApplicationBuilderInstance} ApplicationBuilderConstructor
 */
declare type ApplicationBuilderConstructor = () => void;

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

