/// <reference types="react" />
/** @jsx jsx */
import { jsx } from "@emotion/react";
export declare const SignInForm: (
    props: import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
    } & {
        recipeImplementation: import("../../../types").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signUpClicked?: (() => void) | undefined;
        forgotPasswordClick: () => void;
        onSuccess: () => void;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
) => jsx.JSX.Element;
