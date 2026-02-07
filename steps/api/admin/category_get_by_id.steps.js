const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, closeApi, loginAndGetToken, get } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let apiResponse;

Given('I am logged in as an admin via API', async function () {
  await initApi();
  this.adminToken = await loginAndGetToken('admin', 'admin123');
  expect(this.adminToken).not.toBeNull();
});

When('I send a GET request via API to {string}', async function (endpoint) {
  apiResponse = await get(endpoint, this.adminToken);
  this.apiResponse = apiResponse;
});

Then('the response status should be {int}', async function (statusCode) {
  expect(this.apiResponse.status).toBe(statusCode);
});

Then('the response should have {string} with value {int}', async function (key, value) {
  expect(this.apiResponse.data).toHaveProperty(key, value);
});
