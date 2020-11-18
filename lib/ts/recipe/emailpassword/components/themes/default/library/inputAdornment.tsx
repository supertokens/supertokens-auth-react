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
import Checked from "../../../../assets/checked";
import Error from "../../../../assets/error";
import * as React from "react";
import { StyleConsumer } from "../styles/styleContext";

export type AdornmentType = "success" | "error" | undefined;

/*
 * Props.
 */

type InputAdornmentProps = {
    type: AdornmentType;
};

/*
 * Component.
 */

export default function InputAdornment({ type }: InputAdornmentProps): JSX.Element {
    /*
     * Render.
     */
    return (
        <StyleConsumer>
            {styles => (
                <div className="inputAdornment" css={styles.inputAdornment}>
                    {type === "success" && <Checked color={styles.palette.colors.primary} />}
                    {type === "error" && <Error color={styles.palette.colors.error} />}
                </div>
            )}
        </StyleConsumer>
    );
}
