module.exports = {
  default: {
    require: [
      'steps/**/*.js',
      'support/**/*.js'
    ],
    paths: [
      'features/**/*.feature'
    ],
    publishQuiet: true
  }
};
