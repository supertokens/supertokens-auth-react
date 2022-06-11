"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
exports.StyleProvider = function (_a) {
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
        mergedStyles = styles_1.getMergedStyles(mergedStyles, rootStyleFromInit);
    }
    if (styleFromInit !== undefined) {
        // Palette is a reserved word, delete it if exists.
        delete styleFromInit.palette;
        mergedStyles = styles_1.getMergedStyles(mergedStyles, styleFromInit);
    }
    var value = tslib_1.__assign({ palette: palette }, mergedStyles);
    value = addNameToAllStylesRecursively(value, "");
    return react_1.default.createElement(StyleContext.Provider, { value: value }, children);
};
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
