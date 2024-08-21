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

export default function ProviderButton({ logo, providerName, displayName }: ProviderButtonProps): React.ReactElement {
    const t = useTranslation();
    const providerStyleName = `provider${providerName}`;
    const buttonTextContainerRef = useRef<HTMLDivElement>(null);
    const buttonTextRef = useRef<HTMLSpanElement>(null);
    const SCROLL_ANIMATION_CLASS = "scroll-text-animation";

    const isTextOverflowing = (element: Element) => {
        return element.scrollWidth > element.clientWidth;
    };

    function startAnimation() {
        const buttonTextContainer = buttonTextContainerRef.current;
        const buttonText = buttonTextRef.current;
        const BUFFER = 10;

        if (!buttonTextContainer || !buttonText || !buttonTextContainer.classList.contains(SCROLL_ANIMATION_CLASS)) {
            return;
        }

        const keyframes = [
            { transform: "translateX(0px)" },
            {
                transform: `translateX(-${
                    buttonTextContainer.scrollWidth - buttonTextContainer.clientWidth + BUFFER
                }px)`,
            },
        ];
        const options: KeyframeAnimationOptions = {
            duration: 3000,
            iterations: 1,
        };
        buttonText.style.display = "inline-block";
        buttonText.animate(keyframes, options);
    }

    const stopAnimation = () => {
        const buttonText = buttonTextRef.current;
        if (!buttonText) {
            return;
        }
        buttonText.getAnimations().forEach((animation) => animation.cancel());
    };
    useEffect(() => {
        const buttonTextContainer = buttonTextContainerRef.current;
        if (buttonTextContainer && isTextOverflowing(buttonTextContainer)) {
            buttonTextContainer.classList.add(SCROLL_ANIMATION_CLASS);
        }

        const handleResize = () => {
            if (buttonTextContainer) {
                if (isTextOverflowing(buttonTextContainer)) {
                    buttonTextContainer.classList.add(SCROLL_ANIMATION_CLASS);
                } else {
                    buttonTextContainer.classList.remove(SCROLL_ANIMATION_CLASS);
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
            <div data-supertokens="providerButtonText" ref={buttonTextContainerRef}>
                <span onMouseEnter={() => startAnimation()} onMouseLeave={() => stopAnimation()} ref={buttonTextRef}>
                    {t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START")}
                    {displayName}
                    {t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END")}
                </span>
            </div>
        </button>
    );
}
