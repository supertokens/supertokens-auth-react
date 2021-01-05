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

var _react = require("@emotion/react");

var _react2 = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../styles/styleContext"));

var _checked = _interopRequireDefault(require("../../assets/checked"));

var _showPassword = _interopRequireDefault(require("../../assets/showPassword"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    );
}

function _nonIterableRest() {
    throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

/*
 * Component.
 */
function Input(_ref, ref) {
    var type = _ref.type,
        name = _ref.name,
        hasError = _ref.hasError,
        autoComplete = _ref.autoComplete,
        onInputFocus = _ref.onInputFocus,
        onInputBlur = _ref.onInputBlur,
        placeholder = _ref.placeholder,
        validated = _ref.validated;

    /*
     * State.
     */
    var _useState = (0, _react2.useState)(false),
        _useState2 = _slicedToArray(_useState, 2),
        showPassword = _useState2[0],
        setShowPassword = _useState2[1];
    /*
     * Method.
     */

    function handleFocus() {
        if (onInputFocus === undefined || ref.current === null) {
            return;
        }

        ref.current.isFocused = true;
        onInputFocus({
            id: ref.current.name,
            value: ref.current.value
        });
    }

    function handleBlur() {
        if (onInputBlur === undefined || ref.current === null) {
            return;
        }

        ref.current.isFocused = false;
        onInputBlur({
            id: ref.current.name,
            value: ref.current.value
        });
    }
    /*
     * Render.
     */

    var styles = (0, _react2.useContext)(_styleContext["default"]);
    var errorStyle = hasError === true ? styles.inputError : undefined;

    if (autoComplete === undefined) {
        autoComplete = "off";
    }

    var inputType = type;

    if (type === "password" && showPassword === true) {
        inputType = "text";
    }

    return (0, _react.jsx)(
        "div",
        {
            className: "inputWrapper",
            css: [
                styles.inputWrapper,
                process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEdzQyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZFwiO1xuaW1wb3J0IFNob3dQYXNzd29yZEljb24gZnJvbSBcIi4uLy4uL2Fzc2V0cy9zaG93UGFzc3dvcmRcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8qXG4gKiBQcm9wcy5cbiAqL1xuXG50eXBlIElucHV0UHJvcHMgPSB7XG4gICAgc3R5bGU/OiBDU1NPYmplY3Q7XG4gICAgZXJyb3JTdHlsZT86IENTU09iamVjdDtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGF1dG9Db21wbGV0ZT86IHN0cmluZztcbiAgICB2YWxpZGF0ZWQ6IGJvb2xlYW47XG4gICAgaGFzRXJyb3I6IGJvb2xlYW47XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICByZWY6IFJlZk9iamVjdDxhbnk+O1xuICAgIG9uSW5wdXRCbHVyPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG4gICAgb25JbnB1dEZvY3VzPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG59O1xuXG4vKlxuICogQ29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIElucHV0KFxuICAgIHsgdHlwZSwgbmFtZSwgaGFzRXJyb3IsIGF1dG9Db21wbGV0ZSwgb25JbnB1dEZvY3VzLCBvbklucHV0Qmx1ciwgcGxhY2Vob2xkZXIsIHZhbGlkYXRlZCB9OiBJbnB1dFByb3BzLFxuICAgIHJlZjogUmVmT2JqZWN0PElucHV0UmVmPlxuKTogSlNYLkVsZW1lbnQge1xuICAgIC8qXG4gICAgICogU3RhdGUuXG4gICAgICovXG4gICAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIC8qXG4gICAgICogTWV0aG9kLlxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gICAgICAgIGlmIChvbklucHV0Rm9jdXMgPT09IHVuZGVmaW5lZCB8fCByZWYuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmLmN1cnJlbnQuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgb25JbnB1dEZvY3VzKHtcbiAgICAgICAgICAgIGlkOiByZWYuY3VycmVudC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHJlZi5jdXJyZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gICAgICAgIGlmIChvbklucHV0Qmx1ciA9PT0gdW5kZWZpbmVkIHx8IHJlZi5jdXJyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWYuY3VycmVudC5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgb25JbnB1dEJsdXIoe1xuICAgICAgICAgICAgaWQ6IHJlZi5jdXJyZW50Lm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlQ29udGV4dChTdHlsZUNvbnRleHQpO1xuICAgIGNvbnN0IGVycm9yU3R5bGU6IENTU09iamVjdCB8IHVuZGVmaW5lZCA9IGhhc0Vycm9yID09PSB0cnVlID8gc3R5bGVzLmlucHV0RXJyb3IgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGF1dG9Db21wbGV0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIiAmJiBzaG93UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dFdyYXBwZXJcIiBjc3M9e1tzdHlsZXMuaW5wdXRXcmFwcGVyXX0+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dCBpbnB1dEVycm9yXCJcbiAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuaW5wdXQsIGVycm9yU3R5bGVdfVxuICAgICAgICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgIG9uQmx1cj17aGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICB0eXBlPXtpbnB1dFR5cGV9XG4gICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3ZhbGlkYXRlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dEFkb3JubWVudFwiIGNzcz17c3R5bGVzLmlucHV0QWRvcm5tZW50fT5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrZWRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dHlwZSA9PT0gXCJwYXNzd29yZFwiICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX0gY2xhc3NOYW1lPVwic2hvd1Bhc3N3b3JkXCIgY3NzPXtzdHlsZXMuc2hvd1Bhc3N3b3JkfT5cbiAgICAgICAgICAgICAgICAgICAgPFNob3dQYXNzd29yZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gc2hvd1Bhc3N3b3JkPXtzaG93UGFzc3dvcmR9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoSW5wdXQpO1xuIl19 */"
            ]
        },
        (0, _react.jsx)("input", {
            autoComplete: autoComplete,
            className: "input inputError",
            css: [
                styles.input,
                errorStyle,
                process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEdnQiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZFwiO1xuaW1wb3J0IFNob3dQYXNzd29yZEljb24gZnJvbSBcIi4uLy4uL2Fzc2V0cy9zaG93UGFzc3dvcmRcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8qXG4gKiBQcm9wcy5cbiAqL1xuXG50eXBlIElucHV0UHJvcHMgPSB7XG4gICAgc3R5bGU/OiBDU1NPYmplY3Q7XG4gICAgZXJyb3JTdHlsZT86IENTU09iamVjdDtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGF1dG9Db21wbGV0ZT86IHN0cmluZztcbiAgICB2YWxpZGF0ZWQ6IGJvb2xlYW47XG4gICAgaGFzRXJyb3I6IGJvb2xlYW47XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICByZWY6IFJlZk9iamVjdDxhbnk+O1xuICAgIG9uSW5wdXRCbHVyPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG4gICAgb25JbnB1dEZvY3VzPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG59O1xuXG4vKlxuICogQ29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIElucHV0KFxuICAgIHsgdHlwZSwgbmFtZSwgaGFzRXJyb3IsIGF1dG9Db21wbGV0ZSwgb25JbnB1dEZvY3VzLCBvbklucHV0Qmx1ciwgcGxhY2Vob2xkZXIsIHZhbGlkYXRlZCB9OiBJbnB1dFByb3BzLFxuICAgIHJlZjogUmVmT2JqZWN0PElucHV0UmVmPlxuKTogSlNYLkVsZW1lbnQge1xuICAgIC8qXG4gICAgICogU3RhdGUuXG4gICAgICovXG4gICAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIC8qXG4gICAgICogTWV0aG9kLlxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gICAgICAgIGlmIChvbklucHV0Rm9jdXMgPT09IHVuZGVmaW5lZCB8fCByZWYuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmLmN1cnJlbnQuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgb25JbnB1dEZvY3VzKHtcbiAgICAgICAgICAgIGlkOiByZWYuY3VycmVudC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHJlZi5jdXJyZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gICAgICAgIGlmIChvbklucHV0Qmx1ciA9PT0gdW5kZWZpbmVkIHx8IHJlZi5jdXJyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWYuY3VycmVudC5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgb25JbnB1dEJsdXIoe1xuICAgICAgICAgICAgaWQ6IHJlZi5jdXJyZW50Lm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlQ29udGV4dChTdHlsZUNvbnRleHQpO1xuICAgIGNvbnN0IGVycm9yU3R5bGU6IENTU09iamVjdCB8IHVuZGVmaW5lZCA9IGhhc0Vycm9yID09PSB0cnVlID8gc3R5bGVzLmlucHV0RXJyb3IgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGF1dG9Db21wbGV0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIiAmJiBzaG93UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dFdyYXBwZXJcIiBjc3M9e1tzdHlsZXMuaW5wdXRXcmFwcGVyXX0+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dCBpbnB1dEVycm9yXCJcbiAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuaW5wdXQsIGVycm9yU3R5bGVdfVxuICAgICAgICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgIG9uQmx1cj17aGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICB0eXBlPXtpbnB1dFR5cGV9XG4gICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3ZhbGlkYXRlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dEFkb3JubWVudFwiIGNzcz17c3R5bGVzLmlucHV0QWRvcm5tZW50fT5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrZWRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dHlwZSA9PT0gXCJwYXNzd29yZFwiICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX0gY2xhc3NOYW1lPVwic2hvd1Bhc3N3b3JkXCIgY3NzPXtzdHlsZXMuc2hvd1Bhc3N3b3JkfT5cbiAgICAgICAgICAgICAgICAgICAgPFNob3dQYXNzd29yZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gc2hvd1Bhc3N3b3JkPXtzaG93UGFzc3dvcmR9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoSW5wdXQpO1xuIl19 */"
            ],
            onFocus: handleFocus,
            onBlur: handleBlur,
            type: inputType,
            name: name,
            placeholder: placeholder,
            ref: ref
        }),
        validated === true &&
            (0, _react.jsx)(
                "div",
                {
                    className: "inputAdornment",
                    css: styles.inputAdornment
                },
                (0, _react.jsx)(_checked["default"], {
                    color: styles.palette.colors.primary
                })
            ),
        type === "password" &&
            (0, _react.jsx)(
                "div",
                {
                    onClick: function onClick() {
                        return setShowPassword(showPassword === false);
                    },
                    className: "showPassword",
                    css: styles.showPassword
                },
                (0, _react.jsx)(_showPassword["default"], {
                    color: styles.palette.colors.textPrimary,
                    showPassword: showPassword
                })
            )
    );
}

var _default = /*#__PURE__*/ (0, _react2.forwardRef)(Input);

exports["default"] = _default;
