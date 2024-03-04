/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};

export const routes = async (defineRoutes) => {
  return defineRoutes((route) => {
    route("/auth/", "api.auth.$.tsx");
  });
};
