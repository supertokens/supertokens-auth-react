import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
    userContext?: any;
};
declare class SignInAndUpCallback extends PureComponent<PropType, unknown> {
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
