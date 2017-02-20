/* jshint -W002 */
Application.require("extensions/prototype", function (epro) {
    module.exports  = function () {
        var app     = new ApplicationPrototype();
        var httpRequest = new XMLHttpRequest();
        var promise = new Application.Promise();
        var config  = {
            method  : "GET",
            url     : "#",
            async   : true,
            opened  : false,
            isSent  : false,
            isLoaded: false,
            isUploaded: false,
            ignoreStatusCode : false
        };

        var configurator    = {
            "ignore-status-code"  : function () {
              config.ignoreStatusCode = true;
            },
            "check-status-code"  : function () {
              config.ignoreStatusCode = false;
            },
            "prepare-post"  : function () {
                httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            },
            "retrieve-binary-string"    : function () {
                httpRequest.overrideMimeType("text/plain; charset=x-user-defined");
                httpRequest.responseType = "arraybuffer";
            },
            "retrieve-blob"    : function () {
                httpRequest.responseType = "blob";
            },
            "prepare-multipart" : function () {
                config.sBoundary    = config.sBoundary || epro.fn.getRandId().toHex();
                httpRequest.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + config.sBoundary);
            },
            "POST" : "prepare-post",
            "binary"    : "retrieve-binary-string",
            "blob" : "retrieve-blob",
            "multipart" : "prepare-multipart"
        };

        app.bind("config", function () {
            return config;
        });

        app.bind("configurator", function (template) {
            var f = function (template) {
                if (typeof(configurator[template]) === "string") {
                    return f(configurator[template]);
                } else if (typeof(configurator[template]) === "function") {
                    return configurator[template];
                }
            };
            var configTemplate = f(template);
            if (typeof(configTemplate) === "function") {
                configTemplate();
            }
            return app;
        });

        // events for download
        httpRequest.addEventListener("progress", function (evt) {
            if (evt.lengthComputable && evt.total) {
                var percentComplete = evt.loaded / evt.total;
                app.emit("progress", [evt, percentComplete]);
            } else {
                app.emit("progress", [evt]);
            }
        });
        httpRequest.addEventListener("load", function (evt) {
            app.emit("load", [evt]);
        });
        httpRequest.addEventListener("loadend", function (evt) {
            config.isLoaded = true;
            app.emit("loadend", [evt]);
        });
        httpRequest.addEventListener("error", function (evt) {
            app.emit("error", [evt]);
        });
        httpRequest.addEventListener("abort", function (evt) {
            app.emit("abort", [evt]);
        });

        // events for upload
        httpRequest.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable && evt.total) {
                var percentComplete = evt.loaded / evt.total;
                app.emit("upload-progress", [evt, percentComplete]);
            } else {
                app.emit("upload-progress", [evt]);
            }
        });
        httpRequest.upload.addEventListener("load", function (evt) {
            app.emit("upload-load", [evt]);
        });
        httpRequest.upload.addEventListener("error", function (evt) {
            app.emit("upload-error", [evt]);
        });
        httpRequest.upload.addEventListener("abort", function (evt) {
            app.emit("upload-abort", [evt]);
        });


        httpRequest.upload.addEventListener("loadend", function (evt) {
            config.isUploaded = true;
            app.emit("upload-loadend", [evt]);
        });

        app.bind("request", function () { return httpRequest; }, "");
        app.bind("response", function (type, params) {
            var er, data, node;
            if (typeof(type) === "undefined") {
                return httpRequest.response;
            } else {
                if (!config.isSent) {
                    app.send();
                }
                if (!config.isLoaded) {
                    return new Application.Promise(function (resolve, reject) {
                        app.on("loadend", function () {
                            var result = app.response(type, params);
                            result.then(function (data) {
                                resolve(data);
                            }, function (er) {
                                er.httpRequest = app;
                                reject(er);
                            });
                        });
                        app.on("error", function (er) {
                            er.httpRequest = app;
                            reject(er);
                        });
                    });
                }
                var response = Application.Promise(), reader;
                if (type === "request") {
                  response.resolve(app);
                } else if (type === "response") {
                  response.resolve(httpRequest.response);
                } else if (httpRequest.responseType === "arraybuffer") {
                    switch (type) {
                        case "blob":
                            response.resolve(new Blob(
                                [httpRequest.response],
                                params || {type: "application/octet-stream"}
                            ));
                        break;
                        case "json":
                            data    = undefined;
                            er = undefined;
                            try {
                                data = JSON.parse(httpRequest.response.toStringUtf8());
                                response.resolve(data);
                            } catch (er) {}
                            if (typeof(er) !== "undefined") {
                                response.reject(er);
                            }
                        break;
                        case "document":
                            node = document.createElement("div");
                            node.innerHTML  = httpRequest.response.toStringUtf8();
                            response.resolve(node);
                        break;
                        case "text":
                            response.resolve(httpRequest.response.toStringUtf8());
                        break;
                        case "arraybuffer":
                            response.resolve(httpRequest.response);
                        break;
                    }
                } else if (httpRequest.responseType === "blob") {
                    switch (type) {
                        case "blob":
                            response.resolve(httpRequest.response);
                        break;
                        case "json":
                            httpRequest.response.toArrayBuffer(function (er, data) {
                                if (typeof(er) !== "undefined") {
                                    response.reject(er);
                                } else {
                                    var str = data.toStringUtf8();
                                    data = undefined;
                                    er  = undefined;
                                    try {
                                        data = JSON.parse(str);
                                        response.resolve(data);
                                    } catch (er) {}
                                    if (typeof(er) !== "undefined") {
                                        response.reject(er);
                                    }
                                }
                            });
                        break;
                        case "document":
                            httpRequest.response.toArrayBuffer(function (er, data) {
                                if (typeof(er) !== "undefined") {
                                    response.reject(er);
                                } else {
                                    var node = document.createElement("div");
                                    node.innerHTML  = data.toStringUtf8();
                                    response.resolve(node);
                                }
                            });
                        break;
                        case "text":
                            httpRequest.response.toArrayBuffer(function (er, data) {
                                if (typeof(er) !== "undefined") {
                                    response.reject(er);
                                } else {
                                    response.resolve(data.toStringUtf8());
                                }
                            });
                        break;
                        case "arraybuffer":
                            httpRequest.response.toArrayBuffer(function (er, data) {
                                if (typeof(er) !== "undefined") {
                                    response.reject(er);
                                } else {
                                    response.resolve(data);
                                }
                            });
                        break;
                    }
                } else {
                    switch (type) {
                        case "blob":
                            response.resolve(new Blob([httpRequest.response], (params || { type: "application/octet-stream" })));
                        break;
                        case "json":
                            var str = httpRequest.response;
                            data = undefined;
                            er  = undefined;
                            try {
                                data = JSON.parse(str);
                                response.resolve(data);
                            } catch (er) {}
                            if (typeof(er) !== "undefined") {
                                response.reject(er);
                            }
                        break;
                        case "document":
                            node = document.createElement("div");
                            node.innerHTML  = httpRequest.response;
                            response.resolve(node);
                        break;
                        case "text":
                            response.resolve(httpRequest.response);
                        break;
                        case "arraybuffer":
                            response.resolve(httpRequest.response.toArrayBufferFromUtf8());
                        break;
                    }
                }
                return new Application.Promise(function (resolve, reject) {
                  response.then(function (data) {
                    if (httpRequest.status === 200 || config.ignoreStatusCode) {
                      resolve(data);
                    } else {
                      var er = Error(
                        httpRequest.statusText ?
                        ('Status '+ httpRequest.status + ': ' + httpRequest.statusText) :
                        ("Response Status is " + httpRequest.status)
                      );
                      er.httpRequest = app;
                      er.httpResponse = data;
                      reject(er);
                    }
                  }, function (er) {
                    er.httpRequest = app;
                    reject(er);
                  });
                });
            }
        }, "");

        app.bind("timeout", function (seconds) {
          if (typeof(seconds) === "number") {
            httpRequest.timeout = seconds || 0;
            return app;
          }
          return httpRequest.timeout || 0;
        });

        app.bind("withCredentials", function (status) {
          if (typeof(status) === "boolean") {
            httpRequest.withCredentials = !!status;
            return app;
          }
          return !!httpRequest.withCredentials;
        });

        // Client has been created. open() not called yet.
        app.READY_STATE_UNSENT = 0;
        // open() has been called.
        app.READY_STATE_OPENED = 1;
        // send() has been called, and headers and status are available.
        app.READY_STATE_HEADERS_RECEIVED = 2;
        // Downloading; responseText holds partial data.
        app.READY_STATE_LOADING = 3;
        // Downloading is done
        app.READY_STATE_DONE = 4;

        app.bind("readyState", function (int) {
          return httpRequest.readyState;
        });

        httpRequest.onreadystatechange = function () {
          app.emit('onReadyState', [httpRequest.readyState, httpRequest.status]);
        };

        app.bind("status", function (int) {
          return httpRequest.status;
        });

        app.bind("statusText", function (int) {
          return httpRequest.status;
        });



        app.bind("async", function (bool) {
            if (typeof(bool) !== "undefined") {
                config.async = !!bool;
                return app;
            }
            return config.async;
        });
        app.bind("method", function (method) {
            if (typeof(method) === "string") {
                config.method = method;
                return app;
            }
            return config.method;
        });
        app.bind("url", function (url) {
            if (typeof(url) === "string") {
                config.url = url;
                return app;
            }
            return config.url;
        });
        app.bind("open", function (method, url, async, timeout) {
            if (method && typeof(url) === "undefined" && typeof(async) === "undefined") {
                url = method;
                method = undefined;
            }
            app.timeout(timeout);
            config.opened   = true;
            httpRequest.open(method || config.method, url || config.url, async || config.async);
            return app;
        });
        app.bind("send", function (data, type) {
            if (!config.opened) {
                app.open();
            }
            if (config.isSent) {
                console.warn("Error: the request is sended twice", app, app.request());
                return app;
            }
            config.isSent   = true;
            if (type === "asFormData") {
                // convert data to form data
                var fData = new FormData();
                var i;
                for (i in data) {
                    fData.append(i, data[i]);
                }
                httpRequest.send(fData);
            } else {
                httpRequest.send(typeof(data) === "undefined" ? null : data);
            }
            return app;
        });

        app.bind("headers", function () {
          return httpRequest.getAllResponseHeaders();
        });

        app.bind("header", function (name, value) {
            httpRequest.setRequestHeader(name, value);
            return app;
        });

        return app;
    };
});
