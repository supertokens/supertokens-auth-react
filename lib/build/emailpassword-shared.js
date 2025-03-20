"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
require("./index2.js");
var translationContext = require("./translationContext.js");

/*
 * Component.
 */
function Button(_a) {
    var type = _a.type,
        label = _a.label,
        disabled = _a.disabled,
        isLoading = _a.isLoading,
        onClick = _a.onClick,
        isGreyedOut = _a.isGreyedOut,
        icon = _a.icon;
    var t = translationContext.useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    // Determine the data-supertokens attribute
    var dataSupertokens = "button";
    if (isGreyedOut) {
        dataSupertokens += " buttonGreyedOut";
    }
    if (icon) {
        dataSupertokens += " buttonWithIcon";
    }
    return jsxRuntime.jsxs(
        "button",
        genericComponentOverrideContext.__assign(
            { type: type, disabled: disabled, onClick: onClick, "data-supertokens": dataSupertokens },
            {
                children: [
                    icon && jsxRuntime.jsx("div", { children: icon() }),
                    jsxRuntime.jsxs("div", { children: [t(label), isLoading && "..."] }),
                ],
            }
        )
    );
}

exports.Button = Button;
