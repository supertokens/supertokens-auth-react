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
import React, { useEffect, useState, useContext } from "react";
import SessionContext, { isDefaultContext } from "./sessionContext";
import Session from "./recipe";
import { RecipeEvent, SessionContextType } from "./types";
import { doesSessionExist, getJWTPayloadSecurely, getUserId } from "./index";

type Props = {
    requireAuth?: boolean;
    redirectToLogin: () => void;
};

const SessionAuth: React.FC<Props> = ({ children, ...props }) => {
    const parentSessionContext = useContext(SessionContext);

    const [context, setContext] = useState<SessionContextType | undefined>(undefined);

    const [forceShow, setForceShow] = useState(false);

    const session = Session.getInstanceOrThrow();

    const setInitialContext = async (): Promise<void> => {
        const sessionExists = await doesSessionExist();

        if (sessionExists === false) {
            return setContext({
                doesSessionExist: sessionExists,
                jwtPayload: {},
                userId: "",
            });
        }

        const [jwtPayload, userId] = await Promise.all([getJWTPayloadSecurely(), getUserId()]);

        return setContext({
            doesSessionExist: sessionExists,
            jwtPayload,
            userId,
        });
    };

    const onHandleEvent = async (event: RecipeEvent) => {
        switch (event.action) {
            case "SESSION_CREATED":
                return setContext({
                    doesSessionExist: true,
                    userId: await getUserId(),
                    jwtPayload: await getJWTPayloadSecurely(),
                });
            case "REFRESH_SESSION":
                return setContext({
                    doesSessionExist: true,
                    userId: context === undefined ? "" : context.userId,
                    jwtPayload: await getJWTPayloadSecurely(),
                });
            case "SIGN_OUT":
            case "UNAUTHORISED":
                return setContext({
                    doesSessionExist: false,
                    userId: "",
                    jwtPayload: {},
                });
            default:
                return;
        }
    };

    // Read and set the current state
    useEffect(() => {
        if (isDefaultContext(parentSessionContext)) {
            setInitialContext();
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect on
            // component unmount
            return session.addEventListener(onHandleEvent);
        } else {
            return setContext(parentSessionContext);
        }
    }, [parentSessionContext]);

    useEffect(() => {
        if (context === undefined) {
            return;
        }

        // If the session doesn't exist and we require auth, redirect to login
        if (context.doesSessionExist === false && props.requireAuth === true) {
            props.redirectToLogin();
        } else {
            // since we are rendering children, we will continue to show them always
            // so that in case a session expiry popup needs to be shown, then the
            // UI will not blank out completely.
            if (!forceShow) {
                setForceShow(true);
            }
        }
    }, [context, props, forceShow]);

    // If the context is undefined, we are still waiting to know whether session exists.
    if (context === undefined) {
        return null;
    }

    if (context.doesSessionExist === false && props.requireAuth === true && !forceShow) {
        return null;
    }

    return <SessionContext.Provider value={context}>{children}</SessionContext.Provider>;
};

export default SessionAuth;
