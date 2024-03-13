/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  browserNodeBuiltinsPolyfill: {
    modules: { punycode: true, zlib: true, querystring: true, util: true, buffer: true },
    globals: {
      Buffer: true,
    },
  }
};