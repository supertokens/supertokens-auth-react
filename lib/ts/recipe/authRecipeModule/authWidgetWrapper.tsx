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
import React, { useEffect, useContext } from "react";
import { SessionAuth, SessionContext } from "../session";

type Props = {
    onSessionAlreadyExists: () => void;
};

/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
const AuthWidgetWrapper: React.FC<Props> = ({ ...props }) => {
    return (
        <SessionAuth requireAuth={false} redirectToLogin={() => undefined}>
            <Redirector {...props} />
        </SessionAuth>
    );
};

const Redirector: React.FC<Props> = ({ children, ...props }) => {
    const sessionContext = useContext(SessionContext);

    useEffect(() => {
        if (sessionContext.doesSessionExist) {
            props.onSessionAlreadyExists();
        }
    }, [sessionContext, props]);

    if (sessionContext.doesSessionExist) {
        return null;
    } else {
        return <>{children}</>;
    }
};

export default AuthWidgetWrapper;
