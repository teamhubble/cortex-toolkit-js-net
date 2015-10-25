exports[true] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/***
	 * All information contained herein is, and remains
	 * the property of Cortex Media and its suppliers,
	 * if any.  The intellectual and technical concepts contained
	 * herein are proprietary to Cortex Media and its suppliers
	 * and may be covered by Canada and Foreign Patents,
	 * and are protected by trade secret or copyright law.
	 * Dissemination of this information or reproduction of this material
	 * is strictly forbidden unless prior written permission is obtained
	 * from Cortex Media.
	 *
	 * @copyright Cortex Media 2015
	 *
	 * @author Mathieu Rhéaume
	 */
	var P = __webpack_require__(2);
	/**
	 * @classdesc Provides a simple way to use Promise with XHR Callback
	 */
	var com;
	(function (com) {
	    var cortex;
	    (function (cortex) {
	        var core;
	        (function (core) {
	            var net;
	            (function (net) {
	                var LazyLoader = (function () {
	                    function LazyLoader() {
	                    }
	                    /**
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {string} aFile - Path of the file to fetch
	                     * @param {string} aApiToken - Token to add in Autorization header if used in beaver token
	                     * @param {object} aDatastoreObject - A Datastore object to cache the XHR Response.
	                     */
	                    LazyLoader.loadJSON = function (aFile, aApiToken, aDatastoreObject) {
	                        var deferObject = P.defer();
	                        if (aDatastoreObject != null && aDatastoreObject.get(aFile) != null) {
	                            deferObject.resolve(aDatastoreObject.get(aFile));
	                        }
	                        else {
	                            //<Review> this should be a function
	                            //<Review> Might want to wrap the request in something custom as you do a lot
	                            // of treatement that similar in all three functions
	                            var xhr = new XMLHttpRequest();
	                            //</Review>
	                            xhr.open("GET", aFile, true);
	                            try {
	                                xhr.responseType = "json";
	                            }
	                            catch (e) {
	                                // WebKit added support for the json responseType value on 09/03/2013
	                                // https://bugs.webkit.org/show_bug.cgi?id=73648. Versions of Safari prior to 7 are
	                                // known to throw when setting the value "json" as the response type. Other older
	                                // browsers implementing the responseType
	                                //
	                                // The json response type can be ignored if not supported, because JSON payloads are
	                                // parsed on the client-side regardless.
	                                if (xhr.responseType !== "json" && xhr.responseText !== "json") {
	                                }
	                            }
	                            if (aApiToken !== undefined && aApiToken.length > 0) {
	                                xhr.setRequestHeader("Authorization", "Token token=" + aApiToken);
	                            }
	                            xhr.onerror = function (error) {
	                                deferObject.reject(error);
	                            };
	                            xhr.onload = function () {
	                                if (xhr.response !== null) {
	                                    var objToReturn;
	                                    if (typeof (xhr.response) === "string") {
	                                        objToReturn = JSON.parse(xhr.response);
	                                    }
	                                    else {
	                                        objToReturn = xhr.response;
	                                    }
	                                    if (aDatastoreObject !== undefined) {
	                                        aDatastoreObject.set(aFile, objToReturn);
	                                    }
	                                    deferObject.resolve(objToReturn);
	                                }
	                                else {
	                                    deferObject.reject(new Error("No valid JSON object was found (" +
	                                        xhr.status + " " + xhr.statusText + ")"));
	                                }
	                            };
	                            xhr.send();
	                        }
	                        return deferObject.promise();
	                    };
	                    /**
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {string} aFile - Path of the file to fetch
	                     */
	                    LazyLoader.loadFile = function (aFile) {
	                        var deferObject = P.defer(), xhr = new XMLHttpRequest();
	                        xhr.open("GET", aFile, true);
	                        xhr.onerror = function (error) {
	                            deferObject.reject(error);
	                        };
	                        xhr.onload = function () {
	                            if (xhr.response !== null) {
	                                var objToReturn;
	                                if (typeof (xhr.response) === "string") {
	                                    objToReturn = JSON.parse(xhr.response);
	                                }
	                                else {
	                                    objToReturn = xhr.response;
	                                }
	                                deferObject.resolve(objToReturn);
	                            }
	                            else {
	                                deferObject.reject(new Error("No valid JSON object was found (" +
	                                    xhr.status + " " + xhr.statusText + ")"));
	                            }
	                        };
	                        xhr.send();
	                        return deferObject.promise();
	                    };
	                    /**
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {string} aFile - Path of the file to fetch
	                     */
	                    LazyLoader.loadTemplate = function (aFile) {
	                        var deferObject = P.defer(), xhr = new XMLHttpRequest();
	                        xhr.open("GET", aFile, true);
	                        xhr.onerror = function (error) {
	                            deferObject.reject(error);
	                        };
	                        xhr.onload = function () {
	                            if (xhr.response !== null) {
	                                deferObject.resolve(xhr.response);
	                            }
	                            else {
	                                deferObject.reject(new Error("No valid JSON object was found (" +
	                                    xhr.status + " " + xhr.statusText + ")"));
	                            }
	                        };
	                        xhr.send();
	                        return deferObject.promise();
	                    };
	                    /**
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {string} aFile - Path of the file to fetch
	                     * @param {object} aJsonObject - Json object to send
	                     * @param {boolean} aSyncOrNot - Execute the request in sync or async mode.
	                     * @param {string} aApiToken - Token to use in autorization header.
	                     */
	                    LazyLoader.sendJSON = function (aFile, aJsonObject, aSyncOrNot, aApiToken) {
	                        var deferObject = P.defer(), xhr = this.getXHRObject("POST", aFile, aSyncOrNot, aApiToken);
	                        xhr.onerror = function (error) {
	                            deferObject.reject(error);
	                        };
	                        xhr.onload = function () {
	                            LazyLoader.handleXHRReponse(xhr, deferObject);
	                        };
	                        xhr.send(JSON.stringify(aJsonObject));
	                        return deferObject.promise();
	                    };
	                    /**
	                     * Realise a PUT (UPDATE) Operation from a provided Json Object.
	                     *
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {string} aFile - Path of the file to fetch
	                     * @param {any} aJsonObject - JSON Object to send.
	                     * @param {boolean} aSyncOrNot - Execute the request in sync or async mode.
	                     * @param {string} aApiToken - Token to use in autorization header.
	                     */
	                    LazyLoader.updateJSON = function (aFile, aJsonObject, aSyncOrNot, aApiToken) {
	                        var deferObject = P.defer(), xhr = this.getXHRObject("PUT", aFile, aSyncOrNot, aApiToken);
	                        xhr.onerror = function (error) {
	                            deferObject.reject(error);
	                        };
	                        xhr.onload = function () {
	                            LazyLoader.handleXHRReponse(xhr, deferObject);
	                        };
	                        xhr.send(JSON.stringify(aJsonObject));
	                        return deferObject.promise();
	                    };
	                    LazyLoader.deleteRequest = function (aFile, aJsonObject, aSyncOrNot, aApiToken) {
	                        var deferObject = P.defer();
	                        var xhr = this.getXHRObject("DELETE", aFile, aSyncOrNot, aApiToken);
	                        xhr.onerror = function (error) {
	                            deferObject.reject(error);
	                        };
	                        xhr.onload = function () {
	                            deferObject.resolve(xhr.status);
	                        };
	                        xhr.send();
	                        return deferObject.promise();
	                    };
	                    /**
	                     * Handles callback from XHR Query and Parse the JSON from query...
	                     *
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {XMLHttpRequest} aXhrObject - Object used to do the query
	                     * @param {Defer} aDeferObject - Object from promise your currently running...
	                     */
	                    LazyLoader.handleXHRReponse = function (requestObject, aDeferObject) {
	                        var requestResponse = requestObject.response;
	                        if (requestResponse !== null) {
	                            var objToReturn;
	                            if (typeof (requestResponse) === "string" && requestResponse !== "") {
	                                objToReturn = JSON.parse(requestResponse);
	                            }
	                            else {
	                                objToReturn = requestResponse;
	                            }
	                            aDeferObject.resolve(objToReturn);
	                        }
	                        else {
	                            aDeferObject.reject(new Error("No valid JSON object was found (" +
	                                requestObject.status + " " + requestObject.statusText + ")"));
	                        }
	                    };
	                    /**
	                     * Initialize a XMLHttpRequest object with the required headers for a JSON Object Operation
	                     *
	                     * @memberof com.cortex.core.net.LazyLoader
	                     * @param {string} aHttpOperation - HTTP Operation to do
	                     * @param {string} aFile - Path of the file to fetch
	                     * @param {boolean} aSyncOrNot - Execute the request in sync or async mode.
	                     * @param {string} aApiToken - Token to use in autorization header.
	                     */
	                    LazyLoader.getXHRObject = function (aHttpOperation, aFile, aSyncOrNot, aApiToken) {
	                        var xhr = new XMLHttpRequest;
	                        xhr.open(aHttpOperation, aFile, aSyncOrNot);
	                        if (aApiToken !== undefined && aApiToken.length > 0) {
	                            xhr.setRequestHeader("Authorization", "Token token=" + aApiToken);
	                        }
	                        xhr.setRequestHeader("Accept", "application/json");
	                        xhr.setRequestHeader("Content-Type", "application/json");
	                        return xhr;
	                    };
	                    return LazyLoader;
	                })();
	                net.LazyLoader = LazyLoader;
	            })(net = core.net || (core.net = {}));
	        })(core = cortex.core || (cortex.core = {}));
	    })(cortex = com.cortex || (com.cortex = {}));
	})(com = exports.com || (exports.com = {}));


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	    Module P: Generic Promises for TypeScript

	    Project, documentation, and license: https://github.com/pragmatrix/Promise
	*/
	var P;
	(function (P) {
	    /**
	        Returns a new "Deferred" value that may be resolved or rejected.
	    */
	    function defer() {
	        return new DeferredI();
	    }
	    P.defer = defer;
	    /**
	        Converts a value to a resolved promise.
	    */
	    function resolve(v) {
	        return defer().resolve(v).promise();
	    }
	    P.resolve = resolve;
	    /**
	        Returns a rejected promise.
	    */
	    function reject(err) {
	        return defer().reject(err).promise();
	    }
	    P.reject = reject;
	    /**
	        http://en.wikipedia.org/wiki/Anamorphism

	        Given a seed value, unfold calls the unspool function, waits for the returned promise to be resolved, and then
	        calls it again if a next seed value was returned.

	        All the values of all promise results are collected into the resulting promise which is resolved as soon
	        the last generated element value is resolved.
	    */
	    function unfold(unspool, seed) {
	        var d = defer();
	        var elements = new Array();
	        unfoldCore(elements, d, unspool, seed);
	        return d.promise();
	    }
	    P.unfold = unfold;
	    function unfoldCore(elements, deferred, unspool, seed) {
	        var result = unspool(seed);
	        if (!result) {
	            deferred.resolve(elements);
	            return;
	        }
	        // fastpath: don't waste stack space if promise resolves immediately.
	        while (result.next && result.promise.status == P.Status.Resolved) {
	            elements.push(result.promise.result);
	            result = unspool(result.next);
	            if (!result) {
	                deferred.resolve(elements);
	                return;
	            }
	        }
	        result.promise
	            .done(function (v) {
	            elements.push(v);
	            if (!result.next)
	                deferred.resolve(elements);
	            else
	                unfoldCore(elements, deferred, unspool, result.next);
	        })
	            .fail(function (e) {
	            deferred.reject(e);
	        });
	    }
	    /**
	        The status of a Promise. Initially a Promise is Unfulfilled and may
	        change to Rejected or Resolved.
	     
	        Once a promise is either Rejected or Resolved, it can not change its
	        status anymore.
	    */
	    (function (Status) {
	        Status[Status["Unfulfilled"] = 0] = "Unfulfilled";
	        Status[Status["Rejected"] = 1] = "Rejected";
	        Status[Status["Resolved"] = 2] = "Resolved";
	    })(P.Status || (P.Status = {}));
	    var Status = P.Status;
	    /**
	        Creates a promise that gets resolved when all the promises in the argument list get resolved.
	        As soon one of the arguments gets rejected, the resulting promise gets rejected.
	        If no promises were provided, the resulting promise is immediately resolved.
	    */
	    function when() {
	        var promises = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            promises[_i - 0] = arguments[_i];
	        }
	        var allDone = defer();
	        if (!promises.length) {
	            allDone.resolve([]);
	            return allDone.promise();
	        }
	        var resolved = 0;
	        var results = [];
	        promises.forEach(function (p, i) {
	            p
	                .done(function (v) {
	                results[i] = v;
	                ++resolved;
	                if (resolved === promises.length && allDone.status !== Status.Rejected)
	                    allDone.resolve(results);
	            })
	                .fail(function (e) {
	                if (allDone.status !== Status.Rejected)
	                    allDone.reject(new Error("when: one or more promises were rejected"));
	            });
	        });
	        return allDone.promise();
	    }
	    P.when = when;
	    /**
	        Implementation of a promise.

	        The Promise<Value> instance is a proxy to the Deferred<Value> instance.
	    */
	    var PromiseI = (function () {
	        function PromiseI(deferred) {
	            this.deferred = deferred;
	        }
	        Object.defineProperty(PromiseI.prototype, "status", {
	            get: function () { return this.deferred.status; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PromiseI.prototype, "result", {
	            get: function () { return this.deferred.result; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PromiseI.prototype, "error", {
	            get: function () { return this.deferred.error; },
	            enumerable: true,
	            configurable: true
	        });
	        PromiseI.prototype.done = function (f) {
	            this.deferred.done(f);
	            return this;
	        };
	        PromiseI.prototype.fail = function (f) {
	            this.deferred.fail(f);
	            return this;
	        };
	        PromiseI.prototype.always = function (f) {
	            this.deferred.always(f);
	            return this;
	        };
	        PromiseI.prototype.then = function (f) {
	            return this.deferred.then(f);
	        };
	        return PromiseI;
	    })();
	    /**
	        Implementation of a deferred.
	    */
	    var DeferredI = (function () {
	        function DeferredI() {
	            this._resolved = function (_) { };
	            this._rejected = function (_) { };
	            this._status = Status.Unfulfilled;
	            this._error = { message: "" };
	            this._promise = new PromiseI(this);
	        }
	        DeferredI.prototype.promise = function () {
	            return this._promise;
	        };
	        Object.defineProperty(DeferredI.prototype, "status", {
	            get: function () {
	                return this._status;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DeferredI.prototype, "result", {
	            get: function () {
	                if (this._status != Status.Resolved)
	                    throw new Error("Promise: result not available");
	                return this._result;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DeferredI.prototype, "error", {
	            get: function () {
	                if (this._status != Status.Rejected)
	                    throw new Error("Promise: rejection reason not available");
	                return this._error;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        DeferredI.prototype.then = function (f) {
	            var d = defer();
	            this
	                .done(function (v) {
	                var promiseOrValue = f(v);
	                // todo: need to find another way to check if r is really of interface
	                // type Promise<any>, otherwise we would not support other 
	                // implementations here.
	                if (promiseOrValue instanceof PromiseI) {
	                    var p = promiseOrValue;
	                    p.done(function (v2) { return d.resolve(v2); })
	                        .fail(function (err) { return d.reject(err); });
	                    return p;
	                }
	                d.resolve(promiseOrValue);
	            })
	                .fail(function (err) { return d.reject(err); });
	            return d.promise();
	        };
	        DeferredI.prototype.done = function (f) {
	            if (this.status === Status.Resolved) {
	                f(this._result);
	                return this;
	            }
	            if (this.status !== Status.Unfulfilled)
	                return this;
	            var prev = this._resolved;
	            this._resolved = function (v) { prev(v); f(v); };
	            return this;
	        };
	        DeferredI.prototype.fail = function (f) {
	            if (this.status === Status.Rejected) {
	                f(this._error);
	                return this;
	            }
	            if (this.status !== Status.Unfulfilled)
	                return this;
	            var prev = this._rejected;
	            this._rejected = function (e) { prev(e); f(e); };
	            return this;
	        };
	        DeferredI.prototype.always = function (f) {
	            this
	                .done(function (v) { return f(v); })
	                .fail(function (err) { return f(null, err); });
	            return this;
	        };
	        DeferredI.prototype.resolve = function (result) {
	            if (this._status !== Status.Unfulfilled)
	                throw new Error("tried to resolve a fulfilled promise");
	            this._result = result;
	            this._status = Status.Resolved;
	            this._resolved(result);
	            this.detach();
	            return this;
	        };
	        DeferredI.prototype.reject = function (err) {
	            if (this._status !== Status.Unfulfilled)
	                throw new Error("tried to reject a fulfilled promise");
	            this._error = err;
	            this._status = Status.Rejected;
	            this._rejected(err);
	            this.detach();
	            return this;
	        };
	        DeferredI.prototype.detach = function () {
	            this._resolved = function (_) { };
	            this._rejected = function (_) { };
	        };
	        return DeferredI;
	    })();
	    function generator(g) {
	        return function () { return iterator(g()); };
	    }
	    P.generator = generator;
	    ;
	    function iterator(f) {
	        return new IteratorI(f);
	    }
	    P.iterator = iterator;
	    var IteratorI = (function () {
	        function IteratorI(f) {
	            this.f = f;
	            this.current = undefined;
	        }
	        IteratorI.prototype.advance = function () {
	            var _this = this;
	            var res = this.f();
	            return res.then(function (value) {
	                if (isUndefined(value))
	                    return false;
	                _this.current = value;
	                return true;
	            });
	        };
	        return IteratorI;
	    })();
	    /**
	        Iterator functions.
	    */
	    function each(gen, f) {
	        var d = defer();
	        eachCore(d, gen(), f);
	        return d.promise();
	    }
	    P.each = each;
	    function eachCore(fin, it, f) {
	        it.advance()
	            .done(function (hasValue) {
	            if (!hasValue) {
	                fin.resolve({});
	                return;
	            }
	            f(it.current);
	            eachCore(fin, it, f);
	        })
	            .fail(function (err) { return fin.reject(err); });
	    }
	    /**
	        std
	    */
	    function isUndefined(v) {
	        return typeof v === 'undefined';
	    }
	    P.isUndefined = isUndefined;
	})(P || (P = {}));
	module.exports = P;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * All information contained herein is, and remains
	 * the property of Cortex Media and its suppliers,
	 * if any.  The intellectual and technical concepts contained
	 * herein are proprietary to Cortex Media and its suppliers
	 * and may be covered by Canada and Foreign Patents,
	 * and are protected by trade secret or copyright law.
	 * Dissemination of this information or reproduction of this material
	 * is strictly forbidden unless prior written permission is obtained
	 * from Cortex Media.
	 *
	 * @copyright    Cortex Media 2014
	 *
	 * @author Mathieu Rhéaume
	 */
	/**
	 * @classdesc       Utilitary to detect browser versions.
	 */
	var com;
	(function (com) {
	    var cortex;
	    (function (cortex) {
	        var core;
	        (function (core) {
	            var browser;
	            (function (browser) {
	                var BrowserDetector = (function () {
	                    function BrowserDetector() {
	                        /*** CONSTRUCTOR GOES HERE **/
	                    }
	                    /**
	                     * @description     Detect if browser is internet explorer
	                     *
	                     * @return          {Boolean} Returns true if internet explorer else false
	                     *
	                     * @memberof        com.cortex.core.browsers.BrowserDetector
	                     */
	                    BrowserDetector.DetectInternetExplorer = function () {
	                        if ((navigator.appName != null &&
	                            navigator.appName === BrowserDetector.IE_APP_NAME ||
	                            navigator.appName === BrowserDetector.IE_11_APP_NAME) &&
	                            BrowserDetector.ExtractIEVersion() >= BrowserDetector.IE_MIN_VER_NUMBER) {
	                            return true;
	                        }
	                        return false;
	                    };
	                    /**
	                     * @description     Get internet explorer versions
	                     *
	                     * @return          {Float} Returns internet explorer versions and -1 if not IE.
	                     *
	                     * @memberof        com.cortex.core.browsers.BrowserDetector
	                     */
	                    BrowserDetector.GetInternetExplorerVersion = function () {
	                        if (this.DetectInternetExplorer() === true) {
	                            return BrowserDetector.ExtractIEVersion();
	                        }
	                        return -1;
	                    };
	                    BrowserDetector.ExtractIEVersion = function () {
	                        if (BrowserDetector.IE_REGEX_VERSIONS.exec(navigator.userAgent) != null) {
	                            return parseFloat(RegExp.$1);
	                        }
	                        else if (BrowserDetector.IE_11_REGEX_VERSIONS.exec(navigator.userAgent) != null) {
	                            return parseFloat(RegExp.$1);
	                        }
	                    };
	                    BrowserDetector.IE_APP_NAME = "Microsoft Internet Explorer";
	                    BrowserDetector.IE_11_APP_NAME = "Netscape";
	                    BrowserDetector.IE_MIN_VER_NUMBER = 9;
	                    BrowserDetector.IE_REGEX_VERSIONS = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	                    BrowserDetector.IE_11_REGEX_VERSIONS = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
	                    return BrowserDetector;
	                })();
	                browser.BrowserDetector = BrowserDetector;
	            })(browser = core.browser || (core.browser = {}));
	        })(core = cortex.core || (cortex.core = {}));
	    })(cortex = com.cortex || (com.cortex = {}));
	})(com = exports.com || (exports.com = {}));


/***/ }
/******/ ]);