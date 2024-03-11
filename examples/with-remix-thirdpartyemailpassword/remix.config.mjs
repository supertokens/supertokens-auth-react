/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
};

export const routes = async (defineRoutes) => {
  return defineRoutes((route) => {
    route("/auth/", "api.auth.$.tsx");
  });
};
