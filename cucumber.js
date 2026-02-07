module.exports = {
  default: {
    require: [
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
    paths: [
      'features/**/*.feature'
    ],
    publishQuiet: true
  }
>>>>>>> staging
};
