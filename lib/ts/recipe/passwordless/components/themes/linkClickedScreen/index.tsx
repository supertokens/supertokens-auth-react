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
import React, { useContext, useState } from "react";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { LinkClickedScreenProps } from "../../../types";
import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";

const PasswordlessLinkClickedScreen: React.FC<LinkClickedScreenProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const [loading, setLoading] = useState(false);

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                {props.requireUserInteraction === true ? (
                    <React.Fragment>
                        <div data-supertokens="headerTitle" css={styles.headerTitle}>
                            {t("PWLESS_LINK_CLICKED_CONTINUE_HEADER")}
                        </div>
                        <div
                            data-supertokens="headerSubtitle secondaryText"
                            css={[styles.headerSubtitle, styles.secondaryText]}>
                            {t("PWLESS_LINK_CLICKED_CONTINUE_DESC")}
                        </div>
                        <div data-supertokens="continueButtonWrapper" css={styles.continueButtonWrapper}>
                            <Button
                                isLoading={loading}
                                onClick={() => {
                                    setLoading(true);
                                    props.consumeCode();
                                }}
                                type="button"
                                label={"PWLESS_LINK_CLICKED_CONTINUE_BUTTON"}
                            />
                        </div>
                    </React.Fragment>
                ) : (
                    <div data-supertokens="spinner" css={styles.spinner}>
                        <SpinnerIcon color={styles.palette.colors.primary} />
                    </div>
                )}
            </div>
        </div>
    );
};

export const LinkClickedScreen = withOverride("PasswordlessLinkClickedScreen", PasswordlessLinkClickedScreen);
