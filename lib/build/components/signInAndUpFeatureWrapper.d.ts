import type Provider from "../recipe/thirdparty/providers";
import type { FC } from "react";
export declare const SignInAndUpFeatureWrapper: FC<{
    children: (providers: Provider[]) => JSX.Element;
    providers: Provider[];
}>;
