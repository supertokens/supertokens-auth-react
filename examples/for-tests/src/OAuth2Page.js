import { AuthProvider, useAuth } from "react-oidc-context";
import { getApiDomain, getWebsiteDomain } from "./config";

// NOTE: For convenience, the same page/component handles both login initiation and callback.
// Separate pages for login and callback are not required.

const oidcConfig = {
    client_id: window.localStorage.getItem("oauth2-client-id"),
    authority: `${getApiDomain()}/auth`,
    response_type: "code",
    redirect_uri: `${getWebsiteDomain()}/oauth2/callback`,
    scope: "profile openid offline_access email",
    onSigninCallback: async (user) => {
        // Clears the response code and other params from the callback url
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};

function AuthPage() {
    const { signinRedirect, signoutSilent, user, error } = useAuth();

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>OAuth2 Login Test</h1>
            <div>
                {user ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <pre id="oauth2-token-data">{JSON.stringify(user.profile, null, 2)}</pre>
                        <button id="oauth2-logout-button" onClick={() => signoutSilent()}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {error && <p id="oauth2-error-message">Error: {error.message}</p>}
                        <button id="oauth2-login-button" onClick={() => signinRedirect()}>
                            Login With SuperTokens
                        </button>
                    </div>
                )}
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
