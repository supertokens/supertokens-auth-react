"use strict";

var uiEntry = require("./superTokens.js");
var jsxRuntime = require("react/jsx-runtime");
require("./index.js");

/*
 * Component.
 */
function Button(_a) {
    var type = _a.type,
        label = _a.label,
        disabled = _a.disabled,
        isLoading = _a.isLoading,
        onClick = _a.onClick;
    var t = uiEntry.useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    return jsxRuntime.jsxs(
        "button",
        uiEntry.__assign(
            { type: type, disabled: disabled, onClick: onClick, "data-supertokens": "button" },
            { children: [t(label), isLoading && "..."] }
        )
    );
}

exports.Button = Button;
//# sourceMappingURL=emailpassword-shared2.js.map
