module.exports = {
  testEnvironment: 'jsdom', // Make sure this is set
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
};
