const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  async init() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.baseUrl = 'http://localhost:8080';
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
