const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, loginAndGetToken, get } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let userToken;
let response;

// Login step for GET-17
Given('I am logged in as a user for GET-17', async function () {
  await initApi();
  userToken = await loginAndGetToken('testuser', 'test123');
  expect(userToken).toBeTruthy();
});

// GET request step for GET-17
When('I send a GET request to {string} with user token for GET-17', async function (endpoint) {
  response = await get(endpoint, userToken);
});

// Response status validation step for GET-17
Then('the API response status should be {int} for GET-17', async function (statusCode) {
  expect(response.status).toBe(statusCode);
});
