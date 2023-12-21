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
import * as React from "react";
import { useContext, useState, useCallback, Fragment } from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { MultiFactorAuthClaim } from "../../..";
import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, useOnMountAPICall } from "../../../../../utils";
import { SessionContext, useClaimValue } from "../../../../session";
import Session from "../../../../session/recipe";
import MultiFactorAuth from "../../../recipe";
import FactorChooserTheme from "../../themes/factorChooser";
import { defaultTranslationsMultiFactorAuth } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { MFAFactorInfo } from "supertokens-web-js/lib/build/recipe/multifactorauth/types";

type Prop = FeatureBaseProps & { recipe: Recipe; userContext?: any; useComponentOverrides: () => ComponentOverrideMap };

export const FactorChooser: React.FC<Prop> = (props) => {
    const sessionContext = useContext(SessionContext);
    const [mfaInfo, setMFAInfo] = useState<MFAFactorInfo | undefined>(undefined);
    const mfaClaimValue = useClaimValue(MultiFactorAuthClaim);
    const userContext = useUserContext();
    const recipeComponentOverrides = props.useComponentOverrides();

    const nextOpts = getQueryParams("n") ?? undefined;

    const redirectToAuthWithHistory = useCallback(async () => {
        await redirectToAuth({ redirectBack: false, navigate: props.navigate });
    }, [props.navigate]);

    const fetchMFAInfo = useCallback(
        async () => props.recipe.webJSRecipe.getMFAInfo({ userContext }),
        [props.recipe, userContext]
    );

    const checkMFAInfo = useCallback(
        async (mfaInfo: { factors: MFAFactorInfo }): Promise<void> => {
            if (mfaClaimValue.loading === true) {
                throw new Error("This should never happen: session context loaded but claim value loading");
            }
            const availableFactors = props.recipe
                .getSecondaryFactors()
                .filter(
                    ({ id }) =>
                        mfaInfo.factors.isAllowedToSetup.includes(id) || mfaInfo.factors.isAlreadySetup.includes(id)
                )
                .filter(({ id }) => mfaClaimValue.value!.n.length === 0 || mfaClaimValue.value!.n.includes(id))
                .filter(({ id }) => nextOpts === undefined || nextOpts.length === 0 || nextOpts.includes(id));

            // If we got here when the next array is not empty, that means that the user redirected here intentionally
            // In this case we do not want to automatically redirect away but show the chooser screen.
            if (mfaClaimValue.value!.n.length !== 0 && availableFactors.length === 1) {
                return MultiFactorAuth.getInstanceOrThrow().redirectToFactor(
                    availableFactors[0].id,
                    false,
                    false,
                    props.navigate
                );
            } else {
                setMFAInfo(mfaInfo.factors);
            }
        },
        [setMFAInfo, nextOpts]
    );

    const handleError = useCallback(
        async (err) => {
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
        (factorId) => props.recipe.redirectToFactor(factorId, false, false, props.navigate),
        [props.recipe]
    );
    const signOut = useCallback(async (): Promise<void> => {
        const session = Session.getInstanceOrThrow();
        await session.signOut(props.userContext);
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

    if (mfaInfo === undefined || mfaClaimValue.loading) {
        return <Fragment />;
    }

    const availableFactors = props.recipe
        .getSecondaryFactors()
        .filter(({ id }) => mfaInfo.isAllowedToSetup.includes(id) || mfaInfo.isAlreadySetup.includes(id))
        .filter(({ id }) => mfaClaimValue.value?.n.length === 0 || mfaClaimValue.value?.n.includes(id))
        .filter(({ id }) => nextOpts === undefined || nextOpts.length === 0 || nextOpts.includes(id));

    const childProps = {
        config: props.recipe.config,
        onBackButtonClicked,
        showBackButton: mfaClaimValue.value?.n.length === 0,
        mfaInfo: mfaInfo,
        availableFactors: availableFactors,
        onLogoutClicked: signOut,
        navigateToFactor: navigateToFactor,
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
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
