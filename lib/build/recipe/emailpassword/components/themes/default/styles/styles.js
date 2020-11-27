"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultStyles = getDefaultStyles;
exports.defaultPalette = void 0;

var _core = require("@emotion/core");

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
        inputBackground: "#f2f2f2",
        generalErrorBackground: "#fdf3f2",
        primary: "#ff9b33",
        error: "#ff1717",
        textTitle: "#222222",
        textLabel: "#222222",
        textPrimary: "#656565",
        textLink: "#0076ff"
    },
    fonts: {
        size: ["14px", "16px", "28px"]
    }
};
/*
 * Default styles.
 */

exports.defaultPalette = defaultPalette;
var slideTop = (0, _core.keyframes)(_templateObject());
var swingIn = (0, _core.keyframes)(_templateObject2());

function getDefaultStyles(palette) {
    return {
        container: {
            fontFamily: "'Rubik', sans-serif",
            maxWidth: "524px",
            width: "50vw",
            margin: "26px auto",
            minWidth: "420px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
            backgroundColor: palette.colors.background,
            "@media (max-width: 440px)": {
                margin: "12px auto",
                minWidth: "320px"
            },
            "@media (max-width: 340px)": {
                minWidth: "260px"
            },
            "@media (max-width: 300px)": {
                minWidth: "220px"
            }
        },
        row: {
            margin: "0 auto",
            width: "69%",
            paddingTop: "45px",
            paddingBottom: "20px"
        },
        generalError: {
            backgroundColor: palette.colors.generalErrorBackground,
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "18px",
            paddingRight: "18px",
            letterSpacing: "0.2px",
            fontSize: palette.fonts.size[1],
            borderRadius: "12px",
            color: palette.colors.error,
            animation: "".concat(swingIn, " 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both")
        },
        inputWrapper: {
            float: "left",
            width: "100%"
        },
        inputError: {
            border: "1px solid ".concat(palette.colors.error)
        },
        input: {
            width: "94%",
            backgroundColor: palette.colors.inputBackground,
            borderRadius: "12px",
            border: "1px solid #dddddd",
            fontSize: palette.fonts.size[0],
            paddingLeft: "20px",
            letterSpacing: "1.2px",
            "&:focus": {
                border: "1px solid ".concat(palette.colors.primary),
                outline: "none"
            },
            height: "42px"
        },
        inputAdornment: {
            float: "right",
            left: "-2%",
            top: "-24px",
            position: "relative",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            height: "0px"
        },
        inputErrorMessage: {
            paddingTop: "5px",
            paddingBottom: "5px",
            color: palette.colors.error,
            lineHeight: "24px",
            fontWeight: 400,
            textAlign: "left",
            animation: "".concat(slideTop, " 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both")
        },
        inputErrorSymbol: {
            marginRight: "5px",
            top: "1px",
            position: "relative",
            left: "2px"
        },
        button: {
            width: "100%",
            height: "42px",
            backgroundColor: palette.colors.primary,
            color: "white",
            fontWeight: 700,
            borderWidth: "0px",
            borderRadius: "8px",
            "&:disabled": {
                border: "none",
                cursor: "no-drop"
            },
            "&:active": {
                outline: "none",
                border: "none"
            },
            "&:focus": {
                outline: "none",
                border: "none"
            },
            cursor: "pointer"
        },
        label: {
            textAlign: "left",
            fontWeight: 500,
            fontSize: palette.fonts.size[1],
            lineHeight: "24px",
            paddingBottom: "10px",
            color: palette.colors.textLabel
        },
        formRow: {
            display: "flex",
            flexDirection: "column",
            paddingTop: "0px",
            paddingBottom: "35px"
        },
        primaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 400,
            letterSpacing: "0.4px",
            color: palette.colors.textLabel
        },
        secondaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 300,
            letterSpacing: "0.4px",
            color: palette.colors.textPrimary
        },
        link: {
            paddingLeft: "3px",
            paddingRight: "3px",
            color: palette.colors.textLink,
            fontSize: palette.fonts.size[1],
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
        }
    };
}
