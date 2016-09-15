global.require('node', function (node) {
	module.exports	= function () {
		return node(function (node, config, params, methods) {
			var config		= config;
			var methods		= {};

			methods.rules	= function () {

			};
			methods.matchAll	= function () {
				// ...
			};
			params.childsAllowed	= ['route'];
			node.type	= "route";
			config.path	= "/path-"+new Date().valueOf().toString(36);
		});
	};
});
