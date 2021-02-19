/// <reference types="react" />
export default function Header({ status, toggleStatus }: {
    status: "SIGN_IN" | "SIGN_UP";
    toggleStatus: (status: "SIGN_IN" | "SIGN_UP") => void;
}): JSX.Element;
