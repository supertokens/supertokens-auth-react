/// <reference types="react" />
import type { UserContext } from "../../../../../types";
import type { SignInUpUserInputCodeFormProps } from "../../../types";
export declare const UserInputCodeFormScreen: React.FC<
    SignInUpUserInputCodeFormProps & {
        footer?: JSX.Element;
    }
>;
export declare const UserInputCodeForm: import("react").ComponentType<
    SignInUpUserInputCodeFormProps & {
        footer?: JSX.Element | undefined;
    }
>;
declare function UserInputCodeFormScreenWrapper(
    props: SignInUpUserInputCodeFormProps & {
        userContext: UserContext;
    }
): JSX.Element;
export default UserInputCodeFormScreenWrapper;
