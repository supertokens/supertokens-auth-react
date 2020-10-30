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
import Checked from "../../assets/checked";
import Error from "../../assets/error";
import * as React from "react";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles, NormalisedPalette } from "../../types";

export type AdornmentType = "success" | "error" | undefined;

/*
 * Props.
 */

type InputAdornmentProps = {
    style?: CSSInterpolation;
    type: AdornmentType;
    defaultStyles: NormalisedDefaultStyles;
    palette: NormalisedPalette;
};

/*
 * Component.
 */

export default function InputAdornment({ type, style, defaultStyles, palette }: InputAdornmentProps): JSX.Element {
    /*
     * Render.
     */

    return (
        <div className="inputAdornment" css={[defaultStyles.inputAdornment, style]}>
            {type === "success" && <Checked color={palette.colors.primary} />}
            {type === "error" && <Error color={palette.colors.error} />}
        </div>
    );
}
