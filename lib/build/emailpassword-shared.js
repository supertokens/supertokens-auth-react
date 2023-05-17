"use strict";

var uiEntry = require("./superTokens.js");
var jsxRuntime = require("react/jsx-runtime");

function GeneralError(_a) {
    var error = _a.error;
    var t = uiEntry.useTranslation();
    return jsxRuntime.jsx("div", uiEntry.__assign({ "data-supertokens": "generalError" }, { children: t(error) }));
}

exports.GeneralError = GeneralError;
//# sourceMappingURL=emailpassword-shared.js.map
