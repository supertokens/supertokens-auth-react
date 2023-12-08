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

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { getQueryParams } from "../../../../../utils";
import { useDynamicLoginMethods } from "../../../../multitenancy/dynamicLoginMethodsContext";
import { mergeProviders } from "../../../utils";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { defaultTranslationsThirdParty } from "../../themes/translations";

import type { FeatureBaseProps, UserContext, WebJSRecipeInterface } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    ComponentOverrideMap,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
} from "../../../types";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";

export const useFeatureReducer = () => {
    return React.useReducer(
        (oldState: ThirdPartySignInAndUpState, action: ThirdPartySignInUpActions) => {
            switch (action.type) {
                case "setError":
                    return {
                        ...oldState,
                        error: action.error,
                    };
                default:
                    return oldState;
            }
        },
        {},
        () => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "no_email_present") {
                    error = "THIRD_PARTY_ERROR_NO_EMAIL";
                } else {
                    const customError = getQueryParams("message");
                    if (customError === null) {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else {
                        error = customError;
                    }
                }
            }
            return {
                error,
            };
        }
    );
};

// We are overloading to explicitly state that if recipe is defined then the return value is defined as well.
export function useChildProps(recipe: Recipe): ThirdPartySignInUpChildProps;
export function useChildProps(recipe: Recipe | undefined): ThirdPartySignInUpChildProps | undefined;
export function useChildProps(recipe: Recipe | undefined): ThirdPartySignInUpChildProps | undefined {
    const recipeImplementation = useMemo(() => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe), [recipe]);
    const dynamicLoginMethods = useDynamicLoginMethods();

    return useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        let tenantProviders;
        if (SuperTokens.usesDynamicLoginMethods) {
            if (dynamicLoginMethods.loaded === false) {
                throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
            } else {
                tenantProviders = dynamicLoginMethods.loginMethods.thirdparty.enabled
                    ? dynamicLoginMethods.loginMethods.thirdparty.providers
                    : [];
            }
        }

        return {
            providers: mergeProviders({
                tenantProviders,
                clientProviders: recipe.config.signInAndUpFeature.providers,
            }),
            recipeImplementation,
            config: recipe.config,
            recipe,
        };
    }, [recipe, recipeImplementation]);
}

type PropType = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

export const SignInAndUpFeature: React.FC<PropType> = (props) => {
    const [state, dispatch] = useFeatureReducer();
    const childProps = useChildProps(props.recipe);

    const themeProps = { ...childProps, providers: childProps.providers };

    return (
        <Fragment>
            {/* No custom theme, use default. */}
            {props.children === undefined && (
                <SignInAndUpTheme {...themeProps} featureState={state} dispatch={dispatch} />
            )}

            {/* Otherwise, custom theme is provided, propagate props. */}
            {props.children &&
                React.Children.map(props.children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            ...childProps,
                            featureState: state,
                            dispatch,
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
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsThirdParty}>
                <SignInAndUpFeature {...props} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
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
