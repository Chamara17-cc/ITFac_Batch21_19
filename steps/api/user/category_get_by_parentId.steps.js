const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, loginAndGetToken, get } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let userToken;
let response;

// Logged in step
Given('I am logged in as a user for GET-20', async function () {
  await initApi();
  userToken = await loginAndGetToken('testuser', 'test123');
  expect(userToken).toBeTruthy();
});

// GET request with parentId
When('I send a GET request to {string} for GET-20', async function (endpoint) {
  response = await get(endpoint, userToken);
});

// Status validation
Then('the API response status should be 200 for GET-20', async function () {
  expect(response.status).toBe(200);
});

// Validate array and length
Then('the response should be an array of subcategories with length greater than 0 for GET-20', async function () {
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);
});
