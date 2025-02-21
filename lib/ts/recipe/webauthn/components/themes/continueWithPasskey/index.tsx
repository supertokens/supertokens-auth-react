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

import React, { useEffect, useState } from "react";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";
import { ThemeBase } from "../themeBase";

import type { NormalisedConfig, ContinueWithPasskeyProps } from "../../../types";

const ContinueWithPasskey: React.FC<ContinueWithPasskeyProps> = ({
    continueFor,
    continueWithPasskeyClicked,
    isLoading = false,
    isPasskeyNotSupported = true,
}) => {
    const t = useTranslation();

    return (
        <div data-supertokens="continueWithPasskeyButtonWrapper">
            <Button
                isLoading={isLoading}
                onClick={() => {
                    continueWithPasskeyClicked(continueFor);
                }}
                type="button"
                label={"WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON"}
                disabled={isPasskeyNotSupported}
                isGreyedOut={isPasskeyNotSupported}
            />
            {isPasskeyNotSupported && (
                <div data-supertokens="continueWithPasskeyButtonNotSupported">
                    {t("WEBAUTHN_PASSKEY_NOT_SUPPORTED_BY_BROWSER")}
                </div>
            )}
        </div>
    );
};

const ContinueWithPasskeyWithOverride = withOverride("WebauthnContinueWithPasskey", ContinueWithPasskey);

export const ContinueWithPasskeyTheme = (props: { config: NormalisedConfig } & ContinueWithPasskeyProps) => {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const [isPasskeySupported, setIsPasskeySupported] = useState(false);

    useEffect(() => {
        void (async () => {
            const browserSupportsWebauthn = await props.recipeImplementation.doesBrowserSupportWebAuthn();
            if (browserSupportsWebauthn.status !== "OK") {
                console.error(browserSupportsWebauthn.error);
                return;
            }

            setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
        })();
    }, [props.recipeImplementation]);

    return (
        <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle]}>
            <ContinueWithPasskeyWithOverride {...props} isPasskeyNotSupported={!isPasskeySupported} />
        </ThemeBase>
    );
};
