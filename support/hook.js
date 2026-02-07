const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { initApi, closeApi } = require('../utils/apiUtils');

Before(async function () {
  // API
  await initApi();

  // UI (Cucumber only)
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext({
    baseURL: 'http://localhost:8080',
  });
  this.page = await this.context.newPage();
});

After(async function () {
  // ✅ Close page first
  if (this.page && !this.page.isClosed()) {
    await this.page.close();
  }

  // ✅ Close context
  if (this.context) {
    await this.context.close();
  }

  // ✅ Close browser LAST
  if (this.browser) {
    await this.browser.close();
  }

  // API cleanup
  await closeApi();
});