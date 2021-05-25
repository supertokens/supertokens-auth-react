import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import {
    NormalisedConfig,
    GetRedirectionURLContext,
    PreAPIHookContext,
    ThirdPartySignInAndUpState,
} from "../../../types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    constructor(props: FeatureBaseProps);
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
