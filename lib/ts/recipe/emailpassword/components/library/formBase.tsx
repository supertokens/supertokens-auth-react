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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { createRef, FormEvent, Fragment, PureComponent } from "react";
import { Button, FormRow, Input, InputError, Label } from ".";

import { APIFormField } from "../../../../types";
import { FormBaseProps, FormBaseState, InputRef } from "../../types";
import { MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../constants";
import GeneralError from "./generalError";

/*
 * Component.
 */

export default class FormBase<T> extends PureComponent<FormBaseProps<T>, FormBaseState> {
    /*
     * Constructor.
     */
    constructor(props: FormBaseProps<T>) {
        super(props);

        const baseState = {
            formFields: props.formFields.map((field) => ({
                ...field,
                validated: false,
                ref: createRef<InputRef>(),
            })),
            unmounting: new AbortController(),
        };

        if (props.error === undefined) {
            this.state = {
                ...baseState,
                status: "IN_PROGRESS",
            };
        } else {
            this.state = {
                ...baseState,
                status: "GENERAL_ERROR",
                generalError: props.error,
            };
        }
    }

    componentDidUpdate(prevProps: FormBaseProps<T>) {
        if (this.props.error !== prevProps.error) {
            this.setState((os) =>
                os.status === "GENERAL_ERROR" && this.props.error === os.generalError
                    ? os
                    : {
                          ...os,
                          status: "GENERAL_ERROR",
                          generalError: this.props.error,
                      }
            );
        }
    }

    /*
     * Methods.
     */

    handleInputFocus = async (field: APIFormField): Promise<void> => {
        this.setState((oldState) => {
            return this.getNewState(oldState, field, "focus", undefined);
        });
    };

    handleInputChange = async (): Promise<void> => {
        this.setState((oldState) => {
            if (oldState.status === "GENERAL_ERROR") {
                return {
                    ...oldState,
                    status: "IN_PROGRESS",
                    generalError: undefined,
                };
            }
            return oldState;
        });
    };

    handleInputBlur = async (field: APIFormField): Promise<void> => {
        const formFields = this.state.formFields;
        let error: string | undefined = undefined;
        for (let i = 0; i < formFields.length; i++) {
            if (field.id === formFields[i].id) {
                // Validate.
                if (field.value !== "") {
                    error = await formFields[i].validate(field.value);
                }
                break;
            }
        }

        this.setState((oldState) => {
            // Do not update status asynchronously on blur if backend error already came in.
            if (oldState.status === "GENERAL_ERROR") {
                return oldState;
            }
            return this.getNewState(oldState, field, "blur", error);
        });
    };

    getNewState(
        oldState: FormBaseState,
        field: APIFormField,
        event: "blur" | "focus",
        error: string | undefined
    ): FormBaseState {
        // Add error to formFields array for corresponding field.
        const formFields = oldState.formFields.map((formField) => {
            if (formField.id !== field.id) {
                return formField;
            }
            return {
                ...formField,
                validated: event === "blur" && error === undefined && field.value.length !== 0,
                error,
            };
        });

        let status: FormBaseState["status"] = oldState.status;

        for (const i in formFields) {
            const field = formFields[i];
            if (field.error !== undefined) {
                status = "FIELD_ERRORS";
                break;
            }
            if (field.optional === false) {
                const value = field.ref.current !== null ? field.ref.current.value : "";

                if (value.length === 0) {
                    const isFocused = field.ref.current !== null ? field.ref.current.isFocused : false;
                    if (isFocused !== true) {
                        status = "IN_PROGRESS";
                    }
                }
            }
        }

        return {
            ...oldState,
            status,
            formFields,
        } as FormBaseState; // We need this cast, because TS doesn't recognise that we only get GENERAL_ERROR state if oldState also had that
    }

    componentWillUnmount = () => {
        this.state.unmounting.abort();
    };

    onFormSubmit = async (e: FormEvent): Promise<void> => {
        // Prevent default event propagation.
        e.preventDefault();

        // Set loading state.
        this.setState((oldState) => ({
            ...oldState,
            status: "LOADING",
            formFields: oldState.formFields.map((fs) => ({
                ...fs,
                error: undefined,
            })),
        }));

        // Get the fields values from form.
        const fields = this.state.formFields.map((field) => {
            return {
                id: field.id,
                value: field.ref.current !== null ? field.ref.current.value : "",
            };
        });

        // Call API.
        try {
            const result = await this.props.callAPI(fields);
            if (this.state.unmounting.signal.aborted) {
                return;
            }

            for (const field of this.state.formFields) {
                const fieldInput = field.ref.current;
                if (field.clearOnSubmit === true && fieldInput !== null) {
                    fieldInput.value = "";
                }
            }

            // If successful
            if (result.status === "OK") {
                // Set Success state.
                this.setState(
                    (oldState) => ({
                        ...oldState,
                        status: "SUCCESS",
                    }),
                    () => {
                        if (this.props.onSuccess !== undefined) {
                            this.props.onSuccess(result);
                        }
                    }
                );
                return;
            }

            // If field error.
            if (result.status === "FIELD_ERROR") {
                const errorFields = result.formFields;

                // Update formFields state with errors.
                const formFields = this.state.formFields.map((field) => {
                    for (let i = 0; i < errorFields.length; i++) {
                        if (field.id === errorFields[i].id) {
                            field.error = errorFields[i].error;
                        }
                    }
                    return field;
                });
                this.setState(() => ({
                    status: "FIELD_ERRORS",
                    formFields: formFields,
                }));
                return;
            }

            // Otherwise if message, set generalError
            if (result.status === "GENERAL_ERROR") {
                this.setState((oldState) => ({
                    ...oldState,
                    status: "GENERAL_ERROR",
                    generalError: result.message,
                }));
            }
        } catch (e) {
            this.setState((oldState) => ({
                ...oldState,
                status: "GENERAL_ERROR",
                generalError: "SOMETHING_WENT_WRONG_ERROR",
            }));
        }
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const { header, footer, buttonLabel, showLabels, validateOnBlur } = this.props;
        const { formFields } = this.state;
        const onInputBlur = validateOnBlur === true ? this.handleInputBlur : undefined;

        return (
            <Fragment>
                {header}
                {this.state.status === "GENERAL_ERROR" && <GeneralError error={this.state.generalError} />}

                <form autoComplete="on" noValidate onSubmit={this.onFormSubmit}>
                    {formFields.map((field) => {
                        let type = "text";
                        // If email or password, replace field type.
                        if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        if (field.id === "confirm-password") {
                            type = "password";
                        }

                        // We can use this to access things that can be updated on the field as a prop
                        const propField = this.props.formFields.find((f) => f.id === field.id);
                        if (!propField) {
                            throw new Error("FormFieldDisappeared");
                        }

                        return (
                            <FormRow key={field.id} hasError={field.error !== undefined}>
                                <Fragment>
                                    {showLabels &&
                                        (propField.labelComponent !== undefined ? (
                                            propField.labelComponent
                                        ) : (
                                            <Label value={field.label} showIsRequired={field.showIsRequired} />
                                        ))}

                                    {propField.inputComponent !== undefined ? (
                                        <propField.inputComponent
                                            type={type}
                                            name={field.id}
                                            validated={field.validated}
                                            placeholder={field.placeholder}
                                            ref={field.ref}
                                            autoComplete={field.autoComplete}
                                            autofocus={field.autofocus}
                                            onInputFocus={this.handleInputFocus}
                                            onInputBlur={onInputBlur}
                                            onChange={this.handleInputChange}
                                            hasError={field.error !== undefined}
                                        />
                                    ) : (
                                        <Input
                                            type={type}
                                            name={field.id}
                                            validated={field.validated}
                                            placeholder={field.placeholder}
                                            ref={field.ref}
                                            autoComplete={field.autoComplete}
                                            onInputFocus={this.handleInputFocus}
                                            onInputBlur={onInputBlur}
                                            onChange={this.handleInputChange}
                                            autofocus={field.autofocus}
                                            hasError={field.error !== undefined}
                                        />
                                    )}

                                    {field.error && <InputError error={field.error} />}
                                </Fragment>
                            </FormRow>
                        );
                    })}

                    <FormRow key="form-button">
                        <Fragment>
                            <Button
                                disabled={this.state.status === "LOADING"}
                                isLoading={this.state.status === "LOADING"}
                                type="submit"
                                label={buttonLabel}
                            />
                            {footer}
                        </Fragment>
                    </FormRow>
                </form>
            </Fragment>
        );
    }
}
