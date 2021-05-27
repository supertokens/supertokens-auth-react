import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import {
    NormalisedConfig,
    GetRedirectionURLContext,
    PreAPIHookContext,
    ThirdPartySignInAndUpState,
    RecipeInterface,
} from "../../../types";
declare type PropType = FeatureBaseProps & {
    recipeImplementation: RecipeInterface;
};
declare class SignInAndUp extends PureComponent<PropType, ThirdPartySignInAndUpState> {
    constructor(props: PropType);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        import("../../../../authRecipeModule/types").OnHandleEventContext,
        NormalisedConfig
    >;
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    signInAndUpClick: (providerId: string) => Promise<string | void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
