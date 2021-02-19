import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedThirdPartyEmailPasswordConfig } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext } from "../../..";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, {
    status: "SIGN_IN" | "SIGN_UP";
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, import("../../../../emailpassword/types").EmailPasswordOnHandleEventContext>;
    getRecipeConfigOrThrow: () => NormalisedThirdPartyEmailPasswordConfig & NormalisedAuthRecipeConfig;
    getIsEmbedded: () => boolean;
    toggleStatus: (status: "SIGN_IN" | "SIGN_UP") => void;
    render: () => JSX.Element;
}
export default SignInAndUp;
