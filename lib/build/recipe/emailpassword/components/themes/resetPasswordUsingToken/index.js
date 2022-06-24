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
exports.ResetPasswordUsingTokenTheme = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var themeBase_1 = require("../themeBase");
var resetPasswordEmail_1 = require("./resetPasswordEmail");
var submitNewPassword_1 = require("./submitNewPassword");
var styles_1 = require("../styles/styles");
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_2 = require("../../../../../styles/styles");
var userContextWrapper_1 = __importDefault(require("../../../../../usercontext/userContextWrapper"));
/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return (0, jsx_runtime_1.jsx)(
            styleContext_1.StyleProvider,
            __assign(
                {
                    rawPalette: props.config.palette,
                    defaultPalette: styles_2.defaultPalette,
                    styleFromInit: props.submitNewPasswordForm.styleFromInit,
                    rootStyleFromInit: props.config.rootStyle,
                    getDefaultStyles: styles_1.getStyles,
                },
                {
                    children: (0, jsx_runtime_1.jsx)(
                        submitNewPassword_1.SubmitNewPassword,
                        __assign({}, props.submitNewPasswordForm)
                    ),
                }
            )
        );
    }
    // Otherwise, return EnterEmail.
    return (0, jsx_runtime_1.jsx)(
        styleContext_1.StyleProvider,
        __assign(
            {
                rawPalette: props.config.palette,
                defaultPalette: styles_2.defaultPalette,
                styleFromInit: props.enterEmailForm.styleFromInit,
                rootStyleFromInit: props.config.rootStyle,
                getDefaultStyles: styles_1.getStyles,
            },
            {
                children: (0, jsx_runtime_1.jsx)(
                    resetPasswordEmail_1.ResetPasswordEmail,
                    __assign({}, props.enterEmailForm)
                ),
            }
        )
    );
}
exports.ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
function ResetPasswordUsingTokenThemeWrapper(props) {
    var hasFont = (0, styles_2.hasFontDefined)(props.config.rootStyle);
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        __assign(
            { userContext: props.userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    themeBase_1.ThemeBase,
                    __assign(
                        { loadDefaultFont: !hasFont },
                        { children: (0, jsx_runtime_1.jsx)(ResetPasswordUsingTokenTheme, __assign({}, props)) }
                    )
                ),
            }
        )
    );
}
exports.default = ResetPasswordUsingTokenThemeWrapper;
