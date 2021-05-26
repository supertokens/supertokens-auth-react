import { PureComponent } from "react";
import { FormFieldThemeProps, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig } from "../../../types";
import { FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { SignInAndUpState, RecipeInterface } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare type PropType = FeatureBaseProps & {
    recipeImplemetation: RecipeInterface;
};
declare class SignInAndUp extends PureComponent<PropType, SignInAndUpState> {
    constructor(props: PropType);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    getIsEmbedded: () => boolean;
    onSignInSuccess: () => Promise<void>;
    onSignUpSuccess: () => Promise<void>;
    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[];
    componentDidMount: () => Promise<void>;
    getModifiedRecipeImplementation: () => RecipeInterface;
    render: () => JSX.Element;
}
export default SignInAndUp;
