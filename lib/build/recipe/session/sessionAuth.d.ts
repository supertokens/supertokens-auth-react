import React from "react";
import { FeatureBaseOptionalRidProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
export default class SessionAuth<T, S, R, N> extends React.PureComponent<FeatureBaseOptionalRidProps & {
    requireAuth?: boolean;
}, {
    status: "LOADING";
} | {
    status: "READY";
    userId: string;
    doesSessionExist: boolean;
    jwtPayload: any;
}> {
    constructor(props: FeatureBaseOptionalRidProps & {
        requireAuth?: boolean;
    });
    getRecipeInstanceOrThrow: () => AuthRecipeModule<T, S, R, N>;
    redirectToLogin: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
