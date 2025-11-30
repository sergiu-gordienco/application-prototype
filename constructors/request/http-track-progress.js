;((function () {
    const progressBar = (function () {
        const app = new ApplicationPrototype();
    
        const progressMap = new Map();
    
        let progress = 0;
        /** @type {HTMLProgressElement|null} */
        let node     = null;
    
        app.property('progress', function () {
            return progress;
        });
    
        app.bind('show', function (container) {
            if (!node) {
                node = document.createElement('progress');
                node.value = (100 - progress);
                node.max = 100;
            }
            if (container) {
                container.appendChild(node);
            } else {
                if (!node.parentElement) {
                    document.body.appendChild(node);
                }
            }
        });
    
        app.bind('hide', function () {
            if (node) {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                node = null;
            }
        });
    
        app.on('update', function (progress) {
            if (node) {
                node.value = (100 - Math.floor(progress * 100));
            }
        });
    
        function updateProgressBar() {
            if (progressMap.size === 0) {
                progress = 0;
                app.emit('update', [0]);
                return;
            }
    
            let total = 0;
            for (let v of progressMap.values()) total += v;
            progress = (total / progressMap.size);
            app.emit('update', [progress]);
        }
    
        function beginRequest(id) {
            progressMap.set(id, 0);
            updateProgressBar();
        }
    
        function updateRequest(id, value) {
            progressMap.set(id, value);
            updateProgressBar();
        }
    
        function endRequest(id) {
            progressMap.set(id, 1);
            updateProgressBar();
            setTimeout(() => {
                progressMap.delete(id);
                updateProgressBar();
            }, 300);
        }
    
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
    
        XMLHttpRequest.prototype.open = function (...args) {
            this._reqId = "xhr_" + Math.random().toString(36).slice(2);
            return originalOpen.apply(this, args);
        };
    
        XMLHttpRequest.prototype.send = function (...args) {
            const id = this._reqId;
            beginRequest(id);
    
            this.addEventListener("progress", (e) => {
                if (e.lengthComputable && e.total > 0) {
                    updateRequest(id, e.loaded / e.total);
                } else {
                    updateRequest(id, 0.5);
                }
            });
    
            this.addEventListener("loadend", () => {
                endRequest(id);
            });
    
            return originalSend.apply(this, args);
        };
    
        const originalFetch = window.fetch;
    
        window.fetch = async function (...args) {
            const id = "fetch_" + Math.random().toString(36).slice(2);
            beginRequest(id);
    
            try {
                const response = await originalFetch(...args);
    
                const contentLength = response.headers.get("content-length");
                const total = contentLength ? parseInt(contentLength, 10) : null;
    
                if (!response.body || !total) {
                    updateRequest(id, 0.5);
                    const clone = response.clone();
                    await clone.blob();
                    endRequest(id);
    
                    return response;
                }
    
                const reader = response.body.getReader();
                let loaded = 0;
    
                const stream = new ReadableStream({
                    start(controller) {
                        function read() {
                            reader.read().then(({ done, value }) => {
                                if (done) {
                                    endRequest(id);
                                    controller.close();
                                    return;
                                }
                                loaded += value.length;
                                updateRequest(id, loaded / total);
                                controller.enqueue(value);
                                read();
                            });
                        }
                        read();
                    }
                });
    
                return new Response(stream, response);
            } catch (err) {
                endRequest(id);
                throw err;
            }
        };


        function trackResourceElement(el, url) {
            const id = "res_" + Math.random().toString(36).slice(2);
            beginRequest(id);

            let done = false;

            function finish(ok) {
                if (done) return;
                done = true;
                endRequest(id);
            }

            el.addEventListener("load", () => finish(true));
            el.addEventListener("error", () => finish(false));

            if ("performance" in window && "getEntriesByName" in performance) {
                const interval = setInterval(() => {
                    const entries = performance.getEntriesByName(url);
                    if (entries && entries.length > 0) {
                        const entry = entries[0];
                        if (entry.transferSize > 0 && entry.encodedBodySize > 0) {
                            updateRequest(id, entry.transferSize / entry.encodedBodySize);
                        }
                    }
                }, 100);

                el.addEventListener("load", () => clearInterval(interval));
                el.addEventListener("error", () => clearInterval(interval));
            }

            setTimeout(() => {
                if (!done) updateRequest(id, 0.5);
            }, 50);
        }

        const originalSetAttribute = Element.prototype.setAttribute;
        Element.prototype.setAttribute = function (name, value) {
            if (name === "src" || name === "href") {
                if (this instanceof HTMLScriptElement ||
                    this instanceof HTMLImageElement ||
                    (this instanceof HTMLLinkElement && this.rel === "stylesheet")) {
                    trackResourceElement(this, value);
                }
            }
            return originalSetAttribute.call(this, name, value);
        };

        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const n of m.addedNodes) {
                    if (!(n instanceof HTMLElement)) continue;

                    if (n instanceof HTMLScriptElement && n.src)
                        trackResourceElement(n, n.src);

                    if (n instanceof HTMLImageElement && n.src)
                        trackResourceElement(n, n.src);

                    if (n instanceof HTMLLinkElement && n.rel === "stylesheet" && n.href)
                        trackResourceElement(n, n.href);
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        return app;
    })();

    var err;
    try {
        if (typeof(module) == "object" && module && typeof(module.resourceUrl) === "function") {
            module.exports = progressBar;
        }
    } catch (err) {}

    window.HttpTrackProgressManager = progressBar;
})());

