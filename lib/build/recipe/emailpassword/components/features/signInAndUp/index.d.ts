import * as React from "react";
import { PureComponent } from "react";
import { FormFieldThemeProps } from "../../../types";
import { FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { SignInAndUpState, RecipeInterface } from "../../../types";
import Recipe from "../../../recipe";
import { SessionContextType } from "../../../../session";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUp extends PureComponent<PropType, SignInAndUpState> {
    static contextType: React.Context<SessionContextType>;
    constructor(props: PropType);
    getIsEmbedded: () => boolean;
    onSignInSuccess: () => Promise<void>;
    onSignUpSuccess: () => Promise<void>;
    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[];
    componentDidMount: () => Promise<void>;
    getModifiedRecipeImplementation: () => RecipeInterface;
    render: () => JSX.Element;
}
export default SignInAndUp;
