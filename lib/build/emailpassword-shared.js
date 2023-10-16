"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var translationContext = require("./translationContext.js");

function GeneralError(_a) {
    var error = _a.error;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign({ "data-supertokens": "generalError" }, { children: t(error) })
    );
}

exports.GeneralError = GeneralError;
