"use strict";

var utils = require("./utils.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

var createGenericComponentsOverrideContext = function (v) {
    if (v === void 0) {
        v = {};
    }
    var genericContext = React__default.default.createContext(v);
    var useComponentsOverrideContext = function () {
        return React__default.default.useContext(genericContext);
    };
    var Provider = function (_a) {
        var children = _a.children,
            components = _a.components;
        return jsxRuntime.jsx(genericContext.Provider, utils.__assign({ value: components }, { children: children }));
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

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

function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

var build = {};

var getProxyObject$1 = {};

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
Object.defineProperty(getProxyObject$1, "__esModule", { value: true });
getProxyObject$1.getProxyObject = void 0;
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
getProxyObject$1.getProxyObject = getProxyObject;

Object.defineProperty(build, "__esModule", { value: true });
exports.OverrideableBuilder_1 = build.OverrideableBuilder = void 0;
var getProxyObject_1 = getProxyObject$1;
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
exports.OverrideableBuilder_1 = build.OverrideableBuilder = OverrideableBuilder;
build.default = OverrideableBuilder;

exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
//# sourceMappingURL=index3.js.map
