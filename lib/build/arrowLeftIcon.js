"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var button = require("./emailpassword-shared.js");
require("./index.js");
var translationContext = require("./translationContext.js");
var index = require("./index3.js");

/*
 * Component.
 */
function FormRow({ children, hasError }) {
    return jsxRuntime.jsx(
        "div",
        Object.assign({ "data-supertokens": ["formRow", hasError ? "hasError" : ""].join(" ") }, { children: children })
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
/*
 * Imports.
 */
/*
 * Component.
 */
function ShowPasswordIcon({ showPassword }) {
    if (showPassword === true) {
        return jsxRuntime.jsx("div", {
            children: jsxRuntime.jsx(
                "svg",
                Object.assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "18.391",
                        height: "16.276",
                        viewBox: "0 0 18.391 16.276",
                        "data-supertokens": "showPasswordIcon show",
                    },
                    {
                        children: jsxRuntime.jsxs("g", {
                            children: [
                                jsxRuntime.jsx("g", {
                                    children: jsxRuntime.jsx("g", {
                                        children: jsxRuntime.jsx("g", {
                                            children: jsxRuntime.jsx("path", {
                                                fill: "rgb(var(--palette-textPrimary))",
                                                d: "M29.289 100.33c-2.4-3.63-5.619-5.63-9.069-5.63s-6.67 2-9.069 5.63a.767.767 0 0 0 0 .845c2.4 3.63 5.619 5.63 9.069 5.63s6.67-2 9.069-5.63a.767.767 0 0 0 0-.845zm-9.069 4.944c-2.785 0-5.435-1.6-7.5-4.519 2.065-2.92 4.715-4.519 7.5-4.519s5.435 1.6 7.5 4.519c-2.064 2.92-4.711 4.519-7.5 4.519z",
                                                transform:
                                                    "translate(-822 -420.048) translate(822 422.035) translate(-11.025 -94.7)",
                                            }),
                                        }),
                                    }),
                                }),
                                jsxRuntime.jsxs(
                                    "g",
                                    Object.assign(
                                        {
                                            fill: "rgb(var(--palette-textPrimary))",
                                            stroke: "rgb(var(--palette-inputBackground))",
                                            transform: "translate(-822 -420.048) translate(827.164 424.055)",
                                        },
                                        {
                                            children: [
                                                jsxRuntime.jsx("circle", {
                                                    cx: "4.036",
                                                    cy: "4.036",
                                                    r: "4.036",
                                                    stroke: "none",
                                                }),
                                                jsxRuntime.jsx("circle", {
                                                    cx: "4.036",
                                                    cy: "4.036",
                                                    r: "3.536",
                                                    fill: "none",
                                                }),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx("path", {
                                    fill: "none",
                                    stroke: "#707070",
                                    strokeLinecap: "round",
                                    strokeWidth: "2.25px",
                                    d: "M11.981 0L0 11.981",
                                    transform: "translate(-822 -420.048) translate(825.084 421.639)",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "none",
                                    stroke: "rgb(var(--palette-inputBackground))",
                                    strokeLinecap: "round",
                                    d: "M13.978 0L0 13.978",
                                    transform: "translate(-822 -420.048) translate(825.084 421.639)",
                                }),
                            ],
                        }),
                    }
                )
            ),
        });
    }
    return jsxRuntime.jsx("div", {
        children: jsxRuntime.jsx(
            "svg",
            Object.assign(
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "18.281",
                    height: "12.033",
                    viewBox: "0 0 18.281 12.033",
                    "data-supertokens": "showPasswordIcon hide",
                },
                {
                    children: jsxRuntime.jsxs("g", {
                        children: [
                            jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("g", {
                                    children: jsxRuntime.jsx("g", {
                                        children: jsxRuntime.jsx("path", {
                                            fill: "rgb(var(--palette-textPrimary))",
                                            d: "M29.18 100.3c-2.384-3.608-5.586-5.6-9.015-5.6s-6.63 1.989-9.015 5.6a.763.763 0 0 0 0 .84c2.384 3.608 5.586 5.6 9.015 5.6s6.63-1.989 9.015-5.6a.763.763 0 0 0 0-.84zm-9.015 4.914c-2.769 0-5.4-1.589-7.459-4.492 2.052-2.9 4.686-4.492 7.459-4.492s5.4 1.589 7.459 4.492c-2.056 2.899-4.686 4.489-7.458 4.489z",
                                            transform:
                                                "translate(-822 -422.088) translate(822 422.088) translate(-11.025 -94.7)",
                                        }),
                                    }),
                                }),
                            }),
                            jsxRuntime.jsxs(
                                "g",
                                Object.assign(
                                    {
                                        fill: "rgb(var(--palette-textPrimary))",
                                        stroke: "rgb(var(--palette-inputBackground))",
                                        transform: "translate(-822 -422.088) translate(827.133 424.096)",
                                    },
                                    {
                                        children: [
                                            jsxRuntime.jsx("circle", {
                                                cx: "4.012",
                                                cy: "4.012",
                                                r: "4.012",
                                                stroke: "none",
                                            }),
                                            jsxRuntime.jsx("circle", {
                                                cx: "4.012",
                                                cy: "4.012",
                                                r: "3.512",
                                                fill: "none",
                                            }),
                                        ],
                                    }
                                )
                            ),
                        ],
                    }),
                }
            )
        ),
    });
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
/*
 * Imports.
 */
/*
 * Component.
 */
function CheckedIcon() {
    return jsxRuntime.jsx(
        "svg",
        Object.assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "14.862",
                height: "12.033",
                viewBox: "0 0 14.862 12.033",
                "data-supertokens": "checkedIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    fill: "rgb(var(--palette-primary))",
                    d: "M12.629 49L5.06 56.572l-2.829-2.829L0 55.977l5.057 5.057.654-.651 9.152-9.152z",
                    transform: "translate(0 -49)",
                }),
            }
        )
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
/*
 * Imports.
 */
/*
 * Component.
 */
function ErrorIcon() {
    return jsxRuntime.jsx(
        "svg",
        Object.assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "17",
                height: "15",
                viewBox: "0 0 17 15",
                "data-supertokens": "errorIcon",
            },
            {
                children: jsxRuntime.jsxs("g", {
                    children: [
                        jsxRuntime.jsx(
                            "g",
                            Object.assign(
                                { className: "Asdf", fill: "rgb(var(--palette-error))" },
                                {
                                    children: jsxRuntime.jsx("path", {
                                        d: "M13.568 14.75H3.432c-.63 0-1.195-.325-1.512-.869-.317-.544-.32-1.196-.01-1.744l5.067-8.943c.315-.556.884-.887 1.523-.887.639 0 1.208.331 1.523.887l5.067 8.943c.31.548.307 1.2-.01 1.744s-.882.869-1.512.869z",
                                        transform: "translate(-824.894 -352.829) translate(824.894 352.829)",
                                    }),
                                }
                            )
                        ),
                        jsxRuntime.jsx(
                            "text",
                            Object.assign(
                                {
                                    fill: "#fff",
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    transform: "translate(-824.894 -352.829) translate(832.014 365.198)",
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        "tspan",
                                        Object.assign({ x: "0", y: "0" }, { children: "!" })
                                    ),
                                }
                            )
                        ),
                    ],
                }),
            }
        )
    );
}

const Input = ({
    type,
    name,
    hasError,
    autoComplete,
    onInputFocus,
    onInputBlur,
    onChange,
    value,
    placeholder,
    validated,
    autofocus,
}) => {
    const t = translationContext.useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);
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
                value,
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
    let inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }
    return jsxRuntime.jsx(
        "div",
        Object.assign(
            { "data-supertokens": "inputContainer" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    Object.assign(
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
                                        Object.assign(
                                            { "data-supertokens": "inputAdornment inputAdornmentError" },
                                            { children: jsxRuntime.jsx(ErrorIcon, {}) }
                                        )
                                    ),
                                validated === true &&
                                    hasError === false &&
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "inputAdornment inputAdornmentSuccess" },
                                            { children: jsxRuntime.jsx(CheckedIcon, {}) }
                                        )
                                    ),
                                type === "password" &&
                                    value.length > 0 &&
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            {
                                                onClick: () => setShowPassword(showPassword === false),
                                                "data-supertokens": "inputAdornment showPassword",
                                            },
                                            {
                                                children: jsxRuntime.jsx(ShowPasswordIcon, {
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

function InputError({ error }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsx("div", Object.assign({ "data-supertokens": "inputErrorMessage" }, { children: t(error) }));
}

function Label({ value, showIsRequired }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        Object.assign({ "data-supertokens": "label" }, { children: [t(value), showIsRequired && " *"] })
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
const MANDATORY_FORM_FIELDS_ID_ARRAY = ["email", "password"];
const DEFAULT_RESET_PASSWORD_PATH = "/reset-password";

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
    return sessionAuth.__awaiter(this, void 0, void 0, function* () {
        if (typeof value !== "string") {
            return "ERROR_EMAIL_NON_STRING";
        }
        value = value.trim();
        const defaultEmailValidatorRegexp =
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // We check if the email syntax is correct
        // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
        // Regex from https://stackoverflow.com/a/46181/3867175
        if (value.match(defaultEmailValidatorRegexp) === null) {
            return "ERROR_EMAIL_INVALID";
        }
        return undefined;
    });
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */
function defaultPasswordValidator(value) {
    return sessionAuth.__awaiter(this, void 0, void 0, function* () {
        if (typeof value !== "string") {
            return "ERROR_PASSWORD_NON_STRING";
        }
        // length >= 8 && < 100
        // must have a number and a character
        // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
        if (value.length < 8) {
            return "ERROR_PASSWORD_TOO_SHORT";
        }
        if (value.length >= 100) {
            return "ERROR_PASSWORD_TOO_LONG";
        }
        if (value.match(/^.*[A-Za-z]+.*$/) === null) {
            return "ERROR_PASSWORD_NO_ALPHA";
        }
        if (value.match(/^.*[0-9]+.*$/) === null) {
            return "ERROR_PASSWORD_NO_NUM";
        }
        return undefined;
    });
}
/*
 * defaultLoginPasswordValidator.
 * type string
 */
function defaultLoginPasswordValidator(value) {
    return sessionAuth.__awaiter(this, void 0, void 0, function* () {
        if (typeof value !== "string") {
            return "ERROR_PASSWORD_NON_STRING";
        }
        return undefined;
    });
}
/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultValidate(_) {
    return sessionAuth.__awaiter(this, void 0, void 0, function* () {
        return undefined;
    });
}

const FormBase = (props) => {
    const { footer, buttonLabel, showLabels, validateOnBlur, formFields } = props;
    const unmounting = React.useRef(new AbortController());
    React.useEffect(() => {
        // We need this because in some cases this gets called multiple times
        unmounting.current = new AbortController();
        return () => {
            unmounting.current.abort();
        };
    }, [unmounting]);
    const [fieldStates, setFieldStates] = React.useState(props.formFields.map((f) => ({ id: f.id, value: "" })));
    const [isLoading, setIsLoading] = React.useState(false);
    const updateFieldState = React.useCallback(
        (id, update) => {
            setFieldStates((os) => {
                const field = os.find((f) => f.id === id);
                if (field === undefined) {
                    return [...os, update({ id, value: "" })];
                }
                return os.filter((f) => f !== field).concat(update(field));
            });
        },
        [setFieldStates]
    );
    const onInputFocus = React.useCallback(
        (field) => {
            updateFieldState(field.id, (os) => Object.assign(Object.assign({}, os), { validated: false }));
        },
        [updateFieldState]
    );
    const onInputBlur = React.useCallback(
        (field) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                if (!validateOnBlur) {
                    return;
                }
                // This should never be undefined, but even if it is, we can
                const fieldConfig = props.formFields.find((f) => f.id === field.id);
                const error = fieldConfig && field.value !== "" ? yield fieldConfig.validate(field.value) : undefined;
                updateFieldState(field.id, (os) =>
                    Object.assign(Object.assign({}, os), {
                        error,
                        validated: error === undefined && field.value.length !== 0,
                    })
                );
            }),
        [validateOnBlur, updateFieldState, props.formFields]
    );
    const onInputChange = React.useCallback(
        (field) => {
            updateFieldState(field.id, (os) =>
                Object.assign(Object.assign({}, os), { value: field.value, error: undefined })
            );
            props.clearError();
        },
        [updateFieldState]
    );
    const onFormSubmit = React.useCallback(
        (e) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                // Prevent default event propagation.
                e.preventDefault();
                // Set loading state.
                setIsLoading(true);
                setFieldStates((os) => os.map((fs) => Object.assign(Object.assign({}, fs), { error: undefined })));
                // Get the fields values from form.
                const apiFields = formFields.map((field) => {
                    const fieldState = fieldStates.find((fs) => fs.id === field.id);
                    return {
                        id: field.id,
                        value: fieldState === undefined ? "" : fieldState.value,
                    };
                });
                const fieldUpdates = [];
                // Call API.
                try {
                    let result;
                    let generalError;
                    try {
                        result = yield props.callAPI(apiFields, (id, value) => fieldUpdates.push({ id, value }));
                    } catch (e) {
                        if (index.STGeneralError.isThisError(e)) {
                            generalError = e;
                        } else {
                            throw e;
                        }
                    }
                    if (unmounting.current.signal.aborted) {
                        return;
                    }
                    for (const field of formFields) {
                        const update = fieldUpdates.find((f) => f.id === field.id);
                        if (update || field.clearOnSubmit === true) {
                            // We can do these one by one, it's almost never more than one field
                            updateFieldState(field.id, (os) =>
                                Object.assign(Object.assign({}, os), { value: update ? update.value : "" })
                            );
                        }
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
                            return;
                        }
                        // If field error.
                        if (result.status === "FIELD_ERROR") {
                            const errorFields = result.formFields;
                            setFieldStates((os) =>
                                os.map((fs) => {
                                    var _a;
                                    return Object.assign(Object.assign({}, fs), {
                                        error:
                                            (_a = errorFields.find((ef) => ef.id === fs.id)) === null || _a === void 0
                                                ? void 0
                                                : _a.error,
                                    });
                                })
                            );
                        }
                    }
                } catch (e) {
                    props.onError("SOMETHING_WENT_WRONG_ERROR");
                } finally {
                    setIsLoading(false);
                }
            }),
        [setIsLoading, setFieldStates, props, formFields, fieldStates]
    );
    return jsxRuntime.jsxs(
        "form",
        Object.assign(
            { autoComplete: "on", noValidate: true, onSubmit: onFormSubmit },
            {
                children: [
                    formFields.map((field) => {
                        let type = "text";
                        // If email or password, replace field type.
                        if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        if (field.id === "confirm-password") {
                            type = "password";
                        }
                        const fstate = fieldStates.find((s) => s.id === field.id) || {
                            id: field.id,
                            validated: false,
                            error: undefined,
                            value: "",
                        };
                        return jsxRuntime.jsx(
                            FormRow,
                            Object.assign(
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
 * Imports.
 */
/*
 * Component.
 */
function ArrowLeftIcon({ color }) {
    return jsxRuntime.jsx(
        "svg",
        Object.assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "11.272",
                height: "9.49",
                viewBox: "0 0 11.272 9.49",
                "data-supertokens": "arrowLeftIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    fill: color,
                    stroke: "#fff",
                    strokeWidth: "0.75px",
                    d: "M9.931 5.2h.016-7.041L5.12 7.41a.581.581 0 0 1 0 .817l-.344.345a.576.576 0 0 1-.813 0L.168 4.778a.58.58 0 0 1 0-.816L3.962.168a.577.577 0 0 1 .813 0l.345.344a.57.57 0 0 1 .168.407.553.553 0 0 1-.168.4l-2.239 2.23h7.058a.6.6 0 0 1 .584.59v.487a.585.585 0 0 1-.592.574z",
                    transform: "translate(.375 .375)",
                }),
            }
        )
    );
}

exports.ArrowLeftIcon = ArrowLeftIcon;
exports.DEFAULT_RESET_PASSWORD_PATH = DEFAULT_RESET_PASSWORD_PATH;
exports.ErrorIcon = ErrorIcon;
exports.FormBase = FormBase;
exports.FormRow = FormRow;
exports.Label = Label;
exports.MANDATORY_FORM_FIELDS_ID_ARRAY = MANDATORY_FORM_FIELDS_ID_ARRAY;
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultLoginPasswordValidator = defaultLoginPasswordValidator;
exports.defaultPasswordValidator = defaultPasswordValidator;
exports.defaultValidate = defaultValidate;
//# sourceMappingURL=arrowLeftIcon.js.map
