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

/*
 * Imports.
 */
import * as React from "react";
import { useContext, useState, useCallback, Fragment } from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, getRedirectToPathFromURL, useOnMountAPICall, useRethrowInRender } from "../../../../../utils";
import { SessionContext } from "../../../../session";
import Session from "../../../../session/recipe";
import MultiFactorAuth from "../../../recipe";
import { getAvailableFactors } from "../../../utils";
import FactorChooserTheme from "../../themes/factorChooser";
import { defaultTranslationsMultiFactorAuth } from "../../themes/translations";

import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, LoadedMFAInfo } from "../../../types";

type Prop = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

export const FactorChooser: React.FC<Prop> = (props) => {
    const sessionContext = useContext(SessionContext);

    const rethrowInRender = useRethrowInRender();

    const [mfaInfo, setMFAInfo] = useState<LoadedMFAInfo | undefined>(undefined);
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const recipeComponentOverrides = props.useComponentOverrides();

    const nextQueryParam = getQueryParams("n") ?? undefined;
    const stepUpQueryParam = getQueryParams("stepUp");

    const redirectToAuthWithHistory = useCallback(async () => {
        await redirectToAuth({ redirectBack: false, navigate: props.navigate });
    }, [props.navigate]);

    const fetchMFAInfo = useCallback(
        async () => props.recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext }),
        [props.recipe, userContext]
    );

    const checkMFAInfo = useCallback(
        async (mfaInfo: Awaited<ReturnType<typeof fetchMFAInfo>>): Promise<void> => {
            if (mfaInfo.factors.next.length === 0 && stepUpQueryParam !== "true") {
                void Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        undefined,
                        MultiFactorAuth.RECIPE_ID,
                        getRedirectToPathFromURL(),
                        userContext,
                        props.navigate
                    )
                    .catch(rethrowInRender);
            } else {
                setMFAInfo({
                    factors: mfaInfo.factors,
                    phoneNumbers: mfaInfo.phoneNumbers,
                    emails: mfaInfo.emails,
                });
            }
        },
        [setMFAInfo, nextQueryParam, userContext]
    );

    const handleError = useCallback(
        async (err: any) => {
            if (await Session.getInstanceOrThrow().doesSessionExist({ userContext })) {
                throw err;
            } else {
                await redirectToAuthWithHistory();
            }
        },
        [redirectToAuthWithHistory]
    );

    useOnMountAPICall(fetchMFAInfo, checkMFAInfo, handleError, sessionContext.loading === false);

    const navigateToFactor = useCallback(
        (factorId: string) => {
            props.recipe.config.onHandleEvent({
                action: "FACTOR_CHOOSEN",
                factorId,
            });
            return props.recipe.redirectToFactor({
                factorId,
                forceSetup: false,
                stepUp: stepUpQueryParam === "true",
                redirectBack: false,
                navigate: props.navigate,
                userContext: props.userContext,
            });
        },
        [props.recipe]
    );
    const signOut = useCallback(async (): Promise<void> => {
        const session = Session.getInstanceOrThrow();
        await session.signOut({ userContext });
        return redirectToAuthWithHistory();
    }, [props.recipe, redirectToAuthWithHistory]);

    const onBackButtonClicked = useCallback(() => {
        // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
        if (props.navigate === undefined) {
            return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
        }
        // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
        if ("goBack" in props.navigate) {
            return props.navigate.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.navigate(-1);
    }, [props.navigate]);

    if (mfaInfo === undefined) {
        return null;
    }

    const availableFactors = getAvailableFactors(mfaInfo.factors, nextQueryParam, props.recipe, userContext);

    const childProps = {
        config: props.recipe.config,
        onBackButtonClicked,
        // if the next array is empty, it means the user has logged in fully and has come here (from a settings page for example).
        // So we show the back button. In case the next array is not empty, it means we are still signing in, and
        // there is no where to go back to, other than logout, which is a different button in the UI.
        showBackButton: mfaInfo.factors.next.length === 0,
        mfaInfo: mfaInfo,
        availableFactors: availableFactors,
        onLogoutClicked: signOut,
        navigateToFactor: navigateToFactor,
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsMultiFactorAuth}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <FactorChooserTheme {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default FactorChooser;
