import type { EmailPasswordPreBuiltUI } from "../recipe/emailpassword/prebuiltui";
import type { EmailVerificationPreBuiltUI } from "../recipe/emailverification/prebuiltui";
import type { PasswordlessPreBuiltUI } from "../recipe/passwordless/prebuiltui";
import type { ThirdPartyPreBuiltUI } from "../recipe/thirdparty/prebuiltui";
import type { ThirdPartyEmailPasswordPreBuiltUI } from "../recipe/thirdpartyemailpassword/prebuiltui";
import type { ThirdPartyPasswordlessPreBuiltUI } from "../recipe/thirdpartypasswordless/prebuiltui";
export declare type ReactRouterDomWithCustomHistory = {
    router: {
        Route: any;
    };
    useHistoryCustom: () => any;
    useLocation: () => any;
};
export declare type PreBuiltRecipes = (
    | typeof ThirdPartyEmailPasswordPreBuiltUI
    | typeof ThirdPartyPreBuiltUI
    | typeof ThirdPartyPasswordlessPreBuiltUI
    | typeof EmailPasswordPreBuiltUI
    | typeof PasswordlessPreBuiltUI
    | typeof EmailVerificationPreBuiltUI
)[];
