"use strict";
var __assign =
    (this && this.__assign) ||
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInAndUpTheme = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var signUp_1 = require("./signUp");
var signIn_1 = require("./signIn");
var themeBase_1 = require("../themeBase");
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles/styles");
var userContextWrapper_1 = __importDefault(require("../../../../../usercontext/userContextWrapper"));
var SignInAndUpTheme = function (props) {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return (0, jsx_runtime_1.jsx)(
            styleContext_1.StyleProvider,
            __assign(
                {
                    rawPalette: props.config.palette,
                    defaultPalette: styles_1.defaultPalette,
                    styleFromInit: props.signUpForm.styleFromInit,
                    rootStyleFromInit: props.config.rootStyle,
                    getDefaultStyles: styles_2.getStyles,
                },
                {
                    children: (0, jsx_runtime_1.jsx)(
                        signUp_1.SignUp,
                        __assign({}, props.signUpForm, {
                            signInClicked: function () {
                                props.dispatch({ type: "setSignIn" });
                            },
                        })
                    ),
                }
            )
        );
    }
    // Otherwise, return SignIn.
    return (0, jsx_runtime_1.jsx)(
        styleContext_1.StyleProvider,
        __assign(
            {
                rawPalette: props.config.palette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: props.signInForm.styleFromInit,
                rootStyleFromInit: props.config.rootStyle,
                getDefaultStyles: styles_2.getStyles,
            },
            {
                children: (0, jsx_runtime_1.jsx)(
                    signIn_1.SignIn,
                    __assign({}, props.signInForm, {
                        signUpClicked: function () {
                            props.dispatch({ type: "setSignUp" });
                        },
                    })
                ),
            }
        )
    );
};
exports.SignInAndUpTheme = SignInAndUpTheme;
function SignInAndUpThemeWrapper(props) {
    var hasFont = (0, styles_1.hasFontDefined)(props.config.rootStyle);
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        __assign(
            { userContext: props.userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    themeBase_1.ThemeBase,
                    __assign(
                        { loadDefaultFont: !hasFont },
                        { children: (0, jsx_runtime_1.jsx)(exports.SignInAndUpTheme, __assign({}, props)) }
                    )
                ),
            }
        )
    );
}
exports.default = SignInAndUpThemeWrapper;
