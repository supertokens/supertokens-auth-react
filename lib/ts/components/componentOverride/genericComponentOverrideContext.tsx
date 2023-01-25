import React from "react";

import type { FC, PropsWithChildren } from "react";

export const createGenericComponentsOverrideContext = <T extends Record<string, unknown>>(v: T = {} as T) => {
    const genericContext = React.createContext<T>(v);

    const useComponentsOverrideContext = () => {
        return React.useContext(genericContext);
    };

    const Provider: FC<PropsWithChildren<{ components: T }>> = ({ children, components }) => {
        return <genericContext.Provider value={components}>{children}</genericContext.Provider>;
    };

    return [useComponentsOverrideContext, Provider, genericContext.Consumer] as const;
};
