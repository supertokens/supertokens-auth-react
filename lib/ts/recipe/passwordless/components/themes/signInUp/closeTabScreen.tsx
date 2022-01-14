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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { PureComponent } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { CloseTabScreenProps } from "../../../types";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon";
/*
 * Component.
 */

class PasswordlessCloseTabScreen extends PureComponent<CloseTabScreenProps> {
    static contextType = StyleContext;

    /*
     * Methods.
     */

    render = (): JSX.Element => {
        const styles = this.context;

        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                    <CheckedRoundIcon color={styles.palette.colors.success} />
                    <div data-supertokens="headerTitle" css={styles.headerTitle}>
                        Success!
                    </div>
                    <div data-supertokens="divider" css={styles.divider} />
                    <div
                        data-supertokens="headerSubtitle secondaryText"
                        css={[styles.headerSubtitle, styles.secondaryText]}>
                        You have been successfully signed in.
                        <br /> Please close this tab
                    </div>
                </div>
            </div>
        );
    };
}

export const CloseTabScreen = withOverride("PasswordlessCloseTabScreen", PasswordlessCloseTabScreen);
