module.exports = {
  default: {
    require: [
<<<<<<< HEAD
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
=======
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
>>>>>>> staging
