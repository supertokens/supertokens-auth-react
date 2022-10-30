"use strict";

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Consts.
 */
var RECIPE_ID_QUERY_PARAM = "rid";
var DEFAULT_API_BASE_PATH = "/auth";
var DEFAULT_WEBSITE_BASE_PATH = "/auth";
var ST_ROOT_ID = "supertokens-root";
var SSR_ERROR =
    "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";

var commonjsGlobal =
    typeof globalThis !== "undefined"
        ? globalThis
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : {};

function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var defaultImplementation$1 = createCommonjsModule(function (module, exports) {
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultCookieHandlerImplementation = void 0;
    function getWindowOrThrow() {
        if (typeof window === "undefined") {
            throw Error(
                "If you are using this package with server-side rendering, please make sure that you are checking if the window object is defined."
            );
        }
        return window;
    }
    exports.defaultCookieHandlerImplementation = {
        getCookie: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().document.cookie];
                });
            });
        },
        setCookie: function (cookieString) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    getWindowOrThrow().document.cookie = cookieString;
                    return [2 /*return*/];
                });
            });
        },
    };
});

unwrapExports(defaultImplementation$1);
defaultImplementation$1.defaultCookieHandlerImplementation;

var cookieHandler = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CookieHandlerReference = void 0;
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */

    var CookieHandlerReference = /** @class */ (function () {
        function CookieHandlerReference(cookieHandlerInput) {
            var cookieHandlerFunc = function (original) {
                return original;
            };
            if (cookieHandlerInput !== undefined) {
                cookieHandlerFunc = cookieHandlerInput;
            }
            this.cookieHandler = cookieHandlerFunc(defaultImplementation$1.defaultCookieHandlerImplementation);
        }
        CookieHandlerReference.init = function (cookieHandlerInput) {
            if (CookieHandlerReference.instance !== undefined) {
                return;
            }
            CookieHandlerReference.instance = new CookieHandlerReference(cookieHandlerInput);
        };
        CookieHandlerReference.getReferenceOrThrow = function () {
            if (CookieHandlerReference.instance === undefined) {
                throw new Error("SuperTokensCookieHandler must be initialized before calling this method.");
            }
            return CookieHandlerReference.instance;
        };
        return CookieHandlerReference;
    })();
    exports.CookieHandlerReference = CookieHandlerReference;
    exports.default = CookieHandlerReference;
});

unwrapExports(cookieHandler);
var cookieHandler_1 = cookieHandler.CookieHandlerReference;

var normalisedURLDomain$2 = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var NormalisedURLDomain = /** @class */ (function () {
        function NormalisedURLDomain(url) {
            var _this = this;
            this.getAsStringDangerous = function () {
                return _this.value;
            };
            this.value = normaliseURLDomainOrThrowError(url);
        }
        return NormalisedURLDomain;
    })();
    exports.default = NormalisedURLDomain;
    function normaliseURLDomainOrThrowError(input, ignoreProtocol) {
        if (ignoreProtocol === void 0) {
            ignoreProtocol = false;
        }
        function isAnIpAddress(ipaddress) {
            return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                ipaddress
            );
        }
        input = input.trim();
        try {
            if (!input.startsWith("http://") && !input.startsWith("https://")) {
                throw new Error("Error converting to proper URL");
            }
            var urlObj = new URL(input);
            if (ignoreProtocol) {
                if (urlObj.hostname.startsWith("localhost") || isAnIpAddress(urlObj.hostname)) {
                    input = "http://" + urlObj.host;
                } else {
                    input = "https://" + urlObj.host;
                }
            } else {
                input = urlObj.protocol + "//" + urlObj.host;
            }
            return input;
            // eslint-disable-next-line no-empty
        } catch (err) {}
        if (input.startsWith("/")) {
            throw new Error("Please provide a valid domain name");
        }
        // not a valid URL
        if (input.indexOf(".") === 0) {
            input = input.substr(1);
        }
        // If the input contains a . it means they have given a domain name.
        // So we try assuming that they have given a domain name
        if (
            (input.indexOf(".") !== -1 || input.startsWith("localhost")) &&
            !input.startsWith("http://") &&
            !input.startsWith("https://")
        ) {
            input = "https://" + input;
            // at this point, it should be a valid URL. So we test that before doing a recursive call
            try {
                new URL(input);
                return normaliseURLDomainOrThrowError(input, true);
                // eslint-disable-next-line no-empty
            } catch (err) {}
        }
        throw new Error("Please provide a valid domain name");
    }
});

unwrapExports(normalisedURLDomain$2);

var normalisedURLDomain$1 = createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    if (normalisedURLDomain$2.default !== undefined) {
        __export(normalisedURLDomain$2);
    } else {
        __export({
            default: normalisedURLDomain$2,
            ...normalisedURLDomain$2,
        });
    }
});

var NormalisedURLDomain = unwrapExports(normalisedURLDomain$1);

var normalisedURLPath$2 = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var NormalisedURLPath = /** @class */ (function () {
        function NormalisedURLPath(url) {
            var _this = this;
            this.startsWith = function (other) {
                return _this.value.startsWith(other.value);
            };
            this.appendPath = function (other) {
                return new NormalisedURLPath(_this.value + other.value);
            };
            this.getAsStringDangerous = function () {
                // Otherwise, return value.
                return _this.value;
            };
            this.value = normaliseURLPathOrThrowError(url);
        }
        return NormalisedURLPath;
    })();
    exports.default = NormalisedURLPath;
    function normaliseURLPathOrThrowError(input) {
        input = input.trim();
        try {
            if (!input.startsWith("http://") && !input.startsWith("https://")) {
                throw new Error("Error converting to proper URL");
            }
            var urlObj = new URL(input);
            input = urlObj.pathname;
            if (input.charAt(input.length - 1) === "/") {
                return input.substr(0, input.length - 1);
            }
            return input;
            // eslint-disable-next-line no-empty
        } catch (err) {}
        // not a valid URL
        // If the input contains a . it means they have given a domain name.
        // So we try assuming that they have given a domain name + path
        if (
            (domainGiven(input) || input.startsWith("localhost")) &&
            !input.startsWith("http://") &&
            !input.startsWith("https://")
        ) {
            input = "http://" + input;
            return normaliseURLPathOrThrowError(input);
        }
        if (input.charAt(0) !== "/") {
            input = "/" + input;
        }
        // at this point, we should be able to convert it into a fake URL and recursively call this function.
        try {
            // test that we can convert this to prevent an infinite loop
            new URL("http://example.com" + input);
            return normaliseURLPathOrThrowError("http://example.com" + input);
        } catch (err) {
            throw new Error("Please provide a valid URL path");
        }
    }
    function domainGiven(input) {
        // If no dot, return false.
        if (input.indexOf(".") === -1 || input.startsWith("/")) {
            return false;
        }
        try {
            var url = new URL(input);
            return url.hostname.indexOf(".") !== -1;
        } catch (e) {}
        try {
            var url = new URL("http://" + input);
            return url.hostname.indexOf(".") !== -1;
        } catch (e) {}
        return false;
    }
});

unwrapExports(normalisedURLPath$2);

var normalisedURLPath$1 = createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    if (normalisedURLPath$2.default !== undefined) {
        __export(normalisedURLPath$2);
    } else {
        __export({
            default: normalisedURLPath$2,
            ...normalisedURLPath$2,
        });
    }
});

var NormalisedURLPath = unwrapExports(normalisedURLPath$1);

var defaultImplementation = createCommonjsModule(function (module, exports) {
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultWindowHandlerImplementation = void 0;
    function getWindowOrThrow() {
        if (typeof window === "undefined") {
            throw Error(
                "If you are using this package with server-side rendering, please make sure that you are checking if the window object is defined."
            );
        }
        return window;
    }
    var defaultLocalStorageHandler = {
        key: function (index) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().localStorage.key(index)];
                });
            });
        },
        clear: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().localStorage.clear()];
                });
            });
        },
        getItem: function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().localStorage.getItem(key)];
                });
            });
        },
        removeItem: function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().localStorage.removeItem(key)];
                });
            });
        },
        setItem: function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().localStorage.setItem(key, value)];
                });
            });
        },
        keySync: function (index) {
            return getWindowOrThrow().localStorage.key(index);
        },
        clearSync: function () {
            return getWindowOrThrow().localStorage.clear();
        },
        getItemSync: function (key) {
            return getWindowOrThrow().localStorage.getItem(key);
        },
        removeItemSync: function (key) {
            return getWindowOrThrow().localStorage.removeItem(key);
        },
        setItemSync: function (key, value) {
            return getWindowOrThrow().localStorage.setItem(key, value);
        },
    };
    var defaultSessionStorageHandler = {
        key: function (index) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().sessionStorage.key(index)];
                });
            });
        },
        clear: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().sessionStorage.clear()];
                });
            });
        },
        getItem: function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().sessionStorage.getItem(key)];
                });
            });
        },
        removeItem: function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().sessionStorage.removeItem(key)];
                });
            });
        },
        setItem: function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, getWindowOrThrow().sessionStorage.setItem(key, value)];
                });
            });
        },
        keySync: function (index) {
            return getWindowOrThrow().sessionStorage.key(index);
        },
        clearSync: function () {
            return getWindowOrThrow().sessionStorage.clear();
        },
        getItemSync: function (key) {
            return getWindowOrThrow().sessionStorage.getItem(key);
        },
        removeItemSync: function (key) {
            return getWindowOrThrow().sessionStorage.removeItem(key);
        },
        setItemSync: function (key, value) {
            return getWindowOrThrow().sessionStorage.setItem(key, value);
        },
    };
    exports.defaultWindowHandlerImplementation = {
        history: {
            replaceState: function (data, unused, url) {
                return getWindowOrThrow().history.replaceState(data, unused, url);
            },
            getState: function () {
                return getWindowOrThrow().history.state;
            },
        },
        location: {
            getHref: function () {
                return getWindowOrThrow().location.href;
            },
            setHref: function (href) {
                getWindowOrThrow().location.href = href;
            },
            getSearch: function () {
                return getWindowOrThrow().location.search;
            },
            getHash: function () {
                return getWindowOrThrow().location.hash;
            },
            getPathName: function () {
                return getWindowOrThrow().location.pathname;
            },
            assign: function (url) {
                /**
                 * The type for assign accepts URL | string but when building
                 * it complains about only accepting a string. To prevent this
                 * we use any
                 */
                getWindowOrThrow().location.assign(url);
            },
            getHostName: function () {
                return getWindowOrThrow().location.hostname;
            },
            getOrigin: function () {
                return getWindowOrThrow().location.origin;
            },
        },
        getDocument: function () {
            return getWindowOrThrow().document;
        },
        localStorage: defaultLocalStorageHandler,
        sessionStorage: defaultSessionStorageHandler,
    };
});

unwrapExports(defaultImplementation);
defaultImplementation.defaultWindowHandlerImplementation;

var windowHandler$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WindowHandlerReference = void 0;
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */

    var WindowHandlerReference = /** @class */ (function () {
        function WindowHandlerReference(windowHandlerInput) {
            var windowHandlerFunc = function (original) {
                return original;
            };
            if (windowHandlerInput !== undefined) {
                windowHandlerFunc = windowHandlerInput;
            }
            this.windowHandler = windowHandlerFunc(defaultImplementation.defaultWindowHandlerImplementation);
        }
        WindowHandlerReference.init = function (windowHandlerInput) {
            if (WindowHandlerReference.instance !== undefined) {
                return;
            }
            WindowHandlerReference.instance = new WindowHandlerReference(windowHandlerInput);
        };
        WindowHandlerReference.getReferenceOrThrow = function () {
            if (WindowHandlerReference.instance === undefined) {
                throw new Error("SuperTokensWindowHandler must be initialized before calling this method.");
            }
            return WindowHandlerReference.instance;
        };
        return WindowHandlerReference;
    })();
    exports.WindowHandlerReference = WindowHandlerReference;
    exports.default = WindowHandlerReference;
});

unwrapExports(windowHandler$1);
var windowHandler_1 = windowHandler$1.WindowHandlerReference;

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    var urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}
function clearQueryParams(paramNames) {
    var newURL = new URL(windowHandler_1.getReferenceOrThrow().windowHandler.location.getHref());
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var param = paramNames_1[_i];
        newURL.searchParams.delete(param);
    }
    windowHandler_1
        .getReferenceOrThrow()
        .windowHandler.history.replaceState(
            windowHandler_1.getReferenceOrThrow().windowHandler.history.getState(),
            "",
            windowHandler_1.getReferenceOrThrow().windowHandler.location.getHref()
        );
}
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
function getQueryParams(param) {
    var urlParams = new URLSearchParams(windowHandler_1.getReferenceOrThrow().windowHandler.location.getSearch());
    return urlParams.get(param);
}
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return windowHandler_1.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}
function getRedirectToPathFromURL() {
    var param = getQueryParams("redirectToPath");
    if (param === null) {
        return undefined;
    } else {
        // Prevent Open redirects by normalising path.
        try {
            return new NormalisedURLPath(param).getAsStringDangerous();
        } catch (_a) {
            return undefined;
        }
    }
}
/*
 * isTest
 */
function isTest() {
    try {
        return process.env.TEST_MODE === "testing";
    } catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
}
function normaliseInputAppInfoOrThrowError(appInfo) {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }
    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.websiteDomain === undefined) {
        throw new Error("Please provide your websiteDomain inside the appInfo object when calling supertokens.init");
    }
    var apiGatewayPath = new NormalisedURLPath("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new NormalisedURLPath(path);
    } else {
        return new NormalisedURLPath(defaultPath);
    }
}
/*
 * validateForm
 */
// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
function validateForm(inputs, configFormFields) {
    return assets.__awaiter(this, void 0, void 0, function () {
        var validationErrors, _loop_1, i;
        return assets.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validationErrors = [];
                    if (configFormFields.length !== inputs.length) {
                        throw Error("Are you sending too many / too few formFields?");
                    }
                    _loop_1 = function (i) {
                        var field, input, value, error;
                        return assets.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    field = configFormFields[i];
                                    input = inputs.find(function (i) {
                                        return i.id === field.id;
                                    });
                                    value = input.value;
                                    if (input.id === "email") {
                                        value = value.trim();
                                    }
                                    return [4 /*yield*/, field.validate(value)];
                                case 1:
                                    error = _b.sent();
                                    // If error, add it.
                                    if (error !== undefined) {
                                        validationErrors.push({
                                            error: error,
                                            id: field.id,
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < configFormFields.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    return [2 /*return*/, validationErrors];
            }
        });
    });
}
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new NormalisedURLPath(windowHandler_1.getReferenceOrThrow().windowHandler.location.getPathName());
}
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        var url_1 = new URL(stringUrl);
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_1.searchParams.set(key, value);
        });
        return url_1.href;
    } catch (e) {
        var fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
        var url_2 = new URL("".concat(fakeDomain).concat(stringUrl));
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_2.searchParams.set(key, value);
        });
        return "".concat(url_2.pathname).concat(url_2.search);
    }
}
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return function () {
        var recipeIdFromSearch = getRecipeIdFromSearch(
            windowHandler_1.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    windowHandler_1.getReferenceOrThrow().windowHandler.location.setHref(to);
}
function redirectWithHistory(to, history) {
    if (to.trim() === "") {
        to = "/";
    }
    if (history.push !== undefined) {
        // we are using react-router-dom that is before v6
        history.push(to);
    } else {
        // in react-router-dom v6, it is just navigate(to), and we are renaming
        // naviagte to history, so it becomes history(to).
        history(to);
    }
}
function isIE() {
    return windowHandler_1.getReferenceOrThrow().windowHandler.getDocument().documentMode !== undefined;
}
function getOriginOfPage() {
    return new NormalisedURLDomain(windowHandler_1.getReferenceOrThrow().windowHandler.location.getOrigin());
}
function getLocalStorage(key) {
    return assets.__awaiter(this, void 0, void 0, function () {
        var res;
        return assets.__generator(this, function (_a) {
            res = windowHandler_1.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
            if (res === null || res === undefined) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, res];
        });
    });
}
function setLocalStorage(key, value) {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        windowHandler_1.getReferenceOrThrow().windowHandler.localStorage.setItem(key, value),
                    ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeFromLocalStorage(key) {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        windowHandler_1.getReferenceOrThrow().windowHandler.localStorage.removeItem(key),
                    ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function mergeObjects(obj1, obj2) {
    var res = assets.__assign({}, obj1);
    for (var key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
}
function normaliseCookieScopeOrThrowError(cookieScope) {
    function helper(sessionScope) {
        sessionScope = sessionScope.trim().toLowerCase();
        // first we convert it to a URL so that we can use the URL class
        if (sessionScope.startsWith(".")) {
            sessionScope = sessionScope.substr(1);
        }
        if (!sessionScope.startsWith("http://") && !sessionScope.startsWith("https://")) {
            sessionScope = "http://" + sessionScope;
        }
        try {
            var urlObj = new URL(sessionScope);
            sessionScope = urlObj.hostname;
            // remove leading dot
            if (sessionScope.startsWith(".")) {
                sessionScope = sessionScope.substr(1);
            }
            return sessionScope;
        } catch (err) {
            throw new Error("Please provide a valid cookie scope");
        }
    }
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        );
    }
    var noDotNormalised = helper(cookieScope);
    if (noDotNormalised === "localhost" || isAnIpAddress(noDotNormalised)) {
        return noDotNormalised;
    }
    if (cookieScope.startsWith(".")) {
        return "." + noDotNormalised;
    }
    return noDotNormalised;
}
function getDefaultCookieScope() {
    try {
        return normaliseCookieScopeOrThrowError(
            windowHandler_1.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch (_a) {
        return undefined;
    }
}
function getCookieValue(name) {
    return assets.__awaiter(this, void 0, void 0, function () {
        var value, _a, parts, last, temp;
        return assets.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "; ";
                    return [4 /*yield*/, cookieHandler_1.getReferenceOrThrow().cookieHandler.getCookie()];
                case 1:
                    value = _a + _b.sent();
                    parts = value.split("; " + name + "=");
                    if (parts.length >= 2) {
                        last = parts.pop();
                        if (last !== undefined) {
                            temp = last.split(";").shift();
                            if (temp === undefined) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, temp];
                        }
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
// undefined value will remove the cookie
function setFrontendCookie(name, value, scope) {
    return assets.__awaiter(this, void 0, void 0, function () {
        var expires, cookieVal;
        return assets.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expires = "Thu, 01 Jan 1970 00:00:01 GMT";
                    cookieVal = "";
                    if (value !== undefined) {
                        cookieVal = value;
                        expires = undefined; // set cookie without expiry
                    }
                    if (
                        !(
                            scope === "localhost" ||
                            scope === windowHandler_1.getReferenceOrThrow().windowHandler.location.getHostName() ||
                            scope === undefined
                        )
                    )
                        return [3 /*break*/, 5];
                    if (!(expires !== undefined)) return [3 /*break*/, 2];
                    return [
                        4 /*yield*/,
                        cookieHandler_1
                            .getReferenceOrThrow()
                            .cookieHandler.setCookie(
                                ""
                                    .concat(name, "=")
                                    .concat(cookieVal, ";expires=")
                                    .concat(expires, ";path=/;samesite=lax")
                            ),
                    ];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    return [
                        4 /*yield*/,
                        cookieHandler_1
                            .getReferenceOrThrow()
                            .cookieHandler.setCookie(
                                ""
                                    .concat(name, "=")
                                    .concat(cookieVal, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax")
                            ),
                    ];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    return [3 /*break*/, 9];
                case 5:
                    if (!(expires !== undefined)) return [3 /*break*/, 7];
                    return [
                        4 /*yield*/,
                        cookieHandler_1
                            .getReferenceOrThrow()
                            .cookieHandler.setCookie(
                                ""
                                    .concat(name, "=")
                                    .concat(cookieVal, ";expires=")
                                    .concat(expires, ";domain=")
                                    .concat(scope, ";path=/;samesite=lax")
                            ),
                    ];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    return [
                        4 /*yield*/,
                        cookieHandler_1
                            .getReferenceOrThrow()
                            .cookieHandler.setCookie(
                                ""
                                    .concat(name, "=")
                                    .concat(cookieVal, ";domain=")
                                    .concat(scope, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax")
                            ),
                    ];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    return [2 /*return*/];
            }
        });
    });
}
function getNormalisedUserContext(userContext) {
    return userContext === undefined ? {} : userContext;
}
/**
 * This function handles calling APIs that should only be called once during mount (mostly on mount of a route/feature component).
 * It's split into multiple callbacks (fetch + handleResponse/handleError) because we expect fetch to take longer and
 * and the component may be unmounted during the first fetch, in which case we want to avoid updating state/redirecting.
 * This is especially relevant for development in strict mode with React 18 (and in the future for concurrent rendering).
 *
 * @param fetch This is a callback that is only called once on mount. Mostly it's for consuming tokens/doing one time only API calls
 * @param handleResponse This is called with the result of the first (fetch) call if it succeeds.
 * @param handleError This is called with the error of the first (fetch) call if it rejects.
 * @param startLoading Will start the whole process if this is set to true (or omitted). Mostly used to wait for session loading.
 */
var useOnMountAPICall = function (fetch, handleResponse, handleError, startLoading) {
    if (startLoading === void 0) {
        startLoading = true;
    }
    var consumeReq = React.useRef();
    var _a = React.useState(undefined),
        error = _a[0],
        setError = _a[1];
    React.useEffect(
        function () {
            var effect = function (signal) {
                return assets.__awaiter(void 0, void 0, void 0, function () {
                    var resp, err_1;
                    return assets.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                if (consumeReq.current === undefined) {
                                    consumeReq.current = fetch();
                                }
                                return [4 /*yield*/, consumeReq.current];
                            case 1:
                                resp = _a.sent();
                                if (!signal.aborted) {
                                    void handleResponse(resp);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                if (!signal.aborted) {
                                    if (handleError !== undefined) {
                                        handleError(err_1, resp);
                                    } else {
                                        setError(err_1);
                                    }
                                }
                                return [3 /*break*/, 3];
                            case 3:
                                return [2 /*return*/];
                        }
                    });
                });
            };
            if (startLoading) {
                var ctrl_1 = new AbortController();
                void effect(ctrl_1.signal);
                return function () {
                    ctrl_1.abort();
                };
            }
            return;
        },
        [setError, consumeReq, fetch, handleResponse, handleError, startLoading]
    );
    if (error) {
        throw error;
    }
};
function saveInvalidClaimRedirectPathInContext(userContext, invalidClaimRedirectPath) {
    if (userContext["_default"] === undefined) {
        userContext["_default"] = {};
    }
    if (userContext["_default"].redirectPath === undefined) {
        userContext["_default"] = assets.__assign(assets.__assign({}, userContext["_default"]), {
            invalidClaimRedirectPath: invalidClaimRedirectPath,
        });
    }
}
function popInvalidClaimRedirectPathFromContext(userContext) {
    var _a;
    var res = (_a = userContext["_default"]) === null || _a === void 0 ? void 0 : _a.invalidClaimRedirectPath;
    if (res !== undefined) {
        delete userContext["_default"].invalidClaimRedirectPath;
    }
    return res;
}

var TranslationController = /** @class */ (function () {
    function TranslationController() {
        this.handlers = new Map();
    }
    TranslationController.prototype.emit = function (event, detail) {
        var handlerList = this.handlers.get(event) || [];
        for (var _i = 0, handlerList_1 = handlerList; _i < handlerList_1.length; _i++) {
            var h = handlerList_1[_i];
            h(event, detail);
        }
    };
    TranslationController.prototype.on = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    };
    TranslationController.prototype.off = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter(function (h) {
                return h !== handler;
            })
        );
    };
    return TranslationController;
})();
var CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
function saveCurrentLanguage(language, cookieDomain) {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function getCurrentLanguageFromCookie() {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME)];
                case 1:
                    return [2 /*return*/, _b.sent()];
                case 2:
                    _b.sent();
                    // This can throw if we are not in a browser
                    // Since this is just loading a preference we can safely ignore the exception
                    return [2 /*return*/, null];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}

function RoutingComponent(props) {
    var _a;
    var stInstance = props.supertokensInstance;
    var path = props.path;
    var componentToRender = React.useMemo(
        function () {
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            return stInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(path));
        },
        [stInstance, path]
    );
    var history =
        (_a = props.supertokensInstance.getReactRouterDomWithCustomHistory()) === null || _a === void 0
            ? void 0
            : _a.useHistoryCustom();
    if (componentToRender === undefined) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { history: history });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom(supertokensInstance) {
    var routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            assets.__assign(
                { exact: true, path: path },
                { children: jsxRuntime.jsx(RoutingComponent, { supertokensInstance: supertokensInstance, path: path }) }
            ),
            "st-".concat(path)
        );
    });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(supertokensInstance) {
    var routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            {
                path: path,
                element: jsxRuntime.jsx(RoutingComponent, { supertokensInstance: supertokensInstance, path: path }),
            },
            "st-".concat(path)
        );
    });
}

var postSuperTokensInitCallbacks = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostSuperTokensInitCallbacks = void 0;
    var PostSuperTokensInitCallbacks = /** @class */ (function () {
        function PostSuperTokensInitCallbacks() {}
        PostSuperTokensInitCallbacks.addPostInitCallback = function (cb) {
            PostSuperTokensInitCallbacks.postInitCallbacks.push(cb);
        };
        PostSuperTokensInitCallbacks.runPostInitCallbacks = function () {
            for (var _i = 0, _a = PostSuperTokensInitCallbacks.postInitCallbacks; _i < _a.length; _i++) {
                var cb = _a[_i];
                cb();
            }
        };
        PostSuperTokensInitCallbacks.postInitCallbacks = [];
        return PostSuperTokensInitCallbacks;
    })();
    exports.PostSuperTokensInitCallbacks = PostSuperTokensInitCallbacks;
});

unwrapExports(postSuperTokensInitCallbacks);
var postSuperTokensInitCallbacks_1 = postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks;

/*
 * Class.
 */
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
        /*
         * Instance Methods.
         */
        this.canHandleRoute = function () {
            return _this.getMatchingComponentForRouteAndRecipeId(getCurrentNormalisedUrlPath()) !== undefined;
        };
        this.getRoutingComponent = function () {
            return jsxRuntime.jsx(RoutingComponent, {
                path: getCurrentNormalisedUrlPath().getAsStringDangerous(),
                supertokensInstance: _this,
            });
        };
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            for (var i = 0; i < _this.recipeList.length; i++) {
                var recipe = _this.recipeList[i];
                var features = recipe.getFeatures();
                var featurePaths = Object.keys(features);
                for (var j = 0; j < featurePaths.length; j++) {
                    // If no components yet for this route, initialize empty array.
                    var featurePath = featurePaths[j];
                    if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                        pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                    }
                    pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
                }
            }
            _this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return _this.pathsToFeatureComponentWithRecipeIdMap;
        };
        this.getMatchingComponentForRouteAndRecipeId = function (normalisedUrl) {
            var path = normalisedUrl.getAsStringDangerous();
            var routeComponents = _this.getPathsToFeatureComponentWithRecipeIdMap()[path];
            if (routeComponents === undefined) {
                return undefined;
            }
            var component = routeComponents.find(function (c) {
                return c.matches();
            });
            if (component !== undefined) {
                return component;
            }
            // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
            return routeComponents[0];
        };
        this.getReactRouterDomWithCustomHistory = function () {
            return SuperTokens.reactRouterDom;
        };
        this.changeLanguage = function (lang) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope),
                            ];
                        case 1:
                            _a.sent();
                            this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.redirectToAuth = function (options) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var queryParams, redirectUrl;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParams = options.queryParams === undefined ? {} : options.queryParams;
                            if (options.show !== undefined) {
                                queryParams.show = options.show;
                            }
                            if (options.redirectBack === true) {
                                queryParams.redirectToPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
                            }
                            return [
                                4 /*yield*/,
                                this.getRedirectUrl({
                                    action: "TO_AUTH",
                                    showSignIn: options.show === "signin",
                                }),
                            ];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, this.redirectToUrl(redirectUrl, options.history)];
                    }
                });
            });
        };
        this.redirectToUrl = function (redirectUrl, history) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var origin_1;
                return assets.__generator(this, function (_a) {
                    try {
                        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
                    } catch (e) {
                        origin_1 = getOriginOfPage().getAsStringDangerous();
                        if (origin_1 !== this.appInfo.websiteDomain.getAsStringDangerous()) {
                            redirectUrl = ""
                                .concat(this.appInfo.websiteDomain.getAsStringDangerous())
                                .concat(redirectUrl);
                            redirectWithFullPageReload(redirectUrl);
                            return [2 /*return*/];
                        }
                        // If history was provided, use to redirect without reloading.
                        if (history !== undefined) {
                            redirectWithHistory(redirectUrl, history);
                            return [2 /*return*/];
                        }
                    }
                    // Otherwise, redirect in app.
                    redirectWithFullPageReload(redirectUrl);
                    return [2 /*return*/];
                });
            });
        };
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        var translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope:
                translationConfig.currentLanguageCookieScope !== undefined
                    ? normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                    : getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        var enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(function (recipe) {
            return recipe(_this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        cookieHandler_1.init(config.cookieHandler);
        windowHandler_1.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
        postSuperTokensInitCallbacks_1.runPostInitCallbacks();
    };
    SuperTokens.getInstanceOrThrow = function () {
        if (SuperTokens.instance === undefined) {
            var error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    };
    SuperTokens.canHandleRoute = function () {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    };
    SuperTokens.getRoutingComponent = function () {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    };
    SuperTokens.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom) {
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom")) in your render function'
            );
        }
        SuperTokens.reactRouterDom = reactRouterDom;
        if (SuperTokens.reactRouterDomIsV6 === undefined) {
            SuperTokens.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (SuperTokens.reactRouterDomIsV6) {
            // this function wraps the react-router-dom v6 useNavigate function in a way
            // that enforces that it runs within a useEffect. The reason we do this is
            // cause of https://github.com/remix-run/react-router/issues/7460
            // which gets shown when visiting a social auth callback url like
            // /auth/callback/github, without a valid code or state. This then
            // doesn't navigate the user to the auth page.
            var useNavigateHookForRRDV6 = function () {
                var navigateHook = reactRouterDom.useNavigate();
                var _a = React__namespace.useState(undefined),
                    to = _a[0],
                    setTo = _a[1];
                React__namespace.useEffect(
                    function () {
                        if (to !== undefined) {
                            setTo(undefined);
                            navigateHook(to);
                        }
                    },
                    [to, navigateHook, setTo]
                );
                return setTo;
            };
            SuperTokens.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: useNavigateHookForRRDV6,
            };
            return getSuperTokensRoutesForReactRouterDomV6(SuperTokens.getInstanceOrThrow());
        }
        SuperTokens.reactRouterDom = {
            router: reactRouterDom,
            useHistoryCustom: reactRouterDom.useHistory,
        };
        return getSuperTokensRoutesForReactRouterDom(SuperTokens.getInstanceOrThrow());
    };
    SuperTokens.getReactRouterDomWithCustomHistory = function () {
        return this.instance !== undefined ? this.instance.getReactRouterDomWithCustomHistory() : undefined;
    };
    SuperTokens.prototype.getRecipeOrThrow = function (recipeId) {
        var recipe = this.recipeList.find(function (recipe) {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error("Missing recipe: ".concat(recipeId));
        }
        return recipe;
    };
    SuperTokens.prototype.loadTranslation = function (store) {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    };
    SuperTokens.prototype.getRedirectUrl = function (context) {
        return assets.__awaiter(this, void 0, void 0, function () {
            var userRes;
            return assets.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userGetRedirectionURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userGetRedirectionURL(context)];
                    case 1:
                        userRes = _a.sent();
                        if (userRes !== undefined) {
                            return [2 /*return*/, userRes];
                        }
                        _a.label = 2;
                    case 2:
                        if (context.action === "TO_AUTH") {
                            return [2 /*return*/, this.appInfo.websiteBasePath.getAsStringDangerous()];
                        }
                        throw new Error("Should never come here: unexpected redirection context");
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function () {
        if (!isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    };
    SuperTokens.reactRouterDomIsV6 = undefined;
    return SuperTokens;
})();

var UserContextContext = React.createContext(undefined);
var useUserContext = function () {
    return React.useContext(UserContextContext);
};
var UserContextProvider = function (_a) {
    var children = _a.children,
        userContext = _a.userContext;
    var currentUserContext = React.useState(getNormalisedUserContext(userContext))[0];
    return jsxRuntime.jsx(
        UserContextContext.Provider,
        assets.__assign({ value: currentUserContext }, { children: children })
    );
};

var SessionContext = React.createContext({
    loading: true,
    isDefault: true,
});

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Class.
 */
var RecipeModule = /** @class */ (function () {
    /*
     * Constructor.
     */
    function RecipeModule(config) {
        var _this = this;
        this.redirect = function (context, history, queryParams) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectUrl(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, history)];
                    }
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.getRedirectUrl = function (context) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.config.getRedirectionURL(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl !== undefined) {
                                return [2 /*return*/, redirectUrl];
                            }
                            return [4 /*yield*/, this.getDefaultRedirectionURL(context)];
                        case 2:
                            // Otherwise, use default.
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.config = config;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RecipeModule.prototype.getDefaultRedirectionURL = function (_) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                throw new Error("getDefaultRedirectionURL is not implemented.");
            });
        });
    };
    return RecipeModule;
})();

var recipeModule = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var RecipeModule = /** @class */ (function () {
        function RecipeModule(config) {
            this.config = config;
        }
        return RecipeModule;
    })();
    exports.default = RecipeModule;
});

unwrapExports(recipeModule);

var processState = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProcessState = exports.PROCESS_STATE = void 0;
    (function (PROCESS_STATE) {
        //CALLING_INTERCEPTION_REQUEST : Process state for the request interceptor.
        //CALLING_INTERCEPTION_RESOPONSE : Process state for the response interceptor.
        PROCESS_STATE[(PROCESS_STATE["CALLING_INTERCEPTION_REQUEST"] = 0)] = "CALLING_INTERCEPTION_REQUEST";
        PROCESS_STATE[(PROCESS_STATE["CALLING_INTERCEPTION_RESPONSE"] = 1)] = "CALLING_INTERCEPTION_RESPONSE";
    })(exports.PROCESS_STATE || (exports.PROCESS_STATE = {}));
    var ProcessState = /** @class */ (function () {
        function ProcessState() {
            var _this = this;
            this.history = [];
            this.addState = function (state) {
                try {
                    if (process !== undefined && process.env !== undefined && process.env.TEST_MODE === "testing") {
                        _this.history.push(state);
                    }
                } catch (ignored) {}
            };
            this.getEventByLastEventByName = function (state) {
                for (var i = _this.history.length - 1; i >= 0; i--) {
                    if (_this.history[i] == state) {
                        return _this.history[i];
                    }
                }
                return undefined;
            };
            this.reset = function () {
                _this.history = [];
            };
            this.waitForEvent = function (state, timeInMS) {
                if (timeInMS === void 0) {
                    timeInMS = 7000;
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var startTime;
                    var _this = this;
                    return __generator(this, function (_a) {
                        startTime = Date.now();
                        return [
                            2 /*return*/,
                            new Promise(function (resolve) {
                                var actualThis = _this;
                                function tryAndGet() {
                                    var result = actualThis.getEventByLastEventByName(state);
                                    if (result === undefined) {
                                        if (Date.now() - startTime > timeInMS) {
                                            resolve(undefined);
                                        } else {
                                            setTimeout(tryAndGet, 1000);
                                        }
                                    } else {
                                        resolve(result);
                                    }
                                }
                                tryAndGet();
                            }),
                        ];
                    });
                });
            };
        }
        ProcessState.getInstance = function () {
            if (ProcessState.instance == undefined) {
                ProcessState.instance = new ProcessState();
            }
            return ProcessState.instance;
        };
        return ProcessState;
    })();
    exports.ProcessState = ProcessState;
});

unwrapExports(processState);
processState.ProcessState;
processState.PROCESS_STATE;

var version = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.supported_fdi = exports.package_version = void 0;
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    exports.package_version = "14.0.2";
    exports.supported_fdi = ["1.8", "1.9", "1.10", "1.11", "1.12", "1.13", "1.14", "1.15"];
});

unwrapExports(version);
version.supported_fdi;
version.package_version;

var processLock = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProcessLocking = /** @class */ (function () {
        function ProcessLocking() {
            var _this = this;
            this.locked = new Map();
            this.addToLocked = function (key, toAdd) {
                var callbacks = _this.locked.get(key);
                if (callbacks === undefined) {
                    if (toAdd === undefined) {
                        _this.locked.set(key, []);
                    } else {
                        _this.locked.set(key, [toAdd]);
                    }
                } else {
                    if (toAdd !== undefined) {
                        callbacks.unshift(toAdd);
                        _this.locked.set(key, callbacks);
                    }
                }
            };
            this.isLocked = function (key) {
                return _this.locked.has(key);
            };
            this.lock = function (key) {
                return new Promise(function (resolve, reject) {
                    if (_this.isLocked(key)) {
                        _this.addToLocked(key, resolve);
                    } else {
                        _this.addToLocked(key);
                        resolve();
                    }
                });
            };
            this.unlock = function (key) {
                var callbacks = _this.locked.get(key);
                if (callbacks === undefined || callbacks.length === 0) {
                    _this.locked.delete(key);
                    return;
                }
                var toCall = callbacks.pop();
                _this.locked.set(key, callbacks);
                if (toCall !== undefined) {
                    setTimeout(toCall, 0);
                }
            };
        }
        ProcessLocking.getInstance = function () {
            if (ProcessLocking.instance === undefined) {
                ProcessLocking.instance = new ProcessLocking();
            }
            return ProcessLocking.instance;
        };
        return ProcessLocking;
    })();
    function getLock() {
        return ProcessLocking.getInstance();
    }
    exports.default = getLock;
});

unwrapExports(processLock);

var browserTabsLock = createCommonjsModule(function (module, exports) {
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done
                        ? resolve(result.value)
                        : new P(function (resolve) {
                              resolve(result.value);
                          }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * @author: SuperTokens (https://github.com/supertokens)
     * This library was created as a part of a larger project, SuperTokens(https://supertokens.io) - the best session management solution.
     * You can also check out our other projects on https://github.com/supertokens
     *
     * To contribute to this package visit https://github.com/supertokens/browser-tabs-lock
     * If you face any problems you can file an issue on https://github.com/supertokens/browser-tabs-lock/issues
     *
     * If you have any questions or if you just want to say hi visit https://supertokens.io/discord
     */
    /**
     * @constant
     * @type {string}
     * @default
     * @description All the locks taken by this package will have this as prefix
     */
    var LOCK_STORAGE_KEY = "browser-tabs-lock-key";
    /**
     * @function delay
     * @param {number} milliseconds - How long the delay should be in terms of milliseconds
     * @returns {Promise<void>}
     */
    function delay(milliseconds) {
        return new Promise(function (resolve) {
            return setTimeout(resolve, milliseconds);
        });
    }
    /**
     * @function generateRandomString
     * @params {number} length - How long the random string should be
     * @returns {string}
     * @description returns random string whose length is equal to the length passed as parameter
     */
    function generateRandomString(length) {
        var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var randomstring = "";
        for (var i = 0; i < length; i++) {
            var INDEX = Math.floor(Math.random() * CHARS.length);
            randomstring += CHARS[INDEX];
        }
        return randomstring;
    }
    /**
     * @function getLockId
     * @returns {string}
     * @description Generates an id which will be unique for the browser tab
     */
    function getLockId() {
        return Date.now().toString() + generateRandomString(15);
    }
    var SuperTokensLock = /** @class */ (function () {
        function SuperTokensLock() {
            this.acquiredIatSet = new Set();
            this.id = getLockId();
            this.acquireLock = this.acquireLock.bind(this);
            this.releaseLock = this.releaseLock.bind(this);
            this.releaseLock__private__ = this.releaseLock__private__.bind(this);
            this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this);
            this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this);
            if (SuperTokensLock.waiters === undefined) {
                SuperTokensLock.waiters = [];
            }
        }
        /**
         * @async
         * @memberOf Lock
         * @function acquireLock
         * @param {string} lockKey - Key for which the lock is being acquired
         * @param {number} [timeout=5000] - Maximum time for which the function will wait to acquire the lock
         * @returns {Promise<boolean>}
         * @description Will return true if lock is being acquired, else false.
         *              Also the lock can be acquired for maximum 10 secs
         */
        SuperTokensLock.prototype.acquireLock = function (lockKey, timeout) {
            if (timeout === void 0) {
                timeout = 5000;
            }
            return __awaiter(this, void 0, void 0, function () {
                var iat, MAX_TIME, STORAGE_KEY, STORAGE, lockObj, TIMEOUT_KEY, lockObjPostDelay;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iat = Date.now() + generateRandomString(4);
                            MAX_TIME = Date.now() + timeout;
                            STORAGE_KEY = LOCK_STORAGE_KEY + "-" + lockKey;
                            STORAGE = window.localStorage;
                            _a.label = 1;
                        case 1:
                            if (!(Date.now() < MAX_TIME)) return [3 /*break*/, 8];
                            return [4 /*yield*/, delay(30)];
                        case 2:
                            _a.sent();
                            lockObj = STORAGE.getItem(STORAGE_KEY);
                            if (!(lockObj === null)) return [3 /*break*/, 5];
                            TIMEOUT_KEY = this.id + "-" + lockKey + "-" + iat;
                            // there is a problem if setItem happens at the exact same time for 2 different processes.. so we add some random delay here.
                            return [4 /*yield*/, delay(Math.floor(Math.random() * 25))];
                        case 3:
                            // there is a problem if setItem happens at the exact same time for 2 different processes.. so we add some random delay here.
                            _a.sent();
                            STORAGE.setItem(
                                STORAGE_KEY,
                                JSON.stringify({
                                    id: this.id,
                                    iat: iat,
                                    timeoutKey: TIMEOUT_KEY,
                                    timeAcquired: Date.now(),
                                    timeRefreshed: Date.now(),
                                })
                            );
                            return [4 /*yield*/, delay(30)];
                        case 4:
                            _a.sent(); // this is to prevent race conditions. This time must be more than the time it takes for storage.setItem
                            lockObjPostDelay = STORAGE.getItem(STORAGE_KEY);
                            if (lockObjPostDelay !== null) {
                                lockObjPostDelay = JSON.parse(lockObjPostDelay);
                                if (lockObjPostDelay.id === this.id && lockObjPostDelay.iat === iat) {
                                    this.acquiredIatSet.add(iat);
                                    this.refreshLockWhileAcquired(STORAGE_KEY, iat);
                                    return [2 /*return*/, true];
                                }
                            }
                            return [3 /*break*/, 7];
                        case 5:
                            SuperTokensLock.lockCorrector();
                            return [4 /*yield*/, this.waitForSomethingToChange(MAX_TIME)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            iat = Date.now() + generateRandomString(4);
                            return [3 /*break*/, 1];
                        case 8:
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        SuperTokensLock.prototype.refreshLockWhileAcquired = function (storageKey, iat) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    setTimeout(function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var STORAGE, lockObj;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4 /*yield*/, processLock.default().lock(iat)];
                                    case 1:
                                        _a.sent();
                                        if (!this.acquiredIatSet.has(iat)) {
                                            processLock.default().unlock(iat);
                                            return [2 /*return*/];
                                        }
                                        STORAGE = window.localStorage;
                                        lockObj = STORAGE.getItem(storageKey);
                                        if (lockObj !== null) {
                                            lockObj = JSON.parse(lockObj);
                                            lockObj.timeRefreshed = Date.now();
                                            STORAGE.setItem(storageKey, JSON.stringify(lockObj));
                                            processLock.default().unlock(iat);
                                        } else {
                                            processLock.default().unlock(iat);
                                            return [2 /*return*/];
                                        }
                                        this.refreshLockWhileAcquired(storageKey, iat);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }, 1000);
                    return [2 /*return*/];
                });
            });
        };
        SuperTokensLock.prototype.waitForSomethingToChange = function (MAX_TIME) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                new Promise(function (resolve) {
                                    var resolvedCalled = false;
                                    var startedAt = Date.now();
                                    var MIN_TIME_TO_WAIT = 50; // ms
                                    var removedListeners = false;
                                    function stopWaiting() {
                                        if (!removedListeners) {
                                            window.removeEventListener("storage", stopWaiting);
                                            SuperTokensLock.removeFromWaiting(stopWaiting);
                                            clearTimeout(timeOutId);
                                            removedListeners = true;
                                        }
                                        if (!resolvedCalled) {
                                            resolvedCalled = true;
                                            var timeToWait = MIN_TIME_TO_WAIT - (Date.now() - startedAt);
                                            if (timeToWait > 0) {
                                                setTimeout(resolve, timeToWait);
                                            } else {
                                                resolve();
                                            }
                                        }
                                    }
                                    window.addEventListener("storage", stopWaiting);
                                    SuperTokensLock.addToWaiting(stopWaiting);
                                    var timeOutId = setTimeout(stopWaiting, Math.max(0, MAX_TIME - Date.now()));
                                }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SuperTokensLock.addToWaiting = function (func) {
            this.removeFromWaiting(func);
            if (SuperTokensLock.waiters === undefined) {
                return;
            }
            SuperTokensLock.waiters.push(func);
        };
        SuperTokensLock.removeFromWaiting = function (func) {
            if (SuperTokensLock.waiters === undefined) {
                return;
            }
            SuperTokensLock.waiters = SuperTokensLock.waiters.filter(function (i) {
                return i !== func;
            });
        };
        SuperTokensLock.notifyWaiters = function () {
            if (SuperTokensLock.waiters === undefined) {
                return;
            }
            var waiters = SuperTokensLock.waiters.slice(); // so that if Lock.waiters is changed it's ok.
            waiters.forEach(function (i) {
                return i();
            });
        };
        /**
         * @function releaseLock
         * @memberOf Lock
         * @param {string} lockKey - Key for which lock is being released
         * @returns {void}
         * @description Release a lock.
         */
        SuperTokensLock.prototype.releaseLock = function (lockKey) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.releaseLock__private__(lockKey)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @function releaseLock
         * @memberOf Lock
         * @param {string} lockKey - Key for which lock is being released
         * @returns {void}
         * @description Release a lock.
         */
        SuperTokensLock.prototype.releaseLock__private__ = function (lockKey) {
            return __awaiter(this, void 0, void 0, function () {
                var STORAGE, STORAGE_KEY, lockObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            STORAGE = window.localStorage;
                            STORAGE_KEY = LOCK_STORAGE_KEY + "-" + lockKey;
                            lockObj = STORAGE.getItem(STORAGE_KEY);
                            if (lockObj === null) {
                                return [2 /*return*/];
                            }
                            lockObj = JSON.parse(lockObj);
                            if (!(lockObj.id === this.id)) return [3 /*break*/, 2];
                            return [4 /*yield*/, processLock.default().lock(lockObj.iat)];
                        case 1:
                            _a.sent();
                            this.acquiredIatSet.delete(lockObj.iat);
                            STORAGE.removeItem(STORAGE_KEY);
                            processLock.default().unlock(lockObj.iat);
                            SuperTokensLock.notifyWaiters();
                            _a.label = 2;
                        case 2:
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @function lockCorrector
         * @returns {void}
         * @description If a lock is acquired by a tab and the tab is closed before the lock is
         *              released, this function will release those locks
         */
        SuperTokensLock.lockCorrector = function () {
            var MIN_ALLOWED_TIME = Date.now() - 5000;
            var STORAGE = window.localStorage;
            var KEYS = Object.keys(STORAGE);
            var notifyWaiters = false;
            for (var i = 0; i < KEYS.length; i++) {
                var LOCK_KEY = KEYS[i];
                if (LOCK_KEY.includes(LOCK_STORAGE_KEY)) {
                    var lockObj = STORAGE.getItem(LOCK_KEY);
                    if (lockObj !== null) {
                        lockObj = JSON.parse(lockObj);
                        if (
                            (lockObj.timeRefreshed === undefined && lockObj.timeAcquired < MIN_ALLOWED_TIME) ||
                            (lockObj.timeRefreshed !== undefined && lockObj.timeRefreshed < MIN_ALLOWED_TIME)
                        ) {
                            STORAGE.removeItem(LOCK_KEY);
                            notifyWaiters = true;
                        }
                    }
                }
            }
            if (notifyWaiters) {
                SuperTokensLock.notifyWaiters();
            }
        };
        SuperTokensLock.waiters = undefined;
        return SuperTokensLock;
    })();
    exports.default = SuperTokensLock;
});

unwrapExports(browserTabsLock);

var normalisedURLDomain = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAnIpAddress = void 0;
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        );
    }
    exports.isAnIpAddress = isAnIpAddress;
    var NormalisedURLDomain = /** @class */ (function () {
        function NormalisedURLDomain(url) {
            var _this = this;
            this.getAsStringDangerous = function () {
                return _this.value;
            };
            this.value = normaliseURLDomainOrThrowError(url);
        }
        return NormalisedURLDomain;
    })();
    exports.default = NormalisedURLDomain;
    function normaliseURLDomainOrThrowError(input, ignoreProtocol) {
        if (ignoreProtocol === void 0) {
            ignoreProtocol = false;
        }
        input = input.trim();
        try {
            if (!input.startsWith("http://") && !input.startsWith("https://")) {
                throw new Error("converting to proper URL");
            }
            var urlObj = new URL(input);
            if (ignoreProtocol) {
                if (urlObj.hostname.startsWith("localhost") || isAnIpAddress(urlObj.hostname)) {
                    input = "http://" + urlObj.host;
                } else {
                    input = "https://" + urlObj.host;
                }
            } else {
                input = urlObj.protocol + "//" + urlObj.host;
            }
            return input;
            // eslint-disable-next-line no-empty
        } catch (err) {}
        if (input.startsWith("/")) {
            throw new Error("Please provide a valid domain name");
        }
        // not a valid URL
        if (input.indexOf(".") === 0) {
            input = input.substr(1);
        }
        // If the input contains a . it means they have given a domain name.
        // So we try assuming that they have given a domain name
        if (
            (input.indexOf(".") !== -1 || input.startsWith("localhost")) &&
            !input.startsWith("http://") &&
            !input.startsWith("https://")
        ) {
            input = "https://" + input;
            // at this point, it should be a valid URL. So we test that before doing a recursive call
            try {
                new URL(input);
                return normaliseURLDomainOrThrowError(input, true);
                // eslint-disable-next-line no-empty
            } catch (err) {}
        }
        throw new Error("Please provide a valid domain name");
    }
});

unwrapExports(normalisedURLDomain);
normalisedURLDomain.isAnIpAddress;

var normalisedURLPath = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var NormalisedURLPath = /** @class */ (function () {
        function NormalisedURLPath(url) {
            var _this = this;
            this.startsWith = function (other) {
                return _this.value.startsWith(other.value);
            };
            this.appendPath = function (other) {
                return new NormalisedURLPath(_this.value + other.value);
            };
            this.getAsStringDangerous = function () {
                return _this.value;
            };
            this.value = normaliseURLPathOrThrowError(url);
        }
        return NormalisedURLPath;
    })();
    exports.default = NormalisedURLPath;
    function normaliseURLPathOrThrowError(input) {
        input = input.trim();
        try {
            if (!input.startsWith("http://") && !input.startsWith("https://")) {
                throw new Error("converting to proper URL");
            }
            var urlObj = new URL(input);
            input = urlObj.pathname;
            if (input.charAt(input.length - 1) === "/") {
                return input.substr(0, input.length - 1);
            }
            return input;
            // eslint-disable-next-line no-empty
        } catch (err) {}
        // not a valid URL
        // If the input contains a . it means they have given a domain name.
        // So we try assuming that they have given a domain name + path
        if (
            (domainGiven(input) || input.startsWith("localhost")) &&
            !input.startsWith("http://") &&
            !input.startsWith("https://")
        ) {
            input = "http://" + input;
            return normaliseURLPathOrThrowError(input);
        }
        if (input.charAt(0) !== "/") {
            input = "/" + input;
        }
        // at this point, we should be able to convert it into a fake URL and recursively call this function.
        try {
            // test that we can convert this to prevent an infinite loop
            new URL("http://example.com" + input);
            return normaliseURLPathOrThrowError("http://example.com" + input);
        } catch (err) {
            throw new Error("Please provide a valid URL path");
        }
    }
    function domainGiven(input) {
        // If no dot, return false.
        if (input.indexOf(".") === -1 || input.startsWith("/")) {
            return false;
        }
        try {
            var url = new URL(input);
            return url.hostname.indexOf(".") !== -1;
        } catch (e) {}
        try {
            var url = new URL("http://" + input);
            return url.hostname.indexOf(".") !== -1;
        } catch (e) {}
        return false;
    }
});

unwrapExports(normalisedURLPath);

var logger = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logDebugMessage = exports.disableLogging = exports.enableLogging = void 0;

    var SUPERTOKENS_DEBUG_NAMESPACE = "com.supertokens";
    var __supertokensWebsiteLogging = false;
    function enableLogging() {
        __supertokensWebsiteLogging = true;
    }
    exports.enableLogging = enableLogging;
    function disableLogging() {
        __supertokensWebsiteLogging = false;
    }
    exports.disableLogging = disableLogging;
    function logDebugMessage(message) {
        if (__supertokensWebsiteLogging) {
            console.log(
                ""
                    .concat(SUPERTOKENS_DEBUG_NAMESPACE, ' {t: "')
                    .concat(new Date().toISOString(), '", message: "')
                    .concat(message, '", supertokens-website-ver: "')
                    .concat(version.package_version, '"}')
            );
        }
    }
    exports.logDebugMessage = logDebugMessage;
});

unwrapExports(logger);
logger.logDebugMessage;
logger.disableLogging;
logger.enableLogging;

var utils$1 = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNormalisedUserContext =
        exports.shouldDoInterceptionBasedOnUrl =
        exports.validateAndNormaliseInputOrThrowError =
        exports.normaliseSessionScopeOrThrowError =
        exports.normaliseURLPathOrThrowError =
        exports.normaliseURLDomainOrThrowError =
            void 0;

    function normaliseURLDomainOrThrowError(input) {
        var str = new normalisedURLDomain.default(input).getAsStringDangerous();
        return str;
    }
    exports.normaliseURLDomainOrThrowError = normaliseURLDomainOrThrowError;
    function normaliseURLPathOrThrowError(input) {
        return new normalisedURLPath.default(input).getAsStringDangerous();
    }
    exports.normaliseURLPathOrThrowError = normaliseURLPathOrThrowError;
    function normaliseSessionScopeOrThrowError(sessionScope) {
        function helper(sessionScope) {
            sessionScope = sessionScope.trim().toLowerCase();
            // first we convert it to a URL so that we can use the URL class
            if (sessionScope.startsWith(".")) {
                sessionScope = sessionScope.substr(1);
            }
            if (!sessionScope.startsWith("http://") && !sessionScope.startsWith("https://")) {
                sessionScope = "http://" + sessionScope;
            }
            try {
                var urlObj = new URL(sessionScope);
                sessionScope = urlObj.hostname;
                // remove leading dot
                if (sessionScope.startsWith(".")) {
                    sessionScope = sessionScope.substr(1);
                }
                return sessionScope;
            } catch (err) {
                throw new Error("Please provide a valid sessionScope");
            }
        }
        var noDotNormalised = helper(sessionScope);
        if (noDotNormalised === "localhost" || (0, normalisedURLDomain.isAnIpAddress)(noDotNormalised)) {
            return noDotNormalised;
        }
        if (sessionScope.startsWith(".")) {
            return "." + noDotNormalised;
        }
        return noDotNormalised;
    }
    exports.normaliseSessionScopeOrThrowError = normaliseSessionScopeOrThrowError;
    function validateAndNormaliseInputOrThrowError(options) {
        var _this = this;
        var apiDomain = normaliseURLDomainOrThrowError(options.apiDomain);
        var apiBasePath = normaliseURLPathOrThrowError("/auth");
        if (options.apiBasePath !== undefined) {
            apiBasePath = normaliseURLPathOrThrowError(options.apiBasePath);
        }
        var defaultSessionScope = windowHandler$1.default.getReferenceOrThrow().windowHandler.location.getHostName();
        // See https://github.com/supertokens/supertokens-website/issues/98
        var sessionScope = normaliseSessionScopeOrThrowError(
            options !== undefined && options.sessionScope !== undefined ? options.sessionScope : defaultSessionScope
        );
        var sessionExpiredStatusCode = 401;
        if (options.sessionExpiredStatusCode !== undefined) {
            sessionExpiredStatusCode = options.sessionExpiredStatusCode;
        }
        var invalidClaimStatusCode = 403;
        if (options.invalidClaimStatusCode !== undefined) {
            invalidClaimStatusCode = options.invalidClaimStatusCode;
        }
        if (sessionExpiredStatusCode === invalidClaimStatusCode) {
            throw new Error("sessionExpiredStatusCode and invalidClaimStatusCode cannot be the same.");
        }
        var autoAddCredentials = true;
        if (options.autoAddCredentials !== undefined) {
            autoAddCredentials = options.autoAddCredentials;
        }
        var isInIframe = false;
        if (options.isInIframe !== undefined) {
            isInIframe = options.isInIframe;
        }
        var cookieDomain = undefined;
        if (options.cookieDomain !== undefined) {
            cookieDomain = normaliseSessionScopeOrThrowError(options.cookieDomain);
        }
        var preAPIHook = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { url: context.url, requestInit: context.requestInit }];
                });
            });
        };
        if (options.preAPIHook !== undefined) {
            preAPIHook = options.preAPIHook;
        }
        var postAPIHook = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        if (options.postAPIHook !== undefined) {
            postAPIHook = options.postAPIHook;
        }
        var onHandleEvent = function () {};
        if (options.onHandleEvent !== undefined) {
            onHandleEvent = options.onHandleEvent;
        }
        var override = __assign(
            {
                functions: function (oI) {
                    return oI;
                },
            },
            options.override
        );
        if (options.enableDebugLogs !== undefined && options.enableDebugLogs) {
            (0, logger.enableLogging)();
        }
        return {
            apiDomain: apiDomain,
            apiBasePath: apiBasePath,
            sessionScope: sessionScope,
            sessionExpiredStatusCode: sessionExpiredStatusCode,
            invalidClaimStatusCode: invalidClaimStatusCode,
            autoAddCredentials: autoAddCredentials,
            isInIframe: isInIframe,
            cookieDomain: cookieDomain,
            preAPIHook: preAPIHook,
            postAPIHook: postAPIHook,
            onHandleEvent: onHandleEvent,
            override: override,
        };
    }
    exports.validateAndNormaliseInputOrThrowError = validateAndNormaliseInputOrThrowError;
    function shouldDoInterceptionBasedOnUrl(toCheckUrl, apiDomain, cookieDomain) {
        (0,
        logger.logDebugMessage)("shouldDoInterceptionBasedOnUrl: toCheckUrl: " + toCheckUrl + " apiDomain: " + apiDomain + " cookiDomain: " + cookieDomain);
        function isNumeric(str) {
            if (typeof str != "string") return false; // we only process strings!
            return (
                !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            ); // ...and ensure strings of whitespace fail
        }
        // The safest/best way to add this is the hash as the browser strips it before sending
        // but we don't have a reason to limit checking to that part.
        if (toCheckUrl.includes("superTokensDoNotDoInterception")) {
            return false;
        }
        toCheckUrl = normaliseURLDomainOrThrowError(toCheckUrl);
        var urlObj = new URL(toCheckUrl);
        var domain = urlObj.hostname;
        if (cookieDomain === undefined) {
            domain = urlObj.port === "" ? domain : domain + ":" + urlObj.port;
            apiDomain = normaliseURLDomainOrThrowError(apiDomain);
            var apiUrlObj = new URL(apiDomain);
            return domain === (apiUrlObj.port === "" ? apiUrlObj.hostname : apiUrlObj.hostname + ":" + apiUrlObj.port);
        } else {
            var normalisedCookieDomain = normaliseSessionScopeOrThrowError(cookieDomain);
            if (cookieDomain.split(":").length > 1) {
                // means port may provided
                var portStr = cookieDomain.split(":")[cookieDomain.split(":").length - 1];
                if (isNumeric(portStr)) {
                    normalisedCookieDomain += ":" + portStr;
                    domain = urlObj.port === "" ? domain : domain + ":" + urlObj.port;
                }
            }
            if (cookieDomain.startsWith(".")) {
                return ("." + domain).endsWith(normalisedCookieDomain);
            } else {
                return domain === normalisedCookieDomain;
            }
        }
    }
    exports.shouldDoInterceptionBasedOnUrl = shouldDoInterceptionBasedOnUrl;
    function getNormalisedUserContext(userContext) {
        if (userContext === undefined) {
            return {};
        }
        return userContext;
    }
    exports.getNormalisedUserContext = getNormalisedUserContext;
});

unwrapExports(utils$1);
utils$1.getNormalisedUserContext;
utils$1.shouldDoInterceptionBasedOnUrl;
utils$1.validateAndNormaliseInputOrThrowError;
utils$1.normaliseSessionScopeOrThrowError;
utils$1.normaliseURLPathOrThrowError;
utils$1.normaliseURLDomainOrThrowError;

var fetch$1 = createCommonjsModule(function (module, exports) {
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setFrontToken =
        exports.getFrontToken =
        exports.setAntiCSRF =
        exports.setIdRefreshToken =
        exports.getIdRefreshToken =
        exports.onInvalidClaimResponse =
        exports.onTokenUpdate =
        exports.onUnauthorisedResponse =
        exports.FrontToken =
        exports.AntiCsrfToken =
            void 0;
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */

    function getWindowOrThrow() {
        if (typeof window === "undefined") {
            throw Error(
                "If you are using this package with server-side rendering, please make sure that you are checking if the window object is defined."
            );
        }
        return window;
    }
    var AntiCsrfToken = /** @class */ (function () {
        function AntiCsrfToken() {}
        AntiCsrfToken.getToken = function (associatedIdRefreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var antiCsrf;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, logger.logDebugMessage)("AntiCsrfToken.getToken: called");
                            if (associatedIdRefreshToken === undefined) {
                                AntiCsrfToken.tokenInfo = undefined;
                                (0, logger.logDebugMessage)("AntiCsrfToken.getToken: returning undefined");
                                return [2 /*return*/, undefined];
                            }
                            if (!(AntiCsrfToken.tokenInfo === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, getAntiCSRFToken()];
                        case 1:
                            antiCsrf = _a.sent();
                            if (antiCsrf === null) {
                                (0, logger.logDebugMessage)("AntiCsrfToken.getToken: returning undefined");
                                return [2 /*return*/, undefined];
                            }
                            AntiCsrfToken.tokenInfo = {
                                antiCsrf: antiCsrf,
                                associatedIdRefreshToken: associatedIdRefreshToken,
                            };
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(AntiCsrfToken.tokenInfo.associatedIdRefreshToken !== associatedIdRefreshToken))
                                return [3 /*break*/, 4];
                            // csrf token has changed.
                            AntiCsrfToken.tokenInfo = undefined;
                            return [4 /*yield*/, AntiCsrfToken.getToken(associatedIdRefreshToken)];
                        case 3:
                            return [2 /*return*/, _a.sent()];
                        case 4:
                            (0,
                            logger.logDebugMessage)("AntiCsrfToken.getToken: returning: " + AntiCsrfToken.tokenInfo.antiCsrf);
                            return [2 /*return*/, AntiCsrfToken.tokenInfo.antiCsrf];
                    }
                });
            });
        };
        AntiCsrfToken.removeToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, logger.logDebugMessage)("AntiCsrfToken.removeToken: called");
                            AntiCsrfToken.tokenInfo = undefined;
                            return [4 /*yield*/, setAntiCSRF(undefined)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AntiCsrfToken.setItem = function (associatedIdRefreshToken, antiCsrf) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (associatedIdRefreshToken === undefined) {
                                AntiCsrfToken.tokenInfo = undefined;
                                return [2 /*return*/];
                            }
                            (0, logger.logDebugMessage)("AntiCsrfToken.setItem: called");
                            return [4 /*yield*/, setAntiCSRF(antiCsrf)];
                        case 1:
                            _a.sent();
                            AntiCsrfToken.tokenInfo = {
                                antiCsrf: antiCsrf,
                                associatedIdRefreshToken: associatedIdRefreshToken,
                            };
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AntiCsrfToken;
    })();
    exports.AntiCsrfToken = AntiCsrfToken;
    // Note: We do not store this in memory because another tab may have
    // modified this value, and if so, we may not know about it in this tab
    var FrontToken = /** @class */ (function () {
        function FrontToken() {}
        FrontToken.getTokenInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var frontToken, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, logger.logDebugMessage)("FrontToken.getTokenInfo: called");
                            return [4 /*yield*/, getFrontToken()];
                        case 1:
                            frontToken = _a.sent();
                            if (!(frontToken === null)) return [3 /*break*/, 5];
                            return [4 /*yield*/, getIdRefreshToken(false)];
                        case 2:
                            if (!(_a.sent().status === "EXISTS")) return [3 /*break*/, 4];
                            // this means that the id refresh token has been set, so we must
                            // wait for this to be set or removed
                            return [
                                4 /*yield*/,
                                new Promise(function (resolve) {
                                    FrontToken.waiters.push(resolve);
                                }),
                            ];
                        case 3:
                            // this means that the id refresh token has been set, so we must
                            // wait for this to be set or removed
                            _a.sent();
                            return [2 /*return*/, FrontToken.getTokenInfo()];
                        case 4:
                            return [2 /*return*/, undefined];
                        case 5:
                            response = parseFrontToken(frontToken);
                            (0, logger.logDebugMessage)("FrontToken.getTokenInfo: returning ate: " + response.ate);
                            (0, logger.logDebugMessage)("FrontToken.getTokenInfo: returning uid: " + response.uid);
                            (0, logger.logDebugMessage)("FrontToken.getTokenInfo: returning up: " + response.up);
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        FrontToken.removeToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, logger.logDebugMessage)("FrontToken.removeToken: called");
                            return [4 /*yield*/, setFrontToken(undefined)];
                        case 1:
                            _a.sent();
                            FrontToken.waiters.forEach(function (f) {
                                return f(undefined);
                            });
                            FrontToken.waiters = [];
                            return [2 /*return*/];
                    }
                });
            });
        };
        FrontToken.setItem = function (frontToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, logger.logDebugMessage)("FrontToken.setItem: called");
                            return [4 /*yield*/, setFrontToken(frontToken)];
                        case 1:
                            _a.sent();
                            FrontToken.waiters.forEach(function (f) {
                                return f(undefined);
                            });
                            FrontToken.waiters = [];
                            return [2 /*return*/];
                    }
                });
            });
        };
        // these are waiters for when the idRefreshToken has been set, but this token has
        // not yet been set. Once this token is set or removed, the waiters are resolved.
        FrontToken.waiters = [];
        return FrontToken;
    })();
    exports.FrontToken = FrontToken;
    /**
     * @class AuthHttpRequest
     * @description wrapper for common http methods.
     */
    var AuthHttpRequest = /** @class */ (function () {
        function AuthHttpRequest() {}
        AuthHttpRequest.init = function (config, recipeImpl) {
            (0, logger.logDebugMessage)("init: called");
            (0, logger.logDebugMessage)("init: Input apiBasePath: " + config.apiBasePath);
            (0, logger.logDebugMessage)("init: Input apiDomain: " + config.apiDomain);
            (0, logger.logDebugMessage)("init: Input autoAddCredentials: " + config.autoAddCredentials);
            (0, logger.logDebugMessage)("init: Input cookieDomain: " + config.cookieDomain);
            (0, logger.logDebugMessage)("init: Input isInIframe: " + config.isInIframe);
            (0, logger.logDebugMessage)("init: Input sessionExpiredStatusCode: " + config.sessionExpiredStatusCode);
            (0, logger.logDebugMessage)("init: Input sessionScope: " + config.sessionScope);
            AuthHttpRequest.env = getWindowOrThrow().fetch === undefined ? commonjsGlobal : getWindowOrThrow();
            AuthHttpRequest.refreshTokenUrl = config.apiDomain + config.apiBasePath + "/session/refresh";
            AuthHttpRequest.signOutUrl = config.apiDomain + config.apiBasePath + "/signout";
            AuthHttpRequest.rid = "session";
            AuthHttpRequest.config = config;
            if (AuthHttpRequest.env.__supertokensOriginalFetch === undefined) {
                (0, logger.logDebugMessage)("init: __supertokensOriginalFetch is undefined");
                // this block contains code that is run just once per page load..
                // all items in this block are attached to the global env so that
                // even if the init function is called more than once (maybe across JS scripts),
                // things will not get created multiple times.
                AuthHttpRequest.env.__supertokensOriginalFetch = AuthHttpRequest.env.fetch.bind(AuthHttpRequest.env);
                AuthHttpRequest.env.__supertokensSessionRecipe = recipeImpl;
                AuthHttpRequest.env.fetch =
                    AuthHttpRequest.env.__supertokensSessionRecipe.addFetchInterceptorsAndReturnModifiedFetch({
                        originalFetch: AuthHttpRequest.env.__supertokensOriginalFetch,
                        userContext: {},
                    });
                AuthHttpRequest.env.__supertokensSessionRecipe.addXMLHttpRequestInterceptor({
                    userContext: {},
                });
            }
            AuthHttpRequest.recipeImpl = AuthHttpRequest.env.__supertokensSessionRecipe;
            AuthHttpRequest.initCalled = true;
        };
        var _a;
        _a = AuthHttpRequest;
        AuthHttpRequest.initCalled = false;
        AuthHttpRequest.doRequest = function (httpCall, config, url) {
            return __awaiter(void 0, void 0, void 0, function () {
                var doNotDoInterception,
                    returnObj,
                    preRequestIdToken,
                    clonedHeaders,
                    configWithAntiCsrf,
                    antiCsrfToken,
                    response,
                    idRefreshToken,
                    retry,
                    antiCsrfToken,
                    tok,
                    frontToken,
                    postRequestIdToken;
                return __generator(_a, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!AuthHttpRequest.initCalled) {
                                throw Error("init function not called");
                            }
                            (0, logger.logDebugMessage)("doRequest: start of fetch interception");
                            doNotDoInterception = false;
                            try {
                                doNotDoInterception =
                                    (typeof url === "string" &&
                                        !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                            url,
                                            AuthHttpRequest.config.apiDomain,
                                            AuthHttpRequest.config.cookieDomain
                                        )) ||
                                    (url !== undefined &&
                                        typeof url.url === "string" && // this is because url can be an object like {method: ..., url: ...}
                                        !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                            url.url,
                                            AuthHttpRequest.config.apiDomain,
                                            AuthHttpRequest.config.cookieDomain
                                        ));
                            } catch (err) {
                                if (err.message === "Please provide a valid domain name") {
                                    (0, logger.logDebugMessage)(
                                        "doRequest: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                                    );
                                    // .origin gives the port as well..
                                    doNotDoInterception = !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                        windowHandler$1.default
                                            .getReferenceOrThrow()
                                            .windowHandler.location.getOrigin(),
                                        AuthHttpRequest.config.apiDomain,
                                        AuthHttpRequest.config.cookieDomain
                                    );
                                } else {
                                    throw err;
                                }
                            }
                            (0,
                            logger.logDebugMessage)("doRequest: Value of doNotDoInterception: " + doNotDoInterception);
                            if (!doNotDoInterception) return [3 /*break*/, 2];
                            (0, logger.logDebugMessage)("doRequest: Returning without interception");
                            return [4 /*yield*/, httpCall(config)];
                        case 1:
                            return [2 /*return*/, _b.sent()];
                        case 2:
                            (0, logger.logDebugMessage)("doRequest: Interception started");
                            processState.ProcessState.getInstance().addState(
                                processState.PROCESS_STATE.CALLING_INTERCEPTION_REQUEST
                            );
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, , 22, 27]);
                            returnObj = undefined;
                            _b.label = 4;
                        case 4:
                            return [4 /*yield*/, getIdRefreshToken(true)];
                        case 5:
                            preRequestIdToken = _b.sent();
                            clonedHeaders = new Headers(
                                config !== undefined && config.headers !== undefined ? config.headers : url.headers
                            );
                            configWithAntiCsrf = __assign(__assign({}, config), { headers: clonedHeaders });
                            if (!(preRequestIdToken.status === "EXISTS")) return [3 /*break*/, 7];
                            return [4 /*yield*/, AntiCsrfToken.getToken(preRequestIdToken.token)];
                        case 6:
                            antiCsrfToken = _b.sent();
                            if (antiCsrfToken !== undefined) {
                                (0, logger.logDebugMessage)("doRequest: Adding anti-csrf token to request");
                                clonedHeaders.set("anti-csrf", antiCsrfToken);
                            }
                            _b.label = 7;
                        case 7:
                            if (AuthHttpRequest.config.autoAddCredentials) {
                                (0, logger.logDebugMessage)("doRequest: Adding credentials include");
                                if (configWithAntiCsrf === undefined) {
                                    configWithAntiCsrf = {
                                        credentials: "include",
                                    };
                                } else if (configWithAntiCsrf.credentials === undefined) {
                                    configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), {
                                        credentials: "include",
                                    });
                                }
                            }
                            // adding rid for anti-csrf protection: Anti-csrf via custom header
                            if (!clonedHeaders.has("rid")) {
                                (0, logger.logDebugMessage)("doRequest: Adding rid header: anti-csrf");
                                clonedHeaders.set("rid", "anti-csrf");
                            } else {
                                (0, logger.logDebugMessage)("doRequest: rid header was already there in request");
                            }
                            (0, logger.logDebugMessage)("doRequest: Making user's http call");
                            return [4 /*yield*/, httpCall(configWithAntiCsrf)];
                        case 8:
                            response = _b.sent();
                            (0, logger.logDebugMessage)("doRequest: User's http call ended");
                            idRefreshToken = response.headers.get("id-refresh-token");
                            if (!idRefreshToken) return [3 /*break*/, 10];
                            (0, logger.logDebugMessage)("doRequest: Setting sIRTFrontend: " + idRefreshToken);
                            return [4 /*yield*/, setIdRefreshToken(idRefreshToken, response.status)];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10:
                            if (!(response.status === AuthHttpRequest.config.sessionExpiredStatusCode))
                                return [3 /*break*/, 12];
                            (0, logger.logDebugMessage)("doRequest: Status code is: " + response.status);
                            return [4 /*yield*/, onUnauthorisedResponse(preRequestIdToken)];
                        case 11:
                            retry = _b.sent();
                            if (retry.result !== "RETRY") {
                                (0, logger.logDebugMessage)("doRequest: Not retrying original request");
                                returnObj = retry.error !== undefined ? retry.error : response;
                                return [3 /*break*/, 21];
                            }
                            (0, logger.logDebugMessage)("doRequest: Retrying original request");
                            return [3 /*break*/, 20];
                        case 12:
                            if (!(response.status === AuthHttpRequest.config.invalidClaimStatusCode))
                                return [3 /*break*/, 14];
                            return [4 /*yield*/, onInvalidClaimResponse(response)];
                        case 13:
                            _b.sent();
                            _b.label = 14;
                        case 14:
                            antiCsrfToken = response.headers.get("anti-csrf");
                            if (!antiCsrfToken) return [3 /*break*/, 17];
                            return [4 /*yield*/, getIdRefreshToken(true)];
                        case 15:
                            tok = _b.sent();
                            if (!(tok.status === "EXISTS")) return [3 /*break*/, 17];
                            (0, logger.logDebugMessage)("doRequest: Setting anti-csrf token");
                            return [4 /*yield*/, AntiCsrfToken.setItem(tok.token, antiCsrfToken)];
                        case 16:
                            _b.sent();
                            _b.label = 17;
                        case 17:
                            frontToken = response.headers.get("front-token");
                            if (!frontToken) return [3 /*break*/, 19];
                            (0, logger.logDebugMessage)("doRequest: Setting sFrontToken: " + frontToken);
                            return [4 /*yield*/, FrontToken.setItem(frontToken)];
                        case 18:
                            _b.sent();
                            _b.label = 19;
                        case 19:
                            return [2 /*return*/, response];
                        case 20:
                            return [3 /*break*/, 4];
                        case 21:
                            // if it comes here, means we breaked. which happens only if we have logged out.
                            return [2 /*return*/, returnObj];
                        case 22:
                            return [4 /*yield*/, getIdRefreshToken(false)];
                        case 23:
                            postRequestIdToken = _b.sent();
                            if (!(postRequestIdToken.status === "NOT_EXISTS")) return [3 /*break*/, 26];
                            (0,
                            logger.logDebugMessage)("doRequest: sIRTFrontend doesn't exist, so removing anti-csrf and sFrontToken");
                            return [4 /*yield*/, AntiCsrfToken.removeToken()];
                        case 24:
                            _b.sent();
                            return [4 /*yield*/, FrontToken.removeToken()];
                        case 25:
                            _b.sent();
                            _b.label = 26;
                        case 26:
                            return [7 /*endfinally*/];
                        case 27:
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthHttpRequest.attemptRefreshingSession = function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var preRequestIdToken, refresh;
                return __generator(_a, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!AuthHttpRequest.initCalled) {
                                throw Error("init function not called");
                            }
                            return [4 /*yield*/, getIdRefreshToken(false)];
                        case 1:
                            preRequestIdToken = _b.sent();
                            return [4 /*yield*/, onUnauthorisedResponse(preRequestIdToken)];
                        case 2:
                            refresh = _b.sent();
                            if (refresh.result === "API_ERROR") {
                                throw refresh.error;
                            }
                            return [2 /*return*/, refresh.result === "RETRY"];
                    }
                });
            });
        };
        return AuthHttpRequest;
    })();
    exports.default = AuthHttpRequest;
    var ID_REFRESH_TOKEN_NAME = "sIRTFrontend";
    var ANTI_CSRF_NAME = "sAntiCsrf";
    var FRONT_TOKEN_NAME = "sFrontToken";
    /**
     * @description attempts to call the refresh token API each time we are sure the session has expired, or it throws an error or,
     * or the ID_COOKIE_NAME has changed value -> which may mean that we have a new set of tokens.
     */
    function onUnauthorisedResponse(preRequestIdToken) {
        return __awaiter(this, void 0, void 0, function () {
            var lock,
                postLockID,
                headers,
                antiCsrfToken_1,
                preAPIResult,
                response,
                removeIdRefreshToken,
                idRefreshToken,
                antiCsrfToken,
                tok,
                frontToken,
                error_1,
                idCookieValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        lock = new browserTabsLock.default();
                        _b.label = 1;
                    case 1:
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: trying to acquire lock");
                        return [4 /*yield*/, lock.acquireLock("REFRESH_TOKEN_USE", 1000)];
                    case 2:
                        if (!_b.sent()) return [3 /*break*/, 28];
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: lock acquired");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 20, 22, 28]);
                        return [4 /*yield*/, getIdRefreshToken(false)];
                    case 4:
                        postLockID = _b.sent();
                        if (postLockID.status === "NOT_EXISTS") {
                            (0, logger.logDebugMessage)(
                                "onUnauthorisedResponse: Not refreshing because sIRTFrontend is remove"
                            );
                            // if it comes here, it means a request was made thinking
                            // that the session exists, but it doesn't actually exist.
                            AuthHttpRequest.config.onHandleEvent({
                                action: "UNAUTHORISED",
                                sessionExpiredOrRevoked: false,
                                userContext: {},
                            });
                            return [2 /*return*/, { result: "SESSION_EXPIRED" }];
                        }
                        if (
                            postLockID.status !== preRequestIdToken.status ||
                            (postLockID.status === "EXISTS" &&
                                preRequestIdToken.status === "EXISTS" &&
                                postLockID.token !== preRequestIdToken.token)
                        ) {
                            (0, logger.logDebugMessage)(
                                "onUnauthorisedResponse: Retrying early because pre and post id refresh tokens don't match"
                            );
                            // means that some other process has already called this API and succeeded. so we need to call it again
                            return [2 /*return*/, { result: "RETRY" }];
                        }
                        headers = {};
                        if (!(preRequestIdToken.status === "EXISTS")) return [3 /*break*/, 6];
                        return [4 /*yield*/, AntiCsrfToken.getToken(preRequestIdToken.token)];
                    case 5:
                        antiCsrfToken_1 = _b.sent();
                        if (antiCsrfToken_1 !== undefined) {
                            (0, logger.logDebugMessage)(
                                "onUnauthorisedResponse: Adding anti-csrf token to refresh API call"
                            );
                            headers = __assign(__assign({}, headers), { "anti-csrf": antiCsrfToken_1 });
                        }
                        _b.label = 6;
                    case 6:
                        (0,
                        logger.logDebugMessage)("onUnauthorisedResponse: Adding rid and fdi-versions to refresh call header");
                        headers = __assign(__assign({ rid: AuthHttpRequest.rid }, headers), {
                            "fdi-version": version.supported_fdi.join(","),
                        });
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: Calling refresh pre API hook");
                        return [
                            4 /*yield*/,
                            AuthHttpRequest.config.preAPIHook({
                                action: "REFRESH_SESSION",
                                requestInit: {
                                    method: "post",
                                    credentials: "include",
                                    headers: headers,
                                },
                                url: AuthHttpRequest.refreshTokenUrl,
                                userContext: {},
                            }),
                        ];
                    case 7:
                        preAPIResult = _b.sent();
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: Making refresh call");
                        return [
                            4 /*yield*/,
                            AuthHttpRequest.env.__supertokensOriginalFetch(preAPIResult.url, preAPIResult.requestInit),
                        ];
                    case 8:
                        response = _b.sent();
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: Refresh call ended");
                        removeIdRefreshToken = true;
                        idRefreshToken = response.headers.get("id-refresh-token");
                        if (!idRefreshToken) return [3 /*break*/, 10];
                        (0,
                        logger.logDebugMessage)("onUnauthorisedResponse: Setting sIRTFrontend from refresh API call: " + idRefreshToken);
                        return [4 /*yield*/, setIdRefreshToken(idRefreshToken, response.status)];
                    case 9:
                        _b.sent();
                        removeIdRefreshToken = false;
                        _b.label = 10;
                    case 10:
                        if (!(response.status === AuthHttpRequest.config.sessionExpiredStatusCode))
                            return [3 /*break*/, 12];
                        (0,
                        logger.logDebugMessage)("onUnauthorisedResponse: Refresh status code is: " + response.status);
                        if (!removeIdRefreshToken) return [3 /*break*/, 12];
                        return [4 /*yield*/, setIdRefreshToken("remove", response.status)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        if (response.status >= 300) {
                            throw response;
                        }
                        return [
                            4 /*yield*/,
                            AuthHttpRequest.config.postAPIHook({
                                action: "REFRESH_SESSION",
                                fetchResponse: response.clone(),
                                requestInit: preAPIResult.requestInit,
                                url: preAPIResult.url,
                                userContext: {},
                            }),
                        ];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, getIdRefreshToken(false)];
                    case 14:
                        if (_b.sent().status === "NOT_EXISTS") {
                            (0, logger.logDebugMessage)(
                                "onUnauthorisedResponse: sIRTFrontend is remove, so returning session expired"
                            );
                            // The execution should never come here.. but just in case.
                            // removed by server. So we logout
                            // we do not send "UNAUTHORISED" event here because
                            // this is a result of the refresh API returning a session expiry, which
                            // means that the frontend did not know for sure that the session existed
                            // in the first place.
                            return [2 /*return*/, { result: "SESSION_EXPIRED" }];
                        }
                        antiCsrfToken = response.headers.get("anti-csrf");
                        if (!antiCsrfToken) return [3 /*break*/, 17];
                        return [4 /*yield*/, getIdRefreshToken(true)];
                    case 15:
                        tok = _b.sent();
                        if (!(tok.status === "EXISTS")) return [3 /*break*/, 17];
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: setting anti-csrf token");
                        return [4 /*yield*/, AntiCsrfToken.setItem(tok.token, antiCsrfToken)];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17:
                        frontToken = response.headers.get("front-token");
                        if (!frontToken) return [3 /*break*/, 19];
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: setting sFrontToken: " + frontToken);
                        return [4 /*yield*/, FrontToken.setItem(frontToken)];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19:
                        AuthHttpRequest.config.onHandleEvent({
                            action: "REFRESH_SESSION",
                            userContext: {},
                        });
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: Sending RETRY signal");
                        return [2 /*return*/, { result: "RETRY" }];
                    case 20:
                        error_1 = _b.sent();
                        return [4 /*yield*/, getIdRefreshToken(false)];
                    case 21:
                        if (_b.sent().status === "NOT_EXISTS") {
                            (0, logger.logDebugMessage)(
                                "onUnauthorisedResponse: sIRTFrontend is remove, so returning session expired"
                            );
                            // removed by server.
                            // we do not send "UNAUTHORISED" event here because
                            // this is a result of the refresh API returning a session expiry, which
                            // means that the frontend did not know for sure that the session existed
                            // in the first place.
                            return [2 /*return*/, { result: "SESSION_EXPIRED", error: error_1 }];
                        }
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: sending API_ERROR");
                        return [2 /*return*/, { result: "API_ERROR", error: error_1 }];
                    case 22:
                        return [4 /*yield*/, lock.releaseLock("REFRESH_TOKEN_USE")];
                    case 23:
                        _b.sent();
                        (0, logger.logDebugMessage)("onUnauthorisedResponse: Released lock");
                        return [4 /*yield*/, getIdRefreshToken(false)];
                    case 24:
                        if (!(_b.sent().status === "NOT_EXISTS")) return [3 /*break*/, 27];
                        (0,
                        logger.logDebugMessage)("onUnauthorisedResponse: sIRTFrontend is remove, so removing anti-csrf and sFrontToken");
                        return [4 /*yield*/, AntiCsrfToken.removeToken()];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, FrontToken.removeToken()];
                    case 26:
                        _b.sent();
                        _b.label = 27;
                    case 27:
                        return [7 /*endfinally*/];
                    case 28:
                        return [4 /*yield*/, getIdRefreshToken(false)];
                    case 29:
                        idCookieValue = _b.sent();
                        if (idCookieValue.status === "NOT_EXISTS") {
                            (0, logger.logDebugMessage)(
                                "onUnauthorisedResponse: lock acquired failed and sIRTFrontend is remove, so sending SESSION_EXPIRED"
                            );
                            // removed by server. So we logout
                            return [2 /*return*/, { result: "SESSION_EXPIRED" }];
                        } else {
                            if (
                                idCookieValue.status !== preRequestIdToken.status ||
                                (idCookieValue.status === "EXISTS" &&
                                    preRequestIdToken.status === "EXISTS" &&
                                    idCookieValue.token !== preRequestIdToken.token)
                            ) {
                                (0, logger.logDebugMessage)(
                                    "onUnauthorisedResponse: lock acquired failed and retrying early because pre and post id refresh tokens don't match"
                                );
                                return [2 /*return*/, { result: "RETRY" }];
                            }
                            // here we try to call the API again since we probably failed to acquire lock and nothing has changed.
                        }
                        return [3 /*break*/, 1];
                    case 30:
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.onUnauthorisedResponse = onUnauthorisedResponse;
    function onTokenUpdate() {
        (0, logger.logDebugMessage)("onTokenUpdate: firing ACCESS_TOKEN_PAYLOAD_UPDATED event");
        AuthHttpRequest.config.onHandleEvent({
            action: "ACCESS_TOKEN_PAYLOAD_UPDATED",
            userContext: {},
        });
    }
    exports.onTokenUpdate = onTokenUpdate;
    function onInvalidClaimResponse(response) {
        return __awaiter(this, void 0, void 0, function () {
            var claimValidationErrors;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [
                            4 /*yield*/,
                            AuthHttpRequest.recipeImpl.getInvalidClaimsFromResponse({
                                response: response,
                                userContext: {},
                            }),
                        ];
                    case 1:
                        claimValidationErrors = _c.sent();
                        // This shouldn't be undefined normally, but since we can't be certain about the shape of the response object so we check it like this.
                        // It could still be something else, but chance of that happening by accident is really low.
                        if (claimValidationErrors) {
                            AuthHttpRequest.config.onHandleEvent({
                                action: "API_INVALID_CLAIM",
                                claimValidationErrors: claimValidationErrors,
                                userContext: {},
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.onInvalidClaimResponse = onInvalidClaimResponse;
    // if tryRefresh is true & this token doesn't exist, we try and refresh the session
    // else we return undefined.
    function getIdRefreshToken(tryRefresh) {
        return __awaiter(this, void 0, void 0, function () {
            function getIdRefreshTokenFromLocal() {
                return __awaiter(this, void 0, void 0, function () {
                    function getIDFromCookieOld() {
                        return __awaiter(this, void 0, void 0, function () {
                            var value, _b, parts, last;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = "; ";
                                        return [
                                            4 /*yield*/,
                                            cookieHandler.default.getReferenceOrThrow().cookieHandler.getCookie(),
                                        ];
                                    case 1:
                                        value = _b + _c.sent();
                                        parts = value.split("; " + ID_REFRESH_TOKEN_NAME + "=");
                                        if (parts.length >= 2) {
                                            last = parts.pop();
                                            if (last === "remove") {
                                                // it means no session exists. This is different from
                                                // it being undefined since in that case a session may or may not exist.
                                                return [2 /*return*/, "remove"];
                                            }
                                            if (last !== undefined) {
                                                return [2 /*return*/, last.split(";").shift()];
                                            }
                                        }
                                        return [2 /*return*/, undefined];
                                }
                            });
                        });
                    }
                    var fromCookie;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [4 /*yield*/, getIDFromCookieOld()];
                            case 1:
                                fromCookie = _b.sent();
                                return [2 /*return*/, fromCookie];
                        }
                    });
                });
            }
            var token, response, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, logger.logDebugMessage)("getIdRefreshToken: called");
                        return [4 /*yield*/, getIdRefreshTokenFromLocal()];
                    case 1:
                        token = _b.sent();
                        if (token === "remove") {
                            (0, logger.logDebugMessage)("getIdRefreshToken: is removed");
                            return [
                                2 /*return*/,
                                {
                                    status: "NOT_EXISTS",
                                },
                            ];
                        }
                        if (!(token === undefined)) return [3 /*break*/, 5];
                        (0, logger.logDebugMessage)("getIdRefreshToken: is undefined");
                        response = {
                            status: "MAY_EXIST",
                        };
                        if (!tryRefresh) return [3 /*break*/, 4];
                        (0, logger.logDebugMessage)("getIdRefreshToken: trying to refresg");
                        return [4 /*yield*/, onUnauthorisedResponse(response)];
                    case 2:
                        res = _b.sent();
                        if (res.result !== "RETRY") {
                            (0, logger.logDebugMessage)(
                                "getIdRefreshToken: false NOT_EXISTS in case error from backend"
                            );
                            // in case the backend is not working, we treat it as the session not existing...
                            return [
                                2 /*return*/,
                                {
                                    status: "NOT_EXISTS",
                                },
                            ];
                        }
                        (0, logger.logDebugMessage)("getIdRefreshToken: Retrying post refresh");
                        return [4 /*yield*/, getIdRefreshToken(tryRefresh)];
                    case 3:
                        return [2 /*return*/, _b.sent()];
                    case 4:
                        (0, logger.logDebugMessage)("getIdRefreshToken: returning: " + response.status);
                        return [2 /*return*/, response];
                    case 5:
                        (0, logger.logDebugMessage)("getIdRefreshToken: returning EXISTS: " + token);
                        return [
                            2 /*return*/,
                            {
                                status: "EXISTS",
                                token: token,
                            },
                        ];
                }
            });
        });
    }
    exports.getIdRefreshToken = getIdRefreshToken;
    function setIdRefreshToken(idRefreshToken, statusCode) {
        return __awaiter(this, void 0, void 0, function () {
            function setIDToCookie(idRefreshToken, domain) {
                return __awaiter(this, void 0, void 0, function () {
                    var expires, cookieVal, splitted;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                expires = "Fri, 31 Dec 9999 23:59:59 GMT";
                                cookieVal = "remove";
                                if (idRefreshToken !== "remove") {
                                    splitted = idRefreshToken.split(";");
                                    cookieVal = splitted[0];
                                    // we must always respect this expiry and not set it to infinite
                                    // cause this ties into the session's lifetime. If we set this
                                    // to infinite, then a session may not exist, and this will exist,
                                    // then for example, if we check a session exists, and this says yes,
                                    // then if we getAccessTokenPayload, that will attempt a session refresh which will fail.
                                    // Another reason to respect this is that if we don't, then signOut will
                                    // call the API which will return 200 (no 401 cause the API thinks no session exists),
                                    // in which case, we will not end up firing the SIGN_OUT on handle event.
                                    expires = new Date(Number(splitted[1])).toUTCString();
                                }
                                if (
                                    !(
                                        domain === "localhost" ||
                                        domain ===
                                            windowHandler$1.default
                                                .getReferenceOrThrow()
                                                .windowHandler.location.getHostName()
                                    )
                                )
                                    return [3 /*break*/, 2];
                                // since some browsers ignore cookies with domain set to localhost
                                // see https://github.com/supertokens/supertokens-website/issues/25
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(ID_REFRESH_TOKEN_NAME, "=")
                                            .concat(cookieVal, ";expires=")
                                            .concat(expires, ";path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 1:
                                // since some browsers ignore cookies with domain set to localhost
                                // see https://github.com/supertokens/supertokens-website/issues/25
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(ID_REFRESH_TOKEN_NAME, "=")
                                            .concat(cookieVal, ";expires=")
                                            .concat(expires, ";domain=")
                                            .concat(domain, ";path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, logger.logDebugMessage)("setIdRefreshToken: called");
                        return [4 /*yield*/, getIdRefreshToken(false)];
                    case 1:
                        status = _b.sent().status;
                        (0, logger.logDebugMessage)("setIdRefreshToken: setting: " + idRefreshToken);
                        return [4 /*yield*/, setIDToCookie(idRefreshToken, AuthHttpRequest.config.sessionScope)];
                    case 2:
                        _b.sent();
                        if (idRefreshToken === "remove" && status === "EXISTS") {
                            // we check for wasLoggedIn cause we don't want to fire an event
                            // unnecessarily on first app load or if the user tried
                            // to query an API that returned 401 while the user was not logged in...
                            if (statusCode === AuthHttpRequest.config.sessionExpiredStatusCode) {
                                (0, logger.logDebugMessage)("setIdRefreshToken: firing UNAUTHORISED event");
                                AuthHttpRequest.config.onHandleEvent({
                                    action: "UNAUTHORISED",
                                    sessionExpiredOrRevoked: true,
                                    userContext: {},
                                });
                            } else {
                                (0, logger.logDebugMessage)("setIdRefreshToken: firing SIGN_OUT event");
                                AuthHttpRequest.config.onHandleEvent({
                                    action: "SIGN_OUT",
                                    userContext: {},
                                });
                            }
                        }
                        if (idRefreshToken !== "remove" && status === "NOT_EXISTS") {
                            (0, logger.logDebugMessage)("setIdRefreshToken: firing SESSION_CREATED event");
                            AuthHttpRequest.config.onHandleEvent({
                                action: "SESSION_CREATED",
                                userContext: {},
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.setIdRefreshToken = setIdRefreshToken;
    function getAntiCSRFToken() {
        return __awaiter(this, void 0, void 0, function () {
            function getAntiCSRFromCookie() {
                return __awaiter(this, void 0, void 0, function () {
                    var value, _b, parts, last, temp;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = "; ";
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.getCookie(),
                                ];
                            case 1:
                                value = _b + _c.sent();
                                parts = value.split("; " + ANTI_CSRF_NAME + "=");
                                if (parts.length >= 2) {
                                    last = parts.pop();
                                    if (last !== undefined) {
                                        temp = last.split(";").shift();
                                        if (temp === undefined) {
                                            return [2 /*return*/, null];
                                        }
                                        return [2 /*return*/, temp];
                                    }
                                }
                                return [2 /*return*/, null];
                        }
                    });
                });
            }
            var fromCookie;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, logger.logDebugMessage)("getAntiCSRFToken: called");
                        return [4 /*yield*/, getIdRefreshToken(true)];
                    case 1:
                        // we do not call doesSessionExist here cause the user might override that
                        // function here and then it may break the logic of our original implementation.
                        if (!(_b.sent().status === "EXISTS")) {
                            (0, logger.logDebugMessage)("getAntiCSRFToken: Returning because sIRTFrontend != EXISTS");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, getAntiCSRFromCookie()];
                    case 2:
                        fromCookie = _b.sent();
                        (0, logger.logDebugMessage)("getAntiCSRFToken: returning: " + fromCookie);
                        return [2 /*return*/, fromCookie];
                }
            });
        });
    }
    // give antiCSRFToken as undefined to remove it.
    function setAntiCSRF(antiCSRFToken) {
        return __awaiter(this, void 0, void 0, function () {
            function setAntiCSRFToCookie(antiCSRFToken, domain) {
                return __awaiter(this, void 0, void 0, function () {
                    var expires, cookieVal;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                expires = "Thu, 01 Jan 1970 00:00:01 GMT";
                                cookieVal = "";
                                if (antiCSRFToken !== undefined) {
                                    cookieVal = antiCSRFToken;
                                    expires = undefined; // set cookie without expiry
                                }
                                if (
                                    !(
                                        domain === "localhost" ||
                                        domain ===
                                            windowHandler$1.default
                                                .getReferenceOrThrow()
                                                .windowHandler.location.getHostName()
                                    )
                                )
                                    return [3 /*break*/, 5];
                                if (!(expires !== undefined)) return [3 /*break*/, 2];
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(ANTI_CSRF_NAME, "=")
                                            .concat(cookieVal, ";expires=")
                                            .concat(expires, ";path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(ANTI_CSRF_NAME, "=")
                                            .concat(
                                                cookieVal,
                                                ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite="
                                            )
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [3 /*break*/, 9];
                            case 5:
                                if (!(expires !== undefined)) return [3 /*break*/, 7];
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(ANTI_CSRF_NAME, "=")
                                            .concat(cookieVal, ";expires=")
                                            .concat(expires, ";domain=")
                                            .concat(domain, ";path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 6:
                                _b.sent();
                                return [3 /*break*/, 9];
                            case 7:
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(ANTI_CSRF_NAME, "=")
                                            .concat(cookieVal, ";domain=")
                                            .concat(domain, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 8:
                                _b.sent();
                                _b.label = 9;
                            case 9:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, logger.logDebugMessage)("setAntiCSRF: called: " + antiCSRFToken);
                        return [4 /*yield*/, setAntiCSRFToCookie(antiCSRFToken, AuthHttpRequest.config.sessionScope)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.setAntiCSRF = setAntiCSRF;
    function getFrontTokenFromCookie() {
        return __awaiter(this, void 0, void 0, function () {
            var value, _b, parts, last, temp;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (0, logger.logDebugMessage)("getFrontTokenFromCookie: called");
                        _b = "; ";
                        return [4 /*yield*/, cookieHandler.default.getReferenceOrThrow().cookieHandler.getCookie()];
                    case 1:
                        value = _b + _c.sent();
                        parts = value.split("; " + FRONT_TOKEN_NAME + "=");
                        if (parts.length >= 2) {
                            last = parts.pop();
                            if (last !== undefined) {
                                temp = last.split(";").shift();
                                if (temp === undefined) {
                                    return [2 /*return*/, null];
                                }
                                return [2 /*return*/, temp];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    }
    function parseFrontToken(frontToken) {
        return JSON.parse(decodeURIComponent(escape(atob(frontToken))));
    }
    function getFrontToken() {
        return __awaiter(this, void 0, void 0, function () {
            var fromCookie;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, logger.logDebugMessage)("getFrontToken: called");
                        return [4 /*yield*/, getIdRefreshToken(true)];
                    case 1:
                        // we do not call doesSessionExist here cause the user might override that
                        // function here and then it may break the logic of our original implementation.
                        if (!(_b.sent().status === "EXISTS")) {
                            (0, logger.logDebugMessage)("getFrontToken: Returning because sIRTFrontend != EXISTS");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, getFrontTokenFromCookie()];
                    case 2:
                        fromCookie = _b.sent();
                        (0, logger.logDebugMessage)("getFrontToken: returning: " + fromCookie);
                        return [2 /*return*/, fromCookie];
                }
            });
        });
    }
    exports.getFrontToken = getFrontToken;
    function setFrontToken(frontToken) {
        return __awaiter(this, void 0, void 0, function () {
            function setFrontTokenToCookie(frontToken, domain) {
                return __awaiter(this, void 0, void 0, function () {
                    var expires, cookieVal;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                expires = "Thu, 01 Jan 1970 00:00:01 GMT";
                                cookieVal = "";
                                if (frontToken !== undefined) {
                                    cookieVal = frontToken;
                                    expires = undefined; // set cookie without expiry
                                }
                                if (
                                    !(
                                        domain === "localhost" ||
                                        domain ===
                                            windowHandler$1.default
                                                .getReferenceOrThrow()
                                                .windowHandler.location.getHostName()
                                    )
                                )
                                    return [3 /*break*/, 5];
                                if (!(expires !== undefined)) return [3 /*break*/, 2];
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(FRONT_TOKEN_NAME, "=")
                                            .concat(cookieVal, ";expires=")
                                            .concat(expires, ";path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(FRONT_TOKEN_NAME, "=")
                                            .concat(
                                                cookieVal,
                                                ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite="
                                            )
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [3 /*break*/, 9];
                            case 5:
                                if (!(expires !== undefined)) return [3 /*break*/, 7];
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(FRONT_TOKEN_NAME, "=")
                                            .concat(cookieVal, ";expires=")
                                            .concat(expires, ";domain=")
                                            .concat(domain, ";path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 6:
                                _b.sent();
                                return [3 /*break*/, 9];
                            case 7:
                                return [
                                    4 /*yield*/,
                                    cookieHandler.default.getReferenceOrThrow().cookieHandler.setCookie(
                                        ""
                                            .concat(FRONT_TOKEN_NAME, "=")
                                            .concat(cookieVal, ";domain=")
                                            .concat(domain, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=")
                                            .concat(AuthHttpRequest.config.isInIframe ? "none;secure" : "lax")
                                    ),
                                ];
                            case 8:
                                _b.sent();
                                _b.label = 9;
                            case 9:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var oldToken, oldPayload, newPayload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, logger.logDebugMessage)("setFrontToken: called");
                        return [4 /*yield*/, getFrontTokenFromCookie()];
                    case 1:
                        oldToken = _b.sent();
                        if (oldToken !== null && frontToken !== undefined) {
                            oldPayload = parseFrontToken(oldToken).up;
                            newPayload = parseFrontToken(frontToken).up;
                            if (JSON.stringify(oldPayload) !== JSON.stringify(newPayload)) {
                                onTokenUpdate();
                            }
                        }
                        return [4 /*yield*/, setFrontTokenToCookie(frontToken, AuthHttpRequest.config.sessionScope)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.setFrontToken = setFrontToken;
});

unwrapExports(fetch$1);
fetch$1.setFrontToken;
fetch$1.getFrontToken;
fetch$1.setAntiCSRF;
fetch$1.setIdRefreshToken;
fetch$1.getIdRefreshToken;
fetch$1.onInvalidClaimResponse;
fetch$1.onTokenUpdate;
fetch$1.onUnauthorisedResponse;
fetch$1.FrontToken;
fetch$1.AntiCsrfToken;

var axiosError = createCommonjsModule(function (module, exports) {
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createAxiosErrorFromAxiosResp = exports.createAxiosErrorFromFetchResp = void 0;
    /**
     * From axios package
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */
    function enhanceAxiosError(error, config, code, request, response) {
        error.config = config;
        if (code) {
            error.code = code;
        }
        error.request = request;
        error.response = response;
        error.isAxiosError = true;
        error.toJSON = function toJSON() {
            return {
                // Standard
                message: this.message,
                name: this.name,
                // Microsoft
                description: this.description,
                number: this.number,
                // Mozilla
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                // Axios
                config: this.config,
                code: this.code,
            };
        };
        return error;
    }
    function createAxiosErrorFromFetchResp(response) {
        return __awaiter(this, void 0, void 0, function () {
            var config, contentType, data, axiosResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = {
                            url: response.url,
                            headers: response.headers,
                        };
                        contentType = response.headers.get("content-type");
                        if (!(contentType === null)) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response.text()];
                    case 2:
                        data = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b.sent();
                        data = "";
                        return [3 /*break*/, 4];
                    case 4:
                        return [3 /*break*/, 11];
                    case 5:
                        if (!contentType.includes("application/json")) return [3 /*break*/, 7];
                        return [4 /*yield*/, response.json()];
                    case 6:
                        data = _b.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!contentType.includes("text/")) return [3 /*break*/, 9];
                        return [4 /*yield*/, response.text()];
                    case 8:
                        data = _b.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        return [4 /*yield*/, response.blob()];
                    case 10:
                        data = _b.sent();
                        _b.label = 11;
                    case 11:
                        axiosResponse = {
                            data: data,
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers,
                            config: config,
                            request: undefined,
                        };
                        return [
                            2 /*return*/,
                            enhanceAxiosError(
                                new Error("Request failed with status code " + response.status),
                                config,
                                undefined,
                                undefined,
                                axiosResponse
                            ),
                        ];
                }
            });
        });
    }
    exports.createAxiosErrorFromFetchResp = createAxiosErrorFromFetchResp;
    function createAxiosErrorFromAxiosResp(response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    enhanceAxiosError(
                        new Error("Request failed with status code " + response.status),
                        response.config,
                        undefined,
                        response.request,
                        response
                    ),
                ];
            });
        });
    }
    exports.createAxiosErrorFromAxiosResp = createAxiosErrorFromAxiosResp;
});

unwrapExports(axiosError);
axiosError.createAxiosErrorFromAxiosResp;
axiosError.createAxiosErrorFromFetchResp;

var axios = createCommonjsModule(function (module, exports) {
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.responseErrorInterceptor =
        exports.responseInterceptor =
        exports.interceptorFunctionRequestFulfilled =
            void 0;

    function getUrlFromConfig(config) {
        var url = config.url === undefined ? "" : config.url;
        var baseURL = config.baseURL;
        if (baseURL !== undefined) {
            if (url.charAt(0) === "/" && baseURL.charAt(baseURL.length - 1) === "/") {
                url = baseURL + url.substr(1);
            } else if (url.charAt(0) !== "/" && baseURL.charAt(baseURL.length - 1) !== "/") {
                url = baseURL + "/" + url;
            } else {
                url = baseURL + url;
            }
        }
        return url;
    }
    function interceptorFunctionRequestFulfilled(config) {
        return __awaiter(this, void 0, void 0, function () {
            var url, doNotDoInterception, preRequestIdToken, configWithAntiCsrf, antiCsrfToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, logger.logDebugMessage)("interceptorFunctionRequestFulfilled: started axios interception");
                        url = getUrlFromConfig(config);
                        doNotDoInterception = false;
                        try {
                            doNotDoInterception =
                                typeof url === "string" &&
                                !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                    url,
                                    fetch$1.default.config.apiDomain,
                                    fetch$1.default.config.cookieDomain
                                );
                        } catch (err) {
                            if (err.message === "Please provide a valid domain name") {
                                (0, logger.logDebugMessage)(
                                    "interceptorFunctionRequestFulfilled: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                                );
                                // .origin gives the port as well..
                                doNotDoInterception = !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                    windowHandler$1.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
                                    fetch$1.default.config.apiDomain,
                                    fetch$1.default.config.cookieDomain
                                );
                            } else {
                                throw err;
                            }
                        }
                        (0,
                        logger.logDebugMessage)("interceptorFunctionRequestFulfilled: Value of doNotDoInterception: " + doNotDoInterception);
                        if (doNotDoInterception) {
                            (0, logger.logDebugMessage)(
                                "interceptorFunctionRequestFulfilled: Returning config unchanged"
                            );
                            // this check means that if you are using axios via inteceptor, then we only do the refresh steps if you are calling your APIs.
                            return [2 /*return*/, config];
                        }
                        (0, logger.logDebugMessage)("interceptorFunctionRequestFulfilled: Modifying config");
                        processState.ProcessState.getInstance().addState(
                            processState.PROCESS_STATE.CALLING_INTERCEPTION_REQUEST
                        );
                        return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                    case 1:
                        preRequestIdToken = _a.sent();
                        configWithAntiCsrf = config;
                        if (!(preRequestIdToken.status === "EXISTS")) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch$1.AntiCsrfToken.getToken(preRequestIdToken.token)];
                    case 2:
                        antiCsrfToken = _a.sent();
                        if (antiCsrfToken !== undefined) {
                            (0, logger.logDebugMessage)(
                                "interceptorFunctionRequestFulfilled: Adding anti-csrf token to request"
                            );
                            configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), {
                                headers:
                                    configWithAntiCsrf === undefined
                                        ? {
                                              "anti-csrf": antiCsrfToken,
                                          }
                                        : __assign(__assign({}, configWithAntiCsrf.headers), {
                                              "anti-csrf": antiCsrfToken,
                                          }),
                            });
                        }
                        _a.label = 3;
                    case 3:
                        if (
                            fetch$1.default.config.autoAddCredentials &&
                            configWithAntiCsrf.withCredentials === undefined
                        ) {
                            (0, logger.logDebugMessage)(
                                "interceptorFunctionRequestFulfilled: Adding credentials include"
                            );
                            configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), { withCredentials: true });
                        }
                        // adding rid for anti-csrf protection: Anti-csrf via custom header
                        (0,
                        logger.logDebugMessage)("interceptorFunctionRequestFulfilled: Adding rid header: anti-csrf (it may be overriden by the user's provided rid)");
                        configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), {
                            headers:
                                configWithAntiCsrf === undefined
                                    ? {
                                          rid: "anti-csrf",
                                      }
                                    : __assign({ rid: "anti-csrf" }, configWithAntiCsrf.headers),
                        });
                        (0, logger.logDebugMessage)("interceptorFunctionRequestFulfilled: returning modified config");
                        return [2 /*return*/, configWithAntiCsrf];
                }
            });
        });
    }
    exports.interceptorFunctionRequestFulfilled = interceptorFunctionRequestFulfilled;
    function responseInterceptor(axiosInstance) {
        var _this = this;
        return function (response) {
            return __awaiter(_this, void 0, void 0, function () {
                var doNotDoInterception, url, idRefreshToken, config, antiCsrfToken, tok, frontToken, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            doNotDoInterception = false;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 13, 19]);
                            if (!fetch$1.default.initCalled) {
                                throw new Error("init function not called");
                            }
                            (0, logger.logDebugMessage)("responseInterceptor: started");
                            (0,
                            logger.logDebugMessage)("responseInterceptor: already intercepted: " + response.headers["x-supertokens-xhr-intercepted"]);
                            url = getUrlFromConfig(response.config);
                            try {
                                doNotDoInterception =
                                    (typeof url === "string" &&
                                        !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                            url,
                                            fetch$1.default.config.apiDomain,
                                            fetch$1.default.config.cookieDomain
                                        )) ||
                                    !!response.headers["x-supertokens-xhr-intercepted"];
                            } catch (err) {
                                if (err.message === "Please provide a valid domain name") {
                                    (0, logger.logDebugMessage)(
                                        "responseInterceptor: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                                    );
                                    // .origin gives the port as well..
                                    doNotDoInterception =
                                        !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                            windowHandler$1.default
                                                .getReferenceOrThrow()
                                                .windowHandler.location.getOrigin(),
                                            fetch$1.default.config.apiDomain,
                                            fetch$1.default.config.cookieDomain
                                        ) || !!response.headers["x-supertokens-xhr-intercepted"];
                                } else {
                                    throw err;
                                }
                            }
                            (0,
                            logger.logDebugMessage)("responseInterceptor: Value of doNotDoInterception: " + doNotDoInterception);
                            if (doNotDoInterception) {
                                (0, logger.logDebugMessage)("responseInterceptor: Returning without interception");
                                // this check means that if you are using axios via inteceptor, then we only do the refresh steps if you are calling your APIs.
                                return [2 /*return*/, response];
                            }
                            (0, logger.logDebugMessage)("responseInterceptor: Interception started");
                            processState.ProcessState.getInstance().addState(
                                processState.PROCESS_STATE.CALLING_INTERCEPTION_RESPONSE
                            );
                            idRefreshToken = response.headers["id-refresh-token"];
                            if (!(idRefreshToken !== undefined)) return [3 /*break*/, 3];
                            (0, logger.logDebugMessage)("responseInterceptor: Setting sIRTFrontend: " + idRefreshToken);
                            return [4 /*yield*/, (0, fetch$1.setIdRefreshToken)(idRefreshToken, response.status)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            if (!(response.status === fetch$1.default.config.sessionExpiredStatusCode))
                                return [3 /*break*/, 4];
                            (0, logger.logDebugMessage)("responseInterceptor: Status code is: " + response.status);
                            config = response.config;
                            return [
                                2 /*return*/,
                                AuthHttpRequest.doRequest(
                                    function (config) {
                                        // we create an instance since we don't want to intercept this.
                                        // const instance = axios.create();
                                        // return instance(config);
                                        return axiosInstance(config);
                                    },
                                    config,
                                    url,
                                    response,
                                    undefined,
                                    true
                                ),
                            ];
                        case 4:
                            if (!(response.status === fetch$1.default.config.invalidClaimStatusCode))
                                return [3 /*break*/, 6];
                            // only fire event if body is defined.
                            return [4 /*yield*/, (0, fetch$1.onInvalidClaimResponse)(response)];
                        case 5:
                            // only fire event if body is defined.
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            antiCsrfToken = response.headers["anti-csrf"];
                            if (!(antiCsrfToken !== undefined)) return [3 /*break*/, 9];
                            return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                        case 7:
                            tok = _b.sent();
                            if (!(tok.status === "EXISTS")) return [3 /*break*/, 9];
                            (0, logger.logDebugMessage)("responseInterceptor: Setting anti-csrf token");
                            return [4 /*yield*/, fetch$1.AntiCsrfToken.setItem(tok.token, antiCsrfToken)];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9:
                            frontToken = response.headers["front-token"];
                            if (!(frontToken !== undefined)) return [3 /*break*/, 11];
                            (0, logger.logDebugMessage)("responseInterceptor: Setting sFrontToken: " + frontToken);
                            return [4 /*yield*/, fetch$1.FrontToken.setItem(frontToken)];
                        case 10:
                            _b.sent();
                            _b.label = 11;
                        case 11:
                            return [2 /*return*/, response];
                        case 12:
                            return [3 /*break*/, 19];
                        case 13:
                            _a = !doNotDoInterception;
                            if (!_a) return [3 /*break*/, 15];
                            return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                        case 14:
                            // we do not call doesSessionExist here cause the user might override that
                            // function here and then it may break the logic of our original implementation.
                            _a = !(_b.sent().status === "EXISTS");
                            _b.label = 15;
                        case 15:
                            if (!_a) return [3 /*break*/, 18];
                            (0,
                            logger.logDebugMessage)("responseInterceptor: sIRTFrontend doesn't exist, so removing anti-csrf and sFrontToken");
                            return [4 /*yield*/, fetch$1.AntiCsrfToken.removeToken()];
                        case 16:
                            _b.sent();
                            return [4 /*yield*/, fetch$1.FrontToken.removeToken()];
                        case 17:
                            _b.sent();
                            _b.label = 18;
                        case 18:
                            return [7 /*endfinally*/];
                        case 19:
                            return [2 /*return*/];
                    }
                });
            });
        };
    }
    exports.responseInterceptor = responseInterceptor;
    function responseErrorInterceptor(axiosInstance) {
        var _this = this;
        return function (error) {
            return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, logger.logDebugMessage)("responseErrorInterceptor: called");
                            (0,
                            logger.logDebugMessage)("responseErrorInterceptor: already intercepted: " + (error.response && error.response.headers["x-supertokens-xhr-intercepted"]));
                            if (error.response.headers["x-supertokens-xhr-intercepted"]) {
                                throw error;
                            }
                            if (
                                !(
                                    error.response !== undefined &&
                                    error.response.status === fetch$1.default.config.sessionExpiredStatusCode
                                )
                            )
                                return [3 /*break*/, 1];
                            (0,
                            logger.logDebugMessage)("responseErrorInterceptor: Status code is: " + error.response.status);
                            config = error.config;
                            return [
                                2 /*return*/,
                                AuthHttpRequest.doRequest(
                                    function (config) {
                                        // we create an instance since we don't want to intercept this.
                                        // const instance = axios.create();
                                        // return instance(config);
                                        return axiosInstance(config);
                                    },
                                    config,
                                    getUrlFromConfig(config),
                                    undefined,
                                    error,
                                    true
                                ),
                            ];
                        case 1:
                            if (
                                !(
                                    error.response !== undefined &&
                                    error.response.status === fetch$1.default.config.invalidClaimStatusCode
                                )
                            )
                                return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, fetch$1.onInvalidClaimResponse)(error.response)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            throw error;
                    }
                });
            });
        };
    }
    exports.responseErrorInterceptor = responseErrorInterceptor;
    /**
     * @class AuthHttpRequest
     * @description wrapper for common http methods.
     */
    var AuthHttpRequest = /** @class */ (function () {
        function AuthHttpRequest() {}
        var _a;
        _a = AuthHttpRequest;
        /**
         * @description sends the actual http request and returns a response if successful/
         * If not successful due to session expiry reasons, it
         * attempts to call the refresh token API and if that is successful, calls this API again.
         * @throws Error
         */
        AuthHttpRequest.doRequest = function (httpCall, config, url, prevResponse, prevError, viaInterceptor) {
            if (viaInterceptor === void 0) {
                viaInterceptor = false;
            }
            return __awaiter(void 0, void 0, void 0, function () {
                var doNotDoInterception,
                    returnObj,
                    preRequestIdToken,
                    configWithAntiCsrf,
                    antiCsrfToken,
                    localPrevError,
                    localPrevResponse,
                    response,
                    _b,
                    idRefreshToken,
                    refreshResult,
                    _c,
                    antiCsrfToken,
                    tok,
                    frontToken,
                    err_1,
                    response,
                    idRefreshToken,
                    refreshResult,
                    _d,
                    postRequestIdToken;
                return __generator(_a, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!fetch$1.default.initCalled) {
                                throw Error("init function not called");
                            }
                            (0, logger.logDebugMessage)("doRequest: called");
                            doNotDoInterception = false;
                            try {
                                doNotDoInterception =
                                    typeof url === "string" &&
                                    !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                        url,
                                        fetch$1.default.config.apiDomain,
                                        fetch$1.default.config.cookieDomain
                                    ) &&
                                    viaInterceptor;
                            } catch (err) {
                                if (err.message === "Please provide a valid domain name") {
                                    (0, logger.logDebugMessage)(
                                        "doRequest: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                                    );
                                    // .origin gives the port as well..
                                    doNotDoInterception =
                                        !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                            windowHandler$1.default
                                                .getReferenceOrThrow()
                                                .windowHandler.location.getOrigin(),
                                            fetch$1.default.config.apiDomain,
                                            fetch$1.default.config.cookieDomain
                                        ) && viaInterceptor;
                                } else {
                                    throw err;
                                }
                            }
                            (0,
                            logger.logDebugMessage)("doRequest: Value of doNotDoInterception: " + doNotDoInterception);
                            if (!doNotDoInterception) return [3 /*break*/, 2];
                            (0, logger.logDebugMessage)("doRequest: Returning without interception");
                            if (prevError !== undefined) {
                                throw prevError;
                            } else if (prevResponse !== undefined) {
                                return [2 /*return*/, prevResponse];
                            }
                            return [4 /*yield*/, httpCall(config)];
                        case 1:
                            return [2 /*return*/, _e.sent()];
                        case 2:
                            (0, logger.logDebugMessage)("doRequest: Interception started");
                            _e.label = 3;
                        case 3:
                            _e.trys.push([3, , 45, 50]);
                            returnObj = undefined;
                            _e.label = 4;
                        case 4:
                            return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                        case 5:
                            preRequestIdToken = _e.sent();
                            configWithAntiCsrf = config;
                            if (!(preRequestIdToken.status === "EXISTS")) return [3 /*break*/, 7];
                            return [4 /*yield*/, fetch$1.AntiCsrfToken.getToken(preRequestIdToken.token)];
                        case 6:
                            antiCsrfToken = _e.sent();
                            if (antiCsrfToken !== undefined) {
                                (0, logger.logDebugMessage)("doRequest: Adding anti-csrf token to request");
                                configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), {
                                    headers:
                                        configWithAntiCsrf === undefined
                                            ? {
                                                  "anti-csrf": antiCsrfToken,
                                              }
                                            : __assign(__assign({}, configWithAntiCsrf.headers), {
                                                  "anti-csrf": antiCsrfToken,
                                              }),
                                });
                            }
                            _e.label = 7;
                        case 7:
                            if (
                                fetch$1.default.config.autoAddCredentials &&
                                configWithAntiCsrf.withCredentials === undefined
                            ) {
                                (0, logger.logDebugMessage)("doRequest: Adding credentials include");
                                configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), {
                                    withCredentials: true,
                                });
                            }
                            // adding rid for anti-csrf protection: Anti-csrf via custom header
                            (0,
                            logger.logDebugMessage)("doRequest: Adding rid header: anti-csrf (May get overriden by user's rid)");
                            configWithAntiCsrf = __assign(__assign({}, configWithAntiCsrf), {
                                headers:
                                    configWithAntiCsrf === undefined
                                        ? {
                                              rid: "anti-csrf",
                                          }
                                        : __assign({ rid: "anti-csrf" }, configWithAntiCsrf.headers),
                            });
                            _e.label = 8;
                        case 8:
                            _e.trys.push([8, 29, , 43]);
                            localPrevError = prevError;
                            localPrevResponse = prevResponse;
                            prevError = undefined;
                            prevResponse = undefined;
                            if (localPrevError !== undefined) {
                                (0, logger.logDebugMessage)(
                                    "doRequest: Not making call because localPrevError is not undefined"
                                );
                                throw localPrevError;
                            }
                            if (localPrevResponse !== undefined) {
                                (0, logger.logDebugMessage)(
                                    "doRequest: Not making call because localPrevResponse is not undefined"
                                );
                            } else {
                                (0, logger.logDebugMessage)("doRequest: Making user's http call");
                            }
                            if (!(localPrevResponse === undefined)) return [3 /*break*/, 10];
                            return [4 /*yield*/, httpCall(configWithAntiCsrf)];
                        case 9:
                            _b = _e.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            _b = localPrevResponse;
                            _e.label = 11;
                        case 11:
                            response = _b;
                            (0, logger.logDebugMessage)("doRequest: User's http call ended");
                            idRefreshToken = response.headers["id-refresh-token"];
                            if (!(idRefreshToken !== undefined)) return [3 /*break*/, 13];
                            (0, logger.logDebugMessage)("doRequest: Setting sIRTFrontend: " + idRefreshToken);
                            return [4 /*yield*/, (0, fetch$1.setIdRefreshToken)(idRefreshToken, response.status)];
                        case 12:
                            _e.sent();
                            _e.label = 13;
                        case 13:
                            if (!(response.status === fetch$1.default.config.sessionExpiredStatusCode))
                                return [3 /*break*/, 20];
                            (0, logger.logDebugMessage)("doRequest: Status code is: " + response.status);
                            return [4 /*yield*/, (0, fetch$1.onUnauthorisedResponse)(preRequestIdToken)];
                        case 14:
                            refreshResult = _e.sent();
                            if (!(refreshResult.result !== "RETRY")) return [3 /*break*/, 19];
                            (0, logger.logDebugMessage)("doRequest: Not retrying original request");
                            if (!refreshResult.error) return [3 /*break*/, 16];
                            return [4 /*yield*/, (0, axiosError.createAxiosErrorFromFetchResp)(refreshResult.error)];
                        case 15:
                            _c = _e.sent();
                            return [3 /*break*/, 18];
                        case 16:
                            return [4 /*yield*/, (0, axiosError.createAxiosErrorFromAxiosResp)(response)];
                        case 17:
                            _c = _e.sent();
                            _e.label = 18;
                        case 18:
                            // Returning refreshResult.error as an Axios Error if we attempted a refresh
                            // Returning the response to the original response as an error if we did not attempt refreshing
                            returnObj = _c;
                            return [3 /*break*/, 44];
                        case 19:
                            (0, logger.logDebugMessage)("doRequest: Retrying original request");
                            return [3 /*break*/, 28];
                        case 20:
                            if (!(response.status === fetch$1.default.config.invalidClaimStatusCode))
                                return [3 /*break*/, 22];
                            return [4 /*yield*/, (0, fetch$1.onInvalidClaimResponse)(response)];
                        case 21:
                            _e.sent();
                            _e.label = 22;
                        case 22:
                            antiCsrfToken = response.headers["anti-csrf"];
                            if (!(antiCsrfToken !== undefined)) return [3 /*break*/, 25];
                            return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                        case 23:
                            tok = _e.sent();
                            if (!(tok.status === "EXISTS")) return [3 /*break*/, 25];
                            (0, logger.logDebugMessage)("doRequest: Setting anti-csrf token");
                            return [4 /*yield*/, fetch$1.AntiCsrfToken.setItem(tok.token, antiCsrfToken)];
                        case 24:
                            _e.sent();
                            _e.label = 25;
                        case 25:
                            frontToken = response.headers["front-token"];
                            if (!(frontToken !== undefined)) return [3 /*break*/, 27];
                            (0, logger.logDebugMessage)("doRequest: Setting sFrontToken: " + frontToken);
                            return [4 /*yield*/, fetch$1.FrontToken.setItem(frontToken)];
                        case 26:
                            _e.sent();
                            _e.label = 27;
                        case 27:
                            return [2 /*return*/, response];
                        case 28:
                            return [3 /*break*/, 43];
                        case 29:
                            err_1 = _e.sent();
                            response = err_1.response;
                            if (!(response !== undefined)) return [3 /*break*/, 41];
                            idRefreshToken = response.headers["id-refresh-token"];
                            if (!(idRefreshToken !== undefined)) return [3 /*break*/, 31];
                            (0, logger.logDebugMessage)("doRequest: Setting sIRTFrontend: " + idRefreshToken);
                            return [4 /*yield*/, (0, fetch$1.setIdRefreshToken)(idRefreshToken, response.status)];
                        case 30:
                            _e.sent();
                            _e.label = 31;
                        case 31:
                            if (!(response.status === fetch$1.default.config.sessionExpiredStatusCode))
                                return [3 /*break*/, 37];
                            (0, logger.logDebugMessage)("doRequest: Status code is: " + response.status);
                            return [4 /*yield*/, (0, fetch$1.onUnauthorisedResponse)(preRequestIdToken)];
                        case 32:
                            refreshResult = _e.sent();
                            if (!(refreshResult.result !== "RETRY")) return [3 /*break*/, 36];
                            (0, logger.logDebugMessage)("doRequest: Not retrying original request");
                            if (!(refreshResult.error !== undefined)) return [3 /*break*/, 34];
                            return [4 /*yield*/, (0, axiosError.createAxiosErrorFromFetchResp)(refreshResult.error)];
                        case 33:
                            _d = _e.sent();
                            return [3 /*break*/, 35];
                        case 34:
                            _d = err_1;
                            _e.label = 35;
                        case 35:
                            // Returning refreshResult.error as an Axios Error if we attempted a refresh
                            // Returning the original error if we did not attempt refreshing
                            returnObj = _d;
                            return [3 /*break*/, 44];
                        case 36:
                            (0, logger.logDebugMessage)("doRequest: Retrying original request");
                            return [3 /*break*/, 40];
                        case 37:
                            if (!(response.status === fetch$1.default.config.invalidClaimStatusCode))
                                return [3 /*break*/, 39];
                            return [4 /*yield*/, (0, fetch$1.onInvalidClaimResponse)(response)];
                        case 38:
                            _e.sent();
                            _e.label = 39;
                        case 39:
                            throw err_1;
                        case 40:
                            return [3 /*break*/, 42];
                        case 41:
                            throw err_1;
                        case 42:
                            return [3 /*break*/, 43];
                        case 43:
                            return [3 /*break*/, 4];
                        case 44:
                            // if it comes here, means we called break. which happens only if we have logged out.
                            // which means it's a 401, so we throw
                            throw returnObj;
                        case 45:
                            return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(false)];
                        case 46:
                            postRequestIdToken = _e.sent();
                            if (!(postRequestIdToken.status === "NOT_EXISTS")) return [3 /*break*/, 49];
                            (0,
                            logger.logDebugMessage)("doRequest: sIRTFrontend doesn't exist, so removing anti-csrf and sFrontToken");
                            return [4 /*yield*/, fetch$1.AntiCsrfToken.removeToken()];
                        case 47:
                            _e.sent();
                            return [4 /*yield*/, fetch$1.FrontToken.removeToken()];
                        case 48:
                            _e.sent();
                            _e.label = 49;
                        case 49:
                            return [7 /*endfinally*/];
                        case 50:
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AuthHttpRequest;
    })();
    exports.default = AuthHttpRequest;
});

unwrapExports(axios);
axios.responseErrorInterceptor;
axios.responseInterceptor;
axios.interceptorFunctionRequestFulfilled;

var error = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    var __extends =
        (commonjsGlobal && commonjsGlobal.__extends) ||
        (function () {
            var extendStatics = function (d, b) {
                extendStatics =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function (d, b) {
                            d.__proto__ = b;
                        }) ||
                    function (d, b) {
                        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
            };
        })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.STGeneralError = void 0;
    /**
     * This error usually indicates that the API exposed by the backend SDKs responded
     * with `{status: "GENERAL_ERROR"}`. This should be used to show errors to the user
     * in your frontend application.
     */
    var STGeneralError = /** @class */ (function (_super) {
        __extends(STGeneralError, _super);
        function STGeneralError(message) {
            var _this = _super.call(this, message) || this;
            _this.isSuperTokensGeneralError = true;
            return _this;
        }
        STGeneralError.isThisError = function (err) {
            return err.isSuperTokensGeneralError === true;
        };
        return STGeneralError;
    })(Error);
    exports.STGeneralError = STGeneralError;
});

unwrapExports(error);
error.STGeneralError;

var xmlhttprequest = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addInterceptorsToXMLHttpRequest = void 0;

    var XHR_EVENTS = ["readystatechange", "abort", "error", "load", "loadend", "loadstart", "progress", "timeout"];
    function addInterceptorsToXMLHttpRequest() {
        var firstEventLoopDone = false;
        setTimeout(function () {
            return (firstEventLoopDone = true);
        }, 0);
        var oldXMLHttpRequest = XMLHttpRequest;
        (0, logger.logDebugMessage)("addInterceptorsToXMLHttpRequest called");
        // create XMLHttpRequest proxy object
        // define constructor for my proxy object
        XMLHttpRequest = function () {
            var actual = new oldXMLHttpRequest();
            var delayActualCalls = !firstEventLoopDone;
            function delayIfNecessary(cb) {
                if (delayActualCalls) {
                    setTimeout(function () {
                        cb();
                    }, 0);
                } else {
                    cb();
                }
            }
            var self = this;
            var listOfFunctionCallsInProxy = [];
            var requestHeaders = [];
            var customGetterValues = {};
            var customResponseHeaders;
            var eventHandlers = new Map();
            // We define these during open
            // let method: string = "";
            var url = "";
            var doNotDoInterception = false;
            var preRequestIdToken = undefined;
            var body;
            // we do not provide onerror cause that is fired only on
            // network level failures and nothing else. If a status code is > 400,
            // then onload and onreadystatechange are called.
            // Setting up props (event handlers) that we use in event handlers
            // These require processing the response (and possibly retrying) before they are forwarded to the user
            self.onload = null;
            self.onreadystatechange = null;
            self.onloadend = null;
            // TODO: add support for other event listener options
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters
            self.addEventListener = function (type, listener, _options) {
                var handlers = eventHandlers.get(type);
                if (handlers === undefined) {
                    handlers = new Set();
                    eventHandlers.set(type, handlers);
                }
                handlers.add(listener);
            };
            self.removeEventListener = function (type, listener) {
                var handlers = eventHandlers.get(type);
                if (handlers === undefined) {
                    handlers = new Set();
                    eventHandlers.set(type, handlers);
                }
                handlers.delete(listener);
            };
            function redispatchEvent(name, ev) {
                var handlers = eventHandlers.get(name);
                (0, logger.logDebugMessage)(
                    "XHRInterceptor dispatching "
                        .concat(ev.type, " to ")
                        .concat(handlers ? handlers.size : 0, " listeners")
                );
                if (handlers) {
                    Array.from(handlers).forEach(function (handler) {
                        return handler.apply(self, [ev]);
                    });
                }
            }
            function handleRetryPostRefreshing() {
                return __awaiter(this, void 0, void 0, function () {
                    var refreshResult, retryXhr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (preRequestIdToken === undefined) {
                                    throw new Error("Should never come here..");
                                }
                                (0,
                                logger.logDebugMessage)("XHRInterceptor.handleRetryPostRefreshing: preRequestIdToken " + preRequestIdToken.status);
                                return [4 /*yield*/, (0, fetch$1.onUnauthorisedResponse)(preRequestIdToken)];
                            case 1:
                                refreshResult = _a.sent();
                                if (refreshResult.result !== "RETRY") {
                                    (0, logger.logDebugMessage)(
                                        "XHRInterceptor.handleRetryPostRefreshing: Not retrying original request " +
                                            !!refreshResult.error
                                    );
                                    if (refreshResult.error !== undefined) {
                                        // this will cause the responseText of the self to be updated
                                        // to the error message and make the status code the same as
                                        // what the error's status code is.
                                        throw refreshResult.error;
                                    }
                                    // it can come here if refreshResult.result is SESSION_EXPIRED.
                                    // in that case, the status of self is already 401. So we let it
                                    // pass through.
                                    return [2 /*return*/, true];
                                }
                                (0,
                                logger.logDebugMessage)("XHRInterceptor.handleRetryPostRefreshing: Retrying original request");
                                retryXhr = new oldXMLHttpRequest();
                                setUpXHR(self, retryXhr, true);
                                // this also calls the send function with the appropriate body
                                listOfFunctionCallsInProxy.forEach(function (i) {
                                    i(retryXhr);
                                });
                                sendXHR(retryXhr, body);
                                return [2 /*return*/, false];
                        }
                    });
                });
            }
            function handleResponse(xhr) {
                return __awaiter(this, void 0, void 0, function () {
                    var status_1, headers, idRefreshToken, antiCsrfToken, tok, frontToken, err_1, resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (doNotDoInterception) {
                                    (0, logger.logDebugMessage)(
                                        "XHRInterceptor.handleResponse: Returning without interception"
                                    );
                                    return [2 /*return*/, true];
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 20, , 24]);
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, , 14, 19]);
                                (0, logger.logDebugMessage)("XHRInterceptor.handleResponse: Interception started");
                                processState.ProcessState.getInstance().addState(
                                    processState.PROCESS_STATE.CALLING_INTERCEPTION_RESPONSE
                                );
                                status_1 = xhr.status;
                                headers = new Headers(
                                    xhr
                                        .getAllResponseHeaders()
                                        .trim()
                                        .split("\r\n")
                                        .map(function (line) {
                                            return line.split(": ");
                                        })
                                );
                                idRefreshToken = headers.get("id-refresh-token");
                                if (!idRefreshToken) return [3 /*break*/, 4];
                                (0,
                                logger.logDebugMessage)("XHRInterceptor.handleResponse: Setting sIRTFrontend: " + idRefreshToken);
                                return [4 /*yield*/, (0, fetch$1.setIdRefreshToken)(idRefreshToken, status_1)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                if (!(status_1 === fetch$1.default.config.sessionExpiredStatusCode))
                                    return [3 /*break*/, 6];
                                (0, logger.logDebugMessage)("responseInterceptor: Status code is: " + status_1);
                                return [4 /*yield*/, handleRetryPostRefreshing()];
                            case 5:
                                return [2 /*return*/, _a.sent()];
                            case 6:
                                if (!(status_1 === fetch$1.default.config.invalidClaimStatusCode))
                                    return [3 /*break*/, 8];
                                return [
                                    4 /*yield*/,
                                    (0, fetch$1.onInvalidClaimResponse)({
                                        data: JSON.parse(xhr.responseText),
                                    }),
                                ];
                            case 7:
                                _a.sent();
                                _a.label = 8;
                            case 8:
                                antiCsrfToken = headers.get("anti-csrf");
                                if (!antiCsrfToken) return [3 /*break*/, 11];
                                return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                            case 9:
                                tok = _a.sent();
                                if (!(tok.status === "EXISTS")) return [3 /*break*/, 11];
                                (0, logger.logDebugMessage)("XHRInterceptor.handleResponse: Setting anti-csrf token");
                                return [4 /*yield*/, fetch$1.AntiCsrfToken.setItem(tok.token, antiCsrfToken)];
                            case 10:
                                _a.sent();
                                _a.label = 11;
                            case 11:
                                frontToken = headers.get("front-token");
                                if (!frontToken) return [3 /*break*/, 13];
                                (0,
                                logger.logDebugMessage)("XHRInterceptor.handleResponse: Setting sFrontToken: " + frontToken);
                                return [4 /*yield*/, fetch$1.FrontToken.setItem(frontToken)];
                            case 12:
                                _a.sent();
                                _a.label = 13;
                            case 13:
                                return [2 /*return*/, true];
                            case 14:
                                (0, logger.logDebugMessage)("XHRInterceptor.handleResponse: doFinallyCheck running");
                                return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(false)];
                            case 15:
                                if (!!(_a.sent().status === "EXISTS")) return [3 /*break*/, 18];
                                (0,
                                logger.logDebugMessage)("XHRInterceptor.handleResponse: sIRTFrontend doesn't exist, so removing anti-csrf and sFrontToken");
                                return [4 /*yield*/, fetch$1.AntiCsrfToken.removeToken()];
                            case 16:
                                _a.sent();
                                return [4 /*yield*/, fetch$1.FrontToken.removeToken()];
                            case 17:
                                _a.sent();
                                _a.label = 18;
                            case 18:
                                return [7 /*endfinally*/];
                            case 19:
                                return [3 /*break*/, 24];
                            case 20:
                                err_1 = _a.sent();
                                (0, logger.logDebugMessage)("XHRInterceptor.handleResponse: caught error");
                                if (!(err_1.status !== undefined)) return [3 /*break*/, 22];
                                return [4 /*yield*/, getXMLHttpStatusAndResponseTextFromFetchResponse(err_1)];
                            case 21:
                                resp = _a.sent();
                                customGetterValues["status"] = resp.status;
                                customGetterValues["statusText"] = resp.statusText;
                                customGetterValues["responseType"] = resp.responseType;
                                customResponseHeaders = resp.headers;
                                if (resp.responseType === "json") {
                                    try {
                                        customGetterValues["response"] = JSON.parse(resp.responseText);
                                    } catch (_b) {
                                        customGetterValues["response"] = resp.responseText;
                                    }
                                } else {
                                    customGetterValues["response"] = resp.responseText;
                                }
                                customGetterValues["responseText"] = resp.responseText;
                                return [3 /*break*/, 23];
                            case 22:
                                // Here we only need to handle fetch related errors, from the refresh endpoint called by the retry
                                // So we should only get network level errors here
                                redispatchEvent("error", new Event("error"));
                                _a.label = 23;
                            case 23:
                                return [2 /*return*/, true];
                            case 24:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            self.open = function (_, u) {
                (0, logger.logDebugMessage)("XHRInterceptor.open called");
                var args = arguments;
                listOfFunctionCallsInProxy.push(function (xhr) {
                    xhr.open.apply(xhr, args);
                });
                // method = m;
                url = u;
                try {
                    doNotDoInterception =
                        (typeof url === "string" &&
                            !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                url,
                                fetch$1.default.config.apiDomain,
                                fetch$1.default.config.cookieDomain
                            )) ||
                        (typeof url !== "string" &&
                            !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                                url.toString(),
                                fetch$1.default.config.apiDomain,
                                fetch$1.default.config.cookieDomain
                            ));
                } catch (err) {
                    if (err.message === "Please provide a valid domain name") {
                        (0, logger.logDebugMessage)(
                            "XHRInterceptor.open: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                        );
                        // .origin gives the port as well..
                        doNotDoInterception = !(0, utils$1.shouldDoInterceptionBasedOnUrl)(
                            windowHandler$1.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
                            fetch$1.default.config.apiDomain,
                            fetch$1.default.config.cookieDomain
                        );
                    } else {
                        throw err;
                    }
                }
                // here we use the apply syntax cause there are other optional args that
                // can be passed by the user.
                delayIfNecessary(function () {
                    return actual.open.apply(actual, args);
                });
            };
            self.send = function (inputBody) {
                body = inputBody;
                sendXHR(actual, body);
            };
            self.setRequestHeader = function (name, value) {
                if (doNotDoInterception) {
                    delayIfNecessary(function () {
                        return actual.setRequestHeader(name, value);
                    });
                    return;
                }
                // We need to do this, because if there is another interceptor wrapping this (e.g.: the axios interceptor)
                // then the anti-csrf token they add would be concatenated to the anti-csrf token added by this interceptor
                if (name === "anti-csrf") {
                    return;
                }
                listOfFunctionCallsInProxy.push(function (xhr) {
                    xhr.setRequestHeader(name, value);
                });
                // The original version "combines" headers according to MDN.
                requestHeaders.push({ name: name, value: value });
                delayIfNecessary(function () {
                    return actual.setRequestHeader(name, value);
                });
            };
            var copiedProps = undefined;
            setUpXHR(self, actual, false);
            function setUpXHR(self, xhr, isRetry) {
                var responseProcessed;
                var delayedEvents = ["load", "loadend", "readystatechange"];
                (0, logger.logDebugMessage)("XHRInterceptor.setUpXHR called");
                var _loop_1 = function (name_1) {
                    (0, logger.logDebugMessage)("XHRInterceptor added listener for event ".concat(name_1));
                    xhr.addEventListener(name_1, function (ev) {
                        (0, logger.logDebugMessage)("XHRInterceptor got event ".concat(name_1));
                        if (!delayedEvents.includes(name_1)) {
                            redispatchEvent(name_1, ev);
                        }
                    });
                };
                for (var _i = 0, XHR_EVENTS_1 = XHR_EVENTS; _i < XHR_EVENTS_1.length; _i++) {
                    var name_1 = XHR_EVENTS_1[_i];
                    _loop_1(name_1);
                }
                xhr.onload = function (ev) {
                    if (responseProcessed === undefined) {
                        responseProcessed = handleResponse(xhr);
                    }
                    responseProcessed.then(function (callself) {
                        if (!callself) {
                            return;
                        }
                        if (self.onload) {
                            self.onload(ev);
                        }
                        redispatchEvent("load", ev);
                    });
                };
                xhr.onreadystatechange = function (ev) {
                    // In local files, status is 0 upon success in Mozilla Firefox
                    if (xhr.readyState === oldXMLHttpRequest.DONE) {
                        if (responseProcessed === undefined) {
                            responseProcessed = handleResponse(xhr);
                        }
                        responseProcessed.then(function (callself) {
                            if (!callself) {
                                return;
                            }
                            if (self.onreadystatechange) self.onreadystatechange(ev);
                            redispatchEvent("readystatechange", ev);
                        });
                    } else {
                        if (self.onreadystatechange) {
                            self.onreadystatechange(ev);
                        }
                        redispatchEvent("readystatechange", ev);
                    }
                };
                xhr.onloadend = function (ev) {
                    if (responseProcessed === undefined) {
                        responseProcessed = handleResponse(xhr);
                    }
                    responseProcessed.then(function (callself) {
                        if (!callself) {
                            return;
                        }
                        if (self.onloadend) {
                            self.onloadend(ev);
                        }
                        redispatchEvent("loadend", ev);
                    });
                };
                self.getAllResponseHeaders = function () {
                    var headersString;
                    if (customResponseHeaders) {
                        headersString = "";
                        customResponseHeaders.forEach(function (v, k) {
                            return (headersString += "".concat(k, ": ").concat(v, "\r\n"));
                        });
                    } else {
                        headersString = xhr.getAllResponseHeaders();
                    }
                    // We use this "fake-header" to signal other interceptors (axios) that this is done
                    // in case both is applied
                    return headersString + "x-supertokens-xhr-intercepted: true\r\n";
                };
                self.getResponseHeader = function (name) {
                    if (name === "x-supertokens-xhr-intercepted") {
                        return "true";
                    }
                    if (customResponseHeaders) {
                        return customResponseHeaders.get(name);
                    }
                    return xhr.getResponseHeader(name);
                };
                if (copiedProps === undefined) {
                    copiedProps = [];
                    // iterate all properties in actual to proxy them according to their type
                    // For functions, we call actual and return the result
                    // For non-functions, we make getters/setters
                    // If the property already exists on self, then don't proxy it
                    for (var prop in xhr) {
                        // skip properties we already have - this will skip both the above defined properties
                        // that we don't want to proxy and skip properties on the prototype belonging to Object
                        if (!(prop in self)) {
                            // We save these props into an array - in case we need to set up a retry XHR
                            copiedProps.push(prop);
                        }
                    }
                }
                var _loop_2 = function (prop) {
                    if (typeof xhr[prop] === "function") {
                        // define our own property that calls the same method on the actual
                        Object.defineProperty(self, prop, {
                            configurable: true,
                            value: function () {
                                var args = arguments;
                                if (!isRetry) {
                                    listOfFunctionCallsInProxy.push(function (xhr) {
                                        xhr[prop].apply(xhr, args);
                                    });
                                }
                                return xhr[prop].apply(xhr, args);
                            },
                        });
                    } else {
                        // define our own property that just gets or sets the same prop on the actual
                        Object.defineProperty(self, prop, {
                            configurable: true,
                            get: function () {
                                if (customGetterValues[prop] !== undefined) {
                                    return customGetterValues[prop];
                                }
                                return xhr[prop];
                            },
                            set: function (val) {
                                if (!isRetry) {
                                    listOfFunctionCallsInProxy.push(function (xhr) {
                                        xhr[prop] = val;
                                    });
                                }
                                (0, logger.logDebugMessage)("XHRInterceptor.set[".concat(prop, "] = ").concat(val));
                                xhr[prop] = val;
                            },
                        });
                    }
                };
                for (var _a = 0, copiedProps_1 = copiedProps; _a < copiedProps_1.length; _a++) {
                    var prop = copiedProps_1[_a];
                    _loop_2(prop);
                }
            }
            function sendXHR(xhr, body) {
                var _this = this;
                (0, logger.logDebugMessage)("XHRInterceptor.send: called");
                (0, logger.logDebugMessage)(
                    "XHRInterceptor.send: Value of doNotDoInterception: " + doNotDoInterception
                );
                if (doNotDoInterception) {
                    (0, logger.logDebugMessage)("XHRInterceptor.send: Returning without interception");
                    delayIfNecessary(function () {
                        return xhr.send(body);
                    });
                    return;
                }
                (0, logger.logDebugMessage)("XHRInterceptor.send: Interception started");
                processState.ProcessState.getInstance().addState(
                    processState.PROCESS_STATE.CALLING_INTERCEPTION_REQUEST
                );
                delayIfNecessary(function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        var antiCsrfToken;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                                case 1:
                                    preRequestIdToken = _a.sent();
                                    if (!(preRequestIdToken.status === "EXISTS")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, fetch$1.AntiCsrfToken.getToken(preRequestIdToken.token)];
                                case 2:
                                    antiCsrfToken = _a.sent();
                                    if (antiCsrfToken !== undefined) {
                                        (0, logger.logDebugMessage)(
                                            "XHRInterceptor.send: Adding anti-csrf token to request"
                                        );
                                        xhr.setRequestHeader("anti-csrf", antiCsrfToken);
                                    }
                                    _a.label = 3;
                                case 3:
                                    if (fetch$1.default.config.autoAddCredentials) {
                                        (0, logger.logDebugMessage)("XHRInterceptor.send: Adding credentials include");
                                        self.withCredentials = true;
                                    }
                                    if (
                                        !requestHeaders.some(function (i) {
                                            return i.name === "rid";
                                        })
                                    ) {
                                        (0, logger.logDebugMessage)(
                                            "XHRInterceptor.send: Adding rid header: anti-csrf"
                                        );
                                        xhr.setRequestHeader("rid", "anti-csrf");
                                    } else {
                                        (0, logger.logDebugMessage)(
                                            "XHRInterceptor.send: rid header was already there in request"
                                        );
                                    }
                                    (0, logger.logDebugMessage)("XHRInterceptor.send: Making user's http call");
                                    return [2 /*return*/, xhr.send(body)];
                            }
                        });
                    });
                });
            }
        };
        XMLHttpRequest.__original = oldXMLHttpRequest;
    }
    exports.addInterceptorsToXMLHttpRequest = addInterceptorsToXMLHttpRequest;
    function getXMLHttpStatusAndResponseTextFromFetchResponse(response) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, data, responseType, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        contentType = response.headers.get("content-type");
                        data = "";
                        responseType = "text";
                        if (!(contentType === null)) return [3 /*break*/, 5];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response.text()];
                    case 2:
                        data = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _d.sent();
                        data = "";
                        return [3 /*break*/, 4];
                    case 4:
                        return [3 /*break*/, 9];
                    case 5:
                        if (!contentType.includes("application/json")) return [3 /*break*/, 7];
                        responseType = "json";
                        _c = (_b = JSON).stringify;
                        return [4 /*yield*/, response.json()];
                    case 6:
                        data = _c.apply(_b, [_d.sent()]);
                        return [3 /*break*/, 9];
                    case 7:
                        if (!contentType.includes("text/")) return [3 /*break*/, 9];
                        return [4 /*yield*/, response.text()];
                    case 8:
                        data = _d.sent();
                        _d.label = 9;
                    case 9:
                        return [
                            2 /*return*/,
                            {
                                status: response.status,
                                responseText: data,
                                statusText: response.statusText,
                                responseType: responseType,
                                headers: response.headers,
                            },
                        ];
                }
            });
        });
    }
});

unwrapExports(xmlhttprequest);
xmlhttprequest.addInterceptorsToXMLHttpRequest;

var recipeImplementation = createCommonjsModule(function (module, exports) {
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });

    function RecipeImplementation(recipeImplInput) {
        return {
            addXMLHttpRequestInterceptor: function (_) {
                (0, logger.logDebugMessage)("addXMLHttpRequestInterceptorAndReturnModified: called");
                (0, xmlhttprequest.addInterceptorsToXMLHttpRequest)();
            },
            addFetchInterceptorsAndReturnModifiedFetch: function (input) {
                (0, logger.logDebugMessage)("addFetchInterceptorsAndReturnModifiedFetch: called");
                return function (url, config) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        fetch$1.default.doRequest(
                                            function (config) {
                                                return input.originalFetch(
                                                    typeof url === "string" ? url : url.clone(),
                                                    __assign({}, config)
                                                );
                                            },
                                            config,
                                            url
                                        ),
                                    ];
                                case 1:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
            },
            addAxiosInterceptors: function (input) {
                (0, logger.logDebugMessage)("addAxiosInterceptors: called");
                // we first check if this axiosInstance already has our interceptors.
                var requestInterceptors = input.axiosInstance.interceptors.request;
                for (var i = 0; i < requestInterceptors.handlers.length; i++) {
                    if (requestInterceptors.handlers[i].fulfilled === axios.interceptorFunctionRequestFulfilled) {
                        (0, logger.logDebugMessage)(
                            "addAxiosInterceptors: not adding because already added on this instance"
                        );
                        return;
                    }
                }
                // Add a request interceptor
                input.axiosInstance.interceptors.request.use(
                    axios.interceptorFunctionRequestFulfilled,
                    function (error) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                throw error;
                            });
                        });
                    }
                );
                // Add a response interceptor
                input.axiosInstance.interceptors.response.use(
                    (0, axios.responseInterceptor)(input.axiosInstance),
                    (0, axios.responseErrorInterceptor)(input.axiosInstance)
                );
            },
            getUserId: function (_) {
                return __awaiter(this, void 0, void 0, function () {
                    var tokenInfo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                (0, logger.logDebugMessage)("getUserId: called");
                                return [4 /*yield*/, fetch$1.FrontToken.getTokenInfo()];
                            case 1:
                                tokenInfo = _a.sent();
                                if (tokenInfo === undefined) {
                                    throw new Error("No session exists");
                                }
                                (0, logger.logDebugMessage)("getUserId: returning: " + tokenInfo.uid);
                                return [2 /*return*/, tokenInfo.uid];
                        }
                    });
                });
            },
            getAccessTokenPayloadSecurely: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var tokenInfo, retry;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                (0, logger.logDebugMessage)("getAccessTokenPayloadSecurely: called");
                                return [4 /*yield*/, fetch$1.FrontToken.getTokenInfo()];
                            case 1:
                                tokenInfo = _a.sent();
                                if (tokenInfo === undefined) {
                                    throw new Error("No session exists");
                                }
                                if (!(tokenInfo.ate < Date.now())) return [3 /*break*/, 5];
                                (0,
                                logger.logDebugMessage)("getAccessTokenPayloadSecurely: access token expired. Refreshing session");
                                return [4 /*yield*/, fetch$1.default.attemptRefreshingSession()];
                            case 2:
                                retry = _a.sent();
                                if (!retry) return [3 /*break*/, 4];
                                return [
                                    4 /*yield*/,
                                    this.getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 3:
                                return [2 /*return*/, _a.sent()];
                            case 4:
                                throw new Error("Could not refresh session");
                            case 5:
                                (0,
                                logger.logDebugMessage)("getAccessTokenPayloadSecurely: returning: " + JSON.stringify(tokenInfo.up));
                                return [2 /*return*/, tokenInfo.up];
                        }
                    });
                });
            },
            doesSessionExist: function (_) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                (0, logger.logDebugMessage)("doesSessionExist: called");
                                return [4 /*yield*/, (0, fetch$1.getIdRefreshToken)(true)];
                            case 1:
                                return [2 /*return*/, _a.sent().status === "EXISTS"];
                        }
                    });
                });
            },
            signOut: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var preAPIResult, resp, responseJson, message;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                (0, logger.logDebugMessage)("signOut: called");
                                return [4 /*yield*/, this.doesSessionExist(input)];
                            case 1:
                                if (!_a.sent()) {
                                    (0, logger.logDebugMessage)(
                                        "signOut: existing early because session does not exist"
                                    );
                                    (0, logger.logDebugMessage)("signOut: firing SIGN_OUT event");
                                    recipeImplInput.onHandleEvent({
                                        action: "SIGN_OUT",
                                        userContext: input.userContext,
                                    });
                                    return [2 /*return*/];
                                }
                                (0, logger.logDebugMessage)("signOut: Calling refresh pre API hook");
                                return [
                                    4 /*yield*/,
                                    recipeImplInput.preAPIHook({
                                        action: "SIGN_OUT",
                                        requestInit: {
                                            method: "post",
                                            headers: {
                                                "fdi-version": version.supported_fdi.join(","),
                                                rid: fetch$1.default.rid,
                                            },
                                        },
                                        url: fetch$1.default.signOutUrl,
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 2:
                                preAPIResult = _a.sent();
                                (0, logger.logDebugMessage)("signOut: Calling API");
                                return [4 /*yield*/, fetch(preAPIResult.url, preAPIResult.requestInit)];
                            case 3:
                                resp = _a.sent();
                                (0, logger.logDebugMessage)("signOut: API ended");
                                (0, logger.logDebugMessage)("signOut: API responded with status code: " + resp.status);
                                if (resp.status === recipeImplInput.sessionExpiredStatusCode) {
                                    // refresh must have already sent session expiry event
                                    return [2 /*return*/];
                                }
                                if (resp.status >= 300) {
                                    throw resp;
                                }
                                return [
                                    4 /*yield*/,
                                    recipeImplInput.postAPIHook({
                                        action: "SIGN_OUT",
                                        requestInit: preAPIResult.requestInit,
                                        url: preAPIResult.url,
                                        fetchResponse: resp.clone(),
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, resp.clone().json()];
                            case 5:
                                responseJson = _a.sent();
                                if (responseJson.status === "GENERAL_ERROR") {
                                    (0, logger.logDebugMessage)("doRequest: Throwing general error");
                                    message =
                                        responseJson.message === undefined
                                            ? "No Error Message Provided"
                                            : responseJson.message;
                                    throw new error.STGeneralError(message);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            getInvalidClaimsFromResponse: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var body;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!("body" in input.response)) return [3 /*break*/, 2];
                                return [4 /*yield*/, input.response.clone().json()];
                            case 1:
                                body = _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                if (typeof input.response.data === "string") {
                                    body = JSON.parse(input.response.data);
                                } else {
                                    body = input.response.data;
                                }
                                _a.label = 3;
                            case 3:
                                return [2 /*return*/, body.claimValidationErrors];
                        }
                    });
                });
            },
            getGlobalClaimValidators: function (input) {
                return input.claimValidatorsAddedByOtherRecipes;
            },
            validateClaims: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var accessTokenPayload, _i, _a, validator, err_1, errors, _b, _c, validator, validationRes;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    this.getAccessTokenPayloadSecurely({ userContext: input.userContext }),
                                ];
                            case 1:
                                accessTokenPayload = _d.sent();
                                (_i = 0), (_a = input.claimValidators);
                                _d.label = 2;
                            case 2:
                                if (!(_i < _a.length)) return [3 /*break*/, 10];
                                validator = _a[_i];
                                return [4 /*yield*/, validator.shouldRefresh(accessTokenPayload, input.userContext)];
                            case 3:
                                if (!_d.sent()) return [3 /*break*/, 9];
                                _d.label = 4;
                            case 4:
                                _d.trys.push([4, 6, , 7]);
                                return [4 /*yield*/, validator.refresh(input.userContext)];
                            case 5:
                                _d.sent();
                                return [3 /*break*/, 7];
                            case 6:
                                err_1 = _d.sent();
                                console.error(
                                    "Encountered an error while refreshing validator ".concat(validator.id),
                                    err_1
                                );
                                return [3 /*break*/, 7];
                            case 7:
                                return [
                                    4 /*yield*/,
                                    this.getAccessTokenPayloadSecurely({ userContext: input.userContext }),
                                ];
                            case 8:
                                accessTokenPayload = _d.sent();
                                _d.label = 9;
                            case 9:
                                _i++;
                                return [3 /*break*/, 2];
                            case 10:
                                errors = [];
                                (_b = 0), (_c = input.claimValidators);
                                _d.label = 11;
                            case 11:
                                if (!(_b < _c.length)) return [3 /*break*/, 14];
                                validator = _c[_b];
                                return [4 /*yield*/, validator.validate(accessTokenPayload, input.userContext)];
                            case 12:
                                validationRes = _d.sent();
                                if (!validationRes.isValid) {
                                    errors.push({
                                        validatorId: validator.id,
                                        reason: validationRes.reason,
                                    });
                                }
                                _d.label = 13;
                            case 13:
                                _b++;
                                return [3 /*break*/, 11];
                            case 14:
                                return [2 /*return*/, errors];
                        }
                    });
                });
            },
        };
    }
    exports.default = RecipeImplementation;
});

unwrapExports(recipeImplementation);

var getProxyObject_1 = createCommonjsModule(function (module, exports) {
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProxyObject = void 0;
    function getProxyObject(orig) {
        var ret = __assign(__assign({}, orig), {
            _call: function (_, __) {
                throw new Error("This function should only be called through the recipe object");
            },
        });
        var keys = Object.keys(ret);
        var _loop_1 = function (k) {
            if (k !== "_call") {
                ret[k] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return this._call(k, args);
                };
            }
        };
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            _loop_1(k);
        }
        return ret;
    }
    exports.getProxyObject = getProxyObject;
});

unwrapExports(getProxyObject_1);
getProxyObject_1.getProxyObject;

var build$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OverrideableBuilder = void 0;

    var OverrideableBuilder = /** @class */ (function () {
        function OverrideableBuilder(originalImplementation) {
            this.layers = [originalImplementation];
            this.proxies = [];
        }
        OverrideableBuilder.prototype.override = function (overrideFunc) {
            var proxy = (0, getProxyObject_1.getProxyObject)(this.layers[0]);
            var layer = overrideFunc(proxy, this);
            for (var _i = 0, _a = Object.keys(this.layers[0]); _i < _a.length; _i++) {
                var key = _a[_i];
                if (layer[key] === proxy[key] || key === "_call") {
                    delete layer[key];
                } else if (layer[key] === undefined) {
                    layer[key] = null;
                }
            }
            this.layers.push(layer);
            this.proxies.push(proxy);
            return this;
        };
        OverrideableBuilder.prototype.build = function () {
            var _this = this;
            if (this.result) {
                return this.result;
            }
            this.result = {};
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                for (var _b = 0, _c = Object.keys(layer); _b < _c.length; _b++) {
                    var key = _c[_b];
                    var override = layer[key];
                    if (override !== undefined) {
                        if (override === null) {
                            this.result[key] = undefined;
                        } else if (typeof override === "function") {
                            this.result[key] = override.bind(this.result);
                        } else {
                            this.result[key] = override;
                        }
                    }
                }
            }
            var _loop_1 = function (proxyInd) {
                var proxy = this_1.proxies[proxyInd];
                proxy._call = function (fname, args) {
                    for (var i = proxyInd; i >= 0; --i) {
                        var func = _this.layers[i][fname];
                        if (func !== undefined && func !== null) {
                            return func.bind(_this.result).apply(void 0, args);
                        }
                    }
                };
            };
            var this_1 = this;
            for (var proxyInd = 0; proxyInd < this.proxies.length; ++proxyInd) {
                _loop_1(proxyInd);
            }
            return this.result;
        };
        return OverrideableBuilder;
    })();
    exports.OverrideableBuilder = OverrideableBuilder;
    exports.default = OverrideableBuilder;
});

var OverrideableBuilder = unwrapExports(build$1);
build$1.OverrideableBuilder;

var sessionClaimValidatorStore = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SessionClaimValidatorStore = void 0;
    var SessionClaimValidatorStore = /** @class */ (function () {
        function SessionClaimValidatorStore() {}
        SessionClaimValidatorStore.claimValidatorsAddedByOtherRecipes = [];
        SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe = function (builder) {
            SessionClaimValidatorStore.claimValidatorsAddedByOtherRecipes.push(builder);
        };
        SessionClaimValidatorStore.getClaimValidatorsAddedByOtherRecipes = function () {
            return SessionClaimValidatorStore.claimValidatorsAddedByOtherRecipes;
        };
        return SessionClaimValidatorStore;
    })();
    exports.SessionClaimValidatorStore = SessionClaimValidatorStore;
    exports.default = SessionClaimValidatorStore;
});

unwrapExports(sessionClaimValidatorStore);
var sessionClaimValidatorStore_1 = sessionClaimValidatorStore.SessionClaimValidatorStore;

var types = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SessionClaimValidator = void 0;
    var SessionClaimValidator = /** @class */ (function () {
        function SessionClaimValidator(id) {
            this.id = id;
        }
        return SessionClaimValidator;
    })();
    exports.SessionClaimValidator = SessionClaimValidator;
});

unwrapExports(types);
types.SessionClaimValidator;

var primitiveClaim = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrimitiveClaim = void 0;
    var PrimitiveClaim = /** @class */ (function () {
        function PrimitiveClaim(config) {
            var _this = this;
            this.validators = {
                hasValue: function (val, maxAgeInSeconds, id) {
                    if (maxAgeInSeconds === void 0) {
                        maxAgeInSeconds = _this.defaultMaxAgeInSeconds;
                    }
                    return {
                        id: id !== undefined ? id : _this.id,
                        refresh: function (ctx) {
                            return _this.refresh(ctx);
                        },
                        shouldRefresh: function (payload, ctx) {
                            return (
                                _this.getValueFromPayload(payload, ctx) === undefined ||
                                // We know payload[this.id] is defined since the value is not undefined in this branch
                                (maxAgeInSeconds !== undefined &&
                                    payload[_this.id].t < Date.now() - maxAgeInSeconds * 1000)
                            );
                        },
                        validate: function (payload, ctx) {
                            var claimVal = _this.getValueFromPayload(payload, ctx);
                            if (claimVal === undefined) {
                                return {
                                    isValid: false,
                                    reason: {
                                        message: "value does not exist",
                                        expectedValue: val,
                                        actualValue: claimVal,
                                    },
                                };
                            }
                            var ageInSeconds = (Date.now() - _this.getLastFetchedTime(payload, ctx)) / 1000;
                            if (maxAgeInSeconds !== undefined && ageInSeconds > maxAgeInSeconds) {
                                return {
                                    isValid: false,
                                    reason: {
                                        message: "expired",
                                        ageInSeconds: ageInSeconds,
                                        maxAgeInSeconds: maxAgeInSeconds,
                                    },
                                };
                            }
                            if (claimVal !== val) {
                                return {
                                    isValid: false,
                                    reason: { message: "wrong value", expectedValue: val, actualValue: claimVal },
                                };
                            }
                            return { isValid: true };
                        },
                    };
                },
            };
            this.id = config.id;
            this.refresh = config.refresh;
            this.defaultMaxAgeInSeconds = config.defaultMaxAgeInSeconds;
        }
        PrimitiveClaim.prototype.getValueFromPayload = function (payload, _userContext) {
            return payload[this.id] !== undefined ? payload[this.id].v : undefined;
        };
        PrimitiveClaim.prototype.getLastFetchedTime = function (payload, _userContext) {
            return payload[this.id] !== undefined ? payload[this.id].t : undefined;
        };
        return PrimitiveClaim;
    })();
    exports.PrimitiveClaim = PrimitiveClaim;
});

unwrapExports(primitiveClaim);
primitiveClaim.PrimitiveClaim;

var primitiveArrayClaim = createCommonjsModule(function (module, exports) {
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrimitiveArrayClaim = void 0;
    var PrimitiveArrayClaim = /** @class */ (function () {
        function PrimitiveArrayClaim(config) {
            var _this = this;
            this.validators = {
                includes: function (val, maxAgeInSeconds, id) {
                    if (maxAgeInSeconds === void 0) {
                        maxAgeInSeconds = _this.defaultMaxAgeInSeconds;
                    }
                    return {
                        id: id !== undefined ? id : _this.id,
                        refresh: function (ctx) {
                            return _this.refresh(ctx);
                        },
                        shouldRefresh: function (payload, ctx) {
                            return (
                                _this.getValueFromPayload(payload, ctx) === undefined ||
                                // We know payload[this.id] is defined since the value is not undefined in this branch
                                (maxAgeInSeconds !== undefined &&
                                    payload[_this.id].t < Date.now() - maxAgeInSeconds * 1000)
                            );
                        },
                        validate: function (payload, ctx) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var claimVal, ageInSeconds;
                                return __generator(this, function (_a) {
                                    claimVal = this.getValueFromPayload(payload, ctx);
                                    if (claimVal === undefined) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "value does not exist",
                                                    expectedToInclude: val,
                                                    actualValue: claimVal,
                                                },
                                            },
                                        ];
                                    }
                                    ageInSeconds = (Date.now() - this.getLastFetchedTime(payload, ctx)) / 1000;
                                    if (maxAgeInSeconds !== undefined && ageInSeconds > maxAgeInSeconds) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "expired",
                                                    ageInSeconds: ageInSeconds,
                                                    maxAgeInSeconds: maxAgeInSeconds,
                                                },
                                            },
                                        ];
                                    }
                                    if (!claimVal.includes(val)) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "wrong value",
                                                    expectedToInclude: val,
                                                    actualValue: claimVal,
                                                },
                                            },
                                        ];
                                    }
                                    return [2 /*return*/, { isValid: true }];
                                });
                            });
                        },
                    };
                },
                excludes: function (val, maxAgeInSeconds, id) {
                    if (maxAgeInSeconds === void 0) {
                        maxAgeInSeconds = _this.defaultMaxAgeInSeconds;
                    }
                    return {
                        id: id !== undefined ? id : _this.id,
                        refresh: function (ctx) {
                            return _this.refresh(ctx);
                        },
                        shouldRefresh: function (payload, ctx) {
                            return (
                                _this.getValueFromPayload(payload, ctx) === undefined ||
                                // We know payload[this.id] is defined since the value is not undefined in this branch
                                (maxAgeInSeconds !== undefined &&
                                    payload[_this.id].t < Date.now() - maxAgeInSeconds * 1000)
                            );
                        },
                        validate: function (payload, ctx) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var claimVal, ageInSeconds;
                                return __generator(this, function (_a) {
                                    claimVal = this.getValueFromPayload(payload, ctx);
                                    if (claimVal === undefined) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "value does not exist",
                                                    expectedToNotInclude: val,
                                                    actualValue: claimVal,
                                                },
                                            },
                                        ];
                                    }
                                    ageInSeconds = (Date.now() - this.getLastFetchedTime(payload, ctx)) / 1000;
                                    if (maxAgeInSeconds !== undefined && ageInSeconds > maxAgeInSeconds) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "expired",
                                                    ageInSeconds: ageInSeconds,
                                                    maxAgeInSeconds: maxAgeInSeconds,
                                                },
                                            },
                                        ];
                                    }
                                    if (claimVal.includes(val)) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "wrong value",
                                                    expectedToNotInclude: val,
                                                    actualValue: claimVal,
                                                },
                                            },
                                        ];
                                    }
                                    return [2 /*return*/, { isValid: true }];
                                });
                            });
                        },
                    };
                },
                includesAll: function (val, maxAgeInSeconds, id) {
                    if (maxAgeInSeconds === void 0) {
                        maxAgeInSeconds = _this.defaultMaxAgeInSeconds;
                    }
                    return {
                        id: id !== undefined ? id : _this.id,
                        refresh: function (ctx) {
                            return _this.refresh(ctx);
                        },
                        shouldRefresh: function (payload, ctx) {
                            return (
                                _this.getValueFromPayload(payload, ctx) === undefined ||
                                // We know payload[this.id] is defined since the value is not undefined in this branch
                                (maxAgeInSeconds !== undefined &&
                                    payload[_this.id].t < Date.now() - maxAgeInSeconds * 1000)
                            );
                        },
                        validate: function (payload, ctx) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var claimVal, ageInSeconds, claimSet, isValid;
                                return __generator(this, function (_a) {
                                    claimVal = this.getValueFromPayload(payload, ctx);
                                    if (claimVal === undefined) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "value does not exist",
                                                    expectedToInclude: val,
                                                    actualValue: claimVal,
                                                },
                                            },
                                        ];
                                    }
                                    ageInSeconds = (Date.now() - this.getLastFetchedTime(payload, ctx)) / 1000;
                                    if (maxAgeInSeconds !== undefined && ageInSeconds > maxAgeInSeconds) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "expired",
                                                    ageInSeconds: ageInSeconds,
                                                    maxAgeInSeconds: maxAgeInSeconds,
                                                },
                                            },
                                        ];
                                    }
                                    claimSet = new Set(claimVal);
                                    isValid = val.every(function (v) {
                                        return claimSet.has(v);
                                    });
                                    return [
                                        2 /*return*/,
                                        isValid
                                            ? { isValid: isValid }
                                            : {
                                                  isValid: isValid,
                                                  reason: {
                                                      message: "wrong value",
                                                      expectedToInclude: val,
                                                      actualValue: claimVal,
                                                  },
                                              },
                                    ];
                                });
                            });
                        },
                    };
                },
                excludesAll: function (val, maxAgeInSeconds, id) {
                    if (maxAgeInSeconds === void 0) {
                        maxAgeInSeconds = _this.defaultMaxAgeInSeconds;
                    }
                    return {
                        id: id !== undefined ? id : _this.id,
                        refresh: function (ctx) {
                            return _this.refresh(ctx);
                        },
                        shouldRefresh: function (payload, ctx) {
                            return (
                                _this.getValueFromPayload(payload, ctx) === undefined ||
                                // We know payload[this.id] is defined since the value is not undefined in this branch
                                (maxAgeInSeconds !== undefined &&
                                    payload[_this.id].t < Date.now() - maxAgeInSeconds * 1000)
                            );
                        },
                        validate: function (payload, ctx) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var claimVal, ageInSeconds, claimSet, isValid;
                                return __generator(this, function (_a) {
                                    claimVal = this.getValueFromPayload(payload, ctx);
                                    if (claimVal === undefined) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "value does not exist",
                                                    expectedToNotInclude: val,
                                                    actualValue: claimVal,
                                                },
                                            },
                                        ];
                                    }
                                    ageInSeconds = (Date.now() - this.getLastFetchedTime(payload, ctx)) / 1000;
                                    if (maxAgeInSeconds !== undefined && ageInSeconds > maxAgeInSeconds) {
                                        return [
                                            2 /*return*/,
                                            {
                                                isValid: false,
                                                reason: {
                                                    message: "expired",
                                                    ageInSeconds: ageInSeconds,
                                                    maxAgeInSeconds: maxAgeInSeconds,
                                                },
                                            },
                                        ];
                                    }
                                    claimSet = new Set(claimVal);
                                    isValid = val.every(function (v) {
                                        return !claimSet.has(v);
                                    });
                                    return [
                                        2 /*return*/,
                                        isValid
                                            ? { isValid: isValid }
                                            : {
                                                  isValid: isValid,
                                                  reason: {
                                                      message: "wrong value",
                                                      expectedToNotInclude: val,
                                                      actualValue: claimVal,
                                                  },
                                              },
                                    ];
                                });
                            });
                        },
                    };
                },
            };
            this.id = config.id;
            this.refresh = config.refresh;
            this.defaultMaxAgeInSeconds = config.defaultMaxAgeInSeconds;
        }
        PrimitiveArrayClaim.prototype.getValueFromPayload = function (payload, _userContext) {
            return payload[this.id] !== undefined ? payload[this.id].v : undefined;
        };
        PrimitiveArrayClaim.prototype.getLastFetchedTime = function (payload, _userContext) {
            return payload[this.id] !== undefined ? payload[this.id].t : undefined;
        };
        return PrimitiveArrayClaim;
    })();
    exports.PrimitiveArrayClaim = PrimitiveArrayClaim;
});

unwrapExports(primitiveArrayClaim);
primitiveArrayClaim.PrimitiveArrayClaim;

var booleanClaim = createCommonjsModule(function (module, exports) {
    var __extends =
        (commonjsGlobal && commonjsGlobal.__extends) ||
        (function () {
            var extendStatics = function (d, b) {
                extendStatics =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function (d, b) {
                            d.__proto__ = b;
                        }) ||
                    function (d, b) {
                        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
            };
        })();
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BooleanClaim = void 0;

    var BooleanClaim = /** @class */ (function (_super) {
        __extends(BooleanClaim, _super);
        function BooleanClaim(config) {
            var _this = _super.call(this, config) || this;
            _this.validators = __assign(__assign({}, _this.validators), {
                isTrue: function (maxAge) {
                    return _this.validators.hasValue(true, maxAge);
                },
                isFalse: function (maxAge) {
                    return _this.validators.hasValue(false, maxAge);
                },
            });
            return _this;
        }
        return BooleanClaim;
    })(primitiveClaim.PrimitiveClaim);
    exports.BooleanClaim = BooleanClaim;
});

unwrapExports(booleanClaim);
booleanClaim.BooleanClaim;

var build = createCommonjsModule(function (module, exports) {
    /* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BooleanClaim =
        exports.PrimitiveArrayClaim =
        exports.PrimitiveClaim =
        exports.SessionClaimValidator =
        exports.getInvalidClaimsFromResponse =
        exports.getClaimValue =
        exports.validateClaims =
        exports.signOut =
        exports.addAxiosInterceptors =
        exports.doesSessionExist =
        exports.attemptRefreshingSession =
        exports.getAccessTokenPayloadSecurely =
        exports.getUserId =
        exports.init =
            void 0;

    var AuthHttpRequest = /** @class */ (function () {
        function AuthHttpRequest() {}
        AuthHttpRequest.init = function (options) {
            cookieHandler.default.init(options.cookieHandler);
            windowHandler$1.default.init(options.windowHandler);
            var config = (0, utils$1.validateAndNormaliseInputOrThrowError)(options);
            var recipeImpl = new build$1.default(
                (0, recipeImplementation.default)({
                    onHandleEvent: config.onHandleEvent,
                    preAPIHook: config.preAPIHook,
                    postAPIHook: config.postAPIHook,
                    sessionExpiredStatusCode: config.sessionExpiredStatusCode,
                })
            )
                .override(config.override.functions)
                .build();
            fetch$1.default.init(config, recipeImpl);
            AuthHttpRequest.axiosInterceptorQueue.forEach(function (f) {
                f();
            });
            AuthHttpRequest.axiosInterceptorQueue = [];
        };
        AuthHttpRequest.getUserId = function (input) {
            return fetch$1.default.recipeImpl.getUserId({
                userContext: (0, utils$1.getNormalisedUserContext)(input === undefined ? undefined : input.userContext),
            });
        };
        AuthHttpRequest.getAccessTokenPayloadSecurely = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [
                        2 /*return*/,
                        fetch$1.default.recipeImpl.getAccessTokenPayloadSecurely({
                            userContext: (0, utils$1.getNormalisedUserContext)(
                                input === undefined ? undefined : input.userContext
                            ),
                        }),
                    ];
                });
            });
        };
        var _a;
        _a = AuthHttpRequest;
        AuthHttpRequest.axiosInterceptorQueue = [];
        AuthHttpRequest.attemptRefreshingSession = function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(_a, function (_b) {
                    return [2 /*return*/, fetch$1.default.attemptRefreshingSession()];
                });
            });
        };
        AuthHttpRequest.doesSessionExist = function (input) {
            return fetch$1.default.recipeImpl.doesSessionExist({
                userContext: (0, utils$1.getNormalisedUserContext)(input === undefined ? undefined : input.userContext),
            });
        };
        /**
         * @deprecated
         */
        AuthHttpRequest.addAxiosInterceptors = function (axiosInstance, userContext) {
            if (!fetch$1.default.initCalled) {
                // the recipe implementation has not been initialised yet, so add
                // this to the queue and wait for it to be initialised, and then on
                // init call, we add all the interceptors.
                AuthHttpRequest.axiosInterceptorQueue.push(function () {
                    fetch$1.default.recipeImpl.addAxiosInterceptors({
                        axiosInstance: axiosInstance,
                        userContext: (0, utils$1.getNormalisedUserContext)(userContext),
                    });
                });
            } else {
                fetch$1.default.recipeImpl.addAxiosInterceptors({
                    axiosInstance: axiosInstance,
                    userContext: (0, utils$1.getNormalisedUserContext)(userContext),
                });
            }
        };
        AuthHttpRequest.signOut = function (input) {
            return fetch$1.default.recipeImpl.signOut({
                userContext: (0, utils$1.getNormalisedUserContext)(input === undefined ? undefined : input.userContext),
            });
        };
        AuthHttpRequest.getInvalidClaimsFromResponse = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [
                        2 /*return*/,
                        fetch$1.default.recipeImpl.getInvalidClaimsFromResponse({
                            response: input.response,
                            userContext: (0, utils$1.getNormalisedUserContext)(input.userContext),
                        }),
                    ];
                });
            });
        };
        AuthHttpRequest.getClaimValue = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var userContext, accessTokenPayload;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userContext = (0, utils$1.getNormalisedUserContext)(
                                input === undefined ? undefined : input.userContext
                            );
                            return [
                                4 /*yield*/,
                                AuthHttpRequest.getAccessTokenPayloadSecurely({ userContext: userContext }),
                            ];
                        case 1:
                            accessTokenPayload = _b.sent();
                            return [2 /*return*/, input.claim.getValueFromPayload(accessTokenPayload, userContext)];
                    }
                });
            });
        };
        AuthHttpRequest.validateClaims = function (overrideGlobalClaimValidators, userContext) {
            var normalisedUserContext = (0, utils$1.getNormalisedUserContext)(userContext);
            var claimValidatorsAddedByOtherRecipes =
                sessionClaimValidatorStore.SessionClaimValidatorStore.getClaimValidatorsAddedByOtherRecipes();
            var globalClaimValidators = fetch$1.default.recipeImpl.getGlobalClaimValidators({
                claimValidatorsAddedByOtherRecipes: claimValidatorsAddedByOtherRecipes,
                userContext: normalisedUserContext,
            });
            var claimValidators =
                overrideGlobalClaimValidators !== undefined
                    ? overrideGlobalClaimValidators(globalClaimValidators, normalisedUserContext)
                    : globalClaimValidators;
            if (claimValidators.length === 0) {
                return [];
            }
            return fetch$1.default.recipeImpl.validateClaims({
                claimValidators: claimValidators,
                userContext: (0, utils$1.getNormalisedUserContext)(userContext),
            });
        };
        return AuthHttpRequest;
    })();
    exports.default = AuthHttpRequest;
    exports.init = AuthHttpRequest.init;
    exports.getUserId = AuthHttpRequest.getUserId;
    exports.getAccessTokenPayloadSecurely = AuthHttpRequest.getAccessTokenPayloadSecurely;
    exports.attemptRefreshingSession = AuthHttpRequest.attemptRefreshingSession;
    exports.doesSessionExist = AuthHttpRequest.doesSessionExist;
    /**
     * @deprecated
     */
    exports.addAxiosInterceptors = AuthHttpRequest.addAxiosInterceptors;
    exports.signOut = AuthHttpRequest.signOut;
    exports.validateClaims = AuthHttpRequest.validateClaims;
    exports.getClaimValue = AuthHttpRequest.getClaimValue;
    exports.getInvalidClaimsFromResponse = AuthHttpRequest.getInvalidClaimsFromResponse;

    Object.defineProperty(exports, "SessionClaimValidator", {
        enumerable: true,
        get: function () {
            return types.SessionClaimValidator;
        },
    });

    Object.defineProperty(exports, "PrimitiveClaim", {
        enumerable: true,
        get: function () {
            return primitiveClaim.PrimitiveClaim;
        },
    });

    Object.defineProperty(exports, "PrimitiveArrayClaim", {
        enumerable: true,
        get: function () {
            return primitiveArrayClaim.PrimitiveArrayClaim;
        },
    });

    Object.defineProperty(exports, "BooleanClaim", {
        enumerable: true,
        get: function () {
            return booleanClaim.BooleanClaim;
        },
    });
});

unwrapExports(build);
build.BooleanClaim;
build.PrimitiveArrayClaim;
build.PrimitiveClaim;
var build_4 = build.SessionClaimValidator;
build.getInvalidClaimsFromResponse;
build.getClaimValue;
build.validateClaims;
build.signOut;
build.addAxiosInterceptors;
build.doesSessionExist;
build.attemptRefreshingSession;
build.getAccessTokenPayloadSecurely;
build.getUserId;
build.init;

var supertokensWebsite = createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(build);
});

unwrapExports(supertokensWebsite);

var windowHandler = createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(windowHandler$1);
});

unwrapExports(windowHandler);

var constants = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SSR_ERROR = exports.DEFAULT_API_BASE_PATH = void 0;
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */
    exports.DEFAULT_API_BASE_PATH = "/auth";
    exports.SSR_ERROR =
        "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";
});

unwrapExports(constants);
constants.SSR_ERROR;
constants.DEFAULT_API_BASE_PATH;

var utils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHashFromLocation =
        exports.getNormalisedUserContext =
        exports.checkForSSRErrorAndAppendIfNeeded =
        exports.getQueryParams =
        exports.isTest =
        exports.normaliseInputAppInfoOrThrowError =
        exports.appendQueryParamsToURL =
            void 0;
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */

    function appendQueryParamsToURL(stringUrl, queryParams) {
        if (queryParams === undefined) {
            return stringUrl;
        }
        try {
            var url_1 = new URL(stringUrl);
            Object.entries(queryParams).forEach(function (_a) {
                var key = _a[0],
                    value = _a[1];
                url_1.searchParams.set(key, value);
            });
            return url_1.href;
        } catch (e) {
            var fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
            var url_2 = new URL("".concat(fakeDomain).concat(stringUrl));
            Object.entries(queryParams).forEach(function (_a) {
                var key = _a[0],
                    value = _a[1];
                url_2.searchParams.set(key, value);
            });
            return "".concat(url_2.pathname).concat(url_2.search);
        }
    }
    exports.appendQueryParamsToURL = appendQueryParamsToURL;
    function getNormalisedURLPathOrDefault(defaultPath, path) {
        if (path !== undefined) {
            return new normalisedURLPath$2.default(path);
        } else {
            return new normalisedURLPath$2.default(defaultPath);
        }
    }
    function normaliseInputAppInfoOrThrowError(appInfo) {
        if (appInfo === undefined) {
            throw new Error("Please provide the appInfo object when calling supertokens.init");
        }
        if (appInfo.apiDomain === undefined) {
            throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
        }
        if (appInfo.appName === undefined) {
            throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
        }
        var apiGatewayPath = new normalisedURLPath$2.default("");
        if (appInfo.apiGatewayPath !== undefined) {
            apiGatewayPath = new normalisedURLPath$2.default(appInfo.apiGatewayPath);
        }
        return {
            appName: appInfo.appName,
            apiDomain: new normalisedURLDomain$2.default(appInfo.apiDomain),
            apiBasePath: apiGatewayPath.appendPath(
                getNormalisedURLPathOrDefault(constants.DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
            ),
        };
    }
    exports.normaliseInputAppInfoOrThrowError = normaliseInputAppInfoOrThrowError;
    function isTest() {
        try {
            return process.env.TEST_MODE === "testing";
        } catch (err) {
            // can get Uncaught ReferenceError: process is not defined error
            return false;
        }
    }
    exports.isTest = isTest;
    function getQueryParams(param) {
        var urlParams = new URLSearchParams(
            windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        var queryParam = urlParams.get(param);
        if (queryParam === null) {
            return undefined;
        }
        return queryParam;
    }
    exports.getQueryParams = getQueryParams;
    function checkForSSRErrorAndAppendIfNeeded(error) {
        // tslint:disable-next-line
        if (typeof window === "undefined") {
            error = error + constants.SSR_ERROR;
        }
        return error;
    }
    exports.checkForSSRErrorAndAppendIfNeeded = checkForSSRErrorAndAppendIfNeeded;
    function getNormalisedUserContext(userContext) {
        return userContext === undefined ? {} : userContext;
    }
    exports.getNormalisedUserContext = getNormalisedUserContext;
    function getHashFromLocation() {
        // By default it is returned with the "#" at the beginning, we cut that off here.
        return windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substring(1);
    }
    exports.getHashFromLocation = getHashFromLocation;
});

unwrapExports(utils);
utils.getHashFromLocation;
utils.getNormalisedUserContext;
utils.checkForSSRErrorAndAppendIfNeeded;
utils.getQueryParams;
utils.isTest;
utils.normaliseInputAppInfoOrThrowError;
utils.appendQueryParamsToURL;

var recipe = createCommonjsModule(function (module, exports) {
    var __extends =
        (commonjsGlobal && commonjsGlobal.__extends) ||
        (function () {
            var extendStatics = function (d, b) {
                extendStatics =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function (d, b) {
                            d.__proto__ = b;
                        }) ||
                    function (d, b) {
                        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
            };
        })();
    var __assign =
        (commonjsGlobal && commonjsGlobal.__assign) ||
        function () {
            __assign =
                Object.assign ||
                function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
            return __assign.apply(this, arguments);
        };
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Recipe = void 0;
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */

    var Recipe = /** @class */ (function (_super) {
        __extends(Recipe, _super);
        function Recipe(config) {
            var _this = _super.call(this, config) || this;
            _this.getUserId = function (input) {
                return supertokensWebsite.default.getUserId({
                    userContext: input.userContext,
                });
            };
            _this.getAccessTokenPayloadSecurely = function (input) {
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [
                            2 /*return*/,
                            supertokensWebsite.default.getAccessTokenPayloadSecurely({
                                userContext: input.userContext,
                            }),
                        ];
                    });
                });
            };
            _this.doesSessionExist = function (input) {
                return supertokensWebsite.default.doesSessionExist({
                    userContext: input.userContext,
                });
            };
            _this.signOut = function (input) {
                return supertokensWebsite.default.signOut({
                    userContext: input.userContext,
                });
            };
            _this.attemptRefreshingSession = function () {
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, supertokensWebsite.default.attemptRefreshingSession()];
                    });
                });
            };
            _this.validateClaims = function (input) {
                return supertokensWebsite.default.validateClaims(
                    input.overrideGlobalClaimValidators,
                    input.userContext
                );
            };
            supertokensWebsite.default.init(
                __assign(__assign({}, config), {
                    preAPIHook: function (context) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                response = __assign(__assign({}, context), {
                                    requestInit: __assign(__assign({}, context.requestInit), {
                                        headers: __assign(__assign({}, context.requestInit.headers), {
                                            rid: config.recipeId,
                                        }),
                                    }),
                                });
                                if (config.preAPIHook === undefined) {
                                    return [2 /*return*/, response];
                                } else {
                                    return [2 /*return*/, config.preAPIHook(context)];
                                }
                            });
                        });
                    },
                    apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
                    apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
                })
            );
            return _this;
        }
        Recipe.init = function (config) {
            return function (appInfo, enableDebugLogs) {
                Recipe.instance = new Recipe(
                    __assign(__assign({}, config), {
                        appInfo: appInfo,
                        recipeId: Recipe.RECIPE_ID,
                        enableDebugLogs: enableDebugLogs,
                    })
                );
                return Recipe.instance;
            };
        };
        Recipe.prototype.getClaimValue = function (input) {
            return supertokensWebsite.default.getClaimValue(input);
        };
        // The strange typing is to avoid adding a dependency to axios
        Recipe.prototype.getInvalidClaimsFromResponse = function (input) {
            return supertokensWebsite.default.getInvalidClaimsFromResponse(input);
        };
        Recipe.addAxiosInterceptors = function (axiosInstance, userContext) {
            return supertokensWebsite.default.addAxiosInterceptors(axiosInstance, userContext);
        };
        Recipe.getInstanceOrThrow = function () {
            if (Recipe.instance === undefined) {
                var error = "No instance of Session found. Make sure to call the Session.init method.";
                error = (0, utils.checkForSSRErrorAndAppendIfNeeded)(error);
                throw Error(error);
            }
            return Recipe.instance;
        };
        Recipe.reset = function () {
            if (!(0, utils.isTest)()) {
                return;
            }
            Recipe.instance = undefined;
            return;
        };
        Recipe.RECIPE_ID = "session";
        return Recipe;
    })(recipeModule.default);
    exports.Recipe = Recipe;
    exports.default = Recipe;
});

unwrapExports(recipe);
var recipe_1 = recipe.Recipe;

function normaliseRecipeModuleConfig(config) {
    var _this = this;
    var onHandleEvent = config.onHandleEvent,
        getRedirectionURL = config.getRedirectionURL,
        preAPIHook = config.preAPIHook,
        postAPIHook = config.postAPIHook;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = function (_) {};
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = function (_) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/, undefined];
                });
            });
        };
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = function (context) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/, context];
                });
            });
        };
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = function () {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
    }
    var useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    useShadowDom = getShouldUseShadowDomBasedOnBrowser(useShadowDom);
    var palette = config.palette === undefined ? {} : config.palette;
    var rootStyle = config.style === undefined ? "" : config.style;
    return assets.__assign(assets.__assign({}, config), {
        getRedirectionURL: getRedirectionURL,
        onHandleEvent: onHandleEvent,
        preAPIHook: preAPIHook,
        postAPIHook: postAPIHook,
        useShadowDom: useShadowDom,
        palette: palette,
        rootStyle: rootStyle,
        recipeId: config.recipeId,
        appInfo: config.appInfo,
    });
}
function getShouldUseShadowDomBasedOnBrowser(useShadowDom) {
    /*
     * Detect if browser is IE
     * In order to disable unsupported shadowDom
     * https://github.com/supertokens/supertokens-auth-react/issues/99
     */
    // If browser is Internet Explorer, always disable shadow dom.
    if (isIE() === true) {
        return false;
    }
    // Otherwise, use provided config or default to true.
    return useShadowDom !== undefined ? useShadowDom : true;
}

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var Session = /** @class */ (function (_super) {
    assets.__extends(Session, _super);
    function Session(config) {
        var _this = this;
        var normalizedConfig = assets.__assign(assets.__assign({}, config), normaliseRecipeModuleConfig(config));
        _this = _super.call(this, normalizedConfig) || this;
        _this.eventListeners = new Set();
        _this.redirectionHandlersFromAuthRecipes = new Map();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getFeatureComponent = function (_) {
            throw new Error("should never come here");
        };
        _this.getFeatures = function () {
            return {};
        };
        _this.getUserId = function (input) {
            return _this.webJsRecipe.getUserId(input);
        };
        _this.getAccessTokenPayloadSecurely = function (input) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.getAccessTokenPayloadSecurely(input)];
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return _this.webJsRecipe.doesSessionExist(input);
        };
        _this.signOut = function (input) {
            return _this.webJsRecipe.signOut(input);
        };
        _this.attemptRefreshingSession = function () {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.attemptRefreshingSession()];
                });
            });
        };
        _this.validateClaims = function (input) {
            return _this.webJsRecipe.validateClaims(input);
        };
        _this.getInvalidClaimsFromResponse = function (input) {
            return _this.webJsRecipe.getInvalidClaimsFromResponse(input);
        };
        /**
         * @returns Function to remove event listener
         */
        _this.addEventListener = function (listener) {
            _this.eventListeners.add(listener);
            return function () {
                return _this.eventListeners.delete(listener);
            };
        };
        _this.addAuthRecipeRedirectionHandler = function (rid, redirect) {
            _this.redirectionHandlersFromAuthRecipes.set(rid, redirect);
        };
        _this.validateGlobalClaimsAndHandleSuccessRedirection = function (redirectInfo, userContext, history) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var invalidClaims, invalidClaimRedirectPath, jsonContext, successContextStr, authRecipeRedirectHandler;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.doesSessionExist({ userContext: userContext })];
                        case 1:
                            // First we check if there is an active session
                            if (!_a.sent()) {
                                // If there is none, we have no way of checking claims, so we redirect to the auth page
                                // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
                                return [
                                    2 /*return*/,
                                    SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        history: history,
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            return [4 /*yield*/, this.validateClaims({ userContext: userContext })];
                        case 2:
                            invalidClaims = _a.sent();
                            invalidClaimRedirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                            if (!(invalidClaims.length > 0 && invalidClaimRedirectPath !== undefined))
                                return [3 /*break*/, 5];
                            if (!(redirectInfo !== undefined)) return [3 /*break*/, 4];
                            jsonContext = JSON.stringify(redirectInfo);
                            return [
                                4 /*yield*/,
                                setLocalStorage("supertokens-success-redirection-context", jsonContext),
                            ];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            // then we do the redirection.
                            return [
                                2 /*return*/,
                                SuperTokens.getInstanceOrThrow().redirectToUrl(invalidClaimRedirectPath, history),
                            ];
                        case 5:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 12];
                            return [4 /*yield*/, getLocalStorage("supertokens-success-redirection-context")];
                        case 6:
                            successContextStr = _a.sent();
                            if (!(successContextStr !== null)) return [3 /*break*/, 11];
                            _a.label = 7;
                        case 7:
                            _a.trys.push([7, , 8, 10]);
                            redirectInfo = JSON.parse(successContextStr);
                            return [3 /*break*/, 10];
                        case 8:
                            return [4 /*yield*/, removeFromLocalStorage("supertokens-success-redirection-context")];
                        case 9:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 10:
                            return [3 /*break*/, 12];
                        case 11:
                            // If there was nothing in localstorage we set a default
                            // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                            // but already had the email verified and an active session
                            redirectInfo = {
                                rid: Session.RECIPE_ID,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                },
                            };
                            _a.label = 12;
                        case 12:
                            authRecipeRedirectHandler = this.redirectionHandlersFromAuthRecipes.get(redirectInfo.rid);
                            if (authRecipeRedirectHandler !== undefined) {
                                // and call it with the saved info
                                return [
                                    2 /*return*/,
                                    authRecipeRedirectHandler(redirectInfo.successRedirectContext, history),
                                ];
                            }
                            // This should only happen if the configuration changed between saving the context and finishing the sign in process
                            // or if the user navigated to a page where they were expected to have a stored redirectInfo but didn't
                            // (e.g.: pressed back after email verification)
                            return [2 /*return*/, this.redirect(redirectInfo.successRedirectContext, history)];
                    }
                });
            });
        };
        /**
         * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
         * @returns "/"
         */
        _this.getDefaultRedirectionURL = function () {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/, "/"];
                });
            });
        };
        _this.notifyListeners = function (event) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            // We copy this.eventListeners into a new array to "freeze" it for the loop
                            // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                            Array.from(this.eventListeners).forEach(function (listener) {
                                return listener(assets.__assign({ sessionContext: sessionContext }, event));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.webJsRecipe = new recipe_1(
            assets.__assign(assets.__assign({}, normalizedConfig), {
                onHandleEvent: function (event) {
                    if (config.onHandleEvent !== undefined) {
                        config.onHandleEvent(event);
                    }
                    void _this.notifyListeners(event);
                },
                preAPIHook: function (context) {
                    return assets.__awaiter(_this, void 0, void 0, function () {
                        var response;
                        return assets.__generator(this, function (_a) {
                            response = assets.__assign(assets.__assign({}, context), {
                                requestInit: assets.__assign(assets.__assign({}, context.requestInit), {
                                    headers: assets.__assign(assets.__assign({}, context.requestInit.headers), {
                                        rid: config.recipeId,
                                    }),
                                }),
                            });
                            if (config.preAPIHook === undefined) {
                                return [2 /*return*/, response];
                            } else {
                                return [2 /*return*/, config.preAPIHook(context)];
                            }
                        });
                    });
                },
            })
        );
        return _this;
    }
    Session.prototype.getSessionContext = function (_a) {
        var action = _a.action,
            userContext = _a.userContext;
        return assets.__awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return assets.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (
                            !(
                                action === "SESSION_CREATED" ||
                                action === "REFRESH_SESSION" ||
                                action === "API_INVALID_CLAIM" ||
                                action === "ACCESS_TOKEN_PAYLOAD_UPDATED"
                            )
                        )
                            return [3 /*break*/, 2];
                        return [
                            4 /*yield*/,
                            Promise.all([
                                this.getUserId({
                                    userContext: userContext,
                                }),
                                this.getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ]),
                        ];
                    case 1:
                        (_b = _c.sent()), (userId = _b[0]), (accessTokenPayload = _b[1]);
                        return [
                            2 /*return*/,
                            {
                                doesSessionExist: true,
                                accessTokenPayload: accessTokenPayload,
                                userId: userId,
                            },
                        ];
                    case 2:
                        if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
                            return [
                                2 /*return*/,
                                {
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    userId: "",
                                },
                            ];
                        }
                        throw new Error("Unhandled recipe event: ".concat(action));
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    Session.addAxiosInterceptors = function (axiosInstance, userContext) {
        return recipe_1.addAxiosInterceptors(axiosInstance, userContext);
    };
    Session.init = function (config) {
        return function (appInfo, enableDebugLogs) {
            Session.instance = new Session(
                assets.__assign(assets.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: Session.RECIPE_ID,
                    enableDebugLogs: enableDebugLogs,
                })
            );
            return Session.instance;
        };
    };
    Session.getInstanceOrThrow = function () {
        if (Session.instance === undefined) {
            throw Error(
                "No instance of Session found. Make sure to call the Session.init method. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        return Session.instance;
    };
    Session.getInstance = function () {
        return Session.instance;
    };
    Session.reset = function () {
        if (!isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(RecipeModule);

function UserContextWrapper(props) {
    /**
     * If we recieve a userContext as a props we should assume that the user
     * is either trying to use a theme component as standalone or that they
     * want to override an existing value for userContext.
     *
     * In this case we should always return a Provider with the value of userContext
     */
    if (props.userContext !== undefined) {
        return jsxRuntime.jsx(
            UserContextProvider,
            assets.__assign({ userContext: props.userContext }, { children: props.children })
        );
    }
    return jsxRuntime.jsx(UserContextContext.Consumer, {
        children: function (value) {
            /**
             * value is undefined only if there is no Provider in the tree. In this case it is safe to
             * assume that the theme component is not being rendered by the SDK and that the user is not
             * using this as a child of one of the pre-built feature components.
             *
             * In this case we return a provider so that the userContext hook can be used by the children
             * of this theme component
             */
            if (value === undefined) {
                return jsxRuntime.jsx(UserContextProvider, { children: props.children });
            }
            /**
             * If value is not undefined then a provider exists in the tree. This means that this component
             * is either being rendered by the SDK or the user has added it as a child of the pre-built
             * feature components. In either case the userContext hook will be available so simply
             * return the theme component.
             */
            return props.children;
        },
    });
}

var SessionAuth$1 = function (_a) {
    var _b;
    var children = _a.children,
        props = assets.__rest(_a, ["children"]);
    var requireAuth = React.useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    var _c = React.useState({ loading: true }),
        context = _c[0],
        setContext = _c[1];
    var session = React.useRef();
    // We store this here, to prevent the list of called hooks changing even if a history hook is added later to SuperTokens.
    var historyHookRef = React.useRef(
        (_b = SuperTokens.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom
    );
    var history;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch (_d) {
        // We catch and ignore errors here, because if this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    var userContext = useUserContext();
    var redirectToLogin = React.useCallback(function () {
        void SuperTokens.getInstanceOrThrow().redirectToAuth({ history: history, redirectBack: true });
    }, []);
    var buildContext = React.useCallback(function () {
        return assets.__awaiter(void 0, void 0, void 0, function () {
            var sessionExists, invalidClaims, err_1, invalidClaimRedirectToPath, err_2;
            var _a;
            return assets.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (session.current === undefined) {
                            session.current = Session.getInstanceOrThrow();
                        }
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        sessionExists = _b.sent();
                        if (sessionExists === false) {
                            return [
                                2 /*return*/,
                                {
                                    loading: false,
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    invalidClaims: [],
                                    userId: "",
                                },
                            ];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 6]);
                        return [
                            4 /*yield*/,
                            session.current.validateClaims({
                                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                userContext: userContext,
                            }),
                        ];
                    case 3:
                        invalidClaims = _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 5:
                        // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
                        // Which means that the session was most likely cleared, meaning returning false is right.
                        // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
                        // In which case the session will not be cleared so we rethrow the error
                        if (_b.sent()) {
                            throw err_1;
                        }
                        return [
                            2 /*return*/,
                            {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            },
                        ];
                    case 6:
                        invalidClaimRedirectToPath = popInvalidClaimRedirectPathFromContext(userContext);
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 10, , 12]);
                        _a = {
                            loading: false,
                            doesSessionExist: true,
                            invalidClaims: invalidClaims,
                            invalidClaimRedirectToPath: invalidClaimRedirectToPath,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 8:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 9:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                    case 10:
                        err_2 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 11:
                        if (_b.sent()) {
                            throw err_2;
                        }
                        // This means that loading the access token or the userId failed
                        // This may happen if the server cleared the error since the validation was done which should be extremely rare
                        return [
                            2 /*return*/,
                            {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            },
                        ];
                    case 12:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = React.useCallback(
        function (toSetContext) {
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (context.loading === false) {
                                return [2 /*return*/];
                            }
                            if (!(props.doRedirection !== false)) return [3 /*break*/, 3];
                            if (!(!toSetContext.doesSessionExist && props.requireAuth !== false))
                                return [3 /*break*/, 1];
                            redirectToLogin();
                            return [2 /*return*/];
                        case 1:
                            if (!(toSetContext.invalidClaimRedirectToPath !== undefined)) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    toSetContext.invalidClaimRedirectToPath,
                                    history
                                ),
                            ];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            delete toSetContext.invalidClaimRedirectToPath;
                            setContext(toSetContext);
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.doRedirection, props.requireAuth, redirectToLogin, context]
    );
    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(
        function () {
            function onHandleEvent(event) {
                return assets.__awaiter(this, void 0, void 0, function () {
                    var _a, invalidClaims, redirectPath;
                    return assets.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = event.action;
                                switch (_a) {
                                    case "SESSION_CREATED":
                                        return [3 /*break*/, 1];
                                    case "REFRESH_SESSION":
                                        return [3 /*break*/, 1];
                                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                                        return [3 /*break*/, 1];
                                    case "API_INVALID_CLAIM":
                                        return [3 /*break*/, 1];
                                    case "SIGN_OUT":
                                        return [3 /*break*/, 5];
                                    case "UNAUTHORISED":
                                        return [3 /*break*/, 6];
                                }
                                return [3 /*break*/, 7];
                            case 1:
                                return [
                                    4 /*yield*/,
                                    session.current.validateClaims({
                                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                        userContext: userContext,
                                    }),
                                ];
                            case 2:
                                invalidClaims = _b.sent();
                                setContext(
                                    assets.__assign(assets.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: invalidClaims,
                                    })
                                );
                                redirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                                if (!(props.doRedirection !== false && redirectPath)) return [3 /*break*/, 4];
                                return [
                                    4 /*yield*/,
                                    SuperTokens.getInstanceOrThrow().redirectToUrl(redirectPath, history),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [2 /*return*/];
                            case 5:
                                setContext(
                                    assets.__assign(assets.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                return [2 /*return*/];
                            case 6:
                                setContext(
                                    assets.__assign(assets.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                if (props.onSessionExpired !== undefined) {
                                    props.onSessionExpired();
                                } else if (props.requireAuth !== false && props.doRedirection !== false) {
                                    redirectToLogin();
                                }
                                return [2 /*return*/];
                            case 7:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (session.current === undefined) {
                session.current = Session.getInstanceOrThrow();
            }
            if (context.loading === false) {
                // we return here cause addEventListener returns a function that removes
                // the listener, and this function will be called by useEffect when
                // onHandleEvent changes or if the component is unmounting.
                return session.current.addEventListener(onHandleEvent);
            }
            return undefined;
        },
        [props, setContext, context.loading]
    );
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    return jsxRuntime.jsx(SessionContext.Provider, assets.__assign({ value: context }, { children: children }));
};
var SessionAuthWrapper = function (props) {
    return jsxRuntime.jsx(
        UserContextWrapper,
        assets.__assign(
            { userContext: props.userContext },
            { children: jsxRuntime.jsx(SessionAuth$1, assets.__assign({}, props)) }
        )
    );
};

var session = createCommonjsModule(function (module, exports) {
    var __awaiter =
        (commonjsGlobal && commonjsGlobal.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P
                    ? value
                    : new P(function (resolve) {
                          resolve(value);
                      });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
    var __generator =
        (commonjsGlobal && commonjsGlobal.__generator) ||
        function (thisArg, body) {
            var _ = {
                    label: 0,
                    sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: [],
                },
                f,
                y,
                t,
                g;
            return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                    (g[Symbol.iterator] = function () {
                        return this;
                    }),
                g
            );
            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (
                            ((f = 1),
                            y &&
                                (t =
                                    op[0] & 2
                                        ? y["return"]
                                        : op[0]
                                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                        : y.next) &&
                                !(t = t.call(y, op[1])).done)
                        )
                            return t;
                        if (((y = 0), t)) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (
                                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally {
                        f = t = 0;
                    }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInvalidClaimsFromResponse =
        exports.getClaimValue =
        exports.validateClaims =
        exports.signOut =
        exports.addAxiosInterceptors =
        exports.doesSessionExist =
        exports.attemptRefreshingSession =
        exports.getAccessTokenPayloadSecurely =
        exports.getUserId =
        exports.init =
        exports.BooleanClaim =
        exports.PrimitiveArrayClaim =
        exports.PrimitiveClaim =
        exports.SessionClaimValidator =
            void 0;
    /* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
     *
     * This software is licensed under the Apache License, Version 2.0 (the
     * "License") as published by the Apache Software Foundation.
     *
     * You may not use this file except in compliance with the License. You may
     * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
     * License for the specific language governing permissions and limitations
     * under the License.
     */

    var RecipeWrapper = /** @class */ (function () {
        function RecipeWrapper() {}
        RecipeWrapper.init = function (config) {
            return recipe.default.init(config);
        };
        RecipeWrapper.getUserId = function (input) {
            return recipe.default.getInstanceOrThrow().getUserId({
                userContext: (0, utils.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        };
        RecipeWrapper.getAccessTokenPayloadSecurely = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe.default.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                            userContext: (0, utils.getNormalisedUserContext)(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        }),
                    ];
                });
            });
        };
        RecipeWrapper.attemptRefreshingSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, recipe.default.getInstanceOrThrow().attemptRefreshingSession()];
                });
            });
        };
        RecipeWrapper.doesSessionExist = function (input) {
            return recipe.default.getInstanceOrThrow().doesSessionExist({
                userContext: (0, utils.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        };
        /**
         * @deprecated
         */
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        RecipeWrapper.addAxiosInterceptors = function (axiosInstance, userContext) {
            return recipe.default.addAxiosInterceptors(axiosInstance, (0, utils.getNormalisedUserContext)(userContext));
        };
        RecipeWrapper.signOut = function (input) {
            return recipe.default.getInstanceOrThrow().signOut({
                userContext: (0, utils.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        };
        RecipeWrapper.getClaimValue = function (input) {
            return recipe.default.getInstanceOrThrow().getClaimValue({
                claim: input.claim,
                userContext: (0, utils.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        };
        RecipeWrapper.validateClaims = function (input) {
            return recipe.default.getInstanceOrThrow().validateClaims({
                overrideGlobalClaimValidators:
                    input === null || input === void 0 ? void 0 : input.overrideGlobalClaimValidators,
                userContext: (0, utils.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        };
        // The strange typing is to avoid adding a dependency to axios
        RecipeWrapper.getInvalidClaimsFromResponse = function (input) {
            return recipe.default.getInstanceOrThrow().getInvalidClaimsFromResponse({
                response: input.response,
                userContext: (0, utils.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        };
        return RecipeWrapper;
    })();
    exports.default = RecipeWrapper;
    var init = RecipeWrapper.init;
    exports.init = init;
    var getUserId = RecipeWrapper.getUserId;
    exports.getUserId = getUserId;
    var getAccessTokenPayloadSecurely = RecipeWrapper.getAccessTokenPayloadSecurely;
    exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
    var attemptRefreshingSession = RecipeWrapper.attemptRefreshingSession;
    exports.attemptRefreshingSession = attemptRefreshingSession;
    var doesSessionExist = RecipeWrapper.doesSessionExist;
    exports.doesSessionExist = doesSessionExist;
    /**
     * @deprecated
     */
    var addAxiosInterceptors = RecipeWrapper.addAxiosInterceptors;
    exports.addAxiosInterceptors = addAxiosInterceptors;
    var signOut = RecipeWrapper.signOut;
    exports.signOut = signOut;
    var validateClaims = RecipeWrapper.validateClaims;
    exports.validateClaims = validateClaims;
    var getClaimValue = RecipeWrapper.getClaimValue;
    exports.getClaimValue = getClaimValue;
    var getInvalidClaimsFromResponse = RecipeWrapper.getInvalidClaimsFromResponse;
    exports.getInvalidClaimsFromResponse = getInvalidClaimsFromResponse;

    Object.defineProperty(exports, "SessionClaimValidator", {
        enumerable: true,
        get: function () {
            return supertokensWebsite.SessionClaimValidator;
        },
    });
    Object.defineProperty(exports, "PrimitiveClaim", {
        enumerable: true,
        get: function () {
            return supertokensWebsite.PrimitiveClaim;
        },
    });
    Object.defineProperty(exports, "PrimitiveArrayClaim", {
        enumerable: true,
        get: function () {
            return supertokensWebsite.PrimitiveArrayClaim;
        },
    });
    Object.defineProperty(exports, "BooleanClaim", {
        enumerable: true,
        get: function () {
            return supertokensWebsite.BooleanClaim;
        },
    });
});

unwrapExports(session);
session.getInvalidClaimsFromResponse;
session.getClaimValue;
session.validateClaims;
session.signOut;
session.addAxiosInterceptors;
session.doesSessionExist;
session.attemptRefreshingSession;
session.getAccessTokenPayloadSecurely;
session.getUserId;
session.init;
var session_11 = session.BooleanClaim;
var session_12 = session.PrimitiveArrayClaim;
var session_13 = session.PrimitiveClaim;
session.SessionClaimValidator;

var useSessionContext$1 = function () {
    var ctx = React.useContext(SessionContext);
    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};

var useClaimValue$1 = function (claim) {
    var ctx = useSessionContext$1();
    if (ctx.loading) {
        return {
            loading: true,
        };
    }
    if (ctx.doesSessionExist === false) {
        return {
            loading: false,
            doesSessionExist: false,
            value: undefined,
        };
    }
    return {
        loading: false,
        doesSessionExist: true,
        value: claim.getValueFromPayload(ctx.accessTokenPayload),
    };
};

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var SessionAPIWrapper = /** @class */ (function () {
    function SessionAPIWrapper() {}
    SessionAPIWrapper.init = function (config) {
        return Session.init(config);
    };
    SessionAPIWrapper.getUserId = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Session.getInstanceOrThrow().getUserId({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.getAccessTokenPayloadSecurely = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.attemptRefreshingSession = function () {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().attemptRefreshingSession()];
            });
        });
    };
    SessionAPIWrapper.doesSessionExist = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Session.getInstanceOrThrow().doesSessionExist({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    /**
     * @deprecated
     */
    SessionAPIWrapper.addAxiosInterceptors = function (axiosInstance, userContext) {
        return Session.addAxiosInterceptors(axiosInstance, getNormalisedUserContext(userContext));
    };
    SessionAPIWrapper.signOut = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Session.getInstanceOrThrow().signOut({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.validateClaims = function (input) {
        return Session.getInstanceOrThrow().validateClaims(input);
    };
    SessionAPIWrapper.getInvalidClaimsFromResponse = function (input) {
        return Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    };
    SessionAPIWrapper.useSessionContext = useSessionContext$1;
    SessionAPIWrapper.useClaimValue = useClaimValue$1;
    SessionAPIWrapper.SessionAuth = SessionAuthWrapper;
    return SessionAPIWrapper;
})();
var useSessionContext = SessionAPIWrapper.useSessionContext;
var useClaimValue = SessionAPIWrapper.useClaimValue;
var SessionAuth = SessionAPIWrapper.SessionAuth;
var init = SessionAPIWrapper.init;
var getUserId = SessionAPIWrapper.getUserId;
var getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
var attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
var doesSessionExist = SessionAPIWrapper.doesSessionExist;
/**
 * @deprecated
 */
var addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
var signOut = SessionAPIWrapper.signOut;
var validateClaims = SessionAPIWrapper.validateClaims;
var getInvalidClaimsFromResponse = SessionAPIWrapper.getInvalidClaimsFromResponse;

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var AuthRecipe = /** @class */ (function (_super) {
    assets.__extends(AuthRecipe, _super);
    function AuthRecipe(config) {
        var _this = _super.call(this, config) || this;
        _this.getAuthRecipeDefaultRedirectionURL = function (context) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    if (context.action === "SUCCESS") {
                        return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                    } else {
                        throw new Error("Should never come here");
                    }
                });
            });
        };
        _this.signOut = function (input) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().signOut({
                                    userContext: getNormalisedUserContext(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().doesSessionExist({
                                    userContext: getNormalisedUserContext(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        postSuperTokensInitCallbacks_1.addPostInitCallback(function () {
            var session = Session.getInstance();
            if (session !== undefined) {
                session.addAuthRecipeRedirectionHandler(_this.config.recipeId, _this.redirect.bind(_this));
            }
        });
        return _this;
    }
    return AuthRecipe;
})(RecipeModule);

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
function normaliseAuthRecipe(config) {
    return normaliseRecipeModuleConfig(config);
}

/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
var AuthWidgetWrapper = function (props) {
    return jsxRuntime.jsx(
        SessionAuth,
        assets.__assign(
            { requireAuth: false, doRedirection: false },
            { children: jsxRuntime.jsx(Redirector, assets.__assign({}, props)) }
        )
    );
};
var Redirector = function (props) {
    var sessionContext = React.useContext(SessionContext);
    var userContext = useUserContext();
    var _a = React.useState(false),
        alwaysShow = _a[0],
        updateAlwaysShow = _a[1];
    React.useEffect(
        function () {
            // we want to do this just once, so we supply it with only the loading state.
            // if we supply it with props, sessionContext, then once the user signs in, then this will route the
            // user to the dashboard, as opposed to the sign up / sign in functions.
            if (sessionContext.loading === false) {
                if (sessionContext.doesSessionExist) {
                    if (props.onSessionAlreadyExists !== undefined) {
                        props.onSessionAlreadyExists();
                    } else {
                        props.authRecipe.config.onHandleEvent({
                            action: "SESSION_ALREADY_EXISTS",
                        });
                        void Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: props.authRecipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    redirectToPath: getRedirectToPathFromURL(),
                                },
                            },
                            userContext,
                            props.history
                        );
                    }
                } else {
                    // this means even if a session exists, we will still show the children
                    // cause the child component will take care of redirecting etc..
                    updateAlwaysShow(true);
                }
            }
        },
        [sessionContext.loading]
    );
    if ((sessionContext.loading === true || sessionContext.doesSessionExist) && !alwaysShow) {
        return null;
    } else {
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: props.children });
    }
};

exports.AuthRecipe = AuthRecipe;
exports.AuthWidgetWrapper = AuthWidgetWrapper;
exports.NormalisedURLPath = NormalisedURLPath;
exports.OverrideableBuilder = OverrideableBuilder;
exports.RecipeModule = RecipeModule;
exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.Session = Session;
exports.SessionAPIWrapper = SessionAPIWrapper;
exports.SessionAuth = SessionAuth;
exports.SessionAuthWrapper = SessionAuthWrapper;
exports.SessionContext = SessionContext;
exports.SuperTokens = SuperTokens;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.addAxiosInterceptors = addAxiosInterceptors;
exports.attemptRefreshingSession = attemptRefreshingSession;
exports.build = build$1;
exports.build_4 = build_4;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.commonjsGlobal = commonjsGlobal;
exports.createCommonjsModule = createCommonjsModule;
exports.doesSessionExist = doesSessionExist;
exports.error = error;
exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.getInvalidClaimsFromResponse = getInvalidClaimsFromResponse;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getURLHash = getURLHash;
exports.getUserId = getUserId;
exports.init = init;
exports.isTest = isTest;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.mergeObjects = mergeObjects;
exports.normaliseAuthRecipe = normaliseAuthRecipe;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
exports.normalisedURLPath = normalisedURLPath$2;
exports.postSuperTokensInitCallbacks = postSuperTokensInitCallbacks;
exports.postSuperTokensInitCallbacks_1 = postSuperTokensInitCallbacks_1;
exports.redirectWithFullPageReload = redirectWithFullPageReload;
exports.saveInvalidClaimRedirectPathInContext = saveInvalidClaimRedirectPathInContext;
exports.session = session;
exports.sessionClaimValidatorStore = sessionClaimValidatorStore;
exports.sessionClaimValidatorStore_1 = sessionClaimValidatorStore_1;
exports.session_11 = session_11;
exports.session_12 = session_12;
exports.session_13 = session_13;
exports.signOut = signOut;
exports.unwrapExports = unwrapExports;
exports.useClaimValue = useClaimValue;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useSessionContext = useSessionContext$1;
exports.useSessionContext$1 = useSessionContext;
exports.useUserContext = useUserContext;
exports.utils = utils;
exports.validateClaims = validateClaims;
exports.validateForm = validateForm;
exports.windowHandler = windowHandler;
//# sourceMappingURL=authRecipe-shared.js.map
