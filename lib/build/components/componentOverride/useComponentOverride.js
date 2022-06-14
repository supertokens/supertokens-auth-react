"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComponentOverride = void 0;
var react_1 = require("react");
var componentOverrideContext_1 = require("./componentOverrideContext");
var useComponentOverride = function (overrideKey) {
    var ctx = (0, react_1.useContext)(componentOverrideContext_1.ComponentOverrideContext);
    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }
    var OverrideComponent = ctx[overrideKey];
    return OverrideComponent === undefined ? null : OverrideComponent;
};
exports.useComponentOverride = useComponentOverride;
