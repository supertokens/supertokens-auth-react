"use strict";

var thirdparty = require("./superTokens.js");
var jsxRuntime = require("react/jsx-runtime");

function GeneralError(_a) {
    var error = _a.error;
    var t = thirdparty.useTranslation();
    return jsxRuntime.jsx("div", thirdparty.__assign({ "data-supertokens": "generalError" }, { children: t(error) }));
}

exports.GeneralError = GeneralError;
