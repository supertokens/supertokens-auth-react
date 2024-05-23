import { useState } from "react";
import * as reactRouterDom from "react-router-dom";
import { Routes } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { AuthRecipeComponentsOverrideContextProvider } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { getWebsiteBasePath } from "./utils";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { TenantSelector } from "./TenantSelector";

// We display this component as part of the SuperTokens login form to
// allow users to go back and select another tenant without logging in
const ChangeTenantsButton = ({ clearTenantChoice }) => {
    return (
        <div
            data-supertokens="link"
            className="tenant-link"
            onClick={() => {
                clearTenantChoice();
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
            <AuthRecipeComponentsOverrideContextProvider
                components={{
                    AuthPageFooter_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                                <ChangeTenantsButton
                                    clearTenantChoice={() => {
                                        localStorage.removeItem("tenantId");
                                        setHasSelectedTenantId(undefined);
                                    }}
                                />
                            </div>
                        );
                    },
                }}>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(
                        reactRouterDom,
                        [
                            ThirdPartyPreBuiltUI,
                            EmailPasswordPreBuiltUI,
                            PasswordlessPreBuiltUI,
                            EmailVerificationPreBuiltUI,
                        ],
                        getWebsiteBasePath()
                    )}
                </Routes>
            </AuthRecipeComponentsOverrideContextProvider>
        );
    } else {
        return <TenantSelector setHasSelectedTenantId={setHasSelectedTenantId} />;
    }
};
