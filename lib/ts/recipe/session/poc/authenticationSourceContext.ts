import React from "react";
import { AuthenticationSource } from "./authenticationSource";

export const AuthenticationSourceContext = React.createContext<AuthenticationSource>({
    addListener(): () => void {
        throw new Error("This is a default AuthenticationSource. It means that you didn't use ProvideSession");
    }
});
