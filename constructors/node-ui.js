/**
 *  has dependencies that are not added in tris project
 */
module.exports	= ((function () {
	_(newCss(__dirname+'/node-ui/style.css')).v({
		"application-style"	: "viewport-units"
	});
	return function (node) {
		var p	= _();
		var config	= {
			classPrefix	: "node-ui--",
			node	: node,
			objects	: {
				node	: false;
			}
		};
		config.objects.node	= p.E('div')
					.c(config.classPrefix+"root")
				._();
		config.objects.structure	= ((function () {
			var i;
			var res	= {
				content	: false,
				childs	: false
			};
			res.content	= p.E('div')
					.c(config.classPrefix+"content")
				.adEto(config.objects.node)._();

			res.childs	= p.e('div', '~')
					.c(config.classPrefix+"childs")
				.adEto(config.objects.node)._();

			return res;
		})());

		// arange build the childs
		// 	add pagination
		// 	add view modes
		// 
		// add configuration edit using the form
	}
})());
