module.exports = function override(config, env) {
    // Add polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
      querystring: require.resolve('querystring-es3'),
      os: require.resolve('os-browserify/browser'),
    };
  
    return config;
  };
  