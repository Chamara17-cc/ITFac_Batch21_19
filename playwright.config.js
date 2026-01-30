const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:8080',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  retries: 1,
  timeout: 30 * 1000,
});
