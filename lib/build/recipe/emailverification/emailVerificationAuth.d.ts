/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
import { SessionContextType } from "../session/types";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
};
export default class EmailVerificationAuth extends PureComponent<
    Prop,
    {
        status: "LOADING" | "READY";
    }
> {
    static contextType: import("react").Context<SessionContextType>;
    constructor(props: Prop);
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
export {};
