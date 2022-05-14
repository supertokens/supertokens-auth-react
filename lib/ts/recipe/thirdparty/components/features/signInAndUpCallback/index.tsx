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
import { Fragment, useCallback } from "react";

import { Awaited, FeatureBaseProps } from "../../../../../types";
import { getCurrentNormalisedUrlPath, useOnMountAPICall } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import {} from "../../../types";
import { SignInAndUpCallbackTheme } from "../../themes/signInAndUpCallback";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsThirdParty } from "../../themes/translations";

type PropType = FeatureBaseProps & { recipe: Recipe };

const SignInAndUpCallback: React.FC<PropType> = (props) => {
    const verifyCode = useCallback(() => {
        const pathName = getCurrentNormalisedUrlPath().getAsStringDangerous();
        const providerId = pathName.split("/")[pathName.split("/").length - 1];
        return props.recipe.recipeImpl.signInAndUp({
            thirdPartyId: providerId,
            config: props.recipe.config,
        });
    }, [props.recipe, props.history]);

    const handleVerifyResponse = useCallback(
        async (response: Awaited<ReturnType<typeof verifyCode>>): Promise<void> => {
            if (response.status === "GENERAL_ERROR") {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "signin",
                });
            }
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "no_email_present",
                });
            }
            if (response.status === "FIELD_ERROR") {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "custom",
                    message: response.error,
                });
            }
            if (response.status === "OK") {
                const state = props.recipe.recipeImpl.getOAuthState();
                const redirectToPath = state === undefined ? undefined : state.redirectToPath;

                if (props.recipe.emailVerification.config.mode === "REQUIRED") {
                    let isEmailVerified = true;
                    try {
                        isEmailVerified = await props.recipe.emailVerification.isEmailVerified();
                    } catch (ignored) {}
                    if (!isEmailVerified) {
                        await props.recipe.savePostEmailVerificationSuccessRedirectState({
                            redirectToPath: redirectToPath,
                            isNewUser: true,
                            action: "SUCCESS",
                        });
                        return props.recipe.emailVerification.redirect(
                            {
                                action: "VERIFY_EMAIL",
                            },
                            props.history
                        );
                    }
                }
                return props.recipe.redirect(
                    { action: "SUCCESS", isNewUser: response.createdNewUser, redirectToPath },
                    props.history
                );
            }
        },
        [props.recipe, props.history]
    );

    const handleError = useCallback(() => {
        return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
            error: "signin",
        });
    }, [props.recipe, props.history]);

    useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);

    const componentOverrides = props.recipe.config.override.components;

    const oAuthCallbackScreen = props.recipe.config.oAuthCallbackScreen;

    return (
        <ComponentOverrideContext.Provider value={componentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsThirdParty}>
                <StyleProvider
                    rawPalette={props.recipe.config.palette}
                    defaultPalette={defaultPalette}
                    styleFromInit={oAuthCallbackScreen.style}
                    rootStyleFromInit={props.recipe.config.rootStyle}
                    getDefaultStyles={getStyles}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {props.children === undefined && <SignInAndUpCallbackTheme />}

                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {props.children}
                    </Fragment>
                </StyleProvider>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default SignInAndUpCallback;
