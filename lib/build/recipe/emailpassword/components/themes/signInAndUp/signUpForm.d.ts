/// <reference types="react" />
export declare const SignUpForm: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: (result: { user: import("supertokens-web-js/types").User }) => void;
        formFields: import("../../../types").FormFieldThemeProps[];
        error: string | undefined;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
>;
