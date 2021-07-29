import * as React from "react";
import CallAPIView from "./CallAPIView";

export default function SuccessView({ userId }: { userId: string }) {
    return (
        <div
            className="fill"
            style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold",
                color: "#333333",
                paddingTop: "10px",
                paddingBottom: "40px",
            }}>
            <span
                style={{
                    fontSize: "50px",
                }}>
                🥳🎉
            </span>
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
            <CallAPIView />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            ------------------------------------
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <div style={{ height: "10px" }} />
            <a
                href="https://github.com/supertokens/supertokens-auth-react/examples/with-typescript"
                target="_blank"
                rel="noreferrer">
                View the code on GitHub
            </a>
        </div>
    );
}
