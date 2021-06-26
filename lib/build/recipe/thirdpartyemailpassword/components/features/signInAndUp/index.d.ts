import * as React from "react";
import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { SessionContextType } from "../../../../session";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SignInAndUp extends PureComponent<
    PropType,
    {
        status: "LOADING" | "READY";
    }
> {
    static contextType: React.Context<SessionContextType>;
    constructor(props: PropType);
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
    componentDidMount: () => Promise<void>;
}
export default SignInAndUp;
