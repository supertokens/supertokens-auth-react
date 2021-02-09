import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { ThirdPartySignInAndUpState } from "../../../types";
declare class SignInAndUpCallback extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    componentDidMount: () => Promise<void>;
    getOAuthCallbackError: (providerIdFromPath: string) => string | undefined;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
