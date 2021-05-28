import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
export default class EmailVerificationAuth extends PureComponent<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> {
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
