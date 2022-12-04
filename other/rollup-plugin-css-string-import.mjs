import { createFilter } from "rollup-pluginutils";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";

export default function importCssString(opts = {}) {
    if (!opts.include) {
        opts.include = "**/*.css";
    }

    const filter = createFilter(opts.include, opts.exclude);
    const postcssInstance = postcss([postcssImport(), postcssPresetEnv(opts.postcssPresetEnv)]);

    return {
        name: "css-string-import",

        async transform(code, id) {
            if (filter(id)) {
                const rendered = await postcssInstance.process(code, { from: id });

                return {
                    code: `export default ${JSON.stringify(rendered.css.toString())};`,
                    map: { mappings: "" },
                };
            }
        },
    };
}
