import React from "react";
declare type PropType = {
    requireAuth?: boolean;
    redirectToLogin: () => void;
};
declare type StateType =
    | {
          status: "LOADING";
      }
    | {
          status: "READY";
          userId: string;
          doesSessionExist: boolean;
          jwtPayload: any;
      };
export default class SessionAuth extends React.PureComponent<PropType, StateType> {
    constructor(props: PropType);
    redirectToLogin: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
export {};
