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
         * @typedef {Array} Operation
         * @memberof async.Async
         * @property {async.Async.OperationCallback} 0
         * @property {async.Async.OperationArgs} 1
         * @property {async.Async.OperationContext} 2
         * @property {async.Async.OperationCallbackIndex} 3
         */
        type Operation = any[];
        /**
         * @typedef {Array} Operation
         * @memberof async.Async
         * @property {async.Async.OperationCallback} 0
         * @property {async.Async.OperationArgs} 1
         * @property {async.Async.OperationContext} 2
         * @property {async.Async.OperationCallbackIndex} 3
         */
        type Operation = any[];
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
     * @method flow·map
     * @memberof async.
     * @param {any[]} operations
     * @param {async.processCallback}
     * @param {async.doneCallback} cb
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function flow·map(operations: any[], cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @method waterfall·map
     * @memberof async.
     * @param {any[]} operations
     * @param {async.processCallback}
     * @param {async.doneCallback} cb
     * @param {number} [parallel=27] number of operations that can be done in parallel
     * @param {number} [timeout=0] timeout between operations
     * @returns {async.Async}
     */
    function waterfall·map(operations: any[], cb: async.doneCallback, parallel?: number, timeout?: number): async.Async;
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
     * @property {external:MouseEvent} event
     * @property {ExtensionsPrototype.MousePosition} position
     * @property {object} config
     * @property {boolean} config.tracking
     */
    type MouseFunctions = {
        event: external;
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
     * @var {ExtensionsPrototype.slDOM} slDOM
     * @memberof ExtensionsPrototype
     */
    var slDOM: ExtensionsPrototype.slDOM;
    /**
     * @var {ExtensionsPrototype.slDOM_env} slDOM_env
     * @memberof ExtensionsPrototype
     */
    var slDOM_env: ExtensionsPrototype.slDOM_env;
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
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {string} key
         * @param {any} value
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static config(key: string, value: any): ExtensionsPrototype.slDOMSet;
        /**
         * @method config
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {string} key
         * @param {any} value
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static config(key: string, value: any): ExtensionsPrototype.slDOMSet;
        /**
         * @method unique
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static unique(): ExtensionsPrototype.slDOMSet;
        /**
         * @method set
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {string} v css selector applied over document
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static set(v: string): ExtensionsPrototype.slDOMSet;
        /**
         * @method set
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {string} v css selector applied over document
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static set(v: string): ExtensionsPrototype.slDOMSet;
        /**
         * @method add
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {(NodeList|any)} ...v array of Nodes or HTMLElements
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static add(): ExtensionsPrototype.slDOMSet;
        /**
         * @method env
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {ExtensionsPrototype.slDOM_env}
         */
        static env(): ExtensionsPrototype.slDOM_env;
        /**
         * @method get
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {(Node[])}
         */
        static get(): Node[];
        /**
         * @method get
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {(Node[])}
         */
        static get(): Node[];
        /**
         * @method eq
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {number} index
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static eq(index: number): ExtensionsPrototype.slDOMSet;
        /**
         * @method find
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {string} cssSelector
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static find(cssSelector: string): ExtensionsPrototype.slDOMSet;
        /**
         * @method filter
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {ExtensionsPrototype.slDOMSet.itemHandlerFilter} filterCallback
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static filter(filterCallback: ExtensionsPrototype.slDOMSet.itemHandlerFilter): ExtensionsPrototype.slDOMSet;
        /**
         * @method each
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {ExtensionsPrototype.slDOMSet.itemHandler} filterCallback
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static each(filterCallback: ExtensionsPrototype.slDOMSet.itemHandler): ExtensionsPrototype.slDOMSet;
        /**
         * @method map
         * @memberof ExtensionsPrototype.slDOMSet
         * @param {ExtensionsPrototype.slDOMSet.itemHandlerMap} filterCallback
         * @returns {ExtensionsPrototype.slDOMSet}
         */
        static map(filterCallback: ExtensionsPrototype.slDOMSet.itemHandlerMap): ExtensionsPrototype.slDOMSet;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
        /**
         * @method attr
         * @memberof ExtensionsPrototype.slDOMSet
         * @returns {external:NamedNodeMap}
         */
        static attr(): external;
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
     * @var {ExtensionsPrototype.slDOM_env} slDOM_env
     * @memberof ExtensionsPrototype
     */
    var slDOM_env: ExtensionsPrototype.slDOM_env;
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
     * @var {ExtensionsPrototype.slDOM} slDOM
     * @memberof ExtensionsPrototype
     */
    var slDOM: ExtensionsPrototype.slDOM;
}

/**
 * @interface ExtensionsPrototype
 */
declare interface ExtensionsPrototype {
}

declare namespace JSTemplate {
    /**
     * @memberof JSTemplate
     * @typedef {Object} JSTemplateModule
     * @property {JSTemplate.nodeParser} parseContent
     * @property {object} config
     * @property {number} [config.RENDER_FPS=15]
     * @property {number} [config.REMOVE_EMPTY_NODES=true]
     */
    type JSTemplateModule = {
        parseContent: JSTemplate.nodeParser;
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
         * @memberof ApplicationPrototype.Instance
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} specifiedEventId event name of function with name
         * @returns {string}
         */
        static on(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId: string): string;
        /**
         * returns listener Id
         * @method once
         * @memberof ApplicationPrototype.Instance
         * @param {string|function} event event name of function with name
         * @param {function} [callback] function that will listen data
         * @param {string} specifiedEventId event name of function with name
         * @returns {string}
         */
        static once(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId: string): string;
        /**
         * returns listener Id
         * @method bind
         * @memberof ApplicationPrototype.Instance
         * @param {string|function} event event name of function with name
         * @param {function|ApplicationPrototype.Instance.BindListenerConfig} [callback] function that will listen data
         * @param {ApplicationPrototype.Instance.BindListenerConfig|string} [listenersConfig] of lis event name of function with name
         * @returns {string}
         */
        static bind(event: string | ((...params: any[]) => any), callback?: ((...params: any[]) => any) | ApplicationPrototype.Instance.BindListenerConfig, listenersConfig?: ApplicationPrototype.Instance.BindListenerConfig | string): string;
        /**
         * remove all event listeners
         * @method off
         * @memberof ApplicationPrototype.Instance
         * @param {string} event event or events names separated by comma
         * @param {string} [specifiedEventId] event name of function with name
         * @returns {boolean}
         */
        static off(event: string, specifiedEventId?: string): boolean;
        /**
         * returns listener Id
         * @method crudEvents
         * @memberof ApplicationPrototype.Instance
         * @param {Object<any>} context will be used as a base for ApplicationPrototype instance that will be returned
         * @param {Object<Function>} publicMethods list of public methods available from returned instance
         * @param {Object<Function>} privateMethods list of private methods available only for instance's methods
         * @returns {ApplicationPrototype.Instance}
         */
        static crudEvents(context: {
            [key: string]: any;
        }, publicMethods: {
            [key: string]: any;
        }, privateMethods: {
            [key: string]: any;
        }): ApplicationPrototype.Instance;
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
         */
        static property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
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
         */
        static property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
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
         * @memberof ApplicationPrototype.Builder
         * @param {string|string[]} events List of Events Names or Array of Events Mapping like [ "uriLoad :: uri-load", "ePrototype :: ExtensionsPrototype" ]
         * @param {function} [callback] Callback that will receive Module
         * @returns {PromiseLike<any>}
         */
        static require(events: string | string[], callback?: (...params: any[]) => any): PromiseLike<any>;
        /**
         * @method isNode
         * @memberof ApplicationPrototype.Builder
         * @returns {boolean}
         */
        static isNode(): boolean;
        /**
         * @method isBrowser
         * @memberof ApplicationPrototype.Builder
         * @returns {boolean}
         */
        static isBrowser(): boolean;
        /**
         * @method debugEnabled
         * @memberof ApplicationPrototype.Builder
         * @param {boolean} [status]
         * @returns {boolean}
         */
        static debugEnabled(status?: boolean): boolean;
        /**
         * @method runModulesInFiles
         * @memberof ApplicationPrototype.Builder
         * @param {boolean} [status]
         * @returns {boolean}
         */
        static runModulesInFiles(status?: boolean): boolean;
        /**
         * @method consoleOptions
         * @memberof ApplicationPrototype.Builder
         * @param {ApplicationPrototype.Builder.ConsoleOptions} [options]
         * @returns {ApplicationPrototype.Builder.ConsoleOptions}
         */
        static consoleOptions(options?: ApplicationPrototype.Builder.ConsoleOptions): ApplicationPrototype.Builder.ConsoleOptions;
        /**
         * @method modulePath
         * @memberof ApplicationPrototype.Builder
         * @param {string} [path]
         * @returns {string}
         */
        static modulePath(path?: string): string;
        /**
         * @method moduleRegister
         * @memberof ApplicationPrototype.Builder
         * @param {string} path path that will be used as `Application.modulePath()`
         * @param {string[]} modules list of modules names that should be registered
         * @returns {ApplicationPrototype.Builder.ModuleStore}
         */
        static moduleRegister(path: string, modules: string[]): ApplicationPrototype.Builder.ModuleStore;
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
         * @memberof ApplicationPrototype.Builder
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

