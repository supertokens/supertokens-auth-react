"use strict";

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var translationContext = require("./translationContext.js");

function SuperTokensBranding() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "a",
        assets.__assign(
            {
                "data-supertokens": "superTokensBranding",
                href: "https://supertokens.com?utm_campaign=poweredby",
                target: "_blank",
            },
            {
                children: [
                    t("BRANDING_POWERED_BY_START"),
                    jsxRuntime.jsx("strong", { children: "SuperTokens" }),
                    t("BRANDING_POWERED_BY_END"),
                ],
            }
        )
    );
}

exports.SuperTokensBranding = SuperTokensBranding;
//# sourceMappingURL=SuperTokensBranding.js.map
