"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultStyles = getDefaultStyles;
exports.defaultPalette = void 0;

var _react = require("@emotion/react");

var _chromaJs = _interopRequireDefault(require("chroma-js"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _templateObject2() {
    var data = _taggedTemplateLiteral([
        "\n0% {\n    -webkit-transform: rotateX(-100deg);\n            transform: rotateX(-100deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 1;\n  }\n}\n@keyframes swing-in-top-fwd {\n  0% {\n    -webkit-transform: rotateX(-100deg);\n            transform: rotateX(-100deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 1;\n  }\n"
    ]);

    _templateObject2 = function _templateObject2() {
        return data;
    };

    return data;
}

function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n"
    ]);

    _templateObject = function _templateObject() {
        return data;
    };

    return data;
}

function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

/*
 * Palette
 */
var defaultPalette = {
    colors: {
        background: "white",
        inputBackground: "#fafafa",
        primary: "#ff9b33",
        success: "#41a700",
        error: "#ff1717",
        textTitle: "#222222",
        textLabel: "#222222",
        textInput: "#222222",
        textPrimary: "#656565",
        textLink: "#0076ff"
    },
    fonts: {
        size: ["14px", "16px", "19px", "24px"]
    }
};
/*
 * Default styles.
 */

exports.defaultPalette = defaultPalette;
var slideTop = (0, _react.keyframes)(_templateObject());
var swingIn = (0, _react.keyframes)(_templateObject2());

function getDefaultStyles(palette) {
    return {
        container: {
            fontFamily: "'Rubik', sans-serif",
            margin: "12px auto",
            marginTop: "26px",
            marginBottom: "26px",
            width: "420px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
            backgroundColor: palette.colors.background,
            "@media (max-width: 440px)": {
                width: "95vw"
            }
        },
        row: {
            margin: "0 auto",
            width: "76%",
            paddingTop: "30px",
            paddingBottom: "10px"
        },
        generalError: {
            backgroundColor: (0, _chromaJs["default"])(palette.colors.error)
                .brighten(2)
                .luminance(0.9)
                .hex(),
            paddingTop: "10px",
            paddingBottom: "10px",
            marginBottom: "15px",
            paddingLeft: "18px",
            paddingRight: "18px",
            letterSpacing: "0.2px",
            fontSize: palette.fonts.size[0],
            borderRadius: "8px",
            color: palette.colors.error,
            animation: "".concat(swingIn, " 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both")
        },
        inputContainer: {
            marginTop: "6px"
        },
        inputWrapper: {
            boxSizing: "border-box",
            width: "100%",
            display: "flex",
            backgroundColor: palette.colors.inputBackground,
            height: "34px",
            borderRadius: "6px",
            border: "1px solid ".concat((0, _chromaJs["default"])(palette.colors.inputBackground).darken(0.5)),
            "&:focus-within": {
                backgroundColor: "".concat((0, _chromaJs["default"])(palette.colors.inputBackground).alpha(0.25)),
                border: "1px solid ".concat(palette.colors.primary),
                boxShadow: "0 0 0 0.2rem ".concat((0, _chromaJs["default"])(palette.colors.primary).alpha(0.25)),
                outline: "none"
            }
        },
        inputError: {
            border: "1px solid ".concat(palette.colors.error),
            boxShadow: "0 0 0 0.2rem ".concat((0, _chromaJs["default"])(palette.colors.error).alpha(0.25)),
            outline: "none",
            "&:focus-within": {
                border: "1px solid ".concat(palette.colors.error),
                boxShadow: "0 0 0 0.2rem ".concat((0, _chromaJs["default"])(palette.colors.error).alpha(0.25)),
                outline: "none"
            }
        },
        input: {
            boxSizing: "border-box",
            paddingLeft: "15px",
            filter: "none",
            color: palette.colors.textInput,
            backgroundColor: "transparent",
            borderRadius: "6px",
            fontSize: palette.fonts.size[0],
            border: "none",
            paddingRight: "25px",
            letterSpacing: "1.2px",
            flex: "9 1 75%",
            width: "75%",
            height: "32px",
            "&:focus": {
                border: "none",
                outline: "none"
            }
        },
        inputAdornment: {
            justifyContent: "center",
            position: "relative",
            top: "7px",
            marginRight: "5px"
        },
        showPassword: {
            cursor: "pointer"
        },
        headerTitle: {
            fontSize: palette.fonts.size[3],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 800,
            marginBottom: "2px",
            color: palette.colors.textTitle
        },
        headerSubtitle: {
            marginBottom: "21px"
        },
        forgotPasswordLink: {
            marginTop: "10px"
        },
        enterEmailSuccessMessage: {
            marginTop: "15px",
            marginBottom: "15px"
        },
        submitNewPasswordSuccessMessage: {
            marginTop: "15px",
            marginBottom: "15px"
        },
        privacyPolicyAndTermsAndConditions: {
            maxWidth: "300px",
            marginTop: "10px"
        },
        inputErrorMessage: {
            paddingTop: "5px",
            paddingBottom: "5px",
            color: palette.colors.error,
            lineHeight: "24px",
            fontWeight: 400,
            fontSize: palette.fonts.size[0],
            textAlign: "left",
            animation: "".concat(slideTop, " 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"),
            maxWidth: "330px",
            "@media (max-width: 440px)": {
                maxWidth: "250px"
            }
        },
        inputErrorSymbol: {
            marginRight: "5px",
            top: "1px",
            position: "relative",
            left: "2px"
        },
        button: {
            width: "100%",
            height: "34px",
            backgroundColor: palette.colors.primary,
            color: "white",
            fontWeight: 700,
            border: "1px solid ".concat(
                (0, _chromaJs["default"])(palette.colors.primary)
                    .darken(0.3)
                    .hex()
            ),
            borderRadius: "8px",
            backgroundPosition: "center",
            backgroundImage: "radial-gradient(circle, transparent 1%, ".concat(palette.colors.primary, " 1%)"),
            transition: "background 0.4s",
            backgroundSize: "12000%",
            "&:disabled": {
                border: "none",
                cursor: "no-drop"
            },
            "&:active": {
                outline: "none",
                border: "none",
                backgroundColor: (0, _chromaJs["default"])(palette.colors.primary)
                    .darken(0.1)
                    .hex(),
                transition: "background 0s",
                backgroundSize: "100%"
            },
            "&:hover": {
                backgroundColor: (0, _chromaJs["default"])(palette.colors.primary)
                    .darken(0.1)
                    .hex()
            },
            "&:focus": {
                outline: "none",
                border: "none"
            },
            cursor: "pointer"
        },
        label: {
            textAlign: "left",
            fontWeight: 600,
            fontSize: palette.fonts.size[0],
            lineHeight: "24px",
            color: palette.colors.textLabel
        },
        formRow: {
            display: "flex",
            flexDirection: "column",
            paddingTop: "0px",
            paddingBottom: "34px"
        },
        primaryText: {
            fontSize: palette.fonts.size[0],
            fontWeight: 500,
            letterSpacing: "0.4px",
            lineHeight: "21px",
            color: palette.colors.textLabel
        },
        secondaryText: {
            fontSize: palette.fonts.size[0],
            fontWeight: 300,
            letterSpacing: "0.4px",
            color: palette.colors.textPrimary
        },
        link: {
            paddingLeft: "3px",
            paddingRight: "3px",
            color: palette.colors.textLink,
            fontSize: palette.fonts.size[0],
            cursor: "pointer",
            letterSpacing: "0.16px",
            lineHeight: "26px"
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
            borderBottom: "0.3px solid #dddddd",
            display: "flex",
            alignItems: "center",
            paddingBottom: "5px"
        },
        sendVerifyEmailIcon: {
            marginTop: "11px"
        },
        headerTinyTitle: {
            marginTop: "13px",
            fontSize: palette.fonts.size[2],
            letterSpacing: "1.1px",
            fontWeight: 500,
            lineHeight: "28px"
        },
        sendVerifyEmailText: {
            lineHeight: "21px",
            fontSize: palette.fonts.size[0],
            textAlign: "center",
            fontWeight: 300,
            letterSpacing: "0.8px"
        },
        secondaryLinkWithArrow: {
            marginTop: "10px",
            marginBottom: "30px",
            cursor: "pointer",
            "&:hover": {
                position: "relative",
                left: "2px",
                wordSpacing: "4px"
            }
        },
        sendVerifyEmailResend: {
            marginTop: "13px",
            fontWeight: 300,
            "&:hover": {
                textDecoration: "underline"
            }
        },
        generalSuccess: {
            color: palette.colors.success,
            fontSize: palette.fonts.size[0],
            backgroundColor: (0, _chromaJs["default"])(palette.colors.success)
                .brighten(2)
                .luminance(0.9)
                .hex(),
            animation: "".concat(swingIn, " 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"),
            padding: "9px 15px 9px 15px",
            borderRadius: "6px",
            display: "inline-block"
        },
        spinner: {
            width: "80px",
            height: "auto",
            paddingTop: "20px",
            paddingBottom: "40px",
            margin: "0 auto"
        },
        error: {
            color: palette.colors.error
        },
        noFormRow: {
            paddingBottom: "25px"
        },
        emailVerificationButtonWrapper: {
            paddingTop: "25px",
            maxWidth: "96px",
            margin: "0 auto"
        }
    };
}
