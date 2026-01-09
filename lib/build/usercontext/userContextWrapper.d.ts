import React from "react";
import type { UserContext } from "../types";
export default function UserContextWrapper(props: {
    children: React.ReactNode;
    userContext?: UserContext;
}): JSX.Element;
