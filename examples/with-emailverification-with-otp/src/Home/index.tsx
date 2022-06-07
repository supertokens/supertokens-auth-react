import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";

export default function Home() {
    const { userId } = useSessionContext();

    async function signOutUser() {
        await signOut();
        window.location.reload();
    }
    return (
        <div
            className="fill"
            style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "30px",
                color: "#333333",
                paddingTop: "15%",
                paddingBottom: "40px",
            }}>
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            Login successful
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            Your user ID is
            <div />
            {userId}
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <button
                style={{
                    marginTop: "32px",
                    padding: "8px 12px",
                    fontSize: "18px",
                    fontWeight: "700",
                    borderRadius: "8px",
                    border: "1px solid ",
                }}
                onClick={signOutUser}>
                Sign Out
            </button>
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            ------------------------------------
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
        </div>
    );
}
