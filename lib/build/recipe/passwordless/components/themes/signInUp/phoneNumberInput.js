"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberInputWithInjectedProps = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_select_1 = tslib_1.__importStar(require("react-select"));
var react_1 = require("react");
var min_1 = tslib_1.__importStar(require("react-phone-number-input/min"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var errorIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/errorIcon"));
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
    var styles = (0, react_1.useContext)(styleContext_1.default);
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
    return (0, jsx_runtime_1.jsx)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "inputContainer", css: styles.inputContainer },
            {
                children: (0, jsx_runtime_1.jsxs)(
                    "div",
                    tslib_1.__assign(
                        { "data-supertokens": "inputWrapper inputError", css: [styles.inputWrapper, errorStyle] },
                        {
                            children: [
                                (0, jsx_runtime_1.jsx)(min_1.default, {
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
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        tslib_1.__assign(
                                            {
                                                "data-supertokens": "inputAdornment inputAdornmentError",
                                                css: [styles.inputAdornment, styles.inputAdornmentError],
                                            },
                                            {
                                                children: (0, jsx_runtime_1.jsx)(errorIcon_1.default, {
                                                    color: styles.palette.colors.error,
                                                }),
                                            }
                                        )
                                    ),
                            ],
                        }
                    )
                ),
            }
        )
    );
}
function CountrySelectWithIcon(_a) {
    var value = _a.value,
        options = _a.options,
        Icon = _a.iconComponent,
        onChange = _a.onChange;
    var style = (0, react_1.useContext)(styleContext_1.default);
    var selectedOption = options.find(function (o) {
        return o.value === value;
    });
    var selectStyles = (0, react_1.useMemo)(
        function () {
            return {
                menu: function (provided) {
                    return tslib_1.__assign(tslib_1.__assign({}, provided), style.phoneInputCountryDropdown);
                },
                control: function (provided) {
                    return tslib_1.__assign(tslib_1.__assign({}, provided), style.phoneInputCountryControl);
                },
                valueContainer: function (provided) {
                    return tslib_1.__assign(tslib_1.__assign({}, provided), style.phoneInputCountryValueContainer);
                },
                dropdownIndicator: function (provided) {
                    return tslib_1.__assign(tslib_1.__assign({}, provided), style.phoneInputCountryDropdownIndicator);
                },
            };
        },
        [style]
    );
    var selectOnChange = (0, react_1.useCallback)(
        function (selected) {
            onChange(selected === null ? undefined : selected.value);
        },
        [onChange]
    );
    var components = (0, react_1.useMemo)(function () {
        var CustomOption = function (_a) {
            var innerProps = _a.innerProps,
                data = _a.data,
                isSelected = _a.isSelected,
                isDisabled = _a.isDisabled;
            return !isDisabled
                ? (0, jsx_runtime_1.jsxs)(
                      "div",
                      tslib_1.__assign(
                          {},
                          innerProps,
                          {
                              "data-supertokens": "phoneInputCountryOption",
                              onTouchEnd: function (ev) {
                                  // We need to stop propagation here, to prevent the menu closing before the click is fired
                                  ev.stopPropagation();
                              },
                              css: style.phoneInputCountryOption,
                              "aria-selected": isSelected,
                          },
                          {
                              children: [
                                  (0, jsx_runtime_1.jsx)(Icon, { country: data.value, label: data.label }),
                                  (0, jsx_runtime_1.jsx)(
                                      "span",
                                      tslib_1.__assign(
                                          {
                                              "data-supertokens": "phoneInputCountryOptionLabel",
                                              css: style.phoneInputCountryOptionLabel,
                                          },
                                          { children: data.label }
                                      )
                                  ),
                                  data.value &&
                                      (0, jsx_runtime_1.jsxs)(
                                          "span",
                                          tslib_1.__assign(
                                              {
                                                  "data-supertokens": "phoneInputCountryOptionCallingCode",
                                                  css: style.phoneInputCountryOptionCallingCode,
                                              },
                                              { children: ["+", (0, min_1.getCountryCallingCode)(data.value)] }
                                          )
                                      ),
                              ],
                          }
                      )
                  )
                : null;
        };
        var Control = function (_a) {
            var _b;
            var children = _a.children,
                rest = tslib_1.__rest(_a, ["children"]);
            return (0, jsx_runtime_1.jsx)(
                react_select_1.components.SingleValue,
                tslib_1.__assign(
                    { "data-supertokens": "phoneInputCountrySelect", css: style.phoneInputCountrySelect },
                    rest,
                    {
                        children: (0, jsx_runtime_1.jsx)(Icon, {
                            country: (_b = rest.getValue()[0]) === null || _b === void 0 ? void 0 : _b.value,
                            label: children,
                        }),
                    }
                )
            );
        };
        return { Option: CustomOption, SingleValue: Control, IndicatorSeparator: undefined };
    }, []);
    return (0, jsx_runtime_1.jsx)(react_select_1.default, {
        options: options,
        styles: selectStyles,
        value: selectedOption,
        onChange: selectOnChange,
        components: components,
    });
}
exports.default = PhoneNumberInput;
// TODO: type props
var phoneNumberInputWithInjectedProps = function (injectedProps) {
    return function (props) {
        return (0, jsx_runtime_1.jsx)(PhoneNumberInput, tslib_1.__assign({}, injectedProps, props));
    };
};
exports.phoneNumberInputWithInjectedProps = phoneNumberInputWithInjectedProps;
