"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _core = require("@emotion/core");

var React = _interopRequireWildcard(require("react"));

var _ = require(".");

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
        return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
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

/*
 * Component.
 */
function Input(_ref, ref) {
    var style = _ref.style,
        type = _ref.type,
        name = _ref.name,
        hasError = _ref.hasError,
        adornmentStyle = _ref.adornmentStyle,
        onChange = _ref.onChange,
        placeholder = _ref.placeholder,
        validated = _ref.validated,
        defaultStyles = _ref.defaultStyles,
        palette = _ref.palette,
        errorStyle = _ref.errorStyle;

    if (hasError !== true) {
        errorStyle = undefined;
    } else {
        errorStyle = _objectSpread(_objectSpread({}, defaultStyles.inputError), errorStyle);
    }

    var adornmentType = undefined;

    if (validated) {
        adornmentType = hasError ? "error" : "success";
    }
    /*
     * Method.
     */

    function handleChange() {
        if (onChange) {
            onChange({
                id: ref.current.name,
                value: ref.current.value
            });
        }
    }
    /*
     * Render.
     */

    return (0, _core.jsx)(
        "div",
        {
            className: "inputWrapper",
            css: [defaultStyles.inputWrapper]
        },
        (0, _core.jsx)("input", {
            className: "input inputError",
            css: [defaultStyles.input, style, errorStyle],
            onFocus: handleChange,
            type: type,
            name: name,
            placeholder: placeholder,
            ref: ref
        }),
        (0, _core.jsx)(_.InputAdornment, {
            defaultStyles: defaultStyles,
            palette: palette,
            style: adornmentStyle,
            type: adornmentType
        })
    );
}

var _default = /*#__PURE__*/ (0, React.forwardRef)(Input);

exports["default"] = _default;
