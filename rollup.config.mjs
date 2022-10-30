import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";
import css from "rollup-plugin-import-css";
import { visualizer } from "rollup-plugin-visualizer";

const m = new Map();

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
            commonjs(),
            json(),
            typescript({ tsconfig: "./lib/tsconfig.json",  }), // so Rollup can convert TypeScript to JavaScript
            styles({
                mode: "emit",
            }),
            css(),
            // terser(),
            visualizer(),
        ],
        output: [
            {
                dir: "lib/build",
                format: "commonjs",
                sourcemap: true,
                chunkFileNames: (chunkInfo) => {
                    const root = chunkInfo.moduleIds[chunkInfo.moduleIds.length - 1];
                    const recipeMatch = root.match(/\/lib\/ts\/recipe\/(\w+)\/\w+.tsx?/);
                    if (recipeMatch) {
                        return recipeMatch[1] + "-shared.js";
                    }
                    return chunkInfo.name + ".js";
                },
                manualChunks(id) {
                    if (id.includes("lib/ts/components/assets")) {
                        return "assets";
                    }
                    if (id.includes("lib/ts/recipe/authRecipe")) {
                        return "authRecipe";
                    }
                    // if (id.includes("lib/ts/translation")) {
                    //     return "translation";
                    // }
                },
            },
        ],
    },
];
