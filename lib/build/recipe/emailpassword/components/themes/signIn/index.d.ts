/// <reference types="react" />
import type { SignInThemeProps } from "../../../types";
export declare const SignInForm: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: Omit<import("../../../types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        onForgotPasswordClick: () => void;
        onSuccess: (result: { user: import("supertokens-web-js/types").User }) => void;
        userContext: import("../../../../../types").UserContext;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
>;
declare function SignInTheme(props: SignInThemeProps): JSX.Element;
export default SignInTheme;
