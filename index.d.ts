declare namespace async {
    type AsyncConstructor = () => async.Async;
}

declare namespace async {
    class Async {
        /**
         * <p>return unique index identifier for an operation</p>
         */
        index(): string;
        /**
         * <p>method used for return result for an operation,
         * returns <code>true</code> if value was accepted.
         * if operation already obtained a value
         * then value is not accepted and it returns <code>false</code></p>
         * @param id - <p>obtained from {@link async.Async#index}</p>
         */
        receive(id: string, args: any): boolean;
        /**
         * <p>require to wait an additional operation</p>
         */
        wait(): void;
        /**
         * <p>require to reserve index {@link async.Async#index} for an additional operation</p>
         */
        reserve(): string;
        /**
         * <p>require to run an operation</p>
         * @param func - <p>function that should be executed</p>
         */
        run(func: (...params: any[]) => any, args: any[], context: any): string;
        /**
         * <p>reset operation processing</p>
         */
        flush(): void;
        /**
         * <p>return how many operations are processing right now</p>
         */
        processing(): number;
        /**
         * <p>return operations' responses</p>
         */
        responses(returnUnknownResponses?: boolean): any[][];
        /**
         * <p>return all errors found in responses</p>
         */
        errors(): Error[];
        /**
         * <p>register a callback to be called when processing is done</p>
         */
        done(cb: (...params: any[]) => any): void;
    }
    namespace Async {
        type Operation = {
            0?: async.Async.OperationCallback;
            1?: async.Async.OperationArgs;
            2?: async.Async.OperationContext;
            3?: async.Async.OperationCallbackIndex;
        };
        /**
         * <p>a function that represents the operation itself, it have as argument <code>next</code> callback, by default it is first.</p>
         */
        type OperationCallback = () => void;
        /**
         * <p>list if arguments passed to <code>OperationCallback</code>.</p>
         */
        type OperationArgs = any[];
        /**
         * <p>context that should be used in <code>OperationCallback</code>. Default value is <code>{}</code>.</p>
         */
        type OperationContext = any;
        /**
         * <p>index of <code>next()</code> callback in list of <code>OperationCallback</code>'s arguments. Default value is <code>0</code>.</p>
         */
        type OperationCallbackIndex = number;
        type Operations = async.Async.Operation[];
    }
    type processCallback = (next: (...params: any[]) => any, item: any, index: number, items: any[]) => void;
    type doneCallback = (this: async.Async) => void;
    /**
     * @param [timeout = 0] - <p>timeout between operations</p>
     */
    function flow(operations: async.Async.Operations, cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @param [parallel = 27] - <p>number of operations that can be done in parallel</p>
     * @param [timeout = 0] - <p>timeout between operations</p>
     */
    function waterfall(operations: async.Async.Operations, cb: async.doneCallback, parallel?: number, timeout?: number): async.Async;
    /**
     * @param [timeout = 0] - <p>timeout between operations</p>
     */
    function map(operations: any[], cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @param [timeout = 0] - <p>timeout between operations</p>
     */
    function flow_map(operations: any[], cb: async.doneCallback, timeout?: number): async.Async;
    /**
     * @param [parallel = 27] - <p>number of operations that can be done in parallel</p>
     * @param [timeout = 0] - <p>timeout between operations</p>
     */
    function waterfall_map(operations: any[], cb: async.doneCallback, parallel?: number, timeout?: number): async.Async;
}

/**
 * <p>Module used processing data asynchronous</p>
 * @example
 * Application.require('async').then(function (asyncOperations) {
 * 	// @TODO
 * }, console.error);
 */
declare interface async {
}

declare namespace BrowserSessionModule {
    function getItem(key: string, returnResult: boolean): Promise<any>;
    function setItem(key: string, val: any, returnResult: boolean): Promise<any>;
    function removeItem(key: string, returnResult: boolean): Promise<any>;
    function getItems(keys: string[]): Promise<{
        [key: string]: any;
    }>;
    function setItems(obj: {
        [key: string]: any;
    }): Promise<any[]>;
    function removeItems(keys: string[]): Promise<any[]>;
    function findItems(filter: (...params: any[]) => any): Promise<{
        [key: string]: any;
    }>;
    function clear(): Promise<any>;
}

/**
 * <p>browserSessionBuilder description</p>
 * @param objectStoreArg - <p>name or object of strategyStore</p>
 */
declare interface BrowserSessionModule {
}

declare namespace ExtensionsPrototype {
    var fn: {
        window: ExtensionsPrototype.WindowFunctions;
        mouse: ExtensionsPrototype.MouseFunctions;
        getRandId: ExtensionsPrototype.getRandId_1 | ExtensionsPrototype.getRandId_2;
    };
    /**
     * @property [refreshRate = 200] - <p>how often to recalculate window size</p>
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
    type MouseFunctions = {
        event: MouseEvent;
        position: ExtensionsPrototype.MousePosition;
        config: {
            tracking: boolean;
        };
    };
    var object: {
        extend: ExtensionsPrototype.ObjectExtend_1 | ExtensionsPrototype.ObjectExtend_2;
    };
    var string: any;
    /**
     * @example
     * window.addEvent(elem, type, handler);
     * window.removeEvent(elem, type, handlerId);
     *
     * window.addEventListener(eventName, function (event) {});
     */
    var WindowExtend: any;
    type getRandId_1 = (prefix: string, minimize: boolean) => void;
    type getRandId_2 = (minimize: boolean) => void;
    type windowSizeCache = {
        w: number;
        h: number;
    };
    type windowSizeActive = () => ExtensionsPrototype.windowSizeCache;
    type windowSize = () => ExtensionsPrototype.windowSizeCache;
    type MousePositionCache = {
        x: number;
        y: number;
        xmax: number;
        ymax: number;
    };
    type MousePosition = (eventMouseMove?: MouseEvent, context?: {
        window?: any;
        document?: any;
    }) => ExtensionsPrototype.MousePositionCache;
    type ObjectExtend_1 = (object: any, options: {
        value: any;
        readonly?: boolean;
        visible?: boolean;
        config?: boolean;
    }) => void;
    type ObjectExtend_2 = (object: any, options: {
        get?: (...params: any[]) => any;
        set?: (...params: any[]) => any;
        visible?: boolean;
        config?: boolean;
    }) => void;
    var _: ExtensionsPrototype.slDOM;
    var __: ExtensionsPrototype.slDOMSet;
    class slDOMSet {
        constructor(cssSelector?: string);
        config(key: string, value: any): ExtensionsPrototype.slDOMSet;
        config(key: string, value: any): ExtensionsPrototype.slDOMSet;
        unique(): ExtensionsPrototype.slDOMSet;
        /**
         * @param v - <p>css selector applied over document</p>
         */
        set(v: string): ExtensionsPrototype.slDOMSet;
        /**
         * @param v - <p>css selector applied over document</p>
         */
        set(v: string): ExtensionsPrototype.slDOMSet;
        /**
         * @param ...v - <p>array of Nodes or HTMLElements</p>
         */
        add(): ExtensionsPrototype.slDOMSet;
        env(): ExtensionsPrototype.slDOM_env;
        get(): Node[];
        get(): Node[];
        eq(index: number): ExtensionsPrototype.slDOMSet;
        find(cssSelector: string): ExtensionsPrototype.slDOMSet;
        filter(filterCallback: ExtensionsPrototype.slDOMSet.itemHandlerFilter): ExtensionsPrototype.slDOMSet;
        each(filterCallback: ExtensionsPrototype.slDOMSet.itemHandler): ExtensionsPrototype.slDOMSet;
        map(filterCallback: ExtensionsPrototype.slDOMSet.itemHandlerMap): ExtensionsPrototype.slDOMSet;
        attr(): NamedNodeMap;
        attr(): NamedNodeMap;
        attr(): NamedNodeMap;
        attr(): NamedNodeMap;
    }
    namespace slDOMSet {
        type itemHandler = (node: Node, index: number, context: ExtensionsPrototype.slDOMSet, p: ExtensionsPrototype.slDOM) => void;
        type itemHandlerFilter = (node: Node, index: number, context: ExtensionsPrototype.slDOMSet, p: ExtensionsPrototype.slDOM) => boolean;
        type itemHandlerMap = (node: Node, index: number, context: ExtensionsPrototype.slDOMSet, p: ExtensionsPrototype.slDOM) => Node;
    }
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
     * <p>a list of proprieties mapped in a object, example: { fontSize: &quot;10px&quot;, &quot;white-space&quot;: &quot;nowrap&quot; }</p>
     */
    type slDOM_ObjectCSSProperties = {
        [key: string]: string | number;
    };
    /**
     * <p>a list of proprieties mapped in a object, example: { fontSize: &quot;10px&quot;, &quot;white-space&quot;: &quot;nowrap&quot; }</p>
     */
    type slDOM_ObjectAttributes = {
        [key: string]: string | number;
    };
    /**
     * <p>returns a pointer that walks over DOM and applying needed operations</p>
     * @property env - <p>Environment Flags</p>
     * @property __ - <p>if params is <code>true</code> then return document otherwise current HTMLElement</p>
     * @property a2D - <p>apply Css Transforms on elements</p>
     * @property opacity - <p>( short form <strong>o</strong> ) change element opacity</p>
     * @property setE - <p>( short form <strong>e</strong> ) set a HTMLElement or Create Element for slDOM Pointer</p>
     * @property sClass - <p>=slDOMlib.sClass;</p>
     * @property setArg - <p>( short form <strong>A</strong> ) set Attributes to HTMLElement, arguments order: <code>[ attribute, value, attribute, value ... ]</code></p>
     * @property adEto - <p>add current HTMLElement to other HTMLElement;</p>
     * @property putBfto - <p>insert current HTMLElement before other HTMLElement</p>
     * @property putAfto - <p>insert current HTMLElement after other HTMLElement</p>
     * @property putBf - <p>=slDOMlib.putBf;</p>
     * @property putAf - <p>=slDOMlib.putAf;</p>
     * @property addE - <p>=slDOMlib.addE;</p>
     * @property addB - <p>=slDOMlib.addB;</p>
     * @property addT - <p>( short form <strong>t</strong> ) add text node to HTMLElement;</p>
     * @property [nextTo = 1] - <p>( short form <strong>N</strong> ) moving pointer forward to N neighbors</p>
     * @property [backTo = 1] - <p>( short form <strong>B</strong> ) moving pointer backward to N neighbors</p>
     * @property nUP - <p>( short form is U ) goes up on level in doom</p>
     * @property nChild - <p>( short form is <strong>C</strong> ) select the <em>N th</em> child element</p>
     * @property getParentN - <p>( short form is <strong>P</strong> ) select the <em>N th</em> parent element</p>
     * @property clearE - <p>( short form is <strong>d</strong> ) remove all childObjects from node</p>
     * @property delE - <p>remove HTMLElement from its Parent</p>
     * @property copyE - <p>=slDOMlib.copyE;</p>
     * @property getParentTag - <p>=slDOMlib.getParentTag;</p>
     * @property getByTag - <p>=slDOMlib.getByTag;</p>
     * @property getByQuery - <p>=slDOMlib.getByQuery;</p>
     * @property getById - <p>=slDOMlib.getById;</p>
     * @property getTags - <p>=slDOMlib.getTags;</p>
     * @property getTagsByQuery - <p>=slDOMlib.getTagsByQuery;</p>
     * @property triger - <p>( short form <strong>T</strong> ) trigger / emit an event on HTMLElement</p>
     * @property getE - <p>( short form <strong>_</strong> ) return HTMLElement ;</p>
     * <ul>
     * <li>if argument[0] is &quot;.tag&quot; return HTMLElement's tagname ;</li>
     * <li>if argument[0] is &quot;.html&quot; return HTML Content ;</li>
     * <li>if argument[0] is &quot;.text&quot; return Text Content ;</li>
     * <li>if argument[0] is &quot;-attributeName&quot; return HTMLElement's Attribute ;</li>
     * <li>if argument[0] is &quot;!attributeName&quot; remove HTMLElement's Attribute</li>
     * </ul>
     * @property setStyle - <p>( short form <strong>f</strong> ) setting css proprieties to HTMLElement</p>
     * @property setVar - <p>( short form <strong>V</strong> ) set dot property on HTMLElement</p>
     * @property setObjVar - <p>( short form <strong>v</strong> ) setting attributes to HTMLElement</p>
     * @property setStyleSPEED - <p>( short form <strong>F</strong> ) setting css proprieties to HTMLElement with normalizing values by adding units</p>
     * @property pagePXY - <p>( short form <strong>PXY</strong> ) get element position on page</p>
     * @property in_e - <p>check if HTMLElement is still attached to DOM ( Document Object Manager )</p>
     * @property g_wh - <p>returns width and height of HTMLElement</p>
     * @property getLIST - <p>=slDOMlib.getLIST;</p>
     * @property toFunction - <p>=slDOMlib.toFunction;</p>
     * @property removeFromDOM - <p>( short form <strong>free</strong> ) remove elements from DOM</p>
     * @property o - <p>( short form <strong>opacity</strong> ) change element opacity</p>
     * @property E - <p>( long form <strong>setE</strong> ) set a HTMLElement or Create Element for slDOM Pointer</p>
     * @property c - <p>=slDOMlib.sClass;</p>
     * @property attrs - <p>= slDOMlib.attrs;</p>
     * @property A - <p>=slDOMlib.setArg;</p>
     * @property Et - <p>=slDOMlib.adEto;</p>
     * @property Bt - <p>=slDOMlib.putBfto;</p>
     * @property At - <p>=slDOMlib.putAfto;</p>
     * @property pB - <p>=slDOMlib.putBf;</p>
     * @property pA - <p>=slDOMlib.putAf;</p>
     * @property e - <p>=slDOMlib.addE;</p>
     * @property b - <p>=slDOMlib.addB;</p>
     * @property t - <p>=slDOMlib.addT;</p>
     * @property N - <p>=slDOMlib.nextTo;</p>
     * @property B - <p>=slDOMlib.backTo;</p>
     * @property U - <p>=slDOMlib.nUP;</p>
     * @property C - <p>=slDOMlib.nChild;</p>
     * @property P - <p>=slDOMlib.getParentN;</p>
     * @property d - <p>=slDOMlib.clearE;</p>
     * @property D - <p>=slDOMlib.delE;</p>
     * @property X - <p>=slDOMlib.copyE;</p>
     * @property p - <p>=slDOMlib.getParentTag;</p>
     * @property S - <p>=slDOMlib.getByTag;</p>
     * @property Q - <p>=slDOMlib.getByQuery;</p>
     * @property I - <p>=slDOMlib.getById;</p>
     * @property s - <p>=slDOMlib.getTags;</p>
     * @property q - <p>=slDOMlib.getTagsByQuery;</p>
     * @property T - <p>=slDOMlib.triger;</p>
     * @property _ - <p>=slDOMlib.getE;</p>
     * @property $ - <p>=slDOMlib.getLIST;</p>
     * @property F - <p>=slDOMlib.setStyleSPEED;</p>
     * @property f - <p>=slDOMlib.setStyle;</p>
     * @property L - <p>=slDOMlib.getLIST;</p>
     * @property V - <p>=slDOMlib.setVar;</p>
     * @property v - <p>=slDOMlib.setObjVar;</p>
     * @property PXY - <p>=slDOMlib.pagePosXY;</p>
     * @property i - <p>=slDOMlib.in_e;</p>
     * @property r - <p>=slDOMlib.g_wh;</p>
     * @property x - <p>=slDOMlib.toFunction;</p>
     * @property free - <p>= slDOMlib.removeFromDOM;</p>
     * @property is_free - <p>= slDOMlib.is_free;</p>
     * @property is_focused - <p>= slDOMlib.is_focused;</p>
     * @property is_inview - <p>= slDOMlib.elementInViewport;</p>
     * @property is_visible - <p>= slDOMlib.elementIsVisible;</p>
     * @property _normalizeCssValues - <p>= slDOMlib._normalizeCssValues;</p>
     * @property on - <p>= slDOMlib.on;</p>
     * @property off - <p>= slDOMlib.off;</p>
     * @property eventsCache - <p>= slDOMlib.eventsCache;</p>
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

declare interface ExtensionsPrototype {
}

declare namespace JSTemplate {
    type JSTemplateModule = {
        parseContent: JSTemplate.JSTemplateParseContent;
        config: {
            RENDER_FPS?: number;
            REMOVE_EMPTY_NODES?: number;
        };
    };
}

declare namespace JSTemplate {
    type jsTemplate_textResult = {
        type?: string;
        data: JSTemplate.jsTemplate_textResultData;
    };
    type jsTemplate_textResultData = {
        nodes: Text[];
        initialNodes: Text[];
        code: string;
    };
    /**
     * @property [args = {}] - <p>arguments</p>
     * @property [context = {}] - <p>execution context</p>
     * @property [start = '{{'] - <p>start token</p>
     * @property [end = '}}'] - <p>end token</p>
     * @property [textNodes] - <p>array of TextNodes</p>
     * @property [buffer] - <p>(technical property) buffer</p>
     * @property [opened = false] - <p>(technical property)</p>
     * @property [__argsNames] - <p>(technical property)</p>
     * @property [__argsValues] - <p>(technical property)</p>
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
     * <p>Expression Builder</p>
     */
    function expressionBuilder(code: string, config: JSTemplate.parseTextNodesConfig): void;
    function textParser(bf: Text[], config: parseTextNodesConfig): JSTemplate.jsTemplate_textResult;
    type parseTextNodesCallback = (err: Error, config: JSTemplate.parseTextNodesConfig) => void;
    function parseTextNodes(textNode: HTMLElement | Node | Text, cb: JSTemplate.parseTextNodesCallback, config: JSTemplate.parseTextNodesConfig): void;
    type jsTemplate_Attribute = {
        name: string;
        value: string;
    };
    /**
     * @property name - <p>attribute name</p>
     * @property code - <p>executable code</p>
     * @property node - <p>node element</p>
     * @property [buffer] - <p>( technical property )</p>
     * @property [inline = false] - <p>should be value be parsed</p>
     * @property [postProcess = false] - <p>should be value be parsed</p>
     */
    type jsTemplate_attrResultAttributeData = {
        name: string;
        code: string;
        node: HTMLElement;
        buffer?: any;
        inline?: boolean;
        postProcess?: boolean;
    };
    type jsTemplate_attrResult = {
        type: 'event' | 'attribute' | 'binding' | 'macro';
        attr: JSTemplate.jsTemplate_Attribute;
        data: JSTemplate.jsTemplate_attrResultAttributeData;
    };
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
     * <p>Parsing NodeElement Attribute</p>
     */
    function attrParser(attr: JSTemplate.jsTemplate_Attribute): JSTemplate.jsTemplate_attrResult;
    type nodeParserCallback = (err: Error, config: JSTemplate.parseTextNodesConfig) => JSTemplate.parseTextNodesConfig;
    type JSTemplateParseContent = (nodeElement: HTMLElement, cb: JSTemplate.nodeParserCallback, config: JSTemplate.parseTextNodesConfig) => JSTemplate.parseTextNodesConfig;
    function nodeParser(nodeElement: HTMLElement, cb: JSTemplate.nodeParserCallback, config: JSTemplate.parseTextNodesConfig): JSTemplate.parseTextNodesConfig;
}

/**
 * <p>Module used for template rendering</p>
 * @example
 * Application.require('js-template').then(function (jsTemplate) {
 * 	jsTemplate.parseContent(
 * 		document.body,
 * 		function (err, config) { console.log(config) },
 * 		{ context: {}, args: { item: 'sample reference' }}
 * 	);
 * }, console.error);
 */
declare interface JSTemplate {
}

declare class RequestModule {
    /**
     * @param [opts.cache] - <p>object where reg expressions will be cached</p>
     * @param [opts.mapper] - <p>function that will decode value, default is decodeURIComponent</p>
     * @param [opts.boud = "\x02\x00\x00\x03"] - <p>function that will decode value, default is decodeURIComponent</p>
     * @param [opts.ret] - <p>object to be updated with found params</p>
     * @param [opts.tableIndex] - <p>list of parameters' names ( @experimental )</p>
     * @param [opts.pRegExp = "\\:([a-z][a-z0-9]+)"] - <p>RegExp params' chars</p>
     * @param [opts.matchGroup = "([^\\/]+)"] - <p>RegExp value</p>
     * @param [opts.fixedEnd = true] - <p>RegExp value</p>
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
    config(): RequestModule.RequestConfig;
    /**
     * @param template - <p>configuration name</p>
     */
    configurator(template: 'multipart' | 'blob' | 'binary' | 'POST' | 'prepare-multipart' | 'retrieve-blob' | 'retrieve-binary-string' | 'prepare-post' | 'check-status-code' | 'ignore-status-code'): RequestModule;
    request(): XMLHttpRequest;
    /**
     * @param [options.type = "application/octet-stream"] - <p>Blob constructor's params</p>
     */
    response(type?: '' | 'request' | 'blob' | 'arraybuffer' | 'text' | 'json' | 'document', options?: {
        type?: string;
    }): RequestModule | Promise<ArrayBuffer> | Promise<Blob> | Promise<HTMLElement> | Promise<DocumentFragment> | Promise<string> | ArrayBuffer | Blob | HTMLElement | string;
    /**
     * <p>current XMLHttpRequest timeout in seconds</p>
     */
    timeout(): number;
    /**
     * <p>current XMLHttpRequest timeout in seconds</p>
     */
    timeout(): number;
    /**
     * <p>current XMLHttpRequest withCredentials status</p>
     */
    withCredentials(): boolean;
    /**
     * <p>current XMLHttpRequest withCredentials status</p>
     */
    withCredentials(): boolean;
    /**
     * <p>Client has been created. open() not called yet.</p>
     */
    static READY_STATE_UNSENT: number;
    /**
     * <p>open() has been called.</p>
     */
    static READY_STATE_OPENED: number;
    /**
     * <p>send() has been called, and headers and status are available.</p>
     */
    static READY_STATE_HEADERS_RECEIVED: number;
    /**
     * <p>Downloading; responseText holds partial data.</p>
     */
    static READY_STATE_LOADING: number;
    /**
     * <p>Downloading is done</p>
     */
    static READY_STATE_DONE: number;
    readyState(): RequestModule.readyStateType;
    status(): number;
    statusText(): string;
    /**
     * <p>returns <code>RequestModule.RequestConfig[&quot;async&quot;]</code></p>
     */
    async(): boolean;
    /**
     * <p>returns <code>RequestModule.RequestConfig[&quot;async&quot;]</code></p>
     */
    async(): boolean;
    /**
     * <p>returns <code>RequestModule.RequestConfig[&quot;method&quot;]</code></p>
     */
    method(): string;
    /**
     * <p>returns <code>RequestModule.RequestConfig[&quot;method&quot;]</code></p>
     */
    method(): string;
    /**
     * <p>returns <code>RequestModule.RequestConfig[&quot;url&quot;]</code></p>
     */
    url(): string;
    /**
     * <p>returns <code>RequestModule.RequestConfig[&quot;url&quot;]</code></p>
     */
    url(): string;
    /**
     * @param [timeout] - <p>request timeout in seconds</p>
     */
    open(method?: string, url?: string, async?: boolean, timeout?: number): RequestModule;
    send(data?: string | FormData | MediaStream, type?: "asFormData" | "json"): RequestModule;
    headers(): string;
    headers(): string;
}

declare type RequestModuleConstructor = () => RequestModule;

declare namespace RequestModule {
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
    type readyStateType = {
        READY_STATE_UNSENT?: number;
        READY_STATE_OPENED?: number;
        READY_STATE_HEADERS_RECEIVED?: number;
        READY_STATE_LOADING?: number;
        READY_STATE_DONE?: number;
    };
}

declare module "uriLoad" {
    /**
     * <p>loadScript - is a function for adding scripts into the header</p>
     * @param url - <p>url/urls of scripts</p>
     * @param callback - <p>[description]</p>
     * @param opts - <p>settings with info related to the script tags</p>
     */
    function script(url: string | string[], callback: (...params: any[]) => any, opts: any): void;
    /**
     * <p>loadLink - is a function for adding link tags into the header</p>
     * @param url - <p>url/urls of link tags</p>
     * @param callback - <p>[description]</p>
     * @param opts - <p>settings with info related to the link tags</p>
     */
    function link(url: string | string[], callback: (...params: any[]) => any, opts: any): void;
}

declare namespace ApplicationPrototype {
    class Instance {
        /**
         * <p>returns listener Id</p>
         * @param event - <p>event name of function with name</p>
         * @param [callback] - <p>function that will listen data</p>
         * @param [specifiedEventId] - <p>event name of function with name</p>
         */
        on(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId?: string): string;
        /**
         * <p>returns listener Id</p>
         * @param event - <p>event name of function with name</p>
         * @param [callback] - <p>function that will listen data</p>
         * @param [specifiedEventId] - <p>event name of function with name</p>
         */
        once(event: string | ((...params: any[]) => any), callback?: (...params: any[]) => any, specifiedEventId?: string): string;
        /**
         * <p>returns listener Id</p>
         * @param event - <p>event name of function with name</p>
         * @param [callback] - <p>function that will listen data</p>
         * @param [listenersConfig] - <p>of lis event name of function with name</p>
         */
        bind(event: string | ((...params: any[]) => any), callback?: ((...params: any[]) => any) | ApplicationPrototype.Instance.BindListenerConfig, listenersConfig?: ApplicationPrototype.Instance.BindListenerConfig | string): string;
        /**
         * <p>remove all event listeners</p>
         * @param event - <p>event or events names separated by comma</p>
         * @param [specifiedEventId] - <p>event name of function with name</p>
         */
        off(event: string, specifiedEventId?: string): boolean;
        /**
         * <p>returns listener Id</p>
         * @param context - <p>will be used as a base for ApplicationPrototype instance that will be returned</p>
         * @param publicMethods - <p>list of public methods available from returned instance</p>
         * @param privateMethods - <p>list of private methods available only for instance's methods</p>
         */
        crudEvents(context: {
            [key: string]: any;
        }, publicMethods: {
            [key: string]: any;
        }, privateMethods: {
            [key: string]: any;
        }): ApplicationPrototype.Instance;
        property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
        property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
    }
    namespace Instance {
        /**
         * <p>configuration for bind listeners</p>
         * @property [listenedBefore = true] - <p>allow listeners before method call</p>
         * @property [listenedOn = true] - <p>allow listeners on method call ( is after )</p>
         * @property [listenedAfter = true] - <p>allow listeners after method call ( is after small delay )</p>
         */
        type BindListenerConfig = {
            listenedBefore?: boolean;
            listenedOn?: boolean;
            listenedAfter?: boolean;
            allowInterruption?: boolean;
        };
        /**
         * <p>returns listener Id</p>
         * @param value - <p>is undefined when <code>isSetter = true</code></p>
         */
        type PropertyHandler = (value: any, lastValue: any, isSetter: boolean) => void;
    }
    class Builder extends ApplicationPrototype.Instance {
        /**
         * @param events - <p>List of Events Names or Array of Events Mapping like [ &quot;uriLoad :: uri-load&quot;, &quot;ePrototype :: ExtensionsPrototype&quot; ]</p>
         * @param [callback] - <p>Callback that will receive Module</p>
         */
        require(events: string | string[], callback?: (...params: any[]) => any): PromiseLike<any>;
        isNode(): boolean;
        isBrowser(): boolean;
        debugEnabled(status?: boolean): boolean;
        runModulesInFiles(status?: boolean): boolean;
        consoleOptions(options?: ApplicationPrototype.Builder.ConsoleOptions): ApplicationPrototype.Builder.ConsoleOptions;
        modulePath(path?: string): string;
        /**
         * @param path - <p>path that will be used as <code>Application.modulePath()</code></p>
         * @param modules - <p>list of modules names that should be registered</p>
         */
        moduleRegister(path: string, modules: string[]): ApplicationPrototype.Builder.ModuleStore;
        property(propertyName: string, getter: ApplicationPrototype.Instance.PropertyHandler, setter?: ApplicationPrototype.Instance.PropertyHandler, config?: {
            configurable?: boolean;
            enumerable?: boolean;
        }): void;
    }
    namespace Builder {
        class Promise {
            constructor(handler: (...params: any[]) => any);
        }
        /**
         * @property [file] - <p>enable/disable showing filename in console log. default value is <code>true</code></p>
         * @property [contextName] - <p>enable/disable showing context Execution info in console log. default value is <code>true</code></p>
         * @property [timestamp] - <p>enable/disable showing current timestamp in console log. default value is <code>true</code></p>
         * @property [logType] - <p>enable/disable showing log type in console log. default value is `true</p>
         */
        type ConsoleOptions = {
            file?: boolean;
            contextName?: boolean;
            timestamp?: boolean;
            logType?: boolean;
        };
        /**
         * <p>modules store where are indexed modules</p>
         */
        type ModuleStore = any;
        /**
         * @property store - <p>same as <code>module.cache()</code></p>
         * @property $requestQuery - <p>XMLHttpRequest used for obtaining Module's Content</p>
         * @property module_path - <p>module's path</p>
         * @property path - <p>module's internal path used as identifier of module</p>
         * @property name - <p>module's name</p>
         * @property __dirname - <p>module's dirname</p>
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
         * @param module - <p>module name</p>
         * @param [path] - <p>module path</p>
         */
        type moduleResolve = (module: string, path?: string) => ApplicationPrototype.Builder.ModuleMeta;
        /**
         * <p>resources url is composed from <code>module's plath</code> + <code>resource path</code></p>
         */
        type ModuleResourceUrl = string;
        /**
         * @property $request - <p>resolves module exports</p>
         * @property exports - <p>module exports handler</p>
         * @property atime - <p>unix time in milliseconds</p>
         * @property Application - <p>returns current application</p>
         * @property cache - <p>returns module's reserved cache object</p>
         * @property require - <p>require modules from module's folder</p>
         * @property resourceUrl - <p>returns module's resource URL</p>
         * @property meta - <p>module's meta information</p>
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

declare interface ApplicationPrototype {
}

/**
 * <p>returns interface for accessing Node Env, is defined only in node env</p>
 * @property globalReference - <p>returns NodeJS require reference by it's name</p>
 */
declare var NodeInterface: {
    process: (...params: any[]) => any;
    global: (...params: any[]) => any;
    require: (...params: any[]) => any;
    globalReference: (...params: any[]) => any;
};

declare type ApplicationPrototypeConstructor = () => ApplicationPrototype.Instance;

declare type ApplicationBuilderConstructor = () => ApplicationPrototype.Builder;

declare type ApplicationBuilderExports = {
    application: ApplicationPrototypeConstructor;
    builder: ApplicationBuilderConstructor;
};

declare interface String {
    subs(index: number, lastIndex?: number): string;
    toHex(isUtf8?: boolean): string;
    fromHex(): string;
    /**
     * <p>encode in HTML minimal</p>
     */
    toHtmlSimple(): string;
    /**
     * <p>encode in HTML</p>
     */
    toHtml(): string;
    /**
     * <p>decode from HTML ( works in Browser )</p>
     */
    fromHtml(): string;
    /**
     * <p>remove risky tags from HTML Code: comments, script, iframe, style, object, noscript, frame, frameset</p>
     */
    cleanTags(): string;
    add_Class(newClass: string): string;
    del_Class(newClass: string): string;
    fnd_Class(newClass: string): boolean;
    swp_case(): string;
    /**
     * @param [length = 1] - <p>how many first chars to be transformed to uppercase</p>
     */
    ucfirst(length?: number): string;
    /**
     * @param [length = 1] - <p>how many first chars to be transformed to uppercase</p>
     */
    lcfirst(length?: number): string;
    /**
     * <p>Detects if a string is unicode, and if it is, then it is transformed to UTF8</p>
     */
    utf8need(): string;
    utf8encode(): string;
    utf8decode(): string;
    utf8(): string;
    unicode(): string;
    encryptAes(password: string, size?: number): string;
    decryptAes(password: string, size?: number): string;
    encryptTea(password: string): string;
    decryptTea(password: string): string;
    base64decode(): string;
    base64encode(): string;
    base64decodeBytes(): Uint8Array;
    base64encodeBytes(): Uint8Array;
    base64decodeBytesArray(): number[];
    base64encodeBytesArray(): number[];
    base64encodeClean(): string;
    base64decodeClean(): string;
    encodeURI(): string;
    decodeURI(): string;
    escapeHex(): string;
    escape(): string;
    unescape(): string;
    sha1(isUtf8?: boolean): string;
    sha256(isUtf8?: boolean): string;
    subs(index: number, lastIndex?: number): string;
    md5(): string;
    markdown(): string;
    toRegexp(): RegExp;
    parseUrl(mode?: "get_vars" | boolean): any;
    /**
     * @param rule - <p>reg exp rule in string format</p>
     * @param [flags] - <p>reg exp flags</p>
     */
    match_str(rule: string, flags?: string): any[] | any;
    /**
     * <p>Returns a list of parameters included in a string</p>
     * @example
     * 'my-demo testIndex: 23 with testValue: "demo content"'.buildQuery()
     * // returns
     * {
     *     "_keys": [
     *         "testindex",
     *         "testvalue"
     *     ],
     *     "_": "my-demo",
     *     "testindex": "23 with",
     *     "testvalue": "\"demo content\""
     * }
     */
    buildQuery(): {
        [key: string]: string | string[];
    };
    /**
     * <p>Returns a list of parameters included in a string</p>
     * @example
     * '"this is" "list of fragments"'.buildSearchArray()
     * // returns
     * [
     *     "this is",
     *     "list of fragments"
     * ]
     */
    buildSearchArray(): string[];
    toArrayBufferFromUtf8(): ArrayBuffer;
}

