"use strict";

var sessionAuth = require("./session-shared.js");
var translations = require("./translations.js");
var jsxRuntime = require("react/jsx-runtime");
var utils = require("./authRecipe-shared.js");
var React = require("react");
var STGeneralError = require("supertokens-web-js/utils/error");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var translationContext = require("./translationContext.js");
var spinnerIcon = require("./spinnerIcon.js");
var recipeImplementation = require("supertokens-web-js/recipe/thirdparty/recipeImplementation");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
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

var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var _a = translations.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider$1 = _a[1];

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n';

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
        var callbackPath = new NormalisedURLPath__default.default("/callback/".concat(this.id));
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
        },
        config.override
    );
    return sessionAuth.__assign(sessionAuth.__assign({}, utils.normaliseAuthRecipe(config)), {
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
                        if (STGeneralError__default.default.isThisError(e_1)) {
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
var ProvidersForm = translations.withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);

var SignInAndUpHeader = translations.withOverride(
    "ThirdPartySignInAndUpHeader",
    function ThirdPartySignInAndUpHeader() {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsx(
            "div",
            sessionAuth.__assign(
                { "data-supertokens": "headerTitle" },
                { children: t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE") }
            )
        );
    }
);

var SignUpFooter = translations.withOverride("ThirdPartySignUpFooter", function ThirdPartySignUpFooter(_a) {
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
                                        jsxRuntime.jsx(translations.GeneralError, { error: props.featureState.error }),
                                    jsxRuntime.jsx(ProvidersForm, sessionAuth.__assign({}, props)),
                                    jsxRuntime.jsx(SignUpFooter, {
                                        privacyPolicyLink: props.config.signInAndUpFeature.privacyPolicyLink,
                                        termsOfServiceLink: props.config.signInAndUpFeature.termsOfServiceLink,
                                    }),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(utils.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
var SignInAndUpThemeWrapper = function (props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
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
var SignInAndUpCallbackThemeWithOverride = translations.withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);
var SignInAndUpCallbackTheme = function (props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        ThemeBase,
        sessionAuth.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style] },
            { children: jsxRuntime.jsx(SignInAndUpCallbackThemeWithOverride, {}) }
        )
    );
};

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
                        height: "18",
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
                                            style: { fill: "#000" },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "XMLID_1339_",
                                            d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z",
                                            style: { fill: "#000" },
                                            transform: "translate(-2.193)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91416",
                                            d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91417",
                                            d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(0 -2.826)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91418",
                                            d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(-2.193 -.057)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91419",
                                            d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(-2.194)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91420",
                                            d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z",
                                            style: { fill: "#000" },
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
var Bitbucket = /** @class */ (function (_super) {
    sessionAuth.__extends(Bitbucket, _super);
    /*
     * Constructor.
     */
    function Bitbucket(config) {
        var _this =
            _super.call(this, {
                id: "bitbucket",
                name: "Bitbucket",
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
            return jsxRuntime.jsxs(
                "svg",
                sessionAuth.__assign(
                    {
                        width: "19",
                        height: "17",
                        viewBox: "0 0 19 17",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                d: "M0.59534 0.0522702C0.229457 0.0522702 -0.0841565 0.365883 0.0203815 0.73174L2.58156 16.2556C2.63383 16.6738 2.99971 16.9351 3.3656 16.9351H15.6488C15.9624 16.9351 16.1715 16.726 16.2238 16.4124L18.7849 0.679471C18.8372 0.313614 18.5759 0 18.21 0L0.59534 0.0522702ZM11.3628 11.2901H7.44258L6.3972 5.74956H12.3036L11.3628 11.2901Z",
                                fill: "#2684FF",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M17.9502 5.76172H12.3052L11.3643 11.3022H7.44415L2.84448 16.7905C2.84448 16.7905 3.05356 16.9996 3.36717 16.9996H15.6504C15.964 16.9996 16.1731 16.7905 16.2253 16.4769L17.9502 5.76172Z",
                                fill: "url(#paint0_linear_4108_67124)",
                            }),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsxs(
                                    "linearGradient",
                                    sessionAuth.__assign(
                                        {
                                            id: "paint0_linear_4108_67124",
                                            x1: "19.2748",
                                            y1: "7.29202",
                                            x2: "9.92001",
                                            y2: "14.5943",
                                            gradientUnits: "userSpaceOnUse",
                                        },
                                        {
                                            children: [
                                                jsxRuntime.jsx("stop", { offset: "0.176", stopColor: "#0052CC" }),
                                                jsxRuntime.jsx("stop", { offset: "1", stopColor: "#2684FF" }),
                                            ],
                                        }
                                    )
                                ),
                            }),
                        ],
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
    Bitbucket.init = function (config) {
        if (Bitbucket.instance !== undefined) {
            console.warn("Bitbucket Provider was already initialized");
            return Bitbucket.instance;
        }
        Bitbucket.instance = new Bitbucket(config);
        return Bitbucket.instance;
    };
    /*
     * Tests methods.
     */
    Bitbucket.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Bitbucket.instance = undefined;
        return;
    };
    return Bitbucket;
})(Provider);

/*
 * Class.
 */
var Discord = /** @class */ (function (_super) {
    sessionAuth.__extends(Discord, _super);
    /*
     * Constructor.
     */
    function Discord(config) {
        var _this =
            _super.call(this, {
                id: "discord",
                name: "Discord",
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
            return jsxRuntime.jsxs(
                "svg",
                sessionAuth.__assign(
                    {
                        width: "18",
                        height: "14",
                        viewBox: "0 0 18 14",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx(
                                "g",
                                sessionAuth.__assign(
                                    { clipPath: "url(#clip0_4108_67056)" },
                                    {
                                        children: jsxRuntime.jsx("path", {
                                            d: "M15.2477 1.17248C14.0651 0.616848 12.8166 0.222666 11.5342 0C11.3587 0.321942 11.1999 0.653178 11.0585 0.99232C9.69245 0.781074 8.30327 0.781074 6.93722 0.99232C6.79573 0.653213 6.63694 0.321981 6.46152 0C5.17826 0.224546 3.92896 0.619664 2.74515 1.17538C0.394984 4.74367 -0.242109 8.22333 0.0764376 11.6536C1.45275 12.6971 2.99324 13.4908 4.63094 14C4.99971 13.491 5.32601 12.9511 5.6064 12.3858C5.07384 12.1817 4.55982 11.9299 4.0703 11.6332C4.19914 11.5374 4.32514 11.4386 4.4469 11.3427C5.87129 12.0301 7.42594 12.3865 8.99999 12.3865C10.574 12.3865 12.1287 12.0301 13.5531 11.3427C13.6762 11.4458 13.8023 11.5446 13.9297 11.6332C13.4392 11.9304 12.9242 12.1827 12.3907 12.3873C12.6708 12.9523 12.9971 13.4918 13.3662 14C15.0053 13.4928 16.547 12.6996 17.9235 11.655C18.2973 7.67704 17.285 4.22935 15.2477 1.17248ZM6.0099 9.544C5.12221 9.544 4.38885 8.71731 4.38885 7.70029C4.38885 6.68327 5.09673 5.84931 6.00707 5.84931C6.9174 5.84931 7.6451 6.68327 7.62953 7.70029C7.61396 8.71731 6.91457 9.544 6.0099 9.544ZM11.9901 9.544C11.101 9.544 10.3704 8.71731 10.3704 7.70029C10.3704 6.68327 11.0783 5.84931 11.9901 5.84931C12.9018 5.84931 13.6239 6.68327 13.6083 7.70029C13.5927 8.71731 12.8947 9.544 11.9901 9.544Z",
                                            fill: "#5865F2",
                                        }),
                                    }
                                )
                            ),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsx(
                                    "clipPath",
                                    sessionAuth.__assign(
                                        { id: "clip0_4108_67056" },
                                        {
                                            children: jsxRuntime.jsx("rect", {
                                                width: "18",
                                                height: "14",
                                                fill: "white",
                                            }),
                                        }
                                    )
                                ),
                            }),
                        ],
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
    Discord.init = function (config) {
        if (Discord.instance !== undefined) {
            console.warn("Discord Provider was already initialized");
            return Discord.instance;
        }
        Discord.instance = new Discord(config);
        return Discord.instance;
    };
    /*
     * Tests methods.
     */
    Discord.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Discord.instance = undefined;
        return;
    };
    return Discord;
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
                        fill: "#1777F2",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 30 30",
                        width: "24px",
                        height: "24px",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            d: "M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z",
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
                            fill: "#000",
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

/*
 * Class.
 */
var Gitlab = /** @class */ (function (_super) {
    sessionAuth.__extends(Gitlab, _super);
    /*
     * Constructor.
     */
    function Gitlab(config) {
        var _this =
            _super.call(this, {
                id: "gitlab",
                name: "Gitlab",
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
            return jsxRuntime.jsxs(
                "svg",
                sessionAuth.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 18 18",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                d: "M17.7004 6.86178L17.6751 6.79711L15.2251 0.403269C15.1753 0.277953 15.087 0.171648 14.973 0.0996044C14.8589 0.0287852 14.7259 -0.00532357 14.5918 0.00188338C14.4577 0.00909034 14.3291 0.057266 14.2232 0.139906C14.1186 0.224918 14.0426 0.340113 14.0058 0.469813L12.3516 5.5309H5.65312L3.99889 0.469813C3.96302 0.339406 3.88693 0.223634 3.78145 0.138968C3.67562 0.0563286 3.54698 0.0081529 3.41289 0.000945942C3.27881 -0.00626101 3.14574 0.0278478 3.03166 0.0986669C2.91791 0.171001 2.82972 0.277214 2.77954 0.402332L0.324918 6.79336L0.30055 6.85803C-0.0521303 7.77953 -0.0956629 8.79071 0.176516 9.73911C0.448694 10.6875 1.02183 11.5217 1.8095 12.1159L1.81794 12.1225L1.84043 12.1384L5.57251 14.9333L7.41888 16.3307L8.54356 17.1798C8.67512 17.2797 8.83575 17.3338 9.00093 17.3338C9.16611 17.3338 9.32675 17.2797 9.45831 17.1798L10.583 16.3307L12.4293 14.9333L16.1839 12.1216L16.1933 12.1141C16.9792 11.5197 17.551 10.6864 17.8228 9.73926C18.0945 8.79214 18.0516 7.7824 17.7004 6.86178Z",
                                fill: "#E24329",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M17.7004 6.86154L17.6751 6.79688C16.4813 7.04191 15.3564 7.54756 14.3807 8.27771L9 12.3463C10.8323 13.7324 12.4275 14.9368 12.4275 14.9368L16.1821 12.1251L16.1914 12.1176C16.9785 11.5233 17.5511 10.6894 17.8233 9.74145C18.0954 8.79352 18.0523 7.78284 17.7004 6.86154Z",
                                fill: "#FC6D26",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M5.57251 14.9362L7.41887 16.3337L8.54356 17.1828C8.67511 17.2827 8.83575 17.3367 9.00093 17.3367C9.16611 17.3367 9.32674 17.2827 9.4583 17.1828L10.583 16.3337L12.4293 14.9362C12.4293 14.9362 10.8323 13.7281 8.99999 12.3457C7.16769 13.7281 5.57251 14.9362 5.57251 14.9362Z",
                                fill: "#FCA326",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M3.61837 8.27755C2.64345 7.5459 1.51877 7.03893 0.324918 6.79297L0.30055 6.85764C-0.0521303 7.77914 -0.0956629 8.79031 0.176516 9.73871C0.448694 10.6871 1.02183 11.5213 1.8095 12.1155L1.81794 12.1221L1.84043 12.138L5.57251 14.9329C5.57251 14.9329 7.16582 13.7285 9 12.3424L3.61837 8.27755Z",
                                fill: "#FC6D26",
                            }),
                        ],
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
    Gitlab.init = function (config) {
        if (Gitlab.instance !== undefined) {
            console.warn("Gitlab Provider was already initialized");
            return Gitlab.instance;
        }
        Gitlab.instance = new Gitlab(config);
        return Gitlab.instance;
    };
    /*
     * Tests methods.
     */
    Gitlab.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Gitlab.instance = undefined;
        return;
    };
    return Gitlab;
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
            return jsxRuntime.jsxs(
                "svg",
                sessionAuth.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: "18px", height: "18px" },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                fill: "#FFC107",
                                d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#FF3D00",
                                d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#4CAF50",
                                d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#1976D2",
                                d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                        ],
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

var defaultTranslationsThirdParty = {
    en: sessionAuth.__assign(sessionAuth.__assign({}, translations.defaultTranslationsCommon.en), {
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
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        translations.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    translations.FeatureWrapper,
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
            if (STGeneralError__default.default.isThisError(err)) {
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
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        translations.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    translations.FeatureWrapper,
                    sessionAuth.__assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInAndUpCallbackTheme, { config: props.recipe.config }),
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

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = recipeImplementation.getRecipeImplementation({
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
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop, useComponentOverrides);
                    },
                };
            }
            // Add callback route for each provider.
            _this.config.signInAndUpFeature.providers.forEach(function (provider) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/callback/".concat(provider.id))
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: function () {
                        return matchRecipeIdUsingState(_this, {});
                    },
                    component: function (prop) {
                        return _this.getFeatureComponent("signinupcallback", prop, useComponentOverrides);
                    },
                };
            });
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    utils.AuthWidgetWrapper,
                                    sessionAuth.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                sessionAuth.__assign({ recipe: _this }, props, {
                                                    useComponentOverrides: useComponentOverrides,
                                                })
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
                                    sessionAuth.__assign({ recipe: _this }, props, {
                                        useComponentOverrides: useComponentOverrides,
                                    })
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
                                sessionAuth.__assign({ recipe: _this }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
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
        var builder = new translations.OverrideableBuilder_1(
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
})(utils.AuthRecipe);

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
    Wrapper.Apple = Apple;
    Wrapper.Bitbucket = Bitbucket;
    Wrapper.Discord = Discord;
    Wrapper.Github = Github;
    Wrapper.Gitlab = Gitlab;
    Wrapper.Google = Google;
    Wrapper.Facebook = Facebook;
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
    Wrapper.ComponentsOverrideProvider = Provider$1;
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
var ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.Apple = Apple;
exports.Bitbucket = Bitbucket;
exports.Discord = Discord;
exports.Facebook = Facebook;
exports.Github = Github;
exports.Gitlab = Gitlab;
exports.Google = Google;
exports.ProvidersForm = ProvidersForm;
exports.SignInAndUp = SignInAndUp;
exports.SignInAndUpCallback = SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
exports.SignInAndUpThemeWrapper = SignInAndUpThemeWrapper;
exports.ThirdParty = ThirdParty;
exports.ThirdpartyComponentsOverrideProvider = ThirdpartyComponentsOverrideProvider;
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
