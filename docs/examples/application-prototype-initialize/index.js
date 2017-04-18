var App; //global App object

new Promise(function(resolve, reject) {
	App	= new ApplicationBuilder({
		onconstruct	: function () {
			console.log("Constructor", this, arguments);
		},
		onready	: function () {
			var App	= this;
			App.modulePath('..//../../constructors');
			App.require(["lib", "extensions/prototype"], function (lib) {
				lib.lib(); //loads all application-prototype modules
				App.modulePath('/scripts/modules'); //specifying module path for retrieving modules
			});
		}
	});
});
