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
import React, { useState } from "react";

import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";
import { ThemeBase } from "../themeBase";

import type { LinkClickedScreenProps } from "../../../types";

const PasswordlessLinkClickedScreen: React.FC<LinkClickedScreenProps> = (props) => {
    const t = useTranslation();
    const [loading, setLoading] = useState(false);

    return (
        <div data-supertokens="container">
            <div data-supertokens="row">
                {props.requireUserInteraction === true ? (
                    <React.Fragment>
                        <div data-supertokens="headerTitle">{t("PWLESS_LINK_CLICKED_CONTINUE_HEADER")}</div>
                        <div data-supertokens="headerSubtitle secondaryText">
                            {t("PWLESS_LINK_CLICKED_CONTINUE_DESC")}
                        </div>
                        <div data-supertokens="continueButtonWrapper">
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
                    <div data-supertokens="spinner">
                        <SpinnerIcon />
                    </div>
                )}
            </div>
        </div>
    );
};

const LinkClickedScreenWithOverride = withOverride("PasswordlessLinkClickedScreen", PasswordlessLinkClickedScreen);

export const LinkClickedScreen = (props: LinkClickedScreenProps) => {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return (
        <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, props.config.linkClickedScreenFeature.style]}>
            <LinkClickedScreenWithOverride {...props} />
        </ThemeBase>
    );
};
