/// <reference types="react" />
import type { TOTPMFAProps } from "../../../types";
export declare enum TOTPMFAScreens {
    DeviceSetup = 0,
    CodeVerification = 1,
    Loading = 2,
    Blocked = 3,
    AccessDenied = 4,
}
declare function TOTPMFAThemeWrapper(props: TOTPMFAProps): JSX.Element;
export default TOTPMFAThemeWrapper;
export declare function getActiveScreen(props: Pick<TOTPMFAProps, "featureState" | "config">): TOTPMFAScreens;
