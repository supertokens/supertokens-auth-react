import { useState } from "react";

// This is a index route. Here we accept the Tenant ID to be used for the login.
export default function Index() {
    const [tenant, setTenant] = useState("");

    function handleClick(e: any) {
        e.preventDefault();
        // We store the tenant ID entered by user to the local storage, which will be later used by
        // the Supertokens Auth components, as described in the `src/index.tsx` file
        window.localStorage.setItem("tenant", tenant);
        // We redirect the user to the auth page provided by the Supertokens Auth React SDK
        window.location.href = `http://localhost:3000/auth`;
    }

    return (
        <div className="home">
            <main className="auth">
                <h1>Proceed to Login</h1>
                <div className="tenant-input">
                    <input
                        type="text"
                        placeholder="tenant-id"
                        value={tenant}
                        onChange={(e) => setTenant(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: "24px" }}>
                    <a href="#" className="btn" onClick={handleClick}>
                        Login
                    </a>
                </div>
            </main>
        </div>
    );
}
