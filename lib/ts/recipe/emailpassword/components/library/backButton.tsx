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

import { useContext } from "react";
import StyleContext from "../../../../styles/styleContext";
import HeavyArrowLeftIcon from "../../../../components/assets/heavyArrowLeftIcon";

/*
 * Props.
 */

type ButtonProps = {
    onClick?: () => void;
};

/*
 * Component.
 */

export default function BackButton({ onClick }: ButtonProps): JSX.Element {
    const styles = useContext(StyleContext);

    return (
        <button
            onClick={onClick}
            css={[styles.backButton, styles.backButtonCommon]}
            data-supertokens="backButton backButtonCommon">
            <HeavyArrowLeftIcon color={styles.palette.colors.textTitle} />
        </button>
    );
}
