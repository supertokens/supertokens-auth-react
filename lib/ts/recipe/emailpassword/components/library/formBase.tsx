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
import React, { Fragment, useContext, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../constants";

import type { APIFormField } from "../../../../types";
import type { FormBaseProps, FormFieldThemeProps } from "../../types";
import type { FormEvent } from "react";

import { Button, FormRow, Input, InputError, Label } from ".";

type FieldState = {
    id: string;
    validated?: boolean;
    error?: string;
    value: string;
};

const fetchDefaultValue = (field: FormFieldThemeProps): string => {
    if (field.getDefaultValue !== undefined) {
        const defaultValue = field.getDefaultValue();
        if (typeof defaultValue !== "string") {
            throw new Error(`getDefaultValue for ${field.id} must return a string`);
        } else {
            return defaultValue;
        }
    }
    return "";
};

function InputComponentWrapper(props: {
    field: FormFieldThemeProps;
    type: string;
    fstate: FieldState;
    onInputFocus: (field: APIFormField) => void;
    onInputBlur: (field: APIFormField) => void;
    onInputChange: (field: APIFormField) => void;
}) {
    const { field, type, fstate, onInputFocus, onInputBlur, onInputChange } = props;

    const useCallbackOnInputFocus = useCallback<(value: string) => void>(
        (value) => {
            onInputFocus({
                id: field.id,
                value,
            });
        },
        [onInputFocus, field.id]
    );

    const useCallbackOnInputBlur = useCallback<(value: string) => void>(
        (value) => {
            onInputBlur({
                id: field.id,
                value,
            });
        },
        [onInputBlur, field.id]
    );

    const useCallbackOnInputChange = useCallback(
        (value) => {
            onInputChange({
                id: field.id,
                value,
            });
        },
        [onInputChange, field.id]
    );

    return field.inputComponent !== undefined ? (
        <field.inputComponent
            key={field.id}
            type={type}
            name={field.id}
            validated={fstate.validated === true}
            placeholder={field.placeholder}
            value={fstate.value}
            autoComplete={field.autoComplete}
            autofocus={field.autofocus}
            onInputFocus={useCallbackOnInputFocus}
            onInputBlur={useCallbackOnInputBlur}
            onChange={useCallbackOnInputChange}
            hasError={fstate.error !== undefined}
        />
    ) : (
        <Input
            key={field.id}
            type={type}
            name={field.id}
            validated={fstate.validated === true}
            placeholder={field.placeholder}
            value={fstate.value}
            autoComplete={field.autoComplete}
            onInputFocus={useCallbackOnInputFocus}
            onInputBlur={useCallbackOnInputBlur}
            onChange={useCallbackOnInputChange}
            autofocus={field.autofocus}
            hasError={fstate.error !== undefined}
        />
    );
}

export const FormBase: React.FC<FormBaseProps<any>> = (props) => {
    const { footer, buttonLabel, showLabels, validateOnBlur, formFields } = props;

    const unmounting = useRef(new AbortController());
    useEffect(() => {
        // We need this because in some cases this gets called multiple times
        unmounting.current = new AbortController();
        return () => {
            unmounting.current.abort();
        };
    }, [unmounting]);

    const [fieldStates, setFieldStates] = useState<FieldState[]>(
        props.formFields.map((f) => ({ id: f.id, value: fetchDefaultValue(f) }))
    );
    useEffect(() => {
        setFieldStates((fs) => {
            let ret = fs;
            const fieldsWithoutState = props.formFields.filter((f) => !fieldStates.some((s) => f.id === s.id));
            // If there is a formfield missing from the states array, we fill with the default value
            if (fieldsWithoutState.length > 0) {
                fs = [...fs, ...fieldsWithoutState.map((f) => ({ id: f.id, value: fetchDefaultValue(f) }))];
            }

            // If a field has been removed from formFields, we want to remove it from the states array as well.
            if (fieldStates.some((s) => !props.formFields.some((f) => f.id === s.id))) {
                ret = fs.filter((s) => props.formFields.some((f) => f.id === s.id));
            }

            return ret;
        });
    }, [props.formFields, setFieldStates]);

    const [isLoading, setIsLoading] = useState(false);

    const updateFieldState = useCallback(
        (id: string, update: (os: FieldState) => FieldState) => {
            setFieldStates((os) => {
                const field = os.find((f) => f.id === id);
                if (field === undefined) {
                    return [...os, update({ id, value: "" })];
                }

                return os.filter((f) => f.id !== field.id).concat(update(field));
            });
        },
        [setFieldStates]
    );

    const onInputFocus = useCallback(
        (field: APIFormField) => {
            updateFieldState(field.id, (os) => ({ ...os, validated: false }));
        },
        [updateFieldState]
    );

    const onInputBlur = useCallback(
        async (field: APIFormField) => {
            if (!validateOnBlur) {
                return;
            }
            // This should never be undefined, but even if it is, we can
            const fieldConfig = props.formFields.find((f) => f.id === field.id);
            const error = fieldConfig && field.value !== "" ? await fieldConfig.validate(field.value) : undefined;

            updateFieldState(field.id, (os) => ({
                ...os,
                error,
                validated: error === undefined && field.value.length !== 0,
            }));
        },
        [validateOnBlur, updateFieldState, props.formFields]
    );

    const onInputChange = useCallback(
        (field: APIFormField) => {
            if (typeof field.value !== "string") {
                throw new Error(`${field.id} value must be a string`);
            }
            updateFieldState(field.id, (os) => ({ ...os, value: field.value, error: undefined }));
            props.clearError();
        },
        [updateFieldState]
    );

    const onFormSubmit = useCallback(
        async (e: FormEvent): Promise<void> => {
            // Prevent default event propagation.
            e.preventDefault();

            // Set loading state.
            setIsLoading(true);

            setFieldStates((os) => os.map((fs) => ({ ...fs, error: undefined })));

            // Get the fields values from form.
            const apiFields = formFields.map((field) => {
                const fieldState = fieldStates.find((fs) => fs.id === field.id);
                return {
                    id: field.id,
                    value: fieldState === undefined ? "" : fieldState.value,
                };
            });

            const fieldUpdates: FieldState[] = [];
            // Call API.
            try {
                let result;
                let generalError: STGeneralError | undefined;
                let fetchError: Response | undefined;
                try {
                    result = await props.callAPI(apiFields, (id, value) => fieldUpdates.push({ id, value }));
                } catch (e) {
                    if (STGeneralError.isThisError(e)) {
                        generalError = e;
                    } else if (e instanceof Response) {
                        fetchError = e;
                    } else {
                        throw e;
                    }
                }
                if (unmounting.current.signal.aborted) {
                    return;
                }

                if (generalError !== undefined || (result !== undefined && result.status !== "OK")) {
                    for (const field of formFields) {
                        const update = fieldUpdates.find((f) => f.id === field.id);
                        if (update || field.clearOnSubmit === true) {
                            // We can do these one by one, it's almost never more than one field
                            updateFieldState(field.id, (os) => ({ ...os, value: update ? update.value : "" }));
                        }
                    }
                }

                if (generalError !== undefined) {
                    props.onError(generalError.message);
                } else if (fetchError !== undefined) {
                    if (props.onFetchError) {
                        props.onFetchError(fetchError);
                    } else {
                        throw fetchError;
                    }
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
                        const getErrorMessage = (fs: FieldState) => {
                            const errorMessage = errorFields.find((ef: any) => ef.id === fs.id)?.error;
                            if (errorMessage === "Field is not optional") {
                                const fieldConfigData = props.formFields.find((f) => f.id === fs.id);
                                // replace non-optional server error message from nonOptionalErrorMsg
                                if (fieldConfigData?.nonOptionalErrorMsg !== undefined) {
                                    return fieldConfigData?.nonOptionalErrorMsg;
                                }
                            }
                            return errorMessage;
                        };
                        setFieldStates((os) => os.map((fs) => ({ ...fs, error: getErrorMessage(fs) })));
                    }
                }
            } catch (e) {
                console.error(e);
                props.onError("SOMETHING_WENT_WRONG_ERROR");
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setFieldStates, props, formFields, fieldStates]
    );

    return (
        <FormStateContext.Provider value={fieldStates}>
            <form autoComplete="on" noValidate onSubmit={onFormSubmit} data-supertokens={props.formDataSupertokens}>
                {formFields
                    .filter((f) => f.hidden !== true)
                    .map((field) => {
                        let type = "text";
                        // If email or password, replace field type.
                        if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        if (field.id === "confirm-password") {
                            type = "password";
                        }

                        const fstate: FieldState | undefined = fieldStates.find((s) => s.id === field.id) || {
                            id: field.id,
                            value: fetchDefaultValue(field),
                        };

                        return (
                            <FormRow key={field.id} hasError={fstate.error !== undefined}>
                                <Fragment>
                                    {showLabels &&
                                        (field.labelComponent !== undefined ? (
                                            field.labelComponent
                                        ) : (
                                            <Label value={field.label} showIsRequired={field.showIsRequired} />
                                        ))}

                                    <InputComponentWrapper
                                        type={type}
                                        field={field}
                                        fstate={fstate}
                                        onInputFocus={onInputFocus}
                                        onInputBlur={onInputBlur}
                                        onInputChange={onInputChange}
                                    />
                                    {fstate.error && <InputError error={fstate.error} />}
                                </Fragment>
                            </FormRow>
                        );
                    })}

                <FormRow key="form-button">
                    <Fragment>
                        <Button disabled={isLoading} isLoading={isLoading} type="submit" label={buttonLabel} />
                        {footer}
                    </Fragment>
                </FormRow>
            </form>
        </FormStateContext.Provider>
    );
};

const FormStateContext = React.createContext<{ id: string; value: string }[] | undefined>(undefined);

export const useFormFields = () => {
    const ctx = useContext(FormStateContext);

    if (ctx === undefined) {
        throw new Error("useFormState used outside FormBase");
    }

    return ctx;
};

export default FormBase;
