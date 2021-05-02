import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedThirdPartyEmailPasswordConfig } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext } from "../../..";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, import("../../../../emailpassword").EmailPasswordOnHandleEventContext, NormalisedThirdPartyEmailPasswordConfig>;
    getRecipeConfigOrThrow: () => NormalisedThirdPartyEmailPasswordConfig & NormalisedAuthRecipeConfig;
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default SignInAndUp;
