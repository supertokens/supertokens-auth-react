"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @jsx jsx */
var react_1 = require("@emotion/react");
var useComponentOverride_1 = require("./useComponentOverride");
exports.withOverride = function (overrideKey, DefaultComponent) {
    var finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return function (props) {
        var OverrideComponent = useComponentOverride_1.useComponentOverride(finalKey);
        if (OverrideComponent !== null) {
            return react_1.jsx(OverrideComponent, tslib_1.__assign({ DefaultComponent: DefaultComponent }, props));
        }
        return react_1.jsx(DefaultComponent, tslib_1.__assign({}, props));
    };
};
