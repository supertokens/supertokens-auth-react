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
import React, { useEffect, useState, useContext, useRef } from "react";
import SessionContext, { isDefaultContext } from "./sessionContext";
import Session from "./recipe";
import {
    SessionClaimValidator,
    RecipeEventWithSessionContext,
    SessionContextType,
    SessionContextTypeWithoutInvalidClaim,
    ClaimValidationError,
} from "./types";

// if it's not the default context, it means SessionAuth from top has
// given us a sessionContext.
const hasParentProvider = (ctx: SessionContextType) => !isDefaultContext(ctx);

type PropsWithoutAuth = {
    requireAuth?: false;
};

type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};

type Props = (PropsWithoutAuth | PropsWithAuth) & {
    onSessionExpired?: () => void;
    claimValidators?: SessionClaimValidator<any>[];
};

const SessionAuth: React.FC<Props> = ({ children, ...props }) => {
    if (props.requireAuth === true && props.redirectToLogin === undefined) {
        throw new Error("You have to provide redirectToLogin or onSessionExpired function when requireAuth is true");
    }
    const requireAuth = useRef(props.requireAuth);

    if (props.requireAuth !== requireAuth.current) {
        throw new Error("requireAuth prop should not change.");
    }

    const parentSessionContext = useContext(SessionContext);

    // assign the parent context here itself so that there is no flicker in the UI
    const [context, setContext] = useState<SessionContextType | undefined>(undefined);

    const [contextUpdate, setContextUpdate] = useState<SessionContextTypeWithoutInvalidClaim | undefined>(undefined);
    const session = useRef(Session.getInstanceOrThrow());

    useEffect(() => {
        const abortController = new AbortController();
        async function effect() {
            let invalidClaim: ClaimValidationError | undefined = undefined;
            if (contextUpdate === undefined) {
                return;
            }
            if (contextUpdate.doesSessionExist && props.claimValidators !== undefined) {
                const userContext = {};
                // TODO: user proper userContext
                // TODO: only one of these should be running at any time, but refreshing a claim could start this again.
                let accessTokenPayload = contextUpdate.accessTokenPayload;
                // We first refresh all claims that needs this, so we avoid ha
                for (const validator of props.claimValidators) {
                    if (await validator.shouldRefresh(accessTokenPayload, userContext)) {
                        await validator.refresh(userContext);
                        accessTokenPayload = await session.current.getAccessTokenPayloadSecurely();
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
                    return os !== undefined &&
                        // We do these checks to prevent unnecessary rerenders
                        os.userId === contextUpdate.userId &&
                        JSON.stringify(os.accessTokenPayload) === JSON.stringify(contextUpdate.accessTokenPayload) &&
                        JSON.stringify(os.invalidClaim) === JSON.stringify(invalidClaim)
                        ? os
                        : { ...contextUpdate, invalidClaim: invalidClaim };
                });
            }
        }
        void effect();
        return () => abortController.abort();
    }, [contextUpdate, props.claimValidators]);

    // on mount
    useEffect(() => {
        let cancelUseEffect = false;

        const buildContext = async (): Promise<SessionContextType> => {
            if (hasParentProvider(parentSessionContext)) {
                return parentSessionContext;
            }

            const sessionExists = await session.current.doesSessionExist();

            if (sessionExists === false) {
                return {
                    doesSessionExist: false,
                    accessTokenPayload: {},
                    userId: "",
                    invalidClaim: undefined,
                };
            }

            return {
                doesSessionExist: true,
                accessTokenPayload: await session.current.getAccessTokenPayloadSecurely(),
                userId: await session.current.getUserId(),
                invalidClaim: undefined,
            };
        };

        async function setInitialContextAndMaybeRedirect() {
            const toSetContext = await buildContext();

            // if this component is unmounting, or the context has already
            // been set, then we don't need to proceed...
            if (cancelUseEffect) {
                return;
            }
            if (!toSetContext.doesSessionExist && props.requireAuth === true) {
                props.redirectToLogin();
            } else {
                if (context === undefined) {
                    setContextUpdate(toSetContext);
                }
            }
        }
        void setInitialContextAndMaybeRedirect();
        return () => {
            cancelUseEffect = true;
        };
    }, [props.requireAuth]);

    // subscribe to events on mount
    useEffect(() => {
        function onHandleEvent(event: RecipeEventWithSessionContext) {
            switch (event.action) {
                // We may want to rerun the checks in this case (although the session)
                // case "API_INVALID_CLAIM":
                case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                case "SESSION_CREATED":
                    setContextUpdate(event.sessionContext);
                    return;
                case "REFRESH_SESSION":
                    setContextUpdate(event.sessionContext);
                    return;
                case "SIGN_OUT":
                    if (props.requireAuth !== true) {
                        setContextUpdate(event.sessionContext);
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
                        setContextUpdate(event.sessionContext);
                        if (props.onSessionExpired !== undefined) {
                            props.onSessionExpired();
                        }
                    }
                    return;
            }
        }

        // we return here cause addEventListener returns a function that removes
        // the listener, and this function will be called by useEffect when
        // onHandleEvent changes or if the component is unmounting.
        return session.current.addEventListener(onHandleEvent);
    }, [props, setContextUpdate]);

    if (context === undefined) {
        return null;
    }

    // this will display null only if initially the below condition is true.
    // cause if the session goes from existing to non existing, then
    // the context is not updated if props.requireAuth === true
    if (!context.doesSessionExist && props.requireAuth === true) {
        return null;
    }

    return <SessionContext.Provider value={context}>{children}</SessionContext.Provider>;
};

// const SessionAuthWithKey: React.FC<Props> = (props) => (
//     <SessionAuth key={`st-${props.requireAuth}-${props.claimValidators?.map((p) => p.id)}`} {...props}>
//         {props.children}
//     </SessionAuth>
// );

export default SessionAuth;
