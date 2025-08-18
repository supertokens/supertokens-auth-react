import * as React from "react";
import { Fragment } from "react";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import BackButton from "../../../../emailpassword/components/library/backButton";
import Button from "../../../../emailpassword/components/library/button";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { PasskeyFeatureBlockList } from "../signUp/featureBlocks";

import { WebauthnMFAFooter } from "./mfaFooter";

export type MFASignUpConfirmationProps = {
    email: string;
    error?: string;
    onSignUp: () => Promise<void>;
    onBackButtonClicked?: () => void;
    onSignOutClicked: () => void;
};

export const WebauthnMFASignUpConfirmation = withOverride(
    "WebauthnMFASignUpConfirmation",
    function WebauthnMFASignUpConfirmation(props: MFASignUpConfirmationProps): JSX.Element {
        const t = useTranslation();
        const [isLoading, setIsLoading] = React.useState(false);

        const onClick = React.useCallback(async () => {
            setIsLoading(true);
            await props.onSignUp();
            setIsLoading(false);
        }, [props.onSignUp]);

        return (
            <Fragment>
                {props.onBackButtonClicked ? (
                    <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                        <BackButton onClick={props.onBackButtonClicked} />
                        {t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE")}
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    </div>
                ) : (
                    <div data-supertokens="headerTitle webauthn-mfa">{t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE")}</div>
                )}
                <div data-supertokens="divider" />
                <div data-supertokens="passkeyConfirmationContainer">
                    <div data-supertokens="passkeyConfirmationEmailContainer">
                        <div data-supertokens="continueWithLabel">{t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT")}</div>
                        <div data-supertokens="enteredEmailId">{props.email}</div>
                    </div>
                    <PasskeyFeatureBlockList />
                    {props.error !== undefined && <GeneralError error={props.error} />}
                    <div data-supertokens="passkeyConfirmationFooter">
                        <Button
                            disabled={isLoading}
                            isLoading={isLoading}
                            type="button"
                            onClick={onClick}
                            label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
                            isGreyedOut={false}
                        />
                    </div>
                </div>
                <WebauthnMFAFooter {...props} />
            </Fragment>
        );
    }
);
