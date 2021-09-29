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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var useComponentOverride_1 = require("./useComponentOverride");
exports.withOverride = function (overrideKey, DefaultComponent) {
    return function (props) {
        var OverrideComponent = useComponentOverride_1.useComponentOverride(overrideKey);
        if (OverrideComponent !== null) {
            return react_1.jsx(OverrideComponent, __assign({ DefaultComponent: DefaultComponent }, props));
        }
        return react_1.jsx(DefaultComponent, __assign({}, props));
    };
};
