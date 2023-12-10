"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var translationContext = require("./translationContext.js");

function SuperTokensBranding() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "a",
        genericComponentOverrideContext.__assign(
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
