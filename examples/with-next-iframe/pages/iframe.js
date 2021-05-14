import React from "react";
import { websiteDomain } from "../config/supertokensConfig";

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
