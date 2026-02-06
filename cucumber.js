module.exports = {
  default: {
    require: [
      'step-definitions/**/*.js',
      'support/**/*.js'
    ],
    format: ['progress'],
    paths: ['features/**/*.feature'],
    publishQuiet: true,
    timeout: 20000
  }
};

//run - npm run bdd
