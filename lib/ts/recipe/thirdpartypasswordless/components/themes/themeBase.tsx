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

import React, { PropsWithChildren } from "react";
import { Fragment } from "react";

/*
 * Component
 */

export const ThemeBase: React.FC<PropsWithChildren<{ loadDefaultFont: boolean }>> = ({ children, loadDefaultFont }) => {
    return (
        <Fragment>
            {children}
            {loadDefaultFont && (
                <link
                    href="//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700"
                    rel="stylesheet"
                    type="text/css"></link>
            )}
        </Fragment>
    );
};
