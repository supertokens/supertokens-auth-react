import type { EmailPasswordPreBuiltUI } from "../recipe/emailpassword/prebuiltui";
import type { EmailVerificationPreBuiltUI } from "../recipe/emailverification/prebuiltui";
import type { MultiFactorAuthPreBuiltUI } from "../recipe/multifactorauth/prebuiltui";
import type { PasswordlessPreBuiltUI } from "../recipe/passwordless/prebuiltui";
import type { ThirdPartyPreBuiltUI } from "../recipe/thirdparty/prebuiltui";
import type { TOTPPreBuiltUI } from "../recipe/totp/prebuiltui";
export declare type ReactRouterDomWithCustomHistory = {
    router: {
        Route: any;
    };
    useHistoryCustom: () => any;
    useLocation: () => any;
};
export declare type PreBuiltRecipes = (
    | typeof ThirdPartyPreBuiltUI
    | typeof EmailPasswordPreBuiltUI
    | typeof PasswordlessPreBuiltUI
    | typeof EmailVerificationPreBuiltUI
    | typeof MultiFactorAuthPreBuiltUI
    | typeof TOTPPreBuiltUI
)[];
