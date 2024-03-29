//@
/**
 * @example
 *  Application.require('js-template-component')
 *      .then(function (
 *          // @type {JSTemplateComponent}
 *          JSTemplateComponentConstructor
 *      ) {
 *          new JSTemplateComponentConstructor(
 *              'my-custom-tagname',
 *              {
 *                  context: {
 *                      numberOfClicks: 0
 *                  },
 *                  templateCode: `
 *                      <div>
 *                          {{ this.numberOfClicks }}
 *                          <button (click)="this.increaseClicksNumber()">
 *                          </button>
 *                      </div>
 *                  `,
 *                  sharedPrototypeMethods: {
 *                      increaseClicksNumber: function () {
 *                          this.numberOfClicks += 1;
 *                      }
 *                  },
 *                  sharedReferences: {},
 *                  cssStyles: [
 *                      '/some/styles/style.css'
 *                  ]
 *              },
 *              function (err) {
 *                  if (err) console.error(err);
 *              }
 *          );
 *      }).catch(console.error);
 * @class
 * @name JSTemplateComponent
 * @param {string} tagName
 * @param {JSTemplateComponent.options} options
 * @param {JSTemplateComponent.constructorCallback} callback
 */;

/**
 * @memberof JSTemplateComponent
 * @callback Builder
 * @param {string} tagName
 * @param {JSTemplateComponent.options} options
 * @param {JSTemplateComponent.constructorCallback} callback
 * @returns {JSTemplateComponent}
 */

/**
 * @memberof JSTemplateComponent
 * @interface contextInstance
 */
/**
 * @memberof JSTemplateComponent.contextInstance
 * @method redraw
 */
/**
 * @memberof JSTemplateComponent.contextInstance
 * @method redrawForce
 */
/**
 * @memberof JSTemplateComponent.contextInstance
 * @name references
 * @type {Object<string,any>}
 */
/**
 * @memberof JSTemplateComponent.contextInstance
 * @name node
 * @type {HTMLElement}
 */

/**
 * @memberof JSTemplateComponent
 * @typedef {object} contextLifeCycle
 * @property {JSTemplateComponent.lifeCycleCallback} [init] callbacks on init
 * @property {JSTemplateComponent.lifeCycleCallbackGetReferences} [getReferences] returns
 * @property {JSTemplateComponent.lifeCycleCallback} [contentChange] callback on content change
 * @property {JSTemplateComponent.lifeCycleCallback} [attrChange] context object default is Node
 * @property {JSTemplateComponent.lifeCycleCallback} [remove] context object default is Node
 */

/**
 * @memberof JSTemplateComponent
 * @interface contextWithInstance
 * @implements JSTemplateComponent.contextInstance
 */

/**
 * @memberof JSTemplateComponent.contextWithInstance
 * @name __instance
 * @type {JSTemplateComponent.contextInstance}
 */
/**
 * @memberof JSTemplateComponent.contextWithInstance
 * @description context object default is Node
 * @name __lifeCycle
 * @type {JSTemplateComponent.contextLifeCycle}
 */
/**
 * @memberof JSTemplateComponent.contextWithInstance
 * @description context object default is Node
 * @name state
 * @type {Object<string,(string|number|Object<string,any>|null|any[])>}
 */

/**
 * @memberof JSTemplateComponent
 * @interface contextWithoutInstance
 */
/**
 * @memberof JSTemplateComponent.contextWithoutInstance
 * @description context object default is Node
 * @name __lifeCycle
 * @type {JSTemplateComponent.contextLifeCycle}
 */
/**
 * @memberof JSTemplateComponent.contextWithoutInstance
 * @description context object default is Node
 * @name state
 * @type {Object<string,(string|number|Object<string,any>|null|any[])>}
 */

/**
 * @memberof JSTemplateComponent
 * @typedef {object} options
 * @property {function ():JSTemplateComponent.contextWithoutInstance} [context] context object default is Node
 * @property {JSTemplateComponent.contextLifeCycle} [__lifeCycle] context object default is Node
 * @property {string} [templateCode] template Code
 * @property {string} [templateUrl] template URL
 * @property {Array<string>} [cssStyles] list of URLs that point to styles
 * @property {object} [sharedReferences] references that will be same for all created components
 * @property {object} [sharedPrototypeMethods] methods that will be on all components under method "methods"
 * @property {boolean} [__flag_RejectOnStylesError=false]
 */

/**
 * @memberof JSTemplateComponent
 * @callback lifeCycleCallbackGetReferences
 * @param {JSTemplateComponent.contextWithInstance} context
 * @param {object} sharedReferences
 * @param {object} sharedPrototypeMethods
 * @returns {object}
 */

/**
 * @memberof JSTemplateComponent
 * @callback lifeCycleCallback
 * @param {JSTemplateComponent.contextWithInstance} context
 * @param {Object<string,any>} references
 * @param {Object<string,any>} methods
 */

/**
 * @memberof JSTemplateComponent
 * @callback constructorCallback
 * @param {Error} err
 */

 function JSTemplateComponentConstructor(
	/**
	 * @private
	 * @type {string}
	 */
	tagName,
	/**
	 * @private
	 * @type {JSTemplateComponent.options}
	 */
	options,
	/**
	 * @private
	 * @type {JSTemplateComponent.constructorCallback}
	 */
	callback
) {
	//@ts-ignore
	Application.require([
		"uriLoad	:: uri-load",
		"customElements :: custom-elements",
		"JSTemplate	 :: js-template",
		"request"
	]).then(function (lib) {
			/**
			 * @private
			 * @var {object} __instance
			 * @property {string} templateCode
			 */
			var __instance  = {
				templateCode : ''
			};

			function __getTemplate() {
				if (options.templateCode) {
					return Promise.resolve(options.templateCode);
				} else if (options.templateUrl) {
					return new Promise(function (resolve, reject) {
						new lib.request().url(options.templateUrl)
							.response("text")
							.then(function (templateCode) {
								__instance.templateCode = templateCode;
								resolve();
							}).catch(reject);
					});
				} else {
					return Promise.reject(Error('[OPTIONS_ERROR]: should be defined `templateCode` or `templateUrl`'));
				}
			}

			function __loadCssStyles() {
				if (!options.cssStyles.length) {
					return Promise.resolve();
				}
				return new Promise(function (resolve, reject) {
					lib.uriLoad.link(
						options.cssStyles,
						function (err) {
							if (err) {
								if (options.__flag_RejectOnStylesError) {
									reject(err);
								} else {
									resolve();
								}
							} else {
								resolve();
							}
						}
					);
				});
			}

			__getTemplate().then(
				function () {
					__loadCssStyles().then(
						function () {
							var sharedPrototypeMethods = options.sharedPrototypeMethods || {};
							lib.customElements.registerMethods(
								tagName,
								Object.assign(
									sharedPrototypeMethods,
									{
										"__onInit"	:
										/**
										 * @private
										 * @this {HTMLElement}
										 */
										function () {
											/**
											 * @private
											 * @type {HTMLElement}
											 */
											var node = this;
											/**
											 * @private
											 * @type {JSTemplateComponent.contextWithInstance}
											 */
											var _contextDefault = {
													setState   : function (state, callback) {
														ComponentContext.state = Object.assign(
															ComponentContext.state || {},
															state || {}
														);
														
														ComponentContext.__requireRender = true;
														ComponentContext.__instance.redraw();

														if (callback) callback();
													},
													__requireRender: true,
													__instance : {
														node   : node,
														redraw : function () {
															if (!ComponentContext.__requireRender) return;
															//@ts-ignore
															if (node.attrdata.JSRenderer) {
																//@ts-ignore
																ComponentContext.__requireRender = false;
																
																node.attrdata.JSRenderer.content.redraw();
																// /**
																//  * @deprecated
																//  */
																// node.attrdata.JSRenderer.attr.redraw();
															}
														},
														redrawForce: function () {
															ComponentContext.__requireRender = true;
															ComponentContext.__instance.redraw();
														}
													},
													__lifeCycle: {
														init: function () {
															if (options.__lifeCycle && options.__lifeCycle.init) {
																options.__lifeCycle.init(
																	ComponentContext,
																	envReferences,
																	sharedPrototypeMethods
																);
															}
														},
														attrChange: function () {
															if (options.__lifeCycle && options.__lifeCycle.attrChange) {
																options.__lifeCycle.attrChange(
																	ComponentContext,
																	envReferences,
																	sharedPrototypeMethods
																);
															}
														},
														getReferences: function () {
															// dummy function
														},
														contentChange: function () {
															if (options.__lifeCycle && options.__lifeCycle.contentChange) {
																options.__lifeCycle.contentChange(
																	ComponentContext,
																	envReferences,
																	sharedPrototypeMethods
																);
															}
														},
														remove: function () {
															if (options.__lifeCycle && options.__lifeCycle.remove) {
																options.__lifeCycle.remove(
																	ComponentContext,
																	envReferences,
																	sharedPrototypeMethods
																);
															}
														}
													}
												};

											var sharedReferences = options.sharedReferences || {};

											/**
											 * @private
											 * @type {JSTemplateComponent.contextWithInstance}
											 */
											var ComponentContext = Object.assign(
												options.context ? (options.context(_contextDefault, sharedReferences, sharedPrototypeMethods) || {}) : {},
												_contextDefault
											);
	
											var envReferences = Object.assign({}, sharedReferences);

											if (options.__lifeCycle && options.__lifeCycle.getReferences) {
												Object.assign(
													envReferences,
													options.__lifeCycle.getReferences(
														ComponentContext,
														sharedReferences,
														sharedPrototypeMethods
													) || {}
												);
											}
						
											ComponentContext.__instance.references = envReferences;

											node.innerHTML	= __instance.templateCode;

											// @ts-ignore
											node.attrdata.JSRenderer	= {
												ComponentContext: ComponentContext,
												envReferences: envReferences,
												content : lib.JSTemplate.parseContent(node, function () {}, {
													context : ComponentContext,
													args	 : envReferences
												}),
												attr	: lib.JSTemplate.parseAttributes(node, function () {}, {
													context : ComponentContext,
													args	 : envReferences
												})
											};
											
											if (options.__lifeCycle && options.__lifeCycle.init) {
												options.__lifeCycle.init.apply(
													ComponentContext,
													[
														ComponentContext,
														envReferences,
														sharedPrototypeMethods
													]
												);
											}

											ComponentContext.__instance.redraw();
										},
										"__onContentChange" :
										/**
										 * @private
										 * @this {HTMLElement}
										 */
										function () {
											if (this.attrdata.JSRenderer && this.attrdata.JSRenderer.ComponentContext) {

												if (
													this.attrdata.JSRenderer.ComponentContext.__requireRender
												// 	!this.attrdata.JSRenderer.ComponentContext.__instance.__renderStarted
												) {
													if (options.__lifeCycle && options.__lifeCycle.contentChange) {
														options.__lifeCycle.contentChange.apply(
															this.attrdata.JSRenderer.ComponentContext,
															[
																this.attrdata.JSRenderer.ComponentContext,
																this.attrdata.JSRenderer.envReferences,
																this.methods
															]
														);
													}

													this.attrdata.JSRenderer.ComponentContext.__instance.redraw();
												}
											}
										},
										"__onAttrChange" :
										/**
										 * @private
										 * @this {HTMLElement}
										 */
										function () {
											if (this.attrdata.JSRenderer && this.attrdata.JSRenderer.ComponentContext) {

												if (
													this.attrdata.JSRenderer.ComponentContext.__requireRender
												// 	!this.attrdata.JSRenderer.ComponentContext.__instance.__renderStarted
												) {

													if (options.__lifeCycle && options.__lifeCycle.attrChange) {
														options.__lifeCycle.attrChange.apply(
															this.attrdata.JSRenderer.ComponentContext,
															[
																this.attrdata.JSRenderer.ComponentContext,
																this.attrdata.JSRenderer.envReferences,
																this.methods
															]
														);
													}
													this.attrdata.JSRenderer.ComponentContext.__instance.redraw();
												}
											}
										},
										"__onRemove" :
										/**
										 * @private
										 * @this {HTMLElement}
										 */
										function () {
											if (this.attrdata.JSRenderer) {
												if (options.__lifeCycle && options.__lifeCycle.remove) {
													options.__lifeCycle.remove.apply(
														this.attrdata.JSRenderer.ComponentContext,
														[
															this.attrdata.JSRenderer.ComponentContext,
															this.attrdata.JSRenderer.envReferences,
															this.methods
														]
													);
												}
											}
										}
									}
								)
							);
						}
					).catch(function (err) {
						callback(err);
					});
				}
			).catch(function (err) {
				callback(err);
			});
	}).catch(function (err) {
		callback(err);
	});

	return this;
}

module.exports = JSTemplateComponentConstructor;
