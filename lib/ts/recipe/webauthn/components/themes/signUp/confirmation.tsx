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

import { useEffect, useMemo } from "react";
import { useState } from "react";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import Button from "../../../../emailpassword/components/library/button";
import { PasskeyNotSupportedError } from "../error/passkeyNotSupportedError";
import { RecoverableError } from "../error/recoverableError";

import { ContinueWithoutPasskey } from "./continueWithoutPasskey";
import { PasskeyFeatureBlocks } from "./featureBlocks";

import type { SignUpFormProps } from "../../../types";

export const PasskeyConfirmation = withOverride(
    "PasskeyConfirmation",
    function PasskeyConfirmation(
        props: SignUpFormProps & {
            email?: string;
            onContinueClick: () => void;
            errorMessageLabel?: string;
            isLoading: boolean;
            hideContinueWithoutPasskey?: boolean;
            isContinueDisabled?: boolean;
        }
    ): JSX.Element {
        const t = useTranslation();

        const [isPasskeySupported, setIsPasskeySupported] = useState(false);
        const showContinueWithoutPasskey = useMemo(
            () => props.hideContinueWithoutPasskey !== true && (props.originalFactorIds ?? []).length > 1,
            [props]
        );

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
            <div data-supertokens="passkeyConfirmationContainer">
                {props.email !== undefined && (
                    <div data-supertokens="passkeyConfirmationEmailContainer">
                        <div data-supertokens="continueWithLabel">{t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT")}</div>
                        <div data-supertokens="enteredEmailId">{props.email}</div>
                    </div>
                )}
                <PasskeyFeatureBlocks />
                {props.errorMessageLabel !== undefined && props.errorMessageLabel !== "" && (
                    <RecoverableError errorMessageLabel={props.errorMessageLabel} />
                )}
                <div data-supertokens="passkeyConfirmationFooter">
                    <Button
                        disabled={props.isContinueDisabled || !isPasskeySupported}
                        isLoading={props.isLoading}
                        type="button"
                        onClick={props.onContinueClick}
                        label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
                        isGreyedOut={!isPasskeySupported}
                    />
                    {!isPasskeySupported && <PasskeyNotSupportedError />}
                    {showContinueWithoutPasskey && props.resetFactorList !== undefined && (
                        <ContinueWithoutPasskey onClick={props.resetFactorList} />
                    )}
                </div>
            </div>
        );
    }
);
