const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { initApi, closeApi } = require('../utils/apiUtils');

Before(async function () {
  // API
  await initApi();

  // UI
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext({
    baseURL: 'http://localhost:8080',
  });
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
  await closeApi();
});