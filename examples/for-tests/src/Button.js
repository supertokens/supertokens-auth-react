import React from "react";
export default function Logout({ onClick, label, className }) {
    return (
        <div
            className={className}
            style={{
                display: "flex",
                height: "70px",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingLeft: "75px",
                paddingRight: "75px"
            }}>
            <div
                onClick={onClick}
                style={{
                    display: "flex",
                    width: "116px",
                    height: "42px",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "bold"
                }}>
                {label}
            </div>
        </div>
    );
}
