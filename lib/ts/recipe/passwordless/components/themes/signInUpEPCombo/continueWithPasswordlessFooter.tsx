import { useTranslation } from "../../../../../translation/translationContext";
import { useFormFields } from "../../../../emailpassword/components/library/formBase";

import type { NormalisedConfig } from "../../../types";

export const ContinueWithPasswordlessFooter: React.FC<{
    onError: (err: string) => void;
    isPhoneNumber: boolean;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
    config: NormalisedConfig;
}> = ({ onError, onContinueWithPasswordlessClick, isPhoneNumber, config }) => {
    const state = useFormFields();
    const t = useTranslation();

    return (
        <a
            data-supertokens="link linkButton continueWithSupertokensLink"
            onClick={async () => {
                if (isPhoneNumber) {
                    const phoneNumber = state.find((field) => field.id === "phoneNumber")?.value;
                    if (phoneNumber === undefined) {
                        onError("GENERAL_ERROR_PHONE_UNDEFINED");
                        return;
                    }

                    const validationRes = await config.validatePhoneNumber(phoneNumber);
                    if (validationRes !== undefined) {
                        onError(validationRes);
                        return;
                    }

                    return onContinueWithPasswordlessClick(phoneNumber);
                } else {
                    const email = state.find((field) => field.id === "email")?.value;
                    if (email === undefined) {
                        onError("GENERAL_ERROR_EMAIL_UNDEFINED");
                        return;
                    }
                    const validationRes = await config.validateEmailAddress(email);
                    if (validationRes !== undefined) {
                        onError(validationRes);
                        return;
                    }

                    return onContinueWithPasswordlessClick(email);
                }
            }}>
            {t("PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS")}
        </a>
    );
};
