import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class ResetPasswordUsingToken extends PureComponent<
    PropType,
    {
        token: string | undefined;
        error: string | undefined;
    }
> {
    constructor(props: PropType);
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
