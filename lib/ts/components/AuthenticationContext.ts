import React from "react";
import { Authentication } from "supertokens-website/lib/ts/Authentication";

export const AuthenticationContext = React.createContext<Authentication | undefined>(undefined);
