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
import { Button, FormRow, Input, InputError, Label } from ".";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { APIFormField } from "../../../../types";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID_ARRAY, MANDATORY_FORM_FIELDS_ID } from "../../constants";
import { FormBaseProps, FormBaseState, FormBaseStatus, FormFieldState } from "../../types";
import { StyleConsumer } from "../styles/styleContext";

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
            status: "IN_PROGRESS"
        };
    }

    /*
     * Methods.
     */

    handleInputFocus = async (field: APIFormField): Promise<void> => {
        const formFields = this.state.formFields;
        for (let i = 0; i < formFields.length; i++) {
            if (field.id === formFields[i].id) {
                // remove error on input change.
                formFields[i].error = undefined;
            }
        }

        const status = this.getNewStatus(formFields, "focus");

        // Slightly delay the error update to prevent UI glitches.
        setTimeout(
            () =>
                this.setState(() => ({
                    status,
                    formFields: [...formFields]
                })),
            300
        );
    };

    handleInputBlur = async (field: APIFormField): Promise<void> => {
        const formFields = this.state.formFields;
        for (let i = 0; i < formFields.length; i++) {
            if (field.id === formFields[i].id) {
                // Validate.
                formFields[i].error = await formFields[i].validate(field.value);
                const validateOnBlurOnly = formFields[i].validateOnBlurOnly;

                if (formFields[i].error === undefined && validateOnBlurOnly !== undefined) {
                    formFields[i].error = await validateOnBlurOnly(field.value);
                }
            }
        }
        const status = this.getNewStatus(formFields, "blur");

        // Slightly delay the update to prevent UI glitches.
        setTimeout(
            () =>
                this.setState(oldState => {
                    // Do not update status asynchronously on blur if backend error already came in.
                    if (oldState.status === "GENERAL_ERROR") {
                        return oldState;
                    }
                    return {
                        status,
                        formFields: [...formFields]
                    };
                }),
            300
        );
    };

    getNewStatus(formFields: FormFieldState[], type: "focus" | "blur"): FormBaseStatus {
        let newStatus: FormBaseStatus = "READY";
        let isNotLastRequiredFieldEmpty = false;
        for (const i in formFields) {
            const field = formFields[i];
            if (field.error !== undefined) {
                newStatus = "FIELD_ERRORS";
                break;
            }
            if (field.optional === false) {
                const value = field.ref.current !== null ? field.ref.current.value : "";

                if (value.length === 0) {
                    if (type === "blur") {
                        newStatus = "IN_PROGRESS";
                    } else {
                        /*
                         * In case of input focus event type,
                         * Leave the benefice of the doubt if last empty field to re-enable Submit button even if input is still focused.
                         */
                        if (isNotLastRequiredFieldEmpty === false) {
                            // On empty value, do not update status ot in progress if it is the only empty field on focus.
                            isNotLastRequiredFieldEmpty = true;
                        } else {
                            // If is not last required field empty, then set status to in progress.
                            newStatus = "IN_PROGRESS";
                        }
                    }
                }
            }
        }

        return newStatus;
    }

    onFormSubmit = async (e: FormEvent): Promise<void> => {
        // Prevent default event propagation.
        e.preventDefault();

        // Set loading state.
        this.setState(oldState => ({
            ...oldState,
            status: "LOADING"
        }));

        // Get the fields values from form.
        const fields = this.state.formFields.map(field => {
            return {
                id: field.id,
                value: field.ref.current !== null ? field.ref.current.value : ""
            };
        });

        // Call API.
        const result = await this.props.callAPI(fields);

        // If successful
        if (result.status === API_RESPONSE_STATUS.OK) {
            if (this.props.onSuccess !== undefined) {
                this.props.onSuccess();
            }
            // Set Success state.
            this.setState(oldState => ({
                ...oldState,
                status: "SUCCESS"
            }));
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
                }
                return field;
            });
            this.setState(() => ({
                status: "FIELD_ERRORS",
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
                status: "GENERAL_ERROR",
                generalError: result.message
            }));
        }
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const { header, footer, buttonLabel, showLabels, noValidateOnBlur } = this.props;
        const { formFields } = this.state;
        const onInputBlur = noValidateOnBlur === true ? undefined : this.handleInputBlur;

        return (
            <StyleConsumer>
                {styles => (
                    <div className="container" css={styles.container}>
                        <div className="row" css={styles.row}>
                            {header}
                            {this.state.status === "GENERAL_ERROR" && (
                                <div className="generalError" css={styles.generalError}>
                                    {this.state.generalError}
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
                                            disabled={["READY", "GENERAL_ERROR"].includes(this.state.status) !== true}
                                            isLoading={this.state.status === "LOADING"}
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
