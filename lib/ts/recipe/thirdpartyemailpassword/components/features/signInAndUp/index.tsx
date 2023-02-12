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

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import {
    useChildProps as useEmailPasswordChildProps,
    useFeatureReducer as useEmailPasswordFeatureReducer,
} from "../../../../emailpassword/components/features/signInAndUp";
import {
    useChildProps as useThirdPartyChildProps,
    useFeatureReducer as useThirdPartyFeatureReducer,
} from "../../../../thirdparty/components/features/signInAndUp";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { defaultTranslationsThirdPartyEmailPassword } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type { EmailPasswordSignInAndUpAction } from "../../../../emailpassword/types";
import type { ThirdPartySignInUpActions } from "../../../../thirdparty/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

type PropType = FeatureBaseProps & {
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};

const SignInAndUp: React.FC<PropType> = (props) => {
    const [tpState, tpDispatch] = useThirdPartyFeatureReducer();
    const [epState, epDispatch] = useEmailPasswordFeatureReducer(props.recipe.emailPasswordRecipe);
    const [combinedState, dispatch] = React.useReducer(
        (state: { error: string | undefined }, action: ThirdPartySignInUpActions | EmailPasswordSignInAndUpAction) => {
            switch (action.type) {
                case "setSignIn":
                    return {
                        ...state,
                        error: undefined,
                    };
                case "setSignUp":
                    return {
                        ...state,
                        error: undefined,
                    };
                case "setError":
                    return {
                        ...state,
                        error: action.error,
                    };
                default:
                    return state;
            }
        },
        { error: tpState.error || epState.error }
    );

    const recipeComponentOverrides = props.useComponentOverrides();

    const combinedTPDispatch = React.useCallback<typeof tpDispatch>(
        (action) => {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    const tpChildProps = useThirdPartyChildProps(props.recipe.thirdPartyRecipe)!;

    const combinedEPDispatch = React.useCallback<typeof epDispatch>(
        (action) => {
            dispatch(action);
            epDispatch(action);
        },
        [epDispatch, dispatch]
    );
    const epChildProps = useEmailPasswordChildProps(
        props.recipe.emailPasswordRecipe,
        epState,
        combinedEPDispatch,
        props.history
    )!;

    const childProps = {
        emailPasswordRecipe: props.recipe.emailPasswordRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps,
        epState,
        epDispatch: combinedEPDispatch,
        epChildProps,
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsThirdPartyEmailPassword}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <SignInAndUpTheme {...childProps} />}
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

export default SignInAndUp;
