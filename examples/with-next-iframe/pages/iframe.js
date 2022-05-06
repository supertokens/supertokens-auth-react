import React from "react";
import { websiteDomain } from "../config/appInfo";

export default function iframe() {
    return (
        <iframe
            src={websiteDomain + "/auth"}
            style={{
                width: "600px",
                height: "600px",
            }}
        />
    );
}
