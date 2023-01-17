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
            session: "lib/ts/recipe/session/index.ts",
            emailverification: "lib/ts/recipe/emailverification/index.tsx",
            emailpassword: "lib/ts/recipe/emailpassword/index.ts",
            passwordless: "lib/ts/recipe/passwordless/index.ts",
            thirdparty: "lib/ts/recipe/thirdparty/index.ts",
            thirdpartyemailpassword: "lib/ts/recipe/thirdpartyemailpassword/index.ts",
            thirdpartypasswordless: "lib/ts/recipe/thirdpartypasswordless/index.ts",
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
                sourcemap: true,
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
