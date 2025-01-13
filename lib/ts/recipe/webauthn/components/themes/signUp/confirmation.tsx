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
import Button from "../../../../emailpassword/components/library/button";
import { RecoverableError } from "../error/recoverableError";

import { ContinueWithoutPasskey } from "./continueWithoutPasskey";
import { PasskeyFeatureBlocks } from "./featureBlocks";

import type { SignUpFormProps } from "../../../types";

export const PasskeyConfirmation = withOverride(
    "PasskeyConfirmation",
    function PasskeyConfirmation(
        props: SignUpFormProps & {
            email: string;
            onContinueClick: () => void;
            errorMessageLabel?: string;
            isLoading: boolean;
            hideContinueWithoutPasskey?: boolean;
        }
    ): JSX.Element {
        const t = useTranslation();

        return (
            <div data-supertokens="passkeyConfirmationContainer">
                <div data-supertokens="passkeyConfirmationEmailContainer">
                    <div data-supertokens="continueWithLabel">{t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT")}</div>
                    <div data-supertokens="enteredEmailId">{props.email}</div>
                </div>
                <PasskeyFeatureBlocks />
                {props.errorMessageLabel !== undefined && props.errorMessageLabel !== "" && (
                    <RecoverableError errorMessageLabel={props.errorMessageLabel} />
                )}
                <div data-supertokens="passkeyConfirmationFooter">
                    <Button
                        disabled={false}
                        isLoading={props.isLoading}
                        type="button"
                        onClick={props.onContinueClick}
                        label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
                    />
                    {!props.hideContinueWithoutPasskey && props.resetFactorList !== undefined && (
                        <ContinueWithoutPasskey onClick={props.resetFactorList} />
                    )}
                </div>
            </div>
        );
    }
);
