"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUsingTokenTheme = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var themeBase_1 = require("../themeBase");
var resetPasswordEmail_1 = require("./resetPasswordEmail");
var submitNewPassword_1 = require("./submitNewPassword");
var styles_1 = require("../styles/styles");
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_2 = require("../../../../../styles/styles");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../../../../usercontext/userContextWrapper"));
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
            tslib_1.__assign(
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
                        tslib_1.__assign({}, props.submitNewPasswordForm)
                    ),
                }
            )
        );
    }
    // Otherwise, return EnterEmail.
    return (0, jsx_runtime_1.jsx)(
        styleContext_1.StyleProvider,
        tslib_1.__assign(
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
                    tslib_1.__assign({}, props.enterEmailForm)
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
        tslib_1.__assign(
            { userContext: props.userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    themeBase_1.ThemeBase,
                    tslib_1.__assign(
                        { loadDefaultFont: !hasFont },
                        { children: (0, jsx_runtime_1.jsx)(ResetPasswordUsingTokenTheme, tslib_1.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}
exports.default = ResetPasswordUsingTokenThemeWrapper;
