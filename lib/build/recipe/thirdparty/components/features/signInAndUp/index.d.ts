import * as React from "react";
import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { ThirdPartySignInAndUpState, RecipeInterface } from "../../../types";
import Recipe from "../../../recipe";
import { SessionContextType } from "../../../../session";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUp extends PureComponent<PropType, ThirdPartySignInAndUpState> {
    static contextType: React.Context<SessionContextType>;
    constructor(props: PropType);
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    getModifiedRecipeImplementation: () => RecipeInterface;
    render: () => JSX.Element;
}
export default SignInAndUp;
