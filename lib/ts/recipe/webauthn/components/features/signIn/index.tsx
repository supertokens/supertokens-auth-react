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

import AuthComponentWrapper from "../../../../../components/authCompWrapper";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { ContinueWithPasskeyTheme } from "../../themes/continueWithPasskey";
import { defaultTranslationsWebauthn } from "../../themes/translations";

import type { UserContext, PartialAuthComponentProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

export const SignInWithPasskeyFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();

    // TODO: Define the code to handle sign in properly through this component.
    const handleWebauthnSignInClick = () => {
        alert("This is yet to be defined!");
        return;
    };

    return (
        <AuthComponentWrapper recipeComponentOverrides={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsWebauthn}>
                <ContinueWithPasskeyTheme
                    {...props}
                    continueWithPasskeyClicked={handleWebauthnSignInClick}
                    config={props.recipe.config}
                    continueFor="SIGN_IN"
                />
            </FeatureWrapper>
        </AuthComponentWrapper>
    );
};

export default SignInWithPasskeyFeature;
