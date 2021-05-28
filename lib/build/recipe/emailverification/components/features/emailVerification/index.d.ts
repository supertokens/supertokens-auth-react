import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
};
declare class EmailVerification extends PureComponent<
    Prop,
    {
        token: string;
    }
> {
    constructor(props: Prop);
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
