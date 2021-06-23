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
import React, { useEffect, useState } from "react";
import SessionContext from "./sessionContext";
import Session from "./recipe";
import { OnHandleEventContext, SessionContextType } from "./types";

type Props = {
    requireAuth?: boolean;
    redirectToLogin: () => void;
};

/**
 * SessionAuth provides a layer of compatibility between AuthenticationContext and previous APIs.
 * It maps AuthenticationContext to SessionContext
 */
const SessionAuth: React.FC<Props> = ({ children, ...props }) => {
    const [sessionContext, setSessionContext] = useState<SessionContextType>();
    const session = Session.getInstanceOrThrow();

    const buildSessionContext = async (): Promise<SessionContextType> => {
        const sessionExists = await session.doesSessionExist();

        if (!sessionExists) {
            return {
                doesSessionExist: sessionExists,
                jwtPayload: {},
                userId: "",
            };
        }

        const [jwtPayload, userId] = await Promise.all([session.getJWTPayloadSecurely(), session.getUserId()]);

        return {
            doesSessionExist: sessionExists,
            jwtPayload,
            userId,
        };
    };

    const updateSessionContext = async () => {
        const sessionContext = await buildSessionContext();

        setSessionContext(sessionContext);
    };

    const onHandleEvent = async (ctx: OnHandleEventContext) => {
        switch (ctx.action) {
            case "REFRESH_SESSION":
            case "SIGN_OUT":
            case "UNAUTHORISED":
                return updateSessionContext();
            default:
                return;
        }
    };

    // Read the current state
    useEffect(() => {
        updateSessionContext();
    }, []);

    // Setup listener
    useEffect(() => session.addEventListener(onHandleEvent), []);

    // If the context is undefined, we are still waiting to know whether session exists.
    if (sessionContext === undefined) {
        return null;
    }

    // If the session doesn't exist and we require auth, redirect to login
    if (sessionContext.doesSessionExist === false && props.requireAuth === true) {
        props.redirectToLogin();

        return null;
    }

    return <SessionContext.Provider value={sessionContext}>{children}</SessionContext.Provider>;
};

export default SessionAuth;
