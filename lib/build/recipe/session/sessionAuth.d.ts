import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import { SessionAuthState } from "./types";
import AuthRecipeModule from "../authRecipeModule";
export default class SessionAuth<T, S, R, N> extends PureComponent<FeatureBaseProps, SessionAuthState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<T, S, R, N>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
