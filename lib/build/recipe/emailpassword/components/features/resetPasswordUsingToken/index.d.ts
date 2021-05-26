import { PureComponent } from "react";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAPIHookContext,
    NormalisedConfig,
    RecipeInterface,
} from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare type PropType = FeatureBaseProps & {
    recipeImplemetation: RecipeInterface;
};
declare class ResetPasswordUsingToken extends PureComponent<
    PropType,
    {
        token: string | undefined;
    }
> {
    constructor(props: PropType);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        NormalisedConfig
    >;
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
