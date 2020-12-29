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

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

/*
 * Imports.
 */

/** @jsx jsx */

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
        placeholder = _ref.placeholder;

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

    return (0, _react.jsx)(
        "div",
        {
            className: "inputWrapper",
            css: [
                styles.inputWrapper,
                process.env.NODE_ENV === "production" ? "" : ";label:Input;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEZzQyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG4vKlxuICogUHJvcHMuXG4gKi9cblxudHlwZSBJbnB1dFByb3BzID0ge1xuICAgIHN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIGVycm9yU3R5bGU/OiBDU1NPYmplY3Q7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBhdXRvQ29tcGxldGU/OiBzdHJpbmc7XG4gICAgaGFzRXJyb3I6IGJvb2xlYW47XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICByZWY6IFJlZk9iamVjdDxhbnk+O1xuICAgIG9uSW5wdXRCbHVyPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG4gICAgb25JbnB1dEZvY3VzPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG59O1xuXG4vKlxuICogQ29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIElucHV0KFxuICAgIHsgdHlwZSwgbmFtZSwgaGFzRXJyb3IsIGF1dG9Db21wbGV0ZSwgb25JbnB1dEZvY3VzLCBvbklucHV0Qmx1ciwgcGxhY2Vob2xkZXIgfTogSW5wdXRQcm9wcyxcbiAgICByZWY6IFJlZk9iamVjdDxJbnB1dFJlZj5cbik6IEpTWC5FbGVtZW50IHtcbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAob25JbnB1dEZvY3VzID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIG9uSW5wdXRGb2N1cyh7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICAgICAgICBpZiAob25JbnB1dEJsdXIgPT09IHVuZGVmaW5lZCB8fCByZWYuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmLmN1cnJlbnQuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIG9uSW5wdXRCbHVyKHtcbiAgICAgICAgICAgIGlkOiByZWYuY3VycmVudC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHJlZi5jdXJyZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIGNvbnN0IHN0eWxlcyA9IHVzZUNvbnRleHQoU3R5bGVDb250ZXh0KTtcbiAgICBjb25zdCBlcnJvclN0eWxlOiBDU1NPYmplY3QgfCB1bmRlZmluZWQgPSBoYXNFcnJvciA9PT0gdHJ1ZSA/IHN0eWxlcy5pbnB1dEVycm9yIDogdW5kZWZpbmVkO1xuICAgIGlmIChhdXRvQ29tcGxldGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhdXRvQ29tcGxldGUgPSBcIm9mZlwiO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRXcmFwcGVyXCIgY3NzPXtbc3R5bGVzLmlucHV0V3JhcHBlcl19PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQgaW5wdXRFcnJvclwiXG4gICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0LCBlcnJvclN0eWxlXX1cbiAgICAgICAgICAgICAgICBvbkZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoSW5wdXQpO1xuIl19 */"
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
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9pbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0dnQiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL2xpYnJhcnkvaW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCwgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbmltcG9ydCB7IGZvcndhcmRSZWYsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQVBJRm9ybUZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJbnB1dFJlZiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG4vKlxuICogUHJvcHMuXG4gKi9cblxudHlwZSBJbnB1dFByb3BzID0ge1xuICAgIHN0eWxlPzogQ1NTT2JqZWN0O1xuICAgIGVycm9yU3R5bGU/OiBDU1NPYmplY3Q7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBhdXRvQ29tcGxldGU/OiBzdHJpbmc7XG4gICAgaGFzRXJyb3I6IGJvb2xlYW47XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICByZWY6IFJlZk9iamVjdDxhbnk+O1xuICAgIG9uSW5wdXRCbHVyPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG4gICAgb25JbnB1dEZvY3VzPzogKGZpZWxkOiBBUElGb3JtRmllbGQpID0+IHZvaWQ7XG59O1xuXG4vKlxuICogQ29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIElucHV0KFxuICAgIHsgdHlwZSwgbmFtZSwgaGFzRXJyb3IsIGF1dG9Db21wbGV0ZSwgb25JbnB1dEZvY3VzLCBvbklucHV0Qmx1ciwgcGxhY2Vob2xkZXIgfTogSW5wdXRQcm9wcyxcbiAgICByZWY6IFJlZk9iamVjdDxJbnB1dFJlZj5cbik6IEpTWC5FbGVtZW50IHtcbiAgICAvKlxuICAgICAqIE1ldGhvZC5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpZiAob25JbnB1dEZvY3VzID09PSB1bmRlZmluZWQgfHwgcmVmLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZi5jdXJyZW50LmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIG9uSW5wdXRGb2N1cyh7XG4gICAgICAgICAgICBpZDogcmVmLmN1cnJlbnQubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiByZWYuY3VycmVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICAgICAgICBpZiAob25JbnB1dEJsdXIgPT09IHVuZGVmaW5lZCB8fCByZWYuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmLmN1cnJlbnQuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIG9uSW5wdXRCbHVyKHtcbiAgICAgICAgICAgIGlkOiByZWYuY3VycmVudC5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHJlZi5jdXJyZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIGNvbnN0IHN0eWxlcyA9IHVzZUNvbnRleHQoU3R5bGVDb250ZXh0KTtcbiAgICBjb25zdCBlcnJvclN0eWxlOiBDU1NPYmplY3QgfCB1bmRlZmluZWQgPSBoYXNFcnJvciA9PT0gdHJ1ZSA/IHN0eWxlcy5pbnB1dEVycm9yIDogdW5kZWZpbmVkO1xuICAgIGlmIChhdXRvQ29tcGxldGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhdXRvQ29tcGxldGUgPSBcIm9mZlwiO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRXcmFwcGVyXCIgY3NzPXtbc3R5bGVzLmlucHV0V3JhcHBlcl19PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQgaW5wdXRFcnJvclwiXG4gICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmlucHV0LCBlcnJvclN0eWxlXX1cbiAgICAgICAgICAgICAgICBvbkZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoSW5wdXQpO1xuIl19 */"
            ],
            onFocus: handleFocus,
            onBlur: handleBlur,
            type: type,
            name: name,
            placeholder: placeholder,
            ref: ref
        })
    );
}

var _default = /*#__PURE__*/ (0, _react2.forwardRef)(Input);

exports["default"] = _default;
