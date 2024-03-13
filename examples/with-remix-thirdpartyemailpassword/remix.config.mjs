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

export const routes = async (defineRoutes) => {
  return defineRoutes((route) => {
    route("/auth/", "api.auth.$.tsx");
  });
};
