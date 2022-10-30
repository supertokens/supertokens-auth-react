"use strict";

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var button = require("./emailpassword-shared.js");
require("./index.js");
var translationContext = require("./translationContext.js");
var querier = require("./querier.js");

/*
 * Component.
 */
function FormRow(_a) {
    var children = _a.children,
        hasError = _a.hasError;
    return jsxRuntime.jsx(
        "div",
        assets.__assign(
            { "data-supertokens": ["formRow", hasError ? "hasError" : ""].join(" ") },
            { children: children }
        )
    );
}

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
    var t = translationContext.useTranslation();
    var _b = React.useState(false),
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
    if (autoComplete === undefined) {
        autoComplete = "off";
    }
    var inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }
    return jsxRuntime.jsx(
        "div",
        assets.__assign(
            { "data-supertokens": "inputContainer" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    assets.__assign(
                        { "data-supertokens": ["inputWrapper", hasError ? "inputError" : ""].join(" ") },
                        {
                            children: [
                                jsxRuntime.jsx("input", {
                                    autoFocus: autofocus,
                                    autoComplete: autoComplete,
                                    "data-supertokens": "input",
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
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "inputAdornment inputAdornmentError" },
                                            { children: jsxRuntime.jsx(assets.ErrorIcon, {}) }
                                        )
                                    ),
                                validated === true &&
                                    hasError === false &&
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "inputAdornment inputAdornmentSuccess" },
                                            { children: jsxRuntime.jsx(assets.CheckedIcon, {}) }
                                        )
                                    ),
                                type === "password" &&
                                    value.length > 0 &&
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            {
                                                onClick: function () {
                                                    return setShowPassword(showPassword === false);
                                                },
                                                "data-supertokens": "inputAdornment showPassword",
                                            },
                                            {
                                                children: jsxRuntime.jsx(assets.ShowPasswordIcon, {
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

function InputError(_a) {
    var error = _a.error;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx("div", assets.__assign({ "data-supertokens": "inputErrorMessage" }, { children: t(error) }));
}

function Label(_a) {
    var value = _a.value,
        showIsRequired = _a.showIsRequired;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        assets.__assign({ "data-supertokens": "label" }, { children: [t(value), showIsRequired && " *"] })
    );
}

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
var MANDATORY_FORM_FIELDS_ID_ARRAY = ["email", "password"];
var DEFAULT_RESET_PASSWORD_PATH = "/reset-password";

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
/*
 * defaultEmailValidator.
 */
function defaultEmailValidator(value) {
    return assets.__awaiter(this, void 0, void 0, function () {
        var defaultEmailValidatorRegexp;
        return assets.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_EMAIL_NON_STRING"];
            }
            value = value.trim();
            defaultEmailValidatorRegexp =
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // We check if the email syntax is correct
            // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
            // Regex from https://stackoverflow.com/a/46181/3867175
            if (value.match(defaultEmailValidatorRegexp) === null) {
                return [2 /*return*/, "ERROR_EMAIL_INVALID"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */
function defaultPasswordValidator(value) {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_PASSWORD_NON_STRING"];
            }
            // length >= 8 && < 100
            // must have a number and a character
            // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
            if (value.length < 8) {
                return [2 /*return*/, "ERROR_PASSWORD_TOO_SHORT"];
            }
            if (value.length >= 100) {
                return [2 /*return*/, "ERROR_PASSWORD_TOO_LONG"];
            }
            if (value.match(/^.*[A-Za-z]+.*$/) === null) {
                return [2 /*return*/, "ERROR_PASSWORD_NO_ALPHA"];
            }
            if (value.match(/^.*[0-9]+.*$/) === null) {
                return [2 /*return*/, "ERROR_PASSWORD_NO_NUM"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultLoginPasswordValidator.
 * type string
 */
function defaultLoginPasswordValidator(value) {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_PASSWORD_NON_STRING"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultValidate(_) {
    return assets.__awaiter(this, void 0, void 0, function () {
        return assets.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        });
    });
}

var FormBase = function (props) {
    var footer = props.footer,
        buttonLabel = props.buttonLabel,
        showLabels = props.showLabels,
        validateOnBlur = props.validateOnBlur,
        formFields = props.formFields;
    var unmounting = React.useRef(new AbortController());
    React.useEffect(
        function () {
            // We need this because in some cases this gets called multiple times
            unmounting.current = new AbortController();
            return function () {
                unmounting.current.abort();
            };
        },
        [unmounting]
    );
    var _a = React.useState(
            props.formFields.map(function (f) {
                return { id: f.id, value: "" };
            })
        ),
        fieldStates = _a[0],
        setFieldStates = _a[1];
    var _b = React.useState(false),
        isLoading = _b[0],
        setIsLoading = _b[1];
    var updateFieldState = React.useCallback(
        function (id, update) {
            setFieldStates(function (os) {
                var field = os.find(function (f) {
                    return f.id === id;
                });
                if (field === undefined) {
                    return assets.__spreadArray(
                        assets.__spreadArray([], os, true),
                        [update({ id: id, value: "" })],
                        false
                    );
                }
                return os
                    .filter(function (f) {
                        return f !== field;
                    })
                    .concat(update(field));
            });
        },
        [setFieldStates]
    );
    var onInputFocus = React.useCallback(
        function (field) {
            updateFieldState(field.id, function (os) {
                return assets.__assign(assets.__assign({}, os), { validated: false });
            });
        },
        [updateFieldState]
    );
    var onInputBlur = React.useCallback(
        function (field) {
            return assets.__awaiter(void 0, void 0, void 0, function () {
                var fieldConfig, error, _a;
                return assets.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!validateOnBlur) {
                                return [2 /*return*/];
                            }
                            fieldConfig = props.formFields.find(function (f) {
                                return f.id === field.id;
                            });
                            if (!(fieldConfig && field.value !== "")) return [3 /*break*/, 2];
                            return [4 /*yield*/, fieldConfig.validate(field.value)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = undefined;
                            _b.label = 3;
                        case 3:
                            error = _a;
                            updateFieldState(field.id, function (os) {
                                return assets.__assign(assets.__assign({}, os), {
                                    error: error,
                                    validated: error === undefined && field.value.length !== 0,
                                });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        [validateOnBlur, updateFieldState, props.formFields]
    );
    var onInputChange = React.useCallback(
        function (field) {
            updateFieldState(field.id, function (os) {
                return assets.__assign(assets.__assign({}, os), { value: field.value, error: undefined });
            });
            props.clearError();
        },
        [updateFieldState]
    );
    var onFormSubmit = React.useCallback(
        function (e) {
            return assets.__awaiter(void 0, void 0, void 0, function () {
                var apiFields, fieldUpdates, result, generalError, e_1, _loop_1, _i, formFields_1, field, errorFields_1;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Prevent default event propagation.
                            e.preventDefault();
                            // Set loading state.
                            setIsLoading(true);
                            setFieldStates(function (os) {
                                return os.map(function (fs) {
                                    return assets.__assign(assets.__assign({}, fs), { error: undefined });
                                });
                            });
                            apiFields = formFields.map(function (field) {
                                var fieldState = fieldStates.find(function (fs) {
                                    return fs.id === field.id;
                                });
                                return {
                                    id: field.id,
                                    value: fieldState === undefined ? "" : fieldState.value,
                                };
                            });
                            fieldUpdates = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, 7, 8]);
                            result = void 0;
                            generalError = void 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [
                                4 /*yield*/,
                                props.callAPI(apiFields, function (id, value) {
                                    return fieldUpdates.push({ id: id, value: value });
                                }),
                            ];
                        case 3:
                            result = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            if (querier.STGeneralError.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 5];
                        case 5:
                            if (unmounting.current.signal.aborted) {
                                return [2 /*return*/];
                            }
                            _loop_1 = function (field) {
                                var update = fieldUpdates.find(function (f) {
                                    return f.id === field.id;
                                });
                                if (update || field.clearOnSubmit === true) {
                                    // We can do these one by one, it's almost never more than one field
                                    updateFieldState(field.id, function (os) {
                                        return assets.__assign(assets.__assign({}, os), {
                                            value: update ? update.value : "",
                                        });
                                    });
                                }
                            };
                            for (_i = 0, formFields_1 = formFields; _i < formFields_1.length; _i++) {
                                field = formFields_1[_i];
                                _loop_1(field);
                            }
                            if (generalError !== undefined) {
                                props.onError(generalError.message);
                            } else {
                                // If successful
                                if (result.status === "OK") {
                                    setIsLoading(false);
                                    props.clearError();
                                    if (props.onSuccess !== undefined) {
                                        props.onSuccess(result);
                                    }
                                }
                                if (unmounting.current.signal.aborted) {
                                    return [2 /*return*/];
                                }
                                // If field error.
                                if (result.status === "FIELD_ERROR") {
                                    errorFields_1 = result.formFields;
                                    setFieldStates(function (os) {
                                        return os.map(function (fs) {
                                            var _a;
                                            return assets.__assign(assets.__assign({}, fs), {
                                                error:
                                                    (_a = errorFields_1.find(function (ef) {
                                                        return ef.id === fs.id;
                                                    })) === null || _a === void 0
                                                        ? void 0
                                                        : _a.error,
                                            });
                                        });
                                    });
                                }
                            }
                            return [3 /*break*/, 8];
                        case 6:
                            _a.sent();
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                            return [3 /*break*/, 8];
                        case 7:
                            setIsLoading(false);
                            return [7 /*endfinally*/];
                        case 8:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [setIsLoading, setFieldStates, props, formFields, fieldStates]
    );
    return jsxRuntime.jsxs(
        "form",
        assets.__assign(
            { autoComplete: "on", noValidate: true, onSubmit: onFormSubmit },
            {
                children: [
                    formFields.map(function (field) {
                        var type = "text";
                        // If email or password, replace field type.
                        if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        if (field.id === "confirm-password") {
                            type = "password";
                        }
                        var fstate = fieldStates.find(function (s) {
                            return s.id === field.id;
                        }) || {
                            id: field.id,
                            validated: false,
                            error: undefined,
                            value: "",
                        };
                        return jsxRuntime.jsx(
                            FormRow,
                            assets.__assign(
                                { hasError: fstate.error !== undefined },
                                {
                                    children: jsxRuntime.jsxs(React.Fragment, {
                                        children: [
                                            showLabels &&
                                                (field.labelComponent !== undefined
                                                    ? field.labelComponent
                                                    : jsxRuntime.jsx(Label, {
                                                          value: field.label,
                                                          showIsRequired: field.showIsRequired,
                                                      })),
                                            field.inputComponent !== undefined
                                                ? jsxRuntime.jsx(field.inputComponent, {
                                                      type: type,
                                                      name: field.id,
                                                      validated: fstate.validated === true,
                                                      placeholder: field.placeholder,
                                                      value: fstate.value,
                                                      autoComplete: field.autoComplete,
                                                      autofocus: field.autofocus,
                                                      onInputFocus: onInputFocus,
                                                      onInputBlur: onInputBlur,
                                                      onChange: onInputChange,
                                                      hasError: fstate.error !== undefined,
                                                  })
                                                : jsxRuntime.jsx(Input, {
                                                      type: type,
                                                      name: field.id,
                                                      validated: fstate.validated === true,
                                                      placeholder: field.placeholder,
                                                      value: fstate.value,
                                                      autoComplete: field.autoComplete,
                                                      onInputFocus: onInputFocus,
                                                      onInputBlur: onInputBlur,
                                                      onChange: onInputChange,
                                                      autofocus: field.autofocus,
                                                      hasError: fstate.error !== undefined,
                                                  }),
                                            fstate.error && jsxRuntime.jsx(InputError, { error: fstate.error }),
                                        ],
                                    }),
                                }
                            ),
                            field.id
                        );
                    }),
                    jsxRuntime.jsx(
                        FormRow,
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    jsxRuntime.jsx(button.Button, {
                                        disabled: isLoading,
                                        isLoading: isLoading,
                                        type: "submit",
                                        label: buttonLabel,
                                    }),
                                    footer,
                                ],
                            }),
                        },
                        "form-button"
                    ),
                ],
            }
        )
    );
};

exports.DEFAULT_RESET_PASSWORD_PATH = DEFAULT_RESET_PASSWORD_PATH;
exports.FormBase = FormBase;
exports.FormRow = FormRow;
exports.Label = Label;
exports.MANDATORY_FORM_FIELDS_ID_ARRAY = MANDATORY_FORM_FIELDS_ID_ARRAY;
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultLoginPasswordValidator = defaultLoginPasswordValidator;
exports.defaultPasswordValidator = defaultPasswordValidator;
exports.defaultValidate = defaultValidate;
//# sourceMappingURL=emailpassword-shared3.js.map
