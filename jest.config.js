/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  "collectCoverge": true,
  "collectCoverageFrom": [
    "./src/**/*.js",
    "!./src/**/serviceToService.js",
    "!./src/static/**",
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'dist',
    'node_moduels',
  ]
};