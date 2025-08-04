import * as React from "react";
import { Fragment } from "react";
import Button from "../../../../emailpassword/components/library/button";
import { useTranslation } from "../../../../../translation/translationContext";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import BackButton from "../../../../emailpassword/components/library/backButton";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { PasskeyFeatureBlockList } from "../signUp/featureBlocks";

export type MFASignUpConfirmationProps = {
    onSignUp: (email: string) => Promise<void>;
    onBackButtonClicked: () => void;
    email: string;
    error?: string;
};

export const WebauthnMFASignUpConfirmation = withOverride(
    "WebauthnMFASignUpConfirmation",
    function WebauthnMFASignUpConfirmation(props: MFASignUpConfirmationProps): JSX.Element {
        const t = useTranslation();
        const [isLoading, setIsLoading] = React.useState(false);

        const onClick = React.useCallback(async () => {
            setIsLoading(true);
            await props.onSignUp(props.email);
            setIsLoading(false);
        }, [props]);

        return (
            <Fragment>
                <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                    <BackButton onClick={props.onBackButtonClicked} />
                    {t("WEBAUTHN_MFA_REGISTER_PASSKEY_LINK")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
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
            </Fragment>
        );
    }
);
