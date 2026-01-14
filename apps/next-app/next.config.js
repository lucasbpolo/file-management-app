//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  webpack: (config, { isServer }) => {
    // Add path aliases for shared libraries
    // In production, use built files; in development, use source files
    const isProduction = process.env.NODE_ENV === 'production';
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@monorepo-app/shared-data': isProduction
        ? path.resolve(__dirname, '../../dist/libs/shared-data/src/index.js')
        : path.resolve(__dirname, '../../libs/shared-data/src/index.ts'),
      '@monorepo-app/file-management': isProduction
        ? path.resolve(__dirname, '../../dist/libs/file-management/src/index.js')
        : path.resolve(__dirname, '../../libs/file-management/src/index.ts'),
    };
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
