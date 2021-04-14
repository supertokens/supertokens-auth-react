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
    doesSessionExist: boolean;
    jwtPayload: any;
}> {
    constructor(props: FeatureBaseProps & {
        requireAuth?: boolean;
    });
    getRecipeInstanceOrThrow: () => AuthRecipeModule<T, S, R, N>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
