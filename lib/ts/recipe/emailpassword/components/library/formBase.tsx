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
import { FormBaseProps, FormBaseState, FormFieldState, InputRef } from "../../types";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../constants";
import { MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../constants";
import StyleContext from "../../../../styles/styleContext";

/*
 * Component.
 */

export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    static contextType = StyleContext;

    /*
     * Constructor.
     */
    constructor(props: FormBaseProps) {
        super(props);

        this.state = {
            formFields: props.formFields.map((field) => ({
                ...field,
                validated: false,
                ref: createRef<InputRef>(),
            })),
            status: "IN_PROGRESS",
        };
    }

    /*
     * Methods.
     */

    handleInputFocus = async (field: APIFormField): Promise<void> => {
        this.setState((oldState) => {
            return this.getNewState(oldState.formFields, field, "focus", undefined);
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
            return this.getNewState(oldState.formFields, field, "blur", error);
        });
    };

    getNewState(
        formFields: FormFieldState[],
        field: APIFormField,
        event: "blur" | "focus",
        error: string | undefined
    ): FormBaseState {
        // Add error to formFields array for corresponding field.
        formFields = formFields.map((formField) => {
            if (formField.id !== field.id) {
                return formField;
            }
            return {
                ...formField,
                validated: event === "blur" && error === undefined && field.value.length !== 0,
                error,
            };
        });

        let status: FormBaseState["status"] = "READY";

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
            status,
            formFields,
        };
    }

    onFormSubmit = async (e: FormEvent): Promise<void> => {
        // Prevent default event propagation.
        e.preventDefault();

        // Set loading state.
        this.setState((oldState) => ({
            ...oldState,
            status: "LOADING",
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
                            this.props.onSuccess();
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
                generalError: SOMETHING_WENT_WRONG_ERROR,
            }));
        }
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const styles = this.context;
        const { header, footer, buttonLabel, showLabels, validateOnBlur } = this.props;
        const { formFields } = this.state;
        const onInputBlur = validateOnBlur === true ? this.handleInputBlur : undefined;

        return (
            <Fragment>
                {header}
                {this.state.status === "GENERAL_ERROR" && (
                    <div data-supertokens="generalError" css={styles.generalError}>
                        {this.state.generalError}
                    </div>
                )}

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

                        return (
                            <FormRow key={field.id} hasError={field.error !== undefined}>
                                <Fragment>
                                    {showLabels && <Label value={field.label} showIsRequired={field.showIsRequired} />}

                                    <Input
                                        type={type}
                                        name={field.id}
                                        validated={field.validated}
                                        placeholder={field.placeholder}
                                        ref={field.ref}
                                        autoComplete={field.autoComplete}
                                        onInputFocus={this.handleInputFocus}
                                        onInputBlur={onInputBlur}
                                        hasError={field.error !== undefined}
                                    />

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
