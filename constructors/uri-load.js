/* jshint -W002 */
/* jshint -W084 */
/**
 * loadScript - is a function for adding scripts into the header
 * @param  {string,Array}   url      url/urls of scripts
 * @param  {Function} callback [description]
 * @param  {object}   opts     settings with info related to the script tags
 */
function loadScript(url, callback, opts){
	if (!callback) callback = function () {};

	if (!Array.isArray(url)) {
		url	= [url];
	}

	if (!opts) {
		opts = {
			attr	: {
				"type"	: "text/javascript",
				"charset"	: "utf-8"
			}
		};
	}

	var waitScripts	= 1;
	var waitScriptsChecker	= function () {
		waitScripts	-= 1;
		if (waitScripts === 0) {
			callback();
		}
	};

	url.forEach(function (source) {
		var script;
		if (script	= document.querySelector('script[src="'+source+'"]')) {
			if (!script.loaded) {
				waitScripts	+= 1;
				if (!script.callbacks)
					script.callbacks	= [];
				script.callbacks.push(waitScriptsChecker);
			}
		} else {
			waitScripts	+= 1;
			script = document.createElement("script");
			script.type = "text/javascript";
			if (opts && "attr" in opts) {
				var at;
				for (at in opts.attr) {
					script.setAttribute(at, opts.attr[at]);
				}
			}
			script.callbacks	= [];

			script.callbacks.push(callback);

			var runCallBacks	= function () {
				var queue	= script.callbacks;
				script.callbacks	= [];
				queue.forEach(function (f) {
					var er;
					try {
						f();
					} catch (er) {
						console.error(er);
					}
				});
			};

			if (script.readyState){  //IE
				script.onreadystatechange = function(){
					if (script.readyState == "loaded" ||
							script.readyState == "complete"){
						script.onreadystatechange = null;
						script.loaded	= true;
						runCallBacks();
					}
				};
			} else {  //Others
				script.onload = function(){
					script.loaded	= true;
					runCallBacks();
				};
			}

			script.src = source;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	});
	waitScriptsChecker();
}

/**
 * loadLink - is a function for adding link tags into the header
 * @param  {string,Array}   url      url/urls of link tags
 * @param  {Function} callback [description]
 * @param  {object}   opts     settings with info related to the link tags
 */
function loadLink(url, callback, opts){
	if (!callback) callback = function () {};

	if (!opts) {
		opts = {
			attr	: {
				"rel"	: "stylesheet",
				"type"	: "text/css"
			}
		};
	}

	if (!Array.isArray(url)) {
		url	= [url];
	}

	var waitLinks	= 1;
	var waitLinksChecker	= function () {
		waitLinks	-= 1;
		if (waitLinks === 0) {
			callback();
		}
	};

	url.forEach(function (source) {
		var link;
		if (link	= document.querySelector('link[href="'+source+'"]')) {
			if (!link.loaded) {
				waitLinks	+= 1;
				if (!link.callbacks)
					link.callbacks	= [];
				link.callbacks.push(waitLinksChecker);
			}
		} else {
			waitLinks	+= 1;
			link = document.createElement("link");
			if (opts && "attr" in opts) {
				var at;
				for (at in opts.attr) {
					link.setAttribute(at, opts.attr[at]);
				}
			}
			link.callbacks	= [];

			link.callbacks.push(callback);

			var runCallBacks	= function () {
				var queue	= link.callbacks;
				link.callbacks	= [];
				queue.forEach(function (f) {
					var er;
					try {
						f();
					} catch (er) {
						console.error(er);
					}
				});
			};
			var userAgent = navigator.userAgent,
				iChromeBrowser = /CriOS|Chrome/.test(userAgent),
				isAndroidBrowser = /Mozilla\/5.0/.test(userAgent) && /Android/.test(userAgent) && /AppleWebKit/.test(userAgent) && !iChromeBrowser;

			if (link.readyState){  //IE
				link.onreadystatechange = function(){
					if (link.readyState == "loaded" ||
							link.readyState == "complete"){
						link.onreadystatechange = null;
						if (!link.loaded) {
							link.loaded	= true;
							runCallBacks();
						}
					}
				};
			} else if (isAndroidBrowser || !("onload" in link)) {
				if (!link.loaded) {
					link.loaded	= true;
					runCallBacks();
				}
			} else {
				link.onload = function() {
					if (!link.loaded) {
						link.loaded	= true;
						runCallBacks();
					}
				};
			}

			link.setAttribute("href", source);
			document.getElementsByTagName("head")[0].appendChild(link);

			setTimeout(function () {
				if (!link.loaded) {
					link.loaded	= true;
					runCallBacks();
				}
			}, 1000);
		}
	});
	waitLinksChecker();
}

module.exports = {
	script	: loadScript,
	link	: loadLink
};
