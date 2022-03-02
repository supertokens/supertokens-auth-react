import { PureComponent } from "react";
import { FormFieldThemeProps } from "../../../types";
import { FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { SignInAndUpState } from "../../../types";
import Recipe from "../../../recipe";
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUp extends PureComponent<PropType, SignInAndUpState> {
    constructor(props: PropType);
    getIsEmbedded: () => boolean;
    onSignInSuccess: () => Promise<void>;
    onSignUpSuccess: () => Promise<void>;
    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[];
    modifiedRecipeImplementation: RecipeInterface;
    render: () => JSX.Element;
}
export default SignInAndUp;
