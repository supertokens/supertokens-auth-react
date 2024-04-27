import { useTranslation } from "../../../../../translation/translationContext";
import { useFormFields } from "../../../../emailpassword/components/library/formBase";

export const ContinueWithPasswordlessFooter: React.FC<{
    onError: (err: string) => void;
    isPhoneNumber: boolean;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
}> = ({ onError, onContinueWithPasswordlessClick, isPhoneNumber }) => {
    const state = useFormFields();
    const t = useTranslation();

    return (
        <a
            onClick={() => {
                const emailOrPhone = state.find(
                    (field) => field.id === (isPhoneNumber ? "phoneNumber" : "email")
                )?.value;
                if (emailOrPhone === undefined) {
                    onError("GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED");
                } else {
                    onContinueWithPasswordlessClick(emailOrPhone).catch(onError);
                }
            }}>
            {t("PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS")}
        </a>
    );
};
