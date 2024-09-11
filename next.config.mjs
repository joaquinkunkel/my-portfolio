/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Find the rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    // Exclude SVGs from the file loader
    fileLoaderRule.exclude = /\.svg$/;

    // Add a new rule to handle SVGs with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
