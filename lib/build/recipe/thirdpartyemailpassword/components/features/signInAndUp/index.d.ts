import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare class SignInAndUp extends PureComponent<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> {
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default SignInAndUp;
