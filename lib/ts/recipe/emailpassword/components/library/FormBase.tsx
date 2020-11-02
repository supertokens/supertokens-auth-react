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
import { Component, FormEvent } from "react";
import { FormBaseState, FormBaseProps } from "../../types";
import { Button, FormRow, Input, InputError, Label } from ".";
import { APIFormField } from "../../../../types";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../constants";

/*
 * Component.
 */

export default class FormBase extends Component<FormBaseProps, FormBaseState> {
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
                this.setState({
                    formFields: [...formFields]
                }),
            300
        );
    };

    onFormSubmit = async (e: FormEvent): Promise<void> => {
        // Prevent default event propagation.
        e.preventDefault();

        // Set isLoading to true.
        this.setState({
            generalError: undefined,
            isLoading: true
        });

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
        this.setState({
            isLoading: false
        });

        // If successfully logged in.
        if (result.status === API_RESPONSE_STATUS.OK) {
            // TODO: Show result in UI?

            if (this.props.onSuccess !== undefined) {
                this.props.onSuccess();
            }
            return;
        }

        // If field error.
        if (result.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            const errorFields = result.fields;

            // Update formFields state with errors.
            const formFields = this.state.formFields.map(field => {
                for (let i = 0; i < errorFields.length; i++) {
                    if (field.id === errorFields[i].id) {
                        field.error = errorFields[i].error;
                    }
                    // Indicate to inputs that the value was submitted for validation, adding the input adornment icon.
                    field.validated = true;
                }
                return field;
            });
            this.setState({
                formFields: formFields
            });
            return;
        }

        // Otherwise if message, set generalError
        if (
            result.status === API_RESPONSE_STATUS.GENERAL_ERROR ||
            result.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR
        ) {
            this.setState({
                generalError: result.message
            });
        }
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const { defaultStyles, palette, header, footer, buttonLabel, showLabels } = this.props;
        const styleFromInit = this.props.styleFromInit || {};
        const { generalError, formFields, isLoading } = this.state;

        return (
            <div className="container" css={[defaultStyles.container, styleFromInit.container]}>
                <div className="row" css={[defaultStyles.row, styleFromInit.row]}>
                    {header}
                    {generalError && (
                        <div className="generalError" css={[defaultStyles.generalError, styleFromInit.generalError]}>
                            {generalError}
                        </div>
                    )}

                    <form autoComplete="off" noValidate onSubmit={this.onFormSubmit}>
                        {formFields.map(field => {
                            let type = "text";
                            // If email or password, replace field type.
                            if (
                                MANDATORY_FORM_FIELDS_ID_ARRAY.includes((field as { id: MANDATORY_FORM_FIELDS_ID }).id)
                            ) {
                                type = field.id;
                            }
                            if (field.id === "confirm-password") {
                                type = "password";
                            }

                            return (
                                <FormRow style={styleFromInit.formRow} key={field.id} defaultStyles={defaultStyles}>
                                    <>
                                        {showLabels && (
                                            <Label
                                                style={styleFromInit.label}
                                                value={field.label}
                                                showIsRequired={field.showIsRequired}
                                                defaultStyles={defaultStyles}
                                            />
                                        )}

                                        <Input
                                            style={styleFromInit.input}
                                            errorStyle={styleFromInit.inputError}
                                            adornmentStyle={styleFromInit.inputAdornment}
                                            type={type}
                                            name={field.id}
                                            placeholder={field.placeholder}
                                            ref={field.ref}
                                            onChange={this.handleInputChange}
                                            hasError={field.error !== undefined}
                                            validated={field.validated}
                                            defaultStyles={defaultStyles}
                                            palette={palette}
                                        />

                                        {field.error && (
                                            <InputError
                                                style={styleFromInit.inputErrorMessage}
                                                error={field.error}
                                                defaultStyles={defaultStyles}
                                            />
                                        )}
                                    </>
                                </FormRow>
                            );
                        })}

                        <FormRow style={styleFromInit.formRow} key="form-button" defaultStyles={defaultStyles}>
                            <>
                                <Button
                                    defaultStyles={defaultStyles}
                                    style={styleFromInit.button}
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                    type="submit"
                                    label={buttonLabel}
                                />
                                {footer}
                            </>
                        </FormRow>
                    </form>
                </div>
            </div>
        );
    }
}
