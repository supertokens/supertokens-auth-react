"use strict";

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var translationContext = require("./translationContext.js");
var authRecipe = require("./authRecipe-shared.js");
var reactDom = require("react-dom");

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hasFontDefined(_style) {
    // TODO: proper implementation or explicit setting
    return false;
    // return (style && style.container && (style.container.fontFamily || style.container.font)) !== undefined;
}

var ComponentOverrideContext = React.createContext("IS_DEFAULT");

var useComponentOverride = function (overrideKey) {
    var ctx = React.useContext(ComponentOverrideContext);
    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }
    var OverrideComponent = ctx[overrideKey];
    return OverrideComponent === undefined ? null : OverrideComponent;
};

var withOverride = function (overrideKey, DefaultComponent) {
    var finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return function (props) {
        var OverrideComponent = useComponentOverride(finalKey);
        if (OverrideComponent !== null) {
            return jsxRuntime.jsx(OverrideComponent, assets.__assign({ DefaultComponent: DefaultComponent }, props));
        }
        return jsxRuntime.jsx(DefaultComponent, assets.__assign({}, props));
    };
};

function GeneralError(_a) {
    var error = _a.error;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx("div", assets.__assign({ "data-supertokens": "generalError" }, { children: t(error) }));
}

var error$2 = authRecipe.createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    if (authRecipe.error.default !== undefined) {
        __export(authRecipe.error);
    } else {
        __export({
            default: authRecipe.error,
            ...authRecipe.error,
        });
    }
});

authRecipe.unwrapExports(error$2);

var error$1 = authRecipe.createCommonjsModule(function (module, exports) {
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
    /**
     * This error usually indicates that the API exposed by the backend SDKs responded
     * with `{status: "GENERAL_ERROR"}`. This should be used to show errors to the user
     * in your frontend application.
     */

    exports.default = error$2.STGeneralError;
});

authRecipe.unwrapExports(error$1);

var error = authRecipe.createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    if (error$1.default !== undefined) {
        __export(error$1);
    } else {
        __export({
            default: error$1,
            ...error$1,
        });
    }
});

var STGeneralError = authRecipe.unwrapExports(error);

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1 = "function" === typeof Symbol && Symbol.for,
    c = b$1 ? Symbol.for("react.element") : 60103,
    d$1 = b$1 ? Symbol.for("react.portal") : 60106,
    e = b$1 ? Symbol.for("react.fragment") : 60107,
    f$1 = b$1 ? Symbol.for("react.strict_mode") : 60108,
    g$1 = b$1 ? Symbol.for("react.profiler") : 60114,
    h$1 = b$1 ? Symbol.for("react.provider") : 60109,
    k = b$1 ? Symbol.for("react.context") : 60110,
    l$1 = b$1 ? Symbol.for("react.async_mode") : 60111,
    m$1 = b$1 ? Symbol.for("react.concurrent_mode") : 60111,
    n = b$1 ? Symbol.for("react.forward_ref") : 60112,
    p$1 = b$1 ? Symbol.for("react.suspense") : 60113,
    q = b$1 ? Symbol.for("react.suspense_list") : 60120,
    r = b$1 ? Symbol.for("react.memo") : 60115,
    t = b$1 ? Symbol.for("react.lazy") : 60116,
    v$1 = b$1 ? Symbol.for("react.block") : 60121,
    w$1 = b$1 ? Symbol.for("react.fundamental") : 60117,
    x$1 = b$1 ? Symbol.for("react.responder") : 60118,
    y$1 = b$1 ? Symbol.for("react.scope") : 60119;
function z(a) {
    if ("object" === typeof a && null !== a) {
        var u = a.$$typeof;
        switch (u) {
            case c:
                switch (((a = a.type), a)) {
                    case l$1:
                    case m$1:
                    case e:
                    case g$1:
                    case f$1:
                    case p$1:
                        return a;
                    default:
                        switch (((a = a && a.$$typeof), a)) {
                            case k:
                            case n:
                            case t:
                            case r:
                            case h$1:
                                return a;
                            default:
                                return u;
                        }
                }
            case d$1:
                return u;
        }
    }
}
function A$1(a) {
    return z(a) === m$1;
}
var AsyncMode = l$1;
var ConcurrentMode = m$1;
var ContextConsumer = k;
var ContextProvider = h$1;
var Element = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d$1;
var Profiler = g$1;
var StrictMode = f$1;
var Suspense = p$1;
var isAsyncMode = function (a) {
    return A$1(a) || z(a) === l$1;
};
var isConcurrentMode = A$1;
var isContextConsumer = function (a) {
    return z(a) === k;
};
var isContextProvider = function (a) {
    return z(a) === h$1;
};
var isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
};
var isForwardRef = function (a) {
    return z(a) === n;
};
var isFragment = function (a) {
    return z(a) === e;
};
var isLazy = function (a) {
    return z(a) === t;
};
var isMemo = function (a) {
    return z(a) === r;
};
var isPortal = function (a) {
    return z(a) === d$1;
};
var isProfiler = function (a) {
    return z(a) === g$1;
};
var isStrictMode = function (a) {
    return z(a) === f$1;
};
var isSuspense = function (a) {
    return z(a) === p$1;
};
var isValidElementType = function (a) {
    return (
        "string" === typeof a ||
        "function" === typeof a ||
        a === e ||
        a === m$1 ||
        a === g$1 ||
        a === f$1 ||
        a === p$1 ||
        a === q ||
        ("object" === typeof a &&
            null !== a &&
            (a.$$typeof === t ||
                a.$$typeof === r ||
                a.$$typeof === h$1 ||
                a.$$typeof === k ||
                a.$$typeof === n ||
                a.$$typeof === w$1 ||
                a.$$typeof === x$1 ||
                a.$$typeof === y$1 ||
                a.$$typeof === v$1))
    );
};
var typeOf = z;

var reactIs_production_min = {
    AsyncMode: AsyncMode,
    ConcurrentMode: ConcurrentMode,
    ContextConsumer: ContextConsumer,
    ContextProvider: ContextProvider,
    Element: Element,
    ForwardRef: ForwardRef,
    Fragment: Fragment,
    Lazy: Lazy,
    Memo: Memo,
    Portal: Portal,
    Profiler: Profiler,
    StrictMode: StrictMode,
    Suspense: Suspense,
    isAsyncMode: isAsyncMode,
    isConcurrentMode: isConcurrentMode,
    isContextConsumer: isContextConsumer,
    isContextProvider: isContextProvider,
    isElement: isElement,
    isForwardRef: isForwardRef,
    isFragment: isFragment,
    isLazy: isLazy,
    isMemo: isMemo,
    isPortal: isPortal,
    isProfiler: isProfiler,
    isStrictMode: isStrictMode,
    isSuspense: isSuspense,
    isValidElementType: isValidElementType,
    typeOf: typeOf,
};

var reactIs_development = authRecipe.createCommonjsModule(function (module, exports) {
    if (process.env.NODE_ENV !== "production") {
        (function () {
            // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
            // nor polyfill, then a plain number is used for performance.
            var hasSymbol = typeof Symbol === "function" && Symbol.for;
            var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
            var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
            var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;
            var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 0xeacc;
            var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 0xead2;
            var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 0xeacd;
            var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
            // (unstable) APIs that have been removed. Can we remove the symbols?

            var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 0xeacf;
            var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 0xeacf;
            var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 0xead0;
            var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 0xead1;
            var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 0xead8;
            var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
            var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
            var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 0xead9;
            var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 0xead5;
            var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 0xead6;
            var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 0xead7;

            function isValidElementType(type) {
                return (
                    typeof type === "string" ||
                    typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                    type === REACT_FRAGMENT_TYPE ||
                    type === REACT_CONCURRENT_MODE_TYPE ||
                    type === REACT_PROFILER_TYPE ||
                    type === REACT_STRICT_MODE_TYPE ||
                    type === REACT_SUSPENSE_TYPE ||
                    type === REACT_SUSPENSE_LIST_TYPE ||
                    (typeof type === "object" &&
                        type !== null &&
                        (type.$$typeof === REACT_LAZY_TYPE ||
                            type.$$typeof === REACT_MEMO_TYPE ||
                            type.$$typeof === REACT_PROVIDER_TYPE ||
                            type.$$typeof === REACT_CONTEXT_TYPE ||
                            type.$$typeof === REACT_FORWARD_REF_TYPE ||
                            type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
                            type.$$typeof === REACT_RESPONDER_TYPE ||
                            type.$$typeof === REACT_SCOPE_TYPE ||
                            type.$$typeof === REACT_BLOCK_TYPE))
                );
            }

            function typeOf(object) {
                if (typeof object === "object" && object !== null) {
                    var $$typeof = object.$$typeof;

                    switch ($$typeof) {
                        case REACT_ELEMENT_TYPE:
                            var type = object.type;

                            switch (type) {
                                case REACT_ASYNC_MODE_TYPE:
                                case REACT_CONCURRENT_MODE_TYPE:
                                case REACT_FRAGMENT_TYPE:
                                case REACT_PROFILER_TYPE:
                                case REACT_STRICT_MODE_TYPE:
                                case REACT_SUSPENSE_TYPE:
                                    return type;

                                default:
                                    var $$typeofType = type && type.$$typeof;

                                    switch ($$typeofType) {
                                        case REACT_CONTEXT_TYPE:
                                        case REACT_FORWARD_REF_TYPE:
                                        case REACT_LAZY_TYPE:
                                        case REACT_MEMO_TYPE:
                                        case REACT_PROVIDER_TYPE:
                                            return $$typeofType;

                                        default:
                                            return $$typeof;
                                    }
                            }

                        case REACT_PORTAL_TYPE:
                            return $$typeof;
                    }
                }

                return undefined;
            } // AsyncMode is deprecated along with isAsyncMode

            var AsyncMode = REACT_ASYNC_MODE_TYPE;
            var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
            var ContextConsumer = REACT_CONTEXT_TYPE;
            var ContextProvider = REACT_PROVIDER_TYPE;
            var Element = REACT_ELEMENT_TYPE;
            var ForwardRef = REACT_FORWARD_REF_TYPE;
            var Fragment = REACT_FRAGMENT_TYPE;
            var Lazy = REACT_LAZY_TYPE;
            var Memo = REACT_MEMO_TYPE;
            var Portal = REACT_PORTAL_TYPE;
            var Profiler = REACT_PROFILER_TYPE;
            var StrictMode = REACT_STRICT_MODE_TYPE;
            var Suspense = REACT_SUSPENSE_TYPE;
            var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

            function isAsyncMode(object) {
                {
                    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

                        console["warn"](
                            "The ReactIs.isAsyncMode() alias has been deprecated, " +
                                "and will be removed in React 17+. Update your code to use " +
                                "ReactIs.isConcurrentMode() instead. It has the exact same API."
                        );
                    }
                }

                return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
            }
            function isConcurrentMode(object) {
                return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
            }
            function isContextConsumer(object) {
                return typeOf(object) === REACT_CONTEXT_TYPE;
            }
            function isContextProvider(object) {
                return typeOf(object) === REACT_PROVIDER_TYPE;
            }
            function isElement(object) {
                return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
            function isForwardRef(object) {
                return typeOf(object) === REACT_FORWARD_REF_TYPE;
            }
            function isFragment(object) {
                return typeOf(object) === REACT_FRAGMENT_TYPE;
            }
            function isLazy(object) {
                return typeOf(object) === REACT_LAZY_TYPE;
            }
            function isMemo(object) {
                return typeOf(object) === REACT_MEMO_TYPE;
            }
            function isPortal(object) {
                return typeOf(object) === REACT_PORTAL_TYPE;
            }
            function isProfiler(object) {
                return typeOf(object) === REACT_PROFILER_TYPE;
            }
            function isStrictMode(object) {
                return typeOf(object) === REACT_STRICT_MODE_TYPE;
            }
            function isSuspense(object) {
                return typeOf(object) === REACT_SUSPENSE_TYPE;
            }

            exports.AsyncMode = AsyncMode;
            exports.ConcurrentMode = ConcurrentMode;
            exports.ContextConsumer = ContextConsumer;
            exports.ContextProvider = ContextProvider;
            exports.Element = Element;
            exports.ForwardRef = ForwardRef;
            exports.Fragment = Fragment;
            exports.Lazy = Lazy;
            exports.Memo = Memo;
            exports.Portal = Portal;
            exports.Profiler = Profiler;
            exports.StrictMode = StrictMode;
            exports.Suspense = Suspense;
            exports.isAsyncMode = isAsyncMode;
            exports.isConcurrentMode = isConcurrentMode;
            exports.isContextConsumer = isContextConsumer;
            exports.isContextProvider = isContextProvider;
            exports.isElement = isElement;
            exports.isForwardRef = isForwardRef;
            exports.isFragment = isFragment;
            exports.isLazy = isLazy;
            exports.isMemo = isMemo;
            exports.isPortal = isPortal;
            exports.isProfiler = isProfiler;
            exports.isStrictMode = isStrictMode;
            exports.isSuspense = isSuspense;
            exports.isValidElementType = isValidElementType;
            exports.typeOf = typeOf;
        })();
    }
});
reactIs_development.AsyncMode;
reactIs_development.ConcurrentMode;
reactIs_development.ContextConsumer;
reactIs_development.ContextProvider;
reactIs_development.Element;
reactIs_development.ForwardRef;
reactIs_development.Fragment;
reactIs_development.Lazy;
reactIs_development.Memo;
reactIs_development.Portal;
reactIs_development.Profiler;
reactIs_development.StrictMode;
reactIs_development.Suspense;
reactIs_development.isAsyncMode;
reactIs_development.isConcurrentMode;
reactIs_development.isContextConsumer;
reactIs_development.isContextProvider;
reactIs_development.isElement;
reactIs_development.isForwardRef;
reactIs_development.isFragment;
reactIs_development.isLazy;
reactIs_development.isMemo;
reactIs_development.isPortal;
reactIs_development.isProfiler;
reactIs_development.isStrictMode;
reactIs_development.isSuspense;
reactIs_development.isValidElementType;
reactIs_development.typeOf;

var reactIs = authRecipe.createCommonjsModule(function (module) {
    if (process.env.NODE_ENV === "production") {
        module.exports = reactIs_production_min;
    } else {
        module.exports = reactIs_development;
    }
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
    }

    return Object(val);
}

function shouldUseNative() {
    try {
        if (!Object.assign) {
            return false;
        }

        // Detect buggy property enumeration order in older V8 versions.

        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
        }

        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {};
        for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            return test2[n];
        });
        if (order2.join("") !== "0123456789") {
            return false;
        }

        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function (letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
        }

        return true;
    } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}

var objectAssign = shouldUseNative()
    ? Object.assign
    : function (target, source) {
          var from;
          var to = toObject(target);
          var symbols;

          for (var s = 1; s < arguments.length; s++) {
              from = Object(arguments[s]);

              for (var key in from) {
                  if (hasOwnProperty.call(from, key)) {
                      to[key] = from[key];
                  }
              }

              if (getOwnPropertySymbols) {
                  symbols = getOwnPropertySymbols(from);
                  for (var i = 0; i < symbols.length; i++) {
                      if (propIsEnumerable.call(from, symbols[i])) {
                          to[symbols[i]] = from[symbols[i]];
                      }
                  }
              }
          }

          return to;
      };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

var has$1 = has$2;

var printWarning$1 = function () {};

if (process.env.NODE_ENV !== "production") {
    var ReactPropTypesSecret = ReactPropTypesSecret$1;
    var loggedTypeFailures = {};
    var has = has$1;

    printWarning$1 = function (text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {
            /**/
        }
    };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== "production") {
        for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                        var err = Error(
                            (componentName || "React class") +
                                ": " +
                                location +
                                " type `" +
                                typeSpecName +
                                "` is invalid; " +
                                "it must be a function, usually from the `prop-types` package, but received `" +
                                typeof typeSpecs[typeSpecName] +
                                "`." +
                                "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                        );
                        err.name = "Invariant Violation";
                        throw err;
                    }
                    error = typeSpecs[typeSpecName](
                        values,
                        typeSpecName,
                        componentName,
                        location,
                        null,
                        ReactPropTypesSecret
                    );
                } catch (ex) {
                    error = ex;
                }
                if (error && !(error instanceof Error)) {
                    printWarning$1(
                        (componentName || "React class") +
                            ": type specification of " +
                            location +
                            " `" +
                            typeSpecName +
                            "` is invalid; the type checker " +
                            "function must return `null` or an `Error` but returned a " +
                            typeof error +
                            ". " +
                            "You may have forgotten to pass an argument to the type checker " +
                            "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                            "shape all require an argument)."
                    );
                }
                if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                    // Only monitor this failure once because there tends to be a lot of the
                    // same error.
                    loggedTypeFailures[error.message] = true;

                    var stack = getStack ? getStack() : "";

                    printWarning$1("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
                }
            }
        }
    }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes$1.resetWarningCache = function () {
    if (process.env.NODE_ENV !== "production") {
        loggedTypeFailures = {};
    }
};

var checkPropTypes_1 = checkPropTypes$1;

var checkPropTypes = checkPropTypes_1;

var printWarning = function () {};

if (process.env.NODE_ENV !== "production") {
    printWarning = function (text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {}
    };
}

function emptyFunctionThatReturnsNull() {
    return null;
}

var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
        var iteratorFn =
            maybeIterable &&
            ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
            return iteratorFn;
        }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = "<<anonymous>>";

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),

        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
        if (process.env.NODE_ENV !== "production") {
            var manualPropTypeCallCache = {};
            var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;

            if (secret !== ReactPropTypesSecret$1) {
                if (throwOnDirectAccess) {
                    // New behavior only for users of `prop-types` package
                    var err = new Error(
                        "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                            "Use `PropTypes.checkPropTypes()` to call them. " +
                            "Read more at http://fb.me/use-check-prop-types"
                    );
                    err.name = "Invariant Violation";
                    throw err;
                } else if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
                    // Old behavior for people using React.PropTypes
                    var cacheKey = componentName + ":" + propName;
                    if (
                        !manualPropTypeCallCache[cacheKey] &&
                        // Avoid spamming the console because they are often not actionable except for lib authors
                        manualPropTypeWarningCount < 3
                    ) {
                        printWarning(
                            "You are manually calling a React.PropTypes validation " +
                                "function for the `" +
                                propFullName +
                                "` prop on `" +
                                componentName +
                                "`. This is deprecated " +
                                "and will throw in the standalone `prop-types` package. " +
                                "You may be seeing this warning due to a third-party PropTypes " +
                                "library. See https://fb.me/react-warning-dont-call-proptypes " +
                                "for details."
                        );
                        manualPropTypeCallCache[cacheKey] = true;
                        manualPropTypeWarningCount++;
                    }
                }
            }
            if (props[propName] == null) {
                if (isRequired) {
                    if (props[propName] === null) {
                        return new PropTypeError(
                            "The " +
                                location +
                                " `" +
                                propFullName +
                                "` is marked as required " +
                                ("in `" + componentName + "`, but its value is `null`.")
                        );
                    }
                    return new PropTypeError(
                        "The " +
                            location +
                            " `" +
                            propFullName +
                            "` is marked as required in " +
                            ("`" + componentName + "`, but its value is `undefined`.")
                    );
                }
                return null;
            } else {
                return validate(props, propName, componentName, location, propFullName);
            }
        }

        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);

        return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
                // `propValue` being instance of, say, date/regexp, pass the 'object'
                // check, but we can offer a more precise error message here rather than
                // 'of type `object`'.
                var preciseType = getPreciseType(propValue);

                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type " +
                        ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") +
                        ("`" + expectedType + "`."),
                    { expectedType: expectedType }
                );
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== "function") {
                return new PropTypeError(
                    "Property `" +
                        propFullName +
                        "` of component `" +
                        componentName +
                        "` has invalid PropType notation inside arrayOf."
                );
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type " +
                        ("`" + propType + "` supplied to `" + componentName + "`, expected an array.")
                );
            }
            for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(
                    propValue,
                    i,
                    componentName,
                    location,
                    propFullName + "[" + i + "]",
                    ReactPropTypesSecret$1
                );
                if (error instanceof Error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type " +
                        ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement.")
                );
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!reactIs.isValidElementType(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type " +
                        ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type.")
                );
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
            if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type " +
                        ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") +
                        ("instance of `" + expectedClassName + "`.")
                );
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
            if (process.env.NODE_ENV !== "production") {
                if (arguments.length > 1) {
                    printWarning(
                        "Invalid arguments supplied to oneOf, expected an array, got " +
                            arguments.length +
                            " arguments. " +
                            "A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
                    );
                } else {
                    printWarning("Invalid argument supplied to oneOf, expected an array.");
                }
            }
            return emptyFunctionThatReturnsNull;
        }

        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            for (var i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[i])) {
                    return null;
                }
            }

            var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
                var type = getPreciseType(value);
                if (type === "symbol") {
                    return String(value);
                }
                return value;
            });
            return new PropTypeError(
                "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of value `" +
                    String(propValue) +
                    "` " +
                    ("supplied to `" + componentName + "`, expected one of " + valuesString + ".")
            );
        }
        return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== "function") {
                return new PropTypeError(
                    "Property `" +
                        propFullName +
                        "` of component `" +
                        componentName +
                        "` has invalid PropType notation inside objectOf."
                );
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type " +
                        ("`" + propType + "` supplied to `" + componentName + "`, expected an object.")
                );
            }
            for (var key in propValue) {
                if (has$1(propValue, key)) {
                    var error = typeChecker(
                        propValue,
                        key,
                        componentName,
                        location,
                        propFullName + "." + key,
                        ReactPropTypesSecret$1
                    );
                    if (error instanceof Error) {
                        return error;
                    }
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
            process.env.NODE_ENV !== "production"
                ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.")
                : void 0;
            return emptyFunctionThatReturnsNull;
        }

        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (typeof checker !== "function") {
                printWarning(
                    "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
                        "received " +
                        getPostfixForTypeWarning(checker) +
                        " at index " +
                        i +
                        "."
                );
                return emptyFunctionThatReturnsNull;
            }
        }

        function validate(props, propName, componentName, location, propFullName) {
            var expectedTypes = [];
            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                var checker = arrayOfTypeCheckers[i];
                var checkerResult = checker(
                    props,
                    propName,
                    componentName,
                    location,
                    propFullName,
                    ReactPropTypesSecret$1
                );
                if (checkerResult == null) {
                    return null;
                }
                if (checkerResult.data && has$1(checkerResult.data, "expectedType")) {
                    expectedTypes.push(checkerResult.data.expectedType);
                }
            }
            var expectedTypesMessage =
                expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
            return new PropTypeError(
                "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` supplied to " +
                    ("`" + componentName + "`" + expectedTypesMessage + ".")
            );
        }
        return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            if (!isNode(props[propName])) {
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` supplied to " +
                        ("`" + componentName + "`, expected a ReactNode.")
                );
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
            (componentName || "React class") +
                ": " +
                location +
                " type `" +
                propFullName +
                "." +
                key +
                "` is invalid; " +
                "it must be a function, usually from the `prop-types` package, but received `" +
                type +
                "`."
        );
    }

    function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type `" +
                        propType +
                        "` " +
                        ("supplied to `" + componentName + "`, expected `object`.")
                );
            }
            for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (typeof checker !== "function") {
                    return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                var error = checker(
                    propValue,
                    key,
                    componentName,
                    location,
                    propFullName + "." + key,
                    ReactPropTypesSecret$1
                );
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of type `" +
                        propType +
                        "` " +
                        ("supplied to `" + componentName + "`, expected `object`.")
                );
            }
            // We need to check all keys in case some are required but missing from props.
            var allKeys = objectAssign({}, props[propName], shapeTypes);
            for (var key in allKeys) {
                var checker = shapeTypes[key];
                if (has$1(shapeTypes, key) && typeof checker !== "function") {
                    return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                if (!checker) {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` key `" +
                            key +
                            "` supplied to `" +
                            componentName +
                            "`." +
                            "\nBad object: " +
                            JSON.stringify(props[propName], null, "  ") +
                            "\nValid keys: " +
                            JSON.stringify(Object.keys(shapeTypes), null, "  ")
                    );
                }
                var error = checker(
                    propValue,
                    key,
                    componentName,
                    location,
                    propFullName + "." + key,
                    ReactPropTypesSecret$1
                );
                if (error) {
                    return error;
                }
            }
            return null;
        }

        return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
        switch (typeof propValue) {
            case "number":
            case "string":
            case "undefined":
                return true;
            case "boolean":
                return !propValue;
            case "object":
                if (Array.isArray(propValue)) {
                    return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                    return true;
                }

                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                    var iterator = iteratorFn.call(propValue);
                    var step;
                    if (iteratorFn !== propValue.entries) {
                        while (!(step = iterator.next()).done) {
                            if (!isNode(step.value)) {
                                return false;
                            }
                        }
                    } else {
                        // Iterator will provide entry [k,v] tuples rather than values.
                        while (!(step = iterator.next()).done) {
                            var entry = step.value;
                            if (entry) {
                                if (!isNode(entry[1])) {
                                    return false;
                                }
                            }
                        }
                    }
                } else {
                    return false;
                }

                return true;
            default:
                return false;
        }
    }

    function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === "symbol") {
            return true;
        }

        // falsy value can't be a Symbol
        if (!propValue) {
            return false;
        }

        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue["@@toStringTag"] === "Symbol") {
            return true;
        }

        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
            return true;
        }

        return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
            return "array";
        }
        if (propValue instanceof RegExp) {
            // Old webkits (at least until Android 4.0) return 'function' rather than
            // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
            // passes PropTypes.object.
            return "object";
        }
        if (isSymbol(propType, propValue)) {
            return "symbol";
        }
        return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
            return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
            if (propValue instanceof Date) {
                return "date";
            } else if (propValue instanceof RegExp) {
                return "regexp";
            }
        }
        return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
            case "array":
            case "object":
                return "an " + type;
            case "boolean":
            case "date":
            case "regexp":
                return "a " + type;
            default:
                return type;
        }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
        }
        return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function () {
    function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret$1) {
            // It is still safe when called from React.
            return;
        }
        var err = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                "Use PropTypes.checkPropTypes() to call them. " +
                "Read more at http://fb.me/use-check-prop-types"
        );
        err.name = "Invariant Violation";
        throw err;
    }
    shim.isRequired = shim;
    function getShim() {
        return shim;
    } // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
        array: shim,
        bigint: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,

        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,

        checkPropTypes: emptyFunctionWithReset,
        resetWarningCache: emptyFunction,
    };

    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
};

var require$$1 = factoryWithTypeCheckers;

var require$$2 = factoryWithThrowingShims;

var propTypes = authRecipe.createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    if (process.env.NODE_ENV !== "production") {
        var ReactIs = reactIs;

        // By explicitly using `prop-types` you are opting into new development behavior.
        // http://fb.me/prop-types-in-prod
        var throwOnDirectAccess = true;
        module.exports = require$$1(ReactIs.isElement, throwOnDirectAccess);
    } else {
        // By explicitly using `prop-types` you are opting into new production behavior.
        // http://fb.me/prop-types-in-prod
        module.exports = require$$2();
    }
});

var PropTypes = propTypes;

var l =
    "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
function s(e, r) {
    return e((r = { exports: {} }), r.exports), r.exports;
}
var f = s(function (e) {
        !(function (r) {
            var t = function (e, r, n) {
                    if (!i(r) || s(r) || f(r) || p(r) || u(r)) return r;
                    var o,
                        a = 0,
                        c = 0;
                    if (l(r)) for (o = [], c = r.length; a < c; a++) o.push(t(e, r[a], n));
                    else
                        for (var d in ((o = {}), r))
                            Object.prototype.hasOwnProperty.call(r, d) && (o[e(d, n)] = t(e, r[d], n));
                    return o;
                },
                n = function (e) {
                    return d(e)
                        ? e
                        : (e = e.replace(/[\-_\s]+(.)?/g, function (e, r) {
                              return r ? r.toUpperCase() : "";
                          }))
                              .substr(0, 1)
                              .toLowerCase() + e.substr(1);
                },
                o = function (e) {
                    var r = n(e);
                    return r.substr(0, 1).toUpperCase() + r.substr(1);
                },
                a = function (e, r) {
                    return (function (e, r) {
                        var t = (r = r || {}).separator || "_",
                            n = r.split || /(?=[A-Z])/;
                        return e.split(n).join(t);
                    })(e, r).toLowerCase();
                },
                c = Object.prototype.toString,
                u = function (e) {
                    return "function" == typeof e;
                },
                i = function (e) {
                    return e === Object(e);
                },
                l = function (e) {
                    return "[object Array]" == c.call(e);
                },
                s = function (e) {
                    return "[object Date]" == c.call(e);
                },
                f = function (e) {
                    return "[object RegExp]" == c.call(e);
                },
                p = function (e) {
                    return "[object Boolean]" == c.call(e);
                },
                d = function (e) {
                    return (e -= 0) == e;
                },
                y = function (e, r) {
                    var t = r && "process" in r ? r.process : r;
                    return "function" != typeof t
                        ? e
                        : function (r, n) {
                              return t(r, e, n);
                          };
                },
                h = {
                    camelize: n,
                    decamelize: a,
                    pascalize: o,
                    depascalize: a,
                    camelizeKeys: function (e, r) {
                        return t(y(n, r), e);
                    },
                    decamelizeKeys: function (e, r) {
                        return t(y(a, r), e, r);
                    },
                    pascalizeKeys: function (e, r) {
                        return t(y(o, r), e);
                    },
                    depascalizeKeys: function () {
                        return this.decamelizeKeys.apply(this, arguments);
                    },
                };
            e.exports ? (e.exports = h) : (r.humps = h);
        })(l);
    }).decamelize,
    p = s(function (e) {
        function r() {
            return (
                (e.exports = r =
                    Object.assign ||
                    function (e) {
                        for (var r = 1; r < arguments.length; r++) {
                            var t = arguments[r];
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                        }
                        return e;
                    }),
                r.apply(this, arguments)
            );
        }
        e.exports = r;
    });
var d = function (e) {
    if (Array.isArray(e)) return e;
};
var y = function (e, r) {
    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var t = [],
            n = !0,
            o = !1,
            a = void 0;
        try {
            for (
                var c, u = e[Symbol.iterator]();
                !(n = (c = u.next()).done) && (t.push(c.value), !r || t.length !== r);
                n = !0
            );
        } catch (e) {
            (o = !0), (a = e);
        } finally {
            try {
                n || null == u.return || u.return();
            } finally {
                if (o) throw a;
            }
        }
        return t;
    }
};
var h = function (e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t];
    return n;
};
var v = function (e, r) {
    if (e) {
        if ("string" == typeof e) return h(e, r);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        return (
            "Object" === t && e.constructor && (t = e.constructor.name),
            "Map" === t || "Set" === t
                ? Array.from(e)
                : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                ? h(e, r)
                : void 0
        );
    }
};
var m = function () {
    throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
};
var b = function (e, r) {
    return d(e) || y(e, r) || v(e, r) || m();
};
var g = function (e, r) {
    if (null == e) return {};
    var t,
        n,
        o = {},
        a = Object.keys(e);
    for (n = 0; n < a.length; n++) (t = a[n]), r.indexOf(t) >= 0 || (o[t] = e[t]);
    return o;
};
var S = function (e, r) {
    if (null == e) return {};
    var t,
        n,
        o = g(e, r);
    if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (n = 0; n < a.length; n++)
            (t = a[n]), r.indexOf(t) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, t) && (o[t] = e[t]));
    }
    return o;
};
var w = React.createContext(null);
function O(e) {
    var r = e.root,
        t = e.children;
    return reactDom.createPortal(t, r);
}
function j(n) {
    var c = React.forwardRef(function (o, c) {
        var u,
            i,
            l = o.mode,
            s = o.delegatesFocus,
            f = o.styleSheets,
            d = o.ssr,
            y = o.children,
            h = S(o, ["mode", "delegatesFocus", "styleSheets", "ssr", "children"]),
            v =
                ((i = React.useRef((u = c) && u.current)),
                React.useEffect(
                    function () {
                        u && (u.current = i.current);
                    },
                    [u]
                ),
                i),
            m = React.useState(null),
            g = b(m, 2),
            j = g[0],
            x = g[1],
            z = "node_".concat(l).concat(s);
        return (
            React.useEffect(
                function () {
                    if (v.current)
                        try {
                            if (("function" == typeof c && c(v.current), d)) {
                                var e = v.current.shadowRoot;
                                return void x(e);
                            }
                            var r = v.current.attachShadow({ mode: l, delegatesFocus: s });
                            f.length > 0 && (r.adoptedStyleSheets = f), x(r);
                        } catch (e) {
                            !(function (e) {
                                var r = e.error,
                                    t = e.styleSheets,
                                    n = e.root;
                                switch (r.name) {
                                    case "NotSupportedError":
                                        t.length > 0 && (n.adoptedStyleSheets = t);
                                        break;
                                    default:
                                        throw r;
                                }
                            })({ error: e, styleSheets: f, root: j });
                        }
                },
                [c, v, f]
            ),
            React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    n.tag,
                    p({ key: z, ref: v }, h),
                    (j || d) &&
                        React.createElement(
                            w.Provider,
                            { value: j },
                            d
                                ? React.createElement(
                                      "template",
                                      { shadowroot: "open" },
                                      n.render({ root: j, ssr: d, children: y })
                                  )
                                : React.createElement(O, { root: j }, n.render({ root: j, ssr: d, children: y }))
                        )
                )
            )
        );
    });
    return (
        (c.propTypes = {
            mode: PropTypes.oneOf(["open", "closed"]),
            delegatesFocus: PropTypes.bool,
            styleSheets: PropTypes.arrayOf(PropTypes.instanceOf(globalThis.CSSStyleSheet)),
            ssr: PropTypes.bool,
            children: PropTypes.node,
        }),
        (c.defaultProps = { mode: "open", delegatesFocus: !1, styleSheets: [], ssr: !1, children: null }),
        c
    );
}
(O.propTypes = { root: PropTypes.object.isRequired, children: PropTypes.node }), (O.defaultProps = { children: null });
var x = new Map();
function E() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "core",
        t =
            arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : function (e) {
                      return e.children;
                  };
    return new Proxy(e, {
        get: function (e, n) {
            var o = f(n, { separator: "-" }),
                a = "".concat(r, "-").concat(o);
            return x.has(a) || x.set(a, j({ tag: o, render: t })), x.get(a);
        },
    });
}
var A = E();

/*
 * Component.
 */
var ErrorBoundary = /** @class */ (function (_super) {
    assets.__extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function () {
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        console.info(error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return jsxRuntime.jsx(React.Fragment, {});
        }
        return this.props.children;
    };
    return ErrorBoundary;
})(React.Component);

function FeatureWrapper(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom,
        defaultStore = _a.defaultStore;
    var st = authRecipe.SuperTokens.getInstanceOrThrow();
    return jsxRuntime.jsx(ErrorBoundary, {
        children: jsxRuntime.jsx(
            translationContext.TranslationContextProvider,
            assets.__assign(
                {
                    defaultLanguage: st.languageTranslations.defaultLanguage,
                    defaultStore: authRecipe.mergeObjects(defaultStore, st.languageTranslations.userTranslationStore),
                    translationControlEventSource: st.languageTranslations.translationEventSource,
                    userTranslationFunc: st.languageTranslations.userTranslationFunc,
                },
                {
                    children: jsxRuntime.jsx(
                        WithOrWithoutShadowDom,
                        assets.__assign({ useShadowDom: useShadowDom }, { children: children })
                    ),
                }
            )
        ),
    });
}
function WithOrWithoutShadowDom(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom;
    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return jsxRuntime.jsx(
            "div",
            assets.__assign({ id: authRecipe.ST_ROOT_ID }, { children: jsxRuntime.jsx(DisableAutoFillInput, {}) })
        );
    }
    // Otherwise, use shadow dom.
    return jsxRuntime.jsxs(
        A.div,
        assets.__assign(
            { id: authRecipe.ST_ROOT_ID },
            { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] }
        )
    );
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return jsxRuntime.jsx(
        "style",
        assets.__assign(
            { type: "text/css" },
            {
                children:
                    "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}

var defaultTranslationsCommon = {
    en: {
        BRANDING_POWERED_BY_START: "Powered by ",
        BRANDING_POWERED_BY_END: "",
        SOMETHING_WENT_WRONG_ERROR: "Something went wrong. Please try again.",
    },
};

var version = authRecipe.createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.supported_fdi = exports.package_version = void 0;
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
    exports.package_version = "0.3.0";
    exports.supported_fdi = ["1.15"];
});

authRecipe.unwrapExports(version);
version.supported_fdi;
version.package_version;

var querier = authRecipe.createCommonjsModule(function (module, exports) {
    var __assign =
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__assign) ||
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
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__awaiter) ||
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
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__generator) ||
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

    /**
     * When network calls are made the Querier calls .clone() on the response before:
     * 1. Calling the post API hook
     * 2. Calling .json() when trying to read the body
     *
     * This is because the SDK needs to read the json body but we also want to allow users to read
     * the json body themselves (either in the post api hook or from the result of recipe functions)
     * for custom response handling. Since the body can only be read once we use .clone() to allow
     * for multiple reads.
     */
    var Querier = /** @class */ (function () {
        function Querier(recipeId, appInfo) {
            var _this = this;
            this.get = function (path, config, queryParams, preAPIHook, postAPIHook) {
                return __awaiter(_this, void 0, void 0, function () {
                    var result, jsonBody;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    this.fetch(
                                        this.getFullUrl(path, queryParams),
                                        __assign({ method: "GET" }, config),
                                        preAPIHook,
                                        postAPIHook
                                    ),
                                ];
                            case 1:
                                result = _b.sent();
                                return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                            case 2:
                                jsonBody = _b.sent();
                                return [
                                    2 /*return*/,
                                    {
                                        jsonBody: jsonBody,
                                        fetchResponse: result,
                                    },
                                ];
                        }
                    });
                });
            };
            this.post = function (path, config, preAPIHook, postAPIHook) {
                return __awaiter(_this, void 0, void 0, function () {
                    var result, jsonBody;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (config.body === undefined) {
                                    throw new Error("Post request must have a body");
                                }
                                return [
                                    4 /*yield*/,
                                    this.fetch(
                                        this.getFullUrl(path),
                                        __assign({ method: "POST" }, config),
                                        preAPIHook,
                                        postAPIHook
                                    ),
                                ];
                            case 1:
                                result = _b.sent();
                                return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                            case 2:
                                jsonBody = _b.sent();
                                return [
                                    2 /*return*/,
                                    {
                                        jsonBody: jsonBody,
                                        fetchResponse: result,
                                    },
                                ];
                        }
                    });
                });
            };
            this.delete = function (path, config, preAPIHook, postAPIHook) {
                return __awaiter(_this, void 0, void 0, function () {
                    var result, jsonBody;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    this.fetch(
                                        this.getFullUrl(path),
                                        __assign({ method: "DELETE" }, config),
                                        preAPIHook,
                                        postAPIHook
                                    ),
                                ];
                            case 1:
                                result = _b.sent();
                                return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                            case 2:
                                jsonBody = _b.sent();
                                return [
                                    2 /*return*/,
                                    {
                                        jsonBody: jsonBody,
                                        fetchResponse: result,
                                    },
                                ];
                        }
                    });
                });
            };
            this.put = function (path, config, preAPIHook, postAPIHook) {
                return __awaiter(_this, void 0, void 0, function () {
                    var result, jsonBody;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    this.fetch(
                                        this.getFullUrl(path),
                                        __assign({ method: "PUT" }, config),
                                        preAPIHook,
                                        postAPIHook
                                    ),
                                ];
                            case 1:
                                result = _b.sent();
                                return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                            case 2:
                                jsonBody = _b.sent();
                                return [
                                    2 /*return*/,
                                    {
                                        jsonBody: jsonBody,
                                        fetchResponse: result,
                                    },
                                ];
                        }
                    });
                });
            };
            this.fetch = function (url, config, preAPIHook, postAPIHook) {
                return __awaiter(_this, void 0, void 0, function () {
                    var headers, _b, requestInit, modifiedUrl, result, reponseForPostAPI;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (config === undefined) {
                                    headers = {};
                                } else {
                                    headers = config.headers;
                                }
                                return [
                                    4 /*yield*/,
                                    this.callPreAPIHook({
                                        preAPIHook: preAPIHook,
                                        url: url,
                                        requestInit: __assign(__assign({}, config), {
                                            headers: __assign(__assign({}, headers), {
                                                "fdi-version": version.supported_fdi.join(","),
                                                "Content-Type": "application/json",
                                                rid: this.recipeId,
                                            }),
                                        }),
                                    }),
                                ];
                            case 1:
                                (_b = _c.sent()), (requestInit = _b.requestInit), (modifiedUrl = _b.url);
                                return [4 /*yield*/, fetch(modifiedUrl, requestInit)];
                            case 2:
                                result = _c.sent();
                                if (result.status >= 300) {
                                    throw result;
                                }
                                if (!(postAPIHook !== undefined)) return [3 /*break*/, 4];
                                reponseForPostAPI = result.clone();
                                return [
                                    4 /*yield*/,
                                    postAPIHook({
                                        requestInit: requestInit,
                                        url: url,
                                        fetchResponse: reponseForPostAPI,
                                    }),
                                ];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            /*
             * For backward compatibility
             */
            this.callPreAPIHook = function (context) {
                return __awaiter(_this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (context.preAPIHook === undefined) {
                                    return [
                                        2 /*return*/,
                                        {
                                            url: context.url,
                                            requestInit: context.requestInit,
                                        },
                                    ];
                                }
                                return [
                                    4 /*yield*/,
                                    context.preAPIHook({
                                        url: context.url,
                                        requestInit: context.requestInit,
                                    }),
                                ];
                            case 1:
                                result = _b.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            this.getFullUrl = function (pathStr, queryParams) {
                var path = new authRecipe.normalisedURLPath.default(pathStr);
                var fullUrl = ""
                    .concat(_this.appInfo.apiDomain.getAsStringDangerous())
                    .concat(_this.appInfo.apiBasePath.getAsStringDangerous())
                    .concat(path.getAsStringDangerous());
                if (queryParams === undefined) {
                    return fullUrl;
                }
                // If query params, add.
                return fullUrl + "?" + new URLSearchParams(queryParams);
            };
            this.getResponseJsonOrThrowGeneralError = function (response) {
                return __awaiter(_this, void 0, void 0, function () {
                    var json, message;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [4 /*yield*/, response.clone().json()];
                            case 1:
                                json = _b.sent();
                                if (json.status === "GENERAL_ERROR") {
                                    message = json.message === undefined ? "No Error Message Provided" : json.message;
                                    throw new error$1.default(message);
                                }
                                return [2 /*return*/, json];
                        }
                    });
                });
            };
            this.recipeId = recipeId;
            this.appInfo = appInfo;
        }
        var _a;
        _a = Querier;
        Querier.preparePreAPIHook = function (_b) {
            var recipePreAPIHook = _b.recipePreAPIHook,
                action = _b.action,
                options = _b.options,
                userContext = _b.userContext;
            return function (context) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var postRecipeHookContext;
                    return __generator(_a, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    recipePreAPIHook(
                                        __assign(__assign({}, context), { action: action, userContext: userContext })
                                    ),
                                ];
                            case 1:
                                postRecipeHookContext = _b.sent();
                                if (options === undefined || options.preAPIHook === undefined) {
                                    return [2 /*return*/, postRecipeHookContext];
                                }
                                return [
                                    2 /*return*/,
                                    options.preAPIHook({
                                        url: postRecipeHookContext.url,
                                        requestInit: postRecipeHookContext.requestInit,
                                        userContext: userContext,
                                    }),
                                ];
                        }
                    });
                });
            };
        };
        Querier.preparePostAPIHook = function (_b) {
            var recipePostAPIHook = _b.recipePostAPIHook,
                action = _b.action,
                userContext = _b.userContext;
            return function (context) {
                return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(_a, function (_b) {
                        switch (_b.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    recipePostAPIHook(
                                        __assign(__assign({}, context), { userContext: userContext, action: action })
                                    ),
                                ];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
        };
        return Querier;
    })();
    exports.default = Querier;
});

authRecipe.unwrapExports(querier);

exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.GeneralError = GeneralError;
exports.PropTypes = PropTypes;
exports.STGeneralError = STGeneralError;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.error = error$1;
exports.hasFontDefined = hasFontDefined;
exports.querier = querier;
exports.reactIs = reactIs;
exports.withOverride = withOverride;
//# sourceMappingURL=querier.js.map
