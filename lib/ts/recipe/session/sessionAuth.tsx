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
import React, { useEffect, useState, useContext, useRef, PropsWithChildren, useCallback } from "react";
import SessionContext, { isDefaultContext } from "./sessionContext";
import Session from "./recipe";
import { RecipeEventWithSessionContext, SessionContextType } from "./types";
import { useUserContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { useOnMountAPICall } from "../../utils";
import SuperTokens from "../../superTokens";
import { SessionClaimValidator } from "supertokens-website";

export type SessionAuthProps = {
    requireAuth?: boolean;
    redirectToLogin?: () => void;
    onSessionExpired?: () => void;
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: any
    ) => SessionClaimValidator[];
};

const SessionAuth: React.FC<PropsWithChildren<SessionAuthProps>> = ({ children, ...props }) => {
    if (props.requireAuth === true && props.redirectToLogin === undefined) {
        throw new Error("You have to provide redirectToLogin or onSessionExpired function when requireAuth is true");
    }
    const requireAuth = useRef(props.requireAuth);

    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }

    const parentSessionContext = useContext(SessionContext);

    // assign the parent context here itself so that there is no flicker in the UI
    const [context, setContext] = useState<SessionContextType>(
        !isDefaultContext(parentSessionContext) ? parentSessionContext : { loading: true }
    );

    const session = useRef<Session>();
    const userContext = useUserContext();

    const redirectToLogin = useCallback(() => {
        if (props.redirectToLogin !== undefined) {
            props.redirectToLogin();
        } else {
            void session.current!.redirectToAuthWithRedirectToPath(
                SuperTokens.getInstanceOrThrow().getReactRouterDomWithCustomHistory()?.useHistoryCustom()
            );
        }
    }, [props.redirectToLogin]);

    const buildContext = useCallback(async (): Promise<SessionContextType> => {
        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }

        if (context.loading === false) {
            return context;
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
        const invalidClaims = await session.current.validateClaims({
            overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
            userContext,
        });

        return {
            loading: false,
            doesSessionExist: true,
            accessTokenPayload: await session.current.getAccessTokenPayloadSecurely({
                userContext,
            }),
            invalidClaims,
            userId: await session.current.getUserId({
                userContext,
            }),
        };
    }, []);

    const setInitialContextAndMaybeRedirect = useCallback(
        async (toSetContext: SessionContextType) => {
            if (toSetContext.loading === true) {
                // We should not be updating the context to loading
                throw new Error("Should never come here");
            }

            if (!toSetContext.doesSessionExist && props.requireAuth === true) {
                redirectToLogin();
            } else {
                setContext((os) => (os.loading === false ? os : toSetContext));
            }
        },
        [props.requireAuth, redirectToLogin]
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
                    return;
                }
                case "SIGN_OUT":
                    setContext({ ...event.sessionContext, loading: false, invalidClaims: [] });
                    return;
                case "UNAUTHORISED":
                    setContext({ ...event.sessionContext, loading: false, invalidClaims: [] });
                    if (props.onSessionExpired !== undefined) {
                        props.onSessionExpired();
                    } else if (props.requireAuth === true) {
                        redirectToLogin();
                    }
                    return;
            }
        }

        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }

        // we return here cause addEventListener returns a function that removes
        // the listener, and this function will be called by useEffect when
        // onHandleEvent changes or if the component is unmounting.
        return session.current.addEventListener(onHandleEvent);
    }, [props, setContext]);

    if (props.requireAuth === true && (context.loading || !context.doesSessionExist)) {
        return null;
    }

    return (
        <SessionContext.Provider value={{ ...context, isDefault: false } as any}>{children}</SessionContext.Provider>
    );
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
