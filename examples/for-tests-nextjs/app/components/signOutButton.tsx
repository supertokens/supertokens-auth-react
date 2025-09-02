"use client";

import { useState } from "react";
import { signOut } from "supertokens-auth-react/recipe/session";
import { unprotectedAction } from "../actions/unprotectedAction";
import { ssrConfig } from "../config/ssr";

export const SignOutButton = () => {
    const onClick = async () => {
        await signOut();
    };

    return (
        <button data-testid="signOut" onClick={onClick}>
            Sing Out
        </button>
    );
};
