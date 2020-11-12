/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import * as React from "react";
import { FormEvent, Fragment, PureComponent } from "react";
import { FormBaseState, FormBaseProps } from "../../types";
import { Button, FormRow, Input, InputError, Label } from ".";
import { APIFormField } from "../../../../types";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../constants";
import { StyleConsumer } from "../../styles/styleContext";

/*
 * Component.
 */

export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    /*
     * Constructor.
     */
    constructor(props: FormBaseProps) {
        super(props);

        this.state = {
            formFields: props.formFields,
            generalError: undefined,
            isLoading: false
        };
    }

    /*
     * Methods.
     */

    handleInputChange = async (field: APIFormField): Promise<void> => {
        const formFields = this.state.formFields;
        for (let i = 0; i < formFields.length; i++) {
            if (field.id === formFields[i].id) {
                // remove error on input change.
                formFields[i].error = undefined;
                formFields[i].validated = false;
            }
        }

        // Slightly delay the error update to prevent UI glitches.
        setTimeout(
            () =>
                this.setState(oldState => ({
                    ...oldState,
                    formFields: [...formFields]
                })),
            300
        );
    };

    onFormSubmit = async (e: FormEvent): Promise<void> => {
        // Prevent default event propagation.
        e.preventDefault();

        // Set isLoading to true.
        this.setState(oldState => ({
            ...oldState,
            generalError: undefined,
            isLoading: true
        }));

        // Get the fields values from form.
        const fields = this.state.formFields.map(field => {
            return {
                id: field.id,
                value: field.ref.current !== null ? field.ref.current.value : ""
            };
        });

        // Call Sign In API.
        const result = await this.props.callAPI(fields);
        // Set isLoading to false.
        this.setState(oldState => ({
            ...oldState,
            isLoading: false
        }));

        // If successfully logged in.
        if (result.status === API_RESPONSE_STATUS.OK) {
            if (this.props.onSuccess !== undefined) {
                this.props.onSuccess();
            }
            return;
        }

        // If field error.
        if (result.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            const errorFields = result.formFields;

            // Update formFields state with errors.
            const formFields = this.state.formFields.map(field => {
                for (let i = 0; i < errorFields.length; i++) {
                    if (field.id === errorFields[i].id) {
                        field.error = errorFields[i].error;
                    }
                    // Indicate to inputs that the value was submitted for validation, adding the input adornment icon
                    // Skip empty optional fields.
                    if (
                        field.ref.current !== null &&
                        field.ref.current.value.length !== 0 &&
                        field.error === undefined
                    ) {
                        field.validated = true;
                    } else if (field.error !== undefined) {
                        field.validated = true;
                    }
                }
                return field;
            });
            this.setState(oldState => ({
                ...oldState,
                formFields: formFields
            }));
            return;
        }

        // Otherwise if message, set generalError
        if (
            result.status === API_RESPONSE_STATUS.GENERAL_ERROR ||
            result.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR
        ) {
            this.setState(oldState => ({
                ...oldState,
                generalError: result.message
            }));
        }
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const { header, footer, buttonLabel, showLabels } = this.props;
        const { generalError, formFields, isLoading } = this.state;

        return (
            <StyleConsumer>
                {styles => (
                    <div className="container" css={styles.container}>
                        <div className="row" css={styles.row}>
                            {header}
                            {generalError && (
                                <div className="generalError" css={styles.generalError}>
                                    {generalError}
                                </div>
                            )}

                            <form autoComplete="on" noValidate onSubmit={this.onFormSubmit}>
                                {formFields.map(field => {
                                    let type = "text";
                                    // If email or password, replace field type.
                                    if (
                                        MANDATORY_FORM_FIELDS_ID_ARRAY.includes(
                                            (field as { id: MANDATORY_FORM_FIELDS_ID }).id
                                        )
                                    ) {
                                        type = field.id;
                                    }
                                    if (field.id === "confirm-password") {
                                        type = "password";
                                    }

                                    return (
                                        <FormRow key={field.id}>
                                            <Fragment>
                                                {showLabels && (
                                                    <Label value={field.label} showIsRequired={field.showIsRequired} />
                                                )}

                                                <Input
                                                    type={type}
                                                    name={field.id}
                                                    placeholder={field.placeholder}
                                                    ref={field.ref}
                                                    onChange={this.handleInputChange}
                                                    hasError={field.error !== undefined}
                                                    validated={field.validated}
                                                />

                                                {field.error && <InputError error={field.error} />}
                                            </Fragment>
                                        </FormRow>
                                    );
                                })}

                                <FormRow key="form-button">
                                    <Fragment>
                                        <Button
                                            disabled={isLoading}
                                            isLoading={isLoading}
                                            type="submit"
                                            label={buttonLabel}
                                        />
                                        {footer}
                                    </Fragment>
                                </FormRow>
                            </form>
                        </div>
                    </div>
                )}
            </StyleConsumer>
        );
    }
}
