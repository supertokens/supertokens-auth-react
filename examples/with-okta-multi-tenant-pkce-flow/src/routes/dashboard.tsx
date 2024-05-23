import { signOut } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";

// This route is accessible only to logged in users
// JWT payload can be inspected using the utility - https://jwt.io/
// We can find the TenantID added to the jwt payload as described in the API server code
export default function Dashboard() {
    async function onLogout() {
        await signOut();
        window.location.href = "http://localhost:3000";
    }

    let sessionContext = Session.useSessionContext();

    if (sessionContext.loading) {
        return null;
    }

    return (
        <div className="home">
            <main className="dashboard">
                <h1>Dashboard</h1>
                <pre style={{ textAlign: "left" }}>{sessionContext.accessTokenPayload.jwt}</pre>
                <a href="#" onClick={onLogout} className="btn">
                    Logout
                </a>
            </main>
        </div>
    );
}
