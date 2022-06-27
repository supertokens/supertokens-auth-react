"use strict";
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
var __makeTemplateObject =
    (this && this.__makeTemplateObject) ||
    function (cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
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
exports.hasFontDefined =
    exports.getMergedStyles =
    exports.getButtonStyle =
    exports.getDefaultStyles =
    exports.swingIn =
    exports.slideTop =
    exports.defaultPalette =
        void 0;
var react_1 = require("@emotion/react");
var chroma_js_1 = __importDefault(require("chroma-js"));
/*
 * Palette
 */
exports.defaultPalette = {
    colors: {
        background: "white",
        inputBackground: "#fafafa",
        selectedBackground: "#eeeeee",
        primary: "#ff9b33",
        success: "#41a700",
        error: "#ff1717",
        textTitle: "#222222",
        textLabel: "#222222",
        textInput: "#222222",
        textPrimary: "#656565",
        textLink: "#0076ff",
        buttonText: "white",
        superTokensBrandingBackground: "#F2F5F6",
        superTokensBrandingText: "#ADBDC4",
    },
    fonts: {
        size: ["12px", "14px", "16px", "19px", "24px"],
    },
};
/*
 * Default styles.
 */
exports.slideTop = (0, react_1.keyframes)(
    templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
            [
                "\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n",
            ],
            [
                "\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n",
            ]
        ))
);
exports.swingIn = (0, react_1.keyframes)(
    templateObject_2 ||
        (templateObject_2 = __makeTemplateObject(
            [
                "\n0% {\n    -webkit-transform: rotateX(-100deg);\n            transform: rotateX(-100deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 1;\n  }\n}\n@keyframes swing-in-top-fwd {\n  0% {\n    -webkit-transform: rotateX(-100deg);\n            transform: rotateX(-100deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 1;\n  }\n",
            ],
            [
                "\n0% {\n    -webkit-transform: rotateX(-100deg);\n            transform: rotateX(-100deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 1;\n  }\n}\n@keyframes swing-in-top-fwd {\n  0% {\n    -webkit-transform: rotateX(-100deg);\n            transform: rotateX(-100deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    opacity: 1;\n  }\n",
            ]
        ))
);
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
                width: "95vw",
            },
        },
        row: {
            margin: "0 auto",
            width: "76%",
            paddingTop: "30px",
            paddingBottom: "10px",
        },
        superTokensBranding: {
            display: "block",
            margin: "0 auto",
            background: palette.colors.superTokensBrandingBackground,
            color: palette.colors.superTokensBrandingText,
            textDecoration: "none",
            width: "fit-content",
            borderRadius: "6px 6px 0 0",
            padding: "4px 9px",
            fontWeight: 300,
            fontSize: palette.fonts.size[0],
            letterSpacing: "0.4px",
        },
        generalError: {
            backgroundColor: (0, chroma_js_1.default)(palette.colors.error).brighten(2).luminance(0.9).hex(),
            paddingTop: "10px",
            paddingBottom: "10px",
            marginBottom: "15px",
            paddingLeft: "18px",
            paddingRight: "18px",
            letterSpacing: "0.2px",
            fontSize: palette.fonts.size[1],
            borderRadius: "8px",
            color: palette.colors.error,
            animation: "".concat(exports.swingIn, " 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"),
            overflowWrap: "break-word",
        },
        headerTitle: {
            fontSize: palette.fonts.size[4],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 800,
            marginBottom: "2px",
            color: palette.colors.textTitle,
        },
        headerSubtitle: {
            marginBottom: "21px",
        },
        privacyPolicyAndTermsAndConditions: {
            a: {
                lineHeight: "21px",
            },
            maxWidth: "300px",
            marginTop: "10px",
        },
        primaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 500,
            letterSpacing: "0.4px",
            lineHeight: "21px",
            color: palette.colors.textLabel,
        },
        secondaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 300,
            letterSpacing: "0.4px",
            color: palette.colors.textPrimary,
        },
        link: {
            paddingLeft: "3px",
            paddingRight: "3px",
            color: palette.colors.textLink,
            fontSize: palette.fonts.size[1],
            cursor: "pointer",
            letterSpacing: "0.16px",
            lineHeight: "26px",
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
            borderBottom: "0.3px solid #dddddd",
            alignItems: "center",
            paddingBottom: "5px",
        },
        headerTinyTitle: {
            marginTop: "13px",
            fontSize: palette.fonts.size[3],
            letterSpacing: "1.1px",
            fontWeight: 500,
            lineHeight: "28px",
        },
        secondaryLinkWithArrow: {
            marginTop: "10px",
            marginBottom: "30px",
            cursor: "pointer",
            "&:hover": {
                position: "relative",
                left: "2px",
                wordSpacing: "4px",
            },
        },
        generalSuccess: {
            color: palette.colors.success,
            fontSize: palette.fonts.size[1],
            backgroundColor: (0, chroma_js_1.default)(palette.colors.success).brighten(2).luminance(0.9).hex(),
            animation: "".concat(exports.swingIn, " 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"),
            padding: "9px 15px 9px 15px",
            borderRadius: "6px",
            display: "inline-block",
        },
        spinner: {
            width: "80px",
            height: "auto",
            paddingTop: "20px",
            paddingBottom: "40px",
            margin: "0 auto",
        },
        error: {
            color: palette.colors.error,
        },
        button: getButtonStyle(palette.colors.primary, palette.colors.buttonText),
        linkButton: {
            backgroundColor: "transparent",
            border: 0,
        },
        secondaryLinkWithLeftArrow: {
            marginTop: "10px",
            marginBottom: "40px",
            cursor: "pointer",
            "& svg": {
                marginRight: "0.3em",
            },
            "&:hover svg": {
                position: "relative",
                left: "-4px",
            },
        },
    };
}
exports.getDefaultStyles = getDefaultStyles;
function getButtonStyle(bgColor, color, brighten) {
    var brightness = brighten === true ? 1.1 : 0.95;
    return {
        width: "100%",
        height: "34px",
        backgroundColor: bgColor,
        color: color,
        fontWeight: 700,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "".concat((0, chroma_js_1.default)(bgColor).darken(0.3).hex()),
        borderRadius: "6px",
        backgroundPosition: "center",
        transition: "all 0.4s",
        backgroundSize: "12000%",
        "&:disabled": {
            border: "none",
            cursor: "no-drop",
        },
        "&:active": {
            outline: "none",
            filter: "brightness(".concat(brightness, ")"),
            transition: "all 0s",
            backgroundSize: "100%",
        },
        "&:hover": {
            filter: "brightness(".concat(brightness, ")"),
        },
        "&:focus": {
            outline: "none",
        },
        cursor: "pointer",
    };
}
exports.getButtonStyle = getButtonStyle;
function getMergedStyles(defaultStyles, themeStyles) {
    var styles = defaultStyles;
    for (var key in themeStyles) {
        styles[key] = __assign(__assign({}, styles[key]), themeStyles[key]);
    }
    return styles;
}
exports.getMergedStyles = getMergedStyles;
function hasFontDefined(style) {
    return (style && style.container && (style.container.fontFamily || style.container.font)) !== undefined;
}
exports.hasFontDefined = hasFontDefined;
var templateObject_1, templateObject_2;
