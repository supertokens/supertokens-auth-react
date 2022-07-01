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
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberInputWithInjectedProps = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_select_1 = __importStar(require("react-select"));
var react_1 = require("react");
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
        __assign(
            { "data-supertokens": "inputContainer", css: styles.inputContainer },
            {
                children: (0, jsx_runtime_1.jsxs)(
                    "div",
                    __assign(
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
                                        __assign(
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
    var CustomOption = function (_a) {
        var innerProps = _a.innerProps,
            data = _a.data,
            isSelected = _a.isSelected,
            isDisabled = _a.isDisabled;
        return !isDisabled
            ? (0, jsx_runtime_1.jsxs)(
                  "div",
                  __assign(
                      {},
                      innerProps,
                      {
                          "data-supertokens": "phoneInputCountryOption",
                          css: style.phoneInputCountryOption,
                          "aria-selected": isSelected,
                      },
                      {
                          children: [
                              (0, jsx_runtime_1.jsx)(Icon, { country: data.value, label: data.label }),
                              (0, jsx_runtime_1.jsx)(
                                  "span",
                                  __assign(
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
                                      __assign(
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
        var children = _a.children,
            rest = __rest(_a, ["children"]);
        return (0, jsx_runtime_1.jsx)(
            react_select_1.components.SingleValue,
            __assign({ "data-supertokens": "phoneInputCountrySelect", css: style.phoneInputCountrySelect }, rest, {
                children: (0, jsx_runtime_1.jsx)(Icon, {
                    country: selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value,
                    label: children,
                }),
            })
        );
    };
    return (0, jsx_runtime_1.jsx)(react_select_1.default, {
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
var phoneNumberInputWithInjectedProps = function (injectedProps) {
    return function (props) {
        return (0, jsx_runtime_1.jsx)(PhoneNumberInput, __assign({}, injectedProps, props));
    };
};
exports.phoneNumberInputWithInjectedProps = phoneNumberInputWithInjectedProps;
