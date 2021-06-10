/// <reference types="react" />
/** @jsx jsx */
import { jsx } from "@emotion/react";
export declare const SignUpForm: (
    props: import("../../../../../types").ThemeBaseProps & {
        formFields: import("../../../types").FormFieldThemeProps[];
    } & {
        recipeImplementation: import("../../../types").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: () => void;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }
) => jsx.JSX.Element;
