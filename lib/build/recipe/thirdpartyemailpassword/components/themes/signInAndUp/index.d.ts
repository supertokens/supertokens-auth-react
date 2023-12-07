/// <reference types="react" />
import type { UserContext } from "../../../../../types";
import type { ThirdPartyEmailPasswordSignInAndUpThemeProps } from "../../../types";
export default function SignInAndUpThemeWrapper(
    props: ThirdPartyEmailPasswordSignInAndUpThemeProps & {
        userContext?: UserContext;
    }
): JSX.Element;
