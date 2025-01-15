import React from "react";

import SuperTokens from "../../superTokens";

import type { AllRecipeComponentOverrides } from "../../types";
import type { FC, PropsWithChildren } from "react";

export const createGenericComponentsOverrideContext = <T extends Record<string, unknown>>(
    v: T = {} as T,
    key: keyof AllRecipeComponentOverrides
) => {
    const genericContext = React.createContext<T>(v);

    const useComponentsOverrideContext = () => {
        const contextValue = React.useContext(genericContext);

        return { ...SuperTokens.getInstance()?.componentOverrides[key], ...contextValue };
    };

    const Provider: FC<PropsWithChildren<{ components: T }>> = ({ children, components }) => {
        return <genericContext.Provider value={components}>{children}</genericContext.Provider>;
    };

    return [useComponentsOverrideContext, Provider, genericContext.Consumer] as const;
};
