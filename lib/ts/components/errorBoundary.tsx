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
import { ErrorInfo, ReactNode, Fragment } from "react";

type ErrorBoundaryState = { hasError: boolean };
/*
 * Component.
 */
export default class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
    constructor(props: { hasError: boolean }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.info(error, errorInfo);
    }

    render(): JSX.Element | ReactNode | undefined {
        if (this.state.hasError) {
            return <Fragment></Fragment>;
        }

        return this.props.children;
    }
}
