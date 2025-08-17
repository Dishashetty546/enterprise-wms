module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'], // if you have setup file
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
}
