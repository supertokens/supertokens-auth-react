import React from "react";
import { FeatureBaseProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
export default class SessionAuth<T, S, R, N> extends React.PureComponent<FeatureBaseProps & {
    requireAuth?: boolean;
}, {
    status: "LOADING";
} | {
    status: "READY";
    userId: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<T, S, R, N>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
