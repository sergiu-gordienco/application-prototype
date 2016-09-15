/**
 *  has dependencies that are not added in tris project
 */
module.exports	= (function () {
	_(newCss(__dirname+'/popup/style.css')).v({
		"application-style"	: "viewport-units"
	});
	methods	= {
		popup	: function (node, showOnLoad) {
			var p	= _();
			var popup	= {
				space		: null,
				// body		: null,
				container	: null,
				onOutsideClick	: true,
				show		: function () {
					if (p.E(popup.space).is_free()) {
						p.E(popup.space).adEto(document.body);
					}
				},
				hide		: function () {
					if (!p.E(popup.space).is_free()) {
						p.E(popup.space).free();
					}
				},
				get header() {
					return p.E(popup.container).Q('.module__widget_popup_controls')._();
				},
				set header(content) {
					if (typeof(title) !== "object") {
						p.E(popup.container).U().Q('.module__widget_popup_controls').d().e(content);
					} else {
						p.E(popup.container).U().Q('.module__widget_popup_controls').d().t(content);
					}
				},
				get content() {
					return p.E(popup.container)._();
				},
				set content(content) {
					if (typeof(title) !== "object") {
						p.E(popup.container).d().e(content);
					} else {
						p.E(popup.container).d().t(content);
					}
				},
				get body() {
					return p.E(popup.container).U()._();
				},
				set body(node) {
					popup.content = node;
				},
				get footer() {
					return p.E(popup.container).U().Q('.module__widget_popup_footer')._();
				},
				set footer(content) {
					if (typeof(content) !== "object") {
						p.E(popup.container).U().Q('.module__widget_popup_footer').d().e(content);
					} else {
						p.E(popup.container).U().Q('.module__widget_popup_footer').d().t(content);
					}
				}
			};
			popup.container	= p.E('table').c('module__widget_popup')
				.e('tbody','~')
				.e('tr','~')
				.e('td','~').on('click', function (event) {
					if (!popup.onOutsideClick) {
						var node	= (event.srcElement || event.target);
						if (node === this) {
							popup.hide();
						}
					} else if ( typeof(popup.onOutsideClick) === "function" ) {
						popup.onOutsideClick.apply(this, [popup]);
					}
				})
					.e('div', '~').c('regal-royal', '+')
						// .span
					.e('div', '~').c('module__widget_popup_controls').U()
					.e('div', '~').c('module__widget_popup_content')
					._();
			popup.space	= p
				.U().e('div', '~').c('module__widget_popup_footer')
			.P(5)._();

			popup.theme	= function (theme) {
				switch (theme) {
					case "light":
						p.E(popup.body).c('regal-royal', '+');
						p.E(popup.body).c('regal-royal--dark-theme', '-');
					break;
					case "dark":
						p.E(popup.body).c('regal-royal', '+');
						p.E(popup.body).c('regal-royal--dark-theme', '+');
					break;
					case "clean":
						p.E(popup.body).c('regal-royal', '-');
						p.E(popup.body).c('regal-royal--dark-theme', '-');
					break;
				}
			};

			if (node) {
				p.E(popup.container).e(node);
			}
			if (showOnLoad === true || typeof(showOnLoad) === "undefined") {
				popup.show();
			}
			return popup;
		},
		alert	: function (title, text, callback_f) {
			var config	= {
				title	: "",
				icon	: "N",
				text	: "",
				theme	: "",
				buttons	: [
					{
						text	: "OK",
						callback	: function () {
							this.hide();
						},
						className	: "",
						focused	: true,
					}
				],
				html	: false,
				focus	: true,
				focusWindow	: true,
				animate	: true,
				visible	: true,
				onOutsideClick	: false
			};
			var mergeConfig	= function (conf) {
				if (!conf || typeof(conf) !== "object") {
					return false;
				};
				[ "title", "text", "icon" ].forEach(function (field) {
					if ((field in conf)) {
						if (conf[field] instanceof Element) {
							config[field]	= conf[field];
						} else {
							// todo check
							config[field]	= conf[field];
						}
					}
				});
				[ "theme" ].forEach(function (field) {
					if ((field in conf)) {
						if (typeof(conf[field]) === typeof(config[field])) {
							config[field]	= conf[field];
						}
					}
				});
				[ "html", "focus", "focusWindow", "animate", "visible" ].forEach(function (field) {
					if (field in conf) {
						config[field]	= !!conf[field];
					}
				});
				if ("onOutsideClick" in conf) {
					if (typeof(conf.onOutsideClick) === "function") {
						config.onOutsideClick	= conf.onOutsideClick;
					} else {
						config.onOutsideClick	= !conf.onOutsideClick;
					}
				}
				if ("buttons" in conf) {
					if (Array.isArray(conf.buttons)) {
						config.buttons	= conf.buttons.filter(function (b) {
							return (b && typeof(b) === "object");
						});
					}
				}
			};

			// title
			if (typeof(title) === "object") {
				if (title instanceof Element) {
					config.title	= title;
				} else {
					if (title) {
						mergeConfig(title);
					}
				}
			} else if ( typeof(title) === "function" ) {
				mergeConfig({
					buttons	: [
						{
							text	: "OK",
							callback	: title
						}
					]
				});
			} else if (typeof(title) !== "undefined") {
				config.title	= title;
			};
			// text
			if (typeof(text) === "object") {
				if (text instanceof Element) {
					config.text	= text;
				} else {
					if (text) {
						mergeConfig(text);
					}
				}
			} else if ( typeof(text) === "function" ) {
				mergeConfig({
					buttons	: [
						{
							text	: "OK",
							callback	: text
						}
					]
				});
			} else if (typeof(text) !== "undefined") {
				config.text	= text;
			}

			var p	= _();
			var popup	= methods.popup(false, false);

			if (config.theme) {
				popup.theme(config.theme);
			}

			p.E(popup.footer)
				.c('rr-block-space', '+');

			p.E(popup.content)
				.e('div', '~')
					.c('rr-block-24')
					.e('div', '~')
						.c('rr-block-space');
			if (config.icon) {
				if (typeof (config.icon) === "object") {
					p.e('span', '~')
						.v({ "attr-icon" : "node" })
						.e(config.icon);
					if (config.animate) {
						p.c('animated animated-w1s rotateInDownLeft', '+')
					}
					p.U();
				} else if (config.html) {
					// html content
					p.e('span', '~')
						.v({ "attr-icon" : "html" })
						.V({ innerHTML	: config.icon })
					.U();
				} else {
					// textual content
					p.e('span', '~')
						.v({ "attr-icon" : "websymbols" })
						.v({ "rr-icon" : "" })
						.c('rr-text-'+(config.icon.split(/\s+/)[1] || 'regular'))
						.F({
							display	: 'block',
							lineHeight	: 2
						})
						.t(config.icon.split(/\s+/)[0] || 'N');
					if (config.animate) {
						p.c('animated animated-w0_5s animated-0_5s rotateInDownLeft', '+')
					}
					p.U();
				}
			}
			if (config.title) {
				if (typeof (config.title) === "object") {
					p.e('div', '~')
						.c('rr-block-space')
						.e(config.title)
					.U();
				} else if (config.html) {
					// html content
					p.e('div', '~')
						.c('rr-block-space')
						.V({ innerHTML	: config.title })
					.U();
				} else {
					// textual content
					p.e('div', '~')
						.c('rr-block-space')
						.t(config.title)
					.U();
				}
			}
			p.e('div', '~')
				.c('rr-widget-box');
			
			if (config.text) {
				if (typeof (config.text) === "object") {
					p.e('div', '~')
						.c('rr-block-space')
						.e(config.text)
					.U();
				} else if (config.html) {
					// html content
					p.e('div', '~')
						.c('rr-block-space')
						.V({ innerHTML	: config.text })
					.U();
				} else {
					// textual content
					p.e('div', '~')
						.c('rr-block-space')
						.e('center', '~')
							.t(config.text)
						.U()
					.U();
				}
			}
			
			popup.attachButton	= function (buttonConfig) {
				// normalize button configuration
				if (!buttonConfig || typeof(buttonConfig) !== "object") {
					buttonConfig	= {};
				}
				buttonConfig.focused	= !!buttonConfig.focused;
				buttonConfig.text		= (buttonConfig.text || "");
				if (typeof(buttonConfig.callback) !== "function") {
					buttonConfig.callback	= function () {
						this.hide();
					};
				};
				if (typeof(buttonConfig.className) !== "string") {
					buttonConfig.className	= "";
				};
				// build button Object
				var button	= {
					config	: buttonConfig
				};
				var p		= _();
				var node	= p.E('button')._();
				button.node	= node;
				if (buttonConfig.text) {
					switch (typeof(buttonConfig.text)) {
						case "object":
							p.E(node).e(buttonConfig.text);
						break;
						case "string":
							p.E(node).t(buttonConfig.text);
						break;
					}
				};
				p.E(node).on('click', function (event) {
					if (buttonConfig.callback) {
						var res	= buttonConfig.callback.apply(popup, [event, button]);
						if (typeof(res) !== "undefined") {
							return res;
						}
					}
				});
				button.remove	= function () {
					p.E(node).free();
					config.buttons	= config.buttons.filter(function (v) {
						return (buttonConfig !== v);
					});
				};
				button.attach	= function () {
					p.E(node).free().adEto(popup.footer);
				};
				button.hide	= function () {
					p.E(node).F({
						display	: "none"
					});
				};
				button.show	= function () {
					p.E(node).F({
						display	: ""
					});
				};
				button.attach();
				
				var er;
				button.focus	= function () {
					try {
						node.focus();
					} catch (er) {}
				};
				
				if (buttonConfig.className) {
					try {
						p.E(node).c(buttonConfig.className, '+');
					} catch (er) {}
				}
				
				return button;
			};
			
			if (Array.isArray(config.buttons)) {
				config.buttons	= config.buttons.map(popup.attachButton);
			}

			if (config.animate) {
				p.E(popup.space).c('animated fadeIn', '+');
				p.E(popup.body).c('animated bounceIn', '+');
			}

			popup.onOutsideClick	= config.onOutsideClick;
			popup.buttons			= config.buttons;

			if (config.visible) {
				popup.show();
				var er;
				if (config.focusWindow) {
					try {
						window.focus();
					} catch (er) {};
				}
				
				if (config.focus) {
					popup.buttons.forEach(function (button) {
						if (button.config.focused) {
							button.focus();
						}
					});
				}
			}
			return popup;
		},
		prompt	: function (title, text, callback) {
			var p	= _();
			var popup	= methods.alert({
				title	: "",
				text	: p.E('div')
							.e('div', '~')
								.c('rr-block-space')
								.t(title || "")
							.U()
							.e('input', '~')
								.c('module__widget_popup_row_input rr-block', '+')
								.V({
									type	: "text",
									value	: (text || "")
								})
							.U()
						._(),
				buttons	: [
					{
						text		: "OK",
						callback	: function (event, button) {
							var status	= true;
							if (typeof(callback) === "function") {
								if (callback.apply(this, [
									p.E(this.content).Q('input[type="text"]')._().value
									, event, button]) === false
								) {
									status	= false;
								}
							}
							if (status) {
								this.hide();
							}
						},
						focused		: true
					},
					{
						text		: "Cancel",
						callback	: function (event, button) {
							var status	= true;
							if (typeof(callback) === "function") {
								if (callback.apply(this, [undefined, event, button]) === false) {
									status	= false;
								}
							}
							if (status) {
								this.hide();
							}
						}
					}
				]
			});
			var input	= p.E(popup.content).Q('input')._();
			input.focus();
			input.select();
			return popup;
		},
		confirm	: function (title, callback) {
			var p	= _();
			var popup	= methods.alert({
				title	: (typeof(title) !== "string" ? title : p.E('div').F({textAlign: "center"}).t(title || "")._()),
				text	: false,
				buttons	: [
					{
						text		: "OK",
						callback	: function (event, button) {
							var status	= true;
							if (typeof(callback) === "function") {
								if (callback.apply(this, [true, event, button]) === false
								) {
									status	= false;
								}
							}
							if (status) {
								this.hide();
							}
						},
						focused		: true
					},
					{
						text		: "No",
						callback	: function (event, button) {
							var status	= true;
							if (typeof(callback) === "function") {
								if (callback.apply(this, [false, event, button]) === false) {
									status	= false;
								}
							}
							if (status) {
								this.hide();
							}
						}
					}
				]
			});
			var input	= p.E(popup.content).Q('input')._();
			if (input) {
				input.focus();
				input.select();
			}
			return popup;
		}
	};
	return methods;
})();
