/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import BackButton from "../../../../emailpassword/components/library/backButton";

export const FactorChooserHeader = withOverride(
    "MFAFactorChooserHeader",
    function MFAFactorChooserHeader(props: { showBackButton: boolean; onBackButtonClicked: () => void }): JSX.Element {
        const t = useTranslation();

        return (
            <div data-supertokens="row factorChooserHeader">
                <div data-supertokens="headerTitle withBackButton">
                    {props.showBackButton ? (
                        <BackButton onClick={props.onBackButtonClicked} />
                    ) : (
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    )}
                    {t("MULTI_FACTOR_CHOOSER_HEADER_TITLE")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
            </div>
        );
    }
);
