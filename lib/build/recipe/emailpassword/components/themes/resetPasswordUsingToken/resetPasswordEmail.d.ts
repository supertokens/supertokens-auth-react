/// <reference types="react" />
import type { EnterEmailProps, EnterEmailStatus } from "../../../types";
export declare const EmailPasswordResetPasswordEmail: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: Omit<import("../../../types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        onBackButtonClicked: () => void;
    } & {
        status: EnterEmailStatus;
        onSuccess: () => void;
        resend: () => void;
    }
>;
export declare const ResetPasswordEmail: React.FC<EnterEmailProps>;
