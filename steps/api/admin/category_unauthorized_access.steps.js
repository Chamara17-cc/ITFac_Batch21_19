// Import Cucumber step definition keywords: When and Then
const { When, Then } = require('@cucumber/cucumber');

// Import reusable API utility functions for initializing the API,
// sending GET requests, and closing the API context
const { initApi, get, closeApi } = require('../../../utils/apiUtils');

// Import Playwright's expect assertion library
const { expect } = require('@playwright/test');

// Declare a variable to store the API response
let response;

// WHEN step: Send a GET request without an authentication token (GET-15 case)
When('I send a GET request to {string} without a token for GET-15', async function (endpoint) {
  // Initialize the API request context (base URL and settings)
  await initApi();

  // Send a GET request to the given endpoint WITHOUT passing a token
  response = await get(endpoint);
});

// THEN step: Validate the API response status code for unauthorized access
Then('the API response status should be {int} for GET-15', async function (statusCode) {
  // Assert that the returned HTTP status matches the expected status code
  expect(response.status).toBe(statusCode);
});
