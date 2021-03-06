module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!**/*d.ts',
    '!**/*index.ts'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/cypress'
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@data/(.*)$': '<rootDir>/src/data/$1',
    '@domain/(.*)$': '<rootDir>/src/domain/$1',
    '@main/(.*)$': '<rootDir>/src/main/$1',
    '\\.scss$': 'identity-obj-proxy',
    '@validation/(.*)$': '<rootDir>/src/validation/$1',
    '@tests/(.*)': '<rootDir>/tests/$1'
  },
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  }
}
