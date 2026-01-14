module.exports = {
  displayName: 'next-app',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  moduleNameMapper: {
    '^@monorepo-app/shared-data$':
      '<rootDir>/../../libs/shared-data/src/index.ts',
    '^@monorepo-app/file-management$':
      '<rootDir>/../../libs/file-management/src/index.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@tanstack/react-virtual))',
  ],
  coverageDirectory: '../../coverage/apps/next-app',
};
