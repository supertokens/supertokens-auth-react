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
import React from "react";
import SessionContext from "./sessionContext";
import { useAuthentication } from "../../components/useAuthentication";
import { Redirect } from "../../components/Redirect";

type RequireAuthProps = {
    requireAuth: true;
    redirectToLogin: () => void;
};

type NoRequireAuthProps = {
    requireAuth?: false;
};

type Props = NoRequireAuthProps | RequireAuthProps;

/**
 * SessionAuth provides a layer of compatibility between AuthenticationContext and previous APIs.
 * It maps AuthenticationContext to SessionContext
 */
export const SessionAuth: React.FC<Props> = ({ children, ...props }) => {
    const authentication = useAuthentication();

    // If the context is null, we are still waiting to know whether session exists.
    if (authentication === undefined) {
        return null;
    }

    if (authentication.isAuthenticated() === false && props.requireAuth === true) {
        return <Redirect fn={props.redirectToLogin} />;
    }

    return (
        <SessionContext.Provider
            value={{
                doesSessionExist: authentication.isAuthenticated(),
                jwtPayload: authentication.getJwtPayload(),
                userId: authentication.getUserId(),
            }}>
            {children}
        </SessionContext.Provider>
    );
};
