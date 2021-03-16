import { PureComponent } from "react";
import { FeatureBaseProps } from "../../types";
import { SessionAuthState } from "./types";
import AuthRecipeModule from "../authRecipeModule";
export default class SessionAuth extends PureComponent<FeatureBaseProps, SessionAuthState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<unknown, unknown, unknown>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
//# sourceMappingURL=sessionAuth.d.ts.map