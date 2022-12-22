import React from "react";
export declare const createGenericComponentsOverrideContext: <T = {}>(
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
