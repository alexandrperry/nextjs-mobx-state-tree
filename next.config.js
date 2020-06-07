const withFonts = require('next-fonts');
const path = require('path');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');
module.exports = withFonts({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: ['@svgr/webpack']
    });
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv()
    ];
    return config;
  },
  exportTrailingSlash: process.env.NODE_ENV === 'development' ? false : true,
  target: 'serverless'
});
