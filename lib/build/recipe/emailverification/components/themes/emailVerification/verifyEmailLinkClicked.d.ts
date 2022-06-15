/// <reference types="react" />
import { VerifyEmailLinkClickedThemeProps } from "../../../types";
export declare const EmailVerificationVerifyEmailLinkClicked: React.FC<VerifyEmailLinkClickedThemeProps>;
export declare const VerifyEmailLinkClicked: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        onSuccess: () => Promise<void>;
        onTokenInvalidRedirect: () => Promise<void>;
        token: string;
    } & {
        children?: import("react").ReactNode;
    }
>;
