const { When, Then } = require('@cucumber/cucumber');
const { initApi, get, closeApi } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let response;

// Unique GET request step for GET-15 (no token)
When('I send a GET request to {string} without a token for GET-15', async function (endpoint) {
  await initApi(); // ensure API context is initialized
  response = await get(endpoint); // no token passed
});

// Unique response status step for GET-15
Then('the API response status should be {int} for GET-15', async function (statusCode) {
  expect(response.status).toBe(statusCode);
});
