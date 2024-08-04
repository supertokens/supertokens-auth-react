/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { useEffect, useRef } from "react";

import { useTranslation } from "../../../../translation/translationContext";

export type ProviderButtonProps = {
    providerName: string;
    displayName: string;
    logo?: JSX.Element;
};

export default function ProviderButton({ logo, providerName, displayName }: ProviderButtonProps) {
    const t = useTranslation();
    const providerStyleName = `provider${providerName}`;
    const textRef = useRef<HTMLDivElement>(null);
    const isTextOverflowing = (element: Element) => {
        return element.scrollWidth > element.clientWidth;
    };
    useEffect(() => {
        const textElement = textRef.current;
        if (textElement && isTextOverflowing(textElement)) {
            textElement.classList.add("scroll-text-animation");
        }

        const handleResize = () => {
            if (textElement) {
                if (isTextOverflowing(textElement)) {
                    textElement.classList.add("scroll-text-animation");
                } else {
                    textElement.classList.remove("scroll-text-animation");
                }
            }
        };
        addEventListener("resize", handleResize);
        return () => {
            removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <button data-supertokens={`button providerButton ${providerStyleName}`}>
            {logo !== undefined && (
                <div data-supertokens="providerButtonLeft">
                    <div data-supertokens="providerButtonLogo">
                        <div data-supertokens="providerButtonLogoCenter">{logo}</div>
                    </div>
                </div>
            )}
            <div data-supertokens="providerButtonText" ref={textRef}>
                <span>
                    {t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START")}
                    {displayName}
                    {t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END")}
                </span>
            </div>
        </button>
    );
}
