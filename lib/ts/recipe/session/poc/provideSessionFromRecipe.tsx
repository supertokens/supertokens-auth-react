import React from "react";
import { ProvideSession } from "./provideSession";
import { AuthenticationSource } from "./authenticationSource";

export const ProvideSessionFromRecipe: React.FC = ({ children }) => {
    // Todo: get recipe
    const recipe: AuthenticationSource = {} as any;

    return <ProvideSession source={recipe}>
        {children}
    </ProvideSession>;
};

