module.exports = {
  default: {
    require: [
<<<<<<< HEAD
      'support/*.js',
      'step-definitions/**/*.js'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
=======
      'steps/**/*.js',
      'support/**/*.js'
    ],
<<<<<<< HEAD
  },

  api: {
    require: [
      'steps/api/**/*.js',
      'support/api.hooks.js'
    ],
  },

  ui: {
    require: [
      'steps/ui/**/*.js',
      'support/ui.hooks.js'
    ],
  },
=======
>>>>>>> staging
    paths: [
      'features/**/*.feature'
    ],
    publishQuiet: true
  }
<<<<<<< HEAD
};
=======
>>>>>>> staging
};
>>>>>>> staging
