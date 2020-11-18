/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { StyleConsumer } from "../styles/styleContext";

/*
 * Props.
 */

type InputErrorProps = {
    error: string;
};

/*
 * Component.
 */

export default function InputError({ error }: InputErrorProps): JSX.Element {
    /*
     * Render.
     */

    return (
        <StyleConsumer>
            {styles => (
                <div className="inputErrorMessage" css={styles.inputErrorMessage}>
                    {error}
                </div>
            )}
        </StyleConsumer>
    );
}
