/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
export declare const SignUpForm: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
    } & {
        recipe: import("../../../recipe").default;
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: () => void;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
>;
