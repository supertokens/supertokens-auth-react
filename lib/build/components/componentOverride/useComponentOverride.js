"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var componentOverrideContext_1 = require("./componentOverrideContext");
exports.useComponentOverride = function (overrideKey) {
    var ctx = react_1.useContext(componentOverrideContext_1.ComponentOverrideContext);
    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }
    var OverrideComponent = ctx[overrideKey];
    return OverrideComponent === undefined ? null : OverrideComponent;
};
//# sourceMappingURL=useComponentOverride.js.map
