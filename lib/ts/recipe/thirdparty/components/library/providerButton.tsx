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

import { useContext } from "react";
import { useTranslation } from "../../../../components/translationContext";
import StyleContext from "../../../../styles/styleContext";
/*
 * Props.
 */

export type ProviderButtonProps = {
    providerName: string;
    displayName: string;
    logo?: JSX.Element;
};

/*
 * Component.
 */

export default function ProviderButton({ logo, providerName, displayName }: ProviderButtonProps) {
    /*
     * Render.
     */
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const providerStyleName = `provider${providerName}`;

    return (
        <button
            css={[styles.providerButton, styles[providerStyleName]]}
            data-supertokens={`providerButton ${providerStyleName}`}>
            {logo !== undefined && (
                <div css={styles.providerButtonLeft} data-supertokens="providerButtonLeft">
                    <div css={styles.providerButtonLogo} data-supertokens="providerButtonLogo">
                        <div css={styles.providerButtonLogoCenter} data-supertokens="providerButtonLogoCenter">
                            {logo}
                        </div>
                    </div>
                </div>
            )}
            <div css={styles.providerButtonText} data-supertokens="providerButtonText">
                {t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START")}
                {displayName}
                {t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END")}
            </div>
        </button>
    );
}
