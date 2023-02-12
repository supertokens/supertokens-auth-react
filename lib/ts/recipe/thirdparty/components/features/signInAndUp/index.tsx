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
import { getQueryParams } from "../../../../../utils";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { defaultTranslationsThirdParty } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    ComponentOverrideMap,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
} from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";

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
    const recipeImplementation = useMemo(() => recipe && getModifiedRecipeImplementation(recipe.recipeImpl), [recipe]);

    return useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        const providers = recipe.config.signInAndUpFeature.providers.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
        }));

        return {
            providers: providers,
            recipeImplementation,
            config: recipe.config,
            recipe,
        };
    }, [recipe]);
}

type PropType = FeatureBaseProps & { recipe: Recipe; useComponentOverrides: () => ComponentOverrideMap };

export const SignInAndUpFeature: React.FC<PropType> = (props) => {
    const [state, dispatch] = useFeatureReducer();
    const childProps = useChildProps(props.recipe);

    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsThirdParty}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && (
                        <SignInAndUpTheme {...childProps} featureState={state} dispatch={dispatch} />
                    )}

                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, { ...childProps, featureState: state, dispatch });
                            }

                            return child;
                        })}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default SignInAndUpFeature;

const getModifiedRecipeImplementation = (origImpl: RecipeInterface): RecipeInterface => {
    return {
        ...origImpl,
    };
};
