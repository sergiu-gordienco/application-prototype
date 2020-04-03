const result = {
	application	: require("./ApplicationPrototype.js") as ApplicationPrototypeConstructor,
	builder		: require("./ApplicationBuilder.js") as ApplicationBuilderConstructor
};
//@ts-ignore
module.exports = result;
