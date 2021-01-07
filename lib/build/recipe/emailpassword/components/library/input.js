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

var _checkedIcon = _interopRequireDefault(require("../../assets/checkedIcon"));

var _showPasswordIcon = _interopRequireDefault(require("../../assets/showPasswordIcon"));

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
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEdzQyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgLypcbiAgICAgKiBNZXRob2QuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVGb2N1cygpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRGb2N1cyA9PT0gdW5kZWZpbmVkIHx8IHJlZi5jdXJyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWYuY3VycmVudC5pc0ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICBvbklucHV0Rm9jdXMoe1xuICAgICAgICAgICAgaWQ6IHJlZi5jdXJyZW50Lm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmx1cigpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRCbHVyID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBvbklucHV0Qmx1cih7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICBjb25zdCBzdHlsZXMgPSB1c2VDb250ZXh0KFN0eWxlQ29udGV4dCk7XG4gICAgY29uc3QgZXJyb3JTdHlsZTogQ1NTT2JqZWN0IHwgdW5kZWZpbmVkID0gaGFzRXJyb3IgPT09IHRydWUgPyBzdHlsZXMuaW5wdXRFcnJvciA6IHVuZGVmaW5lZDtcbiAgICBpZiAoYXV0b0NvbXBsZXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXV0b0NvbXBsZXRlID0gXCJvZmZcIjtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRUeXBlID0gdHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJwYXNzd29yZFwiICYmIHNob3dQYXNzd29yZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpbnB1dFR5cGUgPSBcInRleHRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0V3JhcHBlclwiIGNzcz17W3N0eWxlcy5pbnB1dFdyYXBwZXJdfT5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT17YXV0b0NvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0IGlucHV0RXJyb3JcIlxuICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5pbnB1dCwgZXJyb3JTdHlsZV19XG4gICAgICAgICAgICAgICAgb25Gb2N1cz17aGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgb25CbHVyPXtoYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cbiAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7dmFsaWRhdGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0QWRvcm5tZW50XCIgY3NzPXtzdHlsZXMuaW5wdXRBZG9ybm1lbnR9PlxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5wcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHt0eXBlID09PSBcInBhc3N3b3JkXCIgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1Bhc3N3b3JkKHNob3dQYXNzd29yZCA9PT0gZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzaG93UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICBjc3M9e3N0eWxlcy5zaG93UGFzc3dvcmR9PlxuICAgICAgICAgICAgICAgICAgICA8U2hvd1Bhc3N3b3JkSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSBzaG93UGFzc3dvcmQ9e3Nob3dQYXNzd29yZH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoSW5wdXQpO1xuIl19 */"
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
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEdnQiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgLypcbiAgICAgKiBNZXRob2QuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVGb2N1cygpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRGb2N1cyA9PT0gdW5kZWZpbmVkIHx8IHJlZi5jdXJyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWYuY3VycmVudC5pc0ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICBvbklucHV0Rm9jdXMoe1xuICAgICAgICAgICAgaWQ6IHJlZi5jdXJyZW50Lm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmx1cigpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRCbHVyID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBvbklucHV0Qmx1cih7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICBjb25zdCBzdHlsZXMgPSB1c2VDb250ZXh0KFN0eWxlQ29udGV4dCk7XG4gICAgY29uc3QgZXJyb3JTdHlsZTogQ1NTT2JqZWN0IHwgdW5kZWZpbmVkID0gaGFzRXJyb3IgPT09IHRydWUgPyBzdHlsZXMuaW5wdXRFcnJvciA6IHVuZGVmaW5lZDtcbiAgICBpZiAoYXV0b0NvbXBsZXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXV0b0NvbXBsZXRlID0gXCJvZmZcIjtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRUeXBlID0gdHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJwYXNzd29yZFwiICYmIHNob3dQYXNzd29yZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpbnB1dFR5cGUgPSBcInRleHRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0V3JhcHBlclwiIGNzcz17W3N0eWxlcy5pbnB1dFdyYXBwZXJdfT5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT17YXV0b0NvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0IGlucHV0RXJyb3JcIlxuICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5pbnB1dCwgZXJyb3JTdHlsZV19XG4gICAgICAgICAgICAgICAgb25Gb2N1cz17aGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgb25CbHVyPXtoYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cbiAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7dmFsaWRhdGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0QWRvcm5tZW50XCIgY3NzPXtzdHlsZXMuaW5wdXRBZG9ybm1lbnR9PlxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5wcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHt0eXBlID09PSBcInBhc3N3b3JkXCIgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1Bhc3N3b3JkKHNob3dQYXNzd29yZCA9PT0gZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzaG93UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICBjc3M9e3N0eWxlcy5zaG93UGFzc3dvcmR9PlxuICAgICAgICAgICAgICAgICAgICA8U2hvd1Bhc3N3b3JkSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSBzaG93UGFzc3dvcmQ9e3Nob3dQYXNzd29yZH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoSW5wdXQpO1xuIl19 */"
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
                (0, _react.jsx)(_checkedIcon["default"], {
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
                (0, _react.jsx)(_showPasswordIcon["default"], {
                    color: styles.palette.colors.textPrimary,
                    showPassword: showPassword
                })
            )
    );
}

var _default = /*#__PURE__*/ (0, _react2.forwardRef)(Input);

exports["default"] = _default;
