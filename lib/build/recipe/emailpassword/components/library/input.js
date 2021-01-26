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

var _errorIcon = _interopRequireDefault(require("../../assets/errorIcon"));

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
        if (ref.current === null) {
            return;
        }

        ref.current.isFocused = true;

        if (onInputFocus !== undefined) {
            onInputFocus({
                id: ref.current.name,
                value: ref.current.value
            });
        }
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
            "data-supertokens": "inputContainer",
            css: styles.inputContainer
        },
        (0, _react.jsx)(
            "div",
            {
                "data-supertokens": "inputWrapper inputError",
                css: [
                    styles.inputWrapper,
                    errorStyle,
                    process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                    process.env.NODE_ENV === "production"
                        ? ""
                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUg0RCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIxLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IEVycm9ySWNvbiBmcm9tIFwiLi4vLi4vYXNzZXRzL2Vycm9ySWNvblwiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAocmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGlmIChvbklucHV0Rm9jdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb25JbnB1dEZvY3VzKHtcbiAgICAgICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmx1cigpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRCbHVyID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBvbklucHV0Qmx1cih7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmIChyZWYuY3VycmVudCAhPT0gbnVsbCAmJiByZWYuY3VycmVudC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0VmFsdWUocmVmLmN1cnJlbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlQ29udGV4dChTdHlsZUNvbnRleHQpO1xuICAgIGNvbnN0IGVycm9yU3R5bGU6IENTU09iamVjdCB8IHVuZGVmaW5lZCA9IGhhc0Vycm9yID09PSB0cnVlID8gc3R5bGVzLmlucHV0RXJyb3IgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGF1dG9Db21wbGV0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIiAmJiBzaG93UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXRDb250YWluZXJcIiBjc3M9e3N0eWxlcy5pbnB1dENvbnRhaW5lcn0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFdyYXBwZXIgaW5wdXRFcnJvclwiIGNzcz17W3N0eWxlcy5pbnB1dFdyYXBwZXIsIGVycm9yU3R5bGVdfT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdXBlcnRva2Vucy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtoYXNFcnJvciA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudEVycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5pbnB1dEFkb3JubWVudCwgc3R5bGVzLmlucHV0QWRvcm5tZW50RXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7dmFsaWRhdGVkID09PSB0cnVlICYmIGhhc0Vycm9yID09PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudFN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0QWRvcm5tZW50LCBzdHlsZXMuaW5wdXRBZG9ybm1lbnRTdWNjZXNzXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5wcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHt0eXBlID09PSBcInBhc3N3b3JkXCIgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBzaG93UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnNob3dQYXNzd29yZCwgc3R5bGVzLmlucHV0QWRvcm5tZW50XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hvd1Bhc3N3b3JkSWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeUNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuaW5wdXRCYWNrZ3JvdW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYXNzd29yZD17c2hvd1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3J3YXJkUmVmKElucHV0KTtcbiJdfQ== */"
                ]
            },
            (0, _react.jsx)("input", {
                autoComplete: autoComplete,
                "data-supertokens": "input",
                css: styles.input,
                className: "supertokens-input",
                onFocus: handleFocus,
                onBlur: handleBlur,
                type: inputType,
                name: name,
                placeholder: placeholder,
                ref: ref,
                onChange: handleChange
            }),
            hasError === true &&
                (0, _react.jsx)(
                    "div",
                    {
                        "data-supertokens": "inputAdornment inputAdornmentError",
                        css: [
                            styles.inputAdornment,
                            styles.inputAdornmentError,
                            process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                            process.env.NODE_ENV === "production"
                                ? ""
                                : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0l3QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIxLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IEVycm9ySWNvbiBmcm9tIFwiLi4vLi4vYXNzZXRzL2Vycm9ySWNvblwiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAocmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGlmIChvbklucHV0Rm9jdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb25JbnB1dEZvY3VzKHtcbiAgICAgICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmx1cigpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRCbHVyID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBvbklucHV0Qmx1cih7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmIChyZWYuY3VycmVudCAhPT0gbnVsbCAmJiByZWYuY3VycmVudC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0VmFsdWUocmVmLmN1cnJlbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlQ29udGV4dChTdHlsZUNvbnRleHQpO1xuICAgIGNvbnN0IGVycm9yU3R5bGU6IENTU09iamVjdCB8IHVuZGVmaW5lZCA9IGhhc0Vycm9yID09PSB0cnVlID8gc3R5bGVzLmlucHV0RXJyb3IgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGF1dG9Db21wbGV0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIiAmJiBzaG93UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXRDb250YWluZXJcIiBjc3M9e3N0eWxlcy5pbnB1dENvbnRhaW5lcn0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFdyYXBwZXIgaW5wdXRFcnJvclwiIGNzcz17W3N0eWxlcy5pbnB1dFdyYXBwZXIsIGVycm9yU3R5bGVdfT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdXBlcnRva2Vucy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtoYXNFcnJvciA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudEVycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5pbnB1dEFkb3JubWVudCwgc3R5bGVzLmlucHV0QWRvcm5tZW50RXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7dmFsaWRhdGVkID09PSB0cnVlICYmIGhhc0Vycm9yID09PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudFN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0QWRvcm5tZW50LCBzdHlsZXMuaW5wdXRBZG9ybm1lbnRTdWNjZXNzXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5wcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHt0eXBlID09PSBcInBhc3N3b3JkXCIgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBzaG93UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnNob3dQYXNzd29yZCwgc3R5bGVzLmlucHV0QWRvcm5tZW50XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hvd1Bhc3N3b3JkSWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeUNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuaW5wdXRCYWNrZ3JvdW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYXNzd29yZD17c2hvd1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3J3YXJkUmVmKElucHV0KTtcbiJdfQ== */"
                        ]
                    },
                    (0, _react.jsx)(_errorIcon["default"], {
                        color: styles.palette.colors.error
                    })
                ),
            validated === true &&
                hasError === false &&
                (0, _react.jsx)(
                    "div",
                    {
                        "data-supertokens": "inputAdornment inputAdornmentSuccess",
                        css: [
                            styles.inputAdornment,
                            styles.inputAdornmentSuccess,
                            process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                            process.env.NODE_ENV === "production"
                                ? ""
                                : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkl3QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIxLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IEVycm9ySWNvbiBmcm9tIFwiLi4vLi4vYXNzZXRzL2Vycm9ySWNvblwiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAocmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGlmIChvbklucHV0Rm9jdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb25JbnB1dEZvY3VzKHtcbiAgICAgICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmx1cigpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRCbHVyID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBvbklucHV0Qmx1cih7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmIChyZWYuY3VycmVudCAhPT0gbnVsbCAmJiByZWYuY3VycmVudC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0VmFsdWUocmVmLmN1cnJlbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlQ29udGV4dChTdHlsZUNvbnRleHQpO1xuICAgIGNvbnN0IGVycm9yU3R5bGU6IENTU09iamVjdCB8IHVuZGVmaW5lZCA9IGhhc0Vycm9yID09PSB0cnVlID8gc3R5bGVzLmlucHV0RXJyb3IgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGF1dG9Db21wbGV0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIiAmJiBzaG93UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXRDb250YWluZXJcIiBjc3M9e3N0eWxlcy5pbnB1dENvbnRhaW5lcn0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFdyYXBwZXIgaW5wdXRFcnJvclwiIGNzcz17W3N0eWxlcy5pbnB1dFdyYXBwZXIsIGVycm9yU3R5bGVdfT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdXBlcnRva2Vucy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtoYXNFcnJvciA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudEVycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5pbnB1dEFkb3JubWVudCwgc3R5bGVzLmlucHV0QWRvcm5tZW50RXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7dmFsaWRhdGVkID09PSB0cnVlICYmIGhhc0Vycm9yID09PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudFN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0QWRvcm5tZW50LCBzdHlsZXMuaW5wdXRBZG9ybm1lbnRTdWNjZXNzXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5wcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHt0eXBlID09PSBcInBhc3N3b3JkXCIgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBzaG93UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnNob3dQYXNzd29yZCwgc3R5bGVzLmlucHV0QWRvcm5tZW50XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hvd1Bhc3N3b3JkSWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeUNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuaW5wdXRCYWNrZ3JvdW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYXNzd29yZD17c2hvd1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3J3YXJkUmVmKElucHV0KTtcbiJdfQ== */"
                        ]
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
                        "data-supertokens": "inputAdornment showPassword",
                        css: [
                            styles.showPassword,
                            styles.inputAdornment,
                            process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                            process.env.NODE_ENV === "production"
                                ? ""
                                : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUp3QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIxLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IEVycm9ySWNvbiBmcm9tIFwiLi4vLi4vYXNzZXRzL2Vycm9ySWNvblwiO1xuaW1wb3J0IENoZWNrZWRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvY2hlY2tlZEljb25cIjtcbmltcG9ydCBTaG93UGFzc3dvcmRJY29uIGZyb20gXCIuLi8uLi9hc3NldHMvc2hvd1Bhc3N3b3JkSWNvblwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLypcbiAqIFByb3BzLlxuICovXG5cbnR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgICBzdHlsZT86IENTU09iamVjdDtcbiAgICBlcnJvclN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0b0NvbXBsZXRlPzogc3RyaW5nO1xuICAgIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHJlZjogUmVmT2JqZWN0PGFueT47XG4gICAgb25JbnB1dEJsdXI/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbiAgICBvbklucHV0Rm9jdXM/OiAoZmllbGQ6IEFQSUZvcm1GaWVsZCkgPT4gdm9pZDtcbn07XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gSW5wdXQoXG4gICAgeyB0eXBlLCBuYW1lLCBoYXNFcnJvciwgYXV0b0NvbXBsZXRlLCBvbklucHV0Rm9jdXMsIG9uSW5wdXRCbHVyLCBwbGFjZWhvbGRlciwgdmFsaWRhdGVkIH06IElucHV0UHJvcHMsXG4gICAgcmVmOiBSZWZPYmplY3Q8SW5wdXRSZWY+XG4pOiBKU1guRWxlbWVudCB7XG4gICAgLypcbiAgICAgKiBTdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAocmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGlmIChvbklucHV0Rm9jdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb25JbnB1dEZvY3VzKHtcbiAgICAgICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVmLmN1cnJlbnQudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQmx1cigpIHtcbiAgICAgICAgaWYgKG9uSW5wdXRCbHVyID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBvbklucHV0Qmx1cih7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmIChyZWYuY3VycmVudCAhPT0gbnVsbCAmJiByZWYuY3VycmVudC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0VmFsdWUocmVmLmN1cnJlbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlQ29udGV4dChTdHlsZUNvbnRleHQpO1xuICAgIGNvbnN0IGVycm9yU3R5bGU6IENTU09iamVjdCB8IHVuZGVmaW5lZCA9IGhhc0Vycm9yID09PSB0cnVlID8gc3R5bGVzLmlucHV0RXJyb3IgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGF1dG9Db21wbGV0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIiAmJiBzaG93UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaW5wdXRDb250YWluZXJcIiBjc3M9e3N0eWxlcy5pbnB1dENvbnRhaW5lcn0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFdyYXBwZXIgaW5wdXRFcnJvclwiIGNzcz17W3N0eWxlcy5pbnB1dFdyYXBwZXIsIGVycm9yU3R5bGVdfT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdXBlcnRva2Vucy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtoYXNFcnJvciA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudEVycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5pbnB1dEFkb3JubWVudCwgc3R5bGVzLmlucHV0QWRvcm5tZW50RXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7dmFsaWRhdGVkID09PSB0cnVlICYmIGhhc0Vycm9yID09PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBpbnB1dEFkb3JubWVudFN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0QWRvcm5tZW50LCBzdHlsZXMuaW5wdXRBZG9ybm1lbnRTdWNjZXNzXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5wcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHt0eXBlID09PSBcInBhc3N3b3JkXCIgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZChzaG93UGFzc3dvcmQgPT09IGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJpbnB1dEFkb3JubWVudCBzaG93UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnNob3dQYXNzd29yZCwgc3R5bGVzLmlucHV0QWRvcm5tZW50XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hvd1Bhc3N3b3JkSWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeUNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuaW5wdXRCYWNrZ3JvdW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYXNzd29yZD17c2hvd1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3J3YXJkUmVmKElucHV0KTtcbiJdfQ== */"
                        ]
                    },
                    (0, _react.jsx)(_showPasswordIcon["default"], {
                        primaryColor: styles.palette.colors.textPrimary,
                        secondaryColor: styles.palette.colors.inputBackground,
                        showPassword: showPassword
                    })
                )
        )
    );
}

var _default = /*#__PURE__*/ (0, _react2.forwardRef)(Input);

exports["default"] = _default;
