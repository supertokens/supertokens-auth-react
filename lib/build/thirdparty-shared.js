"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var authWidgetWrapper = require("./authRecipe-shared.js");
var translationContext = require("./translationContext.js");
var React = require("react");
var index = require("./index3.js");
var spinnerIcon = require("./spinnerIcon.js");
var recipe = require("./recipe.js");

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);

function ProviderButton(_a) {
    var logo = _a.logo,
        providerName = _a.providerName,
        displayName = _a.displayName;
    var t = translationContext.useTranslation();
    var providerStyleName = "provider".concat(providerName);
    return jsxRuntime.jsxs(
        "button",
        sessionAuth.__assign(
            { "data-supertokens": "button providerButton ".concat(providerStyleName) },
            {
                children: [
                    logo !== undefined &&
                        jsxRuntime.jsx(
                            "div",
                            sessionAuth.__assign(
                                { "data-supertokens": "providerButtonLeft" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "providerButtonLogo" },
                                            {
                                                children: jsxRuntime.jsx(
                                                    "div",
                                                    sessionAuth.__assign(
                                                        { "data-supertokens": "providerButtonLogoCenter" },
                                                        { children: logo }
                                                    )
                                                ),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "providerButtonText" },
                            {
                                children: [
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                    displayName,
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
}

/*
 * Imports.
 */
/*
 * Class.
 */
var Provider = /** @class */ (function () {
    /*
     * Constructor.
     */
    function Provider(config) {
        var _this = this;
        /*
         * State management.
         */
        this.generateState = function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return "".concat(1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        };
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
        this.getRedirectURL =
            config.getRedirectURL !== undefined
                ? config.getRedirectURL
                : function () {
                      return _this.defaultGetRedirectURL();
                  };
    }
    /*
     * Components.
     */
    Provider.prototype.getDefaultButton = function (name) {
        var providerName = name !== undefined ? name : this.name;
        return jsxRuntime.jsx(ProviderButton, {
            logo: this.getLogo(),
            providerName: providerName,
            displayName: this.name,
        });
    };
    Provider.prototype.defaultGetRedirectURL = function () {
        var domain = sessionAuth.SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new sessionAuth.NormalisedURLPath("/callback/".concat(this.id));
        var path = sessionAuth.SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    return Provider;
})();

/*
 * Class.
 */
var Custom = /** @class */ (function (_super) {
    sessionAuth.__extends(Custom, _super);
    /*
     * Constructor.
     */
    function Custom(config) {
        var _this = _super.call(this, config) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                if (typeof _this.buttonComponent === "function") {
                    return _this.buttonComponent();
                }
                return _this.buttonComponent;
            }
            return _this.getDefaultButton("Custom");
        };
        _this.getLogo = function () {
            return undefined;
        };
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Custom.init = function (config) {
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
        }
        return new Custom(config);
    };
    return Custom;
})(Provider);

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
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = sessionAuth.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return sessionAuth.__assign(sessionAuth.__assign({}, authWidgetWrapper.normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: oAuthCallbackScreen,
        override: override,
    });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var style = config.style !== undefined ? config.style : "";
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        disableDefaultUI: disableDefaultUI,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
        style: style,
        providers: providers,
    };
}
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.recipeImpl.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
function redirectToThirdPartyLogin$1(input) {
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        var provider, response;
        return sessionAuth.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = input.config.signInAndUpFeature.providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            providerId: input.thirdPartyId,
                            authorisationURL: provider.getRedirectURL(),
                            providerClientId: provider.clientId,
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    response = _a.sent();
                    sessionAuth.redirectWithFullPageReload(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
    });
}

var SignUpFooter = index.withOverride("ThirdPartySignUpFooter", function ThirdPartySignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var t = translationContext.useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
            {
                children: [
                    t("THIRD_PARTY_SIGN_IN_UP_FOOTER_START"),
                    termsOfServiceLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            sessionAuth.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: termsOfServiceLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS") }
                            )
                        ),
                    termsOfServiceLink !== undefined &&
                        privacyPolicyLink !== undefined &&
                        t("THIRD_PARTY_SIGN_IN_UP_FOOTER_AND"),
                    privacyPolicyLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            sessionAuth.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: privacyPolicyLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_PP") }
                            )
                        ),
                    t("THIRD_PARTY_SIGN_IN_UP_FOOTER_END"),
                ],
            }
        )
    );
});

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: white;\n    --palette-inputBackground: #fafafa;\n    --palette-inputBorder: #fafafa;\n    --palette-selectedBackground: #eeeeee;\n    --palette-primary: #ff9b33;\n    --palette-primaryBorder: #ee8d23;\n    --palette-success: #41a700;\n    --palette-error: #ff1717;\n    --palette-textTitle: #222222;\n    --palette-textLabel: #222222;\n    --palette-textInput: #222222;\n    --palette-textPrimary: #656565;\n    --palette-textLink: #0076ff;\n    --palette-buttonText: white;\n    --palette-superTokensBrandingBackground: #f2f5f6;\n    --palette-superTokensBrandingText: #adbdc4;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: Rubik, sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: var(--palette-background);\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: var(--palette-superTokensBrandingBackground);\n    color: var(--palette-superTokensBrandingText);\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: var(--palette-error-bg);\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: var(--palette-error);\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: var(--palette-textTitle);\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: var(--palette-textLink);\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: var(--palette-textLabel);\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: var(--palette-textPrimary);\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: var(--palette-success);\n    font-size: var(--font-size-1);\n    background: var(--palette-success-bg);\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: var(--palette-error);\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: var(--palette-primary);\n    color: var(--palette-buttonText);\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: var(--palette-primaryBorder);\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(1.1);\n            filter: brightness(1.1);\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    height: auto !important;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 34px;\n    display: flex;\n    flex-direction: row;\n    padding: 2px 0;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 40px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n    border-right: 1px solid rgba(255, 255, 255, 0.6);\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    margin: auto;\n    text-align: center;\n    justify-content: center;\n}\n[data-supertokens~="providerGoogle"] {\n    background-color: #ea3721;\n    border-color: #d82313;\n    color: white;\n}\n[data-supertokens~="providerGitHub"] {\n    background-color: #000;\n    border-color: #000;\n    color: white;\n}\n[data-supertokens~="providerTwitter"] {\n    background-color: #274483;\n    border-color: #143875;\n    color: white;\n}\n[data-supertokens~="providerFacebook"] {\n    background-color: #008dd1;\n    border-color: #007fc2;\n    color: white;\n}\n[data-supertokens~="providerApple"] {\n    background-color: #07093c;\n    border-color: #010030;\n    color: white;\n}\n[data-supertokens~="providerCustom"] {\n    background-color: #000;\n    border-color: #000;\n    color: white;\n}\n[data-supertokens~="providerCustom"]:active {\n    outline: none;\n    background-color: #fafafa;\n    border-color: #eaeaea;\n    transition: background 0s;\n    background-size: 100%;\n}\n[data-supertokens~="providerCustom"]:focus {\n    border-color: #000;\n    outline: none;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles,
        loadDefaultFont = _a.loadDefaultFont;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                jsxRuntime.jsx("link", {
                    href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
            jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] }),
        ],
    });
};

var ThirdPartySignInAndUpProvidersForm = function (props) {
    var userContext = sessionAuth.useUserContext();
    var signInClick = function (providerId) {
        return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
            var response, generalError, e_1;
            return sessionAuth.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        response = void 0;
                        generalError = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [
                            4 /*yield*/,
                            redirectToThirdPartyLogin$1({
                                recipeImplementation: props.recipeImplementation,
                                thirdPartyId: providerId,
                                config: props.config,
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (index.STGeneralError.isThisError(e_1)) {
                            generalError = e_1;
                        } else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (generalError !== undefined) {
                            props.dispatch({
                                type: "setError",
                                error: generalError.message,
                            });
                        } else {
                            if (response === undefined) {
                                throw new Error("Should not come here");
                            }
                            if (response.status === "ERROR") {
                                props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _a.sent();
                        props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                        return [3 /*break*/, 6];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    return jsxRuntime.jsx(React.Fragment, {
        children: props.providers.map(function (provider) {
            return jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "providerContainer" },
                    {
                        children: jsxRuntime.jsx(
                            "span",
                            sessionAuth.__assign(
                                {
                                    onClick: function () {
                                        return signInClick(provider.id);
                                    },
                                },
                                { children: provider.buttonComponent }
                            )
                        ),
                    }
                ),
                "provider-".concat(provider.id)
            );
        }),
    });
};
var ProvidersForm = index.withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);

var SignInAndUpHeader = index.withOverride("ThirdPartySignInAndUpHeader", function ThirdPartySignInAndUpHeader() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "headerTitle" },
            { children: t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE") }
        )
    );
});

var SignInAndUpTheme = function (props) {
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInAndUpHeader, {}),
                                    jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                    props.featureState.error &&
                                        jsxRuntime.jsx(index.GeneralError, { error: props.featureState.error }),
                                    jsxRuntime.jsx(ProvidersForm, sessionAuth.__assign({}, props)),
                                    jsxRuntime.jsx(SignUpFooter, {
                                        privacyPolicyLink: props.config.signInAndUpFeature.privacyPolicyLink,
                                        termsOfServiceLink: props.config.signInAndUpFeature.termsOfServiceLink,
                                    }),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(authWidgetWrapper.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
var SignInAndUpThemeWrapper = function (props) {
    var hasFont = index.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        sessionAuth.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    sessionAuth.__assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style],
                        },
                        { children: jsxRuntime.jsx(SignInAndUpTheme, sessionAuth.__assign({}, props)) }
                    )
                ),
            }
        )
    );
};

var defaultTranslationsThirdParty = {
    en: sessionAuth.__assign(sessionAuth.__assign({}, index.defaultTranslationsCommon.en), {
        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
        THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
    }),
};

var useFeatureReducer = function () {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setError":
                    return sessionAuth.__assign(sessionAuth.__assign({}, oldState), { error: action.error });
                default:
                    return oldState;
            }
        },
        {},
        function () {
            var error = undefined;
            var errorQueryParam = sessionAuth.getQueryParams("error");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "no_email_present") {
                    error = "THIRD_PARTY_ERROR_NO_EMAIL";
                } else {
                    var customError = sessionAuth.getQueryParams("message");
                    if (customError === null) {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else {
                        error = customError;
                    }
                }
            }
            return {
                error: error,
            };
        }
    );
};
function useChildProps(recipe) {
    var recipeImplementation = React.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl);
        },
        [recipe]
    );
    return React.useMemo(
        function () {
            if (!recipe || !recipeImplementation) {
                return undefined;
            }
            var providers = recipe.config.signInAndUpFeature.providers.map(function (provider) {
                return {
                    id: provider.id,
                    buttonComponent: provider.getButton(),
                };
            });
            return {
                providers: providers,
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                recipe: recipe,
            };
        },
        [recipe]
    );
}
var SignInAndUpFeature = function (props) {
    var _a = useFeatureReducer(),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe);
    var componentOverrides = props.recipe.config.override.components;
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    sessionAuth.__assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            SignInAndUpThemeWrapper,
                                            sessionAuth.__assign({}, childProps, {
                                                featureState: state,
                                                dispatch: dispatch,
                                            })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    sessionAuth.__assign(sessionAuth.__assign({}, childProps), {
                                                        featureState: state,
                                                        dispatch: dispatch,
                                                    })
                                                );
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};
var getModifiedRecipeImplementation = function (origImpl) {
    return sessionAuth.__assign({}, origImpl);
};

/*
 * Component.
 */
var ThirdPartySignInAndUpCallbackTheme = /** @class */ (function (_super) {
    sessionAuth.__extends(ThirdPartySignInAndUpCallbackTheme, _super);
    function ThirdPartySignInAndUpCallbackTheme() {
        /*
         * Methods.
         */
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.render = function () {
            return jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "container" },
                    {
                        children: jsxRuntime.jsx(
                            "div",
                            sessionAuth.__assign(
                                { "data-supertokens": "row" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "spinner" },
                                            { children: jsxRuntime.jsx(spinnerIcon.SpinnerIcon, {}) }
                                        )
                                    ),
                                }
                            )
                        ),
                    }
                )
            );
        };
        return _this;
    }
    return ThirdPartySignInAndUpCallbackTheme;
})(React.PureComponent);
var SignInAndUpCallbackTheme = index.withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);

var SignInAndUpCallback$1 = function (props) {
    var userContext = sessionAuth.useUserContext();
    var verifyCode = React.useCallback(
        function () {
            return props.recipe.recipeImpl.signInAndUp({
                userContext: userContext,
            });
        },
        [props.recipe, props.history, userContext]
    );
    var handleVerifyResponse = React.useCallback(
        function (response) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var stateResponse, redirectToPath;
                return sessionAuth.__generator(this, function (_a) {
                    if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                        return [
                            2 /*return*/,
                            sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                history: props.history,
                                queryParams: {
                                    error: "no_email_present",
                                },
                                redirectBack: false,
                            }),
                        ];
                    }
                    if (response.status === "OK") {
                        stateResponse = props.recipe.recipeImpl.getStateAndOtherInfoFromStorage({
                            userContext: userContext,
                        });
                        redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                        return [
                            2 /*return*/,
                            sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                {
                                    rid: props.recipe.config.recipeId,
                                    successRedirectContext: {
                                        action: "SUCCESS",
                                        isNewUser: response.createdNewUser,
                                        redirectToPath: redirectToPath,
                                    },
                                },
                                userContext,
                                props.history
                            ),
                        ];
                    }
                    return [2 /*return*/];
                });
            });
        },
        [props.recipe, props.history, userContext]
    );
    var handleError = React.useCallback(
        function (err) {
            if (index.STGeneralError.isThisError(err)) {
                return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                });
            }
            return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                history: props.history,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
            });
        },
        [props.recipe, props.history]
    );
    sessionAuth.useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);
    var componentOverrides = props.recipe.config.override.components;
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    sessionAuth.__assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined && jsxRuntime.jsx(SignInAndUpCallbackTheme, {}),
                                    props.children,
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};

var recipeImplementation = {};

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
var __assign =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(recipeImplementation, "__esModule", { value: true });
var getRecipeImplementation_1 = (recipeImplementation.getRecipeImplementation = void 0);
var querier_1 = index.querier;
var utils_1 = recipe.utils;
var error_1 = index.error;
var windowHandler_1 = recipe.windowHandler;
function getRecipeImplementation$1(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        getStateAndOtherInfoFromStorage: function () {
            /**
             * This function can also be used to decide which flow to use in the UI
             * (For example routing in supertokens-auth-react), which means we can
             * not make this an async function.
             *
             * To allow for this and allow for storage functions to be async where
             * possible we call the sync version of getItem here
             */
            var stateFromStorage =
                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.getItemSync(
                    "supertokens-oauth-state-2"
                );
            if (stateFromStorage === null) {
                return undefined;
            }
            try {
                return JSON.parse(stateFromStorage);
            } catch (_a) {
                return undefined;
            }
        },
        setStateAndOtherInfoToStorage: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = JSON.stringify(__assign({}, input.state));
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.setItem(
                                    "supertokens-oauth-state-2",
                                    value
                                ),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateToSendToAuthProvider,
                    stateExpiry,
                    urlResponse,
                    urlObj,
                    alreadyContainsRedirectURI,
                    urlWithState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                                userContext: input.userContext,
                            });
                            stateExpiry = Date.now() + 1000 * 60 * 10;
                            // 2. Store state in Session Storage.
                            return [
                                4 /*yield*/,
                                this.setStateAndOtherInfoToStorage({
                                    state: {
                                        stateForAuthProvider: stateToSendToAuthProvider,
                                        providerId: input.providerId,
                                        expiresAt: stateExpiry,
                                        authorisationURL: input.authorisationURL,
                                        providerClientId: input.providerClientId,
                                    },
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            // 2. Store state in Session Storage.
                            _a.sent();
                            return [
                                4 /*yield*/,
                                this.getAuthorisationURLFromBackend({
                                    providerId: input.providerId,
                                    userContext: input.userContext,
                                    options: input.options,
                                }),
                            ];
                        case 2:
                            urlResponse = _a.sent();
                            urlObj = new URL(urlResponse.url);
                            alreadyContainsRedirectURI = urlObj.searchParams.get("redirect_uri") !== null;
                            urlWithState = alreadyContainsRedirectURI
                                ? (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      state: stateToSendToAuthProvider,
                                  })
                                : (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      state: stateToSendToAuthProvider,
                                      redirect_uri: input.authorisationURL,
                                  });
                            return [2 /*return*/, urlWithState];
                    }
                });
            });
        },
        getAuthorisationURLFromBackend: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/authorisationurl",
                                    {},
                                    { thirdPartyId: input.providerId },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "GET_AUTHORISATION_URL",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "GET_AUTHORISATION_URL",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    url: jsonBody.url,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        signInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateFromStorage,
                    stateFromQueryParams,
                    verifiedState,
                    code,
                    errorInQuery,
                    _a,
                    jsonBody,
                    fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            stateFromStorage = this.getStateAndOtherInfoFromStorage({
                                userContext: input.userContext,
                            });
                            stateFromQueryParams = this.getAuthStateFromURL({
                                userContext: input.userContext,
                            });
                            return [
                                4 /*yield*/,
                                this.verifyAndGetStateOrThrowError({
                                    stateFromAuthProvider: stateFromQueryParams,
                                    stateObjectFromStorage: stateFromStorage,
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            verifiedState = _b.sent();
                            code = this.getAuthCodeFromURL({
                                userContext: input.userContext,
                            });
                            errorInQuery = this.getAuthErrorFromURL({
                                userContext: input.userContext,
                            });
                            if (errorInQuery !== undefined) {
                                /**
                                 * If an error occurs the auth provider will send an additional query param
                                 * 'error' which will be a code that represents what error occured. Since the
                                 * error is not end-user friendly we throw a normal Javascript Error instead
                                 * of STGeneralError
                                 *
                                 * Explained in detail in the RFC:
                                 * https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
                                 */
                                throw new Error("Auth provider responded with error: ".concat(errorInQuery));
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup",
                                    {
                                        body: JSON.stringify({
                                            code: code,
                                            thirdPartyId: verifiedState.providerId,
                                            redirectURI: verifiedState.authorisationURL,
                                            clientId: verifiedState.providerClientId,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 2:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                throw new error_1.default(jsonBody.error);
                            }
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        generateStateToSendToOAuthProvider: function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return "".concat(1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (
                        input.stateObjectFromStorage === undefined ||
                        input.stateObjectFromStorage.stateForAuthProvider === undefined
                    ) {
                        throw new Error("No valid auth state present in session storage");
                    }
                    if (input.stateFromAuthProvider === undefined) {
                        throw new Error("No state recieved from auth provider");
                    }
                    if (input.stateObjectFromStorage.expiresAt < Date.now()) {
                        throw new Error("Auth state verification failed. The auth provider took too long to respond");
                    }
                    if (input.stateFromAuthProvider !== input.stateObjectFromStorage.stateForAuthProvider) {
                        throw new Error(
                            "Auth state verification failed. The auth provider responded with an invalid state"
                        );
                    }
                    return [2 /*return*/, input.stateObjectFromStorage];
                });
            });
        },
        getAuthCodeFromURL: function () {
            var authCodeFromURL = (0, utils_1.getQueryParams)("code");
            if (authCodeFromURL === undefined) {
                return "";
            }
            return authCodeFromURL;
        },
        getAuthErrorFromURL: function () {
            return (0, utils_1.getQueryParams)("error");
        },
        getAuthStateFromURL: function () {
            var stateFromURL = (0, utils_1.getQueryParams)("state");
            if (stateFromURL === undefined) {
                return "";
            }
            return stateFromURL;
        },
    };
}
recipeImplementation.default = getRecipeImplementation$1;
getRecipeImplementation_1 = recipeImplementation.getRecipeImplementation = getRecipeImplementation$1;

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = getRecipeImplementation_1({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        getAuthorisationURLFromBackend: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.getAuthorisationURLFromBackend.bind(this)(
                                    sessionAuth.__assign({}, input)
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signInAndUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.signInAndUp.bind(this)(sessionAuth.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: response.createdNewUser,
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return webJsImplementation.getStateAndOtherInfoFromStorage.bind(this)({
                userContext: input.userContext,
            });
        },
        setStateAndOtherInfoToStorage: function (input) {
            return webJsImplementation.setStateAndOtherInfoToStorage.bind(this)({
                state: sessionAuth.__assign(sessionAuth.__assign({}, input.state), {
                    rid: recipeInput.recipeId,
                    redirectToPath: sessionAuth.getRedirectToPathFromURL(),
                }),
                userContext: input.userContext,
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        webJsImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(this)(
                            sessionAuth.__assign({}, input)
                        ),
                    ];
                });
            });
        },
        getAuthStateFromURL: function (input) {
            return webJsImplementation.getAuthStateFromURL.bind(this)(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return webJsImplementation.generateStateToSendToOAuthProvider.bind(this)(sessionAuth.__assign({}, input));
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsImplementation.verifyAndGetStateOrThrowError.bind(this)({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },
        getAuthCodeFromURL: function (input) {
            return webJsImplementation.getAuthCodeFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
        getAuthErrorFromURL: function (input) {
            return webJsImplementation.getAuthErrorFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}

/*
 * Class.
 */
var ThirdParty = /** @class */ (function (_super) {
    sessionAuth.__extends(ThirdParty, _super);
    function ThirdParty(config) {
        var _this = _super.call(this, normaliseThirdPartyConfig(config)) || this;
        /*
         * Instance methods.
         */
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop);
                    },
                };
            }
            // Add callback route for each provider.
            _this.config.signInAndUpFeature.providers.forEach(function (provider) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/callback/".concat(provider.id))
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: function () {
                        return matchRecipeIdUsingState(_this, {});
                    },
                    component: function (prop) {
                        return _this.getFeatureComponent("signinupcallback", prop);
                    },
                };
            });
            return features;
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    authWidgetWrapper.AuthWidgetWrapper,
                                    sessionAuth.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                sessionAuth.__assign({ recipe: _this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SignInAndUpFeature,
                                    sessionAuth.__assign({ recipe: _this }, props)
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "signinupcallback") {
                return jsxRuntime.jsx(
                    sessionAuth.UserContextWrapper,
                    sessionAuth.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                SignInAndUpCallback$1,
                                sessionAuth.__assign({ recipe: _this }, props)
                            ),
                        }
                    )
                );
            } else {
                throw new Error("Should never come here");
            }
        };
        _this.getDefaultRedirectionURL = function (context) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        var builder = new index.OverrideableBuilder_1(
            getRecipeImplementation({
                appInfo: _this.config.appInfo,
                recipeId: _this.config.recipeId,
                onHandleEvent: _this.config.onHandleEvent,
                preAPIHook: _this.config.preAPIHook,
                postAPIHook: _this.config.postAPIHook,
            })
        );
        _this.recipeImpl = builder.override(_this.config.override.functions).build();
        return _this;
    }
    ThirdParty.init = function (config) {
        return function (appInfo) {
            ThirdParty.instance = new ThirdParty(
                sessionAuth.__assign(sessionAuth.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdParty.RECIPE_ID,
                })
            );
            return ThirdParty.instance;
        };
    };
    ThirdParty.getInstanceOrThrow = function () {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            var error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    };
    /*
     * Tests methods.
     */
    ThirdParty.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    };
    ThirdParty.RECIPE_ID = "thirdparty";
    return ThirdParty;
})(authWidgetWrapper.AuthRecipe);

/*
 * Class.
 */
var Apple = /** @class */ (function (_super) {
    sessionAuth.__extends(Apple, _super);
    /*
     * Constructor.
     */
    function Apple(config) {
        var _this =
            _super.call(this, {
                id: "apple",
                name: "Apple",
                clientId: config === null || config === void 0 ? void 0 : config.clientId,
                getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
            }) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                return _this.buttonComponent;
            }
            return _this.getDefaultButton();
        };
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                sessionAuth.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15.614",
                        height: "18.737",
                        viewBox: "0 0 15.614 18.737",
                    },
                    {
                        children: jsxRuntime.jsxs(
                            "g",
                            sessionAuth.__assign(
                                {
                                    id: "iconfinder_logo_brand_brands_logos_apple_ios_2993701",
                                    transform: "translate(-2)",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91415",
                                            d: "M14.494 11.075a4.29 4.29 0 0 1 2.372-3.836A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.151z",
                                            style: { fill: "#fff" },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "XMLID_1339_",
                                            d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z",
                                            style: { fill: "#fff" },
                                            transform: "translate(-2.193)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91416",
                                            d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z",
                                            style: { fill: "#fff", opacity: 0.1 },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91417",
                                            d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z",
                                            style: { fill: "#fff", opacity: 0.2 },
                                            transform: "translate(0 -2.826)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91418",
                                            d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z",
                                            style: { fill: "#fff", opacity: 0.2 },
                                            transform: "translate(-2.193 -.057)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91419",
                                            d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z",
                                            style: { fill: "#fff", opacity: 0.1 },
                                            transform: "translate(-2.194)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91420",
                                            d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z",
                                            style: { fill: "#fff" },
                                        }),
                                    ],
                                }
                            )
                        ),
                    }
                )
            );
        };
        if (config === undefined) {
            return _this;
        }
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Apple.init = function (config) {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    };
    /*
     * Tests methods.
     */
    Apple.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Apple.instance = undefined;
        return;
    };
    return Apple;
})(Provider);

/*
 * Class.
 */
var Google = /** @class */ (function (_super) {
    sessionAuth.__extends(Google, _super);
    /*
     * Constructor.
     */
    function Google(config) {
        var _this =
            _super.call(this, {
                id: "google",
                name: "Google",
                clientId: config === null || config === void 0 ? void 0 : config.clientId,
                getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
            }) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                return _this.buttonComponent;
            }
            return _this.getDefaultButton();
        };
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                sessionAuth.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", width: "18.001", height: "18", viewBox: "0 0 18.001 18" },
                    {
                        children: jsxRuntime.jsxs(
                            "g",
                            sessionAuth.__assign(
                                { id: "Group_9292", transform: "translate(-534 -389)" },
                                {
                                    children: [
                                        jsxRuntime.jsx("path", {
                                            id: "Path_85803",
                                            d: "M3.989 144.285l-.627 2.339-2.29.048a9.016 9.016 0 0 1-.066-8.4l2.039.374.893 2.027a5.371 5.371 0 0 0 .05 3.616z",
                                            style: { fill: "#fff" },
                                            transform: "translate(534 255.593)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_85804",
                                            d: "M270.273 208.176a9 9 0 0 1-3.208 8.7l-2.568-.131-.363-2.269a5.364 5.364 0 0 0 2.308-2.739h-4.813v-3.56h8.645z",
                                            style: { fill: "#fff" },
                                            transform: "translate(281.57 188.143)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_85805",
                                            d: "M44.07 314.549a9 9 0 0 1-13.561-2.749l2.917-2.387a5.353 5.353 0 0 0 7.713 2.741z",
                                            style: { fill: "#fff" },
                                            transform: "translate(504.564 90.469)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_85806",
                                            d: "M42.362 2.072l-2.915 2.387a5.352 5.352 0 0 0-7.89 2.8l-2.932-2.4a9 9 0 0 1 13.737-2.787z",
                                            style: { fill: "#fff" },
                                            transform: "translate(506.383 389)",
                                        }),
                                    ],
                                }
                            )
                        ),
                    }
                )
            );
        };
        if (config === undefined) {
            return _this;
        }
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Google.init = function (config) {
        if (Google.instance !== undefined) {
            console.warn("Google Provider was already initialized");
            return Google.instance;
        }
        Google.instance = new Google(config);
        return Google.instance;
    };
    /*
     * Tests methods.
     */
    Google.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Google.instance = undefined;
        return;
    };
    return Google;
})(Provider);

/*
 * Class.
 */
var Facebook = /** @class */ (function (_super) {
    sessionAuth.__extends(Facebook, _super);
    /*
     * Constructor.
     */
    function Facebook(config) {
        var _this =
            _super.call(this, {
                id: "facebook",
                name: "Facebook",
                clientId: config === null || config === void 0 ? void 0 : config.clientId,
                getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
            }) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                return _this.buttonComponent;
            }
            return _this.getDefaultButton();
        };
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                sessionAuth.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "7.956",
                        height: "17.259",
                        viewBox: "0 0 7.956 17.259",
                    },
                    {
                        children: jsxRuntime.jsx("g", {
                            children: jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("path", {
                                    fill: "#fff",
                                    d: "M45.448 30.376h-2.36v8.646h-3.575v-8.646h-1.7v-3.039h1.7v-1.966a3.353 3.353 0 0 1 3.607-3.608l2.649.011v2.949h-1.922a.728.728 0 0 0-.758.828v1.789h2.671z",
                                    transform:
                                        "translate(-6.349 -3.492) translate(6.349 3.492) translate(-37.812 -21.763)",
                                }),
                            }),
                        }),
                    }
                )
            );
        };
        if (config === undefined) {
            return _this;
        }
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Facebook.init = function (config) {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    };
    /*
     * Tests methods.
     */
    Facebook.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    };
    return Facebook;
})(Provider);

/*
 * Class.
 */
var Github = /** @class */ (function (_super) {
    sessionAuth.__extends(Github, _super);
    /*
     * Constructor.
     */
    function Github(config) {
        var _this =
            _super.call(this, {
                id: "github",
                name: "GitHub",
                clientId: config === null || config === void 0 ? void 0 : config.clientId,
                getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
            }) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                return _this.buttonComponent;
            }
            return _this.getDefaultButton();
        };
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                sessionAuth.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "17.556", viewBox: "0 0 18 17.556" },
                    {
                        children: jsxRuntime.jsx("path", {
                            fill: "#fff",
                            fillRule: "evenodd",
                            d: "M145.319 107.44a9 9 0 0 0-2.844 17.54c.45.082.614-.2.614-.434 0-.214-.008-.78-.012-1.531-2.5.544-3.032-1.206-3.032-1.206a2.384 2.384 0 0 0-1-1.317c-.817-.559.062-.547.062-.547a1.89 1.89 0 0 1 1.378.927 1.916 1.916 0 0 0 2.619.748 1.924 1.924 0 0 1 .571-1.2c-2-.227-4.1-1-4.1-4.448a3.479 3.479 0 0 1 .927-2.415 3.233 3.233 0 0 1 .088-2.382s.755-.242 2.475.923a8.535 8.535 0 0 1 4.506 0c1.718-1.165 2.472-.923 2.472-.923a3.234 3.234 0 0 1 .09 2.382 3.473 3.473 0 0 1 .925 2.415c0 3.458-2.1 4.218-4.11 4.441a2.149 2.149 0 0 1 .611 1.667c0 1.2-.011 2.174-.011 2.469 0 .24.162.52.619.433a9 9 0 0 0-2.851-17.539z",
                            transform: "translate(-136.32 -107.44)",
                        }),
                    }
                )
            );
        };
        if (config === undefined) {
            return _this;
        }
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Github.init = function (config) {
        if (Github.instance !== undefined) {
            console.warn("Github Provider was already initialized");
            return Github.instance;
        }
        Github.instance = new Github(config);
        return Github.instance;
    };
    /*
     * Tests methods.
     */
    Github.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Github.instance = undefined;
        return;
    };
    return Github;
})(Provider);

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return ThirdParty.init(config);
    };
    Wrapper.signOut = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().signOut({
                        userContext: sessionAuth.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return sessionAuth.__generator(this, function (_a) {
                recipeInstance = ThirdParty.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    redirectToThirdPartyLogin$1({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setStateAndOtherInfoToStorage = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.signInAndUp = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().recipeImpl.signInAndUp(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.generateStateToSendToOAuthProvider = function (input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetStateOrThrowError = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthCodeFromURL = function (input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthErrorFromURL = function (input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthStateFromURL = function (input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /*
     * Providers
     */
    Wrapper.Google = Google;
    Wrapper.Apple = Apple;
    Wrapper.Facebook = Facebook;
    Wrapper.Github = Github;
    Wrapper.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return ThirdParty.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    };
    Wrapper.SignInAndUpTheme = SignInAndUpThemeWrapper;
    Wrapper.SignInAndUpCallback = function (prop) {
        return ThirdParty.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
var generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
var verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
var getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
var getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
var getAuthStateFromURL = Wrapper.getAuthStateFromURL;
var signInAndUp = Wrapper.signInAndUp;
var SignInAndUp = Wrapper.SignInAndUp;
var SignInAndUpCallback = Wrapper.SignInAndUpCallback;

exports.Apple = Apple;
exports.Facebook = Facebook;
exports.Github = Github;
exports.Google = Google;
exports.ProvidersForm = ProvidersForm;
exports.SignInAndUp = SignInAndUp;
exports.SignInAndUpCallback = SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
exports.SignInAndUpThemeWrapper = SignInAndUpThemeWrapper;
exports.ThirdParty = ThirdParty;
exports.Wrapper = Wrapper;
exports.defaultTranslationsThirdParty = defaultTranslationsThirdParty;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getRecipeImplementation = getRecipeImplementation;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin$1;
exports.redirectToThirdPartyLogin$1 = redirectToThirdPartyLogin;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
exports.signInAndUp = signInAndUp;
exports.signOut = signOut;
exports.useChildProps = useChildProps;
exports.useFeatureReducer = useFeatureReducer;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
//# sourceMappingURL=thirdparty-shared.js.map
