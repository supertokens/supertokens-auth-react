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
import * as React from "react";
import { PureComponent, Fragment } from "react";

import { FormFieldThemeProps } from "../../../types";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { getRedirectToPathFromURL } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { SignInAndUpState, RecipeInterface } from "../../../types";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";

type PropType = FeatureBaseProps & {
    recipe: Recipe;
};

class SignInAndUp extends PureComponent<PropType, SignInAndUpState> {
    constructor(props: PropType) {
        super(props);

        this.state = {
            user: undefined,
        };
    }

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    onSignInSuccess = async (): Promise<void> => {
        if (this.state.user === undefined) {
            return;
        }

        if (this.props.recipe.emailVerification.config.mode === "REQUIRED") {
            let isEmailVerified = true;
            try {
                // TODO NEMI: handle user context for pre built UI
                isEmailVerified = (await this.props.recipe.emailVerification.isEmailVerified({})).isVerified;
            } catch (ignored) {}
            if (!isEmailVerified) {
                await this.props.recipe.savePostEmailVerificationSuccessRedirectState({
                    redirectToPath: getRedirectToPathFromURL(),
                    isNewUser: false,
                    action: "SUCCESS",
                });
                return this.props.recipe.emailVerification.redirect(
                    {
                        action: "VERIFY_EMAIL",
                    },
                    this.props.history
                );
            }
        }

        return await this.props.recipe.redirect(
            {
                action: "SUCCESS",
                isNewUser: false,
                redirectToPath: getRedirectToPathFromURL(),
            },
            this.props.history
        );
    };

    onSignUpSuccess = async (): Promise<void> => {
        if (this.state.user === undefined) {
            return;
        }

        if (this.props.recipe.emailVerification.config.mode === "REQUIRED") {
            await this.props.recipe.savePostEmailVerificationSuccessRedirectState({
                redirectToPath: getRedirectToPathFromURL(),
                isNewUser: true,
                action: "SUCCESS",
            });
            return await this.props.recipe.emailVerification.redirect(
                {
                    action: "VERIFY_EMAIL",
                },
                this.props.history
            );
        } else {
            return await this.props.recipe.redirect(
                {
                    redirectToPath: getRedirectToPathFromURL(),
                    isNewUser: true,
                    action: "SUCCESS",
                },
                this.props.history
            );
        }
    };

    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[] {
        const emailPasswordOnly = formFields.length === 2;
        return formFields.map((field) => ({
            ...field,
            showIsRequired: (() => {
                // If email and password only, do not show required indicator (*).
                if (emailPasswordOnly) {
                    return false;
                }
                // Otherwise, show for all non optional fields (including email and password).
                return field.optional === false;
            })(),
            validate: (() => {
                // If field is not email, return field validate unchanged.
                if (field.id !== "email") {
                    return field.validate;
                }

                // Otherwise, if email, use syntax validate method and check if email exists.
                return async (value: any): Promise<string | undefined> => {
                    const error = await field.validate(value);
                    if (error !== undefined) {
                        return error;
                    }

                    if (typeof value !== "string") {
                        return "Email must be of type string";
                    }
                    try {
                        // TODO NEMI: handle user context for pre built UI
                        const emailExists = await this.props.recipe.recipeImpl.doesEmailExist({
                            email: value,
                            config: this.props.recipe.config,
                            userContext: {},
                        });
                        if (emailExists) {
                            return "This email already exists. Please sign in instead";
                        }
                    } catch (_) {}
                    return undefined;
                };
            })(),
        }));
    }

    getModifiedRecipeImplementation = (): RecipeInterface => {
        return {
            ...this.props.recipe.recipeImpl,
            signIn: async (input) => {
                const response = await this.props.recipe.recipeImpl.signIn(input);

                this.setState((oldState) => {
                    return response.status !== "OK"
                        ? oldState
                        : {
                              user: response.user,
                          };
                });

                return response;
            },
            signUp: async (input) => {
                const response = await this.props.recipe.recipeImpl.signUp(input);

                this.setState((oldState) => {
                    return response.status !== "OK"
                        ? oldState
                        : {
                              user: response.user,
                          };
                });

                return response;
            },
        };
    };

    render = (): JSX.Element => {
        const componentOverrides = this.props.recipe.config.override.components;

        const signInAndUpFeature = this.props.recipe.config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;

        const signInForm = {
            recipeImplementation: this.getModifiedRecipeImplementation(),
            config: this.props.recipe.config,
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            onSuccess: this.onSignInSuccess,
            forgotPasswordClick: () => this.props.recipe.redirect({ action: "RESET_PASSWORD" }, this.props.history),
        };

        const signUpForm = {
            recipeImplementation: this.getModifiedRecipeImplementation(),
            config: this.props.recipe.config,
            styleFromInit: signUpFeature.style,
            formFields: this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
            onSuccess: this.onSignUpSuccess,
        };

        const props = {
            config: this.props.recipe.config,
            signInForm: signInForm,
            signUpForm: signUpForm,
        };

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom} isEmbedded={this.getIsEmbedded()}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {this.props.children === undefined && <SignInAndUpTheme {...props} />}
                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {this.props.children &&
                            React.Children.map(this.props.children, (child) => {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, props);
                                }

                                return child;
                            })}
                    </Fragment>
                </FeatureWrapper>
            </ComponentOverrideContext.Provider>
        );
    };
}

export default SignInAndUp;
