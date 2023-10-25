"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session-shared3.js");
var recipe$1 = require("./totp-shared.js");
var React = require("react");
var recipe = require("./session-shared2.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var translations = require("./translations.js");
var generalError = require("./emailpassword-shared.js");
var checkedRoundIcon = require("./checkedRoundIcon.js");
var translationContext = require("./translationContext.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var formBase = require("./emailpassword-shared9.js");
var validators = require("./passwordless-shared3.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/totp");
require("./otpIcon.js");
require("./emailpassword-shared5.js");
require("./emailpassword-shared2.js");

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

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    -webkit-animation-duration: 0.1s;\n            animation-duration: 0.1s;\n    -webkit-animation-name: animate-fade;\n            animation-name: animate-fade;\n    -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n    -webkit-animation-fill-mode: backwards;\n            animation-fill-mode: backwards;\n}\n@-webkit-keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    padding-top: 24px;\n}\n[data-supertokens~="row"] {\n    padding-top: 16px;\n    padding-bottom: 8px;\n}\n[data-supertokens~="factorChooserList"] {\n    padding-top: 4px;\n}\n[data-supertokens~="factorChooserOption"] {\n    display: flex;\n    flex-direction: row;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n    padding: 16px;\n    cursor: pointer;\n    margin-top: 12px;\n}\n[data-supertokens~="factorChooserOption"]:hover {\n    border: 1px solid rgb(var(--palette-textLink));\n}\n[data-supertokens~="factorOptionText"] {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: start;\n    text-align: left;\n}\n[data-supertokens~="factorLogo"] {\n    flex-grow: 0;\n    min-width: 30px;\n    text-align: left;\n    margin-top: 6px;\n}\n[data-supertokens~="factorName"] {\n    color: rgb(var(--palette-textPrimary));\n    font-size: var(--font-size-1);\n    margin: 4px;\n}\n[data-supertokens~="factorChooserOption"]:hover [data-supertokens~="factorName"] {\n    color: rgb(var(--palette-textLink));\n}\n[data-supertokens~="factorDescription"] {\n    color: rgb(var(--palette-textSecondary));\n    font-size: var(--font-size-0);\n    margin: 4px;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-bottom: 32px;\n    text-align: right;\n}\n';

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

var TOTPBlockedScreen = function () {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsx(checkedRoundIcon.CheckedRoundIcon, {}),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("PWLESS_CLOSE_TAB_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerSubtitle secondaryText" },
                                        {
                                            children: [
                                                t("PWLESS_CLOSE_TAB_SUBTITLE_LINE1"),
                                                jsxRuntime.jsx("br", {}),
                                                t("PWLESS_CLOSE_TAB_SUBTITLE_LINE2"),
                                            ],
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var BlockedScreen = uiEntry.withOverride("TOTPBlockedScreen", TOTPBlockedScreen);

var TOTPLoadingScreen = function () {
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container delayedRender" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: jsxRuntime.jsx(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "spinner delayedRender" },
                                    { children: jsxRuntime.jsx(uiEntry.SpinnerIcon, {}) }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
var LoadingScreen = uiEntry.withOverride("TOTPLoadingScreen", TOTPLoadingScreen);

var CodeForm = uiEntry.withOverride("TOTPCodeForm", function TOTPCodeForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(React__namespace.default.Fragment, {
        children: jsxRuntime.jsx(formBase.FormBase, {
            clearError: props.clearError,
            onError: props.onError,
            formFields: [
                {
                    id: "totp",
                    label: "PWLESS_USER_INPUT_CODE_INPUT_LABEL",
                    autofocus: true,
                    optional: false,
                    clearOnSubmit: true,
                    autoComplete: "one-time-code",
                    placeholder: "",
                    validate: validators.userInputCodeValidate,
                },
            ],
            onSuccess: props.onSuccess,
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            callAPI: function (formFields) {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    var totp, response;
                    var _a;
                    return genericComponentOverrideContext.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                totp =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "totp";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (totp === undefined || totp.length === 0) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_OTP_UNDEFINED");
                                }
                                if (!props.featureState.deviceInfo) return [3 /*break*/, 2];
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.verifyDevice({
                                        deviceName: props.featureState.deviceInfo.deviceName,
                                        totp: totp,
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                response = _b.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.verifyCode({
                                        totp: totp,
                                        userContext: userContext,
                                    }),
                                ];
                            case 3:
                                response = _b.sent();
                                _b.label = 4;
                            case 4:
                                // We can redirect these statuses, since they all cause a redirection
                                // and we don't really want to show anything
                                if (
                                    response.status === "OK" ||
                                    response.status === "UNKNOWN_DEVICE_ERROR" ||
                                    response.status === "LIMIT_REACHED_ERROR"
                                ) {
                                    return [2 /*return*/, response];
                                }
                                if (response.status === "INVALID_TOTP_ERROR") {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_OTP_INVALID");
                                }
                                throw new STGeneralError__default.default("SOMETHING_WENT_WRONG_ERROR");
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            footer: props.footer,
        }),
    });
});

var CodeVerificationFooter = uiEntry.withOverride(
    "TOTPCodeVerificationFooter",
    function TOTPCodeVerificationFooter(_a) {
        var featureState = _a.featureState,
            recipeImplementation = _a.recipeImplementation;
        var t = translationContext.useTranslation();
        var userContext = uiEntry.useUserContext();
        return jsxRuntime.jsx(React.Fragment, {
            children: jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    {
                        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                        onClick: function () {
                            return recipeImplementation.removeDevice({
                                deviceName: featureState.deviceInfo.deviceName,
                                userContext: userContext,
                            });
                        },
                    },
                    {
                        children: [
                            jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }),
                            t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL"),
                        ],
                    }
                )
            ),
        });
    }
);

var CodeVerificationHeader = uiEntry.withOverride(
    "TOTPCodeVerificationHeader",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function TOTPCodeVerificationHeader(_props) {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "headerTitle" },
                        { children: t("PWLESS_USER_INPUT_CODE_HEADER_TITLE") }
                    )
                ),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

var DeviceInfoSection = uiEntry.withOverride("TOTPDeviceInfoSection", function TOTPDeviceInfoSection(props) {
    return jsxRuntime.jsx(React__namespace.default.Fragment, {
        children: jsxRuntime.jsx("pre", { children: JSON.stringify(props.deviceInfo, null, 2) }),
    });
});

var DeviceSetupFooter = uiEntry.withOverride(
    "TOTPDeviceSetupFooter",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function TOTPDeviceSetupFooter(_props) {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsx(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
                { children: t("PWLESS_SIGN_IN_UP_FOOTER_START") }
            )
        );
    }
);

var DeviceSetupHeader = uiEntry.withOverride(
    "TOTPDeviceSetupHeader",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function TOTPDeviceSetupHeader(_props) {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "headerTitle" },
                        { children: t("PWLESS_SIGN_IN_UP_HEADER_TITLE") }
                    )
                ),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

var TOTPMFAScreens;
(function (TOTPMFAScreens) {
    TOTPMFAScreens[(TOTPMFAScreens["DeviceSetup"] = 0)] = "DeviceSetup";
    TOTPMFAScreens[(TOTPMFAScreens["CodeVerification"] = 1)] = "CodeVerification";
    TOTPMFAScreens[(TOTPMFAScreens["Loading"] = 2)] = "Loading";
    TOTPMFAScreens[(TOTPMFAScreens["Blocked"] = 3)] = "Blocked";
})(TOTPMFAScreens || (TOTPMFAScreens = {}));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        props = genericComponentOverrideContext.__rest(_a, ["activeScreen", "featureState"]);
    var commonProps = {
        featureState: featureState,
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", error: error });
        },
    };
    return activeScreen === TOTPMFAScreens.Blocked
        ? jsxRuntime.jsx(BlockedScreen, {})
        : activeScreen === TOTPMFAScreens.Loading
        ? jsxRuntime.jsx(LoadingScreen, {})
        : jsxRuntime.jsxs(
              "div",
              genericComponentOverrideContext.__assign(
                  { "data-supertokens": "container" },
                  {
                      children: [
                          jsxRuntime.jsx(
                              "div",
                              genericComponentOverrideContext.__assign(
                                  { "data-supertokens": "row" },
                                  {
                                      children:
                                          featureState.loaded &&
                                          jsxRuntime.jsxs(React__namespace.default.Fragment, {
                                              children: [
                                                  activeScreen === TOTPMFAScreens.DeviceSetup
                                                      ? jsxRuntime.jsx(
                                                            DeviceSetupHeader,
                                                            genericComponentOverrideContext.__assign({}, commonProps)
                                                        )
                                                      : jsxRuntime.jsx(
                                                            CodeVerificationHeader,
                                                            genericComponentOverrideContext.__assign({}, commonProps)
                                                        ),
                                                  featureState.error !== undefined &&
                                                      jsxRuntime.jsx(generalError.GeneralError, {
                                                          error: featureState.error,
                                                      }),
                                                  activeScreen === TOTPMFAScreens.DeviceSetup &&
                                                      jsxRuntime.jsx(
                                                          DeviceInfoSection,
                                                          genericComponentOverrideContext.__assign({}, commonProps, {
                                                              deviceInfo: featureState.deviceInfo,
                                                          })
                                                      ),
                                                  jsxRuntime.jsx(
                                                      CodeForm,
                                                      genericComponentOverrideContext.__assign({}, commonProps, {
                                                          onSuccess: props.onSuccess,
                                                          footer:
                                                              activeScreen === TOTPMFAScreens.DeviceSetup
                                                                  ? jsxRuntime.jsx(
                                                                        DeviceSetupFooter,
                                                                        genericComponentOverrideContext.__assign(
                                                                            {},
                                                                            commonProps
                                                                        )
                                                                    )
                                                                  : jsxRuntime.jsx(
                                                                        CodeVerificationFooter,
                                                                        genericComponentOverrideContext.__assign(
                                                                            {},
                                                                            commonProps
                                                                        )
                                                                    ),
                                                      })
                                                  ),
                                              ],
                                          }),
                                  }
                              )
                          ),
                          jsxRuntime.jsx(SuperTokensBranding.SuperTokensBranding, {}),
                      ],
                  }
              )
          );
};
function SignInUpThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === TOTPMFAScreens.Blocked) {
        activeStyle = props.config.totpMFAScreen.blockedScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.Loading) {
        activeStyle = props.config.totpMFAScreen.loadingScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.DeviceSetup) {
        activeStyle = props.config.totpMFAScreen.setupScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.CodeVerification) {
        activeStyle = props.config.totpMFAScreen.verificationScreenStyle;
    }
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
                        {
                            children: jsxRuntime.jsx(
                                SignInUpTheme,
                                genericComponentOverrideContext.__assign({}, props, { activeScreen: activeScreen })
                            ),
                        }
                    )
                ),
            }
        )
    );
}
function getActiveScreen(props) {
    if (props.featureState.isBlocked) {
        return TOTPMFAScreens.Blocked;
    } else if (props.featureState.loaded === false) {
        return TOTPMFAScreens.Loading;
    } else if (props.featureState.deviceInfo) {
        return TOTPMFAScreens.DeviceSetup;
    } else {
        return TOTPMFAScreens.CodeVerification;
    }
}

var defaultTranslationsTOTP = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, translations.defaultTranslationsCommon.en),
        { MULTI_FACTOR_CHOOSER_HEADER_TITLE: "Please select a second factor", MULTI_FACTOR_AUTH_LOGOUT: "Logout" }
    ),
};

var useFeatureReducer = function (recipeImpl, userContext) {
    var _a = React__namespace.useReducer(
            function (oldState, action) {
                switch (action.type) {
                    case "load":
                        return {
                            loaded: true,
                            error: action.error,
                            deviceInfo: action.deviceInfo,
                            isBlocked: false,
                        };
                    case "setBlocked":
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, oldState),
                            { error: action.error, deviceInfo: undefined }
                        );
                    case "setError":
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, oldState),
                            { error: action.error }
                        );
                    case "createDevice":
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, oldState),
                            { deviceInfo: action.deviceInfo, error: undefined }
                        );
                    case "successInAnotherTab":
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, oldState),
                            { successInAnotherTab: true }
                        );
                    default:
                        return oldState;
                }
            },
            {
                error: undefined,
                loaded: false,
                deviceInfo: undefined,
                isBlocked: false,
            },
            function (initArg) {
                var error = undefined;
                var errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
                var messageQueryParam = genericComponentOverrideContext.getQueryParams("message");
                if (errorQueryParam !== null) {
                    if (errorQueryParam === "signin") {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else if (errorQueryParam === "restart_link") {
                        error = "ERROR_SIGN_IN_UP_LINK";
                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                        error = messageQueryParam;
                    }
                }
                return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, initArg), {
                    error: error,
                });
            }
        ),
        state = _a[0],
        dispatch = _a[1];
    React.useEffect(
        function () {
            if (recipeImpl === undefined) {
                return;
            }
            function load() {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var error, errorQueryParam, messageQueryParam, deviceInfo;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                error = undefined;
                                errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
                                messageQueryParam = genericComponentOverrideContext.getQueryParams("message");
                                if (errorQueryParam !== null) {
                                    if (errorQueryParam === "signin") {
                                        error = "SOMETHING_WENT_WRONG_ERROR";
                                    } else if (errorQueryParam === "restart_link") {
                                        error = "ERROR_SIGN_IN_UP_LINK";
                                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                                        error = messageQueryParam;
                                    }
                                }
                                return [
                                    4 /*yield*/,
                                    recipeImpl === null || recipeImpl === void 0
                                        ? void 0
                                        : recipeImpl.getDeviceInfo({
                                              userContext: userContext,
                                          }),
                                ];
                            case 1:
                                deviceInfo = _a.sent();
                                // No need to check if the component is unmounting, since this has no effect then.
                                dispatch({ type: "load", deviceInfo: deviceInfo, error: error });
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (state.loaded === false) {
                void load();
            }
        },
        [state.loaded, recipeImpl, userContext]
    );
    return [state, dispatch];
};
function useChildProps(recipe$1, dispatch, state, userContext, history) {
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return recipe$1 && getModifiedRecipeImplementation(recipe$1.webJSRecipe, dispatch);
        },
        [recipe$1]
    );
    return React.useMemo(
        function () {
            if (!recipe$1 || !recipeImplementation) {
                return undefined;
            }
            return {
                onSuccess: function () {
                    return recipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            rid: recipe$1.config.recipeId,
                            successRedirectContext: {
                                action: "SUCCESS",
                                redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                            },
                        },
                        userContext,
                        history
                    );
                },
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
            };
        },
        [state, recipeImplementation]
    );
}
var SignInUpFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    var userContext = uiEntry.useUserContext();
    var _a = useFeatureReducer(props.recipe.webJSRecipe, userContext),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe, dispatch, state, userContext, props.history);
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsTOTP },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            SignInUpThemeWrapper,
                                            genericComponentOverrideContext.__assign({}, childProps, {
                                                featureState: state,
                                                dispatch: dispatch,
                                            })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    genericComponentOverrideContext.__assign(
                                                        genericComponentOverrideContext.__assign({}, childProps),
                                                        { featureState: state, dispatch: dispatch }
                                                    )
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
function getModifiedRecipeImplementation(originalImpl, dispatch) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        createDevice: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var additionalAttemptInfo, res, deviceInfo;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            additionalAttemptInfo = {
                                redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                originalImpl.createDevice(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        {
                                            userContext: genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, input.userContext),
                                                { additionalAttemptInfo: additionalAttemptInfo }
                                            ),
                                        }
                                    )
                                ),
                            ];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.getDeviceInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            deviceInfo = _a.sent();
                            dispatch({ type: "createDevice", deviceInfo: deviceInfo });
                            _a.label = 3;
                        case 3:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        verifyCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.verifyCode(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "LIMIT_REACHED_ERROR") {
                                dispatch({ type: "setBlocked", error: "ERROR_SIGN_IN_UP_CODE_VERIFY_BLOCKED" });
                            } else if (res.status === "INVALID_TOTP_ERROR") {
                                dispatch({ type: "setError", error: "ERROR_SIGN_IN_UP_CODE_VERIFY_INVALID_TOTP" });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        verifyDevice: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.verifyDevice(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "LIMIT_REACHED_ERROR")) return [3 /*break*/, 2];
                            dispatch({ type: "setBlocked", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_BLOCKED" });
                            return [3 /*break*/, 5];
                        case 2:
                            if (!(res.status === "INVALID_TOTP_ERROR")) return [3 /*break*/, 3];
                            dispatch({ type: "setError", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_INVALID_TOTP" });
                            return [3 /*break*/, 5];
                        case 3:
                            if (!(res.status === "UNKNOWN_DEVICE_ERROR")) return [3 /*break*/, 5];
                            return [4 /*yield*/, originalImpl.clearDeviceInfo({ userContext: input.userContext })];
                        case 4:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_UNKNOWN_DEVICE" });
                            _a.label = 5;
                        case 5:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearDeviceInfo: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearDeviceInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/];
                    }
                });
            });
        },
        removeDevice: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.removeDevice(input)];
                        case 1:
                            res = _a.sent();
                            return [
                                4 /*yield*/,
                                originalImpl.clearDeviceInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/, res];
                    }
                });
            });
        },
    });
}

var MultiFactorAuthPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(MultiFactorAuthPreBuiltUI, _super);
    function MultiFactorAuthPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe$1.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.totpMFAScreen.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(recipe$1.DEFAULT_TOTP_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("mfaTOTP", props, useComponentOverrides);
                    },
                    recipeID: recipe$1.TOTP.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _,
            props,
            useComponentOverrides
        ) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe$1.useContext;
            }
            return jsxRuntime.jsx(
                uiEntry.UserContextWrapper,
                genericComponentOverrideContext.__assign(
                    { userContext: props.userContext },
                    {
                        children: jsxRuntime.jsx(
                            session.SessionAuth,
                            genericComponentOverrideContext.__assign(
                                {
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        SignInUpFeature,
                                        genericComponentOverrideContext.__assign(
                                            {
                                                recipe: _this.recipeInstance,
                                                useComponentOverrides: useComponentOverrides,
                                            },
                                            props
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
    // Static methods
    MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (MultiFactorAuthPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe$1.TOTP.getInstanceOrThrow();
            MultiFactorAuthPreBuiltUI.instance = new MultiFactorAuthPreBuiltUI(recipeInstance);
        }
        return MultiFactorAuthPreBuiltUI.instance;
    };
    MultiFactorAuthPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe$1.useContext;
        }
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    MultiFactorAuthPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe$1.useContext;
        }
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    // For tests
    MultiFactorAuthPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        MultiFactorAuthPreBuiltUI.instance = undefined;
        return;
    };
    MultiFactorAuthPreBuiltUI.MFATOTP = function (props) {
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("mfaTOTP", props);
    };
    MultiFactorAuthPreBuiltUI.MFATOTPTheme = SignInUpThemeWrapper;
    return MultiFactorAuthPreBuiltUI;
})(uiEntry.RecipeRouter);
var MFATOTP = MultiFactorAuthPreBuiltUI.MFATOTP;

exports.MFATOTP = MFATOTP;
exports.MFATOTPTheme = SignInUpThemeWrapper;
exports.MultiFactorAuthPreBuiltUI = MultiFactorAuthPreBuiltUI;
