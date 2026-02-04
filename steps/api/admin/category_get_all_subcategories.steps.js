const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, loginAndGetToken, get, closeApi } = require('../../../utils/apiUtils');
const { expect } = require('@playwright/test');

let token;
let response;

// Unique login step for GET-14
Given('I am logged in as an API admin for GET-14', async function () {
  await initApi();
  token = await loginAndGetToken('admin', 'admin123');
  expect(token).not.toBeNull();
});

// Unique GET request step for GET-14
When('I send a GET request to {string} for GET-14', async function (endpoint) {
  response = await get(endpoint, token);
});

// Unique response status step for GET-14
Then('the API response status should be {int} for GET-14', async function (statusCode) {
  expect(response.status).toBe(statusCode);
});

// Unique step to check array of subcategories
Then('the response should be an array of subcategories for GET-14', async function () {
  expect(Array.isArray(response.data)).toBe(true);

  // Optional: check each subcategory has id and name
  response.data.forEach(sub => {
    expect(sub).toHaveProperty('id');
    expect(sub).toHaveProperty('name');
  });
});
