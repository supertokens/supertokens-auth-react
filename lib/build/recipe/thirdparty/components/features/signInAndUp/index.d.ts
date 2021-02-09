import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { ThirdPartySignInAndUpState } from "../../../types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    constructor(props: FeatureBaseProps);
    componentDidMount: () => Promise<void>;
    signInAndUpClick: (providerId: string) => Promise<string | void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
