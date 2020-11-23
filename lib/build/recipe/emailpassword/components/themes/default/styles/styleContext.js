"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StyleProvider = StyleProvider;
exports.StyleConsumer = void 0;

var _react = _interopRequireDefault(require("react"));

var _emailPassword = _interopRequireDefault(require("../../../../emailPassword"));

var _constants = require("../constants");

var _styles = require("./styles");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var StyleContext = /*#__PURE__*/ _react["default"].createContext(
    _objectSpread(
        {
            palette: _styles.defaultPalette
        },
        (0, _styles.getDefaultStyles)(_styles.defaultPalette)
    )
);

function StyleProvider(_ref) {
    var children = _ref.children,
        styleFromInit = _ref.styleFromInit;

    var rawPalette = _emailPassword["default"].getInstanceOrThrow().getConfig().palette;

    var palette = getMergedPalette(rawPalette);

    var styles = _objectSpread(
        {
            palette: palette
        },
        (0, _styles.getDefaultStyles)(palette)
    );

    if (styleFromInit !== undefined) {
        // Palette is a reserved word, delete it if exists.
        delete styleFromInit.palette;
        Object.keys(styleFromInit).forEach(function(key) {
            return [(styles[key] = _objectSpread(_objectSpread({}, styles[key]), styleFromInit[key]))];
        });
    }

    return /*#__PURE__*/ _react["default"].createElement(
        StyleContext.Provider,
        {
            value: styles
        },
        children
    );
}

var StyleConsumer = StyleContext.Consumer;
/*
 * Helpers
 */

exports.StyleConsumer = StyleConsumer;

function getMergedPalette(rawPalette) {
    var palette = _styles.defaultPalette;

    for (var key in _constants.PALETTE_COLORS_OPTIONS_ARRAY) {
        if (rawPalette[key] !== undefined) {
            palette.colors[key] = rawPalette[key];
        }
    }

    return palette;
}
