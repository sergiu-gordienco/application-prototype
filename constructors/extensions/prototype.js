/* jshint -W002 */
/* jshint -W032 */
/* jshint -W027 */
/* jshint -W086 */

/**
 * @module extensions/prototype
 */

module.exports =
((function () {

	var _public = {};

	/**
	 * @var {object} fn
	 * @memberof module:extensions/prototype
	 * @property {module:extensions/prototype~WindowFunctions} window
	 * @property {module:extensions/prototype~MouseFunctions} mouse
	 * @property {(module:extensions/prototype~getRandId_1|module:extensions/prototype~getRandId_2)} getRandId
	 */
	_public.fn = {};

	/**
	 * @typedef {object} WindowFunctions
	 * @property {object} sizeLimit
	 * @property {module:extensions/prototype~windowSizeCache} sizeLimit.min
	 * @property {module:extensions/prototype~windowSizeCache} sizeLimit.max
	 * @property {number} [refreshRate=200] how often to recalculate window size
	 * @property {module:extensions/prototype~windowSizeActive} sizeActive
	 * @property {module:extensions/prototype~windowSize} size
	 */
	_public.fn.window = {};

	/**
	 * @typedef {object} MouseFunctions
	 * @property {external:MouseEvent} event
	 * @property {module:extensions/prototype~MousePosition} position
	 * @property {object} config
	 * @property {boolean} config.tracking
	 */
	_public.fn.mouse	= {};


	/**
	 * @var {object} object
	 * @property {(module:extensions/prototype~ObjectExtend_1|module:extensions/prototype~ObjectExtend_2)} extend
	 * @memberof module:extensions/prototype
	 */
	_public.object	= {};

	/**
	 * @var {object} string
	 * @memberof module:extensions/prototype
	 */
	_public.string	= {};

	if (typeof(window) === "undefined") {
		//@ts-ignore
		window = {};
		// console.warn("Not a Browser Space, window doesn't exist");
	}
	if (typeof(document) === "undefined") {
		document = null;
		// console.warn("Not a Browser Space, document not found");
	}
	if (typeof(navigator) === "undefined") {
		//@ts-ignore
		navigator = { userAgent: "Node Server" };
		// console.warn("Not a Browser Space, navigator not found");
	}



	;((function (window) {
		//@ts-ignore
		window.URL = (window.URL || window.webkitURL || {});
		//@ts-ignore
		window.createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL || function(){};
		//@ts-ignore
		window.MutationObserver = window.MutationObserver
			//@ts-ignore
			|| window.WebKitMutationObserver
			//@ts-ignore
			|| window.MozMutationObserver;
		//@ts-ignore
		window.RTCPeerConnection	= window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
	})(window));


	/**
	 *	addEventListener window document Element
	 */
	/* jshint -W033 */
	/* jshint -W061 */
	var er;
	try {
		//@ts-ignore
		if (document) eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5(){1(!8.3.6){2 g=[];2 h=5(a,b){2 c=4;2 d=5(e){e.A=e.q;e.B=c;1(b.r){b.r(e)}9{b.C(c,e)}};1(a=="s"){2 f=5(e){1(j.t=="u"){d(e)}};j.v("w",f);g.x({k:4,l:a,m:b,7:f});1(j.t=="u"){2 e=D E();e.q=F;f(e)}}9{4.v("y"+a,d);g.x({k:4,l:a,m:b,7:d})}};2 i=5(a,b){2 c=0;G(c<g.H){2 d=g[c];1(d.k==4&&d.l==a&&d.m==b){1(a=="s"){4.z("w",d.7)}9{4.z("y"+a,d.7)}I}++c}};8.3.6=h;8.3.n=i;1(o){o.3.6=h;o.3.n=i}1(p){p.3.6=h;p.3.n=i}}})();',45,45,'|if|var|prototype|this|function|addEventListener|wrapper|Element|else||||||||||document|object|type|listener|removeEventListener|HTMLDocument|Window|srcElement|handleEvent|DOMContentLoaded|readyState|complete|attachEvent|onreadystatechange|push|on|detachEvent|target|currentTarget|call|new|Event|window|while|length|break'.split('|'),0,{}))
	} catch (er) { console.warn("[warn]", er) }

	/**
	 * @var {any} WindowExtend
	 * @memberof module:extensions/prototype
	 * @example
	 * window.addEvent(elem, type, handler);
	 * window.removeEvent(elem, type, handlerId);
	 * 
	 * window.addEventListener(eventName, function (event) {});
	 */
	try {
		//@ts-ignore
		if (document) eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(0(){4(h.i){5.7=0(a,b,c,d){a.i(b,c,!!d);3 c};5.8=0(a,b,c,d){a.o(b,c,!!d);3 9}}j 4(h.k){5.7=0(a,b,c){b="6"+b;f d=0(){3 c.l(a,m)};a.k(b,d);3 d};5.8=0(a,b,c){b="6"+b;a.p(b,c);3 9}}j{5.7=0(b,c,d){c="6"+c;b.2=b.2||{};4(!b.2[c]){b.2[c]={n:1};b[c]=0(){q(f a r e){4(e.s(a)){4(t e[a]=="0"){e[a].l(u,m)}}}}}f e=b.2[c],g=e.n++;e[g]=d;3 g};5.8=0(a,b,c){b="6"+b;4(a.2&&a.2[b]&&a.2[b][c])a.2[b][c]=v;3 9}}})();',32,32,'function||memoize|return|if|window|on|addEvent|removeEvent|true||||||var|id|document|addEventListener|else|attachEvent|apply|arguments|counter|removeEventListener|detachEvent|for|in|hasOwnProperty|typeof|this|undefined'.split('|'),0,{}));
	} catch (er) { console.warn("[warn]", er) }
	/* jshint +W033 */
	/* jshint +W061 */







	var getRandId = ((function() {
		var getRandId_k = 0;
		return function(x, b) {
			var r = (getRandId_k++) + '' + new Date().valueOf() + '' + Math.floor(Math.random() * 1000000000);
			if (x === true || b === true) r = parseInt(r).toString(36);
			return ((x && x !== true) ? x : '') + r;
		};
	})());

	/**
	 * @callback getRandId_1
	* @memberof module:extensions/prototype~
	 * @param {string} prefix
	 * @param {boolean} minimize
	 */
	/**
	 * @callback getRandId_2
	 * @memberof module:extensions/prototype~
	 * @param {boolean} minimize
	 */
	_public.fn.getRandId = getRandId;

	/** window size detection */
	((function () {
		var getWindowSize_limit	= {
			min	: {
				w	: false,
				h	: false
			},
			max	: {
				w	: false,
				h	: false
			}
		};
		var getWindowSize_fRaw	= function(){	return {w:800,h:600}; };
		if (document)
		((function(){
			if(typeof(window.innerWidth)=='number') {
				getWindowSize_fRaw = function(o){
					if(typeof(o) == "object" && ('window' in o))	return { w: o.window.innerWidth,h:o.window.innerHeight };
					return { w: window.innerWidth,h:window.innerHeight };
				};
			} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
				getWindowSize_fRaw = function(o){
					if(typeof(o) == "object" && ('document' in o))	return { w: o.document.documentElement.clientWidth,h: o.document.documentElement.clientHeight };
					return { w: document.documentElement.clientWidth,h: document.documentElement.clientHeight };
				};
			} else if(document.body && (document.body.clientWidth || document.body.clientHeight)){/*IE 4 compatible*/
				getWindowSize_fRaw = function(o){
					if(typeof(o) == "object" && ('document' in o))	return { w: o.document.body.clientWidth, h: o.document.body.clientHeight };
					return { w: document.body.clientWidth, h: document.body.clientHeight };
				};
			} else if(parseInt(navigator.appVersion)>3) {
				if(navigator.appName=="Netscape") {
					getWindowSize_fRaw = function(o){
						if(typeof(o) == "object" || !('window' in o))	return { w: o.window.innerWidth, h: o.window.innerHeight};
						return { w: window.innerWidth, h: window.innerHeight};
					};
				}
				if(navigator.appName.indexOf("Microsoft")!=-1) {
					getWindowSize_fRaw = function(o){
						if(typeof(o) == "object" && ('document' in o))	return { w: o.document.body.offsetWidth, h : o.document.body.offsetHeight };
						return { w : document.body.offsetWidth, h : document.body.offsetHeight };
					};
				}
			}
		})());

		var getWindowSize_f	= function () {
			var size	= getWindowSize_fRaw();
			if (getWindowSize_limit.min.w !== false) {
				size.w	= Math.max( size.w, getWindowSize_limit.min.w );
			}
			if (getWindowSize_limit.min.h !== false) {
				size.h	= Math.max( size.h, getWindowSize_limit.min.h );
			}
			if (getWindowSize_limit.max.w !== false) {
				size.w	= Math.min( size.w, getWindowSize_limit.max.w );
			}
			if (getWindowSize_limit.max.h !== false) {
				size.h	= Math.min( size.h, getWindowSize_limit.max.h );
			}
			return size;
		};

		_public.fn.window.sizeLimit	= getWindowSize_limit;
		_public.fn.window.refreshRate	= 200;
		var _timer_active = 0;
		var _cache_active = getWindowSize_f();
		var _timer_raw = 0;
		var _cache_raw = getWindowSize_fRaw();
		/**
		 * @typedef {object} windowSizeCache
		 * @property {number} w
		 * @property {number} h
		 */
		/**
		 * @callback windowSizeActive
		 * @property {boolean} refreshed
		 * @returns {module:extensions/prototype~windowSizeCache}
		 */
		_public.fn.window.sizeActive	= function (refreshed) {
			var t = new Date().valueOf();
			if (refreshed || _timer_active < (t - _public.fn.window.refreshRate)) {
				_timer_active = t;
				_cache_active = getWindowSize_f();
			}
			return _cache_active;
		};
		/**
		 * @callback windowSize
		 * @property {boolean} refreshed
		 * @returns {module:extensions/prototype~windowSizeCache}
		 */
		_public.fn.window.size	= function (refreshed) {
			var t = new Date().valueOf();
			if (refreshed || _timer_raw < (t - _public.fn.window.refreshRate)) {
				_timer_raw = t;
				_cache_raw = getWindowSize_fRaw();
			}
			return _cache_raw;
		};
	})());

	/** window mousemove event and mouse position */
	if (document)
	((function () {
		var MouseMove = {
			config: {}
		};
		MouseMove.config.tracking = true;
		MouseMove.event = {
			pageX : 0,
			pageY : 0
		};
		document.addEventListener("mousemove", function (e) {
			if (MouseMove.config.tracking) {
				MouseMove.event	= e;
			}
		});
		var getMousePosXY	= false;
		((function(){
			if(document.layers) {
				getMousePosXY	= function(e,o){ if(!e) e = MouseMove.event;
					if(!o) o = {};var doc = ('document' in o) ? o.document : window;var win = ('window' in o) ? o.window : window;
					return {x: e.pageX, y: e.pageY, xmax: win.innerWidth+win.pageXOffset, ymax: win.innerHeight+win.pageYOffset};
				};
			} if(document.all){
				getMousePosXY	= function(e,o){ if(!e) e = MouseMove.event;
					if(!o) o = {};var doc = ('document' in o) ? o.document : window;var win = ('window' in o) ? o.window : window;
					return {x: win.event.x+doc.body.scrollLeft, y: win.event.y+doc.body.scrollTop, xmax: doc.body.clientWidth+doc.body.scrollLeft, ymax: doc.body.clientHeight+doc.body.scrollTop};
				};
			} else if(document.getElementById){
				getMousePosXY	= function(e,o){ if(!e) e = MouseMove.event;
					if(!o) o = {};var doc = ('document' in o) ? o.document : window;var win = ('window' in o) ? o.window : window;
					return {x: e.pageX, y: e.pageY, xmax: win.innerWidth+win.pageXOffset, ymax: win.innerHeight+win.pageYOffset};
				};
			}
		})());
		/**
		 * @typedef {object} MousePositionCache
		 * @property {number} x
		 * @property {number} y
		 * @property {number} xmax
		 * @property {number} ymax
		 */
		/**
		 * @callback MousePosition
		 * @param {MouseEvent} [eventMouseMove]
		 * @param {object} [context]
		 * @param {object} [context.window]
		 * @param {object} [context.document]
		 * @returns {module:extensions/prototype~MousePositionCache}
		 */
		MouseMove.position = function (eventMouseMove, windowOrDocumentObject) {
			return getMousePosXY(eventMouseMove, windowOrDocumentObject);
		};
		_public.fn.mouse	= MouseMove;
	})());

	/**
	 * @callback ObjectExtend_1
	 * @param {object} object
	 * @param {object} options
	 * @param {any} options.value
	 * @param {boolean} [options.readonly=false]
	 * @param {boolean} [options.visible=false]
	 * @param {boolean} [options.config=false]
	 */
	/**
	 * @callback ObjectExtend_2
	 * @param {object} object
	 * @param {object} options
	 * @param {function():void} [options.get]
	 * @param {function(any):void} [options.set]
	 * @param {boolean} [options.visible=false]
	 * @param {boolean} [options.config=false]
	 */
	_public.object.extend	= function(obj,o) {
		// key
		// get | set | value
		// visible	: true
		// readonly	: false
		// config	: true
		if('value' in o) {
			Object.defineProperty(obj, o.key, {value : o.value,
				writable : ('readonly' in o ? ( !o.readonly ) : true),
				enumerable : ('visible' in o ? o.visible : true),
				configurable : ('config' in o ? o.config : true)});
		} else {
			Object.defineProperty(obj, o.key, {
				get : ('get' in o ? o.get : function(){ return null; }),
				set : ('set' in o ? o.set : function(val){ }),
				// writable : ('readonly' in o ? ( !o.readonly ) : true),
				enumerable : ('visible' in o ? o.visible : true),
				configurable : ('config' in o ? o.config : true)});
		}
	};
/**
 * Attr data object
 */
if (document)
((function () {
	_public.object.extend(HTMLElement.prototype, {
		key	: "attrdata",
		get	: function () {
			if (typeof(this.attrdatastore) === "undefined") {
				this.attrdatastore	= {};
				var attr	= this.attributes;
				var i, er;
				for (i=0;i<attr.length;i++) {
					if (attr[i].name.match(/^attr\-/)) {
						this.attrdatastore[attr[i].name.replace(/^attr\-/, '').replace(/-./g, function (m) {
							return m.charAt(1).toUpperCase();
						})]	= attr[i].value;
					} else if (attr[i].name.match(/^attrb\-/)) {
						try {
							this.attrdatastore[attr[i].name.replace(/^attrb\-/, '').replace(/-./g, function (m) {
								return m.charAt(1).toUpperCase();
							})]	= JSON.parse(attr[i].value);
						} catch (er) {}
					} else if (attr[i].name.match(/^attrf\-/)) {
						try {
							this.attrdatastore[attr[i].name.replace(/^attrf\-/, '').replace(/-./g, function (m) {
								return m.charAt(1).toUpperCase();
							})]	= new Function("return ( " + attr[i].value + " );").bind(this)();
						} catch (er) {}
					} else if (attr[i].name.match(/^data\-/)) {
						if (typeof(this.attrdatastore.__dataset === "undefined")) {
							this.attrdatastore.__dataset	= {};
						}
						this.attrdatastore.__dataset[attr[i].name.replace(/^data\-/, '').replace(/-./g, function (m) {
							return m.charAt(1).toUpperCase();
						})]	= attr[i].value;
					}
				}
			}
			return this.attrdatastore;
		},
		set	: function (o) {
			if (o && typeof(o) === "object") {
				var i;
				var store	= this.attrdata;
				for (i in o) {
					store[i]	= o[i];
				}
			}
		},
		visible	: true,
		readonly: true,
		configurable	: false
	});
})());



	_public.object.merge	= function() {
		if(typeof(arguments[0]) == "object") {
			var i,j,k;for(i=1;i<arguments.length;i++)
				if(typeof(arguments[i]) == "object")
				for(j in arguments[i])
					if( arguments[i][j] === null ) {
						if(j in arguments[0]) try {
							delete arguments[0][j];
						} catch(k) {}
					} else {
						arguments[0][j]	= arguments[i][j];
					}
			return arguments[0];
		}
		return arguments[0];
	};
	((function () {
		var objEncodeURL	= function(o,k) {
			var r = [],i;
				if(!k) k = "";
				if(Array.isArray(o) && k) {
					for( i=0; i<o.length; i++ )
						r.push(objEncodeURL(o[i],""+k+"["+i+"]"));
				} else if( typeof(o) == "object" ) {
					for( i in o )
						r.push(objEncodeURL(o[i], ""+k+( k ? "[" : "" )+i+( k ? "]" : "" ) ));
				} else if( k ) {
					return ""+k+"="+encodeURIComponent(o);
				}
			return r.join('&');
		};
		_public.object.encodeURL	= objEncodeURL;
	})());

	// Return a boolean value telling whether // the first argument is an Array object.
	if(!Array.isArray) {
		Array.isArray = function (vArg) {
			return Object.prototype.toString.call(vArg) === "[object Array]";
		};
	}

	if (!String.isString) {
		String.isString = function () {if(arguments[0] === null) return false;if(typeof(arguments[0]) == 'string') return true;if(typeof(arguments[0])== 'object'){var criterion=arguments[0].constructor.toString().match(/string/i);return (criterion !== null);}return false;};
	}


var slDOMset=function(v){
	var p	= _();
	var set	= [];
	var config	= {
		unique	: true
	};
	var methods	= {
		config	: function (k, v) {
			if (typeof(v) === "undefined") {
				if (typeof(k) !== "string")
					return null;
				return ( typeof(config[k]) === "undefined" ? null : config[k] );
			} else {
				if (typeof(k) !== "string")
					return methods;
				if (typeof(config[k]) !== "undefined" && typeof(config[k]) === typeof(v)) {
					config[k]	= v;
				}
				return methods;
			}
		},
		unique	: function () {
			set = set.filter(function (v, k, arr) { return arr.indexOf(v) === k; });
			return methods;
		},
		set	: function (v) {
			var config_unique	= this.config("unique");
			var i, arr;
			if (typeof(v) === "string") {
				v = document.querySelectorAll(v);
				arr = [];
				for (i=0;i<v.length;i++) {
					if (!config_unique || arr.indexOf(v[i]) === -1) {
						arr.push(v[i]);
					}
				}
				set = arr;
			} else if (v && typeof(v) === "object") {
				if (v.length) {
					arr = [];
					for (i=0;i<v.length;i++) {
						if (!config_unique || arr.indexOf(v[i]) === -1) {
							arr.push(v[i]);
						}
					}
					set = arr;
				}
			}
			return methods;
		},
		add	: function () {
			var config_unique	= this.config("unique");
			var i;
			for (i=0;i<arguments.length;i++) {
				if (Array.isArray(arguments[i])) {
					methods.add.apply(methods, arguments[i]);
				} else if (typeof(arguments[i]) === "object") {
					if (!config_unique || set.indexOf(arguments[i]) === -1) {
						set.push(arguments[i]);
					}
				} else if (typeof(arguments[i]) === "string") {
					methods.add.apply(methods, document.querySelectorAll(arguments[i]));
				}
			}
			return methods;
		},
		env	: function () {
			return p.env;
		},
		get : function (k) {
			if (typeof(k) === "number") {
				return (set[k] || null);
			}
			return set;
		},
		eq	: function (k) {
			if (set.length > k) {
				set	= [set[k]];
			} else {
				set = [];
			}
			return methods;
		},
		find	: function (s) {
			var config_unique	= this.config("unique");
			var ret	= [];
			set.forEach(function (node) {
				p.E(node).q(s).forEach(function (child) {
					if (!config_unique || ret.indexOf(child) === -1) {
						ret.push(child);
					}
				});
			});
			set = ret;
			return methods;
		},
		filter	: function (callback) {
			set = set.filter(function (node, k) {
				return (callback(node, k, set, p) || false);
			});
			return methods;
		},
		each	: function (callback) {
			set.forEach(function (node, k) {
				return (callback(node, k, set, p) || false);
			});
			return methods;
		},
		map	: function (callback) {
			set = set.map(function (node, k) {
				return (callback(node, k, set, p) || false);
			}).filter(function (node) {
				return ( node !== false );
			});
			return methods;
		},
		attr	: function (v) {
			var node;
			if (arguments.length === 0) {
				node	= this.get(0);
				return ( node !== null ? (node.attributes || []) : [] );
			} else if (arguments.length === 1 && typeof(v) === "string") {
				node	= this.get(0);
				return ( node !== null ? p.E(node)._('-'+v) : null );
			} else {
				set.forEach(function (node) {
					p.E(node).v.apply(p, arguments);
				});
				return methods;
			}
		}
	};

	["toFunction", "x" ].forEach(function (method) {
		methods[method]	= function () {
			var args	= arguments;
			var res_set	= set.map(function (node) {
				var er, ret = node, res = null;
				try {
					p.E(node);
					ret = p[method].apply(p, args);
				} catch(er) {
					ret = null;
				}
				return ret;
			});
			return methods;
		};
	});
	["sClass", "c" ].forEach(function (method) {
		methods[method]	= function () {
			var args	= arguments;
			var res_set	= set.map(function (node) {
				var er, ret = node, res = null;
				try {
					p.E(node);
					ret = p[method].apply(p, args);
				} catch(er) {
					ret = null;
				}
				return ret;
			});
			if ((args[1] || "") === "?") {
				return ( res_set[0] || null );
			}
			return methods;
		};
	});
	[ "g_wh", "r", "pagePXY", "PXY", "eventsCache", "in_e", "i", "is_free", "is_focused", "is_inview", "is_visible" ].forEach(function (method) {
		methods[method]	= function () {
			var args	= arguments;
			var res_set	= set.map(function (node) {
				var er, ret = node, res = null;
				try {
					p.E(node);
					ret = p[method].apply(p, args);
				} catch(er) {
					ret = null;
				}
				return ret;
			});
			if (args[0] === true) {
				return res_set;
			}
			if (res_set.length) {
				return res_set[0];
			}
			return null;
		};
	});

	[ "on", "off", "opacity", "a2D", "triger", "setVar", "T", "setStyle", "setStyleSPEED", "F", "f", "o", "removeFromDOM", "free", "d", "D", "clearE", "delE", "setVar", "setObjVar", "setObjProto", "V", "v", "p", "adEto", "putBfto", "putAfto", "putBf", "putAf", "Et", "Bt", "At", "pB", "pA", "addE", "addB", "addT", "e", "b", "t", "getTagsByQuery", "getTags", "s", "q", "nextTo", "backTo", "nUP", "nChild", "getParentN", "copyE", "getParentTag", "getByTag", "getByQuery", "getById", "N", "B", "U", "C", "P", "X", "p", "S", "Q", "I" ].forEach(function (method) {
		methods[method]	= function () {
			var config_unique	= this.config("unique");
			var args	= arguments;
			set	= set.map(function (node) {
				var er, ret = node;
				try {
					p.E(node);
					p[method].apply(p, args);
					ret = p._();
				} catch(er) {
					ret = null;
				}
				return ret;
			}).map(function (node) {
				if (Array.isArray(node)) {
					node.forEach(function (n) {
						if (!config_unique || set.indexOf(n) === -1) {
							set.push(n);
						}
					});
					return null;
				} else {
					return node;
				}
			}).filter(function (node) {
				return !!node;
			});
			return methods;
		};
	});

	if (v) {
		methods.set(v);
	}

	return methods;
};
var __	= function (v) { return new slDOMset(v || false); };

/** @type ApplicationPrototype.slDOM */
var slDOM=function(a,b){
if(!a)	a = null;	if(!b)	b = null;
if(a){this.newE=slDOMlib.newE(a);var e;try{switch(typeof(b)){case "function":((b)(this,a,this.newE));break;}}catch(e){}} else {this.newE=b;}
this.env	= slDOMlib.env;
this.__	= function(b){return ( b ? document : (this.newE ? this.newE : document)); };
this._i	= function(i,n){return ((n + (i % n))%n); };
this.a2D=slDOMlib.animate_2D;
this.opacity = slDOMlib.opacity;
this.setE=slDOMlib.setE;
this.sClass=slDOMlib.sClass;
this.setArg=slDOMlib.setArg;
this.adEto=slDOMlib.adEto;
this.putBfto=slDOMlib.putBfto;
this.putAfto=slDOMlib.putAfto;
this.putBf=slDOMlib.putBf;
this.putAf=slDOMlib.putAf;
this.addE=slDOMlib.addE;
this.addB=slDOMlib.addB;
this.addT=slDOMlib.addT;
this.nextTo=slDOMlib.nextTo;
this.backTo=slDOMlib.backTo;

this.nUP=slDOMlib.nUP;
this.nChild=slDOMlib.nChild; /*-2 array -1 last 0 first*/
this.getParentN=slDOMlib.getParentN;

this.clearE=slDOMlib.clearE;
this.delE=slDOMlib.delE;
this.copyE=slDOMlib.copyE;
this.getParentTag=slDOMlib.getParentTag;
this.getByTag=slDOMlib.getByTag;
this.getByQuery=slDOMlib.getByQuery;
this.getById=slDOMlib.getById;
this.getTags=slDOMlib.getTags;
this.getTagsByQuery=slDOMlib.getTagsByQuery;
this.triger=slDOMlib.triger;
this.getE=slDOMlib.getE;

this.setStyle=slDOMlib.setStyleSPEED;
this.setVar=slDOMlib.setVar;
this.setObjVar=slDOMlib.setObjVar;
this.setStyleSPEED=slDOMlib.setStyleSPEED;
this.pagePXY=slDOMlib.pagePosXY;
this.in_e=slDOMlib.in_e;
this.g_wh=slDOMlib.g_wh;
this.getLIST=slDOMlib.getLIST;
this.toFunction=slDOMlib.toFunction;
this.removeFromDOM = slDOMlib.removeFromDOM;

this.o=slDOMlib.opacity;
this.E=slDOMlib.setE;
this.c=slDOMlib.sClass;
this.attrs	= slDOMlib.attrs;
this.A=slDOMlib.setArg;
this.Et=slDOMlib.adEto;
this.Bt=slDOMlib.putBfto;
this.At=slDOMlib.putAfto;
this.pB=slDOMlib.putBf;
this.pA=slDOMlib.putAf;
this.e=slDOMlib.addE;
this.b=slDOMlib.addB;
this.t=slDOMlib.addT;
this.N=slDOMlib.nextTo;
this.B=slDOMlib.backTo;

this.U=slDOMlib.nUP;
this.C=slDOMlib.nChild; /*-2 array -1 last 0 first*/
this.P=slDOMlib.getParentN;

this.d=slDOMlib.clearE;
this.D=slDOMlib.delE;
this.X=slDOMlib.copyE;
this.p=slDOMlib.getParentTag;
this.S=slDOMlib.getByTag;
this.Q=slDOMlib.getByQuery;
this.I=slDOMlib.getById;
this.s=slDOMlib.getTags;
this.q=slDOMlib.getTagsByQuery;
this.T=slDOMlib.triger;
this._=slDOMlib.getE;
this.$=slDOMlib.getLIST;

this.F=slDOMlib.setStyleSPEED;
this.f=slDOMlib.setStyle;
this.L=slDOMlib.getLIST;
this.V=slDOMlib.setVar;
this.v=slDOMlib.setObjVar;
this.p=slDOMlib.setObjProto;
this.PXY=slDOMlib.pagePosXY;
this.i=slDOMlib.in_e;
this.r=slDOMlib.g_wh;
this.x=slDOMlib.toFunction;
this.free	= slDOMlib.removeFromDOM;
this.is_free	= slDOMlib.is_free;
this.is_focused	= slDOMlib.is_focused;
this.is_inview	= slDOMlib.elementInViewport;
this.is_visible	= slDOMlib.elementIsVisible;
this._normalizeCssValues	= slDOMlib._normalizeCssValues;
this.on	= slDOMlib.on;
this.off	= slDOMlib.off;
this.eventsCache	= slDOMlib.eventsCache;
return this;
};
var _=function(a,b){return new slDOM(a,b);};
/* jshint -W033 */
/* jshint -W041 */
slDOMlib={
env			: (function () {var gecko = /gecko\/\d/i.test(navigator.userAgent); var old_ie = /MSIE \d/.test(navigator.userAgent);var ie_lt8 = old_ie && (document.documentMode == null || document.documentMode < 8);var ie_lt9 = old_ie && (document.documentMode == null || document.documentMode < 9);var ie_gt10 = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);var ie = old_ie || ie_gt10;var webkit = /WebKit\//.test(navigator.userAgent);var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent);var chrome = /Chrome\//.test(navigator.userAgent);var opera = /Opera\//.test(navigator.userAgent);var firefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);var safari = /Apple Computer/.test(navigator.vendor);var khtml = /KHTML\//.test(navigator.userAgent);var mac_geLion = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent);var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);var phantom = /PhantomJS/.test(navigator.userAgent);var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);/* This is woefully incomplete. Suggestions for alternative methods welcome. */var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);var mac = ios || /Mac/.test(navigator.platform);var windows = /win/i.test(navigator.platform);var opera_version = opera && navigator.userAgent.match(/Version\/(\d*\.\d*)/);if (opera_version) opera_version = Number(opera_version[1]);if (opera_version && opera_version >= 15) { opera = false; webkit = true; };var android = /Android/.test(navigator.userAgent); var android_version = (parseFloat((navigator.userAgent.match(/Android[^\d\.\;]+([\d\.]+)/) || [])[1] || 0) || false);/* Some browsers use the wrong event properties to signal cmd/ctrl on OS X */var flipCtrlCmd = mac && (qtwebkit || opera && (opera_version == null || opera_version < 12.11));var captureMiddleClick = gecko || (ie && !ie_lt9);return { "gecko"	: gecko, "old_ie"	: old_ie,"ie_lt8"	: ie_lt8,"ie_lt9"	: ie_lt9,"ie_gt10"	: ie_gt10,"ie"	: ie,"webkit"	: webkit,"qtwebkit"	: qtwebkit,"chrome"	: chrome,"opera"	: opera,"firefox"	: firefox,"safari"	: safari,"khtml"	: khtml,"mac_geLion"	: mac_geLion,"mac_geMountainLion"	: mac_geMountainLion,"phantom"	: phantom,"ios"	: ios,"mobile"	: mobile,"mac"	: mac,"windows"	: windows,"opera_version"	: opera_version,"flipCtrlCmd"	: flipCtrlCmd,"captureMiddleClick"	: captureMiddleClick, "android" : android, "android_version" : android_version };})(),
/* jshint +W033 */
/* jshint +W041 */
is_focused	: function() { return ( document.activeElement == this.newE ); },
is_free		: function() { return !this.newE.parentElement; },
elementInViewport : function(allnode) { var el = this.newE; var top = el.offsetTop; var left = el.offsetLeft; var width = el.offsetWidth; var height = el.offsetHeight; while(el.offsetParent) { el = el.offsetParent; top += el.offsetTop; left += el.offsetLeft; }
	return ( allnode ? ( top >= window.pageYOffset && left >= window.pageXOffset && (top + height) <= (window.pageYOffset + window.innerHeight) && (left + width) <= (window.pageXOffset + window.innerWidth) ) : ( top < (window.pageYOffset + window.innerHeight) && left < (window.pageXOffset + window.innerWidth) && (top + height) > window.pageYOffset && (left + width) > window.pageXOffset ) ); },
elementIsVisible : function() {
	var el = this.newE; var eap, rect = el.getBoundingClientRect(), docEl = document.documentElement, vWidth = window.innerWidth || docEl.clientWidth, vHeight = window.innerHeight || docEl.clientHeight, efp = function (x, y) { return document.elementFromPoint(x, y); }, contains = "contains" in el ? "contains" : "compareDocumentPosition", has = contains == "contains" ? 1 : 0x10;
	/* Return false if it's not in the viewport */
	if( rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight )
		return false;
	/* Return true if any of its four corners are visible */
	return ( (eap = efp(rect.left,  rect.top)) == el || el[contains](eap) == has || (eap = efp(rect.right, rect.top)) == el || el[contains](eap) == has || (eap = efp(rect.right, rect.bottom)) == el || el[contains](eap) == has || (eap = efp(rect.left,  rect.bottom)) == el || el[contains](eap) == has );
},
removeFromDOM:function(){
	if(this.newE.parentElement)
		this.newE.parentElement.removeChild(this.newE);
	return this;
},
toFunction:function(f,v){
	var e;if(!v)	v = {};var p_node = this.newE;
	if(typeof(f) == "function")try{
		(f)(this.newE,v,this);
		} catch(e) {
			console.error('To Function Error: ',e);
		}
	this.newE	= p_node;
	return this;
},
opacity:function(t){var e;try{var t1=Math.floor(t*100);t=t1/100;this.newE.style.opacity = t;this.newE.opacity = t;this.newE.style.KhtmlOpacity = t;this.newE.style.MsFilter = "progid:DXImageTransform.Microsoft.Alpha(Opacity="+t1+")";this.newE.style.filter = "alpha(opacity="+t1+")";}catch(e){return this;}return this;},
setE:function(t) {if(typeof(t) == "string"){this.newE = document.createElement(t);} else {this.newE=t;} return this;},
in_e:function(t){var i = this.newE;if(!t) t = document.body;while(i){if(i === t) return true;i = i.parentNode;} return false;},
newE:function(t) {var e;try{return document.createElement(t);}catch(e){return false;}},
sClass:function(t,m,k) {var s = (this.newE.className || '');
	if (typeof(t) === "string") {
		if (t.match(/[\s\n\t]+/)) {
			t = t.split(/[\s\n\t]+/).filter(function () {
				return t.toLowerCase();
			});
			if (t.length === 0)
				return this;
		}
	}
	switch(m){
		case '+':if(Array.isArray(t)) { t.forEach(function(v) {s = s.add_Class(v);}); this.newE.className = s;} else { this.newE.className = s.add_Class(t);}
		break;
		case '-':if(Array.isArray(t)) { t.forEach(function(v) {s = s.del_Class(v);}); this.newE.className = s;} else { this.newE.className = s.del_Class(t); }
		break;
		case '~': if(!Array.isArray(t)) { this.newE.className = s.fnd_Class(t) ? s.del_Class(t) : s.add_Class(t); } else {
			this.newE.className = s.del_Class(t[0]).add_Class(t[1]); } break;
		case '?':
			if(!this.newE.className) {
				return false;
			}
			return s.fnd_Class(t);
		break;
	case '@':
		k = (parseInt(k, 10) || 0);
		var root	= this;
		var node	= this.newE;
		if (k >= 0) {
			root.sClass(t,'+');
			setTimeout(function () {
				var e = root.newE;
				root.setE(node).sClass(t,'-').setE(e);
			}, k);
		} else {
			root.sClass(t,'-');
			setTimeout(function () {
				var e = root.newE;
				root.setE(node).sClass(t,'+').setE(e);
			}, k);
		}
	break;
	default:
		this.newE.className=( Array.isArray(t) ? t.join(' ') : t);
	break;} return this;},
setArg:function(t){if(typeof(t)==="string"){k=arguments;}else{k=t;};var i;for(i=0;i<k.length;i+=2)if(k[i+1])this.newE[k[i]]=k[i+1];return this;},
attrs	: function(prefix){
	var i,o = {};var a = this.newE.attributes;
	for(i=0;i<a.length;i++)
		if(!prefix || a[i].name.indexOf(prefix) === 0)
		o[a[i].name]	= a[i].value;
	return o;
},
adEto:function(t){t.appendChild(this.newE);return this;},
putBfto:function(t){t.parentNode.insertBefore(this.newE,t);return this;},
putAfto:function(t){if(t.nextSibling){t.parentNode.insertBefore(this.newE,t.nextSibling);}else{t.parentNode.appendChild(this.newE);};return this;},
putBf:function(t,f,j){var e;try{if(!f)f='';
switch(f){case '_':this.newE.parentNode.insertBefore(t,this.newE);this.newE = t;break;
case '~':t=document.createElement(t);this.newE.parentNode.insertBefore(t,this.newE);this.newE = t;break;
default	:this.newE.parentNode.insertBefore(t,this.newE);break;};
if(j)switch(typeof(j)){
case "function":((j)(this,t,this.newE));break;
}}catch(e){};return this;},
putAf:function(t){var t0=this.newE.cloneNode(true);this.newE.parentNode.insertBefore(t0,this.newE);this.newE.parentNode.insertBefore(t,this.newE);this.newE.parentNode.removeChild(this.newE);this.newE=t0;return this;},
addE:function(t,f,j){var e;try{if(!f)f='';
switch(f){
case '_':this.newE.appendChild(t);this.newE = t;break;
case '~':t=document.createElement(t);this.newE.appendChild(t);this.newE = t;break;
default	:this.newE.appendChild(t);break;
};
if(j)switch(typeof(j)){
case "function":((j)(this,t,this.newE));break;
}
}catch(e){};return this;},
addB:function(t,f,j){
	if(this.newE.childNodes.length){
		var e;try{if(!f)f='';
		switch(f){
			case '~':t=document.createElement(t);
			case '_':this.newE.insertBefore(t,this.newE.childNodes[0]);this.newE = t;break;
			default	:this.newE.insertBefore(t,this.newE.childNodes[0]);break;
		};
		if(j)switch(typeof(j)){
			case "function":((j)(this,t,this.newE));break;
		}
		}catch(e){};return this;
	} else {
		return this.addE(t,f,j);
	};
},
addT:function(t){if(typeof(t)!="undefined")this.newE.appendChild(document.createTextNode(t));return this;},
nextTo:function(t) {var i;if(!t)t=1;for(i=0;i<t;i++)this.newE=this.newE.nextSibling;return this;},
backTo:function(t) {var i;if(!t)t=1;for(i=0;i<t;i++)this.newE=this.newE.previousSibling;return this;},
triger:function(t) {var e, evt;try{if(document.createEvent){evt = document.createEvent("HTMLEvents");evt.initEvent(t, true, true );/*bubbling,cancelable*/return !((this.newE).dispatchEvent(evt));} else {evt = document.createEventObject();return ((this.newE).fireEvent('on'+event,evt));}}catch(e){return 0;}},
nUP:function(){this.newE=this.newE.parentNode;return this;},
nChild:function(t){if(!t)t=0;if(t==-4){if(this.newE.childNodes.length)if(this.newE.childNodes[this.newE.childNodes.length-1]) this.newE = this.newE.childNodes[this.newE.childNodes.length-1];}else if(t==-3){return this.newE.childNodes;}else if(t==-2){this.newE=this.newE.childNodes;} else if(t==-1){this.newE=this.newE.lastChild;} else {this.newE=this.newE.childNodes[t];};return this;},
getParentN:function(t){if(!t)t=1;var i;for(i=0;i<t;i++)if(this.newE.parentNode)this.newE=this.newE.parentNode;return this;},

clearE:function(){var e;try{while(this.newE.childNodes[0])this.newE.removeChild(this.newE.childNodes[0]);}catch(e){};return this;},
delE:function(){var e;try{this.newE.parentNode.removeChild(this.newE);}catch(e){};return true;},
copyE:function(t){this.newE=this.newE.cloneNode(true);return this;},
getParentTag:function(t){var i = getParentByTagName(this.newE,t.toLowerCase());if(i)this.newE = i;return this;},
getByTag:function(t,i,a,c){if(!i)i=0;var r=this.__(a).getElementsByTagName(t);if(c && !r[this._i(i,r.length)]) return false;this.newE=r[this._i(i,r.length)];return this;},
getByQuery:function(t,i,a,c){if(!i)i=0;var r=(this.__(a)[i === 0 ? 'querySelector' : 'querySelectorAll'])(t);if(i===0){if(c && !r) return false;this.newE = r;return this;};if(c && !r[this._i(i,r.length)]) return false;this.newE=r[this._i(i,r.length)];return this;},
getById:function(t){var e;try{this.newE=document.getElementById(t);}catch(e){};return this;},
getTags:function(t,a){if(!t) return this;
if(arguments.length > 1 && typeof(a) == "string"){var i,r=[],k=arguments;for(i=0;i<k.length;i++)if(typeof(k[1]) == "string"){r.push(this.__(a).getElementsByTagName(k[i]));};return r;};return [].slice.apply(this.__(a).getElementsByTagName(t));
},
getTagsByQuery:function(t,a){if(!t) return this;
if(arguments.length > 1 && typeof(a) == "string") {var i,r=[],k=arguments;for(i=0;i<k.length;i++)if(typeof(k[1]) == "string"){r.push(this.__(a).querySelectorAll(k[i]));};return r;};return [].slice.apply(this.__(a).querySelectorAll(t));
},
getLIST:function(o,a,f,v){
	if(!a)a=0;
	var p_node	= this.newE;
	var p_root	= ( a ? document : p_node );
	if(typeof(o) == 'string') {
		var i,L	= p_root.querySelectorAll(o);
		for(i=0;i<L.length;i++)	((f)(L[i],p_node,i,v ? v : {},false,this,L));
		this.newE	= p_node;
		return this;
	}
	if(!('tags' in o))o.tags = {};
	if(!('func' in o))o.func = function(e,p_node,k_index,o_vars,tag,p){};
	if(!('vars' in o))o.vars = {};
	if(typeof(o.func) != "function") o.func = function(e,p_node,k_index,o_vars,tag,p){};
	if(!('sele' in o))o.sele = function(){return true;};
	var j,i,n,L,e,f;
	for(i in o.tags){
		f = false;L = p_root.getElementsByTagName(i);
		if(typeof(o.tags[i]) == "function") f=true;
		for(j=0;j<L.length;j++)try{if(((o.sele)(L[j]))){if(f){((o.tags[i])(L[j],p_node,j,o.vars,i,this));};((o.func)(L[j],p_node,j,o.vars,i,this));}}catch(e){}
	};
	this.newE	= p_node;
	return this;
},
getE:function(t) {if(t)switch(t){
case '.tag':	return (this.newE.tagName ? this.newE.tagName : (this.newE.nodeName ? this.newE.nodeName : '')).toLowerCase();	break;
case '.html':	return this.newE.innerHTML;	break;
case '.text':	return (this.newE.innerText || this.newE.textContent); break;
default	:
	var e;
	switch(t.substr(0,1)) {
		case '-':
			return this.newE.getAttribute(t.substr(1));
		break;
		case '!': // remove if exist
			try {
				this.newE.removeAttribute(t.substr(1));
			} catch(e) {};
			return this;
		break;
	};
break;
};return this.newE;},
setStyle:function(){var j,i,e,r={},l={
borderRadius:{WebkitBorderRadius:false,MozBorderRadius:false,borderRadius:false},
boxShadow:{WebkitBoxShadow:false,MozBoxShadow:false,boxShadow:false},
transform:{OTransform:false,MozTransform:false,WebkitTransform:false,MsTransform:false,transform:false},
transformOrigin:{OTransformOrigin:false,MsTransformOrigin:false,MozTransformOrigin:false,WebkitTransformOrigin:false,transformOrigin:false}
};
var n,t;for(n=0;n<arguments.length;n++) {
t = arguments[n];
for(i in t)if(i in l){
		if(typeof(l[i]) == "function") {
			((l[i])(i,t[i],this));
		} else {
			for(j in l[i])
				this.newE.style[j] = slDOMlib._normalizeCssValues(j,(typeof(l[i][j]) == "function" ? ((l[i][j])(i,t[i],this)) : (l[i][j] !== false ? l[i][j] : t[i])));
		}
	}else{this.newE.style[i]=t[i];};}
return this;},
setVar:function(t){var o=this.newE;var j,e=o,i,k=arguments,v_check = true;for(i=0;i<k.length;i++)if(typeof(k[i])=="string"){if (k[i] === "style") {i++;if(k[i]) {this.E(e).F(k[i]);}} else { e=e[k[i]]; }}else for(j in k[i])
	if( v_check ) {
		var b = false;
		switch(j) {
			case 'innerHTML':
				b = ((""+e[j]).fromHtml() != (""+k[i][j]).fromHtml());
			break;
			default:
				b = (e[j] !== k[i][j]);
			break;
		};
		if(b) e[j]=k[i][j];
		if (["type"].indexOf(j) !== -1 && (e instanceof Element)) {
			e.setAttribute(j, k[i][j]);
		}
	} else { e[j]=k[i][j];};this.newE=o;return this;},
setObjVar:function(t){var m,j,i,k=arguments,v_check = true;
		for(i=0;i<k.length;i++)if(typeof(k[i])=="object") {
			for(j in k[i])try{if(k[i][j] == null){	this.newE.removeAttribute(j);
						} else {if( !v_check || this.newE.getAttribute(j) !== ""+k[i][j] ) this.newE.setAttribute(j, k[i][j])	}}catch(m){};
		} else {
			switch(k[i]) {
				case 'check-enabled':
					v_check	= true;
				break;
				case 'check-disabled':
					v_check	= false;
				break;
			};
		};
					return this;
		},
setObjProto:function(t){var m,j,i,k=arguments;for(i=0;i<k.length;i++)if(typeof(k[i])=="object")
		for(j in k[i])try{if(k[i][j] == null){
			if('prototype' in this.newE) {
				if(j in this.newE.prototype) delete this.newE.prototype[j];
			} else if('__proto__' in this.newE) {
				if(j in this.newE.__proto__) delete this.newE.__proto__[j];
			}
		} else {
			if('prototype' in this.newE) {
				this.newE.prototype[j] = k[i][j]
			} else if('__proto__' in this.newE) {
				this.newE.__proto__[j]	= k[i][j];
			}
		}
		}catch(m){};
	return this;
	},
_updateCssPoperty	: function(node,cssPoperty,cssValue,check) {
	if( !check ) {
		node.style[cssPoperty]	= cssValue;
	} else {
		var n = 'csscache-'+cssPoperty;
		if( node.getAttribute(n) != cssValue ) {
			node.setAttribute(n,cssValue);
			node.style[cssPoperty]	= cssValue;
		}
	};
	return true;
},
setStyleSPEED:function(t,v_check) {
var i,e;for(i in t)try{ slDOMlib._updateCssPoperty(this.newE,i,slDOMlib._normalizeCssValues(i,t[i]),v_check ? true : false); }catch(e){};return this;},
_normalizeCssValues_px	: {
	height:1,maxHeight:1,minHeight:1,
	width:1,maxWidth:1,minWidth:1,
	top:1,right:1,bottom:1,left:1,
	margin:1,padding:1,
	border:1,borderRadius:1,borderLeft:1,borderRight:1,borderTop:1,borderBottom:1,
	fontSize:1
},
_normalizeCssValues: function(a,v){
	if(v == 'inherit')
		return v;
	if(a in slDOMlib._normalizeCssValues_px) {
		if(typeof(v) == "number")	return v + "px";
		if(typeof(v) == "string") {
			if(v.match(/^\d+$/))	return v + "px";
			return v.replace(/(^|[\s\,])(\d+)(?=[\s\,]|$)/g,'$1$2px');
			/*.replace(/(^|[^\x23a-z])(\d+)([\s\,]|$)/g,'$1$2px$3');*/
			/* return v.replace(/^(\d+)([\s\,])/g,'$1px$2').replace(/([^\x23a-z])(\d+)([\s\,\)])$/gi,'$1$2px$3'); */
		}
	}
	return v;
},
pagePosXY:function(){var k,e=this.newE, b = false;try{if(typeof(e.offsetParent)!='undefined'){for(var posX=0,posY=0;e;e=e.offsetParent){posX+=e.offsetLeft;posY+=e.offsetTop;};e=this.newE;for(;e;e=e.parentElement) if (b) { posY -= (e.scrollTop || 0);posX -= (e.scrollLeft || 0);} else { b = true; };return {x:posX,y:posY};}else{return {x:e.x,y:e.y};}}catch(k){return {x:0,y:0}}},
g_wh:function(){var e = this.newE;var r = {};r.h = e.innerHeight ? e.innerHeight : (e.clientHeight ? e.clientHeight : (e.offsetHeight ? e.offsetHeight : (e.scrollHeight ? e.scrollHeight : 1)));r.w = e.innerWidth ? e.innerWidth : (e.clientWidth ? e.clientWidth : (e.offsetWidth ? e.offsetWidth : (e.scrollWidth ? e.scrollWidth : 1)));return r;},
animate_2D : function(obj){
	var e, unit;try{
	var s='',i,j,v,r = ['transform','OTransform','MsTransform','MozTransform','WebkitTransform'];
	var d = {skew:[0,0],scale:[1,1],translate:[0,0],rotate:0,rotateY:0,rotateX:0,scaleX:1,scaleY:1,skewX:0,skewY:0,translateX:0,translateY:0,translateZ:0,matrix:[1,0,0,1,0,0]}
	for(i=0;i<r.length;i++) if(r[i] in this.newE.style) s = this.newE.style[r[i]];
	for(i in obj){
	switch(i){
		case 'rotate':	case 'rotateY': case 'rotateX': case 'rotateZ':
		case 'scaleX':	case 'scaleY':
		case 'skewX':	case 'skewY': case 'skewZ':
		case 'translateX':	case 'translateY':	case 'translateZ':
			eval('v = s.match(/'+i+'\\s*\\(\\s*([\\-0-9\\.]+)\\s*([a-z\\x25]*)\\)/);');
			if (i.match(/^(skew|rotate)/)) {
				unit	= 'deg';
			} else if (i.match(/^translate/)) {
				unit	= 'px';
			} else {
				unit	= '';
			}
			if(v == null) {
				v = d[i];
			} else {
				if (i.match(/^translate/) && v[2].match(/^([a-z]{2}|\x25)$/)) {
					unit	= v[2];
				}
				v = Math.floor(parseFloat(v[1])*10)/10;
			};
			if (typeof(obj[i]) === "string") {
				j = obj[i].match(/([a-z]{2}|\x25)$/g)
				if (i.match(/^translate/) && j) {
					if (j && j[0] !== unit) {
						unit	= j[0];
						v		= d[i];
					}
				}
				if(obj[i].subs(0,1) in {'+':'','-':''}){
					v += parseFloat(obj[i]);
				} else {
					v = parseFloat(obj[i]);
				}
			} else {
				v = parseFloat(obj[i]);
			};
			v = (typeof(v) == "number" ? v : 0);
			eval('s = s.replace(/'+i+'\\s*\\(.*?\\)/gi,"")');
			s+=' '+i+'('+v+''+unit+')';
		break;
		case 'skew': case 'translate': case 'scale':
			if(!Array.isArray(obj[i])) if(i == 'scale'){	v = [obj[i],obj[i]];obj[i] = v;	} else {	break;	};
			if(obj[i].length < 2) break;
			eval('v = s.match(/'+i+'\\s*\\(\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*\\,\\s*([\\-0-9\\.]+)\\s*[a-z\\x25]*\\s*\\)/);');
			if(v == null) {	v = d[i];
			} else {	j = [];
					j[1] = Math.floor(parseFloat(v[1])*10)/10;
					j[2] = Math.floor(parseFloat(v[2])*10)/10;
					v = [j[1],j[2]];
			};
			for(j=0;j<v.length;j++){
			if(typeof(obj[i][j]) == "string"){
				if(obj[i][j].subs(0,1) in {'+':'','-':''}) {
					v[j] += parseFloat(obj[i][j]);
				} else {
					v[j] -= parseFloat(obj[i][j]);
				}
			} else {
				v[j] = parseFloat(obj[i][j]);
			};
			v[j] = (typeof(v[j]) == "number" ? v[j] : 0);
			};
			eval('s = s.replace(/'+i+'\\s*\\(.*?\\)/gi,"")');
			s+=' '+i+'('+v[0]+''+(i in {skew:1} ? 'deg' : '')+','+v[1]+''+(i in {skew:1} ? 'deg' : '')+')';
		break;
		case 'matrix':
			if(!Array.isArray(obj[i])) break;
			if(obj[i].length < 6) break;
			eval('v = s.match(/'+i+'\\s*\\(\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*\\,\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*,\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*,\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*,\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*,\\s*([\\-0-9\\.]+)\\s*[a-z]*\\s*\\)/);');
			if(v == null) {	v = d[i];
			} else {	j = [];
					j[1] = Math.floor(parseFloat(v[1])*10)/10;
					j[2] = Math.floor(parseFloat(v[2])*10)/10;
					j[3] = Math.floor(parseFloat(v[3])*10)/10;
					j[4] = Math.floor(parseFloat(v[4])*10)/10;
					j[5] = Math.floor(parseFloat(v[5])*10)/10;
					j[6] = Math.floor(parseFloat(v[6])*10)/10;
					v = [j[1],j[2],j[3],j[4],j[5],j[6]];
			};
			for(j=0;j<v.length;j++)
			if(typeof(obj[i][j]) == "string") if(obj[i][j].subs(0,1) in {'+':'','-':''}){
				v[j] += parseFloat(obj[i][j]);
			} else {
				v[j] -= parseFloat(obj[i][j]);
				v[j] = (typeof(v[j]) == "number" ? v[j] : '');
			};
			eval('s = s.replace(/'+i+'\\s*\\(.*?\\)/gi,"")');
			s+=' '+i+'('+v.join(',')+')';
		break;
	};
	};
	for(i=0;i<r.length;i++) if(r[i] in this.newE.style) this.newE.style[r[i]] = s;
	} catch(e){return this;};	return this;	},
	"eventsCache"	: function () {
		var eventsKey		= "slDOMevents_cache";
		var eventsHolder	= (window || this);
		if (!(eventsKey in eventsHolder)) {
			eventsHolder[eventsKey] = {};
		}
		return eventsHolder[eventsKey];
	},
	"on" : function(eventName, handler, handlerAlias) {
		var eventsCache		= this.eventsCache();
		if (!(eventName in eventsCache)) {
			eventsCache[eventName]  = {};
		}
		if (!handlerAlias) {
			handlerAlias   = getRandId("event-handler-"+eventName+"-");
		}
		var handlerId   = addEvent(this.newE, eventName, handler);
		if (!(handlerAlias in eventsCache[eventName])) {
			eventsCache[eventName][handlerAlias]    = [];
		}
		eventsCache[eventName][handlerAlias].push({
			node        : this.newE,
			handlerId   : handlerId
		});
		return this;
	},
	"off"   : function(eventType, handlerAlias, fromAll) {
		var eventsCache	= this.eventsCache();
		var eventName;
		for (eventName in eventsCache) {
			if (eventType && eventType !== eventName) {
				continue;
			}
			if (!handlerAlias) {
				var i;
				if (fromAll) {
					for (i in eventsCache[eventName]) {
						eventsCache[eventName][i].forEach(function (group) {
							var er;
							try {
								removeEvent(group.node, eventName, group.handlerId);
							} catch(er) {
								console.warn("Error removing Event ",eventName,"[",handlerAlias,"] from ", group);
							}
						});
						delete eventsCache[eventName][i];
					}
				} else {
					var node	= this.newE;
					for (i in eventsCache[eventName]) {
						eventsCache[eventName][i]	= eventsCache[eventName][i].forEach(function (group) {
							if (group.node === node) {
								var er;
								try {
									removeEvent(group.node, eventName, group.handlerId);
								} catch(er) {
									console.warn("Error removing Event ",eventName,"[",handlerAlias,"] from ", group);
								}
								return false;
							}
							return true;
						});
					}
				}
			} else if (handlerAlias in eventsCache[eventName]) {
				if (fromAll) {
					eventsCache[eventName][handlerAlias].forEach(function (group) {
						var er;
						try {
							removeEvent(group.node, eventName, group.handlerId);
						} catch(er) {
							console.warn("Error removing Event ",eventName,"[",handlerAlias,"] from ", group);
						}
					});
					delete eventsCache[eventName][handlerAlias];
				} else {
					var node    = this.newE;
					eventsCache[eventName][handlerAlias]    = eventsCache[eventName][handlerAlias].filter(function (group) {
						if (group.node === node) {
							var er;
							try {
								removeEvent(group.node, eventName, group.handlerId);
							} catch(er) {
							console.warn("Error removing Event ",eventName,"[",handlerAlias,"] from ", group);
							}
							return false;
						}
						return true;
					});
				}
			}
		}
		return this;
	}
};

function getParentByTagName(obj, tag){var obj_parent = obj.parentNode;if (!obj_parent) return obj;if (obj_parent.tagName.toLowerCase() == tag) return obj_parent;else return getParentByTagName(obj_parent, tag);}

_public._	= _;
_public.__	= __;

if (document)
((function () {
	_public.fn.mouse.touchEventsAsClicks = true;
	var eventsList	= ["touchmove", "touchstart", "touchend", "touchleave"];
	var p			= _();
	var handler		= function (evt) {
		if (_public.fn.mouse.touchEventsAsClicks) {
			// if (!p.env.mobile) {
			// 	evt.preventDefault();
			// }
			if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
			return;
			var newEvt = document.createEvent("MouseEvents");
			var type = null;
			var touch = null;
			switch (evt.type) {
				case "touchstart"	: type = "mousedown";	touch = evt.changedTouches[0];break;
				case "touchmove"	: type = "mousemove";	touch = evt.changedTouches[0];break;
				case "touchend"		: type = "mouseup";		touch = evt.changedTouches[0];break;
				case "touchleave"	: type = "mouseleave";	touch = evt.changedTouches[0];break;
			}
			newEvt.initMouseEvent(type, true, true, evt.target.ownerDocument.defaultView, 0,
			touch.screenX, touch.screenY, touch.clientX, touch.clientY,
			evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
			evt.target.dispatchEvent(newEvt);
		}
	};
	p	= _().E(window);
	eventsList.forEach(function (v) {
		p.on(v, handler);
	});
})());

;((function(){
var e,o={
subs	: function(p,i){
if(p < 0) return this.substring(this.length+p,( typeof(i) == "number" ? this.length+p+i : this.length ));
if((i === 0 || i < 0) && p >=0) return this.substring(p,this.length+i);
if(!i)	return this.substring(0,p);
return this.substring(p,p+i);
},
toHex : function(utf8) {
	var s=this;var r="",e=s.length,c=0,h;
	while(c<e) {
		h=s.charCodeAt(c++).toString(16);
			if(h.length % 2 != 0) {
				if( utf8 || typeof(utf8) == "undefined" ) {
					h=encodeURIComponent(s.charAt(c-1)).split('%').join('');
				} else {
					h = escape(s.charAt(c-1)).replace(/\%u/g,'').replace(/\%/g,'');
				};
				if( h.length % 2 ) h = "0"+h;
			};
			r+=h;
		};
	return r;
},
fromHex : function(){var s=this;if(s.length % 2)s='0'+s;var e;try{return unescape(s.replace(/([0-9A-Fa-f]{2})/gi,'%$1'));}catch(e){return '';}},
toHtmlSimple	: function() { return this.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#039;"); },
toHtml : function(){return escape(this).replace(/\%u([0-9a-f]{4})/gi,'&#x$1;').replace(/\%([0-9a-f]{2})/gi,'&#x$1;').replace(/\&\#x20\;/gi,' ')},
fromHtml : function(){var e = document.createElement('div');e.innerHTML = '<textarea>'+this.replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'</textarea>';return e.getElementsByTagName('textarea')[0].value;},
cleanTags	: function() {
	return this.replace(/\<\!\-\-[\s\S]*?\-\-\>/g,' ').replace(/\<(script|iframe|style|object|noscript|frame|frameset)[^\>]*?\>[\s\S]*?\<\/\1.*?\>/gi,'').replace(/\<[^\>]*\>/g,' ').replace(/\s{2,}/g,' ').fromHtml()
},
add_Class : function(x){
	var c	= (x + '');
	var cl	= c.toLowerCase();
	var founded	= false;
	var list= this.split(/[\n\s\t]+/);
	list.forEach(function (v) {
		if (!founded) founded	= (v.toLowerCase() === cl);
	});
	if (!founded) {
		list.push(c);
	}
	return list.join(' ');
},
del_Class : function(x){
	var c	= (x + '');
	var cl	= c.toLowerCase();
	var founded	= false;
	return this.split(/[\n\s\t]+/).filter(function (v) {
		return (v.toLowerCase() !== cl);
	}).join(' ');
},
fnd_Class : function(x){
	var c	= (x + '');
	var cl	= c.toLowerCase();
	var founded	= false;
	var list= this.split(/[\n\s\t]+/);
	list.forEach(function (v) {
		if (!founded) founded	= (v.toLowerCase() === cl);
	});
	return founded;
},
swp_case : function(){return this.replace(/([a-z]+)|([A-Z]+)/g,function($0,$1,$2){return ($1) ? $0.toUpperCase() : $0.toLowerCase();})},
ucfirst : function(k){ if(!k) k=1; return this.subs(0,k).toUpperCase()+this.subs(k,0);},
lcfirst : function(k){ if(!k) k=1; return this.subs(0,k).toLowerCase()+this.subs(k,0);},
utf8need : function() {
	if( escape(this).match(/\%u[a-zA-Z0-9]{4}/) ) return this.utf8encode();
	return this;
},
utf8encode : function() {
	var e;try {
		return unescape( encodeURIComponent( this ) );
	} catch(e) {};
	return this.replace(/[\u0080-\u07ff]/g,function(c){var cc = c.charCodeAt(0);return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f);}).replace(/[\u0800-\uffff]/g,function(c){var cc = c.charCodeAt(0);return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f);});},
utf8decode : function(strUtf) {
	var e;try {
		return decodeURIComponent( escape( this ) );
	} catch(e) {};
	return this.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);return String.fromCharCode(cc);}).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){return String.fromCharCode((c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f);});},
toRegexp : function(flags){
	if(!flags) flags	= '';
	var e,r = false;try {
		eval("r = "+(this.match(/^\//) ? this : '/'+this+'/')+""+flags+" ;");
	} catch(e) { r = false; };
	return r;
},
escapeHex	: function() { return escape(this).replace(/\%u/g,'\\u').replace(/\%/g,'\\x') },
escape		: function() { return escape(this); },
encodeURI	: function() { return encodeURIComponent(this); },
unescape	: function() { return unescape(this); },
decodeURI	: function() { return decodeURIComponent(this); },
parseUrlVars	: function(json,params) {
	if(!params) params = {
		keepOBJ	: false,
		isURL	: false
	};
	var s = this;
	json	= !!json;
	if(params.isURL) s.replace(/^[\s\S]*?\?/,'');
	var r = {},p = s.split('&');
	p.forEach(function(v){
		var m,v;
		if(m = v.match(/^([^\=]+)\=([\s\S]*)$/)) {
			k = m[1];
			v = m[2];
			if(!json) {
				r[k]	= (v).decodeURI();
			} else {
				var a = [];
				var p = /^(\[([^\]]*)\]|([^\[]+))/,y;
				while( y = k.match(p) ) {
					if(!y[0]) break;
					k = k.replace(p,'');
					if(typeof(y[2]) != "undefined") {
						a.push(y[2]);
					} else {
						a.push( y[2] || y[3] );
					};
				};
				a = a.map(function(v) { if((""+v).match(/[^0-9]/))return '"'+(""+v).escapeHex()+'"'; return ""+v; });
				a.forEach(function(k,i,ar){
					var l;
					if(i > 0) {
						eval('l = r['+a.slice(0,i).join('][')+']');
					} else {
						l = r;
					};
					if(k == '') {
						if(Array.isArray(l)) {
							k	= l.length;
						} else if( typeof(l) == "object" ) {
							k = 0;
							var i,n;for(i in l)
							if((""+i).match(/^\d+$/)) {
								n	= parseInt(i);
								if(k <= n)
									k = n+1;
							}
						};
						a[i] = k;
					};
					// transform array to obj
					if(Array.isArray(l) && (""+k).match(/[^0-9]/)) {
						var t = {},n;
						for(n=0;n<l.length;n++)
							t[n]	= l[n];
						eval('r['+a.slice(0,i).join('][')+'] = t;');
					};
					if( i == a.length-1 ) {
						eval('r['+a.slice(0,i+1).join('][')+'] = v.decodeURI();');
					} else {
						eval('if(typeof(r['+a.slice(0,i+1).join('][')+']) == "undefined" || typeof(r['+a.slice(0,i+1).join('][')+']) == "string") r['+a.slice(0,i+1).join('][')+'] = '+( params.keepOBJ ? '{}' : '[]' )+';');
					};
				});
			};
		}
	});
	return r;
},
parseUrl	: function(k) {
	var url	= this;
	var domain	= url.split('//');
	domain	= (''+domain[1]).split('/');
	domain	= domain[0];
	var o	= {
		original	: url,
		origin	: url.replace(/^(.*?\/\/[^\/]+)[\s\S]*?$/,'$1'),
		domain	: domain,
		domain_short	: domain.replace(/^www\./,''),
		pathname: url.replace(/(\?|\x23)[\s\S]*$/,'').replace(/^.*?\/\/[^\/]+/,''),
		reqQuery	: url.replace(/^[^\?]*(\?|)/,'').replace(/\#[\s\S]*$/,''),
		protocol: url.split('://')[0],
		protocoll: url.split('://')[0]+'://',
		url		: url.replace(/\/+$/gi,'').replace(/^.*?\/\//gi,''),
		url_p		: url.replace(/\/+$/gi,''),
		isIp	: domain
	};
	if(k == 'get_vars' || k === true)
		o['get_vars']	= o.reqQuery.parseUrlVars(true);
	if( k && k !== true ) {
		if(k in o)
			return o[k];
		return false;
	};
	return o;
},
match_str	: function(str,flags){
	return this.match((""+str).toRegexp(flags ? flags : ""));
},
sha1 : function(utf8){return Sha1.hash(this,( utf8 || typeof(utf8) == "undefined" ) ? true : false)},
sha256 : function(utf8){return Sha256.hash(this,( utf8 || typeof(utf8) == "undefined" ) ? true : false)},
md5	: function() { return MD5(this);},
base64encode	: function() { return btoa(this.utf8need()); },
base64decode	: function() { return atob(this).unicode(); },
base64encodeBytes	: function() { return base64Binary.encodeBytes(this); },
base64encodeBytesArray	: function() { return Array.prototype.slice.call(this.base64encodeBytes()); },
base64decodeBytes	: function() { return base64Binary.decode(this); },
base64decodeBytesArray	: function() { return Array.prototype.slice.call(this.base64decodeBytes()); },
base64encodeClean	: function() { return btoa(this); },
base64decodeClean	: function() { return atob(this); },
encryptTea	: function(p) { return Tea.encrypt(this,p); },
decryptTea	: function(p) { return Tea.decrypt(this,p); },
encryptAes	: function(p,b) { return Aes.Ctr.encrypt(this,p,b ? b : 128); },
decryptAes	: function(p,b) { return Aes.Ctr.decrypt(this,p,b ? b : 128); },
buildQuery	: function() {
	var r	= /^\s*([a-z]+)\:\s*(\S[^\:]*?|)\s*(\s[a-z]+\:.*|)$/i
	var s = this, o = { "_keys" : [] }, m, k, f = s.split(/([a-z]+)\:/i);
	if( m = f[0].match(/^\s*(\S[\s\S]*?)\s*$/) ) {
		o["_keys"].push("_");
		o['_']	= m[1];
	};
	f = s.substring(f[0].length,s.length);
	while( m = f.match(r) ) {
		o[k = m[1].toLowerCase()]	= m[2];
		o["_keys"].push(k);
		f = f.split(m[0]).join(m[3]);
	};
	return o;
},
buildSearchArray	: function() {
	var s = this,m,a = [];
	while( m = s.match(/(\"[^\"]+\"|\'[^\']+\'|\S+)/) ) {
		a.push(m[1].replace(/^(\"|\')([\s\S]+)?\1/,'$2'));
		s = s.split(m[0]).join('');
	};
	return a;
}
};
o.utf8	= o.utf8encode;
o.unicode = o.utf8decode;
o.toArrayBufferFromUtf8	= function () {
	var buf = new ArrayBuffer(this.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=this.length; i < strLen; i++) {
		bufView[i] = this.charCodeAt(i);
	}
	return buf;
};
var i;for(i in o) {
	Object.defineProperty(
		String.prototype,
		i,
		{
			value: o[i],
			writable: false,
			configurable: true,
			enumerable: false
		}
	);
}
})());

((function(){
	var o = {
		/*
			comparator example:
			function(a,array_item) {
				return a === array_item
			}
		*/
		"min"	: function () {
			var min	= null;
			this.forEach(function (v, k, arr) {
				if (k == 0) {
					min	= v;
				} else {
					if (v < min) {
						min = v;
					}
				}
			});
			return min;
		},
		"shuffle"	: function () {
			return this.sort(function() {
				return 0.5 - Math.random();
			});
		},
		"max"	: function () {
			var max	= null;
			this.forEach(function (v, k, arr) {
				if (k == 0) {
					max	= v;
				} else {
					if (v > max) {
						max = v;
					}
				}
			});
			return max;
		},
		"move" : function(from, to) {
			if (from > this.length) return this;
			this.splice(to, 0, this.splice(from, 1)[0])
			return this;
		},
		"inArray"	: function(a,comparator) {
			if(!comparator) comparator	= '===';
			if( typeof(comparator) === "string" )
			switch(comparator) {
				case '===': comparator	= function(a,b) { return a === b ; }; break;
				case '==': comparator	= function(a,b) { return a == b ; }; break;
			};
			var i;for(i=0;i<this.length;i++) if(comparator(a,this[i])) return true;
		},
		"split"	: function (elem, num, cmp) {
			var k, j = 0, n, lines = [], data = this, len = (cmp ? (elem.length ? elem.length : 1) : 1);
			while ((k = data[cmp ? cmp : "indexOf"](elem, j)) !== -1) {
				if (num && lines.length >= num - 1) { break; }
				lines.push(data.slice(j, k));
				j	= k + len;
			}
			lines.push(data.slice(j, data.length));
			return lines;
		},
		"splitSect"		: function(elem, num) {
			return this.split(elem, (num || 0), "indexOfSect");
		},
		"toBlob" : function (mimetype, sliceSize) {
			return _public.fn.base64toBlob(
				this.base64encode(),
				mimetype || this.type || "application/octet-binary",
				sliceSize
			);
		},
		"base64encode" : function () {
			return base64Binary.encode(this);
		},
		"toBinaryString" : function () {
			return this.toBytesBinary().join('');
		},
		"toBytesBinary" : function () {
			return this.map(function (v) { return unescape('%' + ( v < 16 ? '0' : '' ) + v.toString(16)); });
		},
		"toBytesEscaped" : function () {
			return this.map(function (v) { return '%' + ( v < 16 ? '0' : '' ) + v.toString(16); });
		},
		"bytesToHex"    : function() {
			return this.map(function (v) { return ( v < 16 ? '0' : '' ) + v.toString(16); });
		},
		"toParamObj"	: function() { var o = {};this.forEach(function(e,i,a) { if( i % 2 == 0 ) o[e] = ( i == a.length-1 ? null : a[i+1] ); });return o; },
		"resetArray"	: function() {return this.filter(function(v) { return ( typeof(v) != "undefined" ); })},
		"indexOf" : function (searchElement, fromIndex) {
			if ( this === undefined || this === null ) {
				throw new TypeError( '"this" is null or not defined' );
			}
			var length = this.length >>> 0; // Hack to convert object.length to a UInt32
			fromIndex = +fromIndex || 0;
			if (Math.abs(fromIndex) === Infinity) {
				fromIndex = 0;
			}
			if (fromIndex < 0) {
				fromIndex += length;
				if (fromIndex < 0) {
					fromIndex = 0;
				}
			}
			var cmp	= function(data, i, node) {
				var b = false;
				if (node.length) {
					var j, b = true;
					for (j = 0;j<node.length;j++) {
						if (typeof(data[i+j]) === "undefined" || data[i+j] !== node[j])
							b = false;
					}
				} else {
					b	= (data[i] === node);
				}
				return b;
			}
			for (;fromIndex < length; fromIndex++) {
				if (cmp(this, fromIndex, searchElement)) {
					return fromIndex;
				}
			}
			return -1;
		},
		"lastIndexOf" : function(searchElement /*, fromIndex*/) {
			if (this === void 0 || this === null) {
				throw new TypeError();
			}
			var n, k,
					t = Object(this),
					len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			n = len - 1;
			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) {
					n = 0;
				}
				else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			for (k = n >= 0
						? Math.min(n, len - 1)
						: len - Math.abs(n); k >= 0; k--) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		},
		"findIndex"	: function(predicate) {
			if (this == null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				if (i in list) {
					value = list[i];
					if (predicate.call(thisArg, value, i, list)) {
						return i;
					}
				}
			}
			return -1;
		},
		"find"	: function(predicate) {
			if (this == null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				if (i in list) {
					value = list[i];
					if (predicate.call(thisArg, value, i, list)) {
						return value;
					}
				}
			}
			return undefined;
		},
		"unique"	: function () {
			return this.filter(function (v, k, arr) { return arr.indexOf(v) === k; });
		}
	};
	o.indexOfSect	= o.indexOf;
	var i;for(i in o) {
		if (!(i in Array.prototype)) {
			Object.defineProperty(
				Array.prototype,
				i,
				{
					value: o[i],
					writable: false,
					configurable: true,
					enumerable: false
				}
			);
		}
	};
})());

;((function () {
	if (typeof(ArrayBuffer) !== "undefined") {
		Object.defineProperty(
			ArrayBuffer.prototype,
			'toStringUtf8',
			{
				value : function () {
					return _public.string.Utf8ArrayToStr(new Uint8Array(this)).utf8decode();
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
		Object.defineProperty(
			ArrayBuffer.prototype,
			'toBytes',
			{
				value : function () {
					return new Uint8Array(this);
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
		Object.defineProperty(
			ArrayBuffer.prototype,
			'base64encode',
			{
				value : function () {
					return base64Binary.encode(new Uint8Array(this));
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
		Object.defineProperty(
			ArrayBuffer.prototype,
			'toArray',
			{
				value : function () {
					return Array.prototype.slice.call(new Uint8Array(this));
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);

	}
	if (typeof(Buffer) !== "undefined") {
		Object.defineProperty(
			Buffer.prototype,
			'toStringUtf8',
			{
				value : function () {
					return _public.string.Utf8ArrayToStr(new Uint8Array(this)).utf8decode();
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
		Object.defineProperty(
			Buffer.prototype,
			'toBytes',
			{
				value : function () {
					return new Uint8Array(this);
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
		Object.defineProperty(
			Buffer.prototype,
			'base64encode',
			{
				value : function () {
					return base64Binary.encode(new Uint8Array(this));
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
		Object.defineProperty(
			Buffer.prototype,
			'toArray',
			{
				value : function () {
					return Array.prototype.slice.call(new Uint8Array(this));
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
	}

	Object.defineProperty(
		Array.prototype,
		'toStringUtf8',
		{
			value : function () {
				return _public.string.Utf8ArrayToStr(new Uint8Array(this)).utf8decode();
			},
			writable: false,
			configurable: true,
			enumerable: false
		}
	);
})());

if (typeof(Blob) !== "undefined")
((function () {
	Object.defineProperty(
		Blob.prototype,
		'toArrayBuffer',
		{
			value : function (cb) {
				var er, err;
				try {
					var reader = new FileReader();
					reader.addEventListener("loadend", function() {
						var er;
						try {
							cb(undefined, reader.result);
						} catch (er) {};
						// reader.result contains the contents of blob as a typed array
					});
					reader.addEventListener("error", function (evt) {
						var er;
						try {
							cb(evt);
						} catch (er) {};
					});
					reader.readAsArrayBuffer(this);
				} catch (err) { er = err; };
				if (typeof(er) !== "undefined") {
					try {
						cb(er);
					} catch (er) {};
				}
			},
			writable: false,
			configurable: true,
			enumerable: false
		}
	);
	Object.defineProperty(
		Blob.prototype,
		'toURL',
		{
			value : function (options) {
				return URL.createObjectURL(this, options || { type: this.type || "application/octet-binary"})
			},
			writable: false,
			configurable: true,
			enumerable: false
		}
	);
})());

;(function () {
	var options = {
		toWorkerURL : function () {
			var func = this;
			var call = function (self) {
				var run;
				self.addEventListener("message", function (ev) {
					run(ev.data, function (res) {
						self.postMessage(res);
					})
				});
			};

			var code = ";("+call.toString().replace('var run;', 'var run = '+func.toString()+';')+")(self);";
			var blob = new Blob([code], { type: "text/javascript" });
			var url = URL.createObjectURL(blob);
			return url;
		},
		toWorker : function () {
			var func = this;
			var url = func.toWorkerURL();
			var worker = new Worker(url);
			worker._terminate = worker.terminate;
			worker.terminate = function () {
				worker._terminate();
				URL.revokeObjectURL(url);
			}
			return worker;
		},
		runInWorker : function (data, cb, keep) {
			var func = this;
			var url = func.toWorkerURL();
			var worker = new Worker(url);
			worker._terminate = worker.terminate;
			worker.terminate = function () {
				worker._terminate();
				URL.revokeObjectURL(url);
			};
			worker.addEventListener("message", function (ev) {
				cb(ev.data, ev);
				if (!keep) worker.terminate();
			});
			worker.postMessage(data);
			return worker;
		}
	};

	var property;
	for (property in options) {
		if (!(property in Function.prototype)) {
			Object.defineProperty(
				Function.prototype,
				property,
				{
					value : options[property],
					writable: false,
					configurable: true,
					enumerable: false
				}
			);
		}
	}

})();

if (typeof(Event) !== "undefined")
((function () {
	if (!Event.prototype.preventDefault) {
		Object.defineProperty(
			Event.prototype,
			'preventDefault',
			{
				value : function() {
					this.returnValue=false;
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
	}
	if (!Event.prototype.stopPropagation) {
		Object.defineProperty(
			Event.prototype,
			'stopPropagation',
			{
				value : function() {
					this.cancelBubble=false;
				},
				writable: false,
				configurable: true,
				enumerable: false
			}
		);
	}
})());
((function(){
	var o = {
		/* toFixed */
		"round"	: function(k) {	if(k) return parseFloat(this.toFixed(k)); return Math.round(this);	},
		"ceil"	: function() {	return Math.ceil(this);	},
		"floor"	: function() {	return Math.floor(this);	},
		"toHex"	: function (odd) {
			var r = this.toString(16);
			return ( odd ? ( r.length % 2 ? '0'+r : r ) : r );
		}
	};
	var i;for(i in o) if (!(i in Number.prototype)) Object.defineProperty(
		Number.prototype,
		i,
		{
			value : o[i],
			writable: false,
			configurable: true,
			enumerable: false
		}
	);
})());

_public.string.Utf8ArrayToStr = function (a) {
	var s = "", i = 0, l = a.length, c;var c2, c3;while (i < l) { c = a[i++]; switch (c >> 4) {
		case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: s += String.fromCharCode(c); break;
		case 12: case 13: c2 = a[i++]; s += String.fromCharCode(((c & 0x1F) << 6) | (c2 & 0x3F)); break;
		case 14: c2 = a[i++]; c3 = a[i++]; s += String.fromCharCode(((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0)); break;
	}}; return s;
};
var Sha1 = {hash : function(msg, utf8encode) {utf8encode = (typeof utf8encode == 'undefined') ? true : utf8encode;if (utf8encode) msg = (''+msg).utf8encode();var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];msg += String.fromCharCode(0x80);var l = msg.length/4 + 2;var N = Math.ceil(l/16);var M = new Array(N);for (var i=0; i<N; i++) {M[i] = new Array(16);for (var j=0; j<16; j++) M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));};M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;var H0 = 0x67452301;var H1 = 0xefcdab89;var H2 = 0x98badcfe;var H3 = 0x10325476;var H4 = 0xc3d2e1f0;var W = new Array(80); var a, b, c, d, e;for (var i=0; i<N; i++) {for (var t=0;	t<16; t++) W[t] = M[i][t];for (var t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);a = H0; b = H1; c = H2; d = H3; e = H4;for (var t=0; t<80; t++){var s = Math.floor(t/20);var T = (Sha1.ROTL(a,5) + Sha1.f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;e = d;d = c;c = Sha1.ROTL(b, 30);b = a;a = T;};H0 = (H0+a) & 0xffffffff;H1 = (H1+b) & 0xffffffff;H2 = (H2+c) & 0xffffffff;H3 = (H3+d) & 0xffffffff;H4 = (H4+e) & 0xffffffff;};return Sha1.toHexStr(H0) + Sha1.toHexStr(H1) + Sha1.toHexStr(H2) + Sha1.toHexStr(H3) + Sha1.toHexStr(H4);},f:function(s, x, y, z){switch (s) {case 0: return (x & y) ^ (~x & z);case 1: return x ^ y ^ z;case 2: return (x & y) ^ (x & z) ^ (y & z);case 3: return x ^ y ^ z;}},ROTL:function(x, n){return (x<<n) | (x>>>(32-n));},toHexStr:function(n){var s="", v;for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); };return s;}};
_public.string.sha1 = Sha1;
var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
_public.string.md5 = MD5;
var Sha256 = { hash : function(msg, utf8encode) { utf8encode = (typeof utf8encode == 'undefined') ? true : utf8encode; if (utf8encode) msg = (''+msg).utf8encode(); var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]; var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]; msg += String.fromCharCode(0x80); var l = msg.length/4 + 2; var N = Math.ceil(l/16); var M = new Array(N); for (var i=0; i<N; i++) { M[i] = new Array(16); for (var j=0; j<16; j++) { M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3)); } }; M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]); M[N-1][15] = ((msg.length-1)*8) & 0xffffffff; var W = new Array(64); var a, b, c, d, e, f, g, h; for (var i=0; i<N; i++) { for (var t=0;  t<16; t++) W[t] = M[i][t]; for (var t=16; t<64; t++) W[t] = (Sha256.sigma1(W[t-2]) + W[t-7] + Sha256.sigma0(W[t-15]) + W[t-16]) & 0xffffffff; a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7]; for (var t=0; t<64; t++) { var T1 = h + Sha256.Sigma1(e) + Sha256.Ch(e, f, g) + K[t] + W[t]; var T2 = Sha256.Sigma0(a) + Sha256.Maj(a, b, c); h = g; g = f; f = e; e = (d + T1) & 0xffffffff; d = c; c = b; b = a; a = (T1 + T2) & 0xffffffff; }; H[0] = (H[0]+a) & 0xffffffff; H[1] = (H[1]+b) & 0xffffffff; H[2] = (H[2]+c) & 0xffffffff; H[3] = (H[3]+d) & 0xffffffff; H[4] = (H[4]+e) & 0xffffffff; H[5] = (H[5]+f) & 0xffffffff; H[6] = (H[6]+g) & 0xffffffff; H[7] = (H[7]+h) & 0xffffffff; }; return Sha256.toHexStr(H[0]) + Sha256.toHexStr(H[1]) + Sha256.toHexStr(H[2]) + Sha256.toHexStr(H[3]) + Sha256.toHexStr(H[4]) + Sha256.toHexStr(H[5]) + Sha256.toHexStr(H[6]) + Sha256.toHexStr(H[7]); }, ROTR : function(n, x) { return (x >>> n) | (x << (32-n)); }, Sigma0 : function(x) { return Sha256.ROTR(2,  x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x); }, Sigma1 : function(x) { return Sha256.ROTR(6,  x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x); }, sigma0 : function(x) { return Sha256.ROTR(7,  x) ^ Sha256.ROTR(18, x) ^ (x>>>3);  }, sigma1 : function(x) { return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x>>>10); }, Ch : function(x, y, z)  { return (x & y) ^ (~x & z); }, Maj : function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }, toHexStr : function(n) { var s="", v; for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }; return s; }};
_public.string.sha256 = Sha256;
var Tea = { encrypt : function(plaintext, password) { if (plaintext.length == 0) return(''); var v = Tea.strToLongs(plaintext.utf8encode()); if (v.length <= 1) v[1] = 0; var k = Tea.strToLongs((''+password).utf8encode().slice(0,16)); var n = v.length; var z = v[n-1], y = v[0], delta = 0x9E3779B9; var mx, e, q = Math.floor(6 + 52/n), sum = 0; while (q-- > 0) { sum += delta; e = sum>>>2 & 3; for (var p = 0; p < n; p++) { y = v[(p+1)%n]; mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z); z = v[p] += mx; }}; var ciphertext = Tea.longsToStr(v); return ciphertext.base64encodeClean();}, decrypt : function(ciphertext, password) { if (ciphertext.length == 0) return('');var v = Tea.strToLongs(ciphertext.base64decodeClean());var k = Tea.strToLongs((''+password).utf8encode().slice(0,16));var n = v.length;var z = v[n-1], y = v[0], delta = 0x9E3779B9;var mx, e, q = Math.floor(6 + 52/n), sum = q*delta; while (sum != 0) { e = sum>>>2 & 3;for (var p = n-1; p >= 0; p--) {z = v[p>0 ? p-1 : n-1];mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z); y = v[p] -= mx; }; sum -= delta; }; var plaintext = Tea.longsToStr(v); plaintext = plaintext.replace(/\0+$/,''); return plaintext.utf8decode();}, strToLongs : function(s) { var l = new Array(Math.ceil(s.length/4)); for (var i=0; i<l.length; i++) { l[i] = s.charCodeAt(i*4) + (s.charCodeAt(i*4+1)<<8) + (s.charCodeAt(i*4+2)<<16) + (s.charCodeAt(i*4+3)<<24); }; return l;}, longsToStr : function(l) { var a = new Array(l.length); for (var i=0; i<l.length; i++) { a[i] = String.fromCharCode(l[i] & 0xFF, l[i]>>>8 & 0xFF, l[i]>>>16 & 0xFF, l[i]>>>24 & 0xFF); }; return a.join('');}};
_public.string.tea = Tea;
var Aes={ cipher:function(input,w){var Nb=4;var Nr=w.length/Nb-1;var state=[[],[],[],[]];for(var i=0;i<4*Nb;i++)state[i%4][Math.floor(i/4)]=input[i];state=Aes.addRoundKey(state,w,0,Nb);for(var round=1;round<Nr;round++){state=Aes.subBytes(state,Nb);state=Aes.shiftRows(state,Nb);state=Aes.mixColumns(state,Nb);state=Aes.addRoundKey(state,w,round,Nb)}state=Aes.subBytes(state,Nb);state=Aes.shiftRows(state,Nb);state=Aes.addRoundKey(state,w,Nr,Nb);var output=new Array(4*Nb);for(var i=0;i<4*Nb;i++)output[i]=state[i% 4][Math.floor(i/4)];return output},keyExpansion:function(key){var Nb=4;var Nk=key.length/4;var Nr=Nk+6;var w=new Array(Nb*(Nr+1));var temp=new Array(4);for(var i=0;i<Nk;i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];w[i]=r}for(var i=Nk;i<Nb*(Nr+1);i++){w[i]=new Array(4);for(var t=0;t<4;t++)temp[t]=w[i-1][t];if(i%Nk==0){temp=Aes.subWord(Aes.rotWord(temp));for(var t=0;t<4;t++)temp[t]^=Aes.rCon[i/Nk][t]}else if(Nk>6&&i%Nk==4)temp=Aes.subWord(temp);for(var t=0;t<4;t++)w[i][t]=w[i-Nk][t]^temp[t]}return w},subBytes:function(s,Nb){for(var r=0;r<4;r++)for(var c=0;c<Nb;c++)s[r][c]=Aes.sBox[s[r][c]];return s},shiftRows:function(s,Nb){var t=new Array(4);for(var r=1;r<4;r++){for(var c=0;c<4;c++)t[c]=s[r][(c+r)%Nb];for(var c=0;c<4;c++)s[r][c]=t[c]}return s},mixColumns:function(s,Nb){for(var c=0;c<4;c++){var a=new Array(4);var b=new Array(4);for(var i=0;i<4;i++){a[i]=s[i][c];b[i]=s[i][c]&128?s[i][c]<<1^283:s[i][c]<<1}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3]}return s},addRoundKey:function(state,w,rnd,Nb){for(var r=0;r<4;r++)for(var c=0;c<Nb;c++)state[r][c]^=w[rnd*4+c][r];return state},subWord:function(w){for(var i=0;i<4;i++)w[i]=Aes.sBox[w[i]];return w},rotWord:function(w){var tmp=w[0];for(var i=0;i<3;i++)w[i]=w[i+1];w[3]=tmp;return w},sBox:[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],rCon:[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]],Ctr:{encrypt:function(plaintext,password,nBits){var blockSize=16;if(!(nBits==128||(nBits==192||nBits==256)))return"";plaintext=(''+plaintext).utf8encode();password=(''+password).utf8encode();var nBytes=nBits/8;var pwBytes=new Array(nBytes);for(var i=0;i<nBytes;i++)pwBytes[i]=isNaN(password.charCodeAt(i))?0:password.charCodeAt(i);var key=Aes.cipher(pwBytes,Aes.keyExpansion(pwBytes));key=key.concat(key.slice(0,nBytes-16));var counterBlock=new Array(blockSize);var nonce=(new Date).getTime();var nonceMs=nonce% 1E3;var nonceSec=Math.floor(nonce/1E3);var nonceRnd=Math.floor(Math.random()*65535);for(var i=0;i<2;i++)counterBlock[i]=nonceMs>>>i*8&255;for(var i=0;i<2;i++)counterBlock[i+2]=nonceRnd>>>i*8&255;for(var i=0;i<4;i++)counterBlock[i+4]=nonceSec>>>i*8&255;var ctrTxt="";for(var i=0;i<8;i++)ctrTxt+=String.fromCharCode(counterBlock[i]);var keySchedule=Aes.keyExpansion(key);var blockCount=Math.ceil(plaintext.length/blockSize);var ciphertxt=new Array(blockCount);for(var b=0;b<blockCount;b++){for(var c=0;c< 4;c++)counterBlock[15-c]=b>>>c*8&255;for(var c=0;c<4;c++)counterBlock[15-c-4]=b/4294967296>>>c*8;var cipherCntr=Aes.cipher(counterBlock,keySchedule);var blockLength=b<blockCount-1?blockSize:(plaintext.length-1)%blockSize+1;var cipherChar=new Array(blockLength);for(var i=0;i<blockLength;i++){cipherChar[i]=cipherCntr[i]^plaintext.charCodeAt(b*blockSize+i);cipherChar[i]=String.fromCharCode(cipherChar[i])}ciphertxt[b]=cipherChar.join("")}var ciphertext=ctrTxt+ciphertxt.join("");ciphertext=(''+ciphertext).base64encodeClean(); return ciphertext},decrypt:function(ciphertext,password,nBits){var blockSize=16;if(!(nBits==128||(nBits==192||nBits==256)))return"";ciphertext=(''+ciphertext).base64decodeClean();password=(''+password).utf8encode();var nBytes=nBits/8;var pwBytes=new Array(nBytes);for(var i=0;i<nBytes;i++)pwBytes[i]=isNaN(password.charCodeAt(i))?0:password.charCodeAt(i);var key=Aes.cipher(pwBytes,Aes.keyExpansion(pwBytes));key=key.concat(key.slice(0,nBytes-16));var counterBlock=new Array(8);ctrTxt=ciphertext.slice(0,8);for(var i=0;i<8;i++)counterBlock[i]=ctrTxt.charCodeAt(i);var keySchedule=Aes.keyExpansion(key);var nBlocks=Math.ceil((ciphertext.length-8)/blockSize);var ct=new Array(nBlocks);for(var b=0;b<nBlocks;b++)ct[b]=ciphertext.slice(8+b*blockSize,8+b*blockSize+blockSize);ciphertext=ct;var plaintxt=new Array(ciphertext.length);for(var b=0;b<nBlocks;b++){for(var c=0;c<4;c++)counterBlock[15-c]=b>>>c*8&255;for(var c=0;c<4;c++)counterBlock[15-c-4]=(b+1)/4294967296-1>>>c*8&255;var cipherCntr=Aes.cipher(counterBlock,keySchedule);var plaintxtByte=new Array(ciphertext[b].length);for(var i=0;i<ciphertext[b].length;i++){plaintxtByte[i]=cipherCntr[i]^ciphertext[b].charCodeAt(i);plaintxtByte[i]=String.fromCharCode(plaintxtByte[i])}plaintxt[b]=plaintxtByte.join("")}var plaintext=plaintxt.join("");plaintext=(''+plaintext).utf8decode();return plaintext}}};
_public.string.aes = Aes;
var base64Binary=function(){var h=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47],i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,0,0,0,0,0];function a(r){var e,n,t=r.length,o=3-(t%3||3),a=4*Math.floor((t+2)/3),c=new Uint8Array(a),f=0;for(e=0;e<t;f+=4,e+=3)n=(255&r[e])<<16|(255&r[e+1])<<8|255&r[e+2],c[f]=h[n>>18&63],c[f+1]=h[n>>12&63],c[f+2]=h[n>>6&63],c[f+3]=h[63&n];for(;o--;)c[--f]=61;return c}return{encodeBytes:a,encode:function(r){var e,n="",t=a(r),o=t.length;for(e=0;e<o;e++)n+=String.fromCharCode(t[e]);return n},decode:function(r){var e,n,t,o=r.length,a=r.slice(o-2).split("=").length-1,c=3*Math.floor((o+3)/4)-a,f=new Uint8Array(c);for(n=e=0;n<o;e+=3,n+=4)t=i[r[n].charCodeAt(0)]<<18|i[r[n+1].charCodeAt(0)]<<12|i[r[n+2].charCodeAt(0)]<<6|i[r[n+3].charCodeAt(0)],f[e]=t>>16&255,f[e+1]=t>>8&255,f[e+2]=255&t;return f}}}();
var base64 = {
	PADCHAR : '=',
	ALPHA : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	makeDOMException : function() {var e, tmp;try {return new DOMException(DOMException.INVALID_CHARACTER_ERR);} catch (tmp) { var ex = new Error("DOM Exception 5");ex.code = ex.number = 5;ex.name = ex.description = "INVALID_CHARACTER_ERR";ex.toString = function() { return 'Error: ' + ex.name + ': ' + ex.message; };return ex;};},
	getbyte64 : function(s,i) {var idx = base64.ALPHA.indexOf(s.charAt(i));if (idx === -1) {throw base64.makeDOMException();};return idx;},
	decode : function(s) {s = '' + s;var getbyte64 = base64.getbyte64;var pads, i, b10;var imax = s.length;if (imax === 0) {return s;};if (imax % 4 !== 0) {throw base64.makeDOMException();};pads = 0;if (s.charAt(imax - 1) === base64.PADCHAR) {pads = 1;if (s.charAt(imax - 2) === base64.PADCHAR) {pads = 2;};imax -= 4;};var x = [];for (i = 0; i < imax; i += 4) {b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6) | getbyte64(s,i+3);x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));};switch (pads) {case 1:b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6);x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));break;case 2:b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);x.push(String.fromCharCode(b10 >> 16));break;};return x.join('');},
	getbyte : function(s,i) {var x = s.charCodeAt(i);if (x > 255) {throw base64.makeDOMException();};return x;},
	encode : function(s) {if (arguments.length !== 1) {throw new SyntaxError("Not enough arguments");};var padchar = base64.PADCHAR;var alpha   = base64.ALPHA;var getbyte = base64.getbyte;var i, b10;var x = [];s = '' + s;var imax = s.length - s.length % 3;if (s.length === 0) return s;for (i = 0; i < imax; i += 3) {b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8) | getbyte(s,i+2);x.push(alpha.charAt(b10 >> 18));x.push(alpha.charAt((b10 >> 12) & 0x3F));x.push(alpha.charAt((b10 >> 6) & 0x3f));x.push(alpha.charAt(b10 & 0x3f));};switch (s.length - imax) {case 1:b10 = getbyte(s,i) << 16;x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + padchar + padchar);break;case 2:b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8);x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + alpha.charAt((b10 >> 6) & 0x3f) + padchar);break;};return x.join('');}
};
_public.string.base64 = base64;
if (!window.btoa) window.btoa = base64.encode;
if (!window.atob) window.atob = base64.decode;



_public.fn.keyCapture = function (e,key_map,vars) { var t,i,j,k,m,r;
	if(!vars)	vars	= {};
	if (!e || e == null) var e = window.event;
	if (e.target)		t = e.target;
	else if (e.srcElement)	t = e.srcElement;
	if (t.nodeType == 3)	t = t.parentNode;
	k = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
	/* e.altKey | e.ctrlKey | e.shiftKey */
	if(!key_map) key_map	= ( 'key_map' in t ? t.key_map : {} );
	m	= [];
	m.push('k_all');
	if(e.ctrlKey && e.altKey)	m.push('k_ctrl_alt');
	if(e.ctrlKey && e.shiftKey)	m.push('k_ctrl_shift');
	if(e.altKey && e.shiftKey)	m.push('k_alt_shift');
	if(e.ctrlKey && e.altKey && e.shiftKey)	m.push('k_ctrl_alt_shift');
	if(e.ctrlKey)	m.push('k_ctrl');
	if(e.altKey)	m.push('k_alt');
	if(e.shiftKey)	m.push('k_shift');

	if(e.ctrlKey && e.altKey)	m.push('k_ctrl_alt_'+k);
	if(e.ctrlKey && e.shiftKey)	m.push('k_ctrl_shift_'+k);
	if(e.altKey && e.shiftKey)	m.push('k_alt_shift_'+k);
	if(e.ctrlKey && e.altKey && e.shiftKey)	m.push('k_ctrl_alt_shift_'+k);
	if(e.ctrlKey)	m.push('k_ctrl_'+k);
	if(e.altKey)	m.push('k_alt_'+k);
	if(e.shiftKey)	m.push('k_shift_'+k);

	m.push('k_'+k);
	m.push('k_all-at-end');
	var o = {
		specialKeys	: {
			"ctrl"	: e.ctrlKey,
			"alt"	: e.altKey,
			"shift"	: e.shiftKey,
			"none"	: !( e.ctrlKey || e.altKey || e.shiftKey)
		},
		keyCode	: k
	};
	for(j=0;j<m.length;j++)
		if(m[j] in key_map)
			if(typeof(key_map[m[j]]) == "function") {
				if((c = (key_map[m[j]])(t,k,e,key_map,vars,o)) === false) {
					return false;
				} else if( c === true ) {
					/* skip */
				} else {
					_public.fn.insertAtCursor(t,''+c);
					return false;
				}
			} else for(i in key_map[m[j]])
				if(typeof(key_map[m[j]][i]) == "function") {
					if((c = (key_map[m[j]][i])(t,k,e,key_map,vars,o)) === false) {
						return false;
					} else if( c === true ) {
						/* skip */
					} else {
						_public.fn.insertAtCursor(t,''+c);
						return false;
					}
				}
	return true;
};



_public.fn.insertAtCursor	= function (myField, myValue){if(document.selection){myField.focus();sel = document.selection.createRange();sel.text = myValue;} else if (myField.selectionStart || myField.selectionStart == '0') {var startPos = myField.selectionStart;var endPos = myField.selectionEnd;restoreTop = myField.scrollTop;myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);myField.selectionStart = startPos + myValue.length;myField.selectionEnd = startPos + myValue.length;if (restoreTop>0){myField.scrollTop = restoreTop;}}else{myField.value += myValue;}};

_public.fn.IframeAddContent	= function (iframe,content){var doc = null,win=null;if(iframe.contentDocument){doc = iframe.contentDocument;win=iframe.contentWindow;}else if(iframe.contentWindow){doc = iframe.contentWindow.document;win=iframe.contentWindow;}else if(iframe.document){doc = iframe.document;win=iframe.window;};if(doc && content){doc.open();doc.write(content);if(!('\v' == 'v'))doc.close();};return {'document':doc,'window':win};};

_public.fn.downloadFile = function (filename,content,encoding,mimetype) {
	var url;
	if (content instanceof Blob) {
		url = URL.createObjectURL(content);
	} else {
		if(!encoding)
			encoding	= 'none';
		if(!mimetype)
			mimetype	= "application/x-unknown";
		switch(encoding) {
			case 'base64':
				content = "data:"+mimetype+";base64,"+content;
			break;
			case 'file-encoded':
				// skip;
			break;
			case 'chunks':
			break;
			case 'escape':
			case 'uri-encoded':
				content = "data:"+mimetype+";base64,"+unescape(content).base64encode();
			break;
			case 'none':
				content = "data:"+mimetype+";base64,"+content.base64encode();
			break;
		};
		url = dataURItoBlobUrl(content,mimetype).url;
	}
	var i = getRandId('donwload-link');
	var p = _();
	if (filename === undefined) filename = "attachment.dat";
	p.E('a').Et(document.body).V({href:url,id:i, download:filename }).v({download:filename})._().click();
	var f = function () {
		p.I(i).D();
	};
	setTimeout(f,10);
	return false;
};

_public.fn.base64toBlob	= base64toBlob;
function base64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 1024;
	function charCodeFromCharacter(c) {	return c.charCodeAt(0);	};
	var byteArrays = [], byteCharacters = null;
	if (typeof(b64Data) === "string") {
		byteCharacters	= atob(b64Data);
		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = Array.prototype.map.call(slice, charCodeFromCharacter);
			var byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		};
	} else {
		byteArrays	= b64Data;
	}
	var blob = new Blob(byteArrays, {type: contentType});
	return blob;
};
_public.fn.dataURItoBlobUrl = dataURItoBlobUrl;
function dataURItoBlobUrl(dataURI,mimeString) {
	var byteString;
	if (typeof(dataURI) === "string") {
		var dataURI_splited	= dataURI.split(',');
		byteString = dataURI_splited[1];
		if(!mimeString)	mimeString = dataURI_splited[0].split(':')[1].split(';')[0];
		/* "text/plain" "application/octet-binary" */
	} else {
		byteString	= dataURI;
	}
	var v_blob	= base64toBlob(byteString, (mimeString || "application/octet-binary"));
	return {
		blob : v_blob,
		url	: createObjectURL(v_blob)
	};
};
/**
* loadObj('m_chart')	return ('m_chart' in window && typeof(window['m_chart']) == "object");
*
* loadObj('m_chart,m_editor',function(vars,module_arr){},vars)		.. will execute function after modules are loaded
*/
if (document)
((function (global) {
	/** emulate online offline detect for all browsers */
	global.on	= function (eventName, callback) {
		return global.addEventListener(eventName, callback, false);
	};
	global.trigger	= function (eventName) {
		var event = document.createEvent('Event');
		event.initEvent(eventName, true, true);
		return global.dispatchEvent(event);
	};

	((function () {
		var state	= "";
		global.jsEvtIsMaximized	= function () {
			return (state === "visible");
		};
		setInterval(function () {
			var current_state	= ( document.visibilityState || "visible" );
			if (state !== current_state) {
				state	= current_state;
				global.trigger("jsevt-docview-"+state);
			}
		}, 500);
	})());

	/** wrap common events */
	global.on("offline", function () {
		global.trigger("jsevt-offline")
	});
	global.on("online", function () {
		global.trigger("jsevt-online")
	});

	/** wrap common events */
	global.on("unload", function () {
		global.trigger("jsevt-unload")
	});
	global.on("load", function () {
		global.trigger("jsevt-load")
	});



	(function () {
		var userIsActive	= true;
		global.jsEvtUserActive	= function () {
			return userIsActive;
		}
		global.on('jsevt-user-active', function () {
			userIsActive	= true;
		});
		global.on('jsevt-user-paused', function () {
			userIsActive	= false;
		});
	})();


	(function () {
		window.JsEvtInactivityTimeout	= function (val) {
			if (val && typeof(val) === "number") {
				timer.timeout	= val;
			}
			return timer.timeout;
		};
		var active	= true;
		var timer	= {
			timeout	: 27000,
			status	: false,
			update	: function (status) {
				if (active != status) {
					active	= status;
					// console.info("triggering 'jsevt-user-"+(!status ? 'paused' : 'active')+"'");
					global.trigger('jsevt-user-'+(!status ? 'paused' : 'active'))
				}
			},
			reset	: function () {
				// console.info("Detected user activity");
				var er;
				try {
					clearTimeout(this.status);
				} catch (er) {};
				this.status	= true;
				this.update(true);
				var timer	= this;
				this.status	= setTimeout(function () {
					// console.info("User is inactive");
					timer.update(false);
				}, this.timeout);
			}
		};
		global.on('mouseover', function () {
			timer.reset();
		});
		global.on('touchend', function () {
			timer.reset();
		});
		global.on('mousedown', function () {
			timer.reset();
		});
		global.on('mouseup', function () {
			timer.reset();
		});
		global.on('touchstart', function () {
			timer.reset();
		});
		global.on('scroll', function () {
			timer.reset();
		});
		timer.reset();
	})();
})(window));

if (document)
((function(global) {
	var root = (window.Element || window.HTMLElement || false);
	if (root) {
		if (!root.prototype.matches) {
			root.prototype.matches	= function (selector) {
				var node	= this;
				if (!node.parentElement) {
					return false;
				}
				var founded	= false;
				var list	= node.parentElement.querySelectorAll(selector);
				if (!list) {
					return false;
				}
				var i;
				for (i=0;i<list.length;i++) {
					if (list[i] === node) {
						founded	= true;
						break;
					}
				}
				return founded;
			}
		}
	}

	if (typeof(window._) === "undefined") {
		window._	= _public._;
	} else {
		console.warn("Unable to insert slDOM into Window since it is already busy");
	}

	if (typeof(window.__) === "undefined") {
		window.__	= _public.__;
	} else {
		console.warn("Unable to insert slDOMset into Window since it is already busy");
	}
})(typeof(window) === "undefined" ? window : global));


	return _public;
})());
