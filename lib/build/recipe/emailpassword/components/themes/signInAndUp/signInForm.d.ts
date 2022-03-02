/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
export declare const SignInForm: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
    } & {
        recipe: import("../../../recipe").default;
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signUpClicked?: (() => void) | undefined;
        forgotPasswordClick: () => void;
        onSuccess: () => void;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
>;
