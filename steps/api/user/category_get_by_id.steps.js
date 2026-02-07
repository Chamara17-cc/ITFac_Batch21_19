const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, loginAndGetToken, get } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let userToken;
let response;

// Unique login step for GET-16
Given('I am logged in as a user for GET-16', async function () {
  await initApi();
  userToken = await loginAndGetToken('testuser', 'test123');
  expect(userToken).toBeTruthy();
});

// Unique GET request step for GET-16
When('I send a GET request to {string} with user token for GET-16', async function (endpoint) {
  response = await get(endpoint, userToken);
});

// Unique response status step for GET-16
Then('the API response status should be {int} for GET-16', async function (statusCode) {
  expect(response.status).toBe(statusCode);
});

// Unique response body validation step for GET-16
Then('the response should have "id" with value {int} for GET-16', async function (idValue) {
  expect(response.data).toHaveProperty('id', idValue);
});
