const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, get } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let response;

// Not logged in step for GET-19
Given('I am not logged in as a user for GET-19', async function () {
  await initApi();
});

// GET request without token step
When('I send a GET request to {string} without token for GET-19', async function (endpoint) {
  response = await get(endpoint); // no token provided
});

// Response status validation step
Then('the API response status should be 401 for GET-19', async function () {
  expect(response.status).toBe(401);
});
