/// <reference types="react" />
import type { UserContext } from "../../../../../types";
import type { LinkSentThemeProps } from "../../../types";
export declare const LinkSent: import("react").ComponentType<LinkSentThemeProps>;
declare function LinkSentWrapper(
    props: LinkSentThemeProps & {
        userContext: UserContext;
    }
): JSX.Element;
export default LinkSentWrapper;
