module.exports = {
  roots: [
    '<rootDir>/src'
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**', '!**/test/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node'
}
