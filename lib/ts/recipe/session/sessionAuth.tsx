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
import { SessionClaimValidator, SessionContextTypeWithoutInvalidClaim, ClaimValidationError } from "./types";
import { RecipeEventWithSessionContext, SessionContextType } from "./types";
import { useUserContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { useOnMountAPICall } from "../../utils";
import SuperTokens from "../../superTokens";

export type SessionAuthProps = {
    requireAuth?: boolean;
    redirectToLogin?: () => void;
    onSessionExpired?: () => void;
    overwriteDefaultClaimValidators?: (
        defaultClaimValidators: SessionClaimValidator<any>[]
    ) => SessionClaimValidator<any>[];
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
    const [contextUpdate, setContextUpdate] = useState<SessionContextTypeWithoutInvalidClaim | undefined>(undefined);

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

    useEffect(() => {
        const abortController = new AbortController();
        async function effect() {
            let invalidClaim: ClaimValidationError | undefined = undefined;
            if (contextUpdate === undefined) {
                return;
            }
            if (contextUpdate.doesSessionExist && props.overwriteDefaultClaimValidators !== undefined) {
                const userContext = {};
                // TODO: user proper userContext
                // TODO: only one of these should be running at any time, but refreshing a claim could start this again.
                let accessTokenPayload = contextUpdate.accessTokenPayload;
                const defaultValidators = session.current!.getDefaultClaimValidators();

                const requiredClaims =
                    props.overwriteDefaultClaimValidators !== undefined
                        ? props.overwriteDefaultClaimValidators(defaultValidators)
                        : defaultValidators;

                // We first refresh all claims that needs this, so we avoid ha
                for (const validator of requiredClaims) {
                    if (await validator.shouldRefresh(accessTokenPayload, userContext)) {
                        await validator.refresh(userContext);
                        accessTokenPayload = await session.current!.getAccessTokenPayloadSecurely({ userContext });
                    }
                    const validationRes = await validator.validate(accessTokenPayload, userContext);
                    if (!validationRes.isValid) {
                        invalidClaim = {
                            validatorId: validator.id,
                            reason: validationRes.reason,
                        };
                        break;
                    }
                    if (abortController.signal.aborted) {
                        return;
                    }
                }
            }
            if (!abortController.signal.aborted) {
                setContext((os) => {
                    return os.loading === false &&
                        // We do these checks to prevent unnecessary rerenders
                        os.userId === contextUpdate.userId &&
                        JSON.stringify(os.accessTokenPayload) === JSON.stringify(contextUpdate.accessTokenPayload) &&
                        JSON.stringify(os.invalidClaim) === JSON.stringify(invalidClaim)
                        ? os
                        : { ...contextUpdate, invalidClaim: invalidClaim, loading: false };
                });
            }
        }
        void effect();
        return () => abortController.abort();
    }, [contextUpdate, props.overwriteDefaultClaimValidators]);

    const buildContext = useCallback(async (): Promise<SessionContextType> => {
        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }

        if (!context.loading) {
            return context;
        }

        const sessionExists = await session.current.doesSessionExist({
            userContext,
        });

        if (sessionExists === false) {
            return {
                doesSessionExist: false,
                accessTokenPayload: {},
                userId: "",
                invalidClaim: undefined,
                loading: false,
            };
        }

        return {
            doesSessionExist: true,
            accessTokenPayload: await session.current.getAccessTokenPayloadSecurely({
                userContext,
            }),
            userId: await session.current.getUserId({
                userContext,
            }),
            invalidClaim: undefined,
            loading: false,
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
                setContextUpdate(toSetContext);
            }
        },
        [props.requireAuth, redirectToLogin]
    );

    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);

    // subscribe to events on mount
    useEffect(() => {
        function onHandleEvent(event: RecipeEventWithSessionContext) {
            switch (event.action) {
                case "SESSION_CREATED":
                    setContextUpdate(event.sessionContext);
                    return;
                case "REFRESH_SESSION":
                    setContextUpdate(event.sessionContext);
                    return;
                case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                    setContextUpdate(event.sessionContext);
                    return;
                case "API_INVALID_CLAIM":
                    // In general the user should not be calling APIs that throw this
                    // so this may suggest that a claim was invalidated
                    setContextUpdate(event.sessionContext);
                    return;
                case "SIGN_OUT":
                    setContextUpdate(event.sessionContext);
                    return;
                case "UNAUTHORISED":
                    setContextUpdate(event.sessionContext);
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
    }, [props, setContextUpdate]);

    const actualContext = !isDefaultContext(parentSessionContext) ? parentSessionContext : context;
    if (props.requireAuth === true && (actualContext.loading || !actualContext.doesSessionExist)) {
        return null;
    }

    return <SessionContext.Provider value={{ ...actualContext, isDefault: false }}>{children}</SessionContext.Provider>;
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
