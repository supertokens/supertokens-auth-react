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
import { Fragment, useCallback } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import { useOnMountAPICall, useRethrowInRender } from "../../../../../utils";
import Session from "../../../../session/recipe";
import { SignInAndUpCallbackTheme } from "../../themes/signInAndUpCallback";
import { defaultTranslationsThirdParty } from "../../themes/translations";

import type { Awaited, FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, CustomStateProperties } from "../../../types";

type PropType = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

const SignInAndUpCallback: React.FC<PropType> = (props) => {
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const rethrowInRender = useRethrowInRender();

    const verifyCode = useCallback(() => {
        return props.recipe.webJSRecipe.signInAndUp({
            userContext,
        });
    }, [props.recipe, userContext]);

    const handleVerifyResponse = useCallback(
        async (response: Awaited<ReturnType<typeof verifyCode>>): Promise<void> => {
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "no_email_present",
                    },
                    redirectBack: false,
                    userContext,
                });
            }

            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: response.status,
                        message: response.reason,
                    },
                    redirectBack: false,
                    userContext,
                });
            }

            if (response.status === "OK") {
                const stateResponse = props.recipe.webJSRecipe.getStateAndOtherInfoFromStorage<CustomStateProperties>({
                    userContext,
                });
                const redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;

                return Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            action: "SUCCESS",
                            isNewPrimaryUser: response.createdNewRecipeUser && response.user.loginMethods.length === 1,
                            isNewRecipeUser: response.createdNewRecipeUser,
                            isFirstFactor: true,
                            recipeId: props.recipe.recipeID,
                        },
                        props.recipe.recipeID,
                        redirectToPath,
                        userContext,
                        props.navigate
                    )
                    .catch(rethrowInRender);
            }
        },
        [props.recipe, props.navigate, userContext]
    );

    const handleError = useCallback(
        (err) => {
            if (STGeneralError.isThisError(err)) {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                    userContext,
                });
            }

            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate: props.navigate,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
                userContext,
            });
        },
        [props.navigate, userContext]
    );

    useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);

    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsThirdParty}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <SignInAndUpCallbackTheme config={props.recipe.config} />}

                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default SignInAndUpCallback;
