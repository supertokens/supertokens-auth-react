import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare class EmailVerification extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => Recipe;
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
