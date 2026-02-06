// const { setWorldConstructor } = require('@cucumber/cucumber');
// const { chromium } = require('@playwright/test');

// class CustomWorld {
//   async init() {
//     this.browser = await chromium.launch({ headless: false });
//     this.context = await this.browser.newContext({
//       baseURL: 'http://localhost:8080'
//     });
//     this.page = await this.context.newPage();
//   }

//   async cleanup() {
//     await this.page.close();
//     await this.context.close();
//     await this.browser.close();
//   }
// }

// setWorldConstructor(CustomWorld);

const { setWorldConstructor } = require('@cucumber/cucumber');
const { request, chromium } = require('@playwright/test');
const { getAdminToken, getUserToken } = require('../utils/apiAuthHelper');

class CustomWorld {
  async init() {
    // Get tokens dynamically
    const adminToken = await getAdminToken();
    const userToken = await getUserToken();

    // UI setup
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
      baseURL: 'http://localhost:8080'
    });
    this.page = await this.context.newPage();

    // Admin API setup
    this.api = await request.newContext({
      baseURL: 'http://localhost:8080',
      extraHTTPHeaders: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    // User API setup
    this.userApi = await request.newContext({
      baseURL: 'http://localhost:8080',
      extraHTTPHeaders: {
        'Authorization': `Bearer ${userToken}`
      }
    });

    this.response = null;
  }

  async cleanup() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    if (this.api) await this.api.dispose();
    if (this.userApi) await this.userApi.dispose();
  }
}

setWorldConstructor(CustomWorld);