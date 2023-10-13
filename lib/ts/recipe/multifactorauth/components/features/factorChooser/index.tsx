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
import FactorChooserTheme from "../../themes/factorChooser";
import { defaultTranslationsEmailVerification } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { MFAFactorInfo } from "supertokens-web-js/lib/build/recipe/multifactorauth/types";

type Prop = FeatureBaseProps & { recipe: Recipe; userContext?: any; useComponentOverrides: () => ComponentOverrideMap };

export const EmailVerification: React.FC<Prop> = (props) => {
    const sessionContext = useContext(SessionContext);
    const [status, setStatus] = useState("LOADING");
    const userContext = useUserContext();
    const recipeComponentOverrides = props.useComponentOverrides();

    const redirectToAuthWithHistory = useCallback(async () => {
        await redirectToAuth({ redirectBack: false, history: props.history });
    }, [props.history]);

    const fetchIsEmailVerified = useCallback(async () => {
        if (sessionContext.loading === true) {
            // This callback should only be called if the session is already loaded
            throw new Error("Should never come here");
        }
        return await props.recipe.webJSRecipe.getMFAInfo({ userContext });
    }, [props.recipe, sessionContext, redirectToAuthWithHistory, userContext]);

    const checkIsEmailVerified = useCallback(
        async (mfaInfo: { factors: MFAFactorInfo }): Promise<void> => {
            setStatus("READY" + mfaInfo.factors.isAllowedToSetup.length); // TODO
        },
        [setStatus]
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

    useOnMountAPICall(fetchIsEmailVerified, checkIsEmailVerified, handleError, sessionContext.loading === false);

    if (status === "LOADING") {
        return <Fragment />;
    }

    // const factorChooserScreen = props.recipe.config.factorChooserScreen;

    const childProps = {
        config: props.recipe.config,
    };
    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsEmailVerification}>
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

export default EmailVerification;
