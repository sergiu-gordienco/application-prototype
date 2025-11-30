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
			'browser-session/strategy/indexed-db',
			'browser-session/strategy/local-storage',
			'devices/getUserMedia',
			'devices/webcam',
			'canvas-draw',
			'custom-elements',
			'extensions/prototype',
			'graphic',
			'graphic/convert',
			'graphic/convert/blob-to-imagedata',
			'graphic/convert/imagedata-to-blob',
			'graphic/filters',
			'graphic/filters/blur',
			'graphic/filters/contrast',
			'graphic/filters/saturation',
			'graphic/polyfill',
			'graphic/recognition',
			'graphic/recognition/edge-detection',
			'graphic/utils',
			'graphic/utils/imagedata-clone',
			'js-template',
			'js-template-component',
			'lib',
			'request',
			'request/http-interceptor',
			'request/http-track-progress',
			'request/http-cache',
			'request/params-parser',
			'request/params-parser/cli',
			'uri-load',
			'parsers/string/csv/parse',
			'parsers/string/csv/encode',
			'parsers/string/markdown/convert/html'
		]
	}
];

module.exports = loader;
