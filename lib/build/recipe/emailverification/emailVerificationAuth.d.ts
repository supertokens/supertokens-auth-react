import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
export default class EmailVerificationAuth extends PureComponent<FeatureBaseProps> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<unknown, unknown, unknown>;
    isEmailVerifiedAPI: () => Promise<boolean>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
