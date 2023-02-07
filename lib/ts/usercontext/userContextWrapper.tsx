/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
import React from "react";

import { UserContextContext, UserContextProvider } from ".";

export default function UserContextWrapper(props: { children: React.ReactNode; userContext?: any }): JSX.Element {
    /**
     * If we recieve a userContext as a props we should assume that the user
     * is either trying to use a theme component as standalone or that they
     * want to override an existing value for userContext.
     *
     * In this case we should always return a Provider with the value of userContext
     */
    if (props.userContext !== undefined) {
        return <UserContextProvider userContext={props.userContext}>{props.children}</UserContextProvider>;
    }

    return (
        <UserContextContext.Consumer>
            {(value) => {
                /**
                 * value is undefined only if there is no Provider in the tree. In this case it is safe to
                 * assume that the theme component is not being rendered by the SDK and that the user is not
                 * using this as a child of one of the pre-built feature components.
                 *
                 * In this case we return a provider so that the userContext hook can be used by the children
                 * of this theme component
                 */
                if (value === undefined) {
                    return <UserContextProvider>{props.children}</UserContextProvider>;
                }

                /**
                 * If value is not undefined then a provider exists in the tree. This means that this component
                 * is either being rendered by the SDK or the user has added it as a child of the pre-built
                 * feature components. In either case the userContext hook will be available so simply
                 * return the theme component.
                 */
                return props.children;
            }}
        </UserContextContext.Consumer>
    );
}
