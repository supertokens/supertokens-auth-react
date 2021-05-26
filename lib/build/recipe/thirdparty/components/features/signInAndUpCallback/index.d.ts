import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, ThirdPartySignInAndUpState } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare class SignInAndUpCallback extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<GetRedirectionURLContext, PreAPIHookContext, import("../../../../authRecipeModule/types").OnHandleEventContext, NormalisedConfig>;
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    getOAuthCallbackError: (providerIdFromPath: string) => string | undefined;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
