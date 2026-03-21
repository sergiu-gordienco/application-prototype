/**
 * application-prototype - A modular JavaScript Application Builder framework.
 * @module application-prototype
 * @property {function} application - ApplicationPrototype constructor for lightweight event-driven objects
 * @property {function} builder - ApplicationBuilder constructor with module loading and dependency management
 */
const result = {
	application	: require("./ApplicationPrototype.js"),
	builder		: require("./ApplicationBuilder.js")
};
//@ts-ignore
module.exports = result;
