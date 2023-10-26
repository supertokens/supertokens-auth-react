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

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { useUserContext } from "../../../../../usercontext";
import { useOnMountAPICall } from "../../../../../utils";
import { SessionContext } from "../../../../session";
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
    const userContext = useUserContext();
    const recipeComponentOverrides = props.useComponentOverrides();

    const redirectToAuthWithHistory = useCallback(async () => {
        await redirectToAuth({ redirectBack: false, history: props.history });
    }, [props.history]);

    const fetchMFAInfo = useCallback(
        async () => props.recipe.webJSRecipe.getMFAInfo({ userContext }),
        [props.recipe, userContext]
    );

    const checkMFAInfo = useCallback(
        async (mfaInfo: { factors: MFAFactorInfo }): Promise<void> => {
            const availableFactors = props.recipe
                .getSecondaryFactors()
                .filter(
                    ({ id }) =>
                        mfaInfo.factors.isAllowedToSetup.includes(id) || mfaInfo.factors.isAlreadySetup.includes(id)
                );
            if (availableFactors.length === 1) {
                return MultiFactorAuth.getInstanceOrThrow().redirectToFactor(
                    availableFactors[0].id,
                    false,
                    props.history
                );
            } else {
                setMFAInfo(mfaInfo.factors);
            }
        },
        [setMFAInfo]
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
        (factorId) => props.recipe.redirectToFactor(factorId, false, props.history),
        [props.recipe]
    );
    const signOut = useCallback(async (): Promise<void> => {
        const session = Session.getInstanceOrThrow();
        await session.signOut(props.userContext);
        return redirectToAuthWithHistory();
    }, [props.recipe, redirectToAuthWithHistory]);

    if (mfaInfo === undefined) {
        return <Fragment />;
    }

    const childProps = {
        config: props.recipe.config,
    };
    const availableFactors = props.recipe
        .getSecondaryFactors()
        .filter(({ id }) => mfaInfo.isAllowedToSetup.includes(id) || mfaInfo.isAlreadySetup.includes(id));
    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsMultiFactorAuth}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && (
                        <FactorChooserTheme
                            {...childProps}
                            mfaInfo={mfaInfo}
                            availableFactors={availableFactors}
                            logout={signOut}
                            navigateToFactor={navigateToFactor}
                        />
                    )}
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
