import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUp extends PureComponent<
    PropType,
    {
        status: "LOADING" | "READY";
    }
> {
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default SignInAndUp;
