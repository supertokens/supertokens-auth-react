import { PropsWithChildren } from "react";
import SessionAuthWrapper from "../recipe/session/sessionAuth";

export const SuperTokensWrapper: React.FC<
    PropsWithChildren<{
        userContext?: any;
    }>
> = (props) => {
    return <SessionAuthWrapper {...props} requireAuth={false} doRedirection={false} />;
};
