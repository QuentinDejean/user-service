module.exports = {
  collectCoverageFrom: ['src/**/*.js', '!<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
