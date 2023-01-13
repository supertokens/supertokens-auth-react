"use strict";

var jsxRuntime = require("react/jsx-runtime");
require("./index.js");
var translationContext = require("./translationContext.js");

/*
 * Component.
 */
function Button({ type, label, disabled, isLoading, onClick }) {
    const t = translationContext.useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    return jsxRuntime.jsxs(
        "button",
        Object.assign(
            { type: type, disabled: disabled, onClick: onClick, "data-supertokens": "button" },
            { children: [t(label), isLoading && "..."] }
        )
    );
}

exports.Button = Button;
//# sourceMappingURL=emailpassword-shared.js.map
