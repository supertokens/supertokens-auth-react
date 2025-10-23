"use client";

import { useState } from "react";
import { protectedAction } from "../actions/protectedAction";
import { init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export const ProtectedActionButton = () => {
    const [actionResult, setActionResult] = useState<{ status: string; userId?: string } | undefined>();
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button
                data-testid="getServerActionSession-button"
                onClick={async () => {
                    const result = await protectedAction();
                    setActionResult(result);
                }}
            >
                getServerActionSession
            </button>
            {actionResult ? (
                <div data-testid="getServerActionSession-result">
                    {actionResult?.status}:{actionResult?.userId}
                </div>
            ) : null}
            <button onClick={() => setActionResult(undefined)} data-testid="getServerActionSession-reset">
                Reset
            </button>
        </div>
    );
};
