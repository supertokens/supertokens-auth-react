import * as React from "react";
export default function Footer() {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                minHeight: "80px",
                backgroundColor: "#000000",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                color: "#ffffff",
                fontWeight: "bold",
            }}>
            React Demo app. Made with{" "}
            <span role="img" aria-labelledby="love">
                ❤️
            </span>{" "}
            using SuperTokens.io
        </div>
    );
}
