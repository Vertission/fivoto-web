const withPlugins = require('next-compose-plugins');
const images = require('next-images');

const nextConfig = {
  distDir: 'build',
};

module.exports = withPlugins([images], nextConfig);
