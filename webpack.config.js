module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
  },
};

// const { createWebpackConfigAsync } = require('expo-yarn-workspaces/webpack');

// module.exports = async function(env, argv) {
//     const config = await createWebpackConfigAsync(env, argv);
//     return config;
// };