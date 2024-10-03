import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import { visualizer } from "rollup-plugin-visualizer";
import importCssString from "./other/rollup-plugin-css-string-import.mjs";

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: {
            index: "lib/ts/index.ts",
            "ui-entry": "lib/ts/ui/index.tsx",
            session: "lib/ts/recipe/session/index.ts",
            sessionprebuiltui: "lib/ts/recipe/session/prebuiltui.tsx",
            emailverification: "lib/ts/recipe/emailverification/index.ts",
            emailverificationprebuiltui: "lib/ts/recipe/emailverification/prebuiltui.tsx",
            emailpassword: "lib/ts/recipe/emailpassword/index.ts",
            emailpasswordprebuiltui: "lib/ts/recipe/emailpassword/prebuiltui.tsx",
            passwordless: "lib/ts/recipe/passwordless/index.ts",
            passwordlessprebuiltui: "lib/ts/recipe/passwordless/prebuiltui.tsx",
            oauth2provider: "lib/ts/recipe/oauth2provider/index.ts",
            oauth2providerprebuiltui: "lib/ts/recipe/oauth2provider/prebuiltui.tsx",
            thirdparty: "lib/ts/recipe/thirdparty/index.ts",
            thirdpartyprebuiltui: "lib/ts/recipe/thirdparty/prebuiltui.tsx",
            multitenancy: "lib/ts/recipe/multitenancy/index.ts",
            multifactorauth: "lib/ts/recipe/multifactorauth/index.ts",
            multifactorauthprebuiltui: "lib/ts/recipe/multifactorauth/prebuiltui.tsx",
            totp: "lib/ts/recipe/totp/index.ts",
            totpprebuiltui: "lib/ts/recipe/totp/prebuiltui.tsx",
            userroles: "lib/ts/recipe/userroles/index.ts",
        },
        plugins: [
            external(),
            resolve(),
            json(),
            commonjs({
                defaultIsModuleExports: "auto",
            }),
            typescript({ tsconfig: "./lib/tsconfig.json" }), // so Rollup can convert TypeScript to JavaScript
            importCssString(),
            visualizer(),
        ],
        output: [
            {
                dir: "lib/build",
                format: "commonjs",
                interop: "auto",
                sourcemap: false,
                chunkFileNames: (chunkInfo) => {
                    const root = chunkInfo.moduleIds[chunkInfo.moduleIds.length - 1];
                    const recipeMatch = root.match(/\/lib\/ts\/recipe\/(\w+)\/\w+.tsx?/);
                    if (recipeMatch) {
                        return recipeMatch[1] + "-shared.js";
                    }
                    return chunkInfo.name + ".js";
                },
            },
        ],
    },
];
