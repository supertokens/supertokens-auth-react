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
import React, { useEffect, useState, useRef, useCallback } from "react";

import SuperTokens from "../../superTokens";
import { useUserContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { popInvalidClaimRedirectPathFromContext, useOnMountAPICall } from "../../utils";

import Session from "./recipe";
import SessionContext from "./sessionContext";

import type { LoadedSessionContext, RecipeEventWithSessionContext, SessionContextType } from "./types";
import type { PropsWithChildren } from "react";
import type { SessionClaimValidator } from "supertokens-web-js/recipe/session";

export type SessionAuthProps = {
    /**
     * For a detailed explanation please see https://github.com/supertokens/supertokens-auth-react/issues/570
     */
    requireAuth?: boolean;
    /**
     * For a detailed explanation please see https://github.com/supertokens/supertokens-auth-react/issues/570
     */
    doRedirection?: boolean;

    onSessionExpired?: () => void;
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: any
    ) => SessionClaimValidator[];
};

const SessionAuth: React.FC<PropsWithChildren<SessionAuthProps>> = ({ children, ...props }) => {
    const requireAuth = useRef(props.requireAuth);

    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }

    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    const [context, setContext] = useState<SessionContextType>({ loading: true });

    const session = useRef<Session>();

    // We store this here, to prevent the list of called hooks changing even if a history hook is added later to SuperTokens.
    const historyHookRef = useRef(SuperTokens.getReactRouterDomWithCustomHistory()?.useHistoryCustom);

    let history: any | undefined;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch {
        // We catch and ignore errors here, because if this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }

    const userContext = useUserContext();

    const redirectToLogin = useCallback(() => {
        void SuperTokens.getInstanceOrThrow().redirectToAuth({ history, redirectBack: true });
    }, []);

    const buildContext = useCallback(async (): Promise<
        LoadedSessionContext & { invalidClaimRedirectToPath?: string }
    > => {
        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }

        const sessionExists = await session.current.doesSessionExist({
            userContext,
        });

        if (sessionExists === false) {
            return {
                loading: false,
                doesSessionExist: false,
                accessTokenPayload: {},
                invalidClaims: [],
                userId: "",
            };
        }

        let invalidClaims;
        try {
            invalidClaims = await session.current.validateClaims({
                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                userContext,
            });
        } catch (err) {
            // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
            // Which means that the session was most likely cleared, meaning returning false is right.
            // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
            // In which case the session will not be cleared so we rethrow the error
            if (
                await session.current.doesSessionExist({
                    userContext,
                })
            ) {
                throw err;
            }
            return {
                loading: false,
                doesSessionExist: false,
                accessTokenPayload: {},
                invalidClaims: [],
                userId: "",
            };
        }
        // TODO: basing redirection on userContext could break in certain edge-cases involving async validators
        const invalidClaimRedirectToPath = popInvalidClaimRedirectPathFromContext(userContext);

        try {
            return {
                loading: false,
                doesSessionExist: true,
                invalidClaims,
                invalidClaimRedirectToPath,
                accessTokenPayload: await session.current.getAccessTokenPayloadSecurely({
                    userContext,
                }),
                userId: await session.current.getUserId({
                    userContext,
                }),
            };
        } catch (err) {
            if (
                await session.current.doesSessionExist({
                    userContext,
                })
            ) {
                throw err;
            }
            // This means that loading the access token or the userId failed
            // This may happen if the server cleared the error since the validation was done which should be extremely rare
            return {
                loading: false,
                doesSessionExist: false,
                accessTokenPayload: {},
                invalidClaims: [],
                userId: "",
            };
        }
    }, []);

    const setInitialContextAndMaybeRedirect = useCallback(
        async (toSetContext: LoadedSessionContext & { invalidClaimRedirectToPath?: string }) => {
            if (context.loading === false) {
                return;
            }

            if (props.doRedirection !== false) {
                if (!toSetContext.doesSessionExist && props.requireAuth !== false) {
                    redirectToLogin();
                    return;
                } else if (toSetContext.invalidClaimRedirectToPath !== undefined) {
                    await SuperTokens.getInstanceOrThrow().redirectToUrl(
                        toSetContext.invalidClaimRedirectToPath,
                        history
                    );
                    return;
                }
            }

            delete toSetContext.invalidClaimRedirectToPath;

            setContext(toSetContext);
        },
        [props.doRedirection, props.requireAuth, redirectToLogin, context]
    );

    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);

    // subscribe to events on mount
    useEffect(() => {
        async function onHandleEvent(event: RecipeEventWithSessionContext) {
            switch (event.action) {
                // We intentionally fall through as they are all handled the same way.
                case "SESSION_CREATED":
                case "REFRESH_SESSION":
                case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                case "API_INVALID_CLAIM": {
                    // In general the user should not be calling APIs that fail w/ invalid claim
                    // This may suggest that a claim was invalidated in the meantime
                    // so we re-validate even if the session context wasn't updated.
                    const invalidClaims = await session.current!.validateClaims({
                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                        userContext,
                    });
                    setContext({ ...event.sessionContext, loading: false, invalidClaims });

                    const redirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                    if (props.doRedirection !== false && redirectPath) {
                        await SuperTokens.getInstanceOrThrow().redirectToUrl(redirectPath, history);
                    }

                    return;
                }
                case "SIGN_OUT":
                    setContext({ ...event.sessionContext, loading: false, invalidClaims: [] });
                    return;
                case "UNAUTHORISED":
                    setContext({ ...event.sessionContext, loading: false, invalidClaims: [] });
                    if (props.onSessionExpired !== undefined) {
                        props.onSessionExpired();
                    } else if (props.requireAuth !== false && props.doRedirection !== false) {
                        redirectToLogin();
                    }
                    return;
            }
        }

        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }

        if (context.loading === false) {
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        }
        return undefined;
    }, [props, setContext, context.loading]);

    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }

    return <SessionContext.Provider value={context}>{children}</SessionContext.Provider>;
};

const SessionAuthWrapper: React.FC<
    PropsWithChildren<
        SessionAuthProps & {
            userContext?: any;
        }
    >
> = (props) => {
    return (
        <UserContextWrapper userContext={props.userContext}>
            <SessionAuth {...props} />
        </UserContextWrapper>
    );
};

export default SessionAuthWrapper;
