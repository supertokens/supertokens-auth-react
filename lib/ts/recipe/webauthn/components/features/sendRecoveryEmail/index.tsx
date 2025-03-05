/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import * as React from "react";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { SendRecoveryEmailScreen } from "../../../types";
import SendRecoveryEmailFormTheme from "../../themes/sendRecoveryEmail";
import { defaultTranslationsWebauthn } from "../../themes/translations";

import type { SendRecoveryEmailFormProps } from "../../../types";

export const SendRecoveryEmailForm: React.FC<SendRecoveryEmailFormProps> = (props): JSX.Element => {
    let userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [error, setError] = React.useState<string>();
    const [recoverAccountEmail, setRecoverAccountEmail] = React.useState<string>("");
    const [activeScreen, setActiveScreen] = React.useState<SendRecoveryEmailScreen>(
        SendRecoveryEmailScreen.RecoverAccount
    );

    const onRecoverAccountFormSuccess = (result: { email: string }) => {
        setRecoverAccountEmail(result.email);
        setActiveScreen(SendRecoveryEmailScreen.RecoverEmailSent);
    };

    const onRecoverAccountBackClick = async () => {
        await redirectToAuth({ show: "signup" });
    };

    const onEmailChangeClick = () => {
        setActiveScreen(SendRecoveryEmailScreen.RecoverAccount);
    };

    const childProps = {
        config: props.recipe.config,
        error: error,
        onError: (error: string) => setError(error),
        clearError: () => setError(undefined),
        recipeImplementation: props.recipe.webJSRecipe,
        useComponentOverride: props.useComponentOverrides,
        userContext,
        recoverAccountEmail,
        activeScreen,
        onRecoverAccountFormSuccess,
        onRecoverAccountBackClick,
        onEmailChangeClick,
        setActiveScreen,
    };
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsWebauthn}>
                <React.Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <SendRecoveryEmailFormTheme {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </React.Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};
