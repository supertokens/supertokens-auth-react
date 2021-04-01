import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
import { NormalisedThirdPartyConfig, ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartySignInAndUpState } from "../../../types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, import("../../../../authRecipeModule/types").AuthRecipeModuleOnHandleEventContext, NormalisedThirdPartyConfig>;
    getRecipeConfigOrThrow: () => NormalisedThirdPartyConfig & NormalisedAuthRecipeConfig;
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    signInAndUpClick: (providerId: string) => Promise<string | void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
