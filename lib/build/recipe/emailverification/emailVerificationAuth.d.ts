import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
};
export default class EmailVerificationAuth extends PureComponent<
    Prop,
    {
        status: "LOADING" | "READY";
    }
> {
    constructor(props: Prop);
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
export {};
