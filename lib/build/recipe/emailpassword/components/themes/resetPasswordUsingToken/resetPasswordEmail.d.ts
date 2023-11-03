/// <reference types="react" />
export declare const ResetPasswordEmail: import("react").ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        formFields: Omit<import("../../../types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../../../types").NormalisedConfig;
        onBackButtonClicked: () => void;
    } & {
        children?: import("react").ReactNode;
    }
>;
