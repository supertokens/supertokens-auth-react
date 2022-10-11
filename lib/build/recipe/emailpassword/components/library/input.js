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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../styles/styleContext"));
var showPasswordIcon_1 = __importDefault(require("../../../../components/assets/showPasswordIcon"));
var checkedIcon_1 = __importDefault(require("../../../../components/assets/checkedIcon"));
var errorIcon_1 = __importDefault(require("../../../../components/assets/errorIcon"));
var __1 = require("../../../..");
var Input = function (_a) {
    var type = _a.type,
        name = _a.name,
        hasError = _a.hasError,
        autoComplete = _a.autoComplete,
        onInputFocus = _a.onInputFocus,
        onInputBlur = _a.onInputBlur,
        onChange = _a.onChange,
        value = _a.value,
        placeholder = _a.placeholder,
        validated = _a.validated,
        autofocus = _a.autofocus;
    var t = (0, __1.useTranslation)();
    var _b = (0, react_2.useState)(false),
        showPassword = _b[0],
        setShowPassword = _b[1];
    /*
     * Method.
     */
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
    function handleChange(event) {
        if (onChange) {
            onChange({
                id: name,
                value: event.target.value,
            });
        }
    }
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var errorStyle = hasError === true ? styles.inputError : undefined;
    if (autoComplete === undefined) {
        autoComplete = "off";
    }
    var inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }
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
                                (0, jsx_runtime_1.jsx)("input", {
                                    autoFocus: autofocus,
                                    autoComplete: autoComplete,
                                    "data-supertokens": "input",
                                    css: styles.input,
                                    className: "supertokens-input",
                                    onFocus: handleFocus,
                                    onBlur: handleBlur,
                                    type: inputType,
                                    name: name,
                                    placeholder: t(placeholder),
                                    onChange: handleChange,
                                    value: value,
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
                                validated === true &&
                                    hasError === false &&
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            {
                                                "data-supertokens": "inputAdornment inputAdornmentSuccess",
                                                css: [styles.inputAdornment, styles.inputAdornmentSuccess],
                                            },
                                            {
                                                children: (0, jsx_runtime_1.jsx)(checkedIcon_1.default, {
                                                    color: styles.palette.colors.primary,
                                                }),
                                            }
                                        )
                                    ),
                                type === "password" &&
                                    value.length > 0 &&
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            {
                                                onClick: function () {
                                                    return setShowPassword(showPassword === false);
                                                },
                                                "data-supertokens": "inputAdornment showPassword",
                                                css: [styles.showPassword, styles.inputAdornment],
                                            },
                                            {
                                                children: (0, jsx_runtime_1.jsx)(showPasswordIcon_1.default, {
                                                    primaryColor: styles.palette.colors.textPrimary,
                                                    secondaryColor: styles.palette.colors.inputBackground,
                                                    showPassword: showPassword,
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
};
exports.default = Input;
