/// <reference types="react" />
export default function ThirdPartyAuthWrapper({ children, requireAuth, }: {
    children: JSX.Element;
    requireAuth?: boolean;
}): JSX.Element;
