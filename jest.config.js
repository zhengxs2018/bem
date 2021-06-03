// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const pkg = require('./package.json')

/**
 * @type {import('@jest/types/build/Config').ProjectConfig}
 */
module.exports = {
  name: pkg.name,
  preset: 'ts-jest',
  testPathIgnorePatterns: ['node_modules', 'cypress'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
}
