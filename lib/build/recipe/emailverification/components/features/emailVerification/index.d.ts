import { PureComponent } from "react";
import { RecipeInterface } from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
};
declare class EmailVerification extends PureComponent<
    Prop,
    {
        status: "READY" | "LOADING";
        token: string | undefined;
    }
> {
    constructor(props: Prop);
    signOut: () => Promise<void>;
    getModifiedRecipeInterface: () => RecipeInterface;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
