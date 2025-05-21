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
import { Fragment } from "react";
import { useMemo } from "react";

import AuthComponentWrapper from "../../../../../components/authCompWrapper";
import SuperTokens from "../../../../../superTokens";
import { FactorIds } from "../../../../multifactorauth/types";
import { useDynamicLoginMethods } from "../../../../multitenancy/dynamicLoginMethodsContext";
import { mergeProviders } from "../../../utils";
import SignInAndUpTheme from "../../themes/signInAndUp";

import type { Navigate, PartialAuthComponentProps, UserContext, WebJSRecipeInterface } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, SignInAndUpThemeProps } from "../../../types";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";

export function useChildProps(
    recipe: Recipe,
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    setFactorList: (factorIds: string[]) => void,
    navigate: Navigate | undefined,
    userContext: UserContext,
    resetFactorList: () => void,
    onSignInUpSwitcherClick: () => void,
    showBackButton: boolean
): SignInAndUpThemeProps {
    const recipeImplementation = useMemo(() => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe), [recipe]);
    const dynamicLoginMethods = useDynamicLoginMethods();

    return useMemo(() => {
        let tenantProviders;
        if (SuperTokens.usesDynamicLoginMethods) {
            if (dynamicLoginMethods.loaded === false) {
                throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
            } else {
                tenantProviders = dynamicLoginMethods.loginMethods.firstFactors.includes(FactorIds.THIRDPARTY)
                    ? dynamicLoginMethods.loginMethods.thirdparty.providers
                    : [];
            }
        }

        return {
            onAuthSuccess,
            error,
            onError,
            clearError,
            rebuildAuthPage,
            setFactorList,
            providers: mergeProviders({
                tenantProviders,
                clientProviders: recipe.config.signInAndUpFeature.providers,
            }),
            recipeImplementation,
            config: recipe.config,
            recipe,
            navigate,
            userContext,
            resetFactorList,
            onSignInUpSwitcherClick,
            showBackButton,
        };
    }, [recipe, recipeImplementation, error, userContext]);
}

type PropType = PartialAuthComponentProps & {
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
};

export const SignInAndUpFeature: React.FC<PropType> = (props) => {
    const childProps = useChildProps(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.setFactorList,
        props.navigate,
        props.userContext,
        props.resetFactorList,
        props.onSignInUpSwitcherClick,
        props.showBackButton
    );

    const themeProps = { ...childProps, providers: childProps.providers };

    return (
        <Fragment>
            {/* No custom theme, use default. */}
            {props.children === undefined && <SignInAndUpTheme {...themeProps} />}

            {/* Otherwise, custom theme is provided, propagate props. */}
            {props.children &&
                React.Children.map(props.children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            ...childProps,
                        });
                    }

                    return child;
                })}
        </Fragment>
    );
};

const SignInAndUpFeatureWrapper: React.FC<PropType> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    return (
        <AuthComponentWrapper recipeComponentOverrides={recipeComponentOverrides}>
            <SignInAndUpFeature {...props} />
        </AuthComponentWrapper>
    );
};

export default SignInAndUpFeatureWrapper;

const getModifiedRecipeImplementation = (
    origImpl: WebJSRecipeInterface<typeof ThirdPartyWebJS>
): WebJSRecipeInterface<typeof ThirdPartyWebJS> => {
    return {
        ...origImpl,
    };
};
