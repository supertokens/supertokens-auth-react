import { AuthProvider, useAuth } from "react-oidc-context";
import { getApiDomain, getWebsiteDomain } from "./config";

// NOTE: For convenience, the same page/component handles both login initiation and callback.
// Separate pages for login and callback are not required.

const scopes = window.localStorage.getItem("oauth2-scopes") ?? "profile openid offline_access email";
const extraConfig = JSON.parse(window.localStorage.getItem("oauth2-extra-config") ?? "{}");
const extraSignInParams = JSON.parse(window.localStorage.getItem("oauth2-extra-sign-in-params") ?? "{}");
const extraSignOutParams = JSON.parse(window.localStorage.getItem("oauth2-extra-sign-out-params") ?? "{}");

const oidcConfig = {
    client_id: window.localStorage.getItem("oauth2-client-id"),
    authority: `${getApiDomain()}/auth`,
    response_type: "code",
    redirect_uri: `${getWebsiteDomain()}/oauth/callback`,
    scope: scopes ? scopes : "profile openid offline_access email",
    ...extraConfig,
    onSigninCallback: async (user) => {
        // Clears the response code and other params from the callback url
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};

function AuthPage() {
    const { signinRedirect, signinSilent, signoutSilent, signoutRedirect, user, error } = useAuth();

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>OAuth2 Login Test</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {error && <p id="oauth2-error-message">Error: {error.message}</p>}
                {user && (
                    <>
                        <pre id="oauth2-token-data">{JSON.stringify(user.profile, null, 2)}</pre>
                        <button id="oauth2-logout-button" onClick={() => signoutSilent(extraSignOutParams)}>
                            Logout
                        </button>
                        <button id="oauth2-logout-button-redirect" onClick={() => signoutRedirect(extraSignOutParams)}>
                            Logout (Redirect)
                        </button>
                    </>
                )}
                <button id="oauth2-login-button" onClick={() => signinRedirect(extraSignInParams)}>
                    Login With SuperTokens
                </button>
                <button id="oauth2-login-button-silent" onClick={() => signinSilent(extraSignInParams)}>
                    Login With SuperTokens (silent)
                </button>
                <button
                    id="oauth2-login-button-prompt-login"
                    onClick={() =>
                        signinRedirect({
                            prompt: "login",
                            ...extraSignInParams,
                        })
                    }>
                    Login With SuperTokens (prompt=login)
                </button>
                <button
                    id="oauth2-login-button-max-age-3"
                    onClick={() =>
                        signinRedirect({
                            max_age: 3,
                            ...extraSignInParams,
                        })
                    }>
                    Login With SuperTokens (max_age=3)
                </button>
                <button
                    id="oauth2-login-button-prompt-none"
                    onClick={() =>
                        signinRedirect({
                            prompt: "none",
                            ...extraSignInParams,
                        })
                    }>
                    Login With SuperTokens (prompt=none)
                </button>
            </div>
        </div>
    );
}

export default function OAuth2Page() {
    return (
        <AuthProvider {...oidcConfig}>
            <AuthPage />
        </AuthProvider>
    );
}
