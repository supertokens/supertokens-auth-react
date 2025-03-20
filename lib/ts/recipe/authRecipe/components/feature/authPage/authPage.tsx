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
import {
    clearQueryParams,
    getRedirectToPathFromURL,
    getTenantIdFromQueryParams,
    mergeObjects,
    updateQueryParam,
    useOnMountAPICall,
    useRethrowInRender,
} from "../../../../../utils";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import { FactorIds } from "../../../../multifactorauth/types";
import DynamicLoginMethodsSpinner from "../../../../multitenancy/components/features/dynamicLoginMethodsSpinner";
import { DynamicLoginMethodsProvider } from "../../../../multitenancy/dynamicLoginMethodsContext";
import Multitenancy from "../../../../multitenancy/recipe";
import OAuth2Provider from "../../../../oauth2provider/recipe";
import Session from "../../../../session/recipe";
import SessionAuthWrapper from "../../../../session/sessionAuth";
import useSessionContext from "../../../../session/useSessionContext";
import { useAuthRecipeComponentOverrideContext } from "../../../componentOverrideContext";
import { selectComponentsToCoverAllFirstFactors } from "../../../utils";
import AuthPageThemeWrapper from "../../theme/authPage";

import type AuthRecipe from "../../..";
import type { TranslationStore } from "../../../../../translation/translationHelpers";
import type { AuthComponent, Navigate, PartialAuthComponent, UserContext } from "../../../../../types";
import type { GetLoginMethodsResponseNormalized } from "../../../../multitenancy/types";
import type { RecipeRouter } from "../../../../recipeRouter";
import type { AuthPageThemeProps, AuthSuccessContext } from "../../../types";
import type { PropsWithChildren } from "react";
import type { LoginInfo } from "supertokens-web-js/recipe/oauth2provider/types";

const errorQSMap: Record<string, string | undefined> = {
    signin: "SOMETHING_WENT_WRONG_ERROR",
    no_email_present: "THIRD_PARTY_ERROR_NO_EMAIL",
    restart_link: "ERROR_SIGN_IN_UP_LINK",
};

export type AuthPageProps = PropsWithChildren<{
    redirectOnSessionExists?: boolean;
    onSessionAlreadyExists?: () => void;
    preBuiltUIList: RecipeRouter[];
    factors?: (typeof FactorIds)[keyof Omit<typeof FactorIds, "TOTP">][];
    useSignUpStateFromQueryString?: boolean;
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
    if (props.factors !== undefined && props.factors.length === 0) {
        throw new Error("The factors array cannot be empty");
    }

    const windowHandler = WindowHandlerReference.getReferenceOrThrow().windowHandler;

    const search = new URLSearchParams(windowHandler.location.getSearch());

    const showStringFromQS = search.get("show");
    const isSignUpFromQS =
        props.useSignUpStateFromQueryString !== true || showStringFromQS === null
            ? undefined
            : showStringFromQS === "signup";

    let errorFromQS =
        search.get("error") !== null ? search.get("message") ?? search.get("error") ?? undefined : undefined;
    errorFromQS = errorFromQS !== undefined ? errorQSMap[errorFromQS] ?? errorFromQS : undefined;

    const showStringFromQSRef = useRef(showStringFromQS);
    const errorFromQSRef = useRef(errorFromQS);
    const loginChallenge = search.get("loginChallenge");
    const forceFreshAuth = search.get("forceFreshAuth") === "true";

    const sessionContext = useSessionContext();
    const userContext = useUserContext();

    const rethrowInRender = useRethrowInRender();
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = useState<
        GetLoginMethodsResponseNormalized | undefined
    >(undefined);
    const [oauth2ClientInfo, setOAuth2ClientInfo] = useState<LoginInfo | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(errorFromQS);
    const [sessionLoadedAndNotRedirecting, setSessionLoadedAndNotRedirecting] = useState(false);
    const st = SuperTokens.getInstanceOrThrow();
    const [factorList, setFactorList] = useState<string[] | undefined>(props.factors);
    const [isSignUp, setIsSignUp] = useState<boolean>(props.isSignUp ?? isSignUpFromQS ?? st.defaultToSignUp);

    // We use this to signal that we need to update the components we show on screen
    const [rebuildReqCount, setRebuildReqCount] = useState(0);
    const lastBuild = useRef<{ buildReq: number | undefined }>({ buildReq: undefined });

    useEffect(() => {
        if (props.useSignUpStateFromQueryString && showStringFromQSRef.current !== showStringFromQS) {
            const isSignUpFromQS =
                props.useSignUpStateFromQueryString !== true || showStringFromQS === null
                    ? undefined
                    : showStringFromQS === "signup";
            showStringFromQSRef.current = showStringFromQS;
            const newIsSignUpVal = isSignUpFromQS ?? st.defaultToSignUp;
            if (isSignUp !== newIsSignUpVal) {
                setIsSignUp(newIsSignUpVal);
                setRebuildReqCount((v) => v + 1);
            }
        }
    });

    useEffect(() => {
        if (errorFromQSRef.current !== errorFromQS) {
            errorFromQSRef.current = errorFromQS;
            setError(errorFromQS);
        }
    });

    const onSignInUpSwitcherClick = useCallback(() => {
        if (props.useSignUpStateFromQueryString === true) {
            updateQueryParam("show", isSignUp ? "signin" : "signup");
        }
        setError(undefined);
        setIsSignUp(!isSignUp);
        setRebuildReqCount((v) => v + 1);
    }, [isSignUp, setIsSignUp, setRebuildReqCount, setError, props.useSignUpStateFromQueryString]);

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

    useOnMountAPICall(
        async () => {
            if (oauth2ClientInfo) {
                return;
            }
            const oauth2Recipe = OAuth2Provider.getInstance();
            if (oauth2Recipe !== undefined && loginChallenge !== null) {
                return oauth2Recipe.webJSRecipe.getLoginChallengeInfo({ loginChallenge, userContext });
            }
            return undefined;
        },
        async (info) => {
            if (info !== undefined) {
                if (info.status === "OK") {
                    setOAuth2ClientInfo(info.info);
                } else {
                    setError("SOMETHING_WENT_WRONG_ERROR");
                }
            }
        },
        () => {
            clearQueryParams(["loginChallenge"]);
            setError("SOMETHING_WENT_WRONG_ERROR");
        }
    );

    useEffect(() => {
        if (sessionLoadedAndNotRedirecting) {
            return;
        }

        // we want to do this just once, so we supply it with only the loading state.
        // if we supply it with props, sessionContext, then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.loading === false) {
            if (sessionContext.doesSessionExist) {
                if (props.onSessionAlreadyExists !== undefined) {
                    props.onSessionAlreadyExists();
                } else if (props.redirectOnSessionExists !== false && !forceFreshAuth) {
                    Session.getInstanceOrThrow().config.onHandleEvent({
                        action: "SESSION_ALREADY_EXISTS",
                    });
                    const oauth2Recipe = OAuth2Provider.getInstance();
                    if (loginChallenge !== null && oauth2Recipe !== undefined) {
                        (async function () {
                            const { frontendRedirectTo } =
                                await oauth2Recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                                    loginChallenge,
                                    userContext,
                                });
                            return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                {
                                    // We get here if the user was redirected to the auth screen with an already existing session
                                    // and a loginChallenge (we check the forceFreshAuth queryparam above)
                                    action: "SUCCESS_OAUTH2",
                                    frontendRedirectTo,
                                    // We can use these defaults, since this is not the result of a sign in/up call
                                    createdNewUser: false,
                                    isNewRecipeUser: false,
                                    newSessionCreated: false,
                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                    recipeId: Session.RECIPE_ID,
                                },
                                Session.RECIPE_ID,
                                getRedirectToPathFromURL(),
                                userContext,
                                props.navigate
                            );
                        })().catch(rethrowInRender);
                    } else {
                        void Session.getInstanceOrThrow()
                            .validateGlobalClaimsAndHandleSuccessRedirection(
                                undefined,
                                Session.RECIPE_ID,
                                getRedirectToPathFromURL(),
                                userContext,
                                props.navigate
                            )
                            .catch(rethrowInRender);
                    }
                } else {
                    setSessionLoadedAndNotRedirecting(true);
                }
            } else {
                setSessionLoadedAndNotRedirecting(true);
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
            sessionLoadedAndNotRedirecting &&
            (loadedDynamicLoginMethods !== undefined || !SuperTokens.usesDynamicLoginMethods)
        ) {
            void buildAndSetChildProps(
                props.preBuiltUIList,
                loadedDynamicLoginMethods,
                userContext,
                factorList,
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
        sessionLoadedAndNotRedirecting,
        rebuildReqCount,
        setRebuildReqCount,
        props.preBuiltUIList,
        loadedDynamicLoginMethods,
        userContext,
        factorList,
        isSignUp,
        setAuthComponentListInfo,
        rethrowInRender,
    ]);

    const onAuthSuccess = useCallback(
        async (ctx: AuthSuccessContext) => {
            const oauth2Recipe = OAuth2Provider.getInstance();
            if (loginChallenge === null || oauth2Recipe === undefined) {
                return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                    {
                        ...ctx,
                        action: "SUCCESS",
                        tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                        redirectToPath: getRedirectToPathFromURL(),
                    },
                    ctx.recipeId,
                    getRedirectToPathFromURL(),
                    userContext,
                    props.navigate
                );
            }
            const { frontendRedirectTo } = await oauth2Recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                loginChallenge,
                userContext,
            });
            return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                {
                    ...ctx,
                    action: "SUCCESS_OAUTH2",
                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                    frontendRedirectTo,
                },
                ctx.recipeId,
                getRedirectToPathFromURL(),
                userContext,
                props.navigate
            );
        },
        [loginChallenge]
    );

    const childProps: AuthPageThemeProps | undefined =
        authComponentListInfo !== undefined &&
        (loginChallenge === null || oauth2ClientInfo !== undefined || OAuth2Provider.getInstance() === undefined)
            ? {
                  ...authComponentListInfo,
                  oauth2ClientInfo,
                  onAuthSuccess,
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
    isSignUpState: boolean,
    setComponentListInfo: (info: AuthComponentListInfo) => void,
    abort: AbortSignal
) {
    const authRecipesInited = SuperTokens.getInstanceOrThrow().recipeList.filter(
        (recipe) => "firstFactorIds" in (recipe as AuthRecipe<any, any, any, any>)
    ) as AuthRecipe<any, any, any, any>[];

    // The first factors list we show is a fallback:
    let firstFactors =
        factorListState ?? // First we use the in-memory list (initialized to whatever we get from props)
        loadedDynamicLoginMethods?.firstFactors ?? // or the tenant config
        MultiFactorAuth.getInstance()?.config.firstFactors ?? // or the static config from the MFA recipe
        authRecipesInited.reduce((acc, recipe) => [...acc, ...recipe.getFirstFactorsForAuthPage()], [] as string[]); // or we show everything we have initialized

    if (
        factorListState === undefined &&
        loadedDynamicLoginMethods?.firstFactors === undefined &&
        MultiFactorAuth.getInstance()?.config.firstFactors === undefined
    ) {
        const missingPreBuiltUIs = authRecipesInited.filter(
            (recipe) => !recipeRouters.some((router) => router.recipeInstance.recipeID === recipe.recipeID)
        );
        if (missingPreBuiltUIs.length > 0) {
            // In this case we'd most likely throw anyway (except in the case of EP+Pwless), but we want to provide a better error message
            throw new Error(
                `Factor list not set but PreBuiltUI not added for ${missingPreBuiltUIs.map((r) => r.recipeID)}`
            );
        }
    }

    if (firstFactors.length === 0) {
        throw new Error("There are no enabled factors to show");
    }

    if (firstFactors.includes(FactorIds.THIRDPARTY)) {
        // we get the thirdparty recipe here like this, because importing the recipe here would heavily increase the bundle size of many recipes
        const thirdPartyPreBuiltUI = recipeRouters.find((r) => r.recipeInstance.recipeID === FactorIds.THIRDPARTY);

        // here we ignore if we couldn't find the necessary prebuilt UI, because we want to throw in the standard location
        if (thirdPartyPreBuiltUI !== undefined) {
            // We remove the thirdparty factor if:
            //  We have no provider defined on the client side and
            //  We have no provider defined for the tenant either
            if (
                thirdPartyPreBuiltUI.recipeInstance.config.signInAndUpFeature.providers.length === 0 &&
                (!SuperTokens.usesDynamicLoginMethods || loadedDynamicLoginMethods!.thirdparty.providers.length === 0)
            ) {
                firstFactors = firstFactors.filter((f) => f !== FactorIds.THIRDPARTY);
                if (firstFactors.length === 0) {
                    throw new Error(
                        "The only enabled first factor is thirdparty, but no providers were defined. Please define at least one provider."
                    );
                }
            }
        }
    }

    // We want only want to show a separate sign up view if there is a UI that both:
    // 1. requires showing a separate sign up page (i.e.: emailpassword)
    // 2. overlaps with the first factors list
    const hasSeparateSignUpView = recipeRouters.some(
        (ui) =>
            ui.requiresSignUpPage &&
            (ui.recipeInstance as AuthRecipe<any, any, any, any>).firstFactorIds.some((id) => firstFactors.includes(id))
    );

    const isSignUp = hasSeparateSignUpView && isSignUpState;

    const authComps: AuthComponent[] = [];

    for (const ui of recipeRouters) {
        authComps.push(...ui.getAuthComponents());
    }

    for (const a of authComps) {
        if (a.type === "FULL_PAGE") {
            const preloadRes = await a.preloadInfoAndRunChecks(firstFactors, userContext, isSignUp);
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
        const availableFactors = new Set();
        for (const comp of partialAuthComps) {
            for (const id of comp.factorIds) {
                availableFactors.add(id);
            }
        }
        const source =
            factorListState !== undefined
                ? "local state or props"
                : loadedDynamicLoginMethods?.firstFactors !== undefined
                ? "dynamic tenant configuration"
                : MultiFactorAuth.getInstance()?.config.firstFactors !== undefined
                ? "the config passed to the MFA recipe"
                : "all recipes initialized";

        throw new Error(
            `Couldn't cover all first factors: ${firstFactors.join(
                ", "
            )} (from ${source}), available components: ${Array.from(availableFactors).join(", ")}.\n` +
                "You may have missed adding a recipe into the list of prebuiltUIs passed to list of prebuiltUIs passed to getSuperTokensRoutesForReactRouterDom, canHandleRoute, handleRoute functions or the AuthPage component.\n" +
                "Another common error is adding a non-existent factor id into the list, e.g.: passwordless instead of otp-email/phone"
        );
    }

    setComponentListInfo({
        authComponents: selectedComponents.sort((a, b) => a.displayOrder - b.displayOrder).map((w) => w.component),
        factorIds: firstFactors,
        hasSeparateSignUpView,
        isSignUp,
    });
}
