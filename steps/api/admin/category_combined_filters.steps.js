const { Given, When, Then } = require('@cucumber/cucumber');
const { initApi, loginAndGetToken, get } = require('../../../utils/apiUtils');

let apiToken;
let response;

// ✅ Login step (unique text)
Given('I am logged in as an API admin for combined filters', async function () {
  await initApi();
  apiToken = await loginAndGetToken('admin', 'admin123');
  if (!apiToken) throw new Error('Login failed, no token received');
  this.apiToken = apiToken;
});

// ✅ GET request step (unique text)
When('I send a GET request to {string} for combined filters', async function (endpoint) {
  response = await get(endpoint, this.apiToken);
  this.response = response;
});

// ✅ Status code check (unique text)
Then('the API response status should be {int} for combined filters', async function (statusCode) {
  if (!this.response) throw new Error('No response available');
  if (this.response.status !== statusCode) {
    throw new Error(`Expected status ${statusCode}, but got ${this.response.status}`);
  }
});

// ✅ Validate each category name contains substring
Then('each category name should contain {string} for combined filters', async function (substring) {
  const data = this.response.data;
  if (!Array.isArray(data)) throw new Error('Response data is not an array');
  data.forEach(cat => {
    if (!cat.name.includes(substring)) {
      throw new Error(`Category name "${cat.name}" does not contain "${substring}"`);
    }
  });
});

// ✅ Validate each category parentId
Then('each category parentId should be {int} for combined filters', async function (parentId) {
  const data = this.response.data;
  if (!Array.isArray(data)) throw new Error('Response data is not an array');
  data.forEach(cat => {
    if (cat.parentId !== parentId) {
      throw new Error(`Category parentId "${cat.parentId}" does not match expected "${parentId}"`);
    }
  });
});
