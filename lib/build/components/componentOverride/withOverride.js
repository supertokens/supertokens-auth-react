"use strict";
var __assign =
    (this && this.__assign) ||
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
exports.withOverride = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var useComponentOverride_1 = require("./useComponentOverride");
var withOverride = function (overrideKey, DefaultComponent) {
    var finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return function (props) {
        var OverrideComponent = (0, useComponentOverride_1.useComponentOverride)(finalKey);
        if (OverrideComponent !== null) {
            return (0, jsx_runtime_1.jsx)(OverrideComponent, __assign({ DefaultComponent: DefaultComponent }, props));
        }
        return (0, jsx_runtime_1.jsx)(DefaultComponent, __assign({}, props));
    };
};
exports.withOverride = withOverride;
