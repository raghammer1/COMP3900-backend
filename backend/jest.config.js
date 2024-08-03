module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
  transformIgnorePatterns: ['/node_modules/(?!(bson)/)'],

  transformIgnorePatterns: ['node_modules/(?!(chai|some-other-package)/)'],
};
