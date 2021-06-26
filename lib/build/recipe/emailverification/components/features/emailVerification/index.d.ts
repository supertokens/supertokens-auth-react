import * as React from "react";
import { PureComponent } from "react";
import { RecipeInterface } from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { SessionContextType } from "../../../../session";
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
    static contextType: React.Context<SessionContextType>;
    constructor(props: Prop);
    signOut: () => Promise<void>;
    getModifiedRecipeInterface: () => RecipeInterface;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
