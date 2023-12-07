import SessionAuthWrapper from "../recipe/session/sessionAuth";

import type { UserContext } from "../types";
import type { PropsWithChildren } from "react";

export const SuperTokensWrapper: React.FC<
    PropsWithChildren<{
        userContext?: UserContext;
    }>
> = (props) => {
    return <SessionAuthWrapper {...props} requireAuth={false} doRedirection={false} />;
};
