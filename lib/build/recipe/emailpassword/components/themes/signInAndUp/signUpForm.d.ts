/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
export declare const SignUpForm: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
        error: string | undefined;
    } & {
        clearError: () => void;
        onError: (error: string) => void;
        recipeImplementation: import("../../../types").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: () => void;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
>;
