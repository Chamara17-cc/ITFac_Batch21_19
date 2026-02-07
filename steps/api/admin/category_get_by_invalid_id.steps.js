// Import Cucumber step definition keywords
const { Given, When, Then } = require('@cucumber/cucumber');

// Import API utility helper functions
const { initApi, closeApi, loginAndGetToken, get } = require('../../../utils/apiUtils');

// Variables to store token and API response
let apiToken, response;

// GIVEN: Admin login for API testing
Given('I am logged in as an API admin', async function () {
  // Initialize API configuration (base URL, axios instance)
  await initApi();

  // Login as admin and retrieve JWT token
  apiToken = await loginAndGetToken('admin', 'admin123');
});

// WHEN: Send GET request to a given endpoint
When('I send a GET request to {string}', async function (endpoint) {
  // Call GET API with endpoint and token
  response = await get(endpoint, apiToken);
});

// THEN: Validate HTTP status code
Then('the API response status should be {int}', async function (statusCode) {
  // Ensure response exists
  if (!response) throw new Error('No response available');

  // Compare actual and expected status codes
  if (response.status !== statusCode)
    throw new Error(`Expected status ${statusCode}, but got ${response.status}`);
});

// THEN: Validate response message content
Then('the API response should have a message containing {string}', async function (message) {
  // Ensure response message exists
  if (!response.data || !response.data.message)
    throw new Error('No message found in response');

  // Validate expected message content
  if (!response.data.message.includes(message))
    throw new Error(
      `Expected message to contain "${message}", but got "${response.data.message}"`
    );
});
