var loader = function () {
	loader.list.forEach(function (conf) {
		Application.moduleRegister(conf.path, conf.modules);
	});
};

loader.list = [
	{
		path: __dirname,
		modules	: [
			'async',
			'browser-session',
			'uri-load',
			'js-template',
			'canvas-draw',
			'custom-elements',
			'request',
			'browser-session/strategy/local-storage',
			'browser-session/strategy/indexed-db'
		]
	}
];

module.exports = loader;
