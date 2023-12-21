/// <reference types="react" />
import type { MFAProps } from "../../../types";
export declare enum MFAScreens {
    CloseTab = 0,
    EmailForm = 1,
    PhoneForm = 2,
    UserInputCodeForm = 3,
    AccessDenied = 4,
}
declare function MFAThemeWrapper(props: MFAProps): JSX.Element;
export default MFAThemeWrapper;
export declare function getActiveScreen(
    props: Pick<MFAProps, "featureState" | "contactMethod">
): MFAScreens.EmailForm | MFAScreens.PhoneForm | MFAScreens.UserInputCodeForm | MFAScreens.AccessDenied;
