import { PropsWithChildren } from "react";
import UserContextWrapper from "../usercontext/userContextWrapper";
import SessionAuthWrapper, { SessionAuthProps } from "../recipe/session/sessionAuth";

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
