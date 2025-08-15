import ArrowLeftIcon from "../../../../../components/assets/arrowLeftIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

export type WebauthnMFAFooterProps = {
    onSignOutClicked: () => void;
};

export const WebauthnMFAFooter = withOverride(
    "WebauthnMFAFooter",
    function PasswordlessMFAFooter(props: WebauthnMFAFooterProps): JSX.Element | null {
        const t = useTranslation();

        return (
            <div data-supertokens="footerLinkGroupVert webauthn-mfa footer">
                <div data-supertokens="secondaryText secondaryLinkWithLeftArrow" onClick={props.onSignOutClicked}>
                    <ArrowLeftIcon color="rgb(var(--palette-textPrimary))" />
                    {t("WEBAUTHN_MFA_FOOTER_LOGOUT")}
                </div>
            </div>
        );
    }
);
