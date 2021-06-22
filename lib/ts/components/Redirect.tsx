import React from "react";

type Props = {
    fn: () => void;
};

export const Redirect: React.FC<Props> = ({ fn }) => {
    fn();

    return null;
};
