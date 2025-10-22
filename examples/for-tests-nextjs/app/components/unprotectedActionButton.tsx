"use client";

import { useState } from "react";
import { unprotectedAction } from "../actions/unprotectedAction";
import { ensureSessionAndCall, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export const UnprotectedActionButton = () => {
    const [actionResult, setActionResult] = useState<string | undefined>();

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button
                onClick={async (e) => {
                    // The wrapper function ensures that the user is authenticated before calling the server action
                    const result = await ensureSessionAndCall(unprotectedAction);
                    setActionResult(result);
                }}
                data-testid="ensureSessionAndCall-button">
                ensureSessionAndCall
            </button>
            <div data-testid="ensureSessionAndCall-result">{actionResult}</div>
            <button onClick={() => setActionResult(undefined)} data-testid="ensureSessionAndCall-reset">
                Reset
            </button>
        </div>
    );
};
