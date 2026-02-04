const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, closeApi, loginAndGetToken, get } = require('../../../utils/apiUtils');

let apiToken, response;

Given('I am logged in as an API admin', async function () {
  await initApi();
  apiToken = await loginAndGetToken('admin', 'admin123');
});

When('I send a GET request to {string}', async function (endpoint) {
  response = await get(endpoint, apiToken);
});

Then('the API response status should be {int}', async function (statusCode) {
  if (!response) throw new Error('No response available');
  if (response.status !== statusCode) throw new Error(`Expected status ${statusCode}, but got ${response.status}`);
});

Then('the API response should have a message containing {string}', async function (message) {
  if (!response.data || !response.data.message) throw new Error('No message found in response');
  if (!response.data.message.includes(message)) throw new Error(`Expected message to contain "${message}", but got "${response.data.message}"`);
});
