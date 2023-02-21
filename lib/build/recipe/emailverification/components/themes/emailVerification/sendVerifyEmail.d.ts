/// <reference types="react" />
import type { SendVerifyEmailThemeProps } from "../../../types";
export declare const EmailVerificationSendVerifyEmail: React.FC<SendVerifyEmailThemeProps>;
export declare const SendVerifyEmail: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signOut: () => Promise<void>;
        onEmailAlreadyVerified: () => Promise<void>;
        redirectToAuth: () => Promise<void>;
    } & {
        children?: import("react").ReactNode;
    }
>;
