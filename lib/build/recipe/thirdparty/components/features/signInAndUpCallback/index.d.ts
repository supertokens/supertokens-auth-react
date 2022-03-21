/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUpCallback extends PureComponent<PropType, unknown> {
    static contextType: import("react").Context<any>;
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
