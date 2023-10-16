/// <reference types="react" />
export declare const SignIn: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        signUpClicked?: (() => void) | undefined;
        forgotPasswordClick: () => void;
        onSuccess: () => void;
    }
>;
