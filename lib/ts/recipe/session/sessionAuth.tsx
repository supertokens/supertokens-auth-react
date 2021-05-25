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
import { getUserId, getJWTPayloadSecurely, doesSessionExist } from "./";

type PropType = {
    requireAuth?: boolean; // false by default
    redirectToLogin: () => void;
};

type StateType =
    | { status: "LOADING" }
    | {
          status: "READY";
          userId: string;
          doesSessionExist: boolean;
          jwtPayload: any;
      };

export default class SessionAuth extends React.PureComponent<PropType, StateType> {
    /*
     * Constructor.
     */
    constructor(props: PropType) {
        super(props);
        this.state = {
            status: "LOADING",
        };
    }

    redirectToLogin = async (): Promise<void> => {
        if (this.props.redirectToLogin === undefined) {
            throw new Error(
                "Please provide the redirectToLogin prop when using SessionAuth, or use requireAuth={false}"
            );
        }
        this.props.redirectToLogin();
    };

    async componentDidMount(): Promise<void> {
        const sessionExists = await doesSessionExist();
        if (sessionExists === false) {
            if (this.props.requireAuth !== true) {
                this.setState((oldState) => {
                    return {
                        ...oldState,
                        status: "READY",
                        userId: "",
                        doesSessionExist: false,
                        jwtPayload: {},
                    };
                });
            } else {
                return await this.redirectToLogin();
            }
        } else {
            const userIdPromise = getUserId();

            const jwtPayloadPromise = getJWTPayloadSecurely();

            const userId = await userIdPromise;

            const jwtPayload = await jwtPayloadPromise;

            this.setState((oldState) => {
                return {
                    ...oldState,
                    status: "READY",
                    userId,
                    doesSessionExist: true,
                    jwtPayload,
                };
            });
        }
    }

    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        if (this.state.status === "READY") {
            return (
                <SessionContext.Provider
                    value={{
                        userId: this.state.userId,
                        doesSessionExist: this.state.doesSessionExist,
                        jwtPayload: this.state.jwtPayload,
                    }}>
                    {this.props.children}
                </SessionContext.Provider>
            );
        }
        return null;
    };
}
