/// <reference types="react" />
export declare const SignIn: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: Omit<import("../../../types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        signUpClicked?: (() => void) | undefined;
        forgotPasswordClick: () => void;
        onSuccess: (result: { user: import("supertokens-web-js/types").User }) => void;
    }
>;
