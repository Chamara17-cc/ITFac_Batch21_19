const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

class CustomWorld {
  async init() {
    this.browser = await chromium.launch({ headless: false });

    this.context = await this.browser.newContext({
      baseURL: 'http://localhost:8080'
    });

    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
