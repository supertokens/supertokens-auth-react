"use strict";

var session = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var React = require("react");

function SuperTokensBranding() {
    var t = session.useTranslation();
    return jsxRuntime.jsxs(
        "a",
        session.__assign(
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

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var AuthRecipe = /** @class */ (function (_super) {
    session.__extends(AuthRecipe, _super);
    function AuthRecipe(config) {
        var _this = _super.call(this, config) || this;
        _this.getAuthRecipeDefaultRedirectionURL = function (context) {
            return session.__awaiter(_this, void 0, void 0, function () {
                return session.__generator(this, function (_a) {
                    if (context.action === "SUCCESS") {
                        return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                    } else {
                        throw new Error("Should never come here");
                    }
                });
            });
        };
        _this.signOut = function (input) {
            return session.__awaiter(_this, void 0, void 0, function () {
                return session.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                session.Session.getInstanceOrThrow().signOut({
                                    userContext: session.getNormalisedUserContext(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return session.__awaiter(_this, void 0, void 0, function () {
                return session.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                session.Session.getInstanceOrThrow().doesSessionExist({
                                    userContext: session.getNormalisedUserContext(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var session$1 = session.Session.getInstance();
            if (session$1 !== undefined) {
                session$1.addAuthRecipeRedirectionHandler(_this.config.recipeId, _this.redirect.bind(_this));
            }
        });
        return _this;
    }
    return AuthRecipe;
})(session.RecipeModule);

/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
var AuthWidgetWrapper = function (props) {
    return jsxRuntime.jsx(
        session.SessionAuth,
        session.__assign(
            { requireAuth: false, doRedirection: false },
            { children: jsxRuntime.jsx(Redirector, session.__assign({}, props)) }
        )
    );
};
var Redirector = function (props) {
    var sessionContext = React.useContext(session.SessionContext);
    var userContext = session.useUserContext();
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
                        void session.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: props.authRecipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    redirectToPath: session.getRedirectToPathFromURL(),
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

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
function normaliseAuthRecipe(config) {
    return session.normaliseRecipeModuleConfig(config);
}

exports.AuthRecipe = AuthRecipe;
exports.AuthWidgetWrapper = AuthWidgetWrapper;
exports.SuperTokensBranding = SuperTokensBranding;
exports.normaliseAuthRecipe = normaliseAuthRecipe;
//# sourceMappingURL=authRecipe-shared.js.map
