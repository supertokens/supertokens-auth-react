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
import SignInUpTheme from "../../themes/signInUp";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getQueryParams, getRedirectToPathFromURL } from "../../../../../utils";
import Recipe from "../../../recipe";
import { getStyles } from "../../../components/themes/styles";
import { RecipeInterface, LoginAttemptInfo } from "../../../types";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { FeatureBaseProps } from "../../../../../types";
import { formatPhoneNumberIntl } from "react-phone-number-input/min";
import Session from "../../../../session";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import {
    SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW_ERROR,
    SIGN_IN_UP_LINK_ERROR,
    SIGN_IN_UP_RESEND_RESTART_FLOW_ERROR,
} from "../../../constants";

type SignInUpState = {
    error: string | undefined;
    loaded: boolean;
    loginAttemptInfo: LoginAttemptInfo | undefined;
    checkSessionIntervalHandle: any;
    successInAnotherTab: boolean;
};

type PropType = FeatureBaseProps & {
    recipe: Recipe;
};

class SignInUp extends PureComponent<PropType, SignInUpState> {
    constructor(props: PropType) {
        super(props);

        let error: string | undefined = undefined;
        const errorQueryParam = getQueryParams("error");
        const messageQueryParam = getQueryParams("message");
        if (errorQueryParam !== null) {
            if (errorQueryParam === "signin") {
                error = SOMETHING_WENT_WRONG_ERROR;
            } else if (errorQueryParam === "restart_link") {
                error = SIGN_IN_UP_LINK_ERROR;
            } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                error = messageQueryParam;
            }
        }
        this.state = {
            loaded: false,
            loginAttemptInfo: undefined,
            checkSessionIntervalHandle: undefined,
            error,
            successInAnotherTab: false,
        };
    }

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    getModifiedRecipeImplementation = (): RecipeInterface => {
        return {
            ...this.props.recipe.recipeImpl,
            createCode: async (input) => {
                let contactInfo;
                if ("email" in input) {
                    contactInfo = input.email;
                } else {
                    contactInfo = formatPhoneNumberIntl(input.phoneNumber);
                }
                const res = await this.props.recipe.recipeImpl.createCode(input);
                if (res.status === "OK") {
                    const loginAttemptInfo = {
                        ...res,
                        lastResend: new Date().getTime(),
                        contactMethod: this.props.recipe.config.contactMethod,
                        contactInfo,
                        redirectToPath: getRedirectToPathFromURL(),
                    };
                    await this.props.recipe.recipeImpl.setLoginAttemptInfo(loginAttemptInfo);
                    this.setState((os) => ({
                        ...os,
                        error: undefined,
                        loginAttemptInfo,
                    }));
                } else if (res.status === "GENERAL_ERROR") {
                    this.setState((os) => ({
                        ...os,
                        error: res.message,
                        loginAttemptInfo: undefined,
                    }));
                }
                return res;
            },
            resendCode: async (input) => {
                if (!this.state.loginAttemptInfo) {
                    // This should never happen, but it makes TS happy
                    throw new Error("Resend without loginAttemptInfo");
                }
                const res = await this.props.recipe.recipeImpl.resendCode(input);
                if (res.status === "OK") {
                    const loginAttemptInfo = {
                        ...this.state.loginAttemptInfo,
                        lastResend: new Date().getTime(),
                    };
                    await this.props.recipe.recipeImpl.setLoginAttemptInfo(loginAttemptInfo);
                    this.setState((os) => ({
                        ...os,
                        error: undefined,
                        loginAttemptInfo,
                    }));
                } else if (res.status === "RESTART_FLOW_ERROR") {
                    await this.props.recipe.recipeImpl.clearLoginAttemptInfo();

                    this.setState((os) => ({
                        ...os,
                        error: SIGN_IN_UP_RESEND_RESTART_FLOW_ERROR,
                        loginAttemptInfo: undefined,
                    }));
                } else if (res.status === "GENERAL_ERROR") {
                    this.setState((os) => ({
                        ...os,
                        error: res.message,
                        loginAttemptInfo: undefined,
                    }));
                }
                return res;
            },

            consumeCode: async (input) => {
                const res = await this.props.recipe.recipeImpl.consumeCode(input);
                if (res.status === "RESTART_FLOW_ERROR") {
                    await this.props.recipe.recipeImpl.clearLoginAttemptInfo();

                    this.setState((os) => ({
                        ...os,
                        error: SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW_ERROR,
                        loginAttemptInfo: undefined,
                    }));
                } else if (res.status === "GENERAL_ERROR") {
                    this.setState((os) => ({
                        ...os,
                        error: res.message,
                        loginAttemptInfo: undefined,
                    }));
                } else if (res.status === "OK") {
                    await this.props.recipe.recipeImpl.clearLoginAttemptInfo();
                }

                return res;
            },

            clearLoginAttemptInfo: async () => {
                await this.props.recipe.recipeImpl.clearLoginAttemptInfo();
                this.setState((os) => ({
                    ...os,
                    loginAttemptInfo: undefined,
                    error: undefined,
                }));
            },
        };
    };

    componentDidMount = async (): Promise<void> => {
        const loginAttemptInfo = await this.getModifiedRecipeImplementation().getLoginAttemptInfo();

        // We could be using storage events for this, but we need to keep customization in mind.
        // Someone could be using something else other than localstorage.
        const checkSessionIntervalHandle = setInterval(async () => {
            const hasSession = await Session.doesSessionExist();
            if (hasSession) {
                this.setState((os) => ({ ...os, successInAnotherTab: true }));
            }
        }, 2000);

        this.setState((s) => ({ ...s, loaded: true, loginAttemptInfo, checkSessionIntervalHandle }));
    };

    componentWillUnmount = () => {
        if (this.state.checkSessionIntervalHandle) {
            clearInterval(this.state.checkSessionIntervalHandle);
        }
    };

    render = (): JSX.Element => {
        const componentOverrides = this.props.recipe.config.override.components;

        const isEmail = this.props.recipe.config.contactMethod === "EMAIL";
        const conf = isEmail ? this.props.recipe.config.emailForm : this.props.recipe.config.mobileForm;

        const props = {
            onSuccess: () => {
                return this.props.recipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: false,
                        redirectToPath: getRedirectToPathFromURL(),
                    },
                    this.props.history
                );
            },
            loaded: this.state.loaded,
            loginAttemptInfo: this.state.loginAttemptInfo,
            successInAnotherTab: this.state.successInAnotherTab,
            error: this.state.error,
            recipeImplementation: this.getModifiedRecipeImplementation(),
            config: this.props.recipe.config,
        };

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom} isEmbedded={this.getIsEmbedded()}>
                    <StyleProvider
                        rawPalette={this.props.recipe.config.palette}
                        defaultPalette={defaultPalette}
                        styleFromInit={conf.style}
                        rootStyleFromInit={this.props.recipe.config.rootStyle}
                        getDefaultStyles={getStyles}>
                        <Fragment>
                            {/* No custom theme, use default. */}
                            {this.props.children === undefined && <SignInUpTheme {...props} />}

                            {/* Otherwise, custom theme is provided, propagate props. */}
                            {this.props.children && React.cloneElement(this.props.children, props)}
                        </Fragment>
                    </StyleProvider>
                </FeatureWrapper>
            </ComponentOverrideContext.Provider>
        );
    };
}

export default SignInUp;
