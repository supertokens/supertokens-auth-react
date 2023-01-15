import React from "react";
export declare const createGenericComponentsOverrideContext: <T extends Record<string, unknown>>(
    v?: T
) => readonly [
    () => T,
    React.FC<
        React.PropsWithChildren<{
            components: T;
        }>
    >,
    React.Consumer<T>
];
