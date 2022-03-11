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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { Fragment } from "react";
import SignInUpThemeWrapper from "../../themes/signInUp";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { clearErrorQueryParam, getQueryParams, getRedirectToPathFromURL } from "../../../../../utils";
import Recipe from "../../../recipe";
import { PasswordlessSignInUpAction, SignInUpState, SignInUpProps } from "../../../types";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { formatPhoneNumberIntl } from "react-phone-number-input/min";
import Session from "../../../../session";
import { defaultTranslationsPasswordless } from "../../themes/translations";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { RecipeInterface, PasswordlessUser } from "supertokens-web-js/recipe/passwordless";
import { useUserContext } from "../../../../../usercontext";
import STGeneralError from "supertokens-web-js/lib/build/error";

export const useSuccessInAnotherTabChecker = (
    state: SignInUpState,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>
) => {
    const callingConsumeCodeRef = useRef(false);

    useEffect(() => {
        // We only need to start checking this if we have an active login attempt
        if (state.loginAttemptInfo && !state.successInAnotherTab) {
            const checkSessionIntervalHandle = setInterval(async () => {
                if (callingConsumeCodeRef.current === false) {
                    const hasSession = await Session.doesSessionExist();
                    if (hasSession) {
                        dispatch({ type: "successInAnotherTab" });
                    }
                }
            }, 2000);

            return () => {
                clearInterval(checkSessionIntervalHandle);
            };
        }
        // Nothing to clean up
        return;
    }, [state.loginAttemptInfo, state.successInAnotherTab]);

    return callingConsumeCodeRef;
};

export const useFeatureReducer = (
    recipeImpl: RecipeInterface | undefined,
    userContext: any
): [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>] => {
    const [state, dispatch] = React.useReducer(
        (oldState: SignInUpState, action: PasswordlessSignInUpAction) => {
            switch (action.type) {
                case "load":
                    return {
                        loaded: true,
                        error: action.error,
                        loginAttemptInfo: action.loginAttemptInfo,
                        successInAnotherTab: false,
                    };
                case "resendCode":
                    if (!oldState.loginAttemptInfo) {
                        return oldState;
                    }
                    return {
                        ...oldState,
                        loginAttemptInfo: {
                            ...oldState.loginAttemptInfo,
                            lastResend: action.timestamp,
                        },
                    };
                case "restartFlow":
                    return {
                        ...oldState,
                        error: action.error,
                        loginAttemptInfo: undefined,
                    };
                case "setError":
                    return {
                        ...oldState,
                        error: action.error,
                    };
                case "startLogin":
                    return {
                        ...oldState,
                        loginAttemptInfo: action.loginAttemptInfo,
                        error: undefined,
                    };
                case "successInAnotherTab":
                    return {
                        ...oldState,
                        successInAnotherTab: true,
                    };
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            loaded: false,
            loginAttemptInfo: undefined,
            successInAnotherTab: false,
        },
        (initArg) => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            const messageQueryParam = getQueryParams("message");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "restart_link") {
                    error = "ERROR_SIGN_IN_UP_LINK";
                } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                    error = messageQueryParam;
                }
            }
            return {
                ...initArg,
                error,
            };
        }
    );
    useEffect(() => {
        if (recipeImpl === undefined) {
            return;
        }
        async function load() {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            const messageQueryParam = getQueryParams("message");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "restart_link") {
                    error = "ERROR_SIGN_IN_UP_LINK";
                } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                    error = messageQueryParam;
                }
            }
            const loginAttemptInfo = await recipeImpl!.getLoginAttemptInfo({
                userContext,
            });
            // No need to check if the component is unmounting, since this has no effect then.
            dispatch({ type: "load", loginAttemptInfo, error });
        }
        if (state.loaded === false) {
            void load();
        }
    }, [state.loaded, recipeImpl]);
    return [state, dispatch];
};

export type ChildProps = Omit<SignInUpProps, "featureState" | "dispatch">;

// We are overloading to explicitly state that if recipe is defined then the return value is defined as well.
export function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    history: any
): ChildProps;
export function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    history: any
): ChildProps | undefined;

export function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    history: any
): ChildProps | undefined {
    const recipeImplementation = React.useMemo(
        () => recipe && getModifiedRecipeImplementation(recipe, dispatch, callingConsumeCodeRef),
        [recipe]
    );

    return useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        return {
            onSuccess: (result: { createdUser: boolean; user: PasswordlessUser }) => {
                const pathFromUrl = getRedirectToPathFromURL();

                return recipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: result.createdUser,
                        redirectToPath:
                            pathFromUrl !== undefined ? pathFromUrl : state.loginAttemptInfo?.redirectToPath,
                    },
                    history
                );
            },
            recipeImplementation: recipeImplementation,
            config: recipe.config,
        };
    }, [state, recipeImplementation]);
}

export const SignInUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> = (props) => {
    const componentOverrides = props.recipe.config.override.components;
    const userContext = useUserContext();
    const [state, dispatch] = useFeatureReducer(props.recipe.recipeImpl, userContext);
    const callingConsumeCodeRef = useSuccessInAnotherTabChecker(state, dispatch);
    const childProps = useChildProps(props.recipe, dispatch, state, callingConsumeCodeRef, props.history)!;

    return (
        <ComponentOverrideContext.Provider value={componentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsPasswordless}
                userContext={props.userContext}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && (
                        <SignInUpThemeWrapper {...childProps} featureState={state} dispatch={dispatch} />
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

export default SignInUpFeature;

function getModifiedRecipeImplementation(
    recipe: Recipe,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    callingConsumeCodeRef: React.MutableRefObject<boolean>
): RecipeInterface {
    return {
        ...recipe.recipeImpl,
        createCode: async (input) => {
            try {
                let contactInfo;
                if ("email" in input) {
                    contactInfo = input.email;
                } else {
                    contactInfo = formatPhoneNumberIntl(input.phoneNumber);
                }

                if ("email" in input) {
                    const validationRes = await recipe.config.validateEmailAddress(input.email);
                    if (validationRes !== undefined) {
                        throw new STGeneralError(validationRes);
                    }
                }
                if ("phoneNumber" in input) {
                    const validationRes = await recipe.config.validatePhoneNumber(input.phoneNumber);
                    if (validationRes !== undefined) {
                        throw new STGeneralError(validationRes);
                    }
                }

                const res = await recipe.recipeImpl.createCode(input);
                if (res.status === "OK") {
                    // This contactMethod refers to the one that was used to deliver the login info
                    // This can be an important distinction in case both email and phone are allowed
                    const contactMethod: "EMAIL" | "PHONE" = "email" in input ? "EMAIL" : "PHONE";
                    const loginAttemptInfo = {
                        ...res,
                        lastResend: new Date().getTime(),
                        contactMethod,
                        contactInfo,
                        redirectToPath: getRedirectToPathFromURL(),
                    };
                    await recipe.recipeImpl.setLoginAttemptInfo({
                        attemptInfo: loginAttemptInfo,
                        userContext: input.userContext,
                    });
                    dispatch({ type: "startLogin", loginAttemptInfo });
                }
                return res;
            } catch (e) {
                if (STGeneralError.isThisError(e)) {
                    // TODO NEMI: IDeally this should throw instead od dispatching
                    dispatch({ type: "setError", error: e.message });
                }

                throw e;
            }
        },
        resendCode: async (input) => {
            try {
                const res = await recipe.recipeImpl.resendCode(input);
                if (res.status === "OK") {
                    const loginAttemptInfo = await recipe.recipeImpl.getLoginAttemptInfo({
                        userContext: input.userContext,
                    });
                    // If it was cleared or overwritten we don't want to save this.
                    // TODO: extend session checker to check for this case as well
                    if (loginAttemptInfo !== undefined && loginAttemptInfo.deviceId === input.deviceId) {
                        const timestamp = new Date().getTime();
                        await recipe.recipeImpl.setLoginAttemptInfo({
                            attemptInfo: {
                                ...loginAttemptInfo,
                                lastResend: timestamp,
                            },
                            userContext: input.userContext,
                        });
                        dispatch({ type: "resendCode", timestamp });
                    }
                } else if (res.status === "RESTART_FLOW_ERROR") {
                    await recipe.recipeImpl.clearLoginAttemptInfo({
                        userContext: input.userContext,
                    });

                    dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
                }
                return res;
            } catch (e) {
                if (STGeneralError.isThisError(e)) {
                    dispatch({ type: "setError", error: e.message });
                }

                throw e;
            }
        },

        consumeCode: async (input) => {
            // We need to call consume code while callingConsume, so we don't detect
            // the session creation too early and go to successInAnotherTab too early
            callingConsumeCodeRef.current = true;

            const res = await recipe.recipeImpl.consumeCode(input);

            if (res.status === "RESTART_FLOW_ERROR") {
                await recipe.recipeImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });

                dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
            } else if (res.status === "OK") {
                await recipe.recipeImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });
            }

            callingConsumeCodeRef.current = false;

            return res;
        },

        clearLoginAttemptInfo: async (input) => {
            await recipe.recipeImpl.clearLoginAttemptInfo({
                userContext: input.userContext,
            });
            clearErrorQueryParam();
            dispatch({ type: "restartFlow", error: undefined });
        },
    };
}
