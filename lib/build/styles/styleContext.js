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
var react_1 = __importDefault(require("react"));
var styles_1 = require("./styles");
var StyleContext = react_1.default.createContext({
    palette: {
        colors: {},
        fonts: {
            size: [],
        },
    },
});
function StyleProvider(_a) {
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
    var value = __assign({ palette: palette }, mergedStyles);
    return react_1.default.createElement(StyleContext.Provider, { value: value }, children);
}
exports.StyleProvider = StyleProvider;
/*
 * Helpers
 */
function getMergedPalette(defaultPalette, rawPalette) {
    var palette = defaultPalette;
    for (var key in palette.colors) {
        if (rawPalette[key] !== undefined) {
            palette.colors[key] = rawPalette[key];
        }
    }
    return palette;
}
exports.default = StyleContext;
//# sourceMappingURL=styleContext.js.map
