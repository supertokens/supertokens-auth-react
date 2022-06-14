/// <reference types="react" />
export declare const SignUp: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: () => void;
    }
>;
