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
import React, { useEffect, useState, Fragment, useRef, useCallback, useMemo } from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { WithOrWithoutShadowDom } from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { TranslationContextProvider } from "../../../../../translation/translationContext";
import { defaultTranslationsCommon } from "../../../../../translation/translations";
import { UserContextProvider, useUserContext } from "../../../../../usercontext";
import { getRedirectToPathFromURL, mergeObjects, updateQueryParam, useRethrowInRender } from "../../../../../utils";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import DynamicLoginMethodsSpinner from "../../../../multitenancy/components/features/dynamicLoginMethodsSpinner";
import { DynamicLoginMethodsProvider } from "../../../../multitenancy/dynamicLoginMethodsContext";
import Multitenancy from "../../../../multitenancy/recipe";
import Session from "../../../../session/recipe";
import SessionAuthWrapper from "../../../../session/sessionAuth";
import useSessionContext from "../../../../session/useSessionContext";
import { useAuthRecipeComponentOverrideContext } from "../../../componentOverrideContext";
import { selectComponentsToCoverAllFirstFactors } from "../../../utils";
import AuthPageThemeWrapper from "../../theme/authPage";

import type AuthRecipe from "../../..";
import type { TranslationStore } from "../../../../../translation/translationHelpers";
import type { Navigate, PartialAuthComponent, UserContext } from "../../../../../types";
import type { GetLoginMethodsResponseNormalized } from "../../../../multitenancy/types";
import type { RecipeRouter } from "../../../../recipeRouter";
import type { AuthPageThemeProps } from "../../../types";
import type { PropsWithChildren } from "react";

const errorQSMap: Record<string, string | undefined> = {
    signin: "SOMETHING_WENT_WRONG_ERROR",
    no_email_present: "THIRD_PARTY_ERROR_NO_EMAIL",
    restart_link: "ERROR_SIGN_IN_UP_LINK",
};

export type AuthPageProps = PropsWithChildren<{
    redirectOnSessionExists?: boolean;
    onSessionAlreadyExists?: () => void;
    preBuiltUIList: RecipeRouter[];
    factors?: string[];
    isSignUp?: boolean;
    navigate?: Navigate;
    userContext?: UserContext;
}>;
type AuthComponentListInfo = Pick<
    AuthPageThemeProps,
    "authComponents" | "fullPageCompWithPreloadedInfo" | "isSignUp" | "hasSeparateSignUpView" | "factorIds"
>;

const AuthPageWrapper: React.FC<AuthPageProps> = (props) => {
    const authRecipeComponentOverrides = useAuthRecipeComponentOverrideContext();

    return (
        <UserContextProvider userContext={props.userContext}>
            <SessionAuthWrapper requireAuth={false} doRedirection={false}>
                <ComponentOverrideContext.Provider value={authRecipeComponentOverrides}>
                    <AuthPageInner {...props} />
                </ComponentOverrideContext.Provider>
            </SessionAuthWrapper>
        </UserContextProvider>
    );
};

const AuthPageInner: React.FC<AuthPageProps> = (props) => {
    const windowHandler = WindowHandlerReference.getReferenceOrThrow().windowHandler;

    const search = new URLSearchParams(windowHandler.location.getSearch());

    const factorsStringFromQS = search.get("factors");
    const factorListFromQS = factorsStringFromQS ? factorsStringFromQS.split(",") : undefined;
    const signUpStringFromQS = search.get("signUp");
    const isSignUpFromQS =
        signUpStringFromQS === null ? undefined : signUpStringFromQS === "" || signUpStringFromQS === "true";

    let errorFromQS =
        search.get("error") !== null ? search.get("message") ?? search.get("error") ?? undefined : undefined;
    errorFromQS = errorFromQS !== undefined ? errorQSMap[errorFromQS] ?? errorFromQS : undefined;

    const sessionContext = useSessionContext();
    const userContext = useUserContext();

    const rethrowInRender = useRethrowInRender();
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = useState<
        GetLoginMethodsResponseNormalized | undefined
    >(undefined);
    const [error, setError] = useState<string | undefined>(errorFromQS);
    const [sessionLoadedAndDidNotExist, setSessionLoadedAndDidNotExist] = useState(false);
    const st = SuperTokens.getInstanceOrThrow();
    const [factorList, setFactorList] = useState<string[] | undefined>(props.factors);
    const [isSignUp, setIsSignUp] = useState<boolean>(props.isSignUp ?? isSignUpFromQS ?? st.defaultToSignUp);

    // We use this to signal that we need to update the components we show on screen
    const [rebuildReqCount, setRebuildReqCount] = useState(0);
    const lastBuild = useRef<{ buildReq: number | undefined }>({ buildReq: undefined });

    const onSignInUpSwitcherClick = useCallback(() => {
        updateQueryParam("signUp", isSignUp ? "false" : "true");
        setError(undefined);
        setIsSignUp(!isSignUp);
        setRebuildReqCount((v) => v + 1);
    }, [isSignUp, setIsSignUp, setRebuildReqCount, setError]);

    useEffect(() => {
        if (loadedDynamicLoginMethods) {
            return;
        }
        Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext })
            .then(
                (loginMethods) => setLoadedDynamicLoginMethods(loginMethods),
                (err) => rethrowInRender(err)
            );
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);

    useEffect(() => {
        if (sessionLoadedAndDidNotExist) {
            return;
        }

        // we want to do this just once, so we supply it with only the loading state.
        // if we supply it with props, sessionContext, then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.loading === false) {
            if (sessionContext.doesSessionExist) {
                if (props.onSessionAlreadyExists !== undefined) {
                    props.onSessionAlreadyExists();
                } else if (props.redirectOnSessionExists !== false) {
                    Session.getInstanceOrThrow().config.onHandleEvent({
                        action: "SESSION_ALREADY_EXISTS",
                    });
                    void Session.getInstanceOrThrow()
                        .validateGlobalClaimsAndHandleSuccessRedirection(
                            undefined,
                            Session.RECIPE_ID, // TODO
                            getRedirectToPathFromURL(),
                            userContext,
                            props.navigate
                        )
                        .catch(rethrowInRender);
                }
            } else {
                setSessionLoadedAndDidNotExist(true);
            }
        }
    }, [sessionContext.loading]);

    const [authComponentListInfo, setAuthComponentListInfo] = useState<AuthComponentListInfo | undefined>();

    const showUseAnotherLink =
        factorList !== undefined &&
        (props.factors === undefined || props.factors.some((id) => !factorList.includes(id)));

    const stInstance = SuperTokens.getInstanceOrThrow();

    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    useEffect(() => {
        const abortCtl = new AbortController();

        if (lastBuild.current.buildReq === rebuildReqCount) {
            return;
        }

        if (
            sessionLoadedAndDidNotExist &&
            (loadedDynamicLoginMethods !== undefined || !SuperTokens.usesDynamicLoginMethods)
        ) {
            void buildAndSetChildProps(
                props.preBuiltUIList,
                loadedDynamicLoginMethods,
                userContext,
                factorList,
                factorListFromQS,
                isSignUp,
                setAuthComponentListInfo,
                abortCtl.signal
            ).then(() => {
                lastBuild.current.buildReq = rebuildReqCount;
            }, rethrowInRender);
        }
        return () => {
            abortCtl.abort();
        };
    }, [
        sessionLoadedAndDidNotExist,
        rebuildReqCount,
        setRebuildReqCount,
        props.preBuiltUIList,
        loadedDynamicLoginMethods,
        userContext,
        factorList,
        factorListFromQS,
        isSignUp,
        setAuthComponentListInfo,
        rethrowInRender,
    ]);

    const childProps: AuthPageThemeProps | undefined =
        authComponentListInfo !== undefined
            ? {
                  ...authComponentListInfo,
                  error,
                  onError: (err) => {
                      setError(err);
                  },
                  clearError: () => setError(undefined),
                  navigate: props.navigate,
                  onSignInUpSwitcherClick,
                  privacyPolicyLink,
                  rebuildAuthPage: () => setRebuildReqCount((v) => v + 1),
                  setFactorList: (factorIds: string[]) => {
                      setFactorList(factorIds);
                      setRebuildReqCount((v) => v + 1);
                  },
                  resetFactorList: () => {
                      setFactorList(props.factors);
                      setRebuildReqCount((v) => v + 1);
                  },
                  showBackButton: showUseAnotherLink,
                  termsOfServiceLink,
                  userContext,
              }
            : undefined;

    const mergedTranslations = useMemo(() => {
        let res: TranslationStore = defaultTranslationsCommon;
        if (authComponentListInfo !== undefined) {
            for (const ui of props.preBuiltUIList) {
                res = mergeObjects(res, ui.languageTranslations);
            }
        }
        res = mergeObjects(res, st.languageTranslations.userTranslationStore);
        return res;
    }, [st.languageTranslations.userTranslationStore, authComponentListInfo]);

    if (childProps === undefined) {
        return <DynamicLoginMethodsSpinner />;
    } else {
        return (
            <DynamicLoginMethodsProvider value={loadedDynamicLoginMethods}>
                <TranslationContextProvider
                    defaultLanguage={st.languageTranslations.defaultLanguage}
                    defaultStore={mergedTranslations}
                    translationControlEventSource={st.languageTranslations.translationEventSource}
                    userTranslationFunc={st.languageTranslations.userTranslationFunc}>
                    <WithOrWithoutShadowDom useShadowDom={st.useShadowDom}>
                        <Fragment>
                            {/* No custom theme, use default. */}
                            {props.children === undefined && <AuthPageThemeWrapper {...childProps} />}
                            {/* Otherwise, custom theme is provided, propagate props. */}
                            {props.children &&
                                React.Children.map(props.children, (child) => {
                                    if (React.isValidElement(child)) {
                                        return React.cloneElement(child, childProps);
                                    }

                                    return child;
                                })}
                        </Fragment>
                    </WithOrWithoutShadowDom>
                </TranslationContextProvider>
            </DynamicLoginMethodsProvider>
        );
    }
};

export default AuthPageWrapper;

async function buildAndSetChildProps(
    recipeRouters: RecipeRouter[],
    loadedDynamicLoginMethods: GetLoginMethodsResponseNormalized | undefined,
    userContext: UserContext,
    factorListState: string[] | undefined,
    factorListFromQS: string[] | undefined,
    isSignUpState: boolean,
    setComponentListInfo: (info: AuthComponentListInfo) => void,
    abort: AbortSignal
) {
    const authRecipesInList = recipeRouters
        .map((r) => r.recipeInstance)
        .filter((router) => "firstFactorIds" in (router as AuthRecipe<any, any, any, any>)) as AuthRecipe<
        any,
        any,
        any,
        any
    >[];

    // The first factors list we show is a fallback:
    const firstFactors =
        factorListState ?? // First we use the in-memory list
        factorListFromQS ?? // or the one from the querystring
        loadedDynamicLoginMethods?.firstFactors ?? // or the tenant config
        MultiFactorAuth.getInstance()?.config.firstFactors ?? // or the static config from the MFA recipe
        authRecipesInList.reduce((acc, recipe) => [...acc, ...recipe.getFirstFactorsForAuthPage()], [] as string[]); // or we show everything we have initialized

    // We want only want to show a separate sign up view if there is a UI that both:
    // 1. requires showing a separate sign up page (i.e.: emailpassword)
    // 2. overlaps with the first factors list
    const hasSeparateSignUpView = recipeRouters.some(
        (ui) =>
            ui.requiresSignUpPage &&
            (ui.recipeInstance as AuthRecipe<any, any, any, any>).firstFactorIds.some((id) => firstFactors.includes(id))
    );

    const isSignUp = hasSeparateSignUpView && isSignUpState;

    const authComps = [];

    for (const ui of recipeRouters) {
        authComps.push(...ui.getAuthComponents());
    }

    for (const a of authComps) {
        if (a.type === "FULL_PAGE") {
            const preloadRes = await a.preloadInfoAndRunChecks(firstFactors, userContext);
            // We skip setting if the auth page unmounted while we were checking
            // if we should show any full page comps
            if (abort.aborted) {
                return;
            }
            if (preloadRes.shouldDisplay) {
                setComponentListInfo({
                    authComponents: [],
                    fullPageCompWithPreloadedInfo: {
                        component: a.component,
                        preloadInfo: preloadRes.preloadInfo,
                    },
                    isSignUp,
                    hasSeparateSignUpView,
                    factorIds: firstFactors,
                });
                return;
            }
        }
    }
    if (abort.aborted) {
        // We stop if the auth page unmounted while we were checking if we should show any full page comps
        return;
    }

    // We check all the full page comps above, so we can focus on building an auth page from partials
    let partialAuthComps = authComps.filter(
        (c) => c.type !== "FULL_PAGE" && c.factorIds.every((id) => firstFactors.includes(id))
    ) as PartialAuthComponent[];

    partialAuthComps = partialAuthComps.filter(
        (c) =>
            c.type === "SIGN_IN_UP" || // sign in+up components show in all cases
            (isSignUp ? c.type === "SIGN_UP" : c.type === "SIGN_IN") // otherwise we check if the sign up state is appropriate
    );

    // We sort the auth components by the number of factors they cover, DESC
    // This helps us choose combination components (ep+pwless) first
    partialAuthComps.sort((a, b) => b.factorIds.length - a.factorIds.length);

    const selectedComponents = selectComponentsToCoverAllFirstFactors(partialAuthComps, firstFactors);

    if (selectedComponents === undefined) {
        throw new Error("Couldn't cover all first factors");
    }

    setComponentListInfo({
        authComponents: selectedComponents.sort((a, b) => a.displayOrder - b.displayOrder).map((w) => w.component),
        factorIds: firstFactors,
        hasSeparateSignUpView,
        isSignUp,
    });
}