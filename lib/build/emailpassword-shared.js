"use strict";

var utils = require("./utils.js");
var jsxRuntime = require("react/jsx-runtime");
var recipe = require("./session-shared2.js");

function GeneralError(_a) {
    var error = _a.error;
    var t = recipe.useTranslation();
    return jsxRuntime.jsx("div", utils.__assign({ "data-supertokens": "generalError" }, { children: t(error) }));
}

exports.GeneralError = GeneralError;
//# sourceMappingURL=emailpassword-shared.js.map
