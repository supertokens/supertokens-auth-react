import * as React from "react";
import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { SessionContextType } from "../../../../session";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
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
    onTokenInvalidRedirect: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
    onContinueClicked: () => Promise<void>;
    modifiedRecipeImplementation: RecipeInterface;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
