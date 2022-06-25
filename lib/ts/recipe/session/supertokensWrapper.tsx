import { PropsWithChildren } from "react";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import SessionAuthWrapper, { SessionAuthProps } from "./sessionAuth";

export const SuperTokensWrapper: React.FC<
    PropsWithChildren<
        SessionAuthProps & {
            userContext?: any;
        }
    >
> = (props) => {
    return (
        <UserContextWrapper userContext={props.userContext}>
            <SessionAuthWrapper {...props} />
        </UserContextWrapper>
    );
};
