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
var react_2 = require("react");
var react_3 = require("react");
var react_4 = require("react");
var styleContext_1 = __importDefault(require("../../../../styles/styleContext"));
var showPasswordIcon_1 = __importDefault(require("../../../../components/assets/showPasswordIcon"));
var checkedIcon_1 = __importDefault(require("../../../../components/assets/checkedIcon"));
var errorIcon_1 = __importDefault(require("../../../../components/assets/errorIcon"));
/*
 * Component.
 */
function Input(_a, ref) {
    var type = _a.type,
        name = _a.name,
        hasError = _a.hasError,
        autoComplete = _a.autoComplete,
        onInputFocus = _a.onInputFocus,
        onInputBlur = _a.onInputBlur,
        placeholder = _a.placeholder,
        validated = _a.validated;
    /*
     * State.
     */
    var _b = react_4.useState(false),
        showPassword = _b[0],
        setShowPassword = _b[1];
    var _c = react_4.useState(""),
        value = _c[0],
        setValue = _c[1];
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
                value: ref.current.value,
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
            value: ref.current.value,
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
    var styles = react_2.useContext(styleContext_1.default);
    var errorStyle = hasError === true ? styles.inputError : undefined;
    if (autoComplete === undefined) {
        autoComplete = "off";
    }
    var inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }
    return react_1.jsx(
        "div",
        { "data-supertokens": "inputContainer", css: styles.inputContainer },
        react_1.jsx(
            "div",
            { "data-supertokens": "inputWrapper inputError", css: [styles.inputWrapper, errorStyle] },
            react_1.jsx("input", {
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
                onChange: handleChange,
            }),
            hasError === true &&
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "inputAdornment inputAdornmentError",
                        css: [styles.inputAdornment, styles.inputAdornmentError],
                    },
                    react_1.jsx(errorIcon_1.default, { color: styles.palette.colors.error })
                ),
            validated === true &&
                hasError === false &&
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "inputAdornment inputAdornmentSuccess",
                        css: [styles.inputAdornment, styles.inputAdornmentSuccess],
                    },
                    react_1.jsx(checkedIcon_1.default, { color: styles.palette.colors.primary })
                ),
            type === "password" &&
                value.length > 0 &&
                react_1.jsx(
                    "div",
                    {
                        onClick: function () {
                            return setShowPassword(showPassword === false);
                        },
                        "data-supertokens": "inputAdornment showPassword",
                        css: [styles.showPassword, styles.inputAdornment],
                    },
                    react_1.jsx(showPasswordIcon_1.default, {
                        primaryColor: styles.palette.colors.textPrimary,
                        secondaryColor: styles.palette.colors.inputBackground,
                        showPassword: showPassword,
                    })
                )
        )
    );
}
exports.default = react_3.forwardRef(Input);
//# sourceMappingURL=input.js.map
