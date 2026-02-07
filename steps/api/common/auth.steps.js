const { Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAndGetToken } = require('../../../utils/apiUtils');

Given('admin is authenticated via API', async function () {
  this.token = await loginAndGetToken('admin', 'admin123');
  expect(this.token).toBeTruthy();
});