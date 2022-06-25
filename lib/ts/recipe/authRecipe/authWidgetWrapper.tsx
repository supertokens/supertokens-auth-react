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
import React, { useEffect, useContext, useState, PropsWithChildren } from "react";
import { SessionAuth, SessionContext } from "../session";
import AuthRecipe from ".";
import { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
import { getRedirectToPathFromURL } from "../../utils";

type Props<T, S, R, N extends NormalisedConfig<T | GetRedirectionURLContext, S, R | OnHandleEventContext>> = {
    onSessionAlreadyExists?: () => void;
    authRecipe: AuthRecipe<T, S, R, N>;
    history: any;
};

/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
const AuthWidgetWrapper = <
    T,
    Action,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, Action, R | OnHandleEventContext>
>(
    props: PropsWithChildren<Props<T, Action, R, N>>
): React.ReactElement | null => {
    return (
        <SessionAuth requireAuth={false}>
            <Redirector {...props} />
        </SessionAuth>
    );
};

const Redirector = <T, S, R, N extends NormalisedConfig<T | GetRedirectionURLContext, S, R | OnHandleEventContext>>(
    props: PropsWithChildren<Props<T, S, R, N>>
): React.ReactElement | null => {
    const sessionContext = useContext(SessionContext);

    const [alwaysShow, updateAlwaysShow] = useState(false);

    useEffect(() => {
        // we want to do this just once, so we supply it with only the loading statet.
        // if we supply it with props, sessionContext, then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.loading === false && sessionContext.doesSessionExist) {
            if (props.onSessionAlreadyExists !== undefined) {
                props.onSessionAlreadyExists();
            } else {
                props.authRecipe.config.onHandleEvent({
                    action: "SESSION_ALREADY_EXISTS",
                });
                void props.authRecipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: false,
                        redirectToPath: getRedirectToPathFromURL(),
                    },
                    props.history
                );
            }
        } else {
            // this means even if a session exists, we will still show the children
            // cause the child component will take care of redirecting etc..
            updateAlwaysShow(true);
        }
    }, [sessionContext.loading]);

    if ((sessionContext.loading === true || sessionContext.doesSessionExist) && !alwaysShow) {
        return null;
    } else {
        return <>{props.children}</>;
    }
};

export default AuthWidgetWrapper;
