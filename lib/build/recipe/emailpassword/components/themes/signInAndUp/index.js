"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInAndUpTheme = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var signUp_1 = require("./signUp");
var signIn_1 = require("./signIn");
var themeBase_1 = require("../themeBase");
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles/styles");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../../../../usercontext/userContextWrapper"));
var SignInAndUpTheme = function (props) {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return (0, jsx_runtime_1.jsx)(
            styleContext_1.StyleProvider,
            tslib_1.__assign(
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
                        tslib_1.__assign({}, props.signUpForm, {
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
        tslib_1.__assign(
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
                    tslib_1.__assign({}, props.signInForm, {
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
        tslib_1.__assign(
            { userContext: props.userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    themeBase_1.ThemeBase,
                    tslib_1.__assign(
                        { loadDefaultFont: !hasFont },
                        { children: (0, jsx_runtime_1.jsx)(exports.SignInAndUpTheme, tslib_1.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}
exports.default = SignInAndUpThemeWrapper;
