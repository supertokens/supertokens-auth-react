import SessionAuthWrapper from "../recipe/session/sessionAuth";

import type { PropsWithChildren } from "react";

export const SuperTokensWrapper: React.FC<
    PropsWithChildren<{
        userContext?: any;
    }>
> = (props) => {
    return <SessionAuthWrapper {...props} requireAuth={false} doRedirection={false} />;
};
