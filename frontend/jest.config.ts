export default {
  testResultsProcessor: 'jest-sonar-reporter',
  setupFiles: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
    'vee-validate/dist/rules': 'ts-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vee-validate/dist/rules)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue',
    '<rootDir>/src/middleware/**/*.ts',
    '<rootDir>/src/store/**/*.ts',
  ],
  testEnvironment: 'jest-environment-jsdom',
}
