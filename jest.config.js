module.exports = {
  roots: [
    '<rootDir>/src'
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node'
}
