const { Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAndGetToken } = require('../../../utils/apiUtils');

Given('user is authenticated via API', async function () {
  this.userToken = await loginAndGetToken('testuser', 'test123');
  expect(this.userToken).toBeTruthy();
});