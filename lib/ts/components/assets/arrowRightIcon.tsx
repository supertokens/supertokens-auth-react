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

/*
 * Imports.
 */

/*
 * Component.
 */

export default function ArrowRightIcon({ color }: { color: string }): JSX.Element {
    return (
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.62713 3.24407C6.08759 3.64284 6.08759 4.35716 5.62713 4.75593L2.15465 7.76318C1.50701 8.32406 0.5 7.864 0.5 7.00725L0.5 0.992749C0.5 0.135997 1.50701 -0.324056 2.15465 0.23682L5.62713 3.24407Z"
                fill={`${color}`}
            />
        </svg>
    );
}
