import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedThirdPartyConfig, ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartySignInAndUpState } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
declare class SignInAndUpCallback extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, import("../../../../authRecipeModule/types").AuthRecipeModuleOnHandleEventContext, NormalisedThirdPartyConfig>;
    getRecipeConfigOrThrow: () => NormalisedThirdPartyConfig & NormalisedAuthRecipeConfig;
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    getOAuthCallbackError: (providerIdFromPath: string) => string | undefined;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
