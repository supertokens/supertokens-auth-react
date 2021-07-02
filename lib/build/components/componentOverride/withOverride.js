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
var react_2 = require("react");
var componentOverrideContext_1 = require("./componentOverrideContext");
exports.withOverride = function (overrideKey, DefaultComponent) {
    return function (props) {
        var ctx = react_2.useContext(componentOverrideContext_1.ComponentOverrideContext);
        if (ctx === "IS_DEFAULT") {
            throw new Error("Using withOverride HOC without a parent Provider");
        }
        var OverrideComponentFactory = ctx[overrideKey];
        if (OverrideComponentFactory === undefined) {
            return react_1.jsx(DefaultComponent, __assign({}, props));
        }
        var OverrideComponent = OverrideComponentFactory(DefaultComponent);
        return react_1.jsx(OverrideComponent, __assign({ key: "withOverride_OverrideComponent" }, props));
    };
};
//# sourceMappingURL=withOverride.js.map
