/// <reference path="index.d.js" />

/** @type {{ application(): ApplicationPrototype, builder(): ApplicationBuilder }} */
module.exports = {
	application	: require("./ApplicationPrototype.js"),
	builder		: require("./ApplicationBuilder.js")
};
