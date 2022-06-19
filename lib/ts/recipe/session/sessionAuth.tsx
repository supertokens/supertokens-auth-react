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

type PropsWithoutAuth = {
    requireAuth?: false;
};

type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};

export type SessionAuthProps = (PropsWithoutAuth | PropsWithAuth) & {
    onSessionExpired?: () => void;
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

    const buildContext = useCallback(async (): Promise<SessionContextType> => {
        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }

        // if it's not the default context, it means SessionAuth from top has
        // given us a sessionContext.
        if (!isDefaultContext(parentSessionContext)) {
            return parentSessionContext;
        }

        if (context) {
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
            loading: false,
        };
    }, []);

    const setInitialContextAndMaybeRedirect = useCallback(
        async (toSetContext: SessionContextType) => {
            // if this component is unmounting, or the context has already
            // been set, then we don't need to proceed...
            if (toSetContext.loading === false && !toSetContext.doesSessionExist && props.requireAuth === true) {
                props.redirectToLogin();
            } else {
                setContext((context) => (context !== undefined ? context : toSetContext));
            }
        },
        [props]
    );

    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);

    // subscribe to events on mount
    useEffect(() => {
        function onHandleEvent(event: RecipeEventWithSessionContext) {
            switch (event.action) {
                case "SESSION_CREATED":
                    setContext(event.sessionContext);
                    return;
                case "REFRESH_SESSION":
                    setContext(event.sessionContext);
                    return;
                case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                    setContext(event.sessionContext);
                    return;
                case "SIGN_OUT":
                    if (props.requireAuth !== true) {
                        setContext(event.sessionContext);
                    }
                    return;
                case "UNAUTHORISED":
                    if (props.requireAuth === true) {
                        if (props.onSessionExpired !== undefined) {
                            props.onSessionExpired();
                        } else {
                            props.redirectToLogin();
                        }
                    } else {
                        setContext(event.sessionContext);
                        if (props.onSessionExpired !== undefined) {
                            props.onSessionExpired();
                        }
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
        return session.current!.addEventListener(onHandleEvent);
    }, [props]);

    // this will display null only if initially the below condition is true.
    // cause if the session goes from existing to non existing, then
    // the context is not updated if props.requireAuth === true
    if (props.requireAuth === true && (context.loading || !context.doesSessionExist)) {
        return null;
    }

    return <SessionContext.Provider value={{ ...context, isDefault: false }}>{children}</SessionContext.Provider>;
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
