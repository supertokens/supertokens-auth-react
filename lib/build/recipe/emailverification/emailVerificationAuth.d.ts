import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
export default class EmailVerificationAuth<T, S, R, N> extends PureComponent<FeatureBaseProps> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<T, S, R, N>;
    isEmailVerifiedAPI: () => Promise<boolean>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
