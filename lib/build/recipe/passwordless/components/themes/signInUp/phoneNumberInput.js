"use strict";
/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
            }
        return t;
    };
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_select_1 = __importStar(require("react-select"));
var react_2 = require("react");
var min_1 = __importStar(require("react-phone-number-input/min"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var errorIcon_1 = __importDefault(require("../../../../../components/assets/errorIcon"));
/*
 * Component.
 */
function PhoneNumberInput(_a) {
    var defaultCountry = _a.defaultCountry,
        autoComplete = _a.autoComplete,
        autofocus = _a.autofocus,
        name = _a.name,
        onInputBlur = _a.onInputBlur,
        onInputFocus = _a.onInputFocus,
        onChange = _a.onChange,
        hasError = _a.hasError,
        placeholder = _a.placeholder,
        value = _a.value;
    var styles = react_2.useContext(styleContext_1.default);
    function handleFocus() {
        if (onInputFocus !== undefined) {
            onInputFocus({
                id: name,
                value: value,
            });
        }
    }
    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur({
                id: name,
                value: value,
            });
        }
    }
    function handleChange(newValue) {
        if (onChange !== undefined) {
            onChange({
                id: name,
                value: newValue,
            });
        }
    }
    var errorStyle = hasError === true ? styles.inputError : undefined;
    /*
     * Render.
     */
    return react_1.jsx(
        "div",
        { "data-supertokens": "inputContainer", css: styles.inputContainer },
        react_1.jsx(
            "div",
            { "data-supertokens": "inputWrapper inputError", css: [styles.inputWrapper, errorStyle] },
            react_1.jsx(min_1.default, {
                "data-supertokens": "input phoneInputLibRoot",
                countrySelectComponent: CountrySelectWithIcon,
                css: [styles.input, styles.phoneInputLibRoot],
                name: name + "_text",
                autoFocus: autofocus,
                autoComplete: autoComplete,
                value: value,
                onChange: handleChange,
                countryCallingCodeEditable: true,
                onFocus: handleFocus,
                onBlur: handleBlur,
                international: true,
                placeholder: placeholder,
                defaultCountry: defaultCountry,
            }),
            hasError === true &&
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "inputAdornment inputAdornmentError",
                        css: [styles.inputAdornment, styles.inputAdornmentError],
                    },
                    react_1.jsx(errorIcon_1.default, { color: styles.palette.colors.error })
                )
        )
    );
}
function CountrySelectWithIcon(_a) {
    var value = _a.value,
        options = _a.options,
        Icon = _a.iconComponent,
        onChange = _a.onChange;
    var style = react_2.useContext(styleContext_1.default);
    var selectedOption = options.find(function (o) {
        return o.value === value;
    });
    var CustomOption = function (_a) {
        var innerProps = _a.innerProps,
            data = _a.data,
            isSelected = _a.isSelected,
            isDisabled = _a.isDisabled;
        return !isDisabled
            ? react_1.jsx(
                  "div",
                  __assign({}, innerProps, {
                      "data-supertokens": "phoneInputCountryOption",
                      css: style.phoneInputCountryOption,
                      "aria-selected": isSelected,
                  }),
                  react_1.jsx(Icon, { country: data.value, label: data.label }),
                  react_1.jsx(
                      "span",
                      { "data-supertokens": "phoneInputCountryOptionLabel", css: style.phoneInputCountryOptionLabel },
                      data.label
                  ),
                  data.value &&
                      react_1.jsx(
                          "span",
                          {
                              "data-supertokens": "phoneInputCountryOptionCallingCode",
                              css: style.phoneInputCountryOptionCallingCode,
                          },
                          "+",
                          min_1.getCountryCallingCode(data.value)
                      )
              )
            : null;
    };
    var Control = function (_a) {
        var children = _a.children,
            rest = __rest(_a, ["children"]);
        return react_1.jsx(
            react_select_1.components.SingleValue,
            __assign({ "data-supertokens": "phoneInputCountrySelect", css: style.phoneInputCountrySelect }, rest),
            react_1.jsx(Icon, {
                country: selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value,
                label: children,
            })
        );
    };
    return react_1.jsx(react_select_1.default, {
        options: options,
        styles: {
            menu: function (provided) {
                return __assign(__assign({}, provided), style.phoneInputCountryDropdown);
            },
            control: function (provided) {
                return __assign(__assign({}, provided), style.phoneInputCountryControl);
            },
            valueContainer: function (provided) {
                return __assign(__assign({}, provided), style.phoneInputCountryValueContainer);
            },
            dropdownIndicator: function (provided) {
                return __assign(__assign({}, provided), style.phoneInputCountryDropdownIndicator);
            },
        },
        value: selectedOption,
        onChange: function (selected) {
            return onChange(selected === null ? undefined : selected.value);
        },
        components: { Option: CustomOption, SingleValue: Control, IndicatorSeparator: undefined },
    });
}
exports.default = PhoneNumberInput;
// TODO: type props
exports.phoneNumberInputWithInjectedProps = function (injectedProps) {
    return function (props) {
        return react_1.jsx(PhoneNumberInput, __assign({}, injectedProps, props));
    };
};
