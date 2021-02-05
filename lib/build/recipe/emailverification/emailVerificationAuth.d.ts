import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
export default class EmailVerificationAuth extends PureComponent<FeatureBaseProps> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule;
    isEmailVerifiedAPI: () => Promise<boolean>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
