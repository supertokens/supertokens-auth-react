import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { ThirdPartySignInAndUpState } from "../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUp extends PureComponent<PropType, ThirdPartySignInAndUpState> {
    constructor(props: PropType);
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    signInAndUpClick: (providerId: string) => Promise<string | void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
