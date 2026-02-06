const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/api',     
  testMatch: ['**/*.spec.js'], 
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  timeout: 30 * 1000,
});
