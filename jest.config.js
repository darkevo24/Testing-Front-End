module.exports = {
  setupFiles: ['./src/setupTests.js'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  coverageReporters: ['cobertura', 'text-summary'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
  },
  modulePathIgnorePatterns: ['./src/assets/', './src/styles/', '<rootDir>/node_modules/', '<rootDir>/public/'],
  testPathIgnorePatterns: ['./src/assets/', './src/styles/', '<rootDir>/node_modules/', '<rootDir>/public/'],
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/assets/',
    '!./src/styles/',
    '!<rootDir>/node_modules/',
    '!<rootDir>/public/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
