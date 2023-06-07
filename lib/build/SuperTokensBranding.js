"use strict";

var utils = require("./utils.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var userContextWrapper = require("./userContextWrapper.js");
var session = require("./session-shared3.js");
var recipe = require("./session-shared2.js");
var sessionAuth = require("./session-shared.js");
var translationContext = require("./translationContext.js");

/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
var AuthWidgetWrapper = function (props) {
    return jsxRuntime.jsx(
        session.SessionAuth,
        utils.__assign(
            { requireAuth: false, doRedirection: false },
            { children: jsxRuntime.jsx(Redirector, utils.__assign({}, props)) }
        )
    );
};
var Redirector = function (props) {
    var sessionContext = React.useContext(sessionAuth.SessionContext);
    var userContext = userContextWrapper.useUserContext();
    var _a = React.useState(false),
        alwaysShow = _a[0],
        updateAlwaysShow = _a[1];
    React.useEffect(
        function () {
            // we want to do this just once, so we supply it with only the loading state.
            // if we supply it with props, sessionContext, then once the user signs in, then this will route the
            // user to the dashboard, as opposed to the sign up / sign in functions.
            if (sessionContext.loading === false) {
                if (sessionContext.doesSessionExist) {
                    if (props.onSessionAlreadyExists !== undefined) {
                        props.onSessionAlreadyExists();
                    } else {
                        props.authRecipe.config.onHandleEvent({
                            action: "SESSION_ALREADY_EXISTS",
                        });
                        void recipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: props.authRecipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    redirectToPath: utils.getRedirectToPathFromURL(),
                                },
                            },
                            userContext,
                            props.history
                        );
                    }
                } else {
                    // this means even if a session exists, we will still show the children
                    // cause the child component will take care of redirecting etc..
                    updateAlwaysShow(true);
                }
            }
        },
        [sessionContext.loading]
    );
    if ((sessionContext.loading === true || sessionContext.doesSessionExist) && !alwaysShow) {
        return null;
    } else {
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: props.children });
    }
};

function SuperTokensBranding() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "a",
        utils.__assign(
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

exports.AuthWidgetWrapper = AuthWidgetWrapper;
exports.SuperTokensBranding = SuperTokensBranding;
