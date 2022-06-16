"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOverride = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var useComponentOverride_1 = require("./useComponentOverride");
var withOverride = function (overrideKey, DefaultComponent) {
    var finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return function (props) {
        var OverrideComponent = (0, useComponentOverride_1.useComponentOverride)(finalKey);
        if (OverrideComponent !== null) {
            return (0, jsx_runtime_1.jsx)(
                OverrideComponent,
                tslib_1.__assign({ DefaultComponent: DefaultComponent }, props)
            );
        }
        return (0, jsx_runtime_1.jsx)(DefaultComponent, tslib_1.__assign({}, props));
    };
};
exports.withOverride = withOverride;
