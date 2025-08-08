import * as React from "react";
import { Fragment } from "react";
import Button from "../../../../emailpassword/components/library/button";
import PasskeyIcon from "../../../../../components/assets/passkeyIcon";
import { useTranslation } from "../../../../../translation/translationContext";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import BackButton from "../../../../emailpassword/components/library/backButton";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { PasskeyNotSupportedError } from "../error/passkeyNotSupportedError";

export type MFASignInProps = {
    onBackButtonClicked?: () => void;
    onSignIn: () => Promise<void>;
    onRegisterPasskeyClick: () => void;
    canRegisterPasskey: boolean;
    error: string | undefined;
    deviceSupported: boolean;
};

export const WebauthnMFASignIn = withOverride(
    "WebauthnMFASignIn",
    function WebauthnMFASignIn(props: MFASignInProps): JSX.Element {
        const t = useTranslation();
        const [isLoading, setIsLoading] = React.useState(false);

        const onClick = React.useCallback(async () => {
            setIsLoading(true);
            await props.onSignIn();
            setIsLoading(false);
        }, [props]);

        return (
            <Fragment>
                {props.onBackButtonClicked ? (
                    <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                        <BackButton onClick={props.onBackButtonClicked} />
                        {t("WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE")}
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    </div>
                ) : (
                    <div data-supertokens="headerTitle webauthn-mfa">{t("WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE")}</div>
                )}

                <div data-supertokens="headerSubtitle secondaryText">{t("WEBAUTHN_MFA_SIGN_IN_HEADER_SUBTITLE")}</div>
                <Button
                    disabled={!props.deviceSupported || isLoading}
                    isLoading={isLoading}
                    type="button"
                    onClick={onClick}
                    label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
                    isGreyedOut={!props.deviceSupported}
                    icon={PasskeyIcon}
                />
                {props.error !== undefined && <GeneralError error={props.error} />}
                {props.canRegisterPasskey && (
                    <>
                        <div data-supertokens="passkeyMfaSignInDivider">
                            <div data-supertokens="divider" />
                            <span>or</span>
                            <div data-supertokens="divider" />
                        </div>
                        <div data-supertokens="headerSubtitle secondaryText">
                            <span data-supertokens="link" onClick={props.onRegisterPasskeyClick}>
                                {t("WEBAUTHN_MFA_REGISTER_PASSKEY_LINK")}
                            </span>
                            {t("WEBAUTHN_MFA_REGISTER_PASSKEY_SUBTITLE")}
                        </div>
                    </>
                )}
                {!props.deviceSupported && <PasskeyNotSupportedError />}
            </Fragment>
        );
    }
);
