"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleProvider = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = tslib_1.__importDefault(require("react"));
var styles_1 = require("./styles");
var StyleContext = react_1.default.createContext({
    palette: {
        colors: {},
        fonts: {
            size: [],
        },
    },
});
var StyleProvider = function (_a) {
    var children = _a.children,
        styleFromInit = _a.styleFromInit,
        rootStyleFromInit = _a.rootStyleFromInit,
        getDefaultStyles = _a.getDefaultStyles,
        defaultPalette = _a.defaultPalette,
        rawPalette = _a.rawPalette;
    var palette = getMergedPalette(defaultPalette, rawPalette);
    var mergedStyles = getDefaultStyles(palette);
    if (rootStyleFromInit !== undefined) {
        // Palette is a reserved word, delete it if exists.
        delete rootStyleFromInit.palette;
        mergedStyles = (0, styles_1.getMergedStyles)(mergedStyles, rootStyleFromInit);
    }
    if (styleFromInit !== undefined) {
        // Palette is a reserved word, delete it if exists.
        delete styleFromInit.palette;
        mergedStyles = (0, styles_1.getMergedStyles)(mergedStyles, styleFromInit);
    }
    var value = tslib_1.__assign({ palette: palette }, mergedStyles);
    value = addNameToAllStylesRecursively(value, "");
    return (0, jsx_runtime_1.jsx)(StyleContext.Provider, tslib_1.__assign({ value: value }, { children: children }));
};
exports.StyleProvider = StyleProvider;
/*
 * Helpers
 */
/**
 * See https://github.com/supertokens/supertokens-auth-react/issues/354
 * */
function addNameToAllStylesRecursively(styles, propertyName) {
    styles = tslib_1.__assign({ name: "-supertokens-efix-" + propertyName }, styles);
    for (var property in styles) {
        // eslint-disable-next-line no-prototype-builtins
        if (styles.hasOwnProperty(property)) {
            if (typeof styles[property] == "object") {
                styles[property] = addNameToAllStylesRecursively(styles[property], property);
            }
        }
    }
    return styles;
}
function getMergedPalette(defaultPalette, rawPalette) {
    // We copy the defaultPalette into in order to not update the original
    var palette = {
        colors: tslib_1.__assign({}, defaultPalette.colors),
        fonts: tslib_1.__assign({}, defaultPalette.fonts),
    };
    for (var key in palette.colors) {
        if (rawPalette[key] !== undefined) {
            palette.colors[key] = rawPalette[key];
        }
    }
    return palette;
}
exports.default = StyleContext;
