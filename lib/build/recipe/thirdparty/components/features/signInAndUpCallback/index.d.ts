import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { UserContextContext } from "../../../../../usercontext";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUpCallback extends PureComponent<PropType, unknown> {
    static contextType: typeof UserContextContext;
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
