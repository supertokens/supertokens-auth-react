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

    var _useState3 = (0, _react2.useState)(""),
        _useState4 = _slicedToArray(_useState3, 2),
        value = _useState4[0],
        setValue = _useState4[1];
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

    function handleChange() {
        if (ref.current !== null && ref.current.value !== null) {
            setValue(ref.current.value);
        }
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
            "data-supertokens": "inputWrapper",
            css: [
                styles.inputWrapper,
                process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUg2QyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAob25JbnB1dEZvY3VzID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIG9uSW5wdXRGb2N1cyh7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICAgICAgICBpZiAob25JbnB1dEJsdXIgPT09IHVuZGVmaW5lZCB8fCByZWYuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmLmN1cnJlbnQuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIG9uSW5wdXRCbHVyKHtcbiAgICAgICAgICAgIGlkOiByZWYuY3VycmVudC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHJlZi5jdXJyZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHJlZi5jdXJyZW50ICE9PSBudWxsICYmIHJlZi5jdXJyZW50LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzZXRWYWx1ZShyZWYuY3VycmVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICBjb25zdCBzdHlsZXMgPSB1c2VDb250ZXh0KFN0eWxlQ29udGV4dCk7XG4gICAgY29uc3QgZXJyb3JTdHlsZTogQ1NTT2JqZWN0IHwgdW5kZWZpbmVkID0gaGFzRXJyb3IgPT09IHRydWUgPyBzdHlsZXMuaW5wdXRFcnJvciA6IHVuZGVmaW5lZDtcbiAgICBpZiAoYXV0b0NvbXBsZXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXV0b0NvbXBsZXRlID0gXCJvZmZcIjtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRUeXBlID0gdHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJwYXNzd29yZFwiICYmIHNob3dQYXNzd29yZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpbnB1dFR5cGUgPSBcInRleHRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFdyYXBwZXJcIiBjc3M9e1tzdHlsZXMuaW5wdXRXcmFwcGVyXX0+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXQgaW5wdXRFcnJvclwiXG4gICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0LCBlcnJvclN0eWxlXX1cbiAgICAgICAgICAgICAgICBvbkZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgdHlwZT17aW5wdXRUeXBlfVxuICAgICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3ZhbGlkYXRlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXRBZG9ybm1lbnRcIiBjc3M9e3N0eWxlcy5pbnB1dEFkb3JubWVudH0+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja2VkSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3R5cGUgPT09IFwicGFzc3dvcmRcIiAmJiB2YWx1ZS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cInNob3dQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGVzLnNob3dQYXNzd29yZH0+XG4gICAgICAgICAgICAgICAgICAgIDxTaG93UGFzc3dvcmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMudGV4dFByaW1hcnl9IHNob3dQYXNzd29yZD17c2hvd1Bhc3N3b3JkfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9yd2FyZFJlZihJbnB1dCk7XG4iXX0= */"
            ]
        },
        (0, _react.jsx)("input", {
            autoComplete: autoComplete,
            "data-supertokens": "input inputError",
            css: [
                styles.input,
                errorStyle,
                process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUhnQiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAob25JbnB1dEZvY3VzID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIG9uSW5wdXRGb2N1cyh7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICAgICAgICBpZiAob25JbnB1dEJsdXIgPT09IHVuZGVmaW5lZCB8fCByZWYuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmLmN1cnJlbnQuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIG9uSW5wdXRCbHVyKHtcbiAgICAgICAgICAgIGlkOiByZWYuY3VycmVudC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHJlZi5jdXJyZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHJlZi5jdXJyZW50ICE9PSBudWxsICYmIHJlZi5jdXJyZW50LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzZXRWYWx1ZShyZWYuY3VycmVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICBjb25zdCBzdHlsZXMgPSB1c2VDb250ZXh0KFN0eWxlQ29udGV4dCk7XG4gICAgY29uc3QgZXJyb3JTdHlsZTogQ1NTT2JqZWN0IHwgdW5kZWZpbmVkID0gaGFzRXJyb3IgPT09IHRydWUgPyBzdHlsZXMuaW5wdXRFcnJvciA6IHVuZGVmaW5lZDtcbiAgICBpZiAoYXV0b0NvbXBsZXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXV0b0NvbXBsZXRlID0gXCJvZmZcIjtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRUeXBlID0gdHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJwYXNzd29yZFwiICYmIHNob3dQYXNzd29yZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpbnB1dFR5cGUgPSBcInRleHRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFdyYXBwZXJcIiBjc3M9e1tzdHlsZXMuaW5wdXRXcmFwcGVyXX0+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXQgaW5wdXRFcnJvclwiXG4gICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0LCBlcnJvclN0eWxlXX1cbiAgICAgICAgICAgICAgICBvbkZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgdHlwZT17aW5wdXRUeXBlfVxuICAgICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3ZhbGlkYXRlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXRBZG9ybm1lbnRcIiBjc3M9e3N0eWxlcy5pbnB1dEFkb3JubWVudH0+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja2VkSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3R5cGUgPT09IFwicGFzc3dvcmRcIiAmJiB2YWx1ZS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cInNob3dQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGVzLnNob3dQYXNzd29yZH0+XG4gICAgICAgICAgICAgICAgICAgIDxTaG93UGFzc3dvcmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMudGV4dFByaW1hcnl9IHNob3dQYXNzd29yZD17c2hvd1Bhc3N3b3JkfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9yd2FyZFJlZihJbnB1dCk7XG4iXX0= */"
            ],
            onFocus: handleFocus,
            onBlur: handleBlur,
            type: inputType,
            name: name,
            placeholder: placeholder,
            ref: ref,
            onChange: handleChange
        }),
        validated === true &&
            (0, _react.jsx)(
                "div",
                {
                    "data-supertokens": "inputAdornment",
                    css: styles.inputAdornment
                },
                (0, _react.jsx)(_checkedIcon["default"], {
                    color: styles.palette.colors.primary
                })
            ),
        type === "password" &&
            value.length > 0 &&
            (0, _react.jsx)(
                "div",
                {
                    onClick: function onClick() {
                        return setShowPassword(showPassword === false);
                    },
                    "data-supertokens": "showPassword",
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
