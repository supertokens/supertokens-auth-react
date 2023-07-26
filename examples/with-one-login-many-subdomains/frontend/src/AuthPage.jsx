import { useState } from "react";
import * as reactRouterDom from "react-router-dom";
import { Routes } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { ThirdpartyEmailPasswordComponentsOverrideProvider } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdpartyPasswordlessComponentsOverrideProvider } from "supertokens-auth-react/recipe/thirdpartypasswordless";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { getWebsiteBasePath } from "./utils";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { TenantSelector } from "./TenantSelector";

// We display this component as part of the SuperTokens login form to
// allow users to go back and select another tenant without logging in
const ChangeTenantsButton = () => {
    return (
        <div
            data-supertokens="link"
            className="tenant-link"
            onClick={() => {
                localStorage.removeItem("tenantId");
                window.location.reload();
            }}>
            Log in to a different organisation
        </div>
    );
};

export const AuthPage = () => {
    const location = reactRouterDom.useLocation();
    const [hasSelectedTenantId, setHasSelectedTenantId] = useState(false);
    const tenantId = localStorage.getItem("tenantId") ?? undefined;
    const session = useSessionContext();

    if (session.loading === true) {
        return null;
    }

    if (
        hasSelectedTenantId ||
        tenantId !== undefined || // if we have a tenantId stored
        session.doesSessionExist === true || // or an active session (it'll contain the tenantId)
        new URLSearchParams(location.search).has("tenantId") // or we are on a link (e.g.: email verification) that contains the tenantId
    ) {
        return (
            <ThirdpartyEmailPasswordComponentsOverrideProvider
                components={{
                    EmailPasswordSignInFooter_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                                <ChangeTenantsButton />
                            </div>
                        );
                    },
                }}>
                <ThirdpartyPasswordlessComponentsOverrideProvider
                    components={{
                        PasswordlessSignInUpFooter_Override: ({ DefaultComponent, ...props }) => {
                            return (
                                <div>
                                    <DefaultComponent {...props} />
                                    <ChangeTenantsButton />
                                </div>
                            );
                        },
                    }}>
                    <Routes>
                        {getSuperTokensRoutesForReactRouterDom(
                            reactRouterDom,
                            [
                                ThirdPartyEmailPasswordPreBuiltUI,
                                ThirdPartyPasswordlessPreBuiltUI,
                                EmailVerificationPreBuiltUI,
                            ],
                            getWebsiteBasePath()
                        )}
                    </Routes>
                </ThirdpartyPasswordlessComponentsOverrideProvider>
            </ThirdpartyEmailPasswordComponentsOverrideProvider>
        );
    } else {
        return <TenantSelector setHasSelectedTenantId={setHasSelectedTenantId} />;
    }
};
