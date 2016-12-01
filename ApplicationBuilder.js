var isNode	= ( typeof global !== "undefined" &&
	typeof process !== "undefined" &&
	{}.toString.call(global) == '[object global]' );

var ApplicationBuilder	= function (callback) {
	var config;
	var module_path	= './constructors';
	var vars;
	var params	= {
		callback_ready	: false
	};
	if (callback && typeof(callback) === "object") {
		if (typeof(callback.onready) === "function") {
			params.callback_ready	= callback.onready;
		}

		if (typeof(callback.onconstruct) === "function") {
			callback	= callback.onconstruct;
		} else {
			callback	= false;
		}
	};
	var Application	= new ApplicationPrototype(function (
			configurations,
			variables,
			methods,
			public_methods,
			private_methods
		) {
		config	= configurations;
		vars	= variables;
		config.cache_enabled	= false;
		// console.log(callback.toString());
		if (typeof(callback) === "function") {
			callback.apply(methods, [variables, configurations]);
		}
	});

	Application.bind("Promise", function (cb) {
		var value	= undefined;
		var err		= undefined;
		var cb_resolve	= [];
		var cb_reject	= [];
		var pending		= true;
		var resolve		= function (v) {
			if (pending) {
				pending	= false;
				value	= v;
				cb_resolve.forEach(function (f) {
					run(f, value);
				});
			}
		};
		var reject		= function (e) {
			if (pending) {
				pending	= false;
				err	= e;
				cb_reject.forEach(function (f) {
					run(f, err);
				});
			}
		};
		var run	= function (f, v) {
			var er;
			try {
				f(v);
			} catch (er) {
				console.error(er);
			}
			return er;
		};
		var p = {
			then : function (onFullfiled, onRejected) {
				p.catch(onRejected);
				if (typeof(onFullfiled) === "function") {
					if (pending) {
						cb_resolve.push(onFullfiled);
					} else if (typeof(err) === "undefined") {
						run(onFullfiled, value);
					}
				}
				return p;
			},
			catch: function (onRejected) {
				if (typeof(onRejected) === "function") {
					if (pending) {
						cb_reject.push(onRejected);
					} else if (typeof(err) !== "undefined") {
						run(onRejected, err);
					}
				}
				return p;
			},
			resolve	: resolve,
			reject	: reject
		};
		try {
			if (typeof(cb) === "function") {
				cb(resolve, reject);
			}
		} catch (err) {
			reject(err);
		}
		return p;
	});

	Application.Promise.reject	= function (value) {
		return new Application.Promise(function (resolve, reject) {
			reject(value);
		});
	};
	Application.Promise.resolve	= function (value) {
		return new Application.Promise(function (resolve, reject) {
			resolve(value);
		});
	};
	Application.Promise.race	= function (a) {
		var p	= new Application.Promise();
		var i, solved = false;
		for (i=0;i<a.length;i++) {
			a[i].then(function (val) {
				if (solved) return;
				solved	= true;
				p.resolve(val);
			}, function (err) {
				if (solved) return;
				p.reject(err);
			});
		}
		return p;
	};
	Application.Promise.all	= function (a) {
		var p = new Application.Promise();
		var values = [];
		for (i=0;i<a.length;i++) {
			a[i].then(function (val) {
				values.push(val);
				if (values.length === a.length) {
					p.resolve(values);
				}
			}, function (err) {
				p.reject(err);
			})
		}
		return p;
	};

	Application.bind('cacheEnabled', function (state) {
		if (typeof(state) === "boolean") {
			config.cache_enabled	= state;
		}
		return config.cache_enabled;
	});
	Application.bind('modulePath', function (path) {
		if (path && typeof(module_path) === "string") {
			module_path	= path;
		}
		return module_path;
	});


	;((function () {
		var store	= {};
		Application.bind('moduleRegister', function (path, modules) {
			if (typeof(path) === "string" && Array.isArray(modules)) {
				modules.forEach(function (module_name) {
					var moduleMeta	= Application.moduleResolve(module_name, path);
					store[moduleMeta["name"]]	= moduleMeta;
					store['#' + module_name]	= moduleMeta;
				});
			}
			return store;
		});
		var cached_moduleNames	= {};
		Application.bind("moduleResolve", function (module_name, path) {
			if (typeof(path) === "undefined")
				path = module_path;

			/** module name formats

			https://example/module/path/{module-name}.js
			http://example/module/path/{module-name}.js#?module={module-name}
			http://example/module/path/file.js?module={module-name}
			{path/to/module-name}
			{path/to/module-name.js}
			path/to/file.js#?module={module-name}
			*/
			// return moduleMeta but requestQuery
			if (('#' + module_name) in store) {
				// console.warn('#' + module_name, ' founded in store ', store['#' + module_name]);
				return store['#' + module_name];
			}

			var moduleMeta	= {
				store	: {},
				$requestQuery : module_name,
				module_path	: path,
				name	: module_name,
				url		: path + '/' + module_name + '.js',
				path	: '',
				__dirname	: ''
			};
			if (module_name.match(/^(http|https|ws)\:\/\//)) {
				moduleMeta.url = module_name;
			} else if (module_name.match(/^\//)) {
				moduleMeta.url = module_name;
				if (!moduleMeta.url.match(/((\.js|)\?.*|\#.*)$/)) {
					moduleMeta.url += '.js';
				}
			}
			;((function (m) {
				if (m && m[2]) {
					moduleMeta["name"] = m[2];
				}
			})(module_name.match(/(\#module\=|\?module\=|\&module\=)([a-z0-9A-Z][a-z0-9\_\.\-A-Z]*)/)));


			if (moduleMeta["name"] in store) {
				// console.warn(moduleMeta["name"], ' founded in store ', store[moduleMeta["name"]]);
				return store[moduleMeta["name"]];
			}

			moduleMeta.path = moduleMeta.url.replace(/(\.js|)(\?.*|\#.*|)$/, '');
			moduleMeta.__dirname	= moduleMeta.path.replace(/\/[^\/]+$/, '');

			return moduleMeta;
		});
	})());


	;((function () {
		var fs = false;
		if (isNode) {
			fs = require('fs');
		}
		var module_cache = {};
		var module_requests = {};
		var require_cache	= {};
		Application.bind("require", function (module_name, callback) {
			if (typeof(module_name) === "string") {
				var moduleMeta	= Application.moduleResolve(module_name);
				var __dirname	= moduleMeta.__dirname;
				// TODO validate path
				if (moduleMeta["name"] in require_cache) {
					if (callback)
						callback(require_cache[moduleMeta["name"]].exports || null, undefined);
					return require_cache[moduleMeta["name"]].$request;
				} else {
					var $request, requireDownload;
					if (moduleMeta.path in module_requests) {
						$request = module_requests[moduleMeta.path];
					} else {
						requireDownload = true;
						$request = new Application.Promise();
						module_requests[moduleMeta.path] = $request;
					}
					var module	= {
						cache		: function () {
							module_cache[moduleMeta.path] = module_cache[moduleMeta.path] || {};
							return module_cache[moduleMeta.path];
						},
						require	: function (moduleName, cb) {
							var updateModuleName = function (name, path) {
								if (name.indexOf("::") !== -1) {
									name = name.split(/\s*\:\:\s*/);
									return name[0] + " :: " + path + "/" + name[1];
								} else {
									return path + "/" + name;
								}
							};
							if (typeof(moduleName) === "string") {
								return Application.require(updateModuleName(moduleName, moduleMeta.path), cb);
							} else if (Array.isArray(moduleName)) {
								return Application.require(moduleName.map(function (m) {
									return updateModuleName(m, moduleMeta.path);
								}), cb);
							}
						},
						resourceUrl	: function (path) {
							return moduleMeta.path + "/" + path;
						},
						meta : moduleMeta,
						$request	: $request
					};

					;((function () {
						var data	= undefined;
						Object.defineProperty(module, 'exports', {
							get: function() { return data; },
							set: function(val) {
								if ( typeof(data) === "undefined" ) {
									data	= val;
									require_cache[moduleMeta["name"]]	= module;
									module.$request.resolve(module.exports);
									if (callback)
										callback(module.exports || null, undefined);
								} else {
									data	= val;
								}
							},
							enumerable: true,
							configurable: true
						});
					})());

					var global	= Application;
					module.atime		= new Date().valueOf();
					module.Application	= function () {
						return (Application || global || null);
					};

					var module_url = moduleMeta.url + (Application.cacheEnabled() ? ((moduleMeta.url.indexOf('?') === -1 ? '?' : '&') + 't='+module.atime ) : '');
					if (requireDownload) {
						if (isNode) {
							fs.readFile(module_url, 'utf8', function (err, module_text) {
								var err;
								try {
									eval(module_text);
								} catch(err) {
									console.warn("Application Loading Module", module_url);
									console.error(err);
									module.$request.reject(err);
								}
							});
						} else {
							m_urlload(module_url, function (module_url, module_text) {
								var err;
								try {
									eval(module_text);
								} catch(err) {
									console.warn("Application Loading Module", module_url);
									console.error(err);
									module.$request.reject(err);
								}
							});
						}
					} else {
						module.$request.then(function (obj) {
							if (callback)
								callback(obj || null, undefined);
						}).catch(function (er) {
							console.warn("Application Loading Module", module_url);
							console.error(er);
						})
					}
					return module.$request;
				}
			} else if (Array.isArray(module_name)) {
				var modules		= {};
				var module_count	= 0;
				var module_length	= module_name.length;
				var module_errors	= [];
				var $request	= Application.Promise();
				module_name.forEach(function (module_name) {
					var module_link	= false;
					((function (m) {
						if (Array.isArray(m) && m[3].substr(0, 2) !== '//') {
							module_link	= m[1];
							module_name	= m[3];
						}
					})(module_name.match(/^([a-zA-Z0-9\_\-\."]+)(\s*\:\:\s*)(.*?)$/)));
					Application.require(module_name, function (module_exports, err) {
						module_count			+= 1;
						modules[module_name]	= module_exports;
						if (module_link && module_link !== module_name)
							modules[module_link]	= module_exports;
						if (err) {
							$request.reject(err);
							module_errors.push({ "module_name": module_name, "error" : err });
						}
						if (module_count === module_length) {
							if (!module_errors.length)
								$request.resolve(modules);
							if (callback)
								callback(modules, module_errors);
						}
					});
				});
				return $request;
			}
		});
	})());
	if (typeof(params.callback_ready) === "function") {
		var er;
		try {
			params.callback_ready.apply(Application, [vars, config]);
		} catch (er) {
			console.warn("Application callbackReady error", er);
		}
	}
	return Application;
};



// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ m_urlload - JavaScript url Content Loader                                                     │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright science © 2011 Sergiu Gordienco Vasile (http://first-jump.com)                      │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under http://creativecommons.org/licenses/by-nc-nd/3.0/ license.                     │ \\
// │ This work is licensed under the Creative Commons                                              │ \\
// │ Attribution-NonCommercial-NoDerivs 3.0 Unported License.                                      │ \\
// │ To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/3.0/.      │ \\
// └───────────────────────────────────────────────────────────────────────────────────────────────┘ \\
;((function (window) {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6.u=B(o,k){p r=[],i;5(!k)k="";5(1g.1h(o)&&k){v(i=0;i<o.C;i++)r.N(u(o[i],""+k+"["+i+"]"))}w 5(y(o)=="O"){v(i q o)r.N(u(o[i],""+k+(k?"[":"")+i+(k?"]":"")))}w 5(k){z""+k+"="+R(o)}z r.S(\'&\')};6.T=B(c,d,f,g,h,j,k,l,m){5(2===6)z G T(c,d,f,g,h,j,k,l,m);2.8=\'1i\'+G 1j().1k()+\'1l\'+Z.1m(Z.1n()*1o);6[2.8]=2;5(!f)f={};5(!k)k=(!h?\'H\':\'I\');5(!l)l=\'9\';p n={"U":"U","10":"10","11":"11","12":"12","9":"9","V":"U"};2.A=(l q n)?l:"9";2.W=f;2.X=k;2.J=c;2.13=d;2.D=(y(f)=="O"&&"D"q f&&y(f["D"])=="B"?f["D"]:Y);2.9=1p;2.14=!!m;2.E=(y(g)=="O"?g:{});2.F=(y(h)=="O"?h:{});2.P=B(){p e;K{1q(2.1r)}L(e){};K{p b=2.J,9=2.9,f=2.W,H=2.E,I=2.F,s=2.s,k=2.X;5(2.A=="V"){p i,a=G 15(2.7.Q),t="";v(i=0;i<a.C;i++)t+=16.17(a[i]%18);9=t};(2.13)(b,9,f,H,I,s,j,k,2.A,2.7)}L(e){};K{1s 6[2.8]}L(e){}};2.19=B(){5(!2.D)z Y;K{p b=2.J,9=2.9,f=2.W,H=2.E,I=2.F,s=2.s,k=2.X;5(2.A=="V"){p i,a=G 15(2.7.Q),t="";v(i=0;i<a.C;i++)t+=16.17(a[i]%18);9=t};(2.D)(b,9,f,H,I,s,j,k,2.A,2.7)}L(e){1t.1u(\'T » P\',e)}};2.7=G 1v();p r=[];p i;5(\'u\'q 6){r=u(2.E)}w{v(i q 2.E)r.N(i+\'=\'+R(\'\'+2.E[i]));r=r.S(\'&\')};2.s=2.J+(r.C?(2.J.1w(\'?\')==-1?\'?\':(r.C?\'&\':\'\')):\'\')+r;5(2.14){2.7.1a=M;2.7.1b(k,2.s,M)}w{5(y(m)=="1c"){2.7.1a=M}2.7.1b(k,2.s)}2.7.A=n[2.A];5(\'u\'q 6){r=u(2.F)}w{r=[];v(i q 2.F)r.N(i+\'=\'+R(\'\'+2.F[i]));r=r.S(\'&\')};5(y(j)==="1c"){K{2.7.1d("1x-1y","1z/x-1A-1B-1C; 1D=1E-1F-1")}L(i){}}5(j){v(i=0;i<j.C;i++)2.7.1d(j[i].1G,j[i].1H)};1I("2.7.1J = B() {p 8 = \\""+2.8+"\\";5(!(8 q 6)) z Y;\\n		5(6[8].7.1e == 4){6[8].9	= 6[8].7.Q;6[8].P();}\\n		w 5(6[8].7.1e == 3){6[8].9	= 6[8].7.Q;6[8].19();}\\n		w 5( (\'1f\' q 6[8] ) && ( 6[8].1f == 1K ) ) {6[8].P();}	z M; }");2.7.1L(r);z M}',62,110,'||this|||if|window|link|id|text||||||||||||||||var|in||fullUrl||objEncodeURL|for|else||typeof|return|responseType|function|length|onloading_f|get_data|post_data|new|get|post|url|try|catch|true|push|object|endEval|response|encodeURIComponent|join|m_urlload|arraybuffer|binary|vars|method_r|false|Math|blob|document|json|onload_f|sessionConnected|Uint8Array|String|fromCharCode|256|tmpEval|withCredentials|open|undefined|setRequestHeader|readyState|status|Array|isArray|load_urldata_|Date|valueOf|_|floor|random|1000000|null|clearInterval|timer|delete|console|error|XMLHttpRequest|indexOf|Content|Type|application|www|form|urlencoded|charset|ISO|8859|name|value|eval|onreadystatechange|404|send'.split('|'),0,{}));
})((function () {
	if (typeof(window) !== "undefined") { return window;
	} else if (typeof(global) !== "undefined") { return global;
	} else if (typeof(APP_BUILDER_GLOBAL) === "undefined") {
		throw new Error("Define APP_BUILDER_GLOBAL as global reference");
	} else {
		return APP_BUILDER_GLOBAL;
	}
})()));


if (isNode) {
	module.exports	= ApplicationPrototype;
}
